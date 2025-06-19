"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Heart,
  ArrowRight,
  Target,
  Award,
  Clock,
  DollarSign,
  ChevronDown,
  MessageCircle
} from 'lucide-react'

export default function MentoringProgramPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "Who can become a mentor in the Studio E Mentoring Program?",
      answer: "Mentors must be approved by the Studio E community ambassadors and leadership board. Interested mentors should send an email to studioelatindance@gmail.com with their qualifications and teaching experience."
    },
    {
      question: "How long does the mentoring program last?",
      answer: "Our intensive 4-week mentoring program provides focused 1-on-1 guidance, followed by ongoing support and community access for continued growth."
    },
    {
      question: "What's the time commitment for mentors?",
      answer: "Mentors commit to 2-3 hours per week including one-on-one sessions, group workshops, and curriculum review. We provide flexible scheduling to work around your teaching commitments."
    },
    {
      question: "Do mentors receive compensation?",
      answer: "Yes! Mentors receive competitive compensation per mentee, plus bonuses based on mentee success metrics and program completion rates."
    },
    {
      question: "What support do mentors receive?",
      answer: "We provide comprehensive mentor training, ongoing coaching, curriculum materials, and access to our exclusive mentor community for peer support and best practice sharing."
    },
    {
      question: "How are mentor-mentee matches made?",
      answer: "We carefully match based on dance styles, location, communication preferences, career goals, and personality compatibility to ensure the best possible mentoring relationship."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Mentorship_1.jpg)',
            backgroundPosition: 'center 30%'
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A5A]/95 via-[#FF3366]/90 to-[#9933CC]/95"></div>
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                <Users className="h-10 w-10" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 drop-shadow-lg">
                Studio E<br />
                <span className="text-4xl lg:text-6xl">MENTORING PROGRAM</span>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              ELEVATE YOUR DANCE INSTRUCTION WITH STUDIO E'S EXCLUSIVE 
              MENTORING PROGRAM. OUR INTENSIVE 4-WEEK PROGRAM PAIRS YOU 
              WITH EXPERIENCED INSTRUCTORS TO ACCELERATE YOUR TEACHING 
              JOURNEY AND BUILD YOUR DANCE BUSINESS.
            </p>
            <div className="animate-bounce">
              <ChevronDown className="h-8 w-8 mx-auto drop-shadow-lg" />
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      </section>

      {/* How We Do It Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How We Transform Instructors</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect passionate dance instructors with seasoned Studio E mentors who provide personalized guidance, 
              practical business strategies, and the support needed to thrive in the competitive dance industry.
            </p>
          </div>
        </div>
      </section>

      {/* As a Mentee Section */}
      <section className="py-16 bg-gradient-to-r from-[#9933CC] to-[#FF3366] text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Transform Your Teaching in 4 Weeks</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Master Advanced Teaching Techniques</h3>
              <p className="text-white/90">Receive personalized coaching and honest feedback from successful Studio E instructors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Your Dance Business</h3>
              <p className="text-white/90">Learn proven strategies to attract students, set competitive rates, and grow your income</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Develop Your Unique Style</h3>
              <p className="text-white/90">Discover new perspectives and innovative approaches to dance instruction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Mentorship Schedule</h3>
              <p className="text-white/90">Sessions tailored to your availability and teaching commitments</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="mailto:studioelatindance@gmail.com?subject=Mentoring Program - Get a Mentor&body=Hi Studio E Team,%0D%0A%0D%0AI'm interested in joining the Studio E Mentoring Program as a mentee. Please provide me with more information about the application process and next steps.%0D%0A%0D%0AThank you!">
              <Button 
                size="lg" 
                className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90 font-bold px-8 py-3 shadow-lg"
              >
                GET A MENTOR
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Mentoring Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Your 4-Week Journey</h2>
            <p className="text-xl italic mb-8">FROM APPLICATION TO TRANSFORMATION</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FF3366] text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Complete Your Mentee Profile</h3>
                <p className="text-gray-600">Tell us about your teaching experience, goals, and areas where you want to grow. We'll match you with the perfect mentor.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FF3366] text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Meet Your Dedicated Mentor</h3>
                <p className="text-gray-600">Connect with your carefully selected Studio E mentor based on your dance style, location, and career objectives.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FF3366] text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Begin Your Intensive 4-Week Program</h3>
                <p className="text-gray-600">Engage in weekly one-on-one sessions, receive personalized feedback, and implement proven strategies to elevate your teaching.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calling All Mentors Section */}
      <section className="py-16 bg-gradient-to-br from-[#9933CC] via-[#FF3366] to-[#FF7A5A] text-white">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="h-10 w-10" />
            </div>
            <h2 className="text-4xl font-bold mb-6">Share Your Expertise</h2>
            <p className="text-lg mb-8 leading-relaxed">
              Are you an experienced Studio E instructor with a passion for developing the next generation of dance teachers? 
              Join our elite mentoring team and help shape the future of dance education while earning competitive compensation 
              for your expertise.
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              Our mentors guide aspiring instructors through proven methodologies, business strategies, and teaching techniques 
              that have made Studio E a leader in dance education.
            </p>
            <a href="mailto:studioelatindance@gmail.com?subject=Mentoring Program - Become a Mentor&body=Hi Studio E Team,%0D%0A%0D%0AI'm interested in becoming a mentor for the Studio E Mentoring Program. I have experience as a dance instructor and would like to share my knowledge with aspiring teachers.%0D%0A%0D%0APlease provide me with information about the mentor application process and requirements.%0D%0A%0D%0AThank you!">
              <Button 
                size="lg" 
                className="bg-white/20 text-white border-2 border-white hover:bg-white hover:text-[#9933CC] font-bold px-8 py-3 transition-all duration-300"
              >
                BECOME A MENTOR
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Program Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Program Benefits</h2>
            <p className="text-lg text-gray-600">Why choose Studio E's Mentoring Program?</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-gray-100 hover:border-[#FF3366] transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-[#FF3366] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Accelerated Growth</h3>
                <p className="text-gray-600">Fast-track your teaching development with personalized guidance from industry experts.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-[#9933CC] transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-[#9933CC] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Elite Network</h3>
                <p className="text-gray-600">Join an exclusive community of Studio E's top-performing instructors and mentors.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-[#FF7A5A] transition-colors">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 text-[#FF7A5A] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Business Mastery</h3>
                <p className="text-gray-600">Learn proven strategies to increase your student base and maximize your teaching income.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-[#FF3366] transition-colors">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-[#FF3366] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Official Recognition</h3>
                <p className="text-gray-600">Receive Studio E certification upon successful completion of the mentoring program.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-[#9933CC] transition-colors">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 text-[#9933CC] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Flexible Schedule</h3>
                <p className="text-gray-600">Sessions scheduled around your availability and existing teaching commitments.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-100 hover:border-[#FF7A5A] transition-colors">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-[#FF7A5A] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Ongoing Support</h3>
                <p className="text-gray-600">Continued access to mentor resources and community beyond the 4-week program.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Get answers to common questions about our mentoring program</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 border-gray-100">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Teaching?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the Studio E Mentoring Program and take your dance instruction to the next level in just 4 weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:studioelatindance@gmail.com?subject=Mentoring Program - Get a Mentor&body=Hi Studio E Team,%0D%0A%0D%0AI'm interested in joining the Studio E Mentoring Program as a mentee. Please provide me with more information about the application process and next steps.%0D%0A%0D%0AThank you!">
              <Button 
                size="lg" 
                className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90 font-bold px-8 py-3 shadow-lg"
              >
                GET A MENTOR
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:studioelatindance@gmail.com?subject=Mentoring Program - Become a Mentor&body=Hi Studio E Team,%0D%0A%0D%0AI'm interested in becoming a mentor for the Studio E Mentoring Program. I have experience as a dance instructor and would like to share my knowledge with aspiring teachers.%0D%0A%0D%0APlease provide me with information about the mentor application process and requirements.%0D%0A%0D%0AThank you!">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#FF3366] font-bold px-8 py-3"
              >
                BECOME A MENTOR
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 