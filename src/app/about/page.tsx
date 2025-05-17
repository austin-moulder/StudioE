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
import { supabase } from "@/lib/supabase/client"

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

      {/* Why Studio E */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-2xl italic font-medium text-gray-700">
              &quot;To unlock confidence, creativity, and technical mastery for all.&quot;
            </p>
          </div>

          <div className="mt-12 relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FF7A5A]/80 via-[#FF3366]/80 to-[#9933CC]/80 py-16">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Backgrounds/dance_pattern.png')] bg-repeat opacity-20"></div>
            </div>
            <div className="relative z-10 px-6 md:px-10">
              <div className="mx-auto max-w-4xl text-center text-white">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                  <div className="flex flex-col items-center">
                    <div className="text-5xl mb-4">🌍</div>
                    <h3 className="text-xl font-bold mb-2">Accessibility</h3>
                    <p className="text-white/90">Making quality dance instruction available to everyone, regardless of location or experience level.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-5xl mb-4">👥</div>
                    <h3 className="text-xl font-bold mb-2">Community</h3>
                    <p className="text-white/90">Building a supportive network of dancers, instructors, and enthusiasts who share a passion for movement.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-5xl mb-4">🏆</div>
                    <h3 className="text-xl font-bold mb-2">Excellence</h3>
                    <p className="text-white/90">Maintaining high standards for our instructors to ensure students receive the best possible education.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Studio E */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#FF7A5A]/10 via-[#FF3366]/10 to-[#9933CC]/10">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-12">Why Choose Studio E?</h2>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={featuresEmblaRef}>
              <div className="flex">
                {[
                  {
                    title: "Simplified Search",
                    description: "We take the struggle out of finding qualified instructors.",
                    number: "1"
                  },
                  {
                    title: "Personalized Learning",
                    description: "Our vast network of instructors means you will find someone who understands your learning style and can enable you to grow beyond what you imagined.",
                    number: "2"
                  },
                  {
                    title: "Vibrant Community",
                    description: "Join a vibrant and supportive network where you'll connect with like-minded individuals and gain access to exclusive events and experiences.",
                    number: "3"
                  },
                  {
                    title: "Vetted Instructors",
                    description: "We personally review every instructor on the platform for your safety.",
                    icon: "✓"
                  },
                  {
                    title: "Value for Money",
                    description: "Heavily discounted rates to access instructors and exclusive events.",
                    icon: "✓"
                  },
                  {
                    title: "24/7 Support",
                    description: "Customer support and confidential hotline available around the clock (coming soon).",
                    icon: "✓"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                    <div className="bg-white p-6 rounded-lg shadow-md h-[280px] flex flex-col">
                      {feature.number ? (
                        <div className="h-12 w-12 rounded-full bg-brand-gradient/10 flex items-center justify-center text-xl mb-4">
                          {feature.number}
                        </div>
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-brand-gradient/10 flex items-center justify-center text-xl mb-4">
                          {feature.icon}
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-500 flex-grow">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedFeatureIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to feature ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-brand-gradient/10 flex items-center justify-center text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Simplified Search</h3>
              <p className="text-gray-500">We take the struggle out of finding qualified instructors.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-brand-gradient/10 flex items-center justify-center text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Learning</h3>
              <p className="text-gray-500">
                Our vast network of instructors means you will find someone who understands your learning style and can
                enable you to grow beyond what you imagined.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-brand-gradient/10 flex items-center justify-center text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Vibrant Community</h3>
              <p className="text-gray-500">
                Join a vibrant and supportive network where you'll connect with like-minded individuals and gain access
                to exclusive events and experiences.
              </p>
            </div>
          </div>

          <div className="hidden md:grid mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-5 rounded-lg shadow-md flex items-start">
              <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Vetted Instructors</h4>
                <p className="text-sm text-gray-500">
                  We personally review every instructor on the platform for your safety.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex items-start">
              <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Value for Money</h4>
                <p className="text-sm text-gray-500">
                  Heavily discounted rates to access instructors and exclusive events.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex items-start">
              <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-1">24/7 Support</h4>
                <p className="text-sm text-gray-500">
                  Customer support and confidential hotline available around the clock (coming soon).
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex items-start">
              <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Convenient Booking</h4>
                <p className="text-sm text-gray-500">
                  Online booking system with flexible cancellation options.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex items-start">
              <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Exclusive Content</h4>
                <p className="text-sm text-gray-500">
                  Access to exclusive content and events for Studio E members.
                </p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md flex items-start">
              <div className="mr-3 h-6 w-6 text-[#FF3366] flex-shrink-0">✓</div>
              <div>
                <h4 className="font-semibold mb-1">100% to Instructors</h4>
                <p className="text-sm text-gray-500">
                  All coaching fees and tips go directly to your instructor.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg font-medium">Build the life you desire with the people who can get you there.</p>
            <Link href="/instructors">
              <Button size="lg" className="mt-4">
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