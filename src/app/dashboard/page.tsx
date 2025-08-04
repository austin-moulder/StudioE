"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, BookOpen, Star, FileText, MessageCircle, Users } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { getUserExtendedProfile } from "@/lib/profiles/profileUtils";

interface DashboardStats {
  upcomingEvents: number;
  upcomingClasses: number;
  pastEvents: number;
  pastClasses: number;
  reviewsGiven: number;
}

interface RecentReview {
  id: number;
  rating: number;
  review_text: string;
  event_title: string;
  created_at: string;
}

interface RecentEvent {
  id: number;
  title: string;
  event_date: string;
  image_url: string;
  start_datetime: string;
}

export default function Dashboard() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
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
  const [firstName, setFirstName] = useState<string>("");
  const [recentReview, setRecentReview] = useState<RecentReview | null>(null);
  const [upcomingEvent, setUpcomingEvent] = useState<RecentEvent | null>(null);
  const [pastEvent, setPastEvent] = useState<RecentEvent | null>(null);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Fetch user profile to determine if they're an instructor and get their name
  useEffect(() => {
    async function fetchUserProfile() {
      if (!user) return;
      
      try {
        // First try to get extended profile
        const extendedProfile = await getUserExtendedProfile(user.id);
        if (extendedProfile) {
          setUserProfile(extendedProfile);
          // Use account_type if it exists on the profile data
          if ('account_type' in extendedProfile) {
            setIsInstructor(extendedProfile.account_type === 'instructor');
          }
          return;
        }
        
        // Fallback to user_profiles if we need to
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        setUserProfile(data);
        if (data?.account_type) {
          setIsInstructor(data.account_type === 'instructor');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
    
    fetchUserProfile();

    // Set first name from user metadata or email
    if (user) {
      // Try to get name from user metadata
      const fullName = user.user_metadata?.full_name || '';
      if (fullName) {
        setFirstName(fullName.split(' ')[0]);
      } else if (user.email) {
        // Fallback to email username
        setFirstName(user.email.split('@')[0]);
      }
    }
  }, [user]);

  // Fetch dashboard stats and recent data
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
          .select('*, EVENT(id, title, start_datetime, image_url)')
          .eq('user_id', user.id);
            
        if (eventError) throw eventError;
        
        // Process event data with timestamp logic
        let upcomingEventsCount = 0;
        let pastEventsCount = 0;
        let upcomingEventData: RecentEvent | null = null;
        let pastEventData: RecentEvent | null = null;
        
        if (eventData) {
          const sortedEvents = eventData
            .filter(item => item.EVENT?.start_datetime)
            .sort((a, b) => new Date(a.EVENT.start_datetime).getTime() - new Date(b.EVENT.start_datetime).getTime());
          
          sortedEvents.forEach(item => {
            if (!item.EVENT?.start_datetime) return;
            
            const eventDate = new Date(item.EVENT.start_datetime);
            if (eventDate < now) {
              pastEventsCount++;
              // Get the most recent past event
              if (!pastEventData || eventDate > new Date(pastEventData.start_datetime)) {
                pastEventData = {
                  id: item.EVENT.id,
                  title: item.EVENT.title,
                  event_date: item.EVENT.start_datetime,
                  image_url: item.EVENT.image_url,
                  start_datetime: item.EVENT.start_datetime
                };
              }
            } else {
              upcomingEventsCount++;
              // Get the next upcoming event
              if (!upcomingEventData) {
                upcomingEventData = {
                  id: item.EVENT.id,
                  title: item.EVENT.title,
                  event_date: item.EVENT.start_datetime,
                  image_url: item.EVENT.image_url,
                  start_datetime: item.EVENT.start_datetime
                };
              }
            }
          });
        }
        
        // Fetch user reviews and get the most recent one
        const { data: userReviews, error: userReviewsError } = await supabase
          .from('event_reviews')
          .select('id, rating, review_text, created_at, event_id')
          .eq('auth_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (userReviewsError) throw userReviewsError;
        
        // Get event title for the most recent review
        let recentReviewData: RecentReview | null = null;
        if (userReviews && userReviews.length > 0) {
          const review = userReviews[0];
          const { data: eventData, error: eventError } = await supabase
            .from('EVENT')
            .select('title')
            .eq('id', review.event_id)
            .single();
          
          if (!eventError && eventData) {
            recentReviewData = {
              id: review.id,
              rating: review.rating,
              review_text: review.review_text,
              event_title: eventData.title,
              created_at: review.created_at
            };
          }
        }
        
        // Get total reviews count
        const { data: allUserReviews, error: allUserReviewsError } = await supabase
          .from('event_reviews')
          .select('*')
          .eq('auth_id', user.id);
        
        // Update stats with all data
        setStats(prev => ({
          ...prev,
          upcomingClasses: upcomingClassesCount,
          pastClasses: pastClassesCount,
          upcomingEvents: upcomingEventsCount,
          pastEvents: pastEventsCount,
          reviewsGiven: allUserReviews?.length || 0
        }));
        
        setRecentReview(recentReviewData);
        setUpcomingEvent(upcomingEventData);
        setPastEvent(pastEventData);
        
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

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              rating >= star 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#EC407A]"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 pb-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {firstName}!</h1>
          <p className="text-gray-600">Your dance journey continues</p>
        </div>
        
        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Events Card */}
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <Link href="/dashboard/events">
              <div 
                className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: upcomingEvent?.image_url 
                    ? `url(${upcomingEvent.image_url})` 
                    : 'url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png)',
                  backgroundPosition: upcomingEvent?.image_url ? 'center' : 'center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <div className="flex items-center text-white/90 text-sm mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Upcoming
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl mb-2">Events</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.upcomingEvents}</div>
                    <div className="text-white/80 text-sm">RSVP'd</div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-white/80" />
                </div>
              </div>
            </Link>
          </div>

          {/* Past Events Card */}
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <Link href="/dashboard/events">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: pastEvent?.image_url 
                    ? `url(${pastEvent.image_url})` 
                    : 'url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/dashboard_1.jpg)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <div className="flex items-center text-white/90 text-sm mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Past
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl mb-2">Events</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.pastEvents}</div>
                    <div className="text-white/80 text-sm">Attended</div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-white/80" />
                </div>
              </div>
            </Link>
          </div>

          {/* Reviews Card */}
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg group cursor-pointer bg-gradient-to-br from-purple-600 to-pink-600">
            <Link href="/dashboard/reviews">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 left-4">
                <div className="flex items-center text-white/90 text-sm mb-1">
                  <Star className="h-4 w-4 mr-1" />
                  Reviews
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-xl mb-2">Your Feedback</h3>
                {recentReview ? (
                  <div className="mb-3">
                    <div className="flex items-center mb-1">
                      {renderStars(recentReview.rating)}
                    </div>
                    <p className="text-white/90 text-sm line-clamp-2">
                      "{recentReview.review_text.substring(0, 80)}..."
                    </p>
                    <p className="text-white/70 text-xs mt-1">
                      {recentReview.event_title}
                    </p>
                  </div>
                ) : (
                  <p className="text-white/80 text-sm mb-3">No reviews yet</p>
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.reviewsGiven}</div>
                    <div className="text-white/80 text-sm">Total given</div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-white/80" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Upcoming Classes */}
          <Link href="/dashboard/lessons">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-[#EC407A]" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.upcomingClasses}</div>
              <div className="text-sm text-gray-600">Upcoming Classes</div>
            </div>
          </Link>

          {/* Past Classes */}
          <Link href="/dashboard/lessons">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="h-8 w-8 text-green-600" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.pastClasses}</div>
              <div className="text-sm text-gray-600">Past Classes</div>
            </div>
          </Link>

          {/* Messages */}
          <Link href="/dashboard/messages">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Messages</div>
            </div>
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-purple-600" />
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Profile</div>
              <div className="text-sm text-gray-600">Settings</div>
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/classes">
              <div className="flex items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer">
                <BookOpen className="h-8 w-8 text-[#EC407A] mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">Find Classes</div>
                  <div className="text-sm text-gray-600">Browse upcoming classes</div>
                </div>
              </div>
            </Link>

            <Link href="/events">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">Browse Events</div>
                  <div className="text-sm text-gray-600">Discover new events</div>
                </div>
              </div>
            </Link>

            <Link href="/instructors">
              <div className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <div className="font-semibold text-gray-900">Find Instructors</div>
                  <div className="text-sm text-gray-600">Connect with teachers</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden z-50">
        <Link href="/dashboard" className="flex flex-col items-center p-2 text-[#EC407A]">
          <div className="rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198c.03-.028.061-.056.091-.086L12 5.432Z" />
            </svg>
          </div>
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link href="/dashboard/privates" className="flex flex-col items-center p-2 text-gray-500">
          <div className="rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <span className="text-xs mt-1">Privates</span>
        </Link>
        
        <Link href="/dashboard/events" className="flex flex-col items-center p-2 text-gray-500">
          <div className="rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <span className="text-xs mt-1">Events</span>
        </Link>
        
        <Link href="/dashboard/messages" className="flex flex-col items-center p-2 text-gray-500">
          <div className="rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
          </div>
          <span className="text-xs mt-1">Messages</span>
        </Link>
        
        <Link href="/dashboard/payments" className="flex flex-col items-center p-2 text-gray-500">
          <div className="rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>
          </div>
          <span className="text-xs mt-1">Payments</span>
        </Link>
      </div>
    </div>
  );
} 