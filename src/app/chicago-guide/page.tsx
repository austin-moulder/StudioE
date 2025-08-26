"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin, Users, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChicagoGuidePage() {
  const router = useRouter()
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
        // Redirect to founder-deal page instead of showing success message
        router.push('/founder-deal')
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top Header Banner */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-white py-3 px-6 rounded-xl">
            <h2 className="text-lg md:text-xl font-bold">
              Attention Humboldt and Wicker Park
            </h2>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 break-words">
            Start dancing with confidence
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed break-words">
            Get our <span className="font-bold text-[#FF3366]">FREE Digital Guide</span> + <span className="font-bold text-[#FF3366]">2 FREE Classes</span> + <span className="font-bold text-[#FF3366]">1 FREE Smoothie</span> + <span className="font-bold text-[#FF3366]">1 FREE Social Ticket</span>
          </p>
        </div>

        {/* Digital Guide Image */}
        <div className="flex justify-center mb-12">
          <div className="relative rounded-3xl overflow-hidden w-full max-w-sm mx-auto" style={{ aspectRatio: '8.5/11' }}>
            <Image
              src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Landing_page_1.png"
              alt="FREE Chicago Dance Guide"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* Form */}
        <Card className="border-2 border-[#FF3366] shadow-xl max-w-md mx-auto mb-12">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-12 text-base border-2 border-gray-300 focus:border-[#FF3366] rounded-xl"
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
                  className="h-12 text-base border-2 border-gray-300 focus:border-[#FF3366] rounded-xl"
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
                  className="h-12 text-base border-2 border-gray-300 focus:border-[#FF3366] rounded-xl"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#FF3366] to-[#9933CC] hover:from-[#FF3366]/90 hover:to-[#9933CC]/90 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isSubmitting ? "Sending..." : "GET MY FREE STUFF"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Value Props */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center space-x-4 text-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-800">
              <span className="text-[#FF3366] font-bold">$199 Value</span> - Absolutely FREE
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-800">
              <span className="text-[#FF3366] font-bold">300+ Students</span> Already Served
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-lg">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-800 break-words">
              Access to <span className="text-[#FF3366] font-bold">Top Community Events</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  )
} 