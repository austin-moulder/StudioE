"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Heart, DollarSign, Activity, Users, Calendar, Coffee, Shirt, User } from "lucide-react"
import Link from "next/link"

export default function SocialClubPage() {
  const [activeTab, setActiveTab] = useState("health")

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
              <span className="text-orange-400 font-semibold">Humboldt Park • Barrio Boriken</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
                SOCIAL CLUB
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 font-light">
              Where dance meets lifestyle. Where community meets culture.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                BEYOND THE PLATFORM
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Studio E connects students to instructors worldwide. The Social Club is where we bring 
                the best instructors to <span className="font-bold text-pink-600">one real location</span> to build something special.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-gray-900">The Physical Hub</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  While Studio E connects you to instructors across the globe, the Social Club is our 
                  <strong> physical storefront</strong> - a real space where community comes to life.
                </p>
                <p className="text-gray-700">
                  This is where we curate the best instructors, create lasting relationships, and develop 
                  the next generation of dancers through our proven methodology.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-gray-900">Studio E Method</h3>
                </div>
                                 <p className="text-gray-700 mb-4">
                   Our <strong>proprietary training approach</strong> that structures the learning process 
                   so you can start social dancing with confidence - faster.
                 </p>
                 <p className="text-gray-700">
                   We skip the traditional combo memorization. Instead, we teach you <strong>frameworks</strong> that let you stack techniques and create your own combinations in real time.
                 </p>
              </div>
            </div>
            
                         <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-8 rounded-2xl text-white text-center">
               <h3 className="text-2xl font-bold mb-4">Framework-Based Learning</h3>
               <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-6">
                 <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                   <h4 className="font-bold mb-2">Learn Frameworks</h4>
                   <p className="text-sm">Master the underlying principles, not just memorized sequences</p>
                 </div>
                 <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                   <h4 className="font-bold mb-2">Stack Techniques</h4>
                   <p className="text-sm">Build complexity by combining fundamental movements</p>
                 </div>
                 <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                   <h4 className="font-bold mb-2">Create On-the-Fly</h4>
                   <p className="text-sm">Improvise with confidence in any social dancing situation</p>
                 </div>
               </div>
               <div className="border-t border-white/30 pt-6">
                 <p className="text-lg font-medium">
                   But we go beyond just dancing. We're building a complete lifestyle experience 
                   that transforms how you move, think, and connect.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                THIS ISN'T FOR EVERYONE
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 italic">
                We're the world's first Latin Dance social club that treats dance as more than movement
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-6 rounded-xl border-l-4 border-pink-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Dance as a Life Tool</h3>
                  <p className="text-gray-700">
                    We believe dance unlocks a more fulfilling life. It's your gateway to mastering nonverbal communication, 
                    building social skills, and connecting with people from every walk of life in a space that demands 
                    cultural respect and critical thinking.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">All-In-One Experience</h3>
                  <p className="text-gray-700">
                    Why separate the most important things in life? We fused health, wealth, and love into one space 
                    because they're meant to work together. This is holistic living at its finest.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Active Membership Only</h3>
                  <p className="text-gray-700">
                    This is not a passive membership. We expect you to show up, engage, and treat this space as your 
                    second home. Wallflowers need not apply.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Building Something Greater</h3>
                  <p className="text-gray-700">
                    We're not just creating a space - we're building a movement. Come ready to contribute, 
                    collaborate, and create something bigger than yourself.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="mailto:studioelatindance@gmail.com?subject=Studio E Social Club Membership Application&body=Hello Studio E Team,%0A%0AI'm ready to commit to the Social Club lifestyle! Here's my application:%0A%0A1. What draws you to the Studio E Social Club?%0A[Your answer here]%0A%0A2. How do you plan to actively contribute to our community?%0A[Your answer here]%0A%0A3. Which aspects excite you most? (Health, Wealth, Love)%0A[Your answer here]%0A%0A4. What dance experience do you have?%0A[Your answer here]%0A%0A5. What are your goals for personal growth and community involvement?%0A[Your answer here]%0A%0A6. Why is this more than just a hobby for you?%0A[Your answer here]%0A%0AThank you for considering my application. I'm ready to make the Social Club my second home.%0A%0ABest regards,%0A[Your name]"
                className="inline-flex items-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium">ARE YOU READY TO COMMIT?</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b">
        <div className="container px-4">
          <div className="flex justify-center">
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
              {[
                { id: "health", label: "Health", icon: Activity, color: "text-green-600" },
                { id: "wealth", label: "Wealth", icon: DollarSign, color: "text-yellow-600" },
                { id: "love", label: "Love", icon: Heart, color: "text-pink-600" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-white shadow-md text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? tab.color : ""}`} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4">
          {/* Health Section */}
          {activeTab === "health" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  BODY & SOUL
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Your temple deserves the best. Move with purpose, train with passion.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {healthOfferings.map((offering, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-green-600 mb-4">{offering.category}</h3>
                    <p className="text-gray-600 mb-6">{offering.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {offering.items.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wealth Section */}
          {activeTab === "wealth" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  SECURE THE BAG
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Build your empire while building community. Success is better shared.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {wealthOfferings.map((offering, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-yellow-600 mb-4">{offering.category}</h3>
                    <p className="text-gray-600 mb-6">{offering.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {offering.items.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Love Section */}
          {activeTab === "love" && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-4">
                  FAMILY VIBES
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Real connections, authentic culture. This is where your tribe lives.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {loveOfferings.map((offering, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-pink-600 mb-4">{offering.category}</h3>
                    <p className="text-gray-600 mb-6">{offering.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {offering.items.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Special Features */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-black mb-4">EXCLUSIVE ACCESS</h2>
            <p className="text-xl text-gray-300">Members-only perks that keep the culture alive</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Merch Drops</h3>
              <p className="text-gray-400">Limited streetwear collections from local artists</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pop-Up Events</h3>
              <p className="text-gray-400">Surprise performances, artist showcases, and cultural celebrations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Network</h3>
              <p className="text-gray-400">Connect with entrepreneurs, artists, and culture creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-orange-600 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-black mb-4">READY TO JOIN THE MOVEMENT?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            This isn't just a dance studio - it's a lifestyle. It's culture. It's home.
          </p>
          
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a 
               href="mailto:studioelatindance@gmail.com?subject=Studio E Social Club Membership Application&body=Hello Studio E Team,%0A%0AI'm ready to join the Social Club movement! Here's my application:%0A%0A1. What draws you to the Studio E Social Club?%0A[Your answer here]%0A%0A2. How do you plan to actively contribute to our community?%0A[Your answer here]%0A%0A3. Which aspects excite you most? (Health, Wealth, Love)%0A[Your answer here]%0A%0A4. What dance experience do you have?%0A[Your answer here]%0A%0A5. What are your goals for personal growth and community involvement?%0A[Your answer here]%0A%0A6. Why is this more than just a hobby for you?%0A[Your answer here]%0A%0AThank you for considering my application. I'm ready to make the Social Club my second home.%0A%0ABest regards,%0A[Your name]"
             >
               <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 hover:text-pink-700 font-bold px-8 py-4 text-lg shadow-lg">
                 Apply for Membership
               </Button>
             </a>
             <Link href="/about">
               <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-600 font-bold px-8 py-4 text-lg">
                 Learn More
               </Button>
             </Link>
           </div>
          
          <div className="mt-8 text-sm opacity-90">
            <p>📍 Coming to Humboldt Park - Barrio Boriken</p>
          </div>
        </div>
      </section>
    </div>
  )
} 