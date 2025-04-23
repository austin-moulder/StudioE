"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'

export default function GetStartedPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    goals: '',
    preferredLocations: [] as string[],
    referralSource: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => {
      const current = [...prev.preferredLocations]
      if (checked) {
        return { ...prev, preferredLocations: [...current, value] }
      } else {
        return { ...prev, preferredLocations: current.filter(item => item !== value) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('student_applications')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          goals: formData.goals,
          preferred_locations: formData.preferredLocations,
          referral_source: formData.referralSource
        })

      if (error) {
        console.error('Error submitting application:', error)
        throw error
      }
      
      toast.success('Your application has been submitted! We\'ll be in touch soon.')
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        goals: '',
        preferredLocations: [],
        referralSource: ''
      })
      
      // Redirect to homepage after a delay
      setTimeout(() => {
        router.push('/')
      }, 2000)
      
    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast.error(error?.message || 'Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const trainingLocations = [
    'Formal Studio',
    'Gym',
    'Your Home',
    'Instructor\'s Home',
    'Outside Public Area (i.e. park)'
  ]

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">Get Started with Studio E</h1>
      <p className="text-center text-lg mb-8">
        Connect with professional dance instructors for private lessons tailored to your skill level and goals
      </p>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="font-medium">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="font-medium">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="font-medium">
                  Phone number
                </Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address" className="font-medium">
                  Address
                </Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="goals" className="font-medium">
                  What would you like to achieve with Studio E?
                </Label>
                <Textarea 
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">
                  Where would you be open to training?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {trainingLocations.map(location => (
                    <div key={location} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`location-${location}`}
                        checked={formData.preferredLocations.includes(location)}
                        onChange={(e) => handleCheckboxChange(location, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`location-${location}`}>{location}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="location-other"
                      checked={formData.preferredLocations.includes('Other')}
                      onChange={(e) => handleCheckboxChange('Other', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="location-other">Other</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="referralSource" className="font-medium">
                  How did you hear about us?
                </Label>
                <Input 
                  id="referralSource"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 