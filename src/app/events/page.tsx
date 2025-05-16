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
import { useState, useEffect, Suspense, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import SubscribeToCalendar from "@/components/SubscribeToCalendar"
import EventRSVPButton from "@/components/EventRSVPButton"

// Function to get event type badge color
const getEventTypeColor = (eventType: string | undefined) => {
  switch(eventType?.toLowerCase()) {
    case 'social':
      return 'bg-[#9933CC]'; // Purple
    case 'showcase':
      return 'bg-[#FF3366]'; // Hot Pink
    case 'festival':
      return 'bg-[#FF7A5A]'; // Coral
    case 'workshop':
      return 'bg-[#333333]'; // Dark Gray
    case 'community':
      return 'bg-[#CC3399]'; // Magenta
    case 'audition':
      return 'bg-[#4CAF50]'; // Green
    case 'competition':
      return 'bg-[#FF6B00]'; // Orange
    default:
      return 'bg-[#9933CC]'; // Default to Purple
  }
};

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
  approved: boolean
  spots_left?: number
  cta_url?: string  // Make cta_url optional
  gallery_url?: string // URL to the event gallery
  start_datetime?: string // New combined datetime field
  end_datetime?: string // New combined datetime field
  is_active: boolean
  timezone?: string // Timezone of the event (e.g., 'America/Chicago')
}

function EventsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(searchParams ? searchParams.get("q") ?? "" : "")
  const [eventType, setEventType] = useState(searchParams ? searchParams.get("type") ?? "all" : "all")
  const [location, setLocation] = useState(searchParams ? searchParams.get("location") ?? "all" : "all")
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [isMobile, setIsMobile] = useState(false)
  
  // Add ref for the events section
  const eventsTabsRef = useRef<HTMLDivElement>(null)
  
  // Set different items per page for mobile vs desktop
  const MOBILE_ITEMS_PER_PAGE = 8 // Max 8 items for mobile
  const DESKTOP_ITEMS_PER_PAGE = 8 // Show only 2 rows (4 columns x 2 rows) for desktop
  
  // Check if device is mobile on component mount and on window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Use standard breakpoint
    };
    
    // Initial check
    checkIsMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Calculate items per page based on device type
  const ITEMS_PER_PAGE = isMobile ? MOBILE_ITEMS_PER_PAGE : DESKTOP_ITEMS_PER_PAGE

  // Fetch events from Supabase
  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('EVENT')
        .select('*')
        .eq('approved', true) // Only fetch approved events
      
      if (error) {
        console.error('Error fetching events:', error)
        return
      }

      if (data) {
        console.log('Raw event data from Supabase:', data);
        const now = new Date();
        
        // Sort events by date
        const sortedEvents = data.sort((a, b) => {
          const dateA = new Date(a.event_date);
          const dateB = new Date(b.event_date);
          
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

  // Filter events based on search parameters
  useEffect(() => {
    if (!events.length) return

    const filtered = [...events].filter(event => {
      let matchesSearch = true
      let matchesType = true
      let matchesLocation = true

      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        matchesSearch = 
          event.title.toLowerCase().includes(term) || 
          event.description.toLowerCase().includes(term) ||
          event.location.toLowerCase().includes(term)
      }

      // Event type filter
      if (eventType && eventType !== "all") {
        matchesType = event.event_type?.toLowerCase() === eventType.toLowerCase()
      }

      // Location filter
      if (location && location !== "all") {
        matchesLocation = event.location.toLowerCase().includes(location.toLowerCase())
      }

      return matchesSearch && matchesType && matchesLocation
    })
    
    // Sort events
    filtered.sort((a, b) => {
      const now = new Date()
      // Create proper date-time objects for comparison
      let aStartDateTime, bStartDateTime, aEndDateTime, bEndDateTime
      if (a.start_datetime && b.start_datetime) {
        aStartDateTime = new Date(a.start_datetime)
        bStartDateTime = new Date(b.start_datetime)
      } else {
        aStartDateTime = createDateTime(a.event_date, a.start_time)
        bStartDateTime = createDateTime(b.event_date, b.start_time)
      }
      if (a.end_datetime && b.end_datetime) {
        aEndDateTime = new Date(a.end_datetime)
        bEndDateTime = new Date(b.end_datetime)
      } else {
        aEndDateTime = a.event_date_end 
          ? createDateTime(a.event_date_end, a.end_time) 
          : createDateTime(a.event_date, a.end_time);
        bEndDateTime = b.event_date_end 
          ? createDateTime(b.event_date_end, b.end_time) 
          : createDateTime(b.event_date, b.end_time);
      }
      const isAUpcoming = isEventUpcoming(a, now);
      const isBUpcoming = isEventUpcoming(b, now);
      const isAFeatured = a.is_featured;
      const isBFeatured = b.is_featured;
      // Priority 1 & 2: Upcoming Featured vs. Others/Upcoming Featured
      if (isAUpcoming && isAFeatured && (!isBUpcoming || !isBFeatured)) return -1;
      if (isBUpcoming && isBFeatured && (!isAUpcoming || !isAFeatured)) return 1;
      if (isAUpcoming && isAFeatured && isBUpcoming && isBFeatured) {
        // Both are featured and upcoming - sort by start date first
        return aStartDateTime.getTime() - bStartDateTime.getTime();
      }
      // Priority 3 & 4: Upcoming Non-Featured vs. Past/Upcoming Non-Featured
      if (isAUpcoming && !isBUpcoming) return -1;
      if (isBUpcoming && !isAUpcoming) return 1;
      if (isAUpcoming && isBUpcoming) { // Both are upcoming, non-featured
        // Sort by start date
        return aStartDateTime.getTime() - bStartDateTime.getTime();
      }
      // Priority 5: Both are past
      if (!isAUpcoming && !isBUpcoming) {
        // Sort past events by most recent end date first
        return bEndDateTime.getTime() - aEndDateTime.getTime(); 
      }
      return 0; 
    });
    setFilteredEvents(filtered)
  }, [events, searchTerm, eventType, location])
  
  // When any filter changes, automatically update the URL after a short delay
  useEffect(() => {
    if (!events.length) return;
    
    const timer = setTimeout(() => {
      // Build URL parameters
      const params = new URLSearchParams()
      if (searchTerm) params.set('q', searchTerm)
      if (eventType && eventType !== "all") params.set('type', eventType)
      if (location && location !== "all") params.set('location', location)
      
      // Use replaceState instead of router.push to avoid scrolling to top
      window.history.replaceState(
        {}, 
        '', 
        `${window.location.pathname}?${params.toString()}`
      );
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, eventType, location, events.length, router]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    
    // Scroll to the events section when changing pages
    if (eventsTabsRef.current) {
      // Scroll with a small offset to account for sticky header
      const yOffset = -80; 
      const y = eventsTabsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
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

  // Helper function to create a proper date-time object from separate date and time strings
  function createDateTime(dateString: string, timeString: string): Date {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(':').map(Number);
    
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  // Simple function to determine if an event is upcoming
  function isEventUpcoming(event: Event, now: Date) {
    // Use the new datetime columns if available
    if (event.start_datetime && event.end_datetime) {
      const startDateTime = new Date(event.start_datetime);
      const endDateTime = new Date(event.end_datetime);
      
      // Event is upcoming if:
      // 1. Start time hasn't passed yet, OR
      // 2. End time hasn't passed yet (event is ongoing)
      return startDateTime > now || endDateTime > now;
    }
    
    // Fallback to old logic if new columns aren't available
    const startDateTime = createDateTime(event.event_date, event.start_time);
    const endDateTime = event.event_date_end 
      ? createDateTime(event.event_date_end, event.end_time) 
      : createDateTime(event.event_date, event.end_time);
    
    return startDateTime > now || endDateTime > now;
  }

  // Simple function to determine if an event is past
  function isEventPast(event: Event, now: Date) {
    // Use the new datetime columns if available
    if (event.end_datetime) {
      const endDateTime = new Date(event.end_datetime);
      return endDateTime <= now;
    }
    
    // Fallback to old logic
    const endDateTime = event.event_date_end 
      ? createDateTime(event.event_date_end, event.end_time) 
      : createDateTime(event.event_date, event.end_time);
    
    return endDateTime <= now;
  }

  // Add new function to format datetime strings from the database
  const formatDateTime = (datetimeString: string, timezone: string = 'America/Chicago') => {
    if (!datetimeString) return null;
    
    try {
      // Parse the ISO date string
      const date = new Date(datetimeString);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) return null;
      
      // Format the date in the event's timezone
      const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric',
        timeZone: timezone
      });
      
      // Format the time in the event's timezone
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone
      });
      
      return { date: formattedDate, time: formattedTime };
    } catch (error) {
      console.error('Error formatting datetime:', error, 'for datetime string:', datetimeString);
      return null;
    }
  };

  // Format both date and time from the new datetime fields
  const formatEventDateTime = (event: Event) => {
    const timezone = event.timezone || 'America/Chicago';
    
    // Use new datetime fields if available
    if (event.start_datetime && event.end_datetime) {
      const start = formatDateTime(event.start_datetime, timezone);
      const end = formatDateTime(event.end_datetime, timezone);
      
      if (start && end) {
        // Check if start and end are on the same day
        if (start.date === end.date) {
          return {
            date: start.date,
            time: `${start.time} - ${end.time}`
          };
        } else {
          // Different days - now we need to determine if it's just a few hours past midnight
          // or a genuinely multi-day event
          
          // Parse the dates to check time difference
          const startDate = new Date(event.start_datetime);
          const endDate = new Date(event.end_datetime);
          
          // Get the midnight after the start date in the event's timezone
          const nextMidnight = new Date(startDate);
          nextMidnight.setDate(nextMidnight.getDate() + 1);
          nextMidnight.setUTCHours(0, 0, 0, 0);
          
          // Calculate hours past midnight
          const hoursPastMidnight = (endDate.getTime() - nextMidnight.getTime()) / (1000 * 60 * 60);
          
          // If it's just a few hours past midnight (e.g., ends before 6 AM), just show the start date
          if (hoursPastMidnight <= 6) {
            return {
              date: start.date,  // Only show start date
              time: `${start.time} - ${end.time}`
            };
          } else {
            // Genuinely multi-day event - show both dates
            return {
              date: `${start.date} - ${end.date}`,
              time: `${start.time} - ${end.time}`
            };
          }
        }
      }
    }
    
    // Fallback to old format
    return {
      date: formatDate(event.event_date),
      time: formatEventTime(event.start_time, event.end_time)
    };
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[300px] w-full" />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Discover Dance Events</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Workshops, showcases, competitions, and social events for dancers of all levels.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <SubscribeToCalendar 
                feedType="events" 
                buttonVariant="outline" 
                className="bg-transparent text-white border-white hover:bg-white/20" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b bg-white">
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

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="grid grid-cols-2 gap-4 md:flex md:items-end">
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
                      <SelectItem value="social">Socials</SelectItem>
                      <SelectItem value="workshop">Workshops</SelectItem>
                      <SelectItem value="showcase">Showcases</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="audition">Auditions</SelectItem>
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
              </div>
              
              <div className="flex gap-2 self-end">
                <Button 
                  className="flex items-center gap-2 h-10 bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90"
                  onClick={handleSearch}
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>

                <Link href="/submit-event">
                  <Button className="flex items-center gap-2 h-10 bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90">
                    <CalendarPlus className="h-4 w-4" />
                    Submit Event
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <Tabs defaultValue="upcoming" className="w-full" ref={eventsTabsRef}>
            <TabsList className="mb-8 grid w-full grid-cols-3 bg-white border rounded-lg text-center overflow-hidden">
              <TabsTrigger 
                value="upcoming" 
                className="data-[state=active]:font-semibold relative transition-all py-2.5 h-11 hover:bg-gray-100 flex justify-center items-center after:content-[''] after:absolute after:h-[2px] after:bg-gray-400 after:bottom-0 after:left-0 after:right-0 after:opacity-0 data-[state=active]:after:opacity-100"
              >
                Upcoming
              </TabsTrigger>
              <TabsTrigger 
                value="featured" 
                className="data-[state=active]:font-semibold relative transition-all py-2.5 h-11 hover:bg-gray-100 flex justify-center items-center after:content-[''] after:absolute after:h-[2px] after:bg-gray-400 after:bottom-0 after:left-0 after:right-0 after:opacity-0 data-[state=active]:after:opacity-100"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className="data-[state=active]:font-semibold relative transition-all py-2.5 h-11 hover:bg-gray-100 flex justify-center items-center after:content-[''] after:absolute after:h-[2px] after:bg-gray-400 after:bottom-0 after:left-0 after:right-0 after:opacity-0 data-[state=active]:after:opacity-100"
              >
                Past Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredEvents
                  .filter(event => {
                    const now = new Date();
                    const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
                    return isEventUpcoming(event, now) && new Date(event.event_date) >= fourteenDaysAgo;
                  })
                  .slice(indexOfFirstEvent, indexOfLastEvent)
                  .map((event, index) => (
                    <Card key={event.id} className={`overflow-hidden bg-white rounded-xl shadow hover:shadow-md transition-shadow ${event.is_featured ? 'border-2 border-[#F94C8D]' : ''}`}>
                      <div className="aspect-square relative">
                        <Image 
                          src={event.image_url || "/placeholder.svg"} 
                          alt={event.title} 
                          fill 
                          className="object-cover" 
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority={index < 4}
                          onError={(e) => {
                            console.error('Error loading image:', event.image_url);
                            // Set the src to the fallback image
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.src = "/placeholder.svg";
                          }}
                        />
                        {event.is_featured && (
                          <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-3 py-0.5 rounded-full text-xs font-medium">
                            Featured
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 space-y-3 flex flex-col h-full">
                        <Badge className={`${getEventTypeColor(event.event_type)} text-white hover:${getEventTypeColor(event.event_type)}/90 text-xs`}>
                          {event.event_type || "Event"}
                        </Badge>
                        <h3 className="text-lg font-bold mt-1 line-clamp-1">{event.title}</h3>
                        <div className="space-y-2 flex-grow">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1.5 h-3 w-3" />
                            {formatEventDateTime(event).date}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1.5 h-3 w-3" />
                            {formatEventDateTime(event).time}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1.5 h-4 w-4" />
                            {formatLocation(event.location)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 mt-auto">
                          <span className="text-sm font-semibold">
                            {event.price === "0" ? "Free" : `$${event.price}`}
                          </span>
                          <div className="flex gap-2">
                            <EventRSVPButton 
                              eventId={event.id}
                              eventName={event.title}
                              buttonVariant="outline"
                              buttonSize="sm"
                              buttonClassName="border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D]/10 text-xs px-3 py-1 h-7"
                            />
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
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {/* Mobile-optimized pagination display */}
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border shadow-sm bg-white text-sm ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'
                    }`}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  
                  {(() => {
                    const totalFilteredEvents = filteredEvents.filter(event => {
                      const now = new Date();
                      const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
                      return isEventUpcoming(event, now) && new Date(event.event_date) >= fourteenDaysAgo;
                    }).length;
                    
                    const totalPages = Math.ceil(totalFilteredEvents / ITEMS_PER_PAGE);
                    
                    // On mobile, show fewer page buttons
                    const maxVisibleButtons = isMobile ? 3 : 7;
                    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
                    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
                    
                    // Adjust start page if necessary
                    if (endPage - startPage < maxVisibleButtons - 1) {
                      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
                    }
                    
                    return Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
                      const pageNum = startPage + i;
                      
                      return (
                        <button
                          key={`page-${pageNum}`}
                          onClick={() => handlePageChange(pageNum)}
                          className={`flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm shadow-sm ${
                            currentPage === pageNum
                              ? 'border-2 border-[#F94C8D] bg-[#F94C8D] text-white font-medium hover:bg-[#F94C8D]/90'
                              : 'border bg-white hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })
                  })()}
                  
                  <button 
                    onClick={() => {
                      const totalFilteredEvents = filteredEvents.filter(event => {
                        const now = new Date();
                        const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
                        return isEventUpcoming(event, now) && new Date(event.event_date) >= fourteenDaysAgo;
                      }).length;
                      
                      const totalPages = Math.ceil(totalFilteredEvents / ITEMS_PER_PAGE);
                      
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    className={`flex h-9 w-9 items-center justify-center rounded-md border shadow-sm bg-white text-sm ${
                      (() => {
                        const totalFilteredEvents = filteredEvents.filter(event => {
                          const now = new Date();
                          const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
                          return isEventUpcoming(event, now) && new Date(event.event_date) >= fourteenDaysAgo;
                        }).length;
                        
                        const totalPages = Math.ceil(totalFilteredEvents / ITEMS_PER_PAGE);
                        
                        return currentPage === totalPages
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'cursor-pointer hover:bg-gray-100';
                      })()
                    }`}
                    disabled={(() => {
                      const totalFilteredEvents = filteredEvents.filter(event => {
                        const now = new Date();
                        const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
                        return isEventUpcoming(event, now) && new Date(event.event_date) >= fourteenDaysAgo;
                      }).length;
                      
                      const totalPages = Math.ceil(totalFilteredEvents / ITEMS_PER_PAGE);
                      
                      return currentPage === totalPages;
                    })()}
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
                    const now = new Date();
                    const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
                    return event.is_featured && isEventUpcoming(event, now) && new Date(event.event_date) >= fourteenDaysAgo;
                  })
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden bg-white rounded-xl shadow hover:shadow-md transition-shadow border-2 border-[#F94C8D]/20">
                      <div className="aspect-square relative">
                        <Image
                          src={event.image_url || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          priority
                          onError={(e) => {
                            console.error('Error loading image:', event.image_url);
                            // Set the src to the fallback image
                            const imgElement = e.target as HTMLImageElement;
                            imgElement.src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-3 py-0.5 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      </div>
                      <CardContent className="p-4 space-y-3 flex flex-col h-full">
                        <Badge className={`${getEventTypeColor(event.event_type)} text-white hover:${getEventTypeColor(event.event_type)}/90 text-xs`}>
                          {event.event_type || "Special Event"}
                        </Badge>
                        <h3 className="text-lg font-bold mt-1 line-clamp-1">{event.title}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="space-y-2 flex-grow">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1.5 h-3 w-3" />
                            {formatEventDateTime(event).date}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1.5 h-3 w-3" />
                            {formatEventDateTime(event).time}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1.5 h-4 w-4" />
                            {formatLocation(event.location)}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 mt-auto">
                          <span className="text-sm font-semibold">
                            {event.price === "0" ? "Free" : `$${event.price}`}
                          </span>
                          <div className="flex gap-2">
                            {isEventUpcoming(event, new Date()) && (
                              <EventRSVPButton 
                                eventId={event.id}
                                eventName={event.title}
                                buttonVariant="outline"
                                buttonSize="sm"
                                buttonClassName="border-[#F94C8D] text-[#F94C8D] hover:bg-[#F94C8D]/10 text-xs px-3 py-1 h-7"
                              />
                            )}
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
                    const now = new Date();
                    const fourteenDaysAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
                    
                    // Only show past events from the last 14 days and exclude those where approved === false
                    const eventDate = new Date(event.event_date);
                    const eventEndDate = new Date(event.event_date_end || event.event_date);
                    const eventDateToCheck = event.event_date_end ? eventEndDate : eventDate;
                    
                    return isEventPast(event, now) && eventDateToCheck >= fourteenDaysAgo && event.approved !== false;
                  })
                  .map((event) => (
                    <Card key={event.id} className="overflow-hidden bg-white rounded-xl shadow hover:shadow-md transition-shadow opacity-70">
                      <div className="aspect-square relative">
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
                      <CardContent className="p-4 space-y-3 flex flex-col h-full">
                        <Badge className={`${getEventTypeColor(event.event_type)} text-white hover:${getEventTypeColor(event.event_type)}/90 text-xs`}>
                          {event.event_type || "Event"}
                        </Badge>
                        <h3 className="text-lg font-bold mt-1 line-clamp-1">{event.title}</h3>
                        <div className="space-y-2 flex-grow">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="mr-1.5 h-4 w-4" />
                            {formatEventDateTime(event).date}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1.5 h-4 w-4" />
                            {formatEventDateTime(event).time}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <MapPin className="mr-1.5 h-4 w-4" />
                            {formatLocation(event.location)}
                          </div>
                        </div>
                        <div className="flex items-center justify-end pt-3 mt-auto gap-2">
                          {event.gallery_url && (
                            <Link 
                              href={event.gallery_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <Button size="sm" className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90 text-xs px-3 py-1 h-7">
                                View Gallery
                              </Button>
                            </Link>
                          )}
                          <Link 
                            href={`/events/${event.id}/reviews`}
                          >
                            <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-7">
                              Submit Review
                            </Button>
                          </Link>
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