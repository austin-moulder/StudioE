"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Trophy, Heart, Briefcase, Camera, ShoppingBag, Mic, Lightbulb, Handshake, BookOpen, PenTool, Music, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

export default function MenWhoDancePage() {
  const activities = [
    {
      title: "Open Discussions",
      description: "Share experiences and find solutions in a judgment-free zone",
      icon: Users,
    },
    {
      title: "Group Workouts",
      description: "Stay fit and motivated with fellow dancers",
      icon: Trophy,
    },
    {
      title: "Dance Techniques",
      description: "Build small routines and learn techniques to improve dance skill",
      icon: Music,
    },
    {
      title: "Financial Growth",
      description: "Learn strategies to increase your income",
      icon: Briefcase,
    },
    {
      title: "Social Skills",
      description: "Develop natural confidence in approaching others",
      icon: Heart,
    },
    {
      title: "Rejection Resilience",
      description: "Build confidence and learn to handle setbacks with grace",
      icon: Trophy,
    },
    {
      title: "Style Development",
      description: "Shopping trips for wardrobe upgrades",
      icon: ShoppingBag,
    },
    {
      title: "Comedy & Improv",
      description: "Learn to be funnier and more engaging",
      icon: Mic,
    },
    {
      title: "Business Basics",
      description: "Essential skills for entrepreneurial success",
      icon: Lightbulb,
    },
    {
      title: "Conflict Resolution",
      description: "Handle difficult situations with confidence",
      icon: Handshake,
    },
    {
      title: "Therapy Sessions",
      description: "Professional guidance in a group setting",
      icon: Users,
    },
    {
      title: "Book Club",
      description: "Discuss impactful books with fellow members",
      icon: BookOpen,
    },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = Math.ceil(activities.length / 3)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full bg-gray-300" />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Men Who Dance</h1>
          <p className="mt-6 max-w-2xl text-lg">
            A brotherhood of dancers supporting each other's growth, both on and off the dance floor.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What We're About</h2>
              <p className="mt-4 text-gray-500">
                Every month, we get together at our spot in Chicago to share experiences, learn from each other, and grow. It's casual, it's fun, and it's real. We grill, we laugh, and we push each other to be our best selves.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2 text-[#FF3366]" />
                  <span>2613 W Evergreen Avenue, Chicago IL 60622</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2 text-[#FF3366]" />
                  <span>Monthly meetups with food and drinks included</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Men_Who_Dance_ADC.jpg"
                alt="Men Who Dance group"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid - Desktop */}
      <section className="py-16 bg-gray-50 hidden md:block">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <activity.icon className="h-8 w-8 text-[#FF3366] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                <p className="text-gray-500">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Carousel - Mobile */}
      <section className="py-16 bg-gray-50 md:hidden">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">What We Do</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-none">
                    <div className="grid grid-cols-1 gap-6 px-4">
                      {activities
                        .slice(slideIndex * 3, (slideIndex + 1) * 3)
                        .map((activity, index) => (
                          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <activity.icon className="h-8 w-8 text-[#FF3366] mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                            <p className="text-gray-500">{activity.description}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md",
                currentSlide === 0 && "opacity-50 cursor-not-allowed"
              )}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-6 w-6 text-[#FF3366]" />
            </button>
            <button
              onClick={nextSlide}
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md",
                currentSlide === totalSlides - 1 && "opacity-50 cursor-not-allowed"
              )}
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight className="h-6 w-6 text-[#FF3366]" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    currentSlide === index ? "bg-[#FF3366]" : "bg-gray-300"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Join?</h2>
          <p className="mt-4 text-lg">
            Be part of a community that pushes you to be better, both on and off the dance floor.
          </p>
          <p className="mt-4 text-sm max-w-2xl mx-auto">
            This group is exclusively open to individuals who identify as male. Supporting women is a core part of Studio E's mission, and we believe that creating a dedicated space for men to develop skills and emotional intelligence ultimately benefits everyone in our dance community.
          </p>
          <div className="mt-8">
            <Link href="https://chat.whatsapp.com/Iz537gSc11qEn7XJy5DOmi" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Join WhatsApp Group
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 