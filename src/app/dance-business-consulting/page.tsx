"use client"

import Image from "next/image"
import { Check, Calendar, Briefcase, Award, TrendingUp, Lightbulb, DollarSign, Megaphone, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BusinessExpertsPage() {
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
          <Button size="lg" variant="secondary" className="mt-8">
            Schedule a Consultation
          </Button>
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
                title: "Sales Strategy",
                description:
                  "Develop effective sales strategies to increase bookings, retain students, and maximize revenue.",
                icon: <TrendingUp className="h-10 w-10" />,
              },
              {
                title: "Financial Management",
                description:
                  "Financial planning, budgeting, and cash flow management to ensure your business is profitable and sustainable.",
                icon: <DollarSign className="h-10 w-10" />,
              },
              {
                title: "Tax Strategy",
                description:
                  "Tax planning and optimization strategies specifically for dance professionals and small business owners.",
                icon: <DollarSign className="h-10 w-10" />,
              },
              {
                title: "Content Creation",
                description:
                  "Professional content creation services including photography, videography, and social media content.",
                icon: <Lightbulb className="h-10 w-10" />,
              },
              {
                title: "Marketing & Promotion",
                description:
                  "Comprehensive marketing strategies to build your brand, attract new students, and grow your audience.",
                icon: <Megaphone className="h-10 w-10" />,
              },
              {
                title: "Branding",
                description:
                  "Professional branding services to help you stand out in a competitive market and attract your ideal clients.",
                icon: <Award className="h-10 w-10" />,
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
                    <Button variant="link" className="mt-4 text-[#FF3366]">
                      Learn More
                    </Button>
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
              <Button size="lg" className="mt-8 bg-[#FF3366] hover:bg-[#FF3366]/90">
                Join the Waitlist
              </Button>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg"
                alt="Dance Business Expert"
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
              Hear from dance instructors who have transformed their businesses with our coaching services.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Maria Rodriguez",
                role: "Salsa Instructor",
                quote:
                  "Working with Studio E's business experts helped me double my student base in just 6 months. Their marketing strategies and business planning were game-changers for my career.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "James Wilson",
                role: "Bachata Instructor & Studio Owner",
                quote:
                  "The financial management and tax strategies I learned saved me thousands of dollars and gave me the confidence to open my own studio. I couldn't have done it without Studio E's guidance.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Sophia Chen",
                role: "Contemporary Dance Teacher",
                quote:
                  "The content creation and branding services helped me establish a strong online presence. I now have a waiting list of students wanting to take my classes!",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">"{testimonial.quote}"</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Grow Your Dance Business?</h2>
            <p className="mt-4 text-lg">
              Schedule a free 30-minute consultation with one of our business experts to discuss your goals and
              challenges.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#7357D2] text-white hover:bg-[#6346C1]">
                Schedule a Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10"
              >
                View Service Packages
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 