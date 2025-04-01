"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getInstructorCount, getDanceStyleCount } from "@/lib/instructors/instructorUtils"
import useEmblaCarousel from 'embla-carousel-react'

export default function AboutPage() {
  const testimonials = [
    {
      name: "Sara Clark",
      quote:
        "Austin is above and beyond! He is an amazing dancer and instructor! Such a FUN and positive experience, you get exercise and he also helps teach us different style of music, which keeps it so interesting, and also some spanish, and just general fun dance moves!! He is lovely, happy and very inspiring, always smiling and his class is very special and excellent!",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Sara_Clark.jpeg",
    },
    {
      name: "Laurencia O.",
      quote:
        "Austin is very passionate about Bachata and his enthusiasm is a great motivator in the class. He is very thorough with his lessons and patient with his students! I had a great time in Core 1 Bachata. Austin is very kind and encouraging. I learned a lot of tips and tricks over the 4 weeks and I can't wait to learn more!",
      image: "/placeholder.svg",
    },
    {
      name: "Brianna Hook",
      quote:
        "I have been wanting to learn to lead for a long time, but I don't get the chance to take dance classes very often. As a single parent, it's also hard to carve out the time to travel to dance, but I am SO glad I set aside this weekend and had the opportunity to take classes with Austin! They broke down the steps so clearly and answered every question patiently with as much repetition as we needed. I left feeling confident, for the first time, that I could implement the basics in leading on the dance floor!",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Briana_Hall.jpeg",
    },
    {
      name: "Becca Yang",
      quote:
        "Austin & Noushin are a dynamic duo that make an amazing team as instructors. Between teaching and taking workshops and hosting the evening socials, they never once complained about being tired. We appreciate the safe space for asking hard questions and facilitating important conversations within the dance scene and culture. Thank you so much for all the behind-the-scenes blood, sweat and tears to make this event come together!",
      image: "/placeholder.svg",
    },
    {
      name: "Brandon Hampton",
      quote:
        "Detailed, Fundamentals-Driven, Accessible to All, Inclusive, Passionate, Fun! Austin is a creative entrepreneur at his core because he utilizes both out-of-the-box and practical methods for teaching, so that everyone regardless of their learning preference will fully grasp the lesson. He has simplified an approach to Latin Dance that any level can utilize to improve their skills.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Brandon_Hampton.png",
    },
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [valuesEmblaRef, valuesEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedValueIndex, setSelectedValueIndex] = useState(0);
  const [teamEmblaRef, teamEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [featuresEmblaRef, featuresEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [ambassadorsEmblaRef, ambassadorsEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedAmbassadorIndex, setSelectedAmbassadorIndex] = useState(0);

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Calculate counts directly using the utility functions
  const instructorCount = getInstructorCount()
  const danceStyleCount = getDanceStyleCount()

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

      {/* Our Mission */}
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
              href="https://forms.gle/1i18AQS9vyNea6A99" 
              target="_blank" 
              rel="noopener noreferrer"
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

          <div className="mx-auto max-w-3xl">
            <div className="relative bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative h-24 w-24 overflow-hidden rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">{testimonials[currentTestimonial].name.charAt(0)}</span>
                </div>
                <div>
                  <blockquote className="italic text-lg text-gray-500">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>
                  <footer className="mt-4 font-medium text-base not-italic">
                    — {testimonials[currentTestimonial].name}
                  </footer>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === currentTestimonial ? "bg-[#FF3366]" : "bg-gray-300"}`}
                      onClick={() => setCurrentTestimonial(index)}
                    />
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
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
            <Link href="https://forms.gle/reV28gHLZ8zvobUZ6" target="_blank" rel="noopener noreferrer">
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