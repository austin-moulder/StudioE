"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { Instructor } from "@/types/instructor"
import { createClient } from '@supabase/supabase-js'
import { generateInstructorSlug } from '@/lib/instructors/instructorUtils'
import InstructorHeartButton from '@/components/InstructorHeartButton'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Define the instructor type (keep this for backward compatibility)
interface InstructorInterface {
  name: string
  style: string
  location: string
  rating: number
  reviews: number
  alias: string
  image: string
  featured?: boolean
  price: {
    lower: number
    upper: number
  }
}

// Replace the previous ComingSoonAlert with a tooltip version
function ComingSoonTooltip({ x, y }: { x: number; y: number }) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    // Mount animation
    requestAnimationFrame(() => {
      setOpacity(1);
    });
    
    // Unmount after delay
    const timer = setTimeout(() => {
      setOpacity(0);
      setTimeout(() => setVisible(false), 200); // Duration of fade-out
    }, 2300);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!visible) return null;
  
  // Position the tooltip near the click position, with adjustments to center it
  return (
    <div 
      className="fixed z-50 px-3 py-1.5 text-xs bg-gray-800/80 text-white rounded-md shadow-sm pointer-events-none
                 transition-opacity duration-200 ease-in-out"
      style={{ 
        left: `${x}px`, 
        top: `${y - 30}px`, 
        transform: 'translateX(-50%)',
        opacity: opacity,
      }}
    >
      <span>Instructor profiles coming soon</span>
    </div>
  );
}

// Add JSON-LD structured data component
function InstructorsStructuredData({ instructors }: { instructors: Instructor[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": instructors.map((instructor, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Person",
        "name": instructor.name,
        "description": instructor.danceStyles.join(", "),
        "image": instructor.imageUrl,
        "jobTitle": "Dance Instructor",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": instructor.location
        },
        "priceRange": `$${instructor.price.lower}-${instructor.price.upper}`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": instructor.rating,
          "reviewCount": instructor.reviews
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function InstructorsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Get URL params - ensure "all" is recognized as a valid style parameter
  const styleParam = searchParams ? searchParams.get("style") ?? "all" : "all"
  const [selectedStyle, setSelectedStyle] = useState(styleParam)
  const [selectedLocation, setSelectedLocation] = useState(searchParams ? searchParams.get("location") ?? "all" : "all")
  const [selectedPrice, setSelectedPrice] = useState(searchParams ? searchParams.get("price") ?? "any" : "any")
  const [sortOrder, setSortOrder] = useState(searchParams ? searchParams.get("sort") ?? "recommended" : "recommended")
  const [currentPage, setCurrentPage] = useState(Number(searchParams ? searchParams.get("page") ?? "1" : "1"))
  const [searchTerm, setSearchTerm] = useState(searchParams ? searchParams.get("q") ?? "" : "")
  const [filteredInstructors, setFilteredInstructors] = useState<Instructor[]>([])
  const [paginatedInstructors, setPaginatedInstructors] = useState<Instructor[]>([])
  const [allInstructors, setAllInstructors] = useState<Instructor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number, y: number, show: boolean }>({ 
    x: 0, 
    y: 0, 
    show: false 
  });
  const [showGroupPricing, setShowGroupPricing] = useState(false);
  
  const ITEMS_PER_PAGE = 8

  // Fetch instructors from Supabase
  useEffect(() => {
    async function fetchInstructors() {
      try {
        // Fetch instructors with their profiles to get total_students
        const { data, error } = await supabase
          .from('instructors')
          .select(`
            *,
            instructor_profiles(total_students, experience)
          `)
          .eq('active', true)
        
        if (error) throw error
        
        if (data) {
          // Transform the data to match the Instructor type
          const transformedData = data.map(instructor => ({
            id: instructor.id,
            name: instructor.name,
            danceStyles: [instructor.style], // Convert single style to array
            location: instructor.location,
            rating: instructor.rating,
            reviews: instructor.reviews_count || 0,
            totalStudents: instructor.instructor_profiles?.total_students || 0,
            bio: instructor.bio || '',
            imageUrl: instructor.image_url,
            featured: instructor.is_featured || false,
            instructor_profiles: instructor.instructor_profiles,
            price: {
              lower: instructor.price_lower,
              upper: instructor.price_upper
            }
          }))
          
          setAllInstructors(transformedData)
    }
      } catch (error) {
        console.error('Error fetching instructors:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInstructors()
  }, [])

  // Use useCallback to memoize this function
  const updateURLWithParams = useCallback((newParams: {
    style?: string;
    location?: string;
    price?: string;
    q?: string;
    page?: number;
    sort?: string;
  }) => {
    const params = new URLSearchParams();
    
    // Merge current selected filters with new parameters
    const style = newParams.style ?? selectedStyle;
    const location = newParams.location ?? selectedLocation;
    const price = newParams.price ?? selectedPrice;
    const q = newParams.q ?? searchTerm;
    const page = newParams.page ?? currentPage;
    const sort = newParams.sort ?? sortOrder;
    
    // Only add parameters that have non-default values
    if (style && style !== "all") params.set("style", style);
    if (location && location !== "all") params.set("location", location);
    if (price && price !== "any") params.set("price", price);
    if (q) params.set("q", q);
    if (page && page > 1) params.set("page", page.toString());
    if (sort && sort !== "recommended") params.set("sort", sort);
    
    // Update URL without reloading the page
    const url = `/instructors${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(url);
  }, [router, selectedStyle, selectedLocation, selectedPrice, searchTerm, currentPage, sortOrder]);

  // Filter instructors based on selected filters
  useEffect(() => {
    let filtered = [...allInstructors]
    
    // Filter by style
    if (selectedStyle && selectedStyle !== "all") {
      filtered = filtered.filter(instructor => {
        const styleText = instructor.danceStyles.join(", ").toLowerCase()
        const searchStyle = selectedStyle.toLowerCase()
        
        // Special case for hip hop to handle variations
        if (searchStyle === "hiphop" || searchStyle === "hip hop") {
          return styleText.includes("hip hop") || styleText.includes("hiphop")
        }
        
        return styleText.includes(searchStyle)
      })
    }
    
    // Filter by location
    if (selectedLocation && selectedLocation !== "all") {
      filtered = filtered.filter(instructor => {
        return instructor.location.toLowerCase().includes(selectedLocation.toLowerCase())
      })
    }
    
    // Filter by price range
    if (selectedPrice && selectedPrice !== "any") {
      filtered = filtered.filter(instructor => {
        const { lower, upper } = instructor.price
        
        switch(selectedPrice) {
          case "low":
            return lower >= 20 && lower <= 50
          case "medium":
            return lower > 50 && lower <= 75
          case "high":
            return lower > 75
          default:
            return true
        }
      })
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(instructor => 
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.danceStyles.join(", ").toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.bio.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply sorting
    filtered = sortInstructors(filtered, sortOrder)
    
    setFilteredInstructors(filtered)

    // Calculate new max page based on filtered results
    const newMaxPage = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    
    // If current page is now out of bounds, adjust it
    if (currentPage > newMaxPage) {
      setCurrentPage(1)
    }

    // Don't automatically set to page 1 when filters change if there are enough results
    // This creates a better UX for users who are browsing and applying filters
  }, [selectedStyle, selectedLocation, selectedPrice, sortOrder, searchTerm, allInstructors, currentPage])

  // Sort instructors based on selected order
  const sortInstructors = (instructors: Instructor[], order: string) => {
    const sortedInstructors = [...instructors]
    
    // Helper function to check if an instructor has a profile
    const hasProfile = (instructor: Instructor) => {
      return instructor.instructor_profiles !== null && instructor.instructor_profiles !== undefined;
    };
    
    switch (order) {
      case "rating-high":
        return sortedInstructors.sort((a, b) => {
          // First sort by whether they have a profile
          if (hasProfile(a) && !hasProfile(b)) return -1;
          if (!hasProfile(a) && hasProfile(b)) return 1;
          // Then sort by rating
          return b.rating - a.rating;
        });
      case "price-low":
        return sortedInstructors.sort((a, b) => {
          // First sort by whether they have a profile
          if (hasProfile(a) && !hasProfile(b)) return -1;
          if (!hasProfile(a) && hasProfile(b)) return 1;
          // Then sort by price
          return a.price.lower - b.price.lower;
        });
      case "price-high":
        return sortedInstructors.sort((a, b) => {
          // First sort by whether they have a profile
          if (hasProfile(a) && !hasProfile(b)) return -1;
          if (!hasProfile(a) && hasProfile(b)) return 1;
          // Then sort by price
          return b.price.upper - a.price.upper;
        });
      case "experience":
        return sortedInstructors.sort((a, b) => {
          // First sort by whether they have a profile
          if (hasProfile(a) && !hasProfile(b)) return -1;
          if (!hasProfile(a) && hasProfile(b)) return 1;
          
          // Get years of experience, default to 0 if not available
          // The experience field might be nested inside the instructor_profiles object
          // Handle both regular object and array cases
          let aExperience = 0;
          let bExperience = 0;
          
          if (a.instructor_profiles) {
            if (Array.isArray(a.instructor_profiles)) {
              aExperience = a.instructor_profiles[0]?.experience || 0;
            } else {
              aExperience = a.instructor_profiles.experience || 0;
            }
          }
          
          if (b.instructor_profiles) {
            if (Array.isArray(b.instructor_profiles)) {
              bExperience = b.instructor_profiles[0]?.experience || 0;
            } else {
              bExperience = b.instructor_profiles.experience || 0;
            }
          }
          
          console.log(`Sorting by experience: ${a.name} (${aExperience}) vs ${b.name} (${bExperience})`);
          
          // Then sort by years of experience (highest first)
          return bExperience - aExperience;
        });
      case "recommended":
      default:
        // For recommended, prioritize: 1. has profile, 2. featured, 3. rating
        return sortedInstructors.sort((a, b) => {
          // First sort by whether they have a profile
          if (hasProfile(a) && !hasProfile(b)) return -1;
          if (!hasProfile(a) && hasProfile(b)) return 1;
          
          // Then consider featured status for instructors with the same profile status
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          
          // Finally sort by rating
          return b.rating - a.rating;
        });
    }
  }

  // Apply pagination - separated from the filter effect
  useEffect(() => {
    // Ensure we stay within bounds of available pages
    const maxPage = Math.max(1, Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE))
    
    // If current page is out of bounds, adjust it
    if (currentPage > maxPage) {
      setCurrentPage(1)
      // Update URL with the corrected page
      updateURLWithParams({ page: 1 })
      return // Early return to avoid double-rendering
    }
    
    // Calculate start and end indices
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredInstructors.length)
    
    // Slice the filtered instructors
    setPaginatedInstructors(filteredInstructors.slice(startIndex, endIndex))
    
    // Update URL if page has changed manually
    if (searchParams && Number(searchParams.get("page") ?? "1") !== currentPage) {
      updateURLWithParams({ page: currentPage })
    }
  }, [filteredInstructors, currentPage, updateURLWithParams, searchParams])

  // Update URL when filters change
  const handleStyleChange = (style: string) => {
    setSelectedStyle(style)
    updateURLWithParams({ style })
  }

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location)
    updateURLWithParams({ location })
  }

  const handlePriceChange = (price: string) => {
    setSelectedPrice(price)
    updateURLWithParams({ price })
  }

  const handleSortChange = (sort: string) => {
    setSortOrder(sort)
    updateURLWithParams({ sort })
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Update profile click handler to use mouse position
  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>, instructorName: string) => {
    e.preventDefault();
    
    // Get click position - use getBoundingClientRect for better positioning
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    
    // Position tooltip above the link element rather than at exact mouse position
    // This works better across devices (mobile, desktop)
    const x = rect.left + (rect.width / 2);
    const y = rect.top;
    
    // Show tooltip at this position
    setTooltipPosition({ x, y, show: true });
    
    // Auto-hide after delay
    setTimeout(() => {
      setTooltipPosition(prev => ({ ...prev, show: false }));
    }, 2500);
  };

  return (
    <div className="flex flex-col">
      <InstructorsStructuredData instructors={paginatedInstructors} />
      {/* Show tooltip when needed */}
      {tooltipPosition.show && (
        <ComingSoonTooltip x={tooltipPosition.x} y={tooltipPosition.y} />
      )}
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[300px] w-full bg-gray-300">
          {/* Placeholder for hero image */}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Perfect Instructor
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Browse our network of professional dance instructors and find the perfect match for your goals.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search Instructors
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input 
                  id="search" 
                  placeholder="Name, dance style, or keyword" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:flex md:w-auto">
              <div className="space-y-2">
                <label htmlFor="style" className="text-sm font-medium">
                  Dance Style
                </label>
                <Select value={selectedStyle} onValueChange={handleStyleChange}>
                  <SelectTrigger id="style" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Styles" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="salsa">Salsa</SelectItem>
                    <SelectItem value="bachata">Bachata</SelectItem>
                    <SelectItem value="heels">Heels</SelectItem>
                    <SelectItem value="choreo">Choreo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Select value={selectedLocation} onValueChange={handleLocationChange}>
                  <SelectTrigger id="location" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="minneapolis">Minneapolis</SelectItem>
                    <SelectItem value="milwaukee">Milwaukee</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price Range
                </label>
                <Select value={selectedPrice} onValueChange={handlePriceChange}>
                  <SelectTrigger id="price" className="w-full md:w-[180px]">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="low">$20-50</SelectItem>
                    <SelectItem value="medium">$50-75</SelectItem>
                    <SelectItem value="high">$75+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <button 
                  className="flex h-10 items-center justify-center rounded-md bg-[#F94C8D] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#F94C8D]/90"
                  id="filter-button"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold">
              {isLoading ? 'Loading...' : `${filteredInstructors.length} Instructors Found`}
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center space-x-2 border border-[#F94C8D] rounded px-3 py-2 bg-white shadow-sm">
                <Checkbox 
                  id="group-pricing" 
                  checked={showGroupPricing} 
                  onCheckedChange={(checked) => setShowGroupPricing(checked as boolean)}
                  className="text-[#F94C8D] border-[#F94C8D]"
                />
                <label
                  htmlFor="group-pricing"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                >
                  Show prices for couples/small groups
                </label>
                <span className="bg-[#F94C8D] text-white text-xs font-bold px-2 py-1 rounded-full ml-2 whitespace-nowrap inline-flex flex-shrink-0">
                  SAVE 30%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortOrder} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating-high">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredInstructors.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-600">No instructors found matching your filters.</p>
                <p className="mt-2 text-gray-500">Try adjusting your search criteria.</p>
              </div>
            ) : (
              paginatedInstructors.map((instructor, index) => (
                <Card key={index} className="overflow-hidden flex flex-col">
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={instructor.imageUrl}
                      alt={instructor.name}
                      fill
                      className="object-cover"
                    />
                    </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">
                        {instructor.name}
                      </h3>
                        <p className="text-sm text-gray-500">{instructor.danceStyles.join(" & ")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {instructor.reviews > 0 && (
                        <div className="flex items-center gap-1 bg-[#9D4EDD] text-white px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 fill-current" />
                          {instructor.rating}
                        </div>
                      )}
                      <InstructorHeartButton 
                        instructorId={instructor.id} 
                        className="p-1 hover:bg-gray-100 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {instructor.location}
                  </div>
                  <div className="mt-2 text-sm">
                    {showGroupPricing ? (
                      <>
                        <span className="font-medium">${Math.round(instructor.price.lower * 0.7)}-{Math.round(instructor.price.upper * 0.7)}</span>
                        <span className="text-gray-500"> / hour per person</span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium">${instructor.price.lower}-{instructor.price.upper}</span>
                        <span className="text-gray-500"> / hour</span>
                      </>
                    )}
                  </div>
                    <div className="mt-auto pt-4 flex justify-between items-center">
                      {instructor.reviews > 0 ? (
                        <span className="text-sm text-gray-500">{instructor.reviews} reviews</span>
                      ) : instructor.totalStudents > 0 ? (
                        <span className="text-sm text-gray-500">{instructor.totalStudents}+ students</span>
                      ) : (
                        <span></span>  
                      )}
                      {instructor.instructor_profiles ? (
                        <Link 
                          href={`/instructors/${generateInstructorSlug(instructor.name)}`}
                          className="text-[#F94C8D] hover:underline text-sm"
                        >
                          View Profile
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-500">Profile coming soon</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          )}

          {filteredInstructors.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
                <button 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                
                {(() => {
                  // Calculate pages based on filtered results
                  const filteredTotalPages = Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE)
                  
                  // If no pages, don't render pagination
                  if (filteredTotalPages === 0) return null;

                  return Array.from({ length: Math.min(filteredTotalPages, 7) }).map((_, i) => {
                    // Create a sliding window of page numbers
                    let pageNum;
                    
                    if (filteredTotalPages <= 7) {
                      // If 7 or fewer pages, show all page numbers
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      // If near the start, show pages 1-5, then ellipsis, then last page
                      if (i < 5) {
                        pageNum = i + 1;
                      } else if (i === 5) {
                        return (
                          <span key="ellipsis-1" className="flex h-9 min-w-9 items-center justify-center">
                            ...
                          </span>
                        );
                      } else {
                        pageNum = filteredTotalPages;
                      }
                    } else if (currentPage >= filteredTotalPages - 3) {
                      // If near the end, show first page, then ellipsis, then last 5 pages
                      if (i === 0) {
                        pageNum = 1;
                      } else if (i === 1) {
                        return (
                          <span key="ellipsis-2" className="flex h-9 min-w-9 items-center justify-center">
                            ...
                          </span>
                        );
                      } else {
                        pageNum = filteredTotalPages - (6 - i);
                      }
                    } else {
                      // If in the middle, show first page, ellipsis, current-1, current, current+1, ellipsis, last page
                      if (i === 0) {
                        pageNum = 1;
                      } else if (i === 1) {
                        return (
                          <span key="ellipsis-3" className="flex h-9 min-w-9 items-center justify-center">
                            ...
                          </span>
                        );
                      } else if (i >= 2 && i <= 4) {
                        pageNum = currentPage + (i - 3);
                      } else if (i === 5) {
                        return (
                          <span key="ellipsis-4" className="flex h-9 min-w-9 items-center justify-center">
                            ...
                          </span>
                        );
                      } else {
                        pageNum = filteredTotalPages;
                      }
                    }
                    
                    return (
                      <button
                        key={`page-${pageNum}`}
                        onClick={() => handlePageChange(pageNum)}
                        className={`flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm ${
                          currentPage === pageNum
                            ? 'border border-[#F94C8D] bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90'
                            : 'border border-input bg-background hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  });
                })()}
                
                <button 
                  onClick={() => {
                    const filteredTotalPages = Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE)
                    if (currentPage < filteredTotalPages) handlePageChange(currentPage + 1)
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm ${
                    currentPage === Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'cursor-pointer hover:bg-gray-100'
                  }`}
                  disabled={currentPage === Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE)}
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6">Are You a Dance Instructor?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join our community of professional dance instructors and connect with students who are eager to learn.
              </p>
              
              {/* Benefits List */}
              <div className="grid gap-4 mb-8">
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Set your own rates and availability</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Turn your side hustle into your main hustle</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Discounted rates for training spaces (coming soon)</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Connect with students in your area</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Establish credibility in the community</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Automate recurring payments and schedule instant payouts (coming soon)</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Access business experts dedicated to helping you grow</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5">✓</div>
                  <span className="text-gray-700">Join our exclusive mentoring program to accelerate your teaching skills</span>
                </div>
              </div>

              {/* Action Buttons - Simplified Layout */}
              <div className="space-y-6">
                {/* Primary Actions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/become-instructor">
                    <Button size="lg" className="w-full bg-[#F94C8D] hover:bg-[#F94C8D]/90 text-white font-semibold px-8 py-3 text-lg">
                      Apply to Teach
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full border-2 border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D] hover:text-white font-semibold px-8 py-3 text-lg"
                    onClick={() => {
                      const subject = "Application to Become a Substitute Instructor";
                      const body = `Hi Studio E Team,

I am interested in signing up as a substitute instructor for my city. I understand that this means I will be contacted when local instructors are looking for paid replacements.

Please provide me with more information about:
- The substitute instructor program
- Requirements and qualifications
- How the replacement process works
- Payment structure for substitute work

My location: [Please specify your city]

Thank you for your time and I look forward to hearing from you!

Best regards,
[Your Name]`;
                      
                      window.location.href = `mailto:studioelatindance@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }}
                  >
                    Apply to Substitute
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/mentoring-program">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full border-2 border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D] hover:text-white font-semibold"
                    >
                      Join Mentoring Program
                    </Button>
                  </Link>
                  <Link href="/dance-business-consulting">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full border-2 border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D] hover:text-white font-semibold"
                    >
                      Grow Your Business
                    </Button>
                  </Link>
                  <Link href="/dance-certifications">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full border-2 border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D] hover:text-white font-semibold"
                    >
                      Get Certified
                    </Button>
                  </Link>
                  <Link href="/find-dance-space">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full border-2 border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D] hover:text-white font-semibold"
                    >
                      Find a Space
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 shadow-lg">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Adrian_1.jpg"
                alt="Dance instructor teaching"
                fill
                className="object-cover object-[50%_35%]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Default export with Suspense
export default function InstructorsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InstructorsContent />
    </Suspense>
  );
} 