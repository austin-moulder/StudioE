"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export default function EventReviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [event, setEvent] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: 'Anonymous',
    email: '',
    rating: 5,
    review_text: '',
  })

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true)
      const { data, error } = await supabase
        .from('EVENT')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (error) {
        console.error('Error fetching event:', error)
        toast.error('Could not find the requested event')
        router.push('/events')
        return
      }

      // Check if event exists and is in the past
      if (data) {
        const eventDate = new Date(data.event_date)
        const now = new Date()
        const isPastEvent = eventDate < now
        
        if (!isPastEvent) {
          toast.error('Reviews can only be submitted for past events')
          router.push('/events')
          return
        }
        
        console.log('Event data fetched:', data)
        console.log('Event ID:', data.id, 'Type:', typeof data.id)
        setEvent(data)
      } else {
        toast.error('Could not find the requested event')
        router.push('/events')
      }
      
      setLoading(false)
    }

    fetchEvent()
  }, [params.id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    if (!event) {
      toast.error('Event information is missing')
      setSubmitting(false)
      return
    }

    try {
      console.log('Submitting review for event ID:', event.id, 'Type:', typeof event.id)

      // Insert review into event_reviews table
      const { data, error } = await supabase
        .from('event_reviews')
        .insert([
          {
            event_id: event.id,
            user_name: formData.name,
            user_email: formData.email,
            rating: formData.rating,
            review_text: formData.review_text,
            is_approved: false
          }
        ])
      
      if (error) {
        console.error('Error submitting review:', error)
        toast.error(`Failed to submit review: ${error.message}`)
        setSubmitting(false)
        return
      }

      console.log('Review submitted successfully:', data)
      toast.success('Your review has been submitted successfully!')
      
      // Redirect to the reviews page for this event
      setTimeout(() => {
        router.push(`/events/${event.id}/reviews`)
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F94C8D] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Submit a Review</h1>
        <p className="text-gray-600 mb-8">Share your experience at this event</p>
        
        {event && (
          <Card className="mb-8 overflow-hidden bg-white">
            <div className="h-48 relative">
              <Image
                src={event.image_url || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{formatDate(event.event_date)}</p>
              <p className="text-gray-700">{event.description}</p>
            </CardContent>
          </Card>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="font-medium">Your Name</Label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Enter your name or leave as Anonymous"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Leave as "Anonymous" if you prefer not to share your name</p>
          </div>
          
          <div>
            <Label htmlFor="email" className="font-medium">Email Address</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Enter your email"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Your email will not be shared publicly or with the event organizer</p>
          </div>
          
          <div>
            <Label className="font-medium mb-2 block">Your Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`h-7 w-7 ${
                      formData.rating >= star 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="review_text" className="font-medium">Your Review</Label>
            <Textarea 
              id="review_text"
              name="review_text"
              value={formData.review_text}
              onChange={handleInputChange}
              className="mt-1"
              rows={5}
              placeholder="Share your experience with this event..."
              required
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="mr-2"
              onClick={() => router.push('/events')}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#F94C8D] hover:bg-[#F94C8D]/90 text-white"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-white rounded-full"></div>
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 