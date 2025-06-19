"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabase";
import { useAuth } from "@/lib/hooks/useAuth";
import BackButton from "@/components/dashboard/BackButton";
import { getSavedInstructors, SavedInstructor } from "@/lib/supabase/savedInstructorsUtils";
import InstructorHeartButton from "@/components/InstructorHeartButton";
import Image from "next/image";

// Define basic types to avoid "never[]" errors
type EventType = {
  id: string | number;
  event_id: string | number;
  title: string;
  event_name: string;
  description?: string;
  start_datetime: string;
  end_datetime?: string;
  timezone?: string;
  location?: string;
  image_url?: string;
  event_type?: string;
  status?: string;
  isPast: boolean;
  sortDate?: Date | null; // Make sortDate optional and allow null
};

type ClassType = {
  id: string | number;
  class_id: string | number;
  class_name: string;
  instructor?: string;
  class_date?: string;
  start_time?: string;
  location?: string;
  address?: string;
  status?: string;
  temporal_status?: string;
  sortDate?: Date; // For sorting
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("events");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userEvents, setUserEvents] = useState<EventType[]>([]);
  const [userClasses, setUserClasses] = useState<ClassType[]>([]);
  const [savedInstructors, setSavedInstructors] = useState<SavedInstructor[]>([]);
  
  useEffect(() => {
    async function fetchUserData() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Fetch RSVP'd events
        const { data: eventData, error: eventError } = await supabase
          .from('event_rsvp_status')
          .select(`
            *,
            EVENT (*)
          `)
          .eq('user_id', user.id);
        
        if (eventError) {
          console.error('Error fetching events:', eventError);
        } else if (eventData) {
          const now = new Date();
          
          const processedEvents = eventData.map(item => {
            // Create event date object
            const eventDate = item.EVENT?.start_datetime ? new Date(item.EVENT.start_datetime) : null;
            const isPast = eventDate ? eventDate < now : false;
            
            return {
              id: item.id,
              event_id: item.event_id,
              title: item.EVENT?.event_name || item.EVENT?.title || 'Untitled Event',
              event_name: item.EVENT?.event_name || item.EVENT?.title || 'Untitled Event',
              description: item.EVENT?.description,
              start_datetime: item.EVENT?.start_datetime || '',
              end_datetime: item.EVENT?.end_datetime,
              timezone: item.EVENT?.timezone,
              location: item.EVENT?.location,
              image_url: item.EVENT?.image_url,
              event_type: item.EVENT?.event_type,
              status: item.status,
              isPast: isPast,
              sortDate: eventDate // Add sortDate for consistent sorting
            };
          });
          
          // Sort events chronologically - furthest in future first, then past events
          processedEvents.sort((a, b) => {
            // If one is past and one is upcoming, upcoming comes first
            if (a.isPast && !b.isPast) return 1;
            if (!a.isPast && b.isPast) return -1;
            
            // For two upcoming events, furthest in future comes first
            if (!a.isPast && !b.isPast) {
              // If both have sortDate, compare them (furthest in future first)
              if (a.sortDate && b.sortDate) {
                return b.sortDate.getTime() - a.sortDate.getTime();
              }
            }
            
            // For two past events, most recent past event comes first
            if (a.isPast && b.isPast) {
              // If both have sortDate, compare them (most recent past first)
              if (a.sortDate && b.sortDate) {
                return b.sortDate.getTime() - a.sortDate.getTime();
              }
            }
            
            // If only one has a sort date, put the one with a date first
            if (a.sortDate) return -1;
            if (b.sortDate) return 1;
            
            // If neither has a sort date, maintain original order
            return 0;
          });
          
          setUserEvents(processedEvents);
        }
        
        // Fetch class registrations
        const { data: classData, error: classError } = await supabase
          .from('class_inquiry_status')
          .select(`
            *,
            classes (
              *,
              companies (*)
            )
          `)
          .eq('user_id', user.id);
        
        if (classError) {
          console.error('Error fetching classes:', classError);
        } else if (classData) {
          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          
          const processedClasses = classData.map(item => {
            // Create a date that accounts for potential time zone issues
            let classDate: Date | undefined = undefined;
            if (item.classes?.class_date) {
              // Ensure we're using YYYY-MM-DD format with 'T00:00:00' to avoid timezone issues
              const dateStr = item.classes.class_date;
              const dateParts = (typeof dateStr === 'string' ? dateStr.split('T')[0] : dateStr).split('-');
              if (dateParts.length === 3) {
                // Create date with explicit year, month, day to avoid timezone shifts
                classDate = new Date(
                  parseInt(dateParts[0]),     // year
                  parseInt(dateParts[1]) - 1, // month (0-indexed)
                  parseInt(dateParts[2])      // day
                );
              } else {
                // Fallback if date format is unexpected
                classDate = new Date(dateStr);
              }
            }
            
            // Determine temporal status based on date comparison with today
            let status = 'Upcoming';
            if (classDate instanceof Date && !isNaN(classDate.getTime())) {
              // Create date objects with just the date part for comparison
              const classDateOnly = new Date(
                classDate.getFullYear(),
                classDate.getMonth(),
                classDate.getDate()
              );
              
              if (classDateOnly.getTime() < today.getTime()) {
                status = 'Past';
              } else if (classDateOnly.getTime() === today.getTime()) {
                status = 'Today';
              } else {
                status = 'Upcoming';
              }
            }
            
            return {
              id: item.id,
              class_id: item.class_id,
              class_name: item.class_name || 'Untitled Class',
              instructor: item.classes?.instructor,
              class_date: item.classes?.class_date,
              start_time: item.classes?.start_time,
              location: item.classes?.companies?.name,
              address: item.classes?.companies?.address,
              status: item.status,
              temporal_status: status,
              sortDate: classDate // Store date object for sorting
            };
          });
          
          // Sort classes with furthest future date first, then past classes
          processedClasses.sort((a, b) => {
            // If both have temporal status, sort by status first (Upcoming, Today, Past)
            if (a.temporal_status && b.temporal_status) {
              if (a.temporal_status === 'Past' && b.temporal_status !== 'Past') return 1;
              if (a.temporal_status !== 'Past' && b.temporal_status === 'Past') return -1;
            }
            
            // Then sort by date
            if (a.sortDate && b.sortDate) {
              // For upcoming classes, furthest in future first
              if (a.temporal_status !== 'Past' && b.temporal_status !== 'Past') {
                return b.sortDate.getTime() - a.sortDate.getTime();
              }
              
              // For past classes, most recent first
              if (a.temporal_status === 'Past' && b.temporal_status === 'Past') {
                return b.sortDate.getTime() - a.sortDate.getTime();
              }
            }
            
            // If only one has a sort date, prioritize the one with a date
            if (a.sortDate) return -1;
            if (b.sortDate) return 1;
            
            // If neither has a sort date, maintain original order
            return 0;
          });
          
          setUserClasses(processedClasses);
        }

        // Fetch saved instructors (handle gracefully if table doesn't exist yet)
        try {
          const instructorsData = await getSavedInstructors(user.id);
          setSavedInstructors(instructorsData);
        } catch (error) {
          console.warn('Saved instructors feature not available yet. Please run the database setup script.');
          setSavedInstructors([]);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [user]);
  
  // Format date respecting event's timezone: "Mon, Jan 1"
  function formatDate(dateStr?: string, timezone?: string) {
    if (!dateStr) return 'TBA';
    
    try {
      // For class dates, ensure we handle potential timezone issues
      if (dateStr && !dateStr.includes('T')) {
        // If it's just a YYYY-MM-DD format with no time
        const dateParts = dateStr.split('-');
        if (dateParts.length === 3) {
          const year = parseInt(dateParts[0]);
          const month = parseInt(dateParts[1]) - 1; // JS months are 0-indexed
          const day = parseInt(dateParts[2]);
          
          return new Date(year, month, day).toLocaleDateString('en-US', {
            weekday: 'short', 
            month: 'short', 
            day: 'numeric'
          });
        }
      }
      
      const date = new Date(dateStr);
      
      // Use the event's timezone if provided
      if (timezone) {
        return new Intl.DateTimeFormat('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          timeZone: timezone
        }).format(date);
      }
      
      // Otherwise use local formatting
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Invalid date';
    }
  }

  // Format time respecting event's timezone: "7:30 PM"
  function formatTime(timeStr?: string, timezone?: string) {
    if (!timeStr) return 'TBA';
    
    try {
      // Handle datetime strings
      if (timeStr.includes('T') || timeStr.includes('-')) {
        const date = new Date(timeStr);
        
        // Use the event's timezone if provided
        if (timezone) {
          return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: timezone
          }).format(date);
        }
        
        // Otherwise use local formatting
        return date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        });
      }
      
      // Handle time strings like "19:30:00"
      if (timeStr.includes(':')) {
        const parts = timeStr.split(':');
        const hours = parseInt(parts[0]);
        const minutes = parts[1];
        const period = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        return `${hour12}:${minutes} ${period}`;
      }
      
      return timeStr;
    } catch (e) {
      console.error('Error formatting time:', e);
      return timeStr || 'TBA';
    }
  }

  // Get badge color based on event type
  function getEventTypeColor(type?: string) {
    const types: Record<string, string> = {
      social: 'bg-[#9933CC]',
      showcase: 'bg-[#FF3366]',
      festival: 'bg-[#FF7A5A]',
      workshop: 'bg-[#333333]',
      community: 'bg-[#CC3399]',
      audition: 'bg-[#4CAF50]',
      competition: 'bg-[#FF6B00]'
    };
    
    return type?.toLowerCase() ? types[type.toLowerCase()] || 'bg-[#9933CC]' : 'bg-[#9933CC]';
  }
  
  // Get status badge style based on temporal status
  function getStatusStyle(status?: string) {
    switch (status) {
      // Today case is now handled separately with a dedicated badge variant
      case 'Upcoming':
        return 'text-green-600 border-green-600';
      case 'Past':
        return 'text-gray-500 border-gray-300';
      default:
        return '';
    }
  }

  return (
    <div className="container max-w-5xl py-10 px-4">
      <div className="mb-8">
        <BackButton />
        <h1 className="text-3xl font-bold tracking-tight">Events & Workshops</h1>
        <p className="text-gray-500 mt-1">
          Manage your event registrations and workshop RSVPs
        </p>
      </div>

      {/* Mobile tabs - visible only on mobile */}
      <div className="md:hidden flex border-b mb-6">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === 'events' 
              ? 'text-[#EC407A] border-b-2 border-[#EC407A]' 
              : 'text-gray-500'
          }`}
        >
          Events & Workshops
        </button>
        <button
          onClick={() => setActiveTab('classes')}
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === 'classes' 
              ? 'text-[#EC407A] border-b-2 border-[#EC407A]' 
              : 'text-gray-500'
          }`}
        >
          Classes
        </button>
        <button
          onClick={() => setActiveTab('instructors')}
          className={`flex-1 py-2 text-center text-sm font-medium ${
            activeTab === 'instructors' 
              ? 'text-[#EC407A] border-b-2 border-[#EC407A]' 
              : 'text-gray-500'
          }`}
        >
          Instructors
        </button>
      </div>

      {/* Desktop tabs - hidden on mobile */}
      <div className="hidden md:block mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="events" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Events & Workshops
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Classes
            </TabsTrigger>
            <TabsTrigger value="instructors" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Saved Instructors
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 rounded-full border-4 border-[#EC407A] border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Events Content */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              {userEvents.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userEvents.map((event) => (
                    <Card 
                      key={String(event.id)} 
                      className={`overflow-hidden flex flex-col h-full ${event.isPast ? 'opacity-75' : ''}`}
                    >
                      {event.image_url && (
                        <div className="h-40 overflow-hidden relative">
                          <img 
                            src={event.image_url} 
                            alt={event.event_name} 
                            className={`w-full h-full object-cover ${event.isPast ? 'grayscale' : ''}`}
                          />
                          {event.event_type && (
                            <div className={`absolute top-2 right-2 ${getEventTypeColor(event.event_type)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                              {event.event_type}
                            </div>
                          )}
                        </div>
                      )}
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.event_name}</h3>
                        <div className="space-y-2 mb-4 flex-grow">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-[#EC407A]" />
                            <span>{formatDate(event.start_datetime, event.timezone)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-[#EC407A]" />
                            <span>{formatTime(event.start_datetime, event.timezone)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-[#EC407A]" />
                            <span className="line-clamp-1">{event.location || 'TBA'}</span>
                          </div>
                        </div>
                        
                        {event.isPast && (
                          <Link href={`/events/${event.event_id}/reviews`}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full border-[#EC407A] text-[#EC407A] hover:bg-[#EC407A]/10"
                            >
                              <Star className="h-3.5 w-3.5 mr-1.5" />
                              Leave Review
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 border rounded-lg bg-gray-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No events or workshops</h3>
                  <p className="text-gray-500 mt-1 mb-6">
                    You haven't registered for any events or workshops
                  </p>
                  <Link href="/events">
                    <Button>Browse Events & Workshops</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Classes Content */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              {userClasses.length > 0 ? (
                <>
                  {/* Mobile view with cards */}
                  <div className="md:hidden space-y-4">
                    {userClasses.map((classItem) => (
                      <Card key={String(classItem.id)} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="font-medium mb-1.5">{classItem.class_name}</div>
                          <div className="grid grid-cols-2 gap-y-1.5 text-sm text-gray-600 mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              {formatDate(classItem.class_date)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              {formatTime(classItem.start_time)}
                            </div>
                            <div className="flex items-center col-span-2">
                              <MapPin className="h-3.5 w-3.5 mr-1.5" />
                              <span className="truncate">{classItem.location || 'TBA'}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-gray-500">
                              Instructor: {classItem.instructor || 'TBA'}
                            </div>
                            {classItem.temporal_status === 'Today' ? (
                              <Badge variant="today" className="text-xs">
                                Today
                              </Badge>
                            ) : (
                              <Badge variant="outline" className={`capitalize text-xs ${getStatusStyle(classItem.temporal_status)}`}>
                                {classItem.temporal_status}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Desktop view with table */}
                  <div className="hidden md:block rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Class</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Instructor</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userClasses.map((classItem) => (
                          <TableRow key={String(classItem.id)}>
                            <TableCell className="font-medium">{classItem.class_name}</TableCell>
                            <TableCell>{formatDate(classItem.class_date)}</TableCell>
                            <TableCell>{formatTime(classItem.start_time)}</TableCell>
                            <TableCell className="max-w-[150px] truncate">{`${classItem.location || 'TBA'} ${classItem.address ? `- ${classItem.address}` : ''}`}</TableCell>
                            <TableCell>{classItem.instructor || 'TBA'}</TableCell>
                            <TableCell>
                              {classItem.temporal_status === 'Today' ? (
                                <Badge variant="today">
                                  Today
                                </Badge>
                              ) : (
                                <Badge variant="outline" className={`capitalize ${getStatusStyle(classItem.temporal_status)}`}>
                                  {classItem.temporal_status}
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="text-center p-8 border rounded-lg bg-gray-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No classes</h3>
                  <p className="text-gray-500 mt-1 mb-6">
                    You haven't registered for any classes
                  </p>
                  <Link href="/classes">
                    <Button>Browse Classes</Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Saved Instructors Content */}
          {activeTab === 'instructors' && (
            <div className="space-y-6">
              {savedInstructors.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {savedInstructors.map((savedItem) => (
                    <Card 
                      key={savedItem.id} 
                      className="overflow-hidden flex flex-col h-full"
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={savedItem.instructor?.image_url || '/placeholder.svg'}
                          alt={savedItem.instructor?.name || 'Instructor'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-2 right-2">
                          <InstructorHeartButton 
                            instructorId={savedItem.instructor_id} 
                            className="p-2 bg-white/80 hover:bg-white rounded-full shadow-sm"
                            showToast={false}
                          />
                        </div>
                      </div>
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg line-clamp-1">
                              {savedItem.instructor?.name || 'Unknown Instructor'}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {savedItem.instructor?.style || 'Dance Instructor'}
                            </p>
                          </div>
                          {savedItem.instructor?.rating && savedItem.instructor.rating > 0 && (
                            <div className="flex items-center gap-1 bg-[#9D4EDD] text-white px-2 py-1 rounded-full ml-2">
                              <Star className="h-3 w-3 fill-current" />
                              {savedItem.instructor.rating}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <MapPin className="mr-1 h-4 w-4" />
                          {savedItem.instructor?.location || 'Location TBA'}
                        </div>
                        
                        <div className="text-sm mb-4 flex-grow">
                          <span className="font-medium">
                            ${savedItem.instructor?.price_lower || 0}-{savedItem.instructor?.price_upper || 0}
                          </span>
                          <span className="text-gray-500"> / hour</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          {savedItem.instructor?.reviews_count && savedItem.instructor.reviews_count > 0 ? (
                            <span className="text-sm text-gray-500">
                              {savedItem.instructor.reviews_count} reviews
                            </span>
                          ) : (
                            <span></span>
                          )}
                          <Link href={`/instructors`}>
                            <Button 
                              size="sm"
                              className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90"
                            >
                              View Profile
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 border rounded-lg bg-gray-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No saved instructors</h3>
                  <p className="text-gray-500 mt-1 mb-6">
                    You haven't saved any instructors yet. Browse our instructors and save your favorites!
                  </p>
                  <Link href="/instructors">
                    <Button>Browse Instructors</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
} 