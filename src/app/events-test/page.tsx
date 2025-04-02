"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users, Search, Filter, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

// Types for our event data
interface Event {
  id: number
  title: string
  description: string
  event_date: string
  start_time: string
  end_time: string
  location: string
  price: string
  image_url: string
  is_featured: boolean
  status: string
  type: string
  spots_left?: number
}

function EventsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
  const [eventType, setEventType] = useState(searchParams.get("type") || "all")
  const [location, setLocation] = useState(searchParams.get("location") || "all")
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  
  const ITEMS_PER_PAGE = 9 // 3x3 grid

  // Fetch events from Supabase
  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('EVENT')
        .select('*')
      
      if (error) {
        console.error('Error fetching events:', error)
        return
      }

      if (data) {
        setEvents(data)
        setFilteredEvents(data)
      }
    }

    fetchEvents()
  }, [])

  // Filter events based on search criteria
  useEffect(() => {
    let filtered = [...events]
    
    // Filter by type
    if (eventType && eventType !== "all") {
      filtered = filtered.filter(event => 
        event.type?.toLowerCase() === eventType.toLowerCase()
      )
    }
    
    // Filter by location
    if (location && location !== "all") {
      filtered = filtered.filter(event => 
        event.location.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredEvents(filtered)
  }, [events, eventType, location, searchTerm])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (searchTerm) {
      params.set("q", searchTerm)
    }
    
    if (eventType && eventType !== "all") {
      params.set("type", eventType)
    }
    
    if (location && location !== "all") {
      params.set("location", location)
    }
    
    const query = params.toString()
    router.push(`/events-test${query ? `?${query}` : ""}`)
  }

  // Get current page events
  const indexOfLastEvent = currentPage * ITEMS_PER_PAGE
  const indexOfFirstEvent = indexOfLastEvent - ITEMS_PER_PAGE
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[300px] w-full" />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Upcoming Dance Events</h1>
          <p className="mt-6 max-w-2xl text-lg">
            Workshops, showcases, competitions, and social events for dancers of all levels.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search Events
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="search" 
                  placeholder="Event name, dance style, or keyword" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:flex md:w-auto md:items-end">
              <div className="space-y-2">
                <label htmlFor="event-type" className="text-sm font-medium">
                  Event Type
                </label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger id="event-type" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="social">Social Events</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="congress">Congress</SelectItem>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="competition">Competition</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="flex items-center gap-2 h-10 self-end bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90"
                onClick={handleSearch}
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <Link href="https://forms.gle/2oaGTW52VBkpXa887" target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2 h-10 self-end bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90 ml-2">
                  <CalendarPlus className="h-4 w-4" />
                  Submit Your Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentEvents.map((event, index) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="aspect-[3/2] relative">
                      <Image 
                        src={event.image_url || "/placeholder.svg"} 
                        alt={event.title} 
                        fill 
                        className="object-cover" 
                      />
                      {event.is_featured && (
                        <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-4 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-[#9D4EDD] text-white hover:bg-[#9D4EDD]/90">
                        {event.type || "Event"}
                      </Badge>
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(event.event_date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          {`${event.start_time.slice(0, 5)} - ${event.end_time.slice(0, 5)}`}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                        {event.spots_left && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-2 h-4 w-4" />
                            {`${event.spots_left} spots left`}
                          </div>
                        )}
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-medium">
                          {event.price === "0" ? "Free" : `$${event.price}`}
                        </span>
                        <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">
                          Register
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
                    }`}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  
                  {(() => {
                    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
                    
                    return Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                      const pageNum = i + 1
                      
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
                      )
                    })
                  })()}
                  
                  <button 
                    onClick={() => currentPage < Math.ceil(filteredEvents.length / ITEMS_PER_PAGE) && handlePageChange(currentPage + 1)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm ${
                      currentPage === Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'cursor-pointer hover:bg-gray-100'
                    }`}
                    disabled={currentPage === Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="featured">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents
                  .filter(event => event.is_featured)
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="aspect-[3/2] relative">
                        <Image
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-4 py-1 rounded-full text-sm font-medium">
                          Featured
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-[#9D4EDD] text-white hover:bg-[#9D4EDD]/90">
                          {event.type || "Special Event"}
                        </Badge>
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            {`${event.start_time.slice(0, 5)} - ${event.end_time.slice(0, 5)}`}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <span className="font-medium">
                            {event.price === "0" ? "Free" : `$${event.price}`}
                          </span>
                          <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">
                            Register
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents
                  .filter(event => new Date(event.event_date) < new Date())
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden opacity-80">
                      <div className="aspect-[3/2] relative">
                        <Image
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover grayscale"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Badge variant="secondary" className="text-lg py-1 px-3">
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(event.event_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end">
                          <Button variant="outline">View Gallery</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

// Main component that provides the Suspense boundary
export default function EventsTestPage() {
  return (
    <EventsContent />
  )
} 