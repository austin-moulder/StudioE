"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Clock, Shield } from "lucide-react"
import { getFeaturedTestimonials } from "@/lib/testimonials/testimonialUtils"
import { Testimonial } from "@/types/testimonial"
import useEmblaCarousel from 'embla-carousel-react'

export default function FounderDealPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

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

  const scrollTo = (index: number) => {
    emblaApi && emblaApi.scrollTo(index);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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
              Your classes, smoothie, and social ticket are waiting for you at our studio at <span className="font-semibold">2716 W Division Street</span>. Let us know that you filled out the form, and we'll take care of you. These free offers must be redeemed by <span className="font-semibold text-[#FF3366]">{deadlineFormatted}</span>.
            </p>
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
            <Image
              src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Landing_page_1.png"
              alt="Studio E Method Video"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-[#FF3366] border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder's Membership Callout */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-white py-6 px-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold">
              Founder's Membership
            </h2>
            <p className="text-lg mt-2 opacity-90">
              Only available for a limited time
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-2 border-[#FF3366] shadow-xl mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 break-words">
                Access up to 8 classes every month at a $49 discount FOR LIFE*
              </h2>
              <p className="text-lg text-gray-600 mb-8 break-words">
                Enrollment in our Silver Plan at a special founder's rate. Discounts only available for the first 100 members
              </p>
              
              {/* Price Anchoring */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <span className="text-2xl text-gray-400 line-through">$89/month</span>
                  <span className="text-4xl font-bold text-[#FF3366]">$39/month</span>
                </div>
                <div className="text-center text-gray-700">
                  <p className="text-lg font-semibold mb-2">Compare the value:</p>
                  <div className="flex justify-center items-center space-x-6 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-gray-900">Drop-in Class</p>
                      <p className="text-gray-600">$25 per class</p>
                    </div>
                    <div className="text-gray-400">vs</div>
                    <div className="text-center">
                      <p className="font-bold text-[#FF3366]">With Membership</p>
                      <p className="text-[#FF3366]">~$5 per class</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full md:w-auto h-16 text-xl font-bold bg-gradient-to-r from-[#FF3366] to-[#9933CC] hover:from-[#FF3366]/90 hover:to-[#9933CC]/90 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 px-12">
                GET MY LIFETIME DISCOUNT
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Urgency Section */}
        <Card className="border-2 border-red-500 shadow-xl mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Clock className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-red-600 break-words">
                Only 7 spots left as of {currentDate}
              </h3>
            </div>
            <p className="text-center text-lg text-gray-700 break-words">
              Once this deal is gone, it's gone forever.
            </p>
          </CardContent>
        </Card>

        {/* Guarantee Section */}
        <Card className="border-2 border-green-500 shadow-xl mb-16">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Shield className="w-8 h-8 text-green-500" />
              <h3 className="text-2xl font-bold text-green-600 break-words">
                Our Guarantee
              </h3>
            </div>
            <p className="text-center text-lg text-gray-700 break-words">
              We are so confident you'll love us that if you can't social dance a full song in the first 30 days, we will refund your first month.
            </p>
          </CardContent>
        </Card>

        {/* Proof Section - Moved here */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 break-words">
            We've helped <span className="text-[#FF3366]">300+</span> students across the nation learn social dancing
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

        {/* Terms Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4">Terms & Conditions</h4>
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                <strong>*Lifetime Discount Terms:</strong> The $49 discount is calculated based on the value of 8 classes per month at the standard monthly membership rate. 
                This discount is available for the lifetime of your active membership, provided you maintain continuous membership without interruption.
              </p>
              <p>
                <strong>Membership Requirements:</strong> To maintain the discount, you must keep an active monthly membership. 
                If your membership is cancelled or expires, the discount will no longer be available upon reactivation.
              </p>
              <p>
                <strong>Class Access:</strong> Up to 8 classes per month are included with your membership. 
                Additional classes may be available at a reduced rate for members.
              </p>
              <p>
                <strong>Limited Time Offer:</strong> This Founder's Membership is only available for a limited time and is limited to the first 100 members.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
