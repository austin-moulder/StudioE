"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Users, Calendar, MapPin, Heart, DollarSign, Activity } from "lucide-react"
import Link from "next/link"

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan)
    // Direct to email contact
    window.location.href = `mailto:studioelatindance@gmail.com?subject=Studio E Membership - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan&body=Hi Studio E Team,%0A%0AI'm interested in the ${plan.charAt(0).toUpperCase() + plan.slice(1)} membership plan.%0A%0APlease send me more information about getting started.%0A%0AThank you!`
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-pink-600 via-red-500 to-orange-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 px-4 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="h-6 w-6 text-orange-200" />
            <span className="text-orange-200 font-semibold">2716 W Division Street • Paseo Boricua</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            READY TO JOIN THE CLUB?
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-light max-w-3xl mx-auto">
            This isn't just a dance studio - it's a lifestyle. It's culture. It's home.
          </p>
        </div>
      </section>

      {/* Join Our Community Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Join Our Studio E Community
            </h2>
            <p className="text-xl text-gray-600">
              Dance memberships, packages, and plans for every lifestyle, schedule, and budget.
            </p>
          </div>

          {/* Platinum Plan - Premium */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                Premium Plan
              </div>
              <Card className="border-2 border-gray-500 shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 text-white p-8 text-center relative overflow-hidden">
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">Platinum Plan</h3>
                    <p className="text-white/80 italic text-lg">For those who live and breathe Latin dance</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Unlimited group classes, including the Latin Dance Academy</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Access to our on-demand library of recorded classes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Two guest passes per month</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>One FREE towel rental per class</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>FREE storage locker at the studio</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>20% off all Studio E merchandise and workshops</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Priority registration for special events and retreats</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => handlePlanSelection('platinum')}
                  >
                    Join Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                Premium Plan
              </div>
              <Card className="border-2 border-yellow-500 shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white p-8 text-center relative overflow-hidden">
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">Gold Plan</h3>
                    <p className="text-white/80 italic text-lg">This is where dancers become great!</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>All 8 monthly Latin Dance Academy classes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>2 additional group classes per month</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Access to our on-demand library of recorded classes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>One guest pass per month</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => handlePlanSelection('gold')}
                  >
                    Join Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Silver Plan - Most Popular */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 via-[#FF3366] to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                Most Popular Plan
              </div>
              <Card className="border-2 border-[#FF3366] shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-pink-400 via-[#FF3366] to-pink-600 text-white p-8 text-center relative overflow-hidden">
                  {/* Shine effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">Silver Plan</h3>
                    <p className="text-white/80 italic text-lg">Our most popular plan following the Latin Dance Academy!</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>6 group classes per month</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Access to an on-demand library of recorded classes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>One guest pass per month</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-[#FF3366] to-pink-600 hover:from-pink-600 hover:to-[#FF3366] text-white font-bold py-4 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={() => handlePlanSelection('silver')}
                  >
                    Join Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bronze Plan */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-[#CD7F32]/10 rounded-3xl p-1 border border-[#CD7F32]/20">
              <div className="bg-white rounded-3xl p-8 text-center">
                <h3 className="text-4xl font-black mb-4">Bronze Plan</h3>
                <p className="text-gray-600 italic text-lg mb-8">Recommended for seasoned dancers in maintenance mode</p>
                
                <div className="space-y-4 text-left mb-8 max-w-md mx-auto">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>4 group classes per month</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Access to an on-demand library of recorded classes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Additional classes discounted to $15 each</span>
                  </div>
                </div>
                
                <Button 
                  className="bg-[#CD7F32] hover:bg-[#CD7F32]/90 text-white font-bold py-3 px-8 rounded-2xl"
                  onClick={() => handlePlanSelection('bronze')}
                >
                  Join Now
                </Button>
              </div>
            </div>
          </div>

          {/* Class Packages */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-end">
            {/* Drop-In Single Class */}
            <Card className="rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
              <CardContent className="p-6 text-center flex flex-col flex-1">
                <h3 className="font-black text-lg mb-4">Drop-In Single Class Pass</h3>
                <div className="text-3xl font-black mb-4">$25</div>
                <p className="text-sm text-gray-600 mb-6 flex-1">
                  Use for any class on our schedule. Valid within 30 days of purchase.
                </p>
                <Button 
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-2xl"
                  onClick={() => handlePlanSelection('single')}
                >
                  Purchase Now
                </Button>
              </CardContent>
            </Card>

            {/* Out-Of-Towner's Pass */}
            <Card className="rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
              <CardContent className="p-6 text-center flex flex-col flex-1">
                <h3 className="font-black text-lg mb-4">Out-Of-Towner's One-Week Unlimited Pass</h3>
                <div className="text-3xl font-black mb-4">$54</div>
                <p className="text-sm text-gray-600 mb-6 flex-1">
                  The perfect way to maintain your practice while visiting Chicago! Enjoy 7 consecutive days of unlimited classes.
                </p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl"
                  onClick={() => handlePlanSelection('visitor')}
                >
                  Purchase Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-black mb-4">Questions?</h2>
          <p className="text-gray-600 mb-6">We would be happy to chat with you!</p>
          <a 
            href="mailto:studioelatindance@gmail.com"
            className="inline-flex items-center gap-2 text-[#FF3366] hover:text-[#FF3366]/80 font-semibold"
          >
            Email Us
          </a>
          <div className="mt-8">
            <Link 
              href="/latin-dance-star-package"
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Looking for something more intensive? Explore our Latin Dance Star Package
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Cancellation */}
      <section className="py-8 bg-white">
        <div className="container px-4 text-center">
          <Button 
            variant="outline" 
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Membership Cancellation Request
          </Button>
        </div>
      </section>
    </div>
  )
}