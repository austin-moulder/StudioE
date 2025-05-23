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
          {/* Hero image */}
          <Image
            src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/wedding.jpg"
            alt="Wedding dance"
            fill
            className="object-cover object-top"
            priority
          />
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
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/wedding.jpg"
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

      {/* Special Occasions Callout */}
      <section className="py-10 bg-gradient-to-r from-[#FF7A5A]/10 via-[#FF3366]/10 to-[#9933CC]/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center rounded-lg border border-[#FF3366]/20 p-6 bg-white shadow-sm">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#FF3366] mb-2">
                Beyond Weddings: Special Occasion Choreography
              </h3>
              <p className="text-gray-600 mb-4">
                We also create stunning choreography for quinceañeras, sweet sixteens, anniversaries, 
                and other milestone celebrations. Make your special moment unforgettable with a custom dance.
              </p>
              <Button 
                className="bg-[#FF3366] hover:bg-[#FF3366]/90"
                onClick={() => {
                  window.location.href = "mailto:studioelatindance@gmail.com?subject=Special Occasion Choreography Inquiry&body=Hello Studio E,%0A%0AI'm interested in choreography for my [type of event]. The event date is [your date] and I'm looking for [what you're looking for in your dance].%0A%0APlease send me more information.%0A%0AThank you!";
                }}
              >
                Inquire About Special Occasions
              </Button>
            </div>
            <div className="mt-6 md:mt-0 md:ml-6 flex items-center justify-center">
              <div className="w-16 h-16 bg-[#FF3366]/10 text-[#FF3366] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
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

      {/* Photographer Cross-Sell Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Capture Every Perfect Moment
              </h2>
              <p className="text-lg text-gray-500 mb-6">
                Your first dance deserves to be documented flawlessly. Studio E has partnered with elite wedding photographers who specialize in dance photography.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
                <h3 className="text-xl font-semibold mb-2 text-[#FF3366]">Why Our Photographers Are Different</h3>
                <p className="text-gray-600 mb-4">
                  Capturing dance movement in low-light reception venues is one of the most challenging skills in wedding photography—and it's what our photographers excel at.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#FF3366] mr-2">✓</span>
                    <span>Specialized in fast movement capture that typical wedding photographers struggle with</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3366] mr-2">✓</span>
                    <span>Expert at working in challenging reception lighting conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3366] mr-2">✓</span>
                    <span>Understand dance movement and timing to capture peak moments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF3366] mr-2">✓</span>
                    <span>Create stunning dance highlight videos and photos that traditional photographers miss</span>
                  </li>
                </ul>
              </div>
              <Button 
                className="bg-[#FF3366] hover:bg-[#FF3366]/90"
                onClick={() => {
                  window.location.href = "mailto:studioelatindance@gmail.com?subject=Wedding Dance Photography Inquiry&body=Hello Studio E,%0A%0AI'm interested in learning more about your wedding dance photography services for my upcoming wedding on [your date].%0A%0APlease send me more information about your packages and availability.%0A%0AThank you!";
                }}
              >
                Learn About Our Photographers
              </Button>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF3366]/20 to-transparent z-10"></div>
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/wedding_capture.jpg"
                alt="Wedding dance photography"
                fill
                className="object-cover"
              />
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