"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Users,
  Star,
  Calendar,
  Heart,
  DollarSign,
  Award,
  Sparkles,
  UserPlus,
  Building2,
  PartyPopper,
  GraduationCap,
  Music
} from 'lucide-react'

export default function HireInstructorsPage() {
  const handleEmailClick = () => {
    window.location.href = 'mailto:studioelatindance@gmail.com?subject=Instructor Inquiry&body=I am interested in hiring a Studio E instructor for my venue.'
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Hiring_1.jpg)',
            backgroundPosition: 'center 40%',
            transform: 'scale(1.1)',
            opacity: '0.85'
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/80 via-[#FF3366]/75 to-[#9933CC]/80"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              BRING STUDIO E TO YOUR VENUE
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Boost Member Engagement & Maximize Retention With Our Elite Dance Instructors
            </p>
            <Button 
              size="lg"
              className="bg-[#9933CC] text-white hover:bg-[#8822BB] font-bold px-8 py-6 text-lg shadow-lg"
              onClick={handleEmailClick}
            >
              HIRE AN INSTRUCTOR
            </Button>
          </div>
        </div>
      </section>

      {/* Venue Types Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">PERFECT FOR ANY VENUE</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our instructors bring expertise and energy to a variety of settings
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#FF3366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-[#FF3366]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Gym Group Classes</h3>
                <p className="text-gray-600">Regular dance fitness programs to energize your gym schedule</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#9933CC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PartyPopper className="h-8 w-8 text-[#9933CC]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Private Events</h3>
                <p className="text-gray-600">Corporate events, parties, and special celebrations</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#FF3366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-[#FF3366]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Teaching Residencies</h3>
                <p className="text-gray-600">Long-term programs for schools and community centers</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#9933CC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-8 w-8 text-[#9933CC]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dance Studios</h3>
                <p className="text-gray-600">Specialized workshops and ongoing class series</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dance Styles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">DIVERSE DANCE EXPERTISE</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our instructors specialize in a wide range of dance styles to suit your needs
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Salsa & Bachata",
              "Latin Ballroom",
              "Hip Hop",
              "Heels Dance",
              "Wedding Dance",
              "Contemporary",
              "Jazz & Ballet",
              "Dance Fitness"
            ].map((style) => (
              <div key={style} className="bg-white rounded-lg p-4 text-center shadow-sm border border-gray-100">
                <p className="font-semibold text-gray-800">{style}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">PROGRAMS FOR EVERY VENUE</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From high-energy Latin dance to elegant ballroom, our instructors bring expertise in multiple dance styles to match your venue's needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ 
                  backgroundImage: 'url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Hiring_2.jpg)',
                  backgroundPosition: 'center 35%'
                }} 
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Group Classes</h3>
                <p className="text-gray-600 mb-4">Regular weekly classes in various dance styles to keep your members engaged and coming back</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Flexible scheduling</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ 
                  backgroundImage: 'url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Hiring_1.jpg)',
                  backgroundPosition: 'center 35%'
                }} 
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Special Events</h3>
                <p className="text-gray-600 mb-4">One-time workshops, dance parties, and themed events to create buzz and attract new members</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Customizable formats</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ 
                  backgroundImage: 'url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Mentorship_1.jpg)',
                  backgroundPosition: 'center 35%'
                }} 
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Private Sessions</h3>
                <p className="text-gray-600 mb-4">One-on-one instruction and small group training for personalized learning experiences</p>
                <div className="flex items-center text-sm text-gray-500">
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Individual attention</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Chicago's leading venues in offering premium dance instruction to your community
          </p>
          <Button 
            size="lg"
            className="bg-[#9933CC] text-white hover:bg-[#8822BB] font-bold px-8 py-6 text-lg shadow-lg"
            onClick={handleEmailClick}
          >
            GET STARTED TODAY
          </Button>
        </div>
      </section>
    </div>
  )
} 