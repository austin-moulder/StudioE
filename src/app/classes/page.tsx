"use client"

import React, { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { format } from 'date-fns'
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
  ArrowRight
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
  const [danceStyle, setDanceStyle] = useState(searchParams.get('style') || 'all')
  const [location, setLocation] = useState(searchParams.get('location') || 'all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showSeriesOnly, setShowSeriesOnly] = useState(false)
  const [showDropInOnly, setShowDropInOnly] = useState(false)
  const [showOpenClassesOnly, setShowOpenClassesOnly] = useState(false)
  
  // Data state
  const [classes, setClasses] = useState<Class[]>([])
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [danceStyles, setDanceStyles] = useState<string[]>([])
  const [locations, setLocations] = useState<string[]>([])
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  
  // Refs
  const tableRef = useRef<HTMLDivElement>(null)
  
  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch companies using utility function
        const companiesData = await getAllCompanies()
        
        // Fetch classes using utility function
        const classesData = await getAllClasses()
        
        if (classesData) {
          setClasses(classesData)
          setFilteredClasses(classesData)
          
          // Extract unique dance styles and locations
          const styles = new Set<string>()
          const locationSet = new Set<string>()
          
          classesData.forEach(classItem => {
            // Extract dance style from class name
            const className = classItem.class_name.toLowerCase()
            if (className.includes('salsa')) styles.add('Salsa')
            else if (className.includes('bachata')) styles.add('Bachata')
            else if (className.includes('kizomba')) styles.add('Kizomba')
            else if (className.includes('zouk')) styles.add('Zouk')
            else if (className.includes('afro') || className.includes('cuban')) styles.add('Afro Cuban')
            else if (className.includes('heel')) styles.add('Heels')
            else if (className.includes('choreo') || className.includes('choreography')) styles.add('Choreo')
            else styles.add('Other')
            
            // Extract location - properly handling address formatting
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
          })
          
          // Get sorted dance styles with 'Other' at the end
          const styleArray = Array.from(styles)
          const otherIndex = styleArray.indexOf('Other')
          if (otherIndex !== -1) {
            styleArray.splice(otherIndex, 1) // Remove "Other"
            styleArray.sort()
            styleArray.push('Other') // Add "Other" at the end
          } else {
            styleArray.sort()
          }
          
          setDanceStyles(styleArray)
          setLocations(Array.from(locationSet))
        }
        
        if (companiesData) {
          setCompanies(companiesData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // Apply filters
  useEffect(() => {
    if (!classes.length) return
    
    let filtered = [...classes]
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(classItem => 
        classItem.class_name.toLowerCase().includes(term) ||
        classItem.instructor.toLowerCase().includes(term) ||
        classItem.company.name.toLowerCase().includes(term)
      )
    }
    
    // Filter by dance style
    if (danceStyle && danceStyle !== 'all') {
      filtered = filtered.filter(classItem => {
        const className = classItem.class_name.toLowerCase()
        
        if (danceStyle.toLowerCase() === 'salsa') 
          return className.includes('salsa')
        else if (danceStyle.toLowerCase() === 'bachata') 
          return className.includes('bachata')
        else if (danceStyle.toLowerCase() === 'kizomba') 
          return className.includes('kizomba')
        else if (danceStyle.toLowerCase() === 'zouk') 
          return className.includes('zouk')
        else if (danceStyle.toLowerCase() === 'afro cuban') 
          return className.includes('afro') || className.includes('cuban')
        else if (danceStyle.toLowerCase() === 'heels') 
          return className.includes('heel')
        else if (danceStyle.toLowerCase() === 'choreo') 
          return className.includes('choreo') || className.includes('choreography')
        else if (danceStyle.toLowerCase() === 'other') {
          // Return true if class doesn't match any of the above categories
          return !(
            className.includes('salsa') ||
            className.includes('bachata') ||
            className.includes('kizomba') ||
            className.includes('zouk') ||
            className.includes('afro') ||
            className.includes('cuban') ||
            className.includes('heel') ||
            className.includes('choreo') ||
            className.includes('choreography')
          )
        }
        
        return true
      })
    }
    
    // Filter by location
    if (location && location !== 'all') {
      filtered = filtered.filter(classItem => 
        classItem.company.address.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    // Filter by price range
    filtered = filtered.filter(classItem => 
      classItem.price >= priceRange[0] && classItem.price <= priceRange[1]
    )
    
    // Filter by class type
    if (showSeriesOnly) {
      filtered = filtered.filter(classItem => 
        classItem.is_series_start && 
        classItem.series_length !== null && 
        classItem.is_drop_in === false
      )
    }
    
    if (showDropInOnly) {
      filtered = filtered.filter(classItem => 
        classItem.is_drop_in === true || classItem.series_length === null
      )
    }
    
    if (showOpenClassesOnly) {
      filtered = filtered.filter(classItem => !classItem.instructor_approval_required)
    }
    
    setFilteredClasses(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [
    classes, 
    searchTerm, 
    danceStyle, 
    location, 
    priceRange, 
    showSeriesOnly, 
    showDropInOnly, 
    showOpenClassesOnly
  ])
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    
    // Scroll to table
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  
  // Apply filters and update URL
  const applyFilters = () => {
    const params = new URLSearchParams()
    
    if (searchTerm) params.set('q', searchTerm)
    if (danceStyle && danceStyle !== 'all') params.set('style', danceStyle)
    if (location && location !== 'all') params.set('location', location)
    
    router.push(`/classes?${params.toString()}`)
  }
  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setDanceStyle('all')
    setLocation('all')
    setPriceRange([0, 200])
    setShowSeriesOnly(false)
    setShowDropInOnly(false)
    setShowOpenClassesOnly(false)
    
    router.push('/classes')
  }
  
  // Format time
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`
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
            <h2 className="mb-6 text-xl font-bold">Find Your Perfect Dance Class</h2>
            
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
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
                    {danceStyles.map(style => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="location" className="mb-2 block text-sm font-medium">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="bg-white !bg-opacity-100">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-white !bg-opacity-100">
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(loc => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="price-range" className="mb-2 block text-sm font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="px-3 py-2">
                  <Slider
                    id="price-range"
                    min={0}
                    max={200}
                    step={5}
                    value={[priceRange[0], priceRange[1]]}
                    onValueChange={(value: number[]) => setPriceRange([value[0], value[1]])}
                    className="py-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="series-only" 
                  checked={showSeriesOnly} 
                  onCheckedChange={(checked) => {
                    const isChecked = checked as boolean;
                    setShowSeriesOnly(isChecked);
                    if (isChecked) setShowDropInOnly(false);
                  }}
                  disabled={showDropInOnly}
                />
                <label htmlFor="series-only" className={`text-sm ${showDropInOnly ? 'text-gray-400' : ''}`}>
                  Series Classes Only
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="drop-in-only" 
                  checked={showDropInOnly} 
                  onCheckedChange={(checked) => {
                    const isChecked = checked as boolean;
                    setShowDropInOnly(isChecked);
                    if (isChecked) setShowSeriesOnly(false);
                  }}
                  disabled={showSeriesOnly}
                />
                <label htmlFor="drop-in-only" className={`text-sm ${showSeriesOnly ? 'text-gray-400' : ''}`}>
                  Drop-in Classes Only
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="open-only" 
                  checked={showOpenClassesOnly}
                  onCheckedChange={(checked) => setShowOpenClassesOnly(checked as boolean)} 
                />
                <label htmlFor="open-only" className="text-sm">
                  No Approval Required
                </label>
              </div>
              
              <div className="ml-auto flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Reset
                </Button>
                
                <Button 
                  onClick={applyFilters}
                  className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90 flex items-center gap-1"
                >
                  <Filter className="h-4 w-4" />
                  Apply Filters
                </Button>
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
                                {format(new Date(classItem.class_date), 'MMM d, yyyy')}
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
                            <Button 
                              size="sm"
                              className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90"
                              onClick={() => {
                                // Create email inquiry
                                const subject = `Inquiry about ${classItem.class_name} dance class`;
                                const body = `Hello,\n\nI'm interested in the following class:\n\nClass: ${classItem.class_name}\nInstructor: ${classItem.instructor}\nDate: ${format(new Date(classItem.class_date), 'MMM d, yyyy')}\nTime: ${formatTime(classItem.start_time)} - ${formatTime(classItem.end_time)}\nLocation: ${classItem.company.name} (${classItem.company.address})\n\nPlease provide more information about this class and how I can register.\n\nThank you!`;
                                
                                window.location.href = `mailto:${classItem.company.email}?cc=studioelatindance@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                              }}
                            >
                              Inquire
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No classes found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
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