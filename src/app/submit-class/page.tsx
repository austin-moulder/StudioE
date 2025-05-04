"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { Company, getAllCompanies } from '@/lib/supabase/classesUtils'

export default function SubmitClassPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])
  const [isNewCompany, setIsNewCompany] = useState(false)
  
  const [formData, setFormData] = useState({
    // Class details
    class_name: '',
    instructor: '',
    price: 0,
    series_length: 0,
    is_series_start: false,
    class_date: '',
    day_of_week: '',
    start_time: '',
    end_time: '',
    is_drop_in: false,
    is_weekly: false,
    is_biweekly: false,
    instructor_approval_required: false,
    notes: '',
    company_id: '',
    
    // Company details (for new companies)
    company_name: '',
    contact_name: '',
    phone: '',
    email: '',
    address: ''
  })

  // Fetch companies on component mount
  useEffect(() => {
    async function fetchCompanies() {
      const companiesData = await getAllCompanies()
      setCompanies(companiesData)
    }
    fetchCompanies()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'price' || name === 'series_length') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDayOfWeekCalculation = (date: string) => {
    if (!date) return ''
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const selectedDate = new Date(date)
    // Fix for time zone issues by setting the time to noon UTC
    selectedDate.setUTCHours(12, 0, 0, 0)
    const dayOfWeek = days[selectedDate.getDay()]
    
    setFormData(prev => ({ ...prev, day_of_week: dayOfWeek, class_date: date }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Form validation checks for required fields
      if (!formData.class_name || !formData.instructor || !formData.class_date || 
          !formData.start_time || !formData.end_time) {
        throw new Error('Please fill out all required fields')
      }

      // If series class, require series_length
      if (formData.is_series_start && (!formData.series_length || formData.series_length <= 0)) {
        throw new Error('For series classes, please specify the number of classes in the series')
      }

      let companyId = formData.company_id

      // If new company is selected, create the company first
      if (isNewCompany) {
        if (!formData.company_name || !formData.contact_name || !formData.email || !formData.address) {
          throw new Error('Please fill out all required company information')
        }

        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .insert({
            name: formData.company_name,
            contact_name: formData.contact_name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address
          })
          .select('id')
          .single()

        if (companyError) {
          console.error('Error creating company:', companyError)
          throw new Error('Failed to create company. Please try again.')
        }

        companyId = companyData.id
      }

      // Submit class to Supabase
      const { error: classError } = await supabase
        .from('classes')
        .insert({
          class_name: formData.class_name,
          instructor: formData.instructor,
          price: formData.price,
          series_length: formData.is_series_start ? formData.series_length : null,
          is_series_start: formData.is_series_start,
          class_date: formData.class_date,
          day_of_week: formData.day_of_week,
          start_time: formData.start_time,
          end_time: formData.end_time,
          is_drop_in: formData.is_drop_in,
          is_weekly: formData.is_weekly,
          is_biweekly: formData.is_biweekly,
          instructor_approval_required: formData.instructor_approval_required,
          notes: formData.notes || null,
          company_id: companyId,
          is_active: false // Set as inactive by default until admin approval
        })

      if (classError) {
        console.error('Error submitting class:', classError)
        throw new Error('Failed to submit class. Please try again.')
      }
      
      toast.success('Class submitted successfully! It will be reviewed by our team and published once approved.')
      
      // Reset form after successful submission
      setFormData({
        class_name: '',
        instructor: '',
        price: 0,
        series_length: 0,
        is_series_start: false,
        class_date: '',
        day_of_week: '',
        start_time: '',
        end_time: '',
        is_drop_in: false,
        is_weekly: false,
        is_biweekly: false,
        instructor_approval_required: false,
        notes: '',
        company_id: '',
        
        company_name: '',
        contact_name: '',
        phone: '',
        email: '',
        address: ''
      })
      
      // Redirect to classes page after 2 seconds
      setTimeout(() => {
        router.push('/classes')
      }, 2000)
      
    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast.error(error?.message || 'Failed to submit class. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[200px] w-full" />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Submit a Dance Class</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Add your dance class to the Studio E directory
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-3xl mx-auto">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold">Class Submission Form</h2>
            <p className="text-gray-500">Fill out the form below to submit your dance class</p>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Studio/Company Information */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Studio Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="company_id" className="font-medium">
                          Select Studio/Company <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="is_new_company" 
                            checked={isNewCompany}
                            onCheckedChange={(checked) => setIsNewCompany(!!checked)}
                          />
                          <Label htmlFor="is_new_company" className="text-sm">Add New Studio</Label>
                        </div>
                      </div>

                      {isNewCompany ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="company_name" className="text-sm">
                              Studio Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="company_name"
                              name="company_name"
                              value={formData.company_name}
                              onChange={handleInputChange}
                              required={isNewCompany}
                              className="mt-1"
                              placeholder="e.g. Dance Connection Studio"
                            />
                          </div>

                          <div>
                            <Label htmlFor="contact_name" className="text-sm">
                              Contact Person <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="contact_name"
                              name="contact_name"
                              value={formData.contact_name}
                              onChange={handleInputChange}
                              required={isNewCompany}
                              className="mt-1"
                              placeholder="e.g. John Smith"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-sm">
                              Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required={isNewCompany}
                              className="mt-1"
                              placeholder="e.g. contact@studio.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-sm">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="mt-1"
                              placeholder="e.g. (555) 123-4567"
                            />
                          </div>

                          <div>
                            <Label htmlFor="address" className="text-sm">
                              Studio Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              required={isNewCompany}
                              className="mt-1"
                              placeholder="e.g. 123 Main St, Chicago, IL 60601"
                            />
                          </div>
                        </div>
                      ) : (
                        <Select 
                          value={formData.company_id} 
                          onValueChange={(value) => handleSelectChange('company_id', value)}
                          disabled={isNewCompany}
                        >
                          <SelectTrigger id="company_id" className="w-full">
                            <SelectValue placeholder="Select a studio" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {companies.map(company => (
                              <SelectItem key={company.id} value={company.id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Class Details Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Class Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="class_name" className="font-medium">
                        Class Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="class_name"
                        name="class_name"
                        value={formData.class_name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. Beginner Salsa Level 1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="instructor" className="font-medium">
                        Instructor Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="instructor"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. Jane Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="font-medium">
                        Price <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price.toString()}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. 20"
                        min="0"
                        step="0.01"
                      />
                      <p className="text-xs text-gray-500 mt-1">Price per class in USD</p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="is_series_start" 
                          checked={formData.is_series_start}
                          onCheckedChange={(checked) => {
                            const isChecked = !!checked;
                            handleCheckboxChange('is_series_start', isChecked);
                            if (isChecked) {
                              // If series class is selected, drop-in should be false
                              handleCheckboxChange('is_drop_in', false);
                            }
                          }}
                        />
                        <Label htmlFor="is_series_start">This is a series class</Label>
                      </div>
                      
                      {formData.is_series_start && (
                        <div className="pl-6">
                          <Label htmlFor="series_length" className="text-sm">
                            Number of Classes in Series <span className="text-red-500">*</span>
                          </Label>
                          <Input 
                            id="series_length"
                            name="series_length"
                            type="number"
                            value={formData.series_length.toString()}
                            onChange={handleInputChange}
                            required={formData.is_series_start}
                            className="mt-1 w-full md:w-1/3"
                            min="1"
                            step="1"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="is_drop_in" 
                          checked={formData.is_drop_in}
                          onCheckedChange={(checked) => {
                            const isChecked = !!checked;
                            handleCheckboxChange('is_drop_in', isChecked);
                            if (isChecked) {
                              // If drop-in is selected, series class should be false
                              handleCheckboxChange('is_series_start', false);
                              setFormData(prev => ({ ...prev, series_length: 0 }));
                            }
                          }}
                        />
                        <Label htmlFor="is_drop_in">This is a drop-in class</Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="is_weekly" 
                          checked={formData.is_weekly}
                          onCheckedChange={(checked) => handleCheckboxChange('is_weekly', !!checked)}
                        />
                        <Label htmlFor="is_weekly">This is a weekly class</Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="is_biweekly" 
                          checked={formData.is_biweekly}
                          onCheckedChange={(checked) => handleCheckboxChange('is_biweekly', !!checked)}
                        />
                        <Label htmlFor="is_biweekly">This is a biweekly class (every two weeks)</Label>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id="instructor_approval_required" 
                          checked={formData.instructor_approval_required}
                          onCheckedChange={(checked) => handleCheckboxChange('instructor_approval_required', !!checked)}
                        />
                        <Label htmlFor="instructor_approval_required">Instructor approval required</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date and Time Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Date and Time</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="class_date" className="font-medium">
                        Class Date <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="class_date"
                        name="class_date"
                        type="date"
                        value={formData.class_date}
                        onChange={(e) => handleDayOfWeekCalculation(e.target.value)}
                        required
                        className="mt-1"
                      />
                      {formData.day_of_week && (
                        <p className="text-xs text-gray-500 mt-1">
                          Day of week: {formData.day_of_week}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start_time" className="font-medium">
                          Start Time <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="start_time"
                          name="start_time"
                          type="time"
                          value={formData.start_time}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="end_time" className="font-medium">
                          End Time <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                          id="end_time"
                          name="end_time"
                          type="time"
                          value={formData.end_time}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Notes Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notes" className="font-medium">
                        Notes (optional)
                      </Label>
                      <Textarea 
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                        placeholder="Any additional information about the class (prerequisite skills, what to bring, etc.)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">
                  Submitted classes will be reviewed by our team and must be approved before being listed on the site.
                  This review process typically takes 1-2 business days.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#9933CC] hover:bg-[#9933CC]/90" 
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Class'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 