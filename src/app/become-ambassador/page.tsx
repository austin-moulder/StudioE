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

export default function BecomeAmbassadorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interestReason: '',
    skills: '',
    noConflicts: 'yes',
    conflictsExplanation: '',
    referralSource: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, noConflicts: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Convert string 'yes'/'no'/'other' to boolean for database
      const noConflictsValue = formData.noConflicts === 'yes'
      
      // Submit to Supabase
      const { data, error } = await supabase
        .from('ambassador_applications')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          interest_reason: formData.interestReason,
          skills: formData.skills,
          no_conflicts: noConflictsValue,
          conflicts_explanation: formData.conflictsExplanation,
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
        interestReason: '',
        skills: '',
        noConflicts: 'yes',
        conflictsExplanation: '',
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

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">Studio E Ambassador Application</h1>
      <p className="text-center text-lg mb-8">
        As a Studio E Ambassador, you will serve as a safe refuge in the dance space. You will take an active role in 
        contributing to the dance community's discourse, go above and beyond in service to others, and model stellar behavior. 
        This position is only for individuals with VERY clean records.
      </p>
      <p className="text-center text-base mb-10 text-red-600">
        If your presence as an ambassador poses any risk to Studio E or other dancers, please do not apply. 
        We instead encourage you to join the Men Who Dance group or speak with a Studio E representative 
        about other ways you may be able to contribute to our safe space.
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
                <Label htmlFor="interestReason" className="font-medium">
                  Why are you interested in becoming a Studio E ambassador?
                </Label>
                <Textarea 
                  id="interestReason"
                  name="interestReason"
                  value={formData.interestReason}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="skills" className="font-medium">
                  What skills would you bring to the ambassador role?
                </Label>
                <Textarea 
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">
                  Can you confirm that, if accepted as an ambassador, you have no outstanding conflicts with anyone directly 
                  engaged in the Latin dance community that would threaten the reputation of Studio E? 
                  <span className="text-red-500">*</span>
                </Label>
                <div className="flex flex-col space-y-1 mt-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="conflicts-yes"
                      name="noConflicts"
                      value="yes"
                      checked={formData.noConflicts === 'yes'}
                      onChange={() => handleRadioChange('yes')}
                      className="rounded-full"
                      required
                    />
                    <Label htmlFor="conflicts-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="conflicts-no"
                      name="noConflicts"
                      value="no"
                      checked={formData.noConflicts === 'no'}
                      onChange={() => handleRadioChange('no')}
                      className="rounded-full"
                    />
                    <Label htmlFor="conflicts-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="conflicts-other"
                      name="noConflicts"
                      value="other"
                      checked={formData.noConflicts === 'other'}
                      onChange={() => handleRadioChange('other')}
                      className="rounded-full"
                    />
                    <Label htmlFor="conflicts-other">Other</Label>
                  </div>
                </div>
                {formData.noConflicts === 'other' && (
                  <div className="mt-2">
                    <Label htmlFor="conflictsExplanation" className="font-medium">
                      Please explain (your answer will remain confidential)
                    </Label>
                    <Textarea 
                      id="conflictsExplanation"
                      name="conflictsExplanation"
                      value={formData.conflictsExplanation}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                )}
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