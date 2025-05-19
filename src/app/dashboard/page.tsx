"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import { ArrowRight, Calendar, BookOpen, Star, Image, Bell, CreditCard, FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";
import LessonInvoiceForm from "@/components/dashboard/LessonInvoiceForm";

interface DashboardStats {
  upcomingEvents: number;
  upcomingClasses: number;
  pastEvents: number;
  pastClasses: number;
  reviewsGiven: number;
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    upcomingEvents: 0,
    upcomingClasses: 0,
    pastEvents: 0,
    pastClasses: 0,
    reviewsGiven: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user profile to determine if they're an instructor
  useEffect(() => {
    async function fetchUserProfile() {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        setUserProfile(data);
        
        // Check if user is an instructor
        setIsInstructor(data?.account_type === 'instructor');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
    
    fetchUserProfile();
  }, [user]);

  // Fetch dashboard stats
  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      
      try {
        setIsLoadingStats(true);
        
        // Fetch class data and determine status based on date
        const { data: classData, error: classError } = await supabase
          .from('class_inquiry_status')
          .select('*, classes(class_date)')
          .eq('user_id', user.id);
            
        if (classError) throw classError;
        
        // Process class data with timestamp logic
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        let upcomingClassesCount = 0;
        let pastClassesCount = 0;
        
        if (classData) {
          classData.forEach(item => {
            if (!item.classes?.class_date) return;
            
            // Parse date handling different formats
            let classDate;
            const dateStr = item.classes.class_date;
            const dateParts = (typeof dateStr === 'string' ? dateStr.split('T')[0] : dateStr).split('-');
            
            if (dateParts.length === 3) {
              // Create date with explicit values to avoid timezone issues
              classDate = new Date(
                parseInt(dateParts[0]),     // year
                parseInt(dateParts[1]) - 1, // month (0-indexed)
                parseInt(dateParts[2])      // day
              );
              
              // Compare only the date part
              const classDateOnly = new Date(
                classDate.getFullYear(),
                classDate.getMonth(),
                classDate.getDate()
              );
              
              if (classDateOnly.getTime() < today.getTime()) {
                pastClassesCount++;
              } else {
                upcomingClassesCount++;
              }
            }
          });
        }
        
        // Fetch event data
        const { data: eventData, error: eventError } = await supabase
          .from('event_rsvp_status')
          .select('*, EVENT(start_datetime)')
          .eq('user_id', user.id);
            
        if (eventError) throw eventError;
        
        // Process event data with timestamp logic
        let upcomingEventsCount = 0;
        let pastEventsCount = 0;
        
        if (eventData) {
          eventData.forEach(item => {
            if (!item.EVENT?.start_datetime) return;
            
            const eventDate = new Date(item.EVENT.start_datetime);
            if (eventDate < now) {
              pastEventsCount++;
            } else {
              upcomingEventsCount++;
            }
          });
        }
        
        // Fetch user reviews
        const { data: userReviews, error: userReviewsError } = await supabase
          .from('event_reviews')
          .select('*')
          .eq('auth_id', user.id);
          
        if (userReviewsError) throw userReviewsError;
        
        // Update stats with all data
        setStats(prev => ({
          ...prev,
          upcomingClasses: upcomingClassesCount,
          pastClasses: pastClassesCount,
          upcomingEvents: upcomingEventsCount,
          pastEvents: pastEventsCount,
          reviewsGiven: userReviews?.length || 0
        }));
        
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoadingStats(false);
      }
    }
    
    if (user) {
      fetchStats();
    }
  }, [user]);

  // If not mounted yet, don't render anything to avoid hydration mismatch
  if (!mounted) return null;

  // If not loading and no user, redirect to sign in
  if (!isLoading && !user) {
    redirect("/");
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="container max-w-5xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  // Display name for the user
  const displayName = user?.user_metadata?.full_name || 
                      (user?.email ? user.email.split('@')[0] : 'User');

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {displayName}</h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your activity and upcoming events
        </p>
      </div>

      {/* Quick Stats - More compact on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-0 pt-3 px-3">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-1 px-3">
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.upcomingEvents}</div>
            <p className="text-xs text-gray-500">RSVP'd</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-0 pt-3 px-3">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-1 px-3">
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.upcomingClasses}</div>
            <p className="text-xs text-gray-500">RSVP'd</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-0 pt-3 px-3">
            <CardTitle className="text-sm font-medium text-gray-500">Past Events</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-1 px-3">
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.pastEvents}</div>
            <p className="text-xs text-gray-500">Attended</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-0 pt-3 px-3">
            <CardTitle className="text-sm font-medium text-gray-500">Past Classes</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-1 px-3">
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.pastClasses}</div>
            <p className="text-xs text-gray-500">Attended</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-2 md:col-span-1 shadow-sm">
          <CardHeader className="pb-0 pt-3 px-3">
            <CardTitle className="text-sm font-medium text-gray-500">Reviews Given</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-1 px-3">
            <div className="text-2xl font-bold">{isLoadingStats ? "..." : stats.reviewsGiven}</div>
            <p className="text-xs text-gray-500">Feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Calendar and Bookings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Show Lesson Invoice Form for instructors only */}
          {isInstructor && (
            <LessonInvoiceForm />
          )}
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming RSVPs</CardTitle>
                <Link href="/dashboard/rsvp" className="text-sm text-[#EC407A] flex items-center gap-1 hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-1">Classes and events you've RSVP'd to</p>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : stats.upcomingClasses === 0 && stats.upcomingEvents === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                  <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No upcoming RSVPs</h3>
                  <p className="mt-1 text-sm text-gray-500">When you RSVP to classes or events, they'll show up here.</p>
                  <div className="mt-4 flex gap-2 justify-center">
                    <Link href="/classes">
                      <Button className="px-4 py-2 rounded-md bg-[#EC407A] text-white text-sm font-medium hover:bg-[#D81B60] transition-colors">
                        Browse Classes
                      </Button>
                    </Link>
                    <Link href="/events">
                      <Button className="px-4 py-2 rounded-md bg-[#9933CC] text-white text-sm font-medium hover:bg-[#8822BB] transition-colors">
                        Browse Events
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  {/* If there are upcoming classes */}
                  {stats.upcomingClasses > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 text-gray-800">Upcoming Classes</h3>
                      <div className="space-y-3">
                        {/* We'll need to add a query for the upcoming class details here once that feature is implemented */}
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-500">You have {stats.upcomingClasses} upcoming {stats.upcomingClasses === 1 ? 'class' : 'classes'}</p>
                          <Link href="/dashboard/rsvp" className="text-sm text-[#EC407A] flex items-center gap-1 hover:underline mt-2">
                            View details <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* If there are upcoming events */}
                  {stats.upcomingEvents > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 text-gray-800">Upcoming Events</h3>
                      <div className="space-y-3">
                        {/* We'll need to add a query for the upcoming event details here once that feature is implemented */}
                        <div className="p-4 border rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-500">You have {stats.upcomingEvents} upcoming {stats.upcomingEvents === 1 ? 'event' : 'events'}</p>
                          <Link href="/dashboard/rsvp" className="text-sm text-[#EC407A] flex items-center gap-1 hover:underline mt-2">
                            View details <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Progress & Notes</CardTitle>
                <Link href="/dashboard/privates" className="text-sm text-[#EC407A] flex items-center gap-1 hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-1">Learning progress and instructor notes</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No notes yet</h3>
                <p className="mt-1 text-sm text-gray-500">As you take private lessons, your instructors may leave notes for you.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Activity, Reviews, Gallery */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Gallery</CardTitle>
              <p className="text-gray-500 text-sm mt-1">Photos from events you've attended</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                <Image className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No photos yet</h3>
                <p className="mt-1 text-sm text-gray-500">Photos from events you attend will appear here.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reviews</CardTitle>
                {stats.reviewsGiven > 0 && (
                  <Link href="/dashboard/reviews" className="text-sm text-[#EC407A] flex items-center gap-1 hover:underline">
                    View all <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1">Your instructor and class reviews</p>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : stats.reviewsGiven > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm">You have submitted {stats.reviewsGiven} {stats.reviewsGiven === 1 ? 'review' : 'reviews'} for classes and events.</p>
                  <Link href="/dashboard/reviews">
                    <Button className="w-full bg-[#EC407A] hover:bg-[#EC407A]/90">
                      View Your Reviews
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                  <Star className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Reviews you leave for classes and events will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Info</CardTitle>
              <p className="text-gray-500 text-sm mt-1">Your payment methods and history</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 border-2 border-dashed rounded-lg border-gray-200">
                <CreditCard className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">Payment Info Coming Soon</h3>
                <p className="mt-1 text-sm text-gray-500">This feature is under development.</p>
                <Button 
                  className="mt-4 bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 