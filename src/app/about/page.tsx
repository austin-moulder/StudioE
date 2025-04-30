"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getInstructorCount, getDanceStyleCount } from "@/lib/instructors/instructorUtils"
import useEmblaCarousel from 'embla-carousel-react'
import { getAllTestimonials } from "@/lib/testimonials/testimonialUtils"
import { TestimonialCarousel } from "@/app/components/TestimonialCarousel"
import { Testimonial } from "@/types/testimonial"

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

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500">
                Studio E was founded in 2023 with a simple mission: Unlock confidence, creativity, and technical mastery
                for all.
              </p>
              <p className="mt-4 text-gray-500">
                What began as a series of conversations with dance instructors in Chicago grew into an idea for a
                marketplace that would connect thousands of eager students with top instructors who are experienced,
                trustworthy, and dedicated to achieving results.
              </p>
              <p className="mt-4 text-gray-500">
                Our platform was created to provide a space where creatives and hobbyists alike could achieve their
                potential and engage with their best selves.
              </p>
              <p className="mt-4 text-gray-500">We hold our instructors accountable for:</p>
              <ul className="mt-2 space-y-2 text-gray-500 list-disc pl-5">
                <li>The growth of their students through structured privates</li>
                <li>Model behavior inside and outside of their lessons</li>
                <li>Clear and reliable communication with their clients</li>
                <li>An inclusive teaching environment</li>
                <li>A path of continuous learning</li>
              </ul>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Profile_Picture_Sitting.jpeg"
                alt="Austin Moulder, Founder of Studio E"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
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
            <p className="mt-6 text-xl text-gray-500">
              &quot;To unlock confidence, creativity, and technical mastery for all.&quot;
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden mt-16">
            <div className="overflow-hidden" ref={valuesEmblaRef}>
              <div className="flex">
                {[
                  {
                    title: "Accessibility",
                    description: "Making quality dance instruction available to everyone, regardless of location or experience level.",
                    icon: "🌍",
                  },
                  {
                    title: "Community",
                    description: "Building a supportive network of dancers, instructors, and enthusiasts who share a passion for movement.",
                    icon: "👥",
                  },
                  {
                    title: "Excellence",
                    description: "Maintaining high standards for our instructors to ensure students receive the best possible education.",
                    icon: "🏆",
                  },
                ].map((value, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg mx-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient/10 text-3xl">
                        {value.icon}
                      </div>
                      <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
                      <p className="mt-2 text-gray-500">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToValue(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedValueIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to value ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid mt-16 grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Accessibility",
                description: "Making quality dance instruction available to everyone, regardless of location or experience level.",
                icon: "🌍",
              },
              {
                title: "Community",
                description: "Building a supportive network of dancers, instructors, and enthusiasts who share a passion for movement.",
                icon: "👥",
              },
              {
                title: "Excellence",
                description: "Maintaining high standards for our instructors to ensure students receive the best possible education.",
                icon: "🏆",
              },
            ].map((value, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient/10 text-3xl">
                  {value.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
                <p className="mt-2 text-gray-500">{value.description}</p>
              </div>
            ))}
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
              Our Community Ambassadors are selected for 3-month terms and play a vital role in fostering a safe, inclusive, and engaging dance community.
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={ambassadorsEmblaRef}>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-2">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-50 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">Accepting Applications</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Ambassador {index}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Term: {new Date().toLocaleDateString()} - {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                            Blog Content Contributor
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                            Monthly Social Safe Person
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                            24/7 Hotline Operator
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                            Social Media Manager
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                            Community Event Coordinator
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3, 4].map((index) => (
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
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-50 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Accepting Applications</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ambassador {index}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Term: {new Date().toLocaleDateString()} - {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                      Blog Content Contributor
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                      Monthly Social Safe Person
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                      24/7 Hotline Operator
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                      Social Media Manager
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-[#FF3366] rounded-full mr-2"></span>
                      Community Event Coordinator
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Interested in becoming a Community Ambassador? Applications are open for our next term.
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
                          <div className="relative h-24 w-24 overflow-hidden rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center">
                            {testimonial.image_url && testimonial.image_url !== "/placeholder.svg" ? (
                              <Image 
                                src={testimonial.image_url} 
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <span className="text-gray-400 text-xs">{testimonial.name.charAt(0)}</span>
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