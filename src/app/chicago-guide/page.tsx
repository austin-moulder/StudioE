"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin, Users, Star } from "lucide-react"

export default function ChicagoGuidePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/chicago-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error('Form submission failed')
        // Handle error state here if needed
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error state here if needed
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Check Your Email!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your Chicago Dance Guide + 2 Free Classes are on their way to your inbox.
          </p>
          <p className="text-sm text-gray-500">
            Don't see it? Check your spam folder and add us to your contacts.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Discover the confident social dancer that you were meant to be
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
            Get our <span className="font-bold text-[#FF3366]">FREE Digital Guide</span> to Chicago's top dance spots + <span className="font-bold text-[#FF3366]">2 FREE classes</span> with the city's best instructors
          </h2>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-3xl mb-12 overflow-hidden w-full max-w-md mx-auto" style={{ aspectRatio: '8.5/11' }}>
          <Image
            src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Landing_page_1.png"
            alt="Confident social dancers in Chicago"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Form */}
        <Card className="border-2 border-[#FF3366] shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-14 text-lg border-2 border-gray-300 focus:border-[#FF3366] rounded-xl"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-14 text-lg border-2 border-gray-300 focus:border-[#FF3366] rounded-xl"
                />
              </div>
              
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="h-14 text-lg border-2 border-gray-300 focus:border-[#FF3366] rounded-xl"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 text-xl font-bold bg-gradient-to-r from-[#FF3366] to-[#9933CC] hover:from-[#FF3366]/90 hover:to-[#9933CC]/90 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? "Sending..." : "GET MY FREE GUIDE + CLASSES"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Value Props */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center">
            <div className="flex items-center space-x-4 text-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800">
                <span className="text-[#FF3366] font-bold">$99 Value</span> - Absolutely FREE
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-4 text-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800">
                <span className="text-[#FF3366] font-bold">150+ Students</span> Already Served
              </span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center space-x-4 text-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800">
                Access to <span className="text-[#FF3366] font-bold">Top Community Events</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 