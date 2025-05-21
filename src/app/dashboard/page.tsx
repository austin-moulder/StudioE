"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, BookOpen, Star, FileText, MessageCircle } from "lucide-react";
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
    <div className="container mx-auto px-4 py-4 pb-20">
      {/* Welcome Banner */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome, {firstName}</h1>
        <p className="text-gray-600">Here's an overview of your activity and upcoming events</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Upcoming Events Stat */}
        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-gray-600 text-sm mb-1">Upcoming Events</h3>
          <div className="flex flex-col">
            <span className="text-4xl font-semibold">{stats.upcomingEvents}</span>
            <span className="text-sm text-gray-500">RSVP'd</span>
          </div>
        </div>
        
        {/* Upcoming Classes Stat */}
        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-gray-600 text-sm mb-1">Upcoming Classes</h3>
          <div className="flex flex-col">
            <span className="text-4xl font-semibold">{stats.upcomingClasses}</span>
            <span className="text-sm text-gray-500">RSVP'd</span>
          </div>
        </div>
        
        {/* Past Events Stat */}
        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-gray-600 text-sm mb-1">Past Events</h3>
          <div className="flex flex-col">
            <span className="text-4xl font-semibold">{stats.pastEvents}</span>
            <span className="text-sm text-gray-500">Attended</span>
          </div>
        </div>
        
        {/* Past Classes Stat */}
        <div className="bg-white rounded-md p-4 shadow-sm">
          <h3 className="text-gray-600 text-sm mb-1">Past Classes</h3>
          <div className="flex flex-col">
            <span className="text-4xl font-semibold">{stats.pastClasses}</span>
            <span className="text-sm text-gray-500">Attended</span>
          </div>
        </div>
      </div>
      
      {/* Reviews Given - Full Width */}
      <div className="bg-white rounded-md p-4 shadow-sm mb-8">
        <h3 className="text-gray-600 text-sm mb-1">Reviews Given</h3>
        <div className="flex flex-col">
          <span className="text-4xl font-semibold">{stats.reviewsGiven}</span>
          <span className="text-sm text-gray-500">Feedback</span>
        </div>
      </div>
      
      {/* Upcoming RSVPs Section */}
      <div className="bg-white rounded-md p-4 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Upcoming RSVPs</h2>
          <Link href="/dashboard/events" className="text-[#EC407A] text-sm flex items-center">
            View all <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
        <p className="text-gray-600 text-sm mb-4">Classes and events you've RSVP'd to</p>
        
        {/* Upcoming Events List */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Upcoming Events</h3>
          <div className="bg-gray-50 rounded-md p-4">
            {stats.upcomingEvents > 0 ? (
              <div>
                <p>You have {stats.upcomingEvents} upcoming events</p>
                <Link href="/dashboard/events" className="text-[#EC407A] text-sm flex items-center mt-2">
                  View details <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              </div>
            ) : (
              <p className="text-gray-500">No upcoming events</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Progress & Notes Section */}
      <div className="bg-white rounded-md p-4 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Progress & Notes</h2>
          <Link href="/dashboard/notes" className="text-[#EC407A] text-sm flex items-center">
            View all <ArrowRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
        <p className="text-gray-600 text-sm mb-4">Learning progress and instructor notes</p>
        
        {/* Placeholder for when no notes are available */}
        <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes yet</h3>
          <p className="text-gray-500">
            As you take private lessons, your instructors may leave notes for you.
          </p>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation - Visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden">
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