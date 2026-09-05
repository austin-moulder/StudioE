"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin } from "lucide-react"
import Link from "next/link"

const PLANS = {
  challenge: {
    href: "https://link.fastpaydirect.com/payment-link/6a95dce1d6768df054448f36",
  },
  gold: {
    href: "https://link.fastpaydirect.com/payment-link/6a8db489f9c8c807930b9f2b",
  },
  bronze: {
    href: "https://link.fastpaydirect.com/payment-link/6a8db4c6d6768df054447dd0",
  },
  visitor: {
    href: "https://link.fastpaydirect.com/payment-link/6a9c0d42ceb12d9fc1a8b434",
  },
} as const

const payButtonClassName =
  "inline-flex w-full items-center justify-center rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 transform hover:scale-105"

export default function MembershipPage() {
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
              Memberships renew every 4 weeks (28 days). Sign up before your first class to lock in
              the discounted rates below.
            </p>
          </div>

          {/* 28-Day Challenge */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF3366] via-[#FF3366] to-[#9933CC] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg z-20">
                Most Popular Plan
              </div>
              <Card className="border-2 border-[#FF3366] shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#FF3366] via-[#E62E5C] to-[#9933CC] text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">28-Day Challenge</h3>
                    <p className="text-white/80 italic text-lg mb-4">No recurring charges. Results in 28 days.</p>
                    <div className="flex items-baseline justify-center gap-3">
                      <span className="text-2xl font-bold text-white/60 line-through">$600</span>
                      <span className="text-5xl font-black">$399</span>
                    </div>
                    <p className="mt-2 text-sm text-white/80">When you sign up before your first class</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>4 private lessons <span className="text-gray-500">(typically $150/hr)</span></span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Unlimited classes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Happy hour socials</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Exclusive member events</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>1 guest per class</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>No recurring charges</span>
                    </div>
                  </div>
                  <a
                    href={PLANS.challenge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${payButtonClassName} bg-gradient-to-r from-[#FF3366] to-[#9933CC] hover:from-[#E62E5C] hover:to-[#7A29A3]`}
                  >
                    Purchase Now
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Card className="border-2 border-yellow-500 shadow-2xl rounded-3xl overflow-hidden">
                <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-pulse"></div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-2">Gold Plan</h3>
                    <p className="text-white/80 italic text-lg mb-4">This is where dancers become great!</p>
                    <div className="flex flex-wrap items-baseline justify-center gap-3">
                      <span className="text-2xl font-bold text-white/60 line-through">$169</span>
                      <span className="text-5xl font-black">
                        $124<span className="text-xl font-bold"> / every 4 weeks</span>
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/80">When you sign up before your first class</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>8 classes every 4 weeks</span>
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
                      <span>1 guest pass every 4 weeks</span>
                    </div>
                  </div>
                  <a
                    href={PLANS.gold.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${payButtonClassName} bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700`}
                  >
                    Join Now
                  </a>
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
                    <div className="flex flex-wrap items-baseline justify-center gap-3">
                      <span className="text-2xl font-bold text-white/60 line-through">$119</span>
                      <span className="text-5xl font-black">
                        $89<span className="text-xl font-bold"> / every 4 weeks</span>
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/80">When you sign up before your first class</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>4 classes every 4 weeks</span>
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
                      <span>1 guest pass every 4 weeks</span>
                    </div>
                  </div>
                  <a
                    href={PLANS.bronze.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${payButtonClassName} bg-[#CD7F32] hover:bg-[#CD7F32]/90`}
                  >
                    Join Now
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Out-Of-Towner's Pass */}
          <div className="max-w-2xl mx-auto">
            <Card className="rounded-3xl border-2 border-green-500 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white p-8 text-center">
                <h3 className="text-4xl font-black mb-2">Out-Of-Towner&apos;s Pass</h3>
                <p className="text-white/80 italic text-lg mb-4">One week of unlimited classes</p>
                <div className="text-5xl font-black">$54</div>
              </div>
              <CardContent className="p-8 bg-white text-center">
                <p className="mb-8 text-gray-600">
                  The perfect way to maintain your practice while visiting Chicago! Enjoy 7 consecutive days of unlimited classes.
                </p>
                <a
                  href={PLANS.visitor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${payButtonClassName} bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700`}
                >
                  Purchase Now
                </a>
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
