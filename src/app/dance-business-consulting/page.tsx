"use client"

import Image from "next/image"
import { Check, Calendar, Briefcase, Award, TrendingUp, Lightbulb, DollarSign, Megaphone, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Script from "next/script"
import { useEffect, useState } from "react"
import { getBusinessTestimonials } from "@/lib/testimonials/testimonialUtils"
import { TestimonialCard } from "@/app/components/TestimonialCard"
import { Testimonial } from "@/types/testimonial"

export default function BusinessExpertsPage() {
  // Load Calendly widget when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Add state for testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  // Add useEffect to fetch business testimonials
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getBusinessTestimonials()
        setTestimonials(data)
      } catch (error) {
        console.error("Error loading testimonials:", error)
      } finally {
        setTestimonialsLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full">{/* No image placeholder */}</div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Grow Your Dance Business
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Expert business coaching services to help dance instructors build thriving businesses
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Business Services</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer comprehensive business coaching services specifically designed for dance instructors and studio
              owners.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Event Support",
                description:
                  "Full-service event planning, promotion, and management for workshops, socials, and showcases.",
                icon: <Calendar className="h-10 w-10" />,
              },
              {
                title: "Business Planning",
                description:
                  "Strategic business planning to help you define your vision, set goals, and create a roadmap for success.",
                icon: <Briefcase className="h-10 w-10" />,
              },
              {
                title: "Financial Management",
                description:
                  "Financial planning, budgeting, and cash flow management to ensure your business is profitable and sustainable.",
                icon: <DollarSign className="h-10 w-10" />,
              },
              {
                title: "Content & Branding",
                description:
                  "Professional content creation, photography, videography, and branding services to help you stand out and attract your ideal clients.",
                icon: <Lightbulb className="h-10 w-10" />,
              },
              {
                title: "Marketing & Promotion",
                description:
                  "Comprehensive marketing strategies to build your brand, attract new students, and grow your audience.",
                icon: <Megaphone className="h-10 w-10" />,
              },
              {
                title: "Talent Acquisition",
                description:
                  "Recruitment and hiring support to help you build a team of talented instructors and staff.",
                icon: <UserPlus className="h-10 w-10" />,
              },
            ].map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-[#FFE8EE] p-3">
                      <div className="text-[#FF3366]">{service.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accelerator Program */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <Badge className="mb-4 bg-[#FFE8EE] text-[#FF3366] hover:bg-[#FFD6E6]">Coming Soon</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Dance Business Accelerator</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                An intensive 12-week program designed to help dance instructors scale their businesses and increase
                their income.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Weekly group coaching sessions with business experts</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Personalized business assessment and growth plan</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Marketing and branding toolkit</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Financial management templates and resources</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Community of like-minded dance entrepreneurs</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Exclusive networking opportunities with industry leaders</span>
                </li>
              </ul>
              <Button 
                size="lg" 
                className="mt-8 bg-[#FF3366] hover:bg-[#FF3366]/90"
                onClick={() => window.open('https://forms.gle/3xXrTP8sSGgXiUeb8', '_blank')}
              >
                Join the Waitlist
              </Button>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Speaking.jpg"
                alt="Dance Business Expert Speaking"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from professionals who have transformed their businesses with our coaching services.
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role || 'Dance Professional'}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Grow Your Dance Business?</h2>
            <p className="mt-4 text-lg">
              Schedule a free 30-minute consultation with one of our business experts to discuss your goals and
              challenges.
            </p>
            <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/studioelatindance/30min" 
                style={{ minWidth: "320px", height: "700px" }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 