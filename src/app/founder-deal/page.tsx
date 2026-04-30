"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Star } from "lucide-react"
import { getFeaturedTestimonials } from "@/lib/testimonials/testimonialUtils"
import { Testimonial } from "@/types/testimonial"
import useEmblaCarousel from 'embla-carousel-react'

export default function FounderDealPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10 * 60)

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const featured = await getFeaturedTestimonials(6)
        setTestimonials(featured)
      } catch (error) {
        console.error("Error loading testimonials:", error)
      } finally {
        setTestimonialsLoading(false)
      }
    }
    
    loadTestimonials()
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) return

    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(countdown)
  }, [timeLeft])

  const scrollTo = (index: number) => {
    emblaApi && emblaApi.scrollTo(index);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")

  // Calculate redemption deadline (current date + 7 days)
  const redemptionDeadline = new Date()
  redemptionDeadline.setDate(redemptionDeadline.getDate() + 7)
  const deadlineFormatted = redemptionDeadline.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Thank You Section */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 break-words">
            Thank you for investing in yourself
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed break-words">
              Your class is waiting for you at our studio at <span className="font-semibold">2657 W Division Street</span>. This free offer must be redeemed by <span className="font-semibold text-[#FF3366]">{deadlineFormatted}</span>.
            </p>
          </div>
        </div>

        {/* Embedded Google Form */}
        <div className="mb-16">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
            <iframe
              src="https://forms.gle/K6hYbzqSFKcNNUpe9"
              title="Claim Your Free Class with Studio E"
              className="w-full"
              style={{ minHeight: "900px" }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Urgency Section */}
        <Card className="border-2 border-red-500 shadow-xl mb-16">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-7 h-7 text-red-500" />
              <h3 className="text-2xl md:text-3xl font-bold text-red-600 break-words">
                Only 6 vouchers left over the next 2 weeks to come in and try a FREE class on us
              </h3>
            </div>
            <p className="text-gray-700 text-lg mb-6">
              Claim your spot before these vouchers are gone.
            </p>
            <div className="inline-flex items-center justify-center rounded-xl bg-red-50 border border-red-200 px-8 py-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-red-500 mr-3">Time left</span>
              <span className="text-3xl md:text-4xl font-black text-red-600 tabular-nums">
                {minutes}:{seconds}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Proof Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 break-words">
            We've helped <span className="text-[#FF3366]">1,000+</span> students across the nation learn social dancing
          </h3>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-16">
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonialsLoading ? (
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF3366] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading testimonials...</p>
                  </div>
                </div>
              ) : (
                testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4">
                    <Card className="h-full">
                      <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                          {testimonial.image_url && testimonial.image_url !== "/placeholder.svg" ? (
                            <Image
                              src={testimonial.image_url}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              className="rounded-full object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-20 h-20 bg-gradient-to-r from-[#FF3366] to-[#9933CC] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        
                        <h4 className="font-bold text-xl text-gray-900 mb-2">{testimonial.name}</h4>
                        <p className="text-sm font-medium text-[#FF3366] mb-4">
                          {testimonial.style} Student
                        </p>
                        
                        <p className="text-gray-800 font-medium text-lg leading-relaxed mb-6">
                          "{testimonial.quote}"
                        </p>
                        
                        <div className="flex justify-center space-x-1">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Carousel Dots */}
          {!testimonialsLoading && testimonials.length > 0 && (
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === selectedIndex ? 'bg-[#FF3366]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
