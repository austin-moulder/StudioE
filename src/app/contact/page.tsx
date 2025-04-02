"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: `Subject: ${formData.subject}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      // Reset error message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }))
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[300px] w-full bg-gray-300">
          {/* Placeholder for hero image */}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Contact Us</h1>
          <p className="mt-6 max-w-2xl text-lg">Have questions or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
              <p className="mt-4 text-lg text-gray-500">
                We're here to help with any questions about your Studio E experience.
              </p>

              <div className="mt-8 space-y-6">
                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <Mail className="h-6 w-6 text-[#FF3366]" />
                    <div>
                      <h3 className="font-semibold">Email Us</h3>
                      <p className="text-sm text-gray-500 mt-1">For general inquiries:</p>
                      <a href="mailto:studioelatindance@gmail.com" className="text-[#FF3366] hover:underline">
                        studioelatindance@gmail.com
                      </a>
                      <p className="text-sm text-gray-500 mt-2">For instructor support:</p>
                      <a href="mailto:moulder.austin@gmail.com" className="text-[#FF3366] hover:underline">
                        moulder.austin@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <Phone className="h-6 w-6 text-[#FF3366]" />
                    <div>
                      <h3 className="font-semibold">Call Us</h3>
                      <p className="text-sm text-gray-500 mt-1">Customer Support:</p>
                      <a href="tel:+18164196279" className="text-[#FF3366] hover:underline">
                        (816) 419-6279
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <MapPin className="h-6 w-6 text-[#FF3366]" />
                    <div>
                      <h3 className="font-semibold">Visit Us</h3>
                      <p className="text-sm text-gray-500 mt-1">Studio E Headquarters</p>
                      <address className="not-italic">
                        2613 West Evergreen Avenue
                        <br />
                        Chicago, IL 60622
                        <br />
                        United States
                      </address>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <Clock className="h-6 w-6 text-[#FF3366]" />
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-sm text-gray-500 mt-1">Monday - Friday: 9:00 AM - 6:00 PM Central</p>
                      <p className="text-sm text-gray-500">Saturday: 10:00 AM - 4:00 PM Central</p>
                      <p className="text-sm text-gray-500">Sunday: 10:00 AM - 4:00 PM Central</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Send Us a Message</h2>
              <p className="mt-4 text-lg text-gray-500">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={handleSelectChange} value={formData.subject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="instructor">Becoming an Instructor</SelectItem>
                      <SelectItem value="student">Student Support</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : submitStatus === 'success' ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-500">Find quick answers to common questions about Studio E.</p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {[
              {
                question: "How do I book a lesson with an instructor?",
                answer:
                  "After creating an account, you can browse instructor profiles and book directly through their calendar. Payment is processed securely through our platform.",
              },
              {
                question: "What happens if I need to cancel a lesson?",
                answer:
                  "Our cancellation policy allows for full refunds if cancelled 24 hours before the scheduled lesson. Late cancellations may be subject to a fee.",
              },
              {
                question: "How do I become an instructor on Studio E?",
                answer:
                  "Instructors can apply through our 'Become an Instructor' page. We review applications based on experience, qualifications, and teaching style.",
              },
              {
                question: "How are payments handled?",
                answer:
                  "All payments are processed securely through our platform, and instructors receive 100% of their set fees.",
              },
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{faq.question}</h3>
                  <p className="mt-2 text-gray-500">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500">
              Still have questions?{" "}
              <a 
                href="mailto:studioelatindance@gmail.com" 
                className="text-[#F94C8D] hover:underline font-medium"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 