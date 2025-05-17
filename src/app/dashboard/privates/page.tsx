"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import { BookOpen, Calendar, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivateLessonsPage() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Load Calendly widget when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        <p className="mt-4 text-gray-600">Loading your private lessons...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Private Lessons</h1>
        <p className="text-gray-500 mt-1">
          View and schedule your personalized one-on-one dance sessions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Private Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 border-2 border-dashed rounded-lg border-gray-200">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-xl font-medium text-gray-900">No private lessons booked yet</h3>
                <p className="mt-2 text-gray-500 max-w-lg mx-auto">
                  You haven't scheduled any private lessons. Private lessons are the fastest way to improve your dancing
                  and can be tailored specifically to your goals.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                  <a 
                    href="mailto:studioelatindance@gmail.com?subject=Private%20Lesson%20Inquiry&body=Hi%2C%20I'm%20interested%20in%20scheduling%20a%20private%20lesson.%20Here's%20some%20information%20about%20what%20I'm%20looking%20for%3A%0A%0A-%20Dance%20style(s)%20of%20interest%3A%20%0A-%20My%20experience%20level%3A%20%0A-%20My%20goals%3A%20%0A-%20Preferred%20days%2Ftimes%3A%20%0A%0AThank%20you!"
                    className="inline-flex items-center px-4 py-2 bg-[#EC407A] text-white rounded-md hover:bg-[#EC407A]/90 transition-colors"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us to Book
                  </a>
                  <span className="text-gray-500 flex items-center">or</span>
                  <Button className="bg-[#9933CC] hover:bg-[#9933CC]/90">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Consultation Below
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Not sure where to start? Schedule a free 30-minute consultation to discuss your goals and build a customized program.
              </p>
              <Link 
                href="#consultation"
                className="text-[#EC407A] text-sm hover:underline inline-flex items-center"
              >
                Jump to scheduler
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <div id="consultation" className="mt-12 pt-6 border-t">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Schedule a Free Consultation</h2>
          <p className="mt-2 text-gray-600">
            Book a 30-minute call with one of our instructors to discuss your dance goals and build a personalized private lesson plan.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/studioelatindance/30min" 
            style={{ minWidth: "320px", height: "700px" }}
          ></div>
        </div>
      </div>
    </div>
  );
} 