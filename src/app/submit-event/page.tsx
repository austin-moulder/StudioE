"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import SupabaseImageUploader from '@/components/SupabaseImageUploader'

export default function SubmitEventPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    event_date_end: '',
    start_time: '',
    end_time: '',
    location: '',
    price: '',
    image_url: '',
    event_type: '',
    cta_url: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    business_planning: '',
    is_weekly: false,
    gallery_url: '',
    start_datetime: '',
    end_datetime: '',
    timezone: 'America/Chicago'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    // For event_type field, capitalize the first letter
    if (field === 'event_type') {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setFormData(prev => ({ ...prev, [field]: capitalizedValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Form validation checks
      if (!formData.title || !formData.description || !formData.event_date || 
          !formData.start_time || !formData.end_time || !formData.location || 
          !formData.event_type || !formData.first_name || !formData.email) {
        throw new Error('Please fill out all required fields')
      }

      // Validate dates and times
      const eventDate = new Date(formData.event_date)
      if (isNaN(eventDate.getTime())) {
        throw new Error('Please enter a valid event date')
      }

      // Auto-fill start_datetime and end_datetime from the regular date and time fields if not provided
      let startDatetime = formData.start_datetime;
      let endDatetime = formData.end_datetime;

      // If start_datetime isn't provided, generate it from event_date and start_time
      if (!startDatetime && formData.event_date && formData.start_time) {
        // Create a date object from the event date
        const startDate = new Date(formData.event_date + 'T' + formData.start_time + ':00');
        // Convert to ISO string for database - without timezone conversion
        startDatetime = startDate.toISOString();
      }

      // If end_datetime isn't provided, generate it from event_date_end (or event_date) and end_time
      if (!endDatetime && formData.end_time) {
        // Use event_date_end if available, otherwise use event_date
        const endDate = new Date((formData.event_date_end || formData.event_date) + 'T' + formData.end_time + ':00');
        // Convert to ISO string for database - without timezone conversion
        endDatetime = endDate.toISOString();
      }

      // Submit to Supabase EVENT table
      const { data, error } = await supabase
        .from('EVENT')
        .insert({
          title: formData.title,
          description: formData.description,
          event_date: formData.event_date,
          event_date_end: formData.event_date_end || formData.event_date, // Default to event_date if end date not provided
          start_time: formData.start_time,
          end_time: formData.end_time,
          location: formData.location,
          price: formData.price || '0', // Default to free if price not provided
          image_url: formData.image_url || 'https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Events/default-event.jpg', // Default image
          event_type: formData.event_type,
          status: 'pending', // Default to pending for admin approval
          is_featured: false, // Default to not featured
          approved: false, // New field - default to not approved
          cta_url: formData.cta_url,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone_number: formData.phone_number || null,
          business_planning: formData.business_planning || null,
          is_weekly: formData.is_weekly,
          gallery_url: formData.gallery_url || null,
          start_datetime: startDatetime || null,
          end_datetime: endDatetime || null,
          timezone: formData.timezone || 'America/Chicago'
        })

      if (error) {
        console.error('Error submitting event:', error)
        throw error
      }
      
      toast.success('Event submitted successfully! It will be reviewed by our team and published once approved.')
      
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        event_date: '',
        event_date_end: '',
        start_time: '',
        end_time: '',
        location: '',
        price: '',
        image_url: '',
        event_type: '',
        cta_url: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        business_planning: '',
        is_weekly: false,
        gallery_url: '',
        start_datetime: '',
        end_datetime: '',
        timezone: 'America/Chicago'
      })
      
      // Redirect to events page after 2 seconds
      setTimeout(() => {
        router.push('/events')
      }, 2000)
      
    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast.error(error?.message || 'Failed to submit event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Event types available in the system
  const eventTypes = [
    'Social', 'Workshop', 'Showcase', 'Festival', 'Competition', 'Community', 'Audition'
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[200px] w-full" />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Submit Your Event</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Share your dance event with the Studio E community
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-3xl mx-auto">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold">Event Submission Form</h2>
            <p className="text-gray-500">Fill out the form below to submit your event for review</p>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Event Details Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="font-medium">
                        Event Title <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. Salsa Workshop with John Doe"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="font-medium">
                        Event Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea 
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        rows={4}
                        placeholder="Provide details about your event, what attendees can expect, and any other important information"
                      />
                    </div>

                    <div>
                      <Label htmlFor="event_type" className="font-medium">
                        Event Type <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={formData.event_type} 
                        onValueChange={(value) => handleSelectChange('event_type', value)}
                      >
                        <SelectTrigger id="event_type" className="w-full mt-1">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {eventTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Date and Time Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Date and Time</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="start_datetime_date" className="font-medium">
                        Start Date and Time <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                        <div>
                          <Label htmlFor="start_datetime_date" className="text-sm text-gray-500">Date</Label>
                          <Input 
                            id="start_datetime_date"
                            type="date"
                            className="mt-1"
                            required
                            onChange={(e) => {
                              // Combine date with existing time or default to midnight
                              const date = e.target.value;
                              if (!date) return;
                              
                              try {
                                // Parse existing datetime or create new one
                                const existingDate = formData.start_datetime ? new Date(formData.start_datetime) : new Date();
                                
                                // Get time components from existing date
                                const hours = existingDate.getHours();
                                const minutes = existingDate.getMinutes();
                                
                                // Create new date from selected date and existing time
                                const [year, month, day] = date.split('-').map(Number);
                                const newDate = new Date(year, month - 1, day, hours, minutes);
                                
                                // Update the state with ISO string
                                setFormData({
                                  ...formData,
                                  start_datetime: newDate.toISOString(),
                                  event_date: date // Keep legacy field in sync
                                });
                              } catch (error) {
                                console.error('Error setting date:', error);
                              }
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="start_datetime_time" className="text-sm text-gray-500">Time</Label>
                          <Input 
                            id="start_datetime_time"
                            type="time"
                            className="mt-1"
                            required
                            onChange={(e) => {
                              // Combine time with existing date or default to today
                              const time = e.target.value;
                              if (!time) return;
                              
                              try {
                                // Parse existing datetime or create new one
                                const existingDate = formData.start_datetime ? new Date(formData.start_datetime) : new Date();
                                
                                // Set the time part while keeping the date
                                const [hours, minutes] = time.split(':').map(Number);
                                existingDate.setHours(hours, minutes, 0, 0);
                                
                                // Update the state with ISO string
                                setFormData({
                                  ...formData,
                                  start_datetime: existingDate.toISOString(),
                                  start_time: time // Keep legacy field in sync
                                });
                              } catch (error) {
                                console.error('Error setting time:', error);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="end_datetime_date" className="font-medium">
                        End Date and Time <span className="text-red-500">*</span>
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                        <div>
                          <Label htmlFor="end_datetime_date" className="text-sm text-gray-500">Date</Label>
                          <Input 
                            id="end_datetime_date"
                            type="date"
                            className="mt-1"
                            required
                            onChange={(e) => {
                              // Combine date with existing time or default to midnight
                              const date = e.target.value;
                              if (!date) return;
                              
                              try {
                                // Parse existing datetime or create new one
                                const existingDate = formData.end_datetime ? new Date(formData.end_datetime) : new Date();
                                
                                // Get time components from existing date
                                const hours = existingDate.getHours();
                                const minutes = existingDate.getMinutes();
                                
                                // Create new date from selected date and existing time
                                const [year, month, day] = date.split('-').map(Number);
                                const newDate = new Date(year, month - 1, day, hours, minutes);
                                
                                // Update the state with ISO string
                                setFormData({
                                  ...formData,
                                  end_datetime: newDate.toISOString(),
                                  event_date_end: date // Keep legacy field in sync
                                });
                              } catch (error) {
                                console.error('Error setting date:', error);
                              }
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="end_datetime_time" className="text-sm text-gray-500">Time</Label>
                          <Input 
                            id="end_datetime_time"
                            type="time"
                            className="mt-1"
                            required
                            onChange={(e) => {
                              // Combine time with existing date or default to today
                              const time = e.target.value;
                              if (!time) return;
                              
                              try {
                                // Parse existing datetime or create new one
                                const existingDate = formData.end_datetime ? new Date(formData.end_datetime) : new Date();
                                
                                // Set the time part while keeping the date
                                const [hours, minutes] = time.split(':').map(Number);
                                existingDate.setHours(hours, minutes, 0, 0);
                                
                                // Update the state with ISO string
                                setFormData({
                                  ...formData,
                                  end_datetime: existingDate.toISOString(),
                                  end_time: time // Keep legacy field in sync
                                });
                              } catch (error) {
                                console.error('Error setting time:', error);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      <strong>Note:</strong> For events ending after midnight, select the following day as the end date.
                    </p>

                    <div>
                      <Label htmlFor="timezone" className="font-medium">
                        Timezone <span className="text-red-500">*</span>
                      </Label>
                      <Select 
                        value={formData.timezone} 
                        onValueChange={(value) => handleSelectChange('timezone', value)}
                      >
                        <SelectTrigger id="timezone" className="w-full mt-1">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                          <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                          <SelectItem value="Pacific/Honolulu">Hawaii Time (HT)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        Select the timezone for your event's start and end times.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location and Additional Info Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Location and Additional Info</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location" className="font-medium">
                        Location <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. Studio E, 123 Main St, Chicago, IL"
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="font-medium">
                        Price (optional)
                      </Label>
                      <Input 
                        id="price"
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g. $20, $15-25, Free"
                      />
                    </div>

                    <div>
                      <Label className="font-medium">
                        Event Image
                      </Label>
                      <div className="mt-1">
                        <SupabaseImageUploader 
                          bucket="events"
                          folder="images"
                          onUploadComplete={handleImageUpload}
                          acceptedFileTypes="image/jpeg, image/png, image/jpg, image/webp"
                          maxFileSizeMB={5}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Upload an image for your event. For best results, use a square image.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Settings Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Event Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cta_url" className="font-medium">
                        Registration Link (optional)
                      </Label>
                      <Input 
                        id="cta_url"
                        name="cta_url"
                        type="url"
                        value={formData.cta_url}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g. https://your-registration-link.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="gallery_url" className="font-medium">
                        Photo Gallery URL (optional)
                      </Label>
                      <Input 
                        id="gallery_url"
                        name="gallery_url"
                        type="url"
                        value={formData.gallery_url}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g. https://your-gallery-url.com"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_weekly"
                        name="is_weekly"
                        checked={formData.is_weekly}
                        onChange={(e) => setFormData({...formData, is_weekly: e.target.checked})}
                        className="rounded"
                      />
                      <Label htmlFor="is_weekly">Is this a weekly recurring event?</Label>
                    </div>
                  </div>
                </div>

                {/* Organizer Information Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Organizer Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="first_name" className="font-medium">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="last_name" className="font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
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
                      <Label htmlFor="phone_number" className="font-medium">
                        Phone Number (optional)
                      </Label>
                      <Input 
                        id="phone_number"
                        name="phone_number"
                        type="tel"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="business_planning" className="font-medium">
                        Additional Comments (optional)
                      </Label>
                      <Textarea 
                        id="business_planning"
                        name="business_planning"
                        value={formData.business_planning}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                        placeholder="Any additional comments or information about the event"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">
                  All submitted events will be reviewed by our team and must be approved before being published on the site.
                  Events are not automatically approved. This review process typically takes 1-2 business days.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#F94C8D] hover:bg-[#F94C8D]/90" 
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Event'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 