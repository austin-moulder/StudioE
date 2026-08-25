"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin } from "lucide-react"
import Link from "next/link"

const PLANS = {
  noMembership: {
    href: "https://link.fastpaydirect.com/payment-link/6a8db50df9c8c807930b9f2e",
  },
  gold: {
    href: "https://link.fastpaydirect.com/payment-link/6a8db489f9c8c807930b9f2b",
  },
  bronze: {
    href: "https://link.fastpaydirect.com/payment-link/6a8db4c6d6768df054447dd0",
  },
} as const

export default function MembershipPage() {
  const handleOtherPurchase = (plan: string) => {
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
            <span className="text-orange-200 font-semibold">2657 W Division Street • Paseo Boricua</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            READY TO JOIN THE CLUB?
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-light max-w-3xl mx-auto">
            This isn&apos;t just a dance studio - it&apos;s a lifestyle. It&apos;s culture. It&apos;s home.
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

          {/* No Membership Plan */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                No Recurring Charges
              </div>
              <Card className="border-2 border-gray-500 shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">No Membership Plan</h3>
                    <p className="text-white/80 italic text-lg mb-4">Pay once. Dance more.</p>
                    <div className="text-5xl font-black">$399</div>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>20 classes (must be used within 90 days of purchase)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Happy hour social</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>1 guest pass</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>No recurring charges</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-4 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <a href={PLANS.noMembership.href} target="_blank" rel="noopener noreferrer">
                      Purchase Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                Most Popular Plan
              </div>
              <Card className="border-2 border-yellow-500 shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">Gold Plan</h3>
                    <p className="text-white/80 italic text-lg mb-4">This is where dancers become great!</p>
                    <div className="text-5xl font-black">
                      $149<span className="text-2xl font-bold">/mo</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>8 classes per month</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Exclusive member events</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Happy hour social</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>1:1 weekly support</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>1 guest pass per month</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <a href={PLANS.gold.href} target="_blank" rel="noopener noreferrer">
                      Join Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bronze Plan */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Card className="border-2 border-[#CD7F32] shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#CD7F32] via-[#B87333] to-[#8B5A2B] text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">Bronze Plan</h3>
                    <p className="text-white/80 italic text-lg mb-4">Steady progress, flexible commitment</p>
                    <div className="text-5xl font-black">
                      $89<span className="text-2xl font-bold">/mo</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>4 classes per month</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Exclusive member events</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Happy hour social</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>1 guest pass per month</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-[#CD7F32] hover:bg-[#CD7F32]/90 text-white font-bold py-4 text-lg rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <a href={PLANS.bronze.href} target="_blank" rel="noopener noreferrer">
                      Join Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Class Packages */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto items-end">
            {/* Drop-In Single Class */}
            <Card className="rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
              <CardContent className="p-6 text-center flex flex-col flex-1">
                <h3 className="font-black text-lg mb-4">Drop-In Single Class Pass</h3>
                <div className="text-3xl font-black mb-4">$30</div>
                <p className="text-sm text-gray-600 mb-6 flex-1">
                  Use for any class on our schedule. Valid within 30 days of purchase.
                </p>
                <Button 
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-2xl"
                  onClick={() => handleOtherPurchase('single')}
                >
                  Purchase Now
                </Button>
              </CardContent>
            </Card>

            {/* Out-Of-Towner's Pass */}
            <Card className="rounded-3xl shadow-lg overflow-hidden flex flex-col h-full">
              <CardContent className="p-6 text-center flex flex-col flex-1">
                <h3 className="font-black text-lg mb-4">Out-Of-Towner&apos;s One-Week Unlimited Pass</h3>
                <div className="text-3xl font-black mb-4">$54</div>
                <p className="text-sm text-gray-600 mb-6 flex-1">
                  The perfect way to maintain your practice while visiting Chicago! Enjoy 7 consecutive days of unlimited classes.
                </p>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl"
                  onClick={() => handleOtherPurchase('visitor')}
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
