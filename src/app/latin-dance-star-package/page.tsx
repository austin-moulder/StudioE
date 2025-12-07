"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, Users, Calendar, Heart, Camera, Gift, Target } from "lucide-react"
import Link from "next/link"

export default function LatinDanceStarPackagePage() {

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10 px-4 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="h-6 w-6 text-yellow-300" />
            <span className="text-yellow-300 font-semibold">Premium Transformation Program</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Latin Dance Star Package
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-light max-w-3xl mx-auto">
            In 12 months we take you from shy / casual dancer to a confident social AND performance dancer with a full video portfolio and a dance family in the city.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
              <div className="text-3xl md:text-4xl font-black">$3,000</div>
              <div className="text-sm opacity-90">For 1 person</div>
            </div>
            <div className="text-white/80 font-bold text-xl">or</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
              <div className="text-3xl md:text-4xl font-black">$5,000</div>
              <div className="text-sm opacity-90">For a couple</div>
            </div>
          </div>

        </div>
      </section>

      {/* Value Stack Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              What's Inside
            </h2>
            <p className="text-xl text-gray-600 italic">
              A complete transformation program designed for serious dancers
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Unlimited Access */}
            <Card className="border-2 border-purple-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Unlimited Access for a Year</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Unlimited Studio E classes + socials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Unlimited Indie beginner / int classes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Priority waitlist / reservations for any full class</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Private Coaching */}
            <Card className="border-2 border-pink-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 rounded-full p-3">
                    <Target className="h-6 w-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Private Coaching & Custom Plan</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>1 strategy session to plan your 12‑month roadmap (goals: socials, showcase, wedding, competition, etc.)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>2 privates/month (24 total) to fix technique fast</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Optional add‑on for couples (shared or separate privates)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance & Social Milestones */}
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 rounded-full p-3">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Performance & Social Milestones</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Guaranteed spot in at least 1 Indie performance project</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Guaranteed spot in at least 1 Studio E performance project</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Choreographed solo or couple piece by year‑end</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quarterly Intensives */}
            <Card className="border-2 border-yellow-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <Calendar className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Quarterly Intensives</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>4 x half‑day intensives (body movement, musicality, styling, social skills)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media & Memories */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Media & Memories</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Professional photoshoot in‑studio</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>2 professionally edited dance videos (one performance, one social‑style)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Access to all raw class clips we're already filming</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lifestyle Perks */}
            <Card className="border-2 border-green-200 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Gift className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-4">Lifestyle Perks</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Free entry to all Studio E socials & pop‑ups</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Free / discounted entry to select Indie events</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Priority studio rental window for your own party (e.g., birthday, engagement)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Soft Guarantee Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-purple-300 shadow-xl">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Our Dance Confidence Guarantee</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  "If you complete 75% of sessions and don't feel like a totally different dancer, we'll coach you for 3 extra months in classes and socials at no extra tuition."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Transform Your Dance Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the Latin Dance Star Package and become the confident dancer you've always wanted to be.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://www.vagaro.com/cl/BU85r3RraycnEblRmmVS2ksWYD5~6OOObPKNgeE14Ok="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Book the Star Package
            </a>
            <Link 
              href="/membership"
              className="text-white/90 hover:text-white underline text-sm"
            >
              Or explore our standard membership plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

