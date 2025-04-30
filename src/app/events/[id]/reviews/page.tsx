"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

interface Review {
  id: number
  event_id: number
  user_name: string
  user_email: string
  rating: number
  review_text: string
  created_at: string
  is_approved: boolean
}

export default function EventReviewsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [event, setEvent] = useState<any>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState<number | null>(null)

  useEffect(() => {
    async function fetchEventAndReviews() {
      setLoading(true)
      
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('EVENT')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (eventError) {
        console.error('Error fetching event:', eventError)
        toast.error('Could not find the requested event')
        router.push('/events')
        return
      }

      if (!eventData) {
        toast.error('Could not find the requested event')
        router.push('/events')
        return
      }

      setEvent(eventData)
      
      // Fetch reviews for this event
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('event_reviews')
        .select('*')
        .eq('event_id', params.id)
        .order('created_at', { ascending: false })
      
      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError)
        toast.error('Could not load reviews')
        setLoading(false)
        return
      }

      setReviews(reviewsData || [])
      
      // Calculate average rating
      if (reviewsData && reviewsData.length > 0) {
        const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0)
        setAverageRating(totalRating / reviewsData.length)
      }
      
      setLoading(false)
    }

    fetchEventAndReviews()
  }, [params.id, router])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

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
    )
  }

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F94C8D] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/events" className="text-[#F94C8D] hover:underline mb-4 inline-block">
            &larr; Back to Events
          </Link>
        </div>
        
        {event && (
          <Card className="mb-8 overflow-hidden bg-white">
            <div className="h-64 md:h-72 relative">
              <Image
                src={event.image_url || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <p className="text-gray-600 mb-4">{formatDate(event.event_date)}</p>
              <p className="text-gray-700 mb-6">{event.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <h2 className="text-xl font-semibold">Reviews</h2>
                {averageRating !== null && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <div className="flex mr-1">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="text-sm font-medium">
                      {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                {event && (
                  <Link href={`/events/review/${event.id}`}>
                    <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90 text-white">
                      Submit Review
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
            <p className="text-gray-600 mb-4">Be the first to share your experience!</p>
            {event && (
              <Link href={`/events/review/${event.id}`}>
                <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90 text-white">
                  Submit Review
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#F94C8D]/10 text-[#F94C8D] rounded-full flex items-center justify-center font-semibold">
                      {(review.user_name || 'Anonymous').charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{review.user_name || 'Anonymous'}</p>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="ml-2 text-xs text-gray-500">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 whitespace-pre-line">{review.review_text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 