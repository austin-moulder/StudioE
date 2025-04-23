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

export default function BecomeInstructorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    isInterested: 'yes',
    teachingStyles: [] as string[],
    teachingInfo: '',
    goals: '',
    teachingLocations: [] as string[],
    referralSource: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => {
      const current = [...(prev[field as keyof typeof prev] as unknown as string[])]
      return {
        ...prev,
        [field]: checked 
          ? [...current, value] 
          : current.filter(item => item !== value)
      }
    })
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, isInterested: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Submit to Supabase
      const { data, error } = await supabase
        .from('instructor_applications')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          is_interested: formData.isInterested,
          teaching_styles: formData.teachingStyles,
          teaching_info: formData.teachingInfo,
          goals: formData.goals,
          teaching_locations: formData.teachingLocations,
          referral_source: formData.referralSource
        })

      if (error) {
        console.error('Error submitting application:', error)
        throw error
      }
      
      toast.success('Application submitted successfully!')
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        isInterested: 'yes',
        teachingStyles: [],
        teachingInfo: '',
        goals: '',
        teachingLocations: [],
        referralSource: ''
      })
      
      // Redirect to thank you page or home page after 2 seconds
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

  const teachingStyles = [
    'Choreography', 'Heels', 'Salsa', 'Bachata', 'Merengue', 
    'Cumbia', 'Kizomba', 'Zouk', 'Swing', 'DJ', 
    'Dance Photography', 'Event Organizing', 'Fitness'
  ]

  const teachingLocations = [
    'I own my own studio',
    'I can rent a studio (Studio E has discounted rates)',
    'At the client\'s home',
    'At my home',
    'In an open public space (i.e. park)',
    'Virtually'
  ]

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">Become an Instructor</h1>
      <p className="text-center text-lg mb-8">
        Set your rates, set your hours, grow your business alongside other professionals with Studio E
      </p>

      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold">Instructor Application</h2>
          <p className="text-gray-500">Fill out the form below to apply as a Studio E instructor</p>
        </div>
        <CardContent>
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

              <div className="space-y-2">
                <Label className="font-medium">
                  Are you interested in becoming a Studio E Instructor? <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="interested-yes"
                      name="isInterested"
                      value="yes"
                      checked={formData.isInterested === 'yes'}
                      onChange={() => handleRadioChange('yes')}
                      className="rounded-full"
                    />
                    <Label htmlFor="interested-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="interested-no"
                      name="isInterested"
                      value="no"
                      checked={formData.isInterested === 'no'}
                      onChange={() => handleRadioChange('no')}
                      className="rounded-full"
                    />
                    <Label htmlFor="interested-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="interested-other"
                      name="isInterested"
                      value="other"
                      checked={formData.isInterested === 'other'}
                      onChange={() => handleRadioChange('other')}
                      className="rounded-full"
                    />
                    <Label htmlFor="interested-other">Other</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">
                  What lessons are you interested in teaching?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {teachingStyles.map(style => (
                    <div key={style} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`style-${style}`}
                        checked={formData.teachingStyles.includes(style)}
                        onChange={(e) => handleCheckboxChange('teachingStyles', style, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`style-${style}`}>{style}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="teachingInfo" className="font-medium">
                  Share a little bit about your preferred teaching topic and your teaching style
                </Label>
                <Textarea 
                  id="teachingInfo"
                  name="teachingInfo"
                  value={formData.teachingInfo}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
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
                  Where would you be open to teaching?
                </Label>
                <div className="flex flex-col space-y-2 mt-1">
                  {teachingLocations.map(location => (
                    <div key={location} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`location-${location}`}
                        checked={formData.teachingLocations.includes(location)}
                        onChange={(e) => handleCheckboxChange('teachingLocations', location, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`location-${location}`}>{location}</Label>
                    </div>
                  ))}
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