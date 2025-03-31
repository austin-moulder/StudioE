"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getInstructorCount, getDanceStyleCount } from "@/lib/instructors/instructorUtils"

export default function AboutPage() {
  const testimonials = [
    {
      name: "Susan Clark",
      quote:
        "Austin is above and beyond! He is an amazing dancer and instructor! Such a FUN and positive experience, you get exercise and he also helps teach us different style of music, which keeps it so interesting, and also some spanish, and just general fun dance moves!! He is lovely, happy and very inspiring, always smiling and his class is very special and excellent!",
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
    },
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Accessibility",
                description:
                  "Making quality dance instruction available to everyone, regardless of location or experience level.",
                icon: "🌍",
              },
              {
                title: "Community",
                description:
                  "Building a supportive network of dancers, instructors, and enthusiasts who share a passion for movement.",
                icon: "👥",
              },
              {
                title: "Excellence",
                description:
                  "Maintaining high standards for our instructors to ensure students receive the best possible education.",
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
          <div className="grid gap-8 md:grid-cols-3">
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

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

          <div className="grid gap-8 md:grid-cols-2">
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

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join Our Community</h2>
            <p className="mt-4 text-lg">
              Whether you're looking to learn a new dance style or share your expertise as an instructor, Studio E is
              the perfect place to start.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/instructors">
                <Button size="lg" variant="secondary">
                  Find an Instructor
                </Button>
              </Link>
              <Link href="https://forms.gle/GqcrCPNp4s7deonc9" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  Become an Instructor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 