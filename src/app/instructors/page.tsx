"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"

// Define the instructor type
interface Instructor {
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

function InstructorsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Get style and page from URL params
  const [selectedStyle, setSelectedStyle] = useState(searchParams.get("style") || "all")
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page") || 1))
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredInstructors, setFilteredInstructors] = useState<Instructor[]>([])
  const [paginatedInstructors, setPaginatedInstructors] = useState<Instructor[]>([])
  
  const ITEMS_PER_PAGE = 8

  // Extended mock data for 52 instructors (showing first 16 here)
  const instructors: Instructor[] = [
    // Page 1
    {
      name: "Jocelyn V.",
      style: "Heels & Reggaeton, Choreo",
      location: "Chicago, IL",
      rating: 4.9,
      reviews: 127,
      alias: "",
      image: "/placeholder.svg",
      featured: true,
      price: {
        lower: 50,
        upper: 70
      }
    },
    {
      name: "Nathalie O.",
      style: "Heels & Contemporary",
      location: "Chicago, IL",
      rating: 4.8,
      reviews: 93,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 50,
        upper: 70
      }
    },
    {
      name: "Rachel M.",
      style: "Choreo & Hip Hop",
      location: "Chicago, IL",
      rating: 5.0,
      reviews: 156,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 50,
        upper: 70
      }
    },
    {
      name: "Del D.",
      style: "Salsa & Social Dancing",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 82,
      alias: "",
      image: "/placeholder.svg",
      featured: true,
      price: {
        lower: 65,
        upper: 85
      }
    },
    {
      name: "Sam G.",
      style: "Salsa & Styling",
      location: "Chicago, IL",
      rating: 4.9,
      reviews: 115,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 65,
        upper: 85
      }
    },
    {
      name: "Juan H.",
      style: "Salsa & Performance",
      location: "Chicago, IL",
      rating: 4.8,
      reviews: 78,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 55,
        upper: 75
      }
    },
    {
      name: "Eda K.",
      style: "Bachata & Merengue",
      location: "Minneapolis, MN",
      rating: 4.9,
      reviews: 118,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 60,
        upper: 80
      }
    },
    {
      name: "Brian M.",
      style: "Bachata & Sensual",
      location: "Barcelona, Spain",
      rating: 4.7,
      reviews: 95,
      alias: "B-Mac",
      image: "/placeholder.svg",
      price: {
        lower: 60,
        upper: 80
      }
    },
    // Page 2
    {
      name: "Taylor D.",
      style: "DJ",
      location: "Chicago, IL",
      rating: 4.8,
      reviews: 89,
      alias: "DJ Diem Classic",
      image: "/placeholder.svg",
      price: {
        lower: 55,
        upper: 75
      }
    },
    {
      name: "Gregory A.",
      style: "Event Organizing, Photography",
      location: "Chicago, IL",
      rating: 4.6,
      reviews: 76,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 55,
        upper: 75
      }
    },
    {
      name: "Rafa C.",
      style: "Salsa & Competition",
      location: "Chicago, IL",
      rating: 4.8,
      reviews: 104,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 50,
        upper: 70
      }
    },
    {
      name: "Jackie C.",
      style: "Salsa & Competition",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 87,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 50,
        upper: 70
      }
    },
    {
      name: "Briana H.",
      style: "Salsa",
      location: "Chicago, IL",
      rating: 4.6,
      reviews: 73,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 45,
        upper: 65
      }
    },
    {
      name: "Tiara H.",
      style: "Bachata",
      location: "Chicago, IL",
      rating: 4.7,
      reviews: 81,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 45,
        upper: 65
      }
    },
    {
      name: "Brandon H.",
      style: "Salsa, Branding",
      location: "Chicago, IL",
      rating: 4.8,
      reviews: 92,
      alias: "",
      image: "/placeholder.svg",
      price: {
        lower: 55,
        upper: 75
      }
    },
    {
      name: "Austin M.",
      style: "Life Coaching, Salsa",
      location: "Chicago, IL",
      rating: 5.0,
      reviews: 143,
      alias: "",
      image: "/placeholder.svg",
      featured: true,
      price: {
        lower: 20,
        upper: 40
      }
    }
  ]

  // Additional mock data to reach 52 instructors (not shown in UI but counted for pagination)
  const totalInstructors = Array.from({ length: 52 - instructors.length }).map((_, index) => ({
    name: `Instructor ${instructors.length + index + 1}`,
    style: "Dance Style",
    location: "Chicago, IL",
    rating: 4.5,
    reviews: 50,
    alias: "",
    image: "/placeholder.svg",
    price: {
      lower: 45,
      upper: 65
    }
  }));

  const allInstructors = [...instructors, ...totalInstructors];
  const totalPages = Math.ceil(allInstructors.length / ITEMS_PER_PAGE);

  // Filter instructors based on selected style
  useEffect(() => {
    let filtered = [...allInstructors]
    
    if (selectedStyle && selectedStyle !== "all") {
      filtered = allInstructors.filter(instructor => 
        instructor.style.toLowerCase().includes(selectedStyle.toLowerCase())
      )
    }
    
    if (searchTerm) {
      filtered = filtered.filter(instructor => 
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (instructor.alias && instructor.alias.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    
    setFilteredInstructors(filtered)

    // Reset to page 1 if filters change
    if (currentPage !== 1) {
      setCurrentPage(1)
      updateURL(1, selectedStyle)
    }
  }, [selectedStyle, searchTerm])

  // Apply pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setPaginatedInstructors(filteredInstructors.slice(startIndex, endIndex))
  }, [filteredInstructors, currentPage])

  // Update URL when filter changes
  const handleStyleChange = (style: string) => {
    setSelectedStyle(style)
    updateURL(1, style)
  }

  // Update URL when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL(page, selectedStyle)
  }

  // Helper function to update URL
  const updateURL = (page: number, style: string) => {
    const params = new URLSearchParams()
    
    if (style && style !== "all") {
      params.set("style", style)
    }
    
    if (page > 1) {
      params.set("page", page.toString())
    }
    
    const query = params.toString()
    router.push(`/instructors${query ? `?${query}` : ""}`)
  }

  return (
    <div className="flex flex-col">
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
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="salsa">Salsa</SelectItem>
                    <SelectItem value="bachata">Bachata</SelectItem>
                    <SelectItem value="heels">Heels</SelectItem>
                    <SelectItem value="choreo">Choreo</SelectItem>
                    <SelectItem value="hiphop">Hip Hop</SelectItem>
                    <SelectItem value="dj">DJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Select>
                  <SelectTrigger id="location" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="minneapolis">Minneapolis</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Price Range
                </label>
                <Select>
                  <SelectTrigger id="price" className="w-full md:w-[180px]">
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
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
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{filteredInstructors.length} Instructors Found</h2>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating-high">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedInstructors.map((instructor, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[4/3] relative bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">{instructor.name}</span>
                  {instructor.featured && (
                    <div className="absolute top-2 right-2 bg-[#FF3366] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">
                        {instructor.name}
                        {instructor.alias && <span className="text-sm font-normal text-gray-500 ml-2">({instructor.alias})</span>}
                      </h3>
                      <p className="text-sm text-gray-500">{instructor.style}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#9D4EDD] text-white px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-current" />
                      {instructor.rating}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {instructor.location}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">${instructor.price.lower}-{instructor.price.upper}</span>
                    <span className="text-gray-500"> / hour</span>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <span className="text-sm text-gray-500">{instructor.reviews} reviews</span>
                    <Link href={`/instructors/${instructor.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#F94C8D] hover:underline text-sm">
                      View Profile
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
                
                {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                  // Create a sliding window of page numbers
                  let pageNum;
                  
                  if (totalPages <= 7) {
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
                      pageNum = totalPages;
                    }
                  } else if (currentPage >= totalPages - 3) {
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
                      pageNum = totalPages - (6 - i);
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
                      pageNum = totalPages;
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
                })}
                
                <button 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
                  disabled={currentPage === totalPages}
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
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Are You a Dance Instructor?</h2>
              <p className="mt-4 text-lg text-gray-500">
                Join our community of professional dance instructors and connect with students who are eager to learn.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Set your own rates and availability</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Turn your side hustle into your main hustle</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Discounted rates for training spaces (coming soon)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Connect with students in your area</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Establish credibility in the community</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Automate recurring payments and schedule instant payouts (coming soon)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Access business experts dedicated to helping you grow</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link href="https://forms.gle/LX4zHkZ1uLurnW9q6" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">Apply to Teach</Button>
                </Link>
                <Link href="/dance-business-consulting">
                  <Button size="lg" variant="outline">Grow Your Business</Button>
                </Link>
                <Link href="/dance-certifications">
                  <Button size="lg" variant="secondary">Get Certified</Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Dance instructor teaching</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function InstructorsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading instructors...</div>}>
      <InstructorsContent />
    </Suspense>
  )
} 