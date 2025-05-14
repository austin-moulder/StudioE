"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import { ArrowRight, Calendar, BookOpen, Star, Image, Bell, CreditCard, FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-500">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-500">Past Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-gray-500">Reviews Given</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Calendar and Bookings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Bookings</CardTitle>
                <Link href="/dashboard/bookings" className="text-sm text-[#EC407A] flex items-center gap-1 hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-1">Your upcoming classes and events</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No upcoming bookings</h3>
                <p className="mt-1 text-sm text-gray-500">When you book classes or events, they'll show up here.</p>
                <Link href="/classes" className="mt-4 inline-block">
                  <button className="px-4 py-2 rounded-md bg-[#EC407A] text-white text-sm font-medium hover:bg-[#D81B60] transition-colors">
                    Browse Classes
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Progress & Notes</CardTitle>
                <Link href="/dashboard/notes" className="text-sm text-[#EC407A] flex items-center gap-1 hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-gray-500 text-sm mt-1">Learning progress and instructor notes</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                <FileText className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No notes yet</h3>
                <p className="mt-1 text-sm text-gray-500">As you take classes, your instructors may leave notes for you.</p>
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
              <CardTitle>Reviews</CardTitle>
              <p className="text-gray-500 text-sm mt-1">Your instructor and class reviews</p>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed rounded-lg border-gray-200">
                <Star className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                <p className="mt-1 text-sm text-gray-500">Reviews you leave for instructors will appear here.</p>
              </div>
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
                <h3 className="text-lg font-medium text-gray-900">No payment methods</h3>
                <p className="mt-1 text-sm text-gray-500">Add a payment method for faster checkout.</p>
                <button className="mt-4 px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
                  Add Payment Method
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 