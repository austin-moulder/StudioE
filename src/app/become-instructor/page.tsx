"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const teachingStyles = [
  'Choreography', 'Heels', 'Salsa', 'Bachata', 'Merengue', 
  'Cumbia', 'Kizomba', 'Zouk', 'Swing', 'DJ', 
  'Dance Photography', 'Event Organizing', 'Fitness'
]

const teachingLocations = [
  'I own my own studio',
  'I can rent a studio (Studio E has discounted rates)',
  "At the client's home",
  'At my home',
  'In an open public space (i.e. park)',
  'Virtually'
]

export default function BecomeInstructorPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<string[]>([])
  const [locationType, setLocationType] = useState<'select' | 'other'>('select')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    style: [] as string[],
    other_style: '',
    location: '',
    custom_location: '',
    price_lower: 50,
    price_upper: 70,
    teaching_info: '',
    goals: '',
    teaching_locations: [] as string[],
    referral_source: ''
  })

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('instructors')
        .select('location')
      if (!error && data) {
        const unique = Array.from(new Set(data.map((row: any) => row.location).filter(Boolean)))
        setLocations(unique)
      }
    }
    fetchLocations()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price_lower' || name === 'price_upper' ? parseFloat(value) : value
    }))
  }

  const handleCheckboxChange = (field: 'style' | 'teaching_locations', value: string, checked: boolean) => {
    setFormData(prev => {
      const current = [...(prev[field] as string[])]
      return {
        ...prev,
        [field]: checked 
          ? [...current, value] 
          : current.filter(item => item !== value)
      }
    })
  }

  const handleLocationSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === '__other__') {
      setLocationType('other')
      setFormData(prev => ({ ...prev, location: '', custom_location: '' }))
    } else {
      setLocationType('select')
      setFormData(prev => ({ ...prev, location: value, custom_location: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const displayName = `${formData.first_name} ${formData.last_name.charAt(0)}.`
      let styleArray = [...formData.style]
      if (formData.other_style.trim()) {
        styleArray.push(`Other: ${formData.other_style.trim()}`)
      }
      const styleString = styleArray.join(', ')
      const locationToSubmit = locationType === 'other' ? formData.custom_location : formData.location

      const { data, error } = await supabase
        .from('instructors')
        .insert({
          name: displayName,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          style: styleString,
          location: locationToSubmit,
          price_lower: formData.price_lower,
          price_upper: formData.price_upper,
          teaching_info: formData.teaching_info,
          goals: formData.goals,
          teaching_locations: formData.teaching_locations,
          referral_source: formData.referral_source,
          active: false
        })

      if (error) {
        console.error('Error submitting application:', error)
        throw error
      }
      
      toast({
        title: "Success",
        description: "Instructor profile created successfully!",
        variant: "default"
      })
      
      setTimeout(() => {
        router.push('/instructor-profile-form')
      }, 2000)
      
    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: error?.message || 'Failed to submit application. Please try again.',
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

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
                <Label htmlFor="first_name" className="font-medium">First Name <span className="text-pink-500">*</span></Label>
                <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="last_name" className="font-medium">Last Name <span className="text-pink-500">*</span></Label>
                <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email" className="font-medium">Email <span className="text-pink-500">*</span></Label>
                <Input id="email" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
              </div>
              <div>
                <Label htmlFor="phone" className="font-medium">Phone <span className="text-pink-500">*</span></Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div>
                <Label className="font-medium">What lessons are you interested in teaching?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                  {teachingStyles.map(style => (
                    <div key={style} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`style-${style}`}
                        checked={formData.style.includes(style)}
                        onChange={(e) => handleCheckboxChange('style', style, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`style-${style}`}>{style}</Label>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Label htmlFor="other_style" className="font-medium">Other teaching style (optional)</Label>
                  <Input
                    id="other_style"
                    name="other_style"
                    value={formData.other_style}
                    onChange={handleInputChange}
                    placeholder="Enter any additional teaching styles not listed above"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    If you teach something that's not on our list, please specify it here
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="location" className="font-medium">Location *</Label>
                <select
                  id="location"
                  name="location"
                  value={locationType === 'other' ? '__other__' : formData.location}
                  onChange={handleLocationSelect}
                  className="mt-1 block w-full border rounded px-3 py-2"
                  required={locationType === 'select'}
                >
                  <option value="" disabled>Select a location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                  <option value="__other__">Other (write in new location)</option>
                </select>
                {locationType === 'other' && (
                  <Input
                    id="custom_location"
                    name="custom_location"
                    value={formData.custom_location}
                    onChange={handleInputChange}
                    placeholder="Enter new location"
                    className="mt-2"
                    required
                  />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price_lower" className="font-medium">Intro Session Rate ($)</Label>
                  <Input id="price_lower" name="price_lower" type="number" min="0" value={formData.price_lower} onChange={handleInputChange} required placeholder="50" />
                </div>
                <div>
                  <Label htmlFor="price_upper" className="font-medium">Recurring Rate ($)</Label>
                  <Input id="price_upper" name="price_upper" type="number" min="0" value={formData.price_upper} onChange={handleInputChange} required placeholder="70" />
                </div>
              </div>
              <div>
                <Label htmlFor="teaching_info" className="font-medium">Share a little bit about your preferred teaching topic and your teaching style</Label>
                <Textarea id="teaching_info" name="teaching_info" value={formData.teaching_info} onChange={handleInputChange} rows={3} />
              </div>
              <div>
                <Label htmlFor="goals" className="font-medium">What would you like to achieve with Studio E?</Label>
                <Textarea id="goals" name="goals" value={formData.goals} onChange={handleInputChange} rows={3} />
              </div>
              <div>
                <Label className="font-medium">Where would you be open to teaching?</Label>
                <div className="flex flex-col space-y-2 mt-1">
                  {teachingLocations.map(location => (
                    <div key={location} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`location-${location}`}
                        checked={formData.teaching_locations.includes(location)}
                        onChange={(e) => handleCheckboxChange('teaching_locations', location, e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor={`location-${location}`}>{location}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="referral_source" className="font-medium">How did you hear about us?</Label>
                <Input id="referral_source" name="referral_source" value={formData.referral_source} onChange={handleInputChange} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* New section for existing instructors */}
      <div className="mt-12 bg-gray-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Already an approved instructor?</h2>
        <p className="mb-6">
          If you've already been approved as a Studio E instructor, you can create or update your instructor profile to showcase your teaching style, experience, and availability.
        </p>
        <Link href="/instructor-profile-form">
          <Button className="bg-[#9333EA] hover:bg-[#9333EA]/90">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create or Update Profile
          </Button>
        </Link>
      </div>
    </div>
  )
} 