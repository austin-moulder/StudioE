"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabase";
import { useAuth } from "@/lib/hooks/useAuth";

interface ClassRSVP {
  inquiry_id: string;
  user_id: string;
  class_id: string;
  class_name: string;
  status: string;
  class_date: string;
  start_time: string;
  location: string;
  temporal_status: 'upcoming' | 'past';
}

interface EventRSVP {
  id: string;
  user_id: string;
  event_id: number;
  event_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  event_date: string;
  event_date_end: string | null;
  start_time: string;
  location: string;
  temporal_status: 'upcoming' | 'past';
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [upcomingClasses, setUpcomingClasses] = useState<ClassRSVP[]>([]);
  const [pastClasses, setPastClasses] = useState<ClassRSVP[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventRSVP[]>([]);
  const [pastEvents, setPastEvents] = useState<EventRSVP[]>([]);
  
  // Fetch RSVPs from the database
  useEffect(() => {
    async function fetchRSVPs() {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch upcoming classes
        const { data: upcomingClassesData, error: upcomingClassesError } = await supabase
          .from('class_inquiry_status')
          .select('*')
          .eq('user_id', user.id)
          .eq('temporal_status', 'upcoming');
        
        if (upcomingClassesError) throw upcomingClassesError;
        setUpcomingClasses(upcomingClassesData || []);
        
        // Fetch past classes
        const { data: pastClassesData, error: pastClassesError } = await supabase
          .from('class_inquiry_status')
          .select('*')
          .eq('user_id', user.id)
          .eq('temporal_status', 'past');
        
        if (pastClassesError) throw pastClassesError;
        setPastClasses(pastClassesData || []);
        
        // Fetch upcoming events
        const { data: upcomingEventsData, error: upcomingEventsError } = await supabase
          .from('event_rsvp_status')
          .select('*')
          .eq('user_id', user.id)
          .eq('temporal_status', 'upcoming');
        
        if (upcomingEventsError) throw upcomingEventsError;
        setUpcomingEvents(upcomingEventsData || []);
        
        // Fetch past events
        const { data: pastEventsData, error: pastEventsError } = await supabase
          .from('event_rsvp_status')
          .select('*')
          .eq('user_id', user.id)
          .eq('temporal_status', 'past');
        
        if (pastEventsError) throw pastEventsError;
        setPastEvents(pastEventsData || []);
        
      } catch (error) {
        console.error('Error fetching RSVPs:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRSVPs();
  }, [user]);
  
  // Format date helper function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time helper function
  const formatTime = (timeString: string | undefined | null) => {
    if (!timeString) return 'TBA';
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12 || 12;
    return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your RSVPs</h1>
        <p className="text-gray-500 mt-1">
          Manage your upcoming and past RSVPs for classes and events
        </p>
      </div>
      
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'upcoming' ? 'text-[#EC407A] border-b-2 border-[#EC407A]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'past' ? 'text-[#EC407A] border-b-2 border-[#EC407A]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'cancelled' ? 'text-[#EC407A] border-b-2 border-[#EC407A]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-12 h-12 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : activeTab === 'upcoming' && upcomingClasses.length === 0 && upcomingEvents.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-medium text-gray-900">No upcoming RSVPs</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            You don't have any upcoming RSVPs. Browse our classes and events to find your next dance experience.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/classes">
              <Button className="bg-[#EC407A] hover:bg-[#D81B60]">
                Explore Classes
              </Button>
            </Link>
            <Link href="/events">
              <Button className="bg-[#9933CC] hover:bg-[#8822BB]">
                Explore Events
              </Button>
            </Link>
          </div>
        </div>
      ) : activeTab === 'upcoming' ? (
        <div className="space-y-8">
          {/* Upcoming Classes */}
          {upcomingClasses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Class RSVPs</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingClasses.map((classRSVP) => (
                  <Card key={classRSVP.inquiry_id} className="overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{classRSVP.class_name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            {formatDate(classRSVP.class_date)}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1.5" />
                            {formatTime(classRSVP.start_time)}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1.5" />
                            {classRSVP.location || 'Location TBA'}
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          {classRSVP.status}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Event RSVPs</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {upcomingEvents.map((eventRSVP) => (
                  <Card key={eventRSVP.id} className="overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{eventRSVP.event_name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            {formatDate(eventRSVP.event_date)}
                            {eventRSVP.event_date_end && ` - ${formatDate(eventRSVP.event_date_end)}`}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1.5" />
                            {formatTime(eventRSVP.start_time)}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1.5" />
                            {eventRSVP.location || 'Location TBA'}
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                          {eventRSVP.status}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'past' && pastClasses.length === 0 && pastEvents.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-medium text-gray-900">No past RSVPs</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Your RSVP history will appear here after you attend classes or events.
          </p>
        </div>
      ) : activeTab === 'past' ? (
        <div className="space-y-8">
          {/* Past Classes */}
          {pastClasses.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Past Class RSVPs</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pastClasses.map((classRSVP) => (
                  <Card key={classRSVP.inquiry_id} className="overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{classRSVP.class_name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            {formatDate(classRSVP.class_date)}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1.5" />
                            {formatTime(classRSVP.start_time)}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1.5" />
                            {classRSVP.location || 'Location TBA'}
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                          Completed
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Past Event RSVPs</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {pastEvents.map((eventRSVP) => (
                  <Card key={eventRSVP.id} className="overflow-hidden">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{eventRSVP.event_name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            {formatDate(eventRSVP.event_date)}
                            {eventRSVP.event_date_end && ` - ${formatDate(eventRSVP.event_date_end)}`}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1.5" />
                            {formatTime(eventRSVP.start_time)}
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1.5" />
                            {eventRSVP.location || 'Location TBA'}
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                          Completed
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'cancelled' ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-medium text-gray-900">No cancelled RSVPs</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Any RSVPs you cancel will appear here.
          </p>
        </div>
      ) : null}
    </div>
  );
} 