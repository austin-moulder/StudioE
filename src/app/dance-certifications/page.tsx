"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Users, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CertificationsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full">{/* No image placeholder */}</div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Studio E Certifications
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Elevate your teaching credentials with our industry-recognized dance certifications
          </p>
          <Button size="lg" variant="secondary" className="mt-8 bg-[#7357D2] text-white hover:bg-[#6346C1]">
            Browse Certifications
          </Button>
        </div>
      </section>

      {/* About Certifications */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-square max-w-md mx-auto md:mx-0">
              <Image
                src="/placeholder.svg"
                alt="Studio E Certification"
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Get Certified?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Studio E certifications are designed by industry experts to validate your skills and enhance your
                teaching credentials.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Establish credibility with students and employers</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Command higher rates for your teaching services</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Access exclusive teaching opportunities</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Join a community of certified dance professionals</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Stay updated with the latest teaching methodologies</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-5 w-5 text-[#FF3366] flex-shrink-0 mt-0.5" />
                  <span>Enhance your resume and professional profile</span>
                </li>
              </ul>
              <Button size="lg" className="mt-8 bg-[#FF3366] text-white hover:bg-[#FF3366]/90">
                View Certification Process
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Programs */}
      <section className="py-16 bg-[#f7f7f7]">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Certification Programs</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose from a variety of certification programs designed to enhance your teaching skills in different
              dance styles.
            </p>
          </div>

          <Tabs defaultValue="salsa" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="salsa">Salsa</TabsTrigger>
              <TabsTrigger value="bachata">Bachata</TabsTrigger>
              <TabsTrigger value="choreo">Choreography</TabsTrigger>
              <TabsTrigger value="other">Other Styles</TabsTrigger>
            </TabsList>

            <TabsContent value="salsa" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Salsa Fundamentals Instructor",
                    level: "Level 1",
                    description:
                      "Master the basics of teaching salsa fundamentals to beginners, including timing, basic steps, and leading/following techniques.",
                    duration: "4 weeks",
                    price: 599,
                    nextStart: "July 15, 2025",
                  },
                  {
                    title: "Salsa On1 Specialist",
                    level: "Level 2",
                    description:
                      "Develop advanced skills in teaching On1 salsa, including turn patterns, styling, and musicality for intermediate students.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "August 1, 2025",
                  },
                  {
                    title: "Salsa On2 (NY Style) Instructor",
                    level: "Level 2",
                    description:
                      "Specialize in teaching On2 (New York style) salsa, focusing on timing, body movement, and authentic styling elements.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "August 15, 2025",
                  },
                  {
                    title: "Cuban Salsa Specialist",
                    level: "Level 2",
                    description:
                      "Master the techniques of teaching authentic Cuban-style salsa, including casino rueda and traditional Cuban body movement.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "September 1, 2025",
                  },
                  {
                    title: "Advanced Salsa Performance Coach",
                    level: "Level 3",
                    description:
                      "Learn to train and coach advanced salsa performers and competitors, focusing on complex choreography and showmanship.",
                    duration: "8 weeks",
                    price: 1299,
                    nextStart: "October 1, 2025",
                  },
                  {
                    title: "Salsa Master Instructor",
                    level: "Level 4",
                    description:
                      "Our highest-level salsa certification for experienced instructors looking to refine their teaching methodology and mentor other instructors.",
                    duration: "12 weeks",
                    price: 1999,
                    nextStart: "November 1, 2025",
                  },
                ].map((cert, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-[#FFE8EE] p-4">
                      <Badge className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">{cert.level}</Badge>
                      <h3 className="mt-2 text-xl font-bold">{cert.title}</h3>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{cert.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Next Start: {cert.nextStart}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-bold text-lg">${cert.price}</span>
                        <Button className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bachata" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Bachata Fundamentals Instructor",
                    level: "Level 1",
                    description:
                      "Learn to teach the foundations of bachata, including basic steps, timing, and connection techniques.",
                    duration: "4 weeks",
                    price: 599,
                    nextStart: "July 10, 2025",
                  },
                  {
                    title: "Traditional Bachata Specialist",
                    level: "Level 2",
                    description:
                      "Master the techniques of teaching authentic Dominican bachata, focusing on traditional movement and musicality.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "August 5, 2025",
                  },
                  {
                    title: "Sensual Bachata Instructor",
                    level: "Level 2",
                    description:
                      "Develop skills in teaching modern sensual bachata, including body waves, isolations, and fluid movement patterns.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "August 20, 2025",
                  },
                  {
                    title: "Bachata Fusion Specialist",
                    level: "Level 3",
                    description:
                      "Learn to teach bachata fusion styles, incorporating elements from other dance forms like urban, contemporary, and zouk.",
                    duration: "8 weeks",
                    price: 999,
                    nextStart: "September 15, 2025",
                  },
                  {
                    title: "Advanced Bachata Performance Coach",
                    level: "Level 3",
                    description:
                      "Train to coach advanced bachata performers and competitors, focusing on complex choreography and artistic expression.",
                    duration: "8 weeks",
                    price: 1299,
                    nextStart: "October 10, 2025",
                  },
                  {
                    title: "Bachata Master Instructor",
                    level: "Level 4",
                    description:
                      "Our highest-level bachata certification for experienced instructors looking to refine their teaching methodology and mentor others.",
                    duration: "12 weeks",
                    price: 1999,
                    nextStart: "November 5, 2025",
                  },
                ].map((cert, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-[#FFE8EE] p-4">
                      <Badge className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">{cert.level}</Badge>
                      <h3 className="mt-2 text-xl font-bold">{cert.title}</h3>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{cert.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Next Start: {cert.nextStart}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-bold text-lg">${cert.price}</span>
                        <Button className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="choreo" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Choreography Fundamentals",
                    level: "Level 1",
                    description:
                      "Learn the basics of creating and teaching choreography, including structure, musicality, and spatial awareness.",
                    duration: "4 weeks",
                    price: 699,
                    nextStart: "July 20, 2025",
                  },
                  {
                    title: "Latin Dance Choreographer",
                    level: "Level 2",
                    description:
                      "Specialize in creating and teaching Latin dance choreography for performances and showcases.",
                    duration: "6 weeks",
                    price: 899,
                    nextStart: "August 10, 2025",
                  },
                  {
                    title: "Urban Choreography Specialist",
                    level: "Level 2",
                    description:
                      "Master the techniques of creating and teaching urban dance choreography, including hip hop, street styles, and fusion.",
                    duration: "6 weeks",
                    price: 899,
                    nextStart: "August 25, 2025",
                  },
                  {
                    title: "Group Choreography Director",
                    level: "Level 3",
                    description:
                      "Learn advanced techniques for directing and teaching group choreography, including formations, transitions, and visual impact.",
                    duration: "8 weeks",
                    price: 1199,
                    nextStart: "September 20, 2025",
                  },
                  {
                    title: "Competition Choreography Coach",
                    level: "Level 3",
                    description:
                      "Develop skills in creating and coaching competition-level choreography, focusing on technical excellence and artistic expression.",
                    duration: "8 weeks",
                    price: 1399,
                    nextStart: "October 15, 2025",
                  },
                  {
                    title: "Master Choreographer",
                    level: "Level 4",
                    description:
                      "Our highest-level choreography certification for experienced choreographers looking to refine their creative process and mentor others.",
                    duration: "12 weeks",
                    price: 2199,
                    nextStart: "November 10, 2025",
                  },
                ].map((cert, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-[#FFE8EE] p-4">
                      <Badge className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">{cert.level}</Badge>
                      <h3 className="mt-2 text-xl font-bold">{cert.title}</h3>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{cert.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Next Start: {cert.nextStart}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-bold text-lg">${cert.price}</span>
                        <Button className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="other" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Heels Dance Instructor",
                    level: "Level 2",
                    description:
                      "Specialize in teaching heels dance techniques, focusing on posture, balance, and stylized movement.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "July 25, 2025",
                  },
                  {
                    title: "Zouk Instructor",
                    level: "Level 2",
                    description:
                      "Master the techniques of teaching Brazilian zouk, including body movement, connection, and flow.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "August 15, 2025",
                  },
                  {
                    title: "Kizomba Specialist",
                    level: "Level 2",
                    description:
                      "Learn to teach authentic kizomba, focusing on connection, musicality, and traditional movement patterns.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "August 30, 2025",
                  },
                  {
                    title: "Reggaeton Instructor",
                    level: "Level 2",
                    description:
                      "Develop skills in teaching reggaeton dance, including isolations, rhythm, and authentic styling.",
                    duration: "6 weeks",
                    price: 799,
                    nextStart: "September 10, 2025",
                  },
                  {
                    title: "Latin Jazz Specialist",
                    level: "Level 3",
                    description:
                      "Master the techniques of teaching Latin jazz dance, combining elements of Latin dance with jazz technique and styling.",
                    duration: "8 weeks",
                    price: 999,
                    nextStart: "October 5, 2025",
                  },
                  {
                    title: "Multi-Style Dance Instructor",
                    level: "Level 4",
                    description:
                      "Our comprehensive certification for instructors who want to teach multiple dance styles with expertise and versatility.",
                    duration: "16 weeks",
                    price: 2499,
                    nextStart: "November 15, 2025",
                  },
                ].map((cert, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="bg-[#FFE8EE] p-4">
                      <Badge className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">{cert.level}</Badge>
                      <h3 className="mt-2 text-xl font-bold">{cert.title}</h3>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{cert.duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>Next Start: {cert.nextStart}</span>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-bold text-lg">${cert.price}</span>
                        <Button className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Certification Process</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive certification process ensures that you receive thorough training and assessment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: 1,
                title: "Application",
                description: "Submit your application with your dance background and teaching experience.",
              },
              {
                step: 2,
                title: "Training",
                description:
                  "Complete the required training modules, including video lessons, live sessions, and practice assignments.",
              },
              {
                step: 3,
                title: "Assessment",
                description:
                  "Demonstrate your teaching skills through video submissions and live assessment sessions with our master instructors.",
              },
              {
                step: 4,
                title: "Certification",
                description:
                  "Receive your official Studio E certification and join our network of certified dance instructors.",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF3366] text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Become Certified?</h2>
            <p className="mt-4 text-lg">
              Take the next step in your dance teaching career with a Studio E certification.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" className="bg-[#7357D2] text-white hover:bg-[#6346C1]">
                Apply Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                Request Information
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 