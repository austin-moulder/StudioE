"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ArrowRight, Users } from "lucide-react";
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
import { useAuth } from "@/lib/auth/auth-context";

// Types for our data
interface Event {
  id: number;
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  event_type: string;
  image_url: string;
  is_rsvped?: boolean;
  status?: string;
}

interface Class {
  id: string;
  class_name: string;
  class_date: string;
  start_time: string;
  location: string;
  instructor: string;
  status?: string;
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("events");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [userClasses, setUserClasses] = useState<Class[]>([]);
  
  // Fetch data from the database
  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Get all events the user has RSVP'd to
        const { data: rsvps, error: rsvpError } = await supabase
          .from('event_rsvp_status')
          .select('event_id, status')
          .eq('user_id', user.id);
        
        if (rsvpError) {
          console.error('Error fetching RSVPs:', rsvpError);
          throw rsvpError;
        }
        
        if (rsvps && rsvps.length > 0) {
          // Get the event IDs the user has RSVP'd to
          const eventIds = rsvps.map(rsvp => rsvp.event_id);
          
          // Get the full event data for those IDs
          const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .in('id', eventIds)
            .order('start_datetime', { ascending: true });
          
          if (eventsError) {
            console.error('Error fetching events:', eventsError);
            throw eventsError;
          }
          
          // Combine event data with RSVP status
          if (eventsData) {
            const processedEvents = eventsData.map(event => {
              const rsvp = rsvps.find(r => r.event_id === event.id);
              return {
                ...event,
                is_rsvped: true,
                status: rsvp?.status || 'confirmed'
              };
            });
            
            setUserEvents(processedEvents);
          }
        } else {
          setUserEvents([]);
        }
        
        // Fetch class registrations
        const { data: classRegistrations, error: classError } = await supabase
          .from('class_inquiry_status')
          .select('class_id, class_name, status')
          .eq('user_id', user.id);
        
        if (classError) {
          console.error('Error fetching class registrations:', classError);
          throw classError;
        }
        
        if (classRegistrations && classRegistrations.length > 0) {
          const classIds = classRegistrations.map(reg => reg.class_id);
          
          const { data: classesData, error: classesError } = await supabase
            .from('classes')
            .select('*')
            .in('id', classIds)
            .order('class_date', { ascending: true });
          
          if (classesError) {
            console.error('Error fetching classes:', classesError);
            throw classesError;
          }
          
          if (classesData) {
            const processedClasses = classesData.map(classItem => {
              const registration = classRegistrations.find(r => r.class_id === classItem.id);
              return {
                ...classItem,
                class_name: registration?.class_name || classItem.class_name || 'Class',
                status: registration?.status || 'confirmed'
              };
            });
            
            setUserClasses(processedClasses);
          }
        } else {
          setUserClasses([]);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUserData();
  }, [user]);
  
  // Helper functions for formatting
  const formatDate = (datetimeStr) => {
    if (!datetimeStr) return 'TBA';
    
    try {
      const date = new Date(datetimeStr);
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Invalid date';
    }
  };

  const formatTime = (datetimeStr) => {
    if (!datetimeStr) return 'TBA';
    
    try {
      const date = new Date(datetimeStr);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch (e) {
      // If it's just a time string (not datetime)
      if (typeof datetimeStr === 'string' && datetimeStr.includes(':')) {
        const parts = datetimeStr.split(':');
        if (parts.length >= 2) {
          const hours = parseInt(parts[0]);
          const minutes = parseInt(parts[1]);
          if (!isNaN(hours) && !isNaN(minutes)) {
            const period = hours >= 12 ? 'PM' : 'AM';
            const hour12 = hours % 12 || 12;
            return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
          }
        }
      }
      return 'Invalid time';
    }
  };

  // Get event type badge color
  const getEventTypeColor = (eventType) => {
    switch(eventType?.toLowerCase()) {
      case 'social': return 'bg-[#9933CC]';
      case 'showcase': return 'bg-[#FF3366]';
      case 'festival': return 'bg-[#FF7A5A]';
      case 'workshop': return 'bg-[#333333]';
      case 'community': return 'bg-[#CC3399]';
      case 'audition': return 'bg-[#4CAF50]';
      case 'competition': return 'bg-[#FF6B00]';
      default: return 'bg-[#9933CC]'; 
    }
  };

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Events & Workshops</h1>
        <p className="text-gray-500 mt-1">
          Manage your event registrations and workshop RSVPs
        </p>
      </div>

      <Tabs defaultValue="events" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="events" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Events & Workshops
          </TabsTrigger>
          <TabsTrigger value="classes" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Classes
          </TabsTrigger>
        </TabsList>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-[#EC407A] border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              {userEvents.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden flex flex-col h-full">
                      {event.image_url && (
                        <div className="h-40 overflow-hidden relative">
                          <img 
                            src={event.image_url} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                          />
                          {event.event_type && (
                            <div className={`absolute top-2 right-2 ${getEventTypeColor(event.event_type)} text-white text-xs font-medium py-1 px-2 rounded-full`}>
                              {event.event_type}
                            </div>
                          )}
                          <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-xs py-1 px-2 rounded-full text-gray-800">
                            {event.status || 'Registered'}
                          </div>
                        </div>
                      )}
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                        <div className="space-y-2 mb-4 flex-grow">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-[#EC407A]" />
                            <span>{formatDate(event.start_datetime)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-[#EC407A]" />
                            <span>{formatTime(event.start_datetime)}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-[#EC407A]" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Link href={`/events/${event.id}`}>
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              View Details
                              <ArrowRight className="h-4 w-4 ml-1" />
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
            </TabsContent>
            
            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6">
              {userClasses.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
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
                        <TableRow key={classItem.id}>
                          <TableCell className="font-medium">{classItem.class_name}</TableCell>
                          <TableCell>{formatDate(classItem.class_date)}</TableCell>
                          <TableCell>{formatTime(classItem.start_time)}</TableCell>
                          <TableCell className="max-w-[150px] truncate">{classItem.location}</TableCell>
                          <TableCell>{classItem.instructor || 'TBA'}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {classItem.status || 'Registered'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
} 