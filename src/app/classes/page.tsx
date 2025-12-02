"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, DollarSign, Activity, Users, Calendar, Coffee, Shirt, User, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ClassesPage() {
  const [activeTab, setActiveTab] = useState("health")
  const vagaroContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inject the Vagaro popup script inside the container (as per Vagaro requirements)
    if (!vagaroContainerRef.current) return

    // Check if script already exists
    const existingScript = vagaroContainerRef.current.querySelector('script[src*="WidgetPopupLoader"]')
    if (existingScript) return

    // Create and inject the script INSIDE the vagaro container
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.vagaro.com//resources/WidgetPopupLoader/OZqqCJ0sC38cT3qmV35y6JuPlXez3Ly6puSdBuOc1WJDvwXDxUra2StkvCxdfkJE1wZCBOvifCs7feJEPwMc8?v=lM0cldcacu6FLo73Drmsg62GrOuyXmgKVf9RnjIQWVe#'
    script.async = true
    
    script.onload = () => {
      console.log('Vagaro popup script loaded successfully')
    }
    
    // Append script INSIDE the vagaro container
    vagaroContainerRef.current.appendChild(script)
  }, [])

  const healthOfferings = [
    {
      category: "Dance Classes & Socials",
      items: ["Salsa", "Bachata", "Heels", "Reggaeton", "Afrobeat", "Twerk", "Friday night socials", "Saturday night socials"],
      description: "Learn from Chicago's top instructors in classes, then put your skills to work at our weekend dance socials"
    },
    {
      category: "Fitness Programs",
      items: ["Small group training", "Humboldt Park runs", "HIIT", "Corrective exercise", "Dance fitness", "Personal training"],
      description: "Certified trainers and corrective exercise specialists design programs that deliver real results with your community squad"
    }
  ]

  const wealthOfferings = [
    {
      category: "Coworking Space",
      items: ["High-speed WiFi", "Open workspace", "All-day access", "Free coffee"],
      description: "Grind during the day, dance at night - the ultimate work-life balance"
    },
    {
      category: "Wealth Building",
      items: ["Small business workshops", "Stock & real estate investing", "AI workflow training", "Social media automation", "Salary negotiation", "Success partnerships"],
      description: "Master the skills to earn more and own more - from investing education to cutting-edge tech training that pays"
    }
  ]

  const loveOfferings = [
    {
      category: "Social Events",
      items: ["Movie screenings", "Cultural meetups", "Language exchange", "Community dinners", "Volunteering", "Social activism"],
      description: "Build genuine connections while making a positive impact in your community"
    },
    {
      category: "Personal Growth",
      items: ["Relationship skills workshops", "Dating workshops", "Emotional literacy", "Style consultations", "Purpose coaching"],
      description: "Discover your authentic self, build meaningful relationships, and express it all with confidence"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/gentrification_humboldt_park.jpg"
            alt="Puerto Rican Flag - Paseo Boricua"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 opacity-90" />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Street-style pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container relative z-20 px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin className="h-6 w-6 text-orange-400" />
              <span className="text-orange-400 font-semibold">2716 W Division Street • Paseo Boricua</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                Studio E x Le Lo Lai
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 font-light">
              The world's first Latin dance social club in the heart of Puerto Rico Town
            </p>
          </div>
        </div>
      </section>

      {/* Vagaro Booking Widget - Popup Version - Moved to Top */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Text */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Check Out Our Class Schedule
                </h2>
                <p className="text-gray-600 text-lg">
                  Browse our full schedule of dance classes and book your spot directly through our booking system.
                </p>
              </div>

              {/* Right side - Vagaro widget */}
              <div className="flex flex-col items-center md:items-end">
                {/* Vagaro Popup Widget Container - Script will be injected inside */}
                <div 
                  ref={vagaroContainerRef}
                  className="vagaro" 
                  style={{
                    width: '250px',
                    padding: '0',
                    border: '0',
                    margin: '0 auto',
                    textAlign: 'center'
                  }}
                >
                  <style jsx global>{`
                    .vagaro a {
                      font-size: 14px;
                      color: #AAA;
                      text-decoration: none;
                    }
                  `}</style>
                  <a href="https://www.vagaro.com/pro/">Powered by Vagaro</a>
                  &nbsp;
                  <a href="https://www.vagaro.com/pro/salon-software">Salon Software</a>
                  ,&nbsp;
                  <a href="https://www.vagaro.com/pro/spa-software">Spa Software</a>
                  &nbsp;&amp;&nbsp;
                  <a href="https://www.vagaro.com/pro/fitness-software">Fitness Software</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Info Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            {/* Location & Method Combined */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Only Latin Dance Studio Between the Flags
                </h2>
                <p className="text-gray-700 mb-4">
                  Located in Paseo Boricua, the cultural district of Puerto Rico Town. 
                  We hold our space just like Puerto Ricans "Plantar la Bandera" - 
                  planting our flag and claiming our cultural territory.
                </p>
                <p className="text-gray-700">
                  More than a dance studio - it's a cultural anchor celebrating Latin dance 
                  in the most authentic setting possible.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-2">The Studio E Method</h3>
                <p className="text-lg italic mb-4">The easiest and quickest way to learn Salsa and Bachata</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-semibold">Learn Frameworks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-semibold">Stack Techniques</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-semibold">Create On-the-Fly</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* What Makes Us Different - Simplified */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                THIS ISN'T FOR EVERYONE
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're the world's first Latin Dance social club that treats dance as more than movement
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-6 rounded-xl border-l-4 border-pink-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Dance as a Life Tool</h3>
                <p className="text-gray-700 text-sm">
                  Unlock a more fulfilling life through dance. Master nonverbal communication, 
                  build social skills, and connect with people from every walk of life.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">All-In-One Experience</h3>
                <p className="text-gray-700 text-sm">
                  Health, wealth, and love fused into one space because they're meant to work together. 
                  This is holistic living at its finest.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Active Membership Only</h3>
                <p className="text-gray-700 text-sm">
                  This is not a passive membership. We expect you to show up, engage, and treat this space as your 
                  second home. Wallflowers need not apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-orange-600 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-black mb-4">READY TO JOIN THE CLUB?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            This isn't just a dance studio - it's a lifestyle. It's culture. It's home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold px-8 py-4 text-lg">
                View Membership Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}