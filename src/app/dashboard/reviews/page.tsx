"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { redirect } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserReview {
  id: number;
  event_id: number;
  auth_id: string;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  is_approved: boolean;
  event_title: string;
  event_date: string;
  event_image_url: string;
}

export default function UserReviewsPage() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user reviews
  useEffect(() => {
    async function fetchUserReviews() {
      if (!user) return;
      
      try {
        setIsLoadingReviews(true);
        
        const { data, error } = await supabase
          .from('user_event_reviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching user reviews:', error);
          return;
        }
        
        setReviews(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoadingReviews(false);
      }
    }
    
    if (user) {
      fetchUserReviews();
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
        <p className="mt-4 text-gray-600">Loading your reviews...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Your Reviews</h1>
        <p className="text-gray-500 mt-1">
          Reviews you've submitted for events and classes
        </p>
      </div>

      {isLoadingReviews ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Star className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-xl font-semibold mb-2">No Reviews Yet</h2>
          <p className="text-gray-600 mb-6">You haven't submitted any reviews for events or classes yet.</p>
          <Link href="/events">
            <Button className="bg-[#EC407A] hover:bg-[#EC407A]/90">
              Browse Events
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative h-48 md:h-full">
                  <Image
                    src={review.event_image_url || "/placeholder.svg"}
                    alt={review.event_title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 md:col-span-2">
                  <h2 className="text-xl font-semibold mb-1">{review.event_title}</h2>
                  <p className="text-sm text-gray-500 mb-2">{formatDate(review.event_date)}</p>
                  
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 whitespace-pre-line">{review.review_text}</p>
                  
                  <div className="mt-4">
                    <Link href={`/events/${review.event_id}/reviews`}>
                      <Button variant="outline" size="sm">
                        View Event Reviews
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 