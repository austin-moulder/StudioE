"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Users, Calendar, MapPin, Heart, DollarSign, Activity } from "lucide-react"
import Link from "next/link"

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan)
    if (plan === 'free') {
      // For free classes, show contact form immediately
      setShowContactForm(true)
    } else {
      // For paid plans, direct to email contact
      window.location.href = `mailto:studioelatindance@gmail.com?subject=Studio E Membership - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan&body=Hi Studio E Team,%0A%0AI'm interested in the ${plan.charAt(0).toUpperCase() + plan.slice(1)} membership plan.%0A%0APlease send me more information about getting started.%0A%0AThank you!`
    }
  }

  const handleFreeClassSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: 'free_classes',
          email,
          name,
          phone
        }),
      })

      if (response.ok) {
        setShowContactForm(false)
        setShowSuccessMessage(true)
        setEmail('')
        setName('')
        setPhone('')
      } else {
        alert('There was an error submitting your request. Please try again.')
      }
    } catch (error) {
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate deadline (current date + 7 days)
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 7)
  const deadlineFormatted = deadline.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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

      {/* First Time Option - Subtle */}
      <section className="py-8 bg-gradient-to-r from-pink-50 to-orange-50">
        <div className="container px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#FF3366] text-center relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Is this your first time?</h3>
                <p className="text-sm text-gray-600 mb-4">Try 2 classes absolutely FREE</p>
                <Button 
                  className="bg-[#FF3366] hover:bg-[#FF3366]/90 text-white font-medium text-sm px-6 py-2 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200"
                  onClick={() => handlePlanSelection('free')}
                >
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
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

          {/* Gold Plan - Premium */}
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
                    <h3 className="text-2xl font-black mb-2">Gold Plan</h3>
                    <div className="text-4xl font-black mb-2">$149 PER MONTH</div>
                    <p className="text-white/80 italic">Includes all Silver Plan benefits PLUS...</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>8 group classes per month at our Humboldt Park location</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Access to our on-demand library of recorded classes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Month-to-month auto-renew means no long-term commitments</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>10% off all Studio E merchandise and workshops</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Loyalty discount for long-term members</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>One guest pass per month</span>
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
                      <span>VIP access to exclusive member socials</span>
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
                    <h3 className="text-2xl font-black mb-2">Silver Plan</h3>
                    <div className="text-4xl font-black mb-2">$89 PER MONTH</div>
                    <p className="text-white/80 italic">Our most popular plan.</p>
                  </div>
                </div>
                <CardContent className="p-8 bg-white">
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>8 group classes per month at our Humboldt Park location</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Access to our on-demand library of recorded classes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Month-to-month auto-renew means no long-term commitments</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Loyalty discount for long-term members</span>
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
                <h3 className="text-2xl font-black mb-4">Bronze Plan</h3>
                <div className="text-3xl font-black mb-2 text-gray-900">$59 PER MONTH</div>
                <p className="text-gray-600 italic mb-8">Ideal for our 1x per week students.</p>
                
                <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>4 group classes per month at our location</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Month-to-month auto-renew means no long-term commitments</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Additional classes discounted to $15 each</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Access to our on-demand library of recorded classes</span>
                    </div>
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

      {/* Free Classes Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8">
            <h3 className="text-2xl font-black mb-4 text-center">Get Your First 2 Classes FREE!</h3>
            <p className="text-gray-600 mb-6 text-center">
              Fill out the form below to claim your free classes.
            </p>
            
            <form onSubmit={handleFreeClassSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-[#FF3366] text-[#FF3366] hover:bg-[#FF3366]/10 rounded-xl"
                  onClick={() => setShowContactForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#FF3366] hover:bg-[#FF3366]/90 text-white rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Started Free'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-black mb-4 text-green-600">Success!</h3>
            <p className="text-gray-600 mb-6">
              You have 2 free classes to use by <span className="font-semibold text-[#FF3366]">{deadlineFormatted}</span>.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Just show up to any class and let us know you filled out the form!
            </p>
            <Button
              className="w-full bg-[#FF3366] hover:bg-[#FF3366]/90 text-white rounded-xl"
              onClick={() => setShowSuccessMessage(false)}
            >
              Got it!
            </Button>
          </div>
        </div>
      )}

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