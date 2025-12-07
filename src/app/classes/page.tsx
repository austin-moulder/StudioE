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
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight break-words">
              Go From Two Left Feet To Confident Latin Dancer In 8 Weeks
            </h1>
            
            <p className="text-lg md:text-xl mb-8 font-light break-words">
              Beginner‑friendly salsa & bachata training inside Le Lo Lai Gallery on Paseo Boricua in Humboldt Park.
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <a
                href="https://www.vagaro.com/cl/ezNH1FcwCnvd8HN2P5J2w53~1Olzqyx002LmdXqQQK8="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-white font-bold py-4 px-8 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg text-center"
              >
                Reserve My Spot In The March Beginner Academy
              </a>
              
              <a
                href="https://www.vagaro.com/joinstudioe/classes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white underline text-sm font-medium"
              >
                Or see all upcoming free pop‑up classes
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Is This You? Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center break-words">
              Feel awkward at parties when the music starts?
            </h2>
            
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-8 mb-6">
              <p className="text-lg font-semibold text-gray-900 mb-4">Studio E is for people who:</p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF3366] font-bold mt-1">•</span>
                  <span>Freeze when salsa or bachata comes on</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF3366] font-bold mt-1">•</span>
                  <span>Want to dance with their pareja without feeling embarrassed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF3366] font-bold mt-1">•</span>
                  <span>Are tired of random YouTube tutorials and overcrowded drop‑in classes</span>
                </li>
              </ul>
            </div>
            
            <p className="text-lg text-gray-700 text-center break-words">
              Our 8‑Week Latin Dance Academy gives you a clear path from "I don't dance" to "Let's go to the social."
            </p>
          </div>
        </div>
      </section>

      {/* The 8-Week Academy Offer */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center break-words">
              The Latin Dance Academy (March Cohort)
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center break-words">
              One structured program. Two nights a week. A lifetime of confidence.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* What you get */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What you get</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>8 weeks of beginner‑friendly salsa & bachata</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>2 classes per week at Le Lo Lai Gallery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Small group coaching so you never get lost</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Graduation social where you actually dance what you learned</span>
                  </li>
                </ul>
              </div>
              
              {/* Who it's for */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Who it's for</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Total beginners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Rusty dancers starting over</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Couples who want a fun, healthy "date night" routine</span>
                  </li>
                </ul>
              </div>
              
              {/* Investment */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Investment</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Founding Cohort Price: $199</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Limited to 25 spots for March</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF3366] font-bold mt-1">•</span>
                    <span>Payment plans available at checkout</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Guarantee */}
            <div className="mt-8 mb-12 text-center">
              <p className="text-gray-700 text-base break-words">
                <span className="font-semibold">"Love Your First 2 Weeks" Guarantee</span> – if it's not the right fit after 2 classes, we convert your remaining tuition into credit for anything else at Studio E.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="text-center">
              <a
                href="https://www.vagaro.com/cl/ezNH1FcwCnvd8HN2P5J2w53~1Olzqyx002LmdXqQQK8="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-white font-bold py-4 px-8 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Join the March Academy
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Step Strip) */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center break-words">
              How it works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF3366] to-[#9933CC] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-black text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Reserve your spot
                </h3>
                <p className="text-gray-600 leading-relaxed break-words">
                  Pick your start date and lock in one of the 25 seats in the Academy.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF3366] to-[#9933CC] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-black text-2xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Show up twice a week
                </h3>
                <p className="text-gray-600 leading-relaxed break-words">
                  We handle the music, structure, and coaching. You just show up.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF3366] to-[#9933CC] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-black text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Dance at real socials
                </h3>
                <p className="text-gray-600 leading-relaxed break-words">
                  By Week 8 you'll be dancing confidently at our Studio E socials and any Latin night in the city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Studio E (Culture + Method) */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left card - Between the Flags */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The only Latin dance studio between the flags
                </h2>
                <p className="text-gray-700 mb-4 break-words">
                  Located on Paseo Boricua, Studio E x Le Lo Lai is rooted in Puerto Rican culture.
                </p>
                <p className="text-gray-700 break-words">
                  More than a studio, it's a cultural anchor celebrating salsa, bachata, and comunidad in the most authentic setting possible.
                </p>
              </div>
              
              {/* Right card - The Studio E Method */}
              <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">The Studio E Method</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="font-bold mt-1">•</span>
                    <span>Learn simple frameworks, not random moves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold mt-1">•</span>
                    <span>Stack skills week by week</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold mt-1">•</span>
                    <span>Leave every class with steps you can use the same night</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Not For Everyone" Reframe */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center break-words">
              This isn't for everyone
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-xl border-l-4 border-pink-500 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Active Members Only</h3>
                <p className="text-gray-700 text-sm break-words">
                  We're a social club, not a punch‑card gym. We expect you to show up, dance, and be part of the community.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Camera‑Shy Is Okay, Effort‑Shy Is Not</h3>
                <p className="text-gray-700 text-sm break-words">
                  You can be nervous. You can't be lazy. If you come and try, we'll handle the rest.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">From Academy to Club</h3>
                <p className="text-gray-700 text-sm break-words">
                  After 8 weeks you'll have the option to join our Latin Social Club membership for ongoing classes and socials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-orange-600 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4 break-words">
            Ready to stop sitting down when the music starts?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto break-words">
            Join the March Latin Dance Academy and make 2025 the year you actually dance.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://www.vagaro.com/cl/ezNH1FcwCnvd8HN2P5J2w53~1Olzqyx002LmdXqQQK8="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#FF3366] font-bold py-4 px-8 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              Save My Spot in the Academy
            </a>
          </div>
        </div>
      </section>

      {/* Vagaro Booking Widget & Membership Plans - Merged & De-emphasized */}
      <section className="py-12 bg-gray-100">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              {/* Left side - Text */}
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
                  Want to peek at our class schedule?
                </h2>
                <p className="text-gray-600 text-base mb-4">
                  Browse our full schedule of dance classes and book your spot directly through our booking system.
                </p>
                <div className="bg-gray-200 rounded-lg p-4 border-l-4 border-gray-400">
                  <p className="text-gray-700 font-medium mb-2 text-sm">
                    🎉 New students get their first two classes FREE!
                  </p>
                  <p className="text-gray-600 text-xs">
                    Use code <span className="font-semibold text-gray-700">DANCE</span> at checkout. That's <span className="font-semibold">$50 of classes on the house</span>.
                  </p>
                </div>
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
            
            {/* Membership Plans CTA */}
            <div className="text-center pt-6 border-t border-gray-300">
              <div className="flex flex-col items-center gap-3">
                <Link href="/membership">
                  <Button size="lg" variant="outline" className="border-2 border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-gray-900 font-semibold px-8 py-3 text-base">
                    View Membership Plans
                  </Button>
                </Link>
                <p className="text-sm text-gray-600">
                  The Latin Dance Academy is included in the Gold Plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}