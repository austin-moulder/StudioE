"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function WeddingDancePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full bg-gray-300">
          {/* Hero image placeholder */}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Wedding Dance Choreography
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Create a first dance that's sexy, stylish, and totally you.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/wedding-dance.jpg"
                alt="Wedding dance"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center rounded-md bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                  Premium Service
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your Perfect First Dance
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Want a wedding dance that's sexy, stylish, and totally you?
              </p>
              <p className="mt-4 text-gray-500">
                Our professional choreographers will help you create a memorable first dance in just 4-6 weeks. 
                This is not your typical ballroom experience!
              </p>
              <ul className="mt-6 space-y-2 text-gray-500 list-disc pl-5">
                <li>Tailored instructor hand-chosen by Studio E, based on your specific needs</li>
                <li>Personalized private lessons with one of Chicago's best instructors</li>
                <li>Custom choreography tailored to your song choice and style</li>
                <li>Latin-inspired movements that feel natural and showcase your connection</li>
                <li>Video recordings of your progress to practice at home</li>
                <li>Confidence-building techniques for your big day</li>
                <li>Learn strong fundamentals of social dance that you'll share together for the rest of your lives</li>
              </ul>
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-[#FF3366] hover:bg-[#FF3366]/90"
                  onClick={() => {
                    window.location.href = "mailto:studioelatindance@gmail.com?subject=Wedding Dance Choreography Inquiry&body=Hello Studio E,%0A%0AI'm interested in learning more about your wedding dance choreography services. My wedding date is [your date] and I'm looking for [what you're looking for in your first dance].%0A%0APlease send me more information about your packages and availability.%0A%0AThank you!";
                  }}
                >
                  Get More Information
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Our Process</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              From your first consultation to your wedding day, we're with you every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#FF3366]/10 text-[#FF3366] rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Initial Consultation</h3>
              <p className="text-gray-600">
                We'll learn about your vision, song choice, experience level, and wedding timeline to match you with the perfect instructor.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#FF3366]/10 text-[#FF3366] rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Custom Choreography</h3>
              <p className="text-gray-600">
                Your instructor will create a unique choreography that highlights your connection and feels natural to perform.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#FF3366]/10 text-[#FF3366] rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Rehearsal & Refinement</h3>
              <p className="text-gray-600">
                Through weekly sessions, you'll practice, refine, and master your routine, gaining confidence with each lesson.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">How much time do we need?</h3>
              <p className="text-gray-600">
                Ideally, you should start 4-6 weeks before your wedding. This gives us enough time to create, practice, and perfect your routine without feeling rushed.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">We have two left feet. Can you still help?</h3>
              <p className="text-gray-600">
                Absolutely! Our instructors specialize in working with beginners. We'll create a routine that matches your comfort level while still looking impressive.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Can we choose any song?</h3>
              <p className="text-gray-600">
                Yes! We'll work with your chosen song, whatever the style. Our instructors are skilled at adapting various dance styles to match different music genres.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2">Where do the lessons take place?</h3>
              <p className="text-gray-600">
                Lessons are typically held at one of our partner dance studios in Chicago. We can also arrange for lessons at your location for an additional fee.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-[#FF3366] hover:bg-[#FF3366]/90"
              onClick={() => {
                window.location.href = "mailto:studioelatindance@gmail.com?subject=Wedding Dance Choreography Inquiry&body=Hello Studio E,%0A%0AI'm interested in learning more about your wedding dance choreography services. My wedding date is [your date] and I'm looking for [what you're looking for in your first dance].%0A%0APlease send me more information about your packages and availability.%0A%0AThank you!";
              }}
            >
              Get More Information
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Couples Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="text-lg italic text-gray-600 mb-4">
                "Our first dance was a huge hit! Everyone was amazed and kept asking where we learned. Our instructor made the whole process fun and stress-free."
              </blockquote>
              <p className="font-medium">— Jessica & Michael</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <blockquote className="text-lg italic text-gray-600 mb-4">
                "As two people with zero dance experience, we were nervous. But our instructor was patient and created a dance that felt natural. We had so much fun!"
              </blockquote>
              <p className="font-medium">— David & Sarah</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold">Ready to Create Your Perfect First Dance?</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Contact us today to schedule your free consultation and start your journey to an unforgettable wedding dance.
          </p>
          <div className="mt-8">
            <Button 
              size="lg"
              variant="outline"
              className="bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                window.location.href = "mailto:studioelatindance@gmail.com?subject=Wedding Dance Choreography Inquiry&body=Hello Studio E,%0A%0AI'm interested in learning more about your wedding dance choreography services. My wedding date is [your date] and I'm looking for [what you're looking for in your first dance].%0A%0APlease send me more information about your packages and availability.%0A%0AThank you!";
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 