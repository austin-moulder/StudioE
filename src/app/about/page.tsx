"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Music2 } from "lucide-react"
import Link from "next/link"
import { getInstructorCount, getDanceStyleCount } from "@/lib/instructors/instructorUtils"
import useEmblaCarousel from 'embla-carousel-react'
import { getAllTestimonials } from "@/lib/testimonials/testimonialUtils"
import { TestimonialCarousel } from "@/app/components/TestimonialCarousel"
import { Testimonial } from "@/types/testimonial"
import { supabase } from "@/lib/supabase/supabase"

// Helper function to determine if a name is likely male or female
function getDefaultImageByName(name: string): string {
  // Common male names that start with these letters are more likely to be male
  const maleFirstLetters = ['j', 'r', 'd', 'm', 'b', 'c', 'p', 'g', 'a', 't', 'k', 'w', 'n', 'h', 'f'];
  
  // Get first name (in case of full names)
  const firstName = name.split(' ')[0].toLowerCase();
  
  // Default male image
  const maleImage = "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/John_Doe.png";
  
  // Default female image
  const femaleImage = "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Briana_Hall.jpeg";
  
  // Names ending with these are more likely to be female
  if (firstName.endsWith('a') || 
      firstName.endsWith('e') || 
      firstName.endsWith('i') || 
      firstName.endsWith('y') ||
      firstName.includes('ann') ||
      firstName.includes('mary') ||
      firstName.includes('elle') ||
      firstName.includes('lisa') ||
      firstName.includes('sara') ||
      firstName.includes('emma')) {
    return femaleImage;
  }
  
  // Check first letter against common male first letters
  const firstLetter = firstName.charAt(0);
  if (maleFirstLetters.includes(firstLetter)) {
    return maleImage;
  }
  
  // Default to male if unsure
  return maleImage;
}

export default function AboutPage() {
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)
  const [valuesEmblaRef, valuesEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedValueIndex, setSelectedValueIndex] = useState(0);
  const [teamEmblaRef, teamEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [featuresEmblaRef, featuresEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [ambassadorsEmblaRef, ambassadorsEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedAmbassadorIndex, setSelectedAmbassadorIndex] = useState(0);
  const [instructorCount, setInstructorCount] = useState(0)
  const [danceStyleCount, setDanceStyleCount] = useState(0)

  useEffect(() => {
    if (valuesEmblaApi) {
      valuesEmblaApi.on('select', () => {
        setSelectedValueIndex(valuesEmblaApi.selectedScrollSnap());
      });
    }
  }, [valuesEmblaApi]);

  useEffect(() => {
    if (teamEmblaApi) {
      teamEmblaApi.on('select', () => {
        setSelectedTeamIndex(teamEmblaApi.selectedScrollSnap());
      });
    }
  }, [teamEmblaApi]);

  useEffect(() => {
    if (featuresEmblaApi) {
      featuresEmblaApi.on('select', () => {
        setSelectedFeatureIndex(featuresEmblaApi.selectedScrollSnap());
      });
    }
  }, [featuresEmblaApi]);

  useEffect(() => {
    if (ambassadorsEmblaApi) {
      ambassadorsEmblaApi.on('select', () => {
        setSelectedAmbassadorIndex(ambassadorsEmblaApi.selectedScrollSnap());
      });
    }
  }, [ambassadorsEmblaApi]);

  useEffect(() => {
    async function fetchCounts() {
      const instructors = await getInstructorCount()
      const styles = await getDanceStyleCount()
      setInstructorCount(instructors)
      setDanceStyleCount(styles)
    }
    fetchCounts()
  }, [])

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getAllTestimonials()
        setTestimonialsData(data)
      } catch (error) {
        console.error("Error loading testimonials:", error)
      } finally {
        setTestimonialsLoading(false)
      }
    }
    
    loadTestimonials()
  }, [])

  const scrollToValue = useCallback((index: number) => {
    valuesEmblaApi && valuesEmblaApi.scrollTo(index);
  }, [valuesEmblaApi]);

  const scrollToTeam = useCallback((index: number) => {
    teamEmblaApi && teamEmblaApi.scrollTo(index);
  }, [teamEmblaApi]);

  const scrollToFeature = useCallback((index: number) => {
    featuresEmblaApi && featuresEmblaApi.scrollTo(index);
  }, [featuresEmblaApi]);

  const scrollToAmbassador = useCallback((index: number) => {
    ambassadorsEmblaApi && ambassadorsEmblaApi.scrollTo(index);
  }, [ambassadorsEmblaApi]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full bg-gray-300">
          {/* Placeholder for hero image */}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">About Studio E</h1>
          <p className="mt-6 max-w-2xl text-lg">
            Connecting passionate dance instructors with eager students since 2023.
          </p>
        </div>
      </section>

      {/* How Does it Work? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8">How Does it Work?</h2>
          
          <div className="w-full">
            <p className="text-lg text-gray-700 text-center mb-10">
              Finding and booking a dance instructor has never been easier
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-[#FF3366]">Single Instructor Experience</h3>
                <p className="mb-4">Want to learn from a specific instructor? Our focused approach includes:</p>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#FF3366] text-white font-bold">1</div>
                    <p>
                      <Link href="/instructors" className="hover:underline text-[#FF3366]">
                        Find an instructor on Studio E
                      </Link> and view their profile
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#FF3366] text-white font-bold">2</div>
                    <p>Click "Contact Instructor" and send a message about what you're looking to achieve</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#FF3366] text-white font-bold">3</div>
                    <p>Studio E coordinates the details and we'll get you dancing with your instructor</p>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-500 italic">Perfect for those who want to develop a relationship with one instructor!</p>
              </div>
              
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-[#FF7A5A]">Multi-Instructor Experience</h3>
                <p className="mb-4">Want to try different teaching styles? Our curated experience includes:</p>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#FF7A5A] text-white font-bold">1</div>
                    <p>
                      <a 
                        href="mailto:studioelatindance@gmail.com?subject=Multi-Instructor Experience Request&body=Hello Studio E,%0A%0AI'm interested in the Multi-Instructor Experience. My dance goals are...%0A%0AThank you!"
                        className="hover:underline text-[#FF7A5A]"
                      >
                        Send a message to Studio E
                      </a> with your specific dance goals
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#FF7A5A] text-white font-bold">2</div>
                    <p>Schedule a complementary intro session to build your curriculum and instructor lineup</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[#FF7A5A] text-white font-bold">3</div>
                    <p>Studio E sets up 5 private lessons across several instructors tailored to your goals</p>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-500 italic">Perfect for those who want exposure to different teaching styles!</p>
              </div>
              
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-[#9933CC]">Coming Soon</h3>
                <p className="mb-4">As Studio E evolves, we're building a complete platform that will include:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-[#9933CC] mt-1">✓</span>
                    <span>Integrated scheduling with instructor availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-[#9933CC] mt-1">✓</span>
                    <span>Secure online payment processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-[#9933CC] mt-1">✓</span>
                    <span>Dance space recommendations and booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-[#9933CC] mt-1">✓</span>
                    <span>Automated cancellation policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-[#9933CC] mt-1">✓</span>
                    <span>Dispute resolution support</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-gray-500 italic">Just find who you like and book directly on the site!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gradient-to-r from-[#FF7A5A]/10 via-[#FF3366]/10 to-[#9933CC]/10 py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-12">Our Mission</h2>
            <div className="relative p-10 md:p-16 mx-4 md:mx-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/50 rounded-2xl shadow-xl"></div>
              <div className="relative z-10">
                <div className="absolute -top-10 -left-4 text-9xl text-[#FF3366]/20 font-serif">"</div>
                <p className="text-2xl md:text-4xl font-light tracking-wide text-gray-800 leading-relaxed">
                  To unlock <span className="font-medium text-[#FF3366]">confidence</span>, 
                  <span className="font-medium text-[#FF7A5A]"> creativity</span>, and 
                  <span className="font-medium text-[#9933CC]"> technical mastery</span> for all.
                </p>
                <div className="absolute -bottom-10 -right-4 text-9xl text-[#FF3366]/20 font-serif">"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Studio E */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A5A]/5 via-[#FF3366]/5 to-[#9933CC]/5"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]">
              Why Choose Studio E?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We're reimagining dance education to make it more accessible, personalized, and community-focused.
            </p>
          </div>

          {/* Main Feature Cards - Always visible on all devices */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A5A] to-[#FF3366] rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 opacity-90"></div>
              <div className="relative p-8 md:p-10 text-white h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">1</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Simplified Search</h3>
                </div>
                <p className="text-white/90 flex-grow">
                  We take the struggle out of finding qualified instructors who match your learning style and goals.
                </p>
                <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366] to-[#9933CC] rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 opacity-90"></div>
              <div className="relative p-8 md:p-10 text-white h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">2</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Personalized Learning</h3>
                </div>
                <p className="text-white/90 flex-grow">
                  Our vast network of instructors means you'll find someone who understands your learning style and can help you grow beyond what you imagined.
                </p>
                <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9933CC] to-[#FF7A5A] rounded-2xl transform group-hover:scale-[1.02] transition-all duration-300 opacity-90"></div>
              <div className="relative p-8 md:p-10 text-white h-full flex flex-col">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">3</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Vibrant Community</h3>
                </div>
                <p className="text-white/90 flex-grow">
                  Join a vibrant and supportive network where you'll connect with like-minded individuals and gain access to exclusive events and experiences.
                </p>
                <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Features Hexagon Grid */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Vetted Instructors",
                  description: "We personally review every instructor on the platform for your safety.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  color: "#FF3366"
                },
                {
                  title: "Value for Money",
                  description: "Heavily discounted rates to access instructors and exclusive events.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: "#FF7A5A"
                },
                {
                  title: "24/7 Support",
                  description: "Customer support and confidential hotline available around the clock (coming soon).",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                    </svg>
                  ),
                  color: "#9933CC"
                },
                {
                  title: "Convenient Booking",
                  description: "Online booking system with flexible cancellation options.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  color: "#FF3366"
                },
                {
                  title: "Exclusive Content",
                  description: "Access to exclusive content and events for Studio E members.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  ),
                  color: "#FF7A5A"
                },
                {
                  title: "100% to Instructors",
                  description: "All coaching fees and tips go directly to your instructor.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  color: "#9933CC"
                }
              ].map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-5px] h-full flex flex-col">
                    <div className="flex items-start space-x-4 mb-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${feature.color}20` }}>
                        <div className="text-[#FF3366]">{feature.icon}</div>
                      </div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-xl font-light text-gray-700 mb-6">
              Build the life you desire with the people who can get you there.
            </p>
            <Link href="/instructors">
              <Button size="lg" className="bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] border-none hover:from-[#FF3366]/90 hover:to-[#FF7A5A]/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Find Your Instructor Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-500">The passionate individuals behind Studio E</p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={teamEmblaRef}>
              <div className="flex">
                {[
                  {
                    name: "Austin Moulder, MBA",
                    role: "Founder & CEO",
                    bio: "Tech entrepreneur and Former Boston Consulting Group Consultant",
                    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Profile_Picture_Standing.jpeg",
                  },
                  {
                    name: "Noushin Ansari",
                    role: "Head of Culture",
                    bio: "Seasoned medical professional and social dancer who believes in the power of building safe and inclusive communities.",
                    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Noushin_Ansari.jpeg",
                  },
                ].map((member, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="flex flex-col items-center text-center mx-2">
                      <div className="relative h-48 w-48 overflow-hidden rounded-full">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          style={{
                            objectPosition: member.name === "Noushin Ansari" ? "center bottom" : "center"
                          }}
                          priority
                        />
                      </div>
                      <h3 className="mt-6 text-xl font-bold">{member.name}</h3>
                      <p className="text-[#FF3366]">{member.role}</p>
                      <p className="mt-2 text-sm text-gray-500">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToTeam(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedTeamIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Austin Moulder, MBA",
                role: "Founder & CEO",
                bio: "Tech entrepreneur and Former Boston Consulting Group Consultant",
                image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Profile_Picture_Standing.jpeg",
              },
              {
                name: "Noushin Ansari",
                role: "Head of Culture",
                bio: "Seasoned medical professional and social dancer who believes in the power of building safe and inclusive communities.",
                image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Noushin_Ansari.jpeg",
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative h-48 w-48 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: member.name === "Noushin Ansari" ? "center bottom" : "center"
                    }}
                    priority
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold">{member.name}</h3>
                <p className="text-[#FF3366]">{member.role}</p>
                <p className="mt-2 text-sm text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Ambassadors Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Community Ambassadors
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Community Ambassadors are accepted on a rolling basis and play a vital role in fostering a safe, inclusive, and engaging dance community.
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={ambassadorsEmblaRef}>
              <div className="flex">
                {/* Content Contributor 1 */}
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-2 flex flex-col h-full">
                    <div className="relative pt-[100%] bg-gray-50">
                      <Image 
                        src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/profile_images/authors/1746489558337_cv1ar3bs6fg.png"
                        alt="Fait Accompli"
                        fill
                        className="object-cover absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Content Contributor 1
                        </h3>
                        <p className="text-[#FF3366] font-medium mb-4">
                          Fait Accompli
                        </p>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Creates compelling blog content and collaborates on podcast planning, bringing diverse perspectives and creative ideas to Studio E's digital platforms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Contributor 2 */}
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-2 flex flex-col h-full">
                    <div className="relative pt-[100%] bg-gray-50">
                      <Image 
                        src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors_v2/Brandon_H.png"
                        alt="Brandon Hampton"
                        fill
                        className="object-cover absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Content Contributor 2
                        </h3>
                        <p className="text-[#FF3366] font-medium mb-4">
                          Brandon Hampton
                        </p>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Creates compelling blog content and collaborates on podcast planning, bringing diverse perspectives and creative ideas to Studio E's digital platforms.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Playmaker */}
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-2 flex flex-col h-full">
                    <div className="relative pt-[100%] bg-gray-50">
                      <Image 
                        src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                        alt="Community Playmaker"
                        fill
                        className="object-contain absolute top-0 left-0 w-full h-full p-6"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Community Playmaker
                        </h3>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Serves as our designated safety advocate at dance socials, attending at least 4 events monthly to ensure an inclusive environment. Remains on-call for dance scene emergencies, providing crucial support during challenging situations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Manager */}
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-2 flex flex-col h-full">
                    <div className="relative pt-[100%] bg-gray-50">
                      <Image 
                        src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                        alt="Social Media Manager"
                        fill
                        className="object-contain absolute top-0 left-0 w-full h-full p-6"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Social Media Manager
                        </h3>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Curates and manages Studio E's Instagram and TikTok presence, developing engaging content that showcases our diverse community. Creates consistent posting schedules and responds to community engagement while tracking analytics to optimize reach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Organizer */}
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-2 flex flex-col h-full">
                    <div className="relative pt-[100%] bg-gray-50">
                      <Image 
                        src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                        alt="Community Organizer"
                        fill
                        className="object-contain absolute top-0 left-0 w-full h-full p-6"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Community Organizer
                        </h3>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Coordinates vibrant community gatherings including Studio E pre-game events, facilitates engaging online forums, and develops innovative activities that strengthen connections among our diverse dance community.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Development Specialist */}
                <div className="flex-[0_0_100%] min-w-0">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-2 flex flex-col h-full">
                    <div className="relative pt-[100%] bg-gray-50">
                      <Image 
                        src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                        alt="Business Development Specialist"
                        fill
                        className="object-contain absolute top-0 left-0 w-full h-full p-6"
                      />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Business Development Specialist
                        </h3>
                      </div>
                      <div className="mt-auto">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          Researches and implements expansion strategies into new cities, optimizes our growing instructor and student network, and helps develop innovative products and services that enhance the Studio E experience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToAmbassador(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedAmbassadorIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to ambassador ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Content Contributor 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
              <div className="relative pt-[100%] bg-gray-50">
                <Image 
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/profile_images/authors/1746489558337_cv1ar3bs6fg.png"
                  alt="Fait Accompli"
                  fill
                  className="object-cover absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Content Contributor 1
                  </h3>
                  <p className="text-[#FF3366] font-medium mb-4">
                    Fait Accompli
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Creates compelling blog content and collaborates on podcast planning, bringing diverse perspectives and creative ideas to Studio E's digital platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Contributor 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
              <div className="relative pt-[100%] bg-gray-50">
                <Image 
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors_v2/Brandon_H.png"
                  alt="Brandon Hampton"
                  fill
                  className="object-cover absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Content Contributor 2
                  </h3>
                  <p className="text-[#FF3366] font-medium mb-4">
                    Brandon Hampton
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Creates compelling blog content and collaborates on podcast planning, bringing diverse perspectives and creative ideas to Studio E's digital platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Playmaker */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
              <div className="relative pt-[100%] bg-gray-50">
                <Image 
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                  alt="Community Playmaker"
                  fill
                  className="object-contain absolute top-0 left-0 w-full h-full p-6"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Community Playmaker
                  </h3>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Serves as our designated safety advocate at dance socials, attending at least 4 events monthly to ensure an inclusive environment. Remains on-call for dance scene emergencies, providing crucial support during challenging situations.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Manager */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
              <div className="relative pt-[100%] bg-gray-50">
                <Image 
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                  alt="Social Media Manager"
                  fill
                  className="object-contain absolute top-0 left-0 w-full h-full p-6"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Social Media Manager
                  </h3>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Curates and manages Studio E's Instagram and TikTok presence, developing engaging content that showcases our diverse community. Creates consistent posting schedules and responds to community engagement while tracking analytics to optimize reach.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Organizer */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
              <div className="relative pt-[100%] bg-gray-50">
                <Image 
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                  alt="Community Organizer"
                  fill
                  className="object-contain absolute top-0 left-0 w-full h-full p-6"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Community Organizer
                  </h3>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Coordinates vibrant community gatherings including Studio E pre-game events, facilitates engaging online forums, and develops innovative activities that strengthen connections among our diverse dance community.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Development Specialist */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col h-full">
              <div className="relative pt-[100%] bg-gray-50">
                <Image 
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png"
                  alt="Business Development Specialist"
                  fill
                  className="object-contain absolute top-0 left-0 w-full h-full p-6"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Business Development Specialist
                  </h3>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Researches and implements expansion strategies into new cities, optimizes our growing instructor and student network, and helps develop innovative products and services that enhance the Studio E experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Interested in becoming a Community Ambassador? Applications are accepted on a rolling basis.
            </p>
            <Link 
              href="/become-ambassador" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#FF3366] hover:bg-[#FF3366]/90 transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { number: "100+", label: "Satisfied Students" },
              { number: `${instructorCount}+`, label: "Qualified Instructors" },
              { number: `${danceStyleCount}+`, label: "Dance Styles" },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-[#FF3366]">{stat.number}</span>
                <span className="mt-2 text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What People Say About Us</h2>
            <p className="mt-4 text-lg text-gray-500">
              Hear from students who have experienced the Studio E difference
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <div className="overflow-hidden" ref={valuesEmblaRef}>
                <div className="flex">
                  {testimonialsData.map((testimonial, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0">
                      <div className="relative bg-white rounded-lg shadow-lg p-8 mx-2">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <div className="relative h-24 w-24 overflow-hidden rounded-full flex-shrink-0">
                            {testimonial.image_url && testimonial.image_url !== "/placeholder.svg" ? (
                              <Image 
                                src={testimonial.image_url} 
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Image 
                                src={getDefaultImageByName(testimonial.name)} 
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <blockquote className="italic text-lg text-gray-500">
                              "{testimonial.quote}"
                            </blockquote>
                            <footer className="mt-4 font-medium text-base not-italic">
                              — {testimonial.name}
                              {testimonial.style && <span className="text-sm text-gray-500 ml-2">({testimonial.style} Student)</span>}
                              {testimonial.type && <span className="text-sm text-gray-500 ml-2">({testimonial.type})</span>}
                            </footer>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center mt-6 space-x-2">
                {testimonialsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToValue(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedValueIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Community */}
      <section className="py-16 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join Our Community</h2>
          <p className="mt-4 text-lg">
            Whether you're looking to learn a new dance style or share your expertise as an instructor, Studio E is
            the perfect place to start.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/instructors">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Find an Instructor
              </Button>
            </Link>
            <Link href="/become-instructor">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Become an Instructor
              </Button>
            </Link>
            <Link href="/studio-e-travel">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Travel with Studio E
              </Button>
            </Link>
            <Link href="/men-who-dance">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Men Who Dance
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 