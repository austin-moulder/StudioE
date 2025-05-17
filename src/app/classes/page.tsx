"use client"

import React, { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { format, isWithinInterval, parseISO, addDays, isToday, isFuture, endOfDay, startOfDay, isAfter, isBefore, isEqual } from 'date-fns'
import { 
  Calendar, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  SearchIcon,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  SlidersHorizontal,
  ChevronUp,
  Plus,
  Info,
  ScrollText,
  AlertCircle,
  RefreshCw
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import RSVPButton from '@/components/RSVPButton'

// Import our utility functions and types
import { 
  Class, 
  Company, 
  getAllClasses, 
  getAllCompanies, 
  getClassesByStyle 
} from '@/lib/supabase/classesUtils'

// Main component
export default function ClassesPage() {
  return (
    <div>
      <ClassesHero />
      <Suspense fallback={<ClassesLoading />}>
        <ClassesContent />
      </Suspense>
    </div>
  )
}

// Loading state component
function ClassesLoading() {
  return (
    <div className="py-16 container">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#F94C8D] border-t-transparent"></div>
        <p className="mt-4 text-lg text-gray-600">Loading classes...</p>
      </div>
    </div>
  )
}

// Hero Section
function ClassesHero() {
  return (
    <section className="relative bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-16">
      <div className="container flex flex-col items-center justify-center text-center text-white">
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Explore Dance Classes
        </h1>
        <p className="mt-6 max-w-2xl text-lg mb-8">
          Discover dance classes from studios across the nation for all levels and styles
        </p>
      </div>
    </section>
  )
}

// Main Content
function ClassesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [danceStyle, setDanceStyle] = useState(searchParams ? searchParams.get('style') ?? 'all' : 'all')
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [studioSearchTerm, setStudioSearchTerm] = useState('')
  
  // Data state
  const [classes, setClasses] = useState<Class[]>([])
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  
  // Refs
  const tableRef = useRef<HTMLDivElement>(null)
  
  // Additional state
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week'>(searchParams ? searchParams.get('date') as any ?? 'week' : 'week')
  
  // Define the fixed dance styles
  const danceStylesFixed = ["Salsa", "Bachata", "Heels", "Choreo", "Other"]
  
  // Filter companies when search term changes
  useEffect(() => {
    if (companies.length > 0) {
      if (!studioSearchTerm) {
        setFilteredCompanies(companies);
      } else {
        const filtered = companies.filter(company => 
          company.name.toLowerCase().includes(studioSearchTerm.toLowerCase())
        );
        setFilteredCompanies(filtered);
      }
    }
  }, [studioSearchTerm, companies]);
  
  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch companies using utility function
        const companiesData = await getAllCompanies()
        
        // Fetch classes using utility function
        const classesData = await getAllClasses()
        
        if (classesData) {
          console.log('Classes data loaded:', classesData.length);
          setClasses(classesData)
          setFilteredCompanies(companiesData || [])
          
          // Extract unique locations
          const locationSet = new Set<string>()
          
          classesData.forEach(classItem => {
            // Use the location column if available, otherwise fallback to address extraction
            if (classItem.location) {
              locationSet.add(classItem.location)
            } else {
              // Extract location from address (fallback method)
              const address = classItem.company.address
              // Split by comma and extract city (typically the second or third element)
              const addressParts = address.split(',').map(part => part.trim())
              
              // If address has 3 or more parts, city is likely the second-to-last element
              // Example: "123 Main St, 3rd Floor, Chicago, IL 60601" -> "Chicago"
              let city = 'Chicago' // Default
              if (addressParts.length >= 3) {
                // City is typically before the state
                city = addressParts[addressParts.length - 2]
                
                // Check if this looks like a proper city (not a floor number, suite, etc.)
                if (city.toLowerCase().includes('floor') || 
                    city.toLowerCase().includes('suite') || 
                    city.toLowerCase().includes('apt') ||
                    city.match(/^\d/) // Starts with number
                ) {
                  // If not a proper city, use the default
                  city = 'Chicago'
                }
              } else if (addressParts.length === 2) {
                // Simple address like "123 Main St, Chicago"
                city = addressParts[1]
              }
              
              locationSet.add(city)
            }
          })
          
          // Apply initial filters after loading data
          applyInitialFilters(classesData);
        }
        
        if (companiesData) {
          setCompanies(companiesData)
          setFilteredCompanies(companiesData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Fallback filter - if we have no filtered classes but have classes data, show at least some classes
  useEffect(() => {
    if (classes.length > 0 && filteredClasses.length === 0) {
      console.log('No filtered classes found but we have classes data - showing next 7 days classes as fallback');
      
      // Create a simple filter for the next 7 days to ensure we show something
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
      
      const fallbackFiltered = classes.filter(classItem => {
        if (!classItem.class_date) return false;
        
        const classDate = new Date(classItem.class_date);
        const classLocalDate = new Date(
          classDate.getUTCFullYear(), 
          classDate.getUTCMonth(), 
          classDate.getUTCDate()
        );
        
        const todayLocalDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        
        const endLocalDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        );
        
        return classLocalDate >= todayLocalDate && classLocalDate <= endLocalDate;
      });
      
      console.log('Fallback filtered classes:', fallbackFiltered.length);
      
      if (fallbackFiltered.length > 0) {
        setFilteredClasses(fallbackFiltered);
      }
    }
  }, [classes, filteredClasses]);
  
  // Apply initial filters on first load
  const applyInitialFilters = (classData: Class[]) => {
    let filtered = [...classData];
    console.log('Initial classes count:', filtered.length);
    
    // Apply date filter (week is default)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dateFilter === 'week') {
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 7);
      
      filtered = filtered.filter(classItem => {
        if (!classItem.class_date) return false;
        
        try {
          const classDate = new Date(classItem.class_date);
          
          // Create date-only version of the date to avoid timezone issues
          const classLocalDate = new Date(
            classDate.getUTCFullYear(), 
            classDate.getUTCMonth(), 
            classDate.getUTCDate()
          );
          
          const todayLocalDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );
          
          const endLocalDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate()
          );
          
          return classLocalDate >= todayLocalDate && classLocalDate <= endLocalDate;
        } catch (error) {
          console.error('Error processing date for class:', classItem.id, error);
          return false;
        }
      });
      console.log('After filtering for week:', filtered.length);
    }
    
    // Apply other active filters if any
    if (danceStyle !== 'all') {
      filtered = filtered.filter(classItem => {
        const className = classItem.class_name.toLowerCase();
        if (danceStyle === 'Salsa') return className.includes('salsa');
        if (danceStyle === 'Bachata') return className.includes('bachata');
        if (danceStyle === 'Heels') return className.includes('heel');
        if (danceStyle === 'Choreo') return className.includes('choreo') || className.includes('choreography');
        if (danceStyle === 'Other') {
          // "Other" includes all classes that don't match the above styles
          return !className.includes('salsa') && 
                 !className.includes('bachata') && 
                 !className.includes('heel') && 
                 !(className.includes('choreo') || className.includes('choreography'));
        }
        return true;
      });
      console.log('After filtering for dance style:', filtered.length);
    }
    
    // Apply company filter if active
    if (selectedCompany !== 'all') {
      filtered = filtered.filter(classItem => 
        classItem.company.id.toString() === selectedCompany
      );
      console.log('After filtering for company:', filtered.length);
    }
    
    console.log('Final filtered classes count:', filtered.length);
    setFilteredClasses(filtered);
  }
  
  // Apply filters and update URL
  const applyFilters = () => {
    // First, let's filter the classes
    let filtered = [...classes];
    console.log('Starting filter with classes count:', filtered.length);
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(classItem => 
        classItem.class_name.toLowerCase().includes(term) ||
        classItem.instructor.toLowerCase().includes(term) ||
        classItem.company.name.toLowerCase().includes(term)
      );
    }
    
    // Apply dance style filter
    if (danceStyle && danceStyle !== 'all') {
      filtered = filtered.filter(classItem => {
        const className = classItem.class_name.toLowerCase();
        if (danceStyle === 'Salsa') return className.includes('salsa');
        if (danceStyle === 'Bachata') return className.includes('bachata');
        if (danceStyle === 'Heels') return className.includes('heel');
        if (danceStyle === 'Choreo') return className.includes('choreo') || className.includes('choreography');
        if (danceStyle === 'Other') {
          // "Other" includes all classes that don't match the above styles
          return !className.includes('salsa') && 
                 !className.includes('bachata') && 
                 !className.includes('heel') && 
                 !(className.includes('choreo') || className.includes('choreography'));
        }
        return true;
      });
    }
    
    // Apply company filter
    if (selectedCompany && selectedCompany !== 'all') {
      filtered = filtered.filter(classItem => 
        classItem.company.id.toString() === selectedCompany
      );
    }
    
    // Update filtered classes state
    setFilteredClasses(filtered);
    
    // Update URL params without pushing to history (avoids scroll reset)
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (danceStyle && danceStyle !== 'all') params.set('style', danceStyle);
    if (dateFilter && dateFilter !== 'all') params.set('date', dateFilter);
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Use replaceState instead of router.push to avoid scrolling to top
    window.history.replaceState(
      {}, 
      '', 
      `${window.location.pathname}?${params.toString()}`
    );
  }
  
  // Apply filters
  useEffect(() => {
    if (!classes.length) return
    
    // Function to apply filters to the class list
    console.log('Main filters useEffect triggered');
    applyFilters();
    
  }, [
    classes,
    searchTerm,
    danceStyle,
    selectedCompany,
    dateFilter
  ])
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    
    // Scroll to table
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  // When any filter changes, automatically update the URL after a short delay
  useEffect(() => {
    if (!classes.length) return; // Don't run if no classes loaded yet
    
    console.log('Debounced filters useEffect triggered');
    const timer = setTimeout(() => {
      applyFilters();
    }, 500); // 500ms delay to avoid too many URL updates while typing
    
    return () => clearTimeout(timer);
  }, [searchTerm, danceStyle, selectedCompany]);
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setDanceStyle('all')
    setSelectedCompany('all')
    setStudioSearchTerm('')
    
    // Use replaceState instead of router.push to avoid scrolling to top
    window.history.replaceState({}, '', '/classes');
  }
  
  // Format time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  // Format date to ensure correct display regardless of timezone
  const formatDate = (dateString: string) => {
    try {
      // Create date object from the date string
      const date = new Date(dateString);
      
      // Format using UTC timezone to avoid any shifting
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC' // Use UTC to avoid timezone issues
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }
  
  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentClasses = filteredClasses.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage)
  
  return (
    <>
      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Find Your Perfect Dance Class</h2>
              
              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="md:hidden flex items-center gap-1 text-sm font-medium text-gray-700"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
                {filtersExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
            
            <div className={`${filtersExpanded ? 'block' : 'hidden'} md:block`}>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label htmlFor="search" className="mb-2 block text-sm font-medium">
                    Search
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Class, instructor or studio..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="dance-style" className="mb-2 block text-sm font-medium">
                    Dance Style
                  </label>
                  <Select value={danceStyle} onValueChange={setDanceStyle}>
                    <SelectTrigger id="dance-style" className="bg-white !bg-opacity-100">
                      <SelectValue placeholder="All Styles" />
                    </SelectTrigger>
                    <SelectContent className="bg-white !bg-opacity-100">
                      <SelectItem value="all">All Styles</SelectItem>
                      {danceStylesFixed.map(style => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium">
                    Studio
                  </label>
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="studio-search"
                      placeholder="Search for a studio..."
                      className="pl-10 mb-1"
                      value={studioSearchTerm}
                      onChange={(e) => setStudioSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                    <SelectTrigger id="company" className="bg-white !bg-opacity-100">
                      <SelectValue placeholder="All Studios" />
                    </SelectTrigger>
                    <SelectContent className="bg-white !bg-opacity-100 max-h-[300px]">
                      <SelectItem value="all">All Studios</SelectItem>
                      {filteredCompanies.map(company => (
                        <SelectItem key={company.id} value={company.id.toString()}>{company.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="text-sm"
                >
                  Reset Filters
                </Button>
                
                {/* Desktop Submit Button */}
                <div className="hidden md:block">
                  <Link href="/submit-class">
                    <Button className="bg-[#9933CC] text-white hover:bg-[#9933CC]/90 flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Submit a Class
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Mobile Submit Button */}
              <div className="md:hidden flex justify-center mt-6">
                <Link href="/submit-class" className="w-full">
                  <Button 
                    className="bg-[#9933CC] text-white hover:bg-[#9933CC]/90 flex items-center gap-1 w-full justify-center"
                  >
                    <Plus className="h-4 w-4" />
                    Submit a Class
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Classes Table Section */}
      <section className="py-12" ref={tableRef}>
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {loading ? 'Loading Classes...' : `${filteredClasses.length} Classes Found`}
            </h2>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[80px] bg-white !bg-opacity-100">
                  <SelectValue placeholder="20" />
                </SelectTrigger>
                <SelectContent className="bg-white !bg-opacity-100">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#F94C8D] border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-lg border shadow">
                <div className="md:block hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Class</TableHead>
                        <TableHead className="font-semibold">Date & Time</TableHead>
                        <TableHead className="font-semibold">Studio</TableHead>
                        <TableHead className="font-semibold">Instructor</TableHead>
                        <TableHead className="font-semibold text-center">Price</TableHead>
                        <TableHead className="font-semibold text-center">Type</TableHead>
                        <TableHead className="font-semibold text-center w-20">Approval</TableHead>
                        <TableHead className="font-semibold text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentClasses.length ? (
                        currentClasses.map((classItem) => (
                          <TableRow key={classItem.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              {classItem.class_name}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="flex items-center">
                                  <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                                  {formatDate(classItem.class_date)}
                                </span>
                                <span className="flex items-center text-sm text-gray-600">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{classItem.company.name}</span>
                                <span className="flex items-center text-sm text-gray-600">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {classItem.company.address.split(',')[0]}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{classItem.instructor}</TableCell>
                            <TableCell className="text-center">
                              <span className="flex items-center justify-center">
                                <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                                {classItem.price}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              {classItem.is_series_start && classItem.series_length ? (
                                <Badge variant="outline" className="border-blue-500 text-blue-600">
                                  Series {classItem.series_length > 0 ? `(${classItem.series_length})` : ''}
                                </Badge>
                              ) : classItem.is_drop_in === true || classItem.series_length === null ? (
                                <Badge variant="outline" className="border-green-500 text-green-600">
                                  Drop-in
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-gray-500 text-gray-600">
                                  Class
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {classItem.instructor_approval_required ? (
                                <Badge variant="outline" className="border-amber-500 text-amber-600">
                                  Required
                                </Badge>
                              ) : (
                                <span className="text-sm text-gray-500">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex space-x-2 justify-end">
                                <Button 
                                  size="sm"
                                  variant="outline"
                                  className="border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D]/10"
                                  onClick={() => {
                                    // Create email inquiry
                                    const subject = `Inquiry about ${classItem.class_name} dance class`;
                                    const body = `Hello,\n\nI'm interested in the following class:\n\nClass: ${classItem.class_name}\nInstructor: ${classItem.instructor}\nDate: ${format(new Date(classItem.class_date), 'MMM d, yyyy')}\nTime: ${formatTime(classItem.start_time)} - ${formatTime(classItem.end_time)}\nLocation: ${classItem.company.name} (${classItem.company.address})\n\nPlease provide more information about this class and how I can register.\n\nThank you!`;
                                    
                                    window.location.href = `mailto:${classItem.company.email}?cc=studioelatindance@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                                  }}
                                >
                                  Inquire
                                </Button>
                                <RSVPButton
                                  classId={classItem.id.toString()}
                                  className={classItem.class_name}
                                  instructorId={classItem.instructor}
                                  buttonText="RSVP"
                                  buttonSize="sm"
                                  buttonVariant="default"
                                  buttonClassName="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90"
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center space-y-4 py-6">
                              <div className="text-gray-500 flex items-center">
                                <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                                No classes found matching your filters.
                              </div>
                              <Button 
                                onClick={resetFilters}
                                variant="outline" 
                                className="border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D]/10"
                              >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reset Filters
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Mobile Card View */}
                <div className="md:hidden grid gap-4 p-4">
                  {currentClasses.length ? (
                    currentClasses.map((classItem) => (
                      <div key={classItem.id} className="bg-white rounded-lg border shadow-sm p-4">
                        <h3 className="font-semibold text-lg mb-2">{classItem.class_name}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {classItem.is_series_start && classItem.series_length ? (
                            <Badge variant="outline" className="border-blue-500 text-blue-600">
                              Series {classItem.series_length > 0 ? `(${classItem.series_length})` : ''}
                            </Badge>
                          ) : classItem.is_drop_in === true || classItem.series_length === null ? (
                            <Badge variant="outline" className="border-green-500 text-green-600">
                              Drop-in
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-gray-500 text-gray-600">
                              Class
                            </Badge>
                          )}
                          
                          {classItem.instructor_approval_required && (
                            <Badge variant="outline" className="border-amber-500 text-amber-600">
                              Approval Required
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3 whitespace-nowrap overflow-hidden">
                          <div className="flex items-center min-w-0">
                            <Calendar className="shrink-0 mr-1 h-4 w-4" />
                            <span className="truncate">{formatDate(classItem.class_date)}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <div className="flex items-center min-w-0">
                            <Clock className="shrink-0 mr-1 h-4 w-4" />
                            <span className="truncate">{formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-gray-600">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{classItem.instructor}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                            <span>{classItem.price}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="font-medium">{classItem.company.name}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="mr-1 h-3 w-3" />
                            {classItem.company.address.split(',')[0]}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline"
                            className="border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D]/10"
                            onClick={() => {
                              // Create email inquiry
                              const subject = `Inquiry about ${classItem.class_name} dance class`;
                              const body = `Hello,\n\nI'm interested in the following class:\n\nClass: ${classItem.class_name}\nInstructor: ${classItem.instructor}\nDate: ${format(new Date(classItem.class_date), 'MMM d, yyyy')}\nTime: ${formatTime(classItem.start_time)} - ${formatTime(classItem.end_time)}\nLocation: ${classItem.company.name} (${classItem.company.address})\n\nPlease provide more information about this class and how I can register.\n\nThank you!`;
                              
                              window.location.href = `mailto:${classItem.company.email}?cc=studioelatindance@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                            }}
                          >
                            Inquire
                          </Button>
                          <RSVPButton
                            classId={classItem.id.toString()}
                            className={classItem.class_name}
                            instructorId={classItem.instructor}
                            buttonText="RSVP"
                            buttonVariant="default"
                            buttonClassName="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-lg border shadow-sm p-6">
                      <div className="flex flex-col items-center justify-center space-y-4 py-4">
                        <div className="flex items-center text-gray-500 mb-2">
                          <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                          <span className="text-center">No classes found matching your filters.</span>
                        </div>
                        <Button 
                          onClick={resetFilters} 
                          className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90 w-full"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      &lt;
                    </Button>
                    
                    {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                      let pageNum: number;
                      
                      // If less than 7 pages, show all
                      if (totalPages <= 7) {
                        pageNum = i + 1;
                      } 
                      // Otherwise create a sliding window
                      else {
                        const middleIndex = 3; // Middle of the 7 visible buttons
                        
                        if (currentPage <= middleIndex) {
                          // Near the start
                          pageNum = i + 1;
                        } 
                        else if (currentPage > totalPages - middleIndex) {
                          // Near the end
                          pageNum = totalPages - 6 + i;
                        } 
                        else {
                          // Middle case
                          pageNum = currentPage - middleIndex + i + 1;
                        }
                      }
                      
                      return (
                        <Button
                          key={`page-${pageNum}`}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className={`h-8 w-8 p-0 ${
                            currentPage === pageNum
                              ? 'bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90'
                              : ''
                          }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      &gt;
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Take Dance Classes</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Discover the many benefits of learning to dance and adopting a beginner's mindset
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#F94C8D]/10 text-[#F94C8D] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Social Connection</h3>
              <p className="text-gray-600 text-center">
                Meet new people and build community through the joy of dance in a welcoming environment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#9333EA]/10 text-[#9333EA] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Mental Health</h3>
              <p className="text-gray-600 text-center">
                Improve your mood, reduce stress, and boost cognitive function through regular dance practice.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#06B6D4]/10 text-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Physical Fitness</h3>
              <p className="text-gray-600 text-center">
                Enhance coordination, flexibility, and cardiovascular health while having fun.
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              href="https://www.joinstudioe.com/blog/salsa-dance-fundamentals" 
              target="_blank"
              className="inline-flex items-center text-[#F94C8D] hover:underline"
            >
              Learn more about the importance of taking classes and the beginner's mindset
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
} 