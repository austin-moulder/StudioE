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
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

// Types for our event data
interface Event {
  id: number
  title: string
  description: string
  event_date: string
  event_date_end: string
  start_time: string
  end_time: string
  location: string
  price: string
  image_url: string
  is_featured: boolean
  status: string
  event_type: string
  spots_left?: number
  cta_url?: string  // Make cta_url optional
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
        console.log('Raw event data from Supabase:', data);
        const now = new Date();
        // Filter out events older than 30 days
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        
        const filteredData = data.filter(event => {
          const eventDate = new Date(event.event_date);
          console.log('Processing event:', event.title, 'with date:', event.event_date, 'parsed as:', eventDate);
          return eventDate >= thirtyDaysAgo;
        });

        // Sort events by date
        const sortedEvents = filteredData.sort((a, b) => {
          const dateA = new Date(a.event_date);
          const dateB = new Date(b.event_date);
          const now = new Date();
          
          // If both dates are in the past, show most recent first
          if (dateA < now && dateB < now) {
            return dateB.getTime() - dateA.getTime();
          }
          
          // If both dates are in the future, show closest first
          if (dateA > now && dateB > now) {
            return dateA.getTime() - dateB.getTime();
          }
          
          // If one is past and one is future, show future first
          return dateA > dateB ? -1 : 1;
        });

        setEvents(sortedEvents)
        setFilteredEvents(sortedEvents)
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
        event.event_type?.toLowerCase() === eventType.toLowerCase()
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

    // Sort events by date, keeping upcoming events first
    const now = new Date();
    filtered.sort((a, b) => {
      const dateA = new Date(a.event_date);
      const dateB = new Date(b.event_date);
      
      // If one is upcoming and one is past, upcoming comes first
      if (dateA >= now && dateB < now) return -1;
      if (dateA < now && dateB >= now) return 1;
      
      // If both are upcoming, closest first
      if (dateA >= now && dateB >= now) {
        return dateA.getTime() - dateB.getTime();
      }
      
      // If both are past, most recent first
      return dateB.getTime() - dateA.getTime();
    });
    
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
    router.push(`/events${query ? `?${query}` : ""}`)
  }

  // Get current page events
  const indexOfLastEvent = currentPage * ITEMS_PER_PAGE
  const indexOfFirstEvent = indexOfLastEvent - ITEMS_PER_PAGE
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)
  
  const formatEventTime = (startTime: string, endTime: string) => {
    // Parse hours and minutes
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    // Format start time
    const startPeriod = startHours >= 12 ? 'PM' : 'AM';
    const startHour = startHours % 12 || 12;
    const formattedStartTime = `${startHour}:${startMinutes.toString().padStart(2, '0')} ${startPeriod}`;
    
    // Format end time
    const endPeriod = endHours >= 12 ? 'PM' : 'AM';
    const endHour = endHours % 12 || 12;
    const formattedEndTime = `${endHour}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
    
    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  const formatLocation = (location: string) => {
    // Split by comma and trim whitespace
    const parts = location.split(',').map(part => part.trim());
    
    // Keep only the venue name and city
    // This assumes format is typically: "Venue, Address, City, State ZIP, Country"
    // or "Venue Address, City, State ZIP, Country"
    if (parts.length >= 3) {
      // If we have a separate venue and address line, combine them
      if (parts.length > 3) {
        return `${parts[0]}, ${parts[1]}, ${parts[2].split(' ')[0]}`; // Include city name only
      }
      // If venue and address are combined
      return `${parts[0]}, ${parts[1].split(' ')[0]}`; // Include city name only
    }
    return parts[0]; // Return first part if format is different
  };

  const formatDate = (dateString: string) => {
    try {
      // Ensure we have a valid date string
      if (!dateString) return 'Date unavailable';
      
      // Create a date object - Supabase returns ISO format
      const date = new Date(dateString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) return 'Date unavailable';
      
      // Format the date
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC' // Use UTC to avoid timezone issues
      });
    } catch (error) {
      console.error('Error formatting date:', error, 'for date string:', dateString);
      return 'Date unavailable';
    }
  };

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
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {currentEvents
                  .filter(event => {
                    const eventDate = new Date(event.event_date);
                    const now = new Date();
                    return eventDate >= now; // Only show future events
                  })
                  .map((event, index) => (
                    <Card key={event.id} className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-[3/4] relative">
                        <Image 
                          src={event.image_url || "/placeholder.svg"} 
                          alt={event.title} 
                          fill 
                          className="object-cover" 
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority={index < 5}
                        />
                        {event.is_featured && (
                          <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-3 py-0.5 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <Badge className="bg-[#9D4EDD] text-white hover:bg-[#9D4EDD]/90 text-xs">
                          {event.event_type || "Event"}
                        </Badge>
                        <h3 className="text-lg font-bold mt-1 line-clamp-1">{event.title}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1.5 h-3 w-3" />
                            {formatDate(event.event_date)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1.5 h-3 w-3" />
                            {formatEventTime(event.start_time, event.end_time)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1.5 h-4 w-4" />
                            {formatLocation(event.location)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                          <span className="text-sm font-semibold">
                            {event.price === "0" ? "Free" : `$${event.price}`}
                          </span>
                          {event.cta_url && (
                            <Link 
                              href={event.cta_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90 text-xs px-3 py-1 h-7">
                                Register
                              </Button>
                            </Link>
                          )}
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
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredEvents
                  .filter(event => {
                    const eventDate = new Date(event.event_date);
                    const now = new Date();
                    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                    return event.is_featured && (eventDate >= now || (eventDate < now && eventDate >= thirtyDaysAgo));
                  })
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority
                        />
                        <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-3 py-0.5 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <Badge className="bg-[#9D4EDD] text-white hover:bg-[#9D4EDD]/90 text-xs">
                          {event.event_type || "Special Event"}
                        </Badge>
                        <h3 className="text-lg font-bold mt-1 line-clamp-1">{event.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1.5 h-3 w-3" />
                            {formatDate(event.event_date)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1.5 h-3 w-3" />
                            {formatEventTime(event.start_time, event.end_time)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1.5 h-4 w-4" />
                            {formatLocation(event.location)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3">
                          <span className="text-sm font-semibold">
                            {event.price === "0" ? "Free" : `$${event.price}`}
                          </span>
                          {event.cta_url && (
                            <Link 
                              href={event.cta_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90 text-xs px-3 py-1 h-7">
                                Register
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredEvents
                  .filter(event => {
                    const eventDate = new Date(event.event_date);
                    const now = new Date();
                    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
                    return eventDate < now && eventDate >= thirtyDaysAgo;
                  })
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow opacity-80">
                      <div className="aspect-[3/4] relative">
                        <Image
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover grayscale"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Badge variant="secondary" className="text-sm py-1 px-3">
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <Badge className="bg-[#9D4EDD] text-white hover:bg-[#9D4EDD]/90 text-xs">
                          {event.event_type || "Event"}
                        </Badge>
                        <h3 className="text-lg font-bold mt-1 line-clamp-1">{event.title}</h3>
                        <div className="space-y-2">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1.5 h-4 w-4" />
                            {formatDate(event.event_date)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1.5 h-4 w-4" />
                            {formatLocation(event.location)}
                          </div>
                        </div>
                        <div className="flex items-center justify-end pt-3">
                          <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-7">
                            View Gallery
                          </Button>
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
export default function EventsPage() {
  return (
    <Suspense fallback={<div className="container py-12">Loading events...</div>}>
      <EventsContent />
    </Suspense>
  )
} 