"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Form schema
const formSchema = z.object({
  instructor_id: z.string().uuid({
    message: "Please select a valid instructor",
  }),
  teaching_philosophy: z.string().min(10, {
    message: "Teaching philosophy must be at least 10 characters.",
  }),
  teaching_style_conversational: z.number().min(0).max(100),
  teaching_style_energy: z.number().min(0).max(100),
  teaching_style_breadth: z.number().min(0).max(100),
  teaching_style_flexibility: z.number().min(0).max(100),
  teaching_style_creativity: z.number().min(0).max(100),
  approach_for_new_students: z.string().min(10, {
    message: "Please provide more detail about your approach for new students.",
  }),
  favorite_song_or_artist: z.string().min(1, {
    message: "Please enter a favorite song or artist.",
  }),
  favorite_tip: z.string().min(10, {
    message: "Please provide a more detailed dance tip.",
  }),
  demo_url: z.union([
    z.string().url({ message: "Please enter a valid URL." }),
    z.string().length(0),
    z.undefined()
  ]),
  monday_schedule: z.string().optional(),
  tuesday_schedule: z.string().optional(),
  wednesday_schedule: z.string().optional(),
  thursday_schedule: z.string().optional(),
  friday_schedule: z.string().optional(),
  saturday_schedule: z.string().optional(),
  sunday_schedule: z.string().optional(),
  phone: z.string().optional(),
  experience: z.number().min(0, {
    message: "Experience must be a positive number.",
  }).optional(),
  total_students: z.number().min(0, {
    message: "Total students must be a positive number.",
  }).optional(),
  price_lower: z.number().min(0, {
    message: "Intro session rate must be a positive number.",
  }).optional(),
  price_upper: z.number().min(0, {
    message: "Recurring private rate must be a positive number."
  }).optional(),
})

type FormValues = z.infer<typeof formSchema>

// Define instructor type with image_url property
interface Instructor {
  id: string;
  name: string;
  image_url: string;
}

export default function InstructorProfileForm() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInstructorImage, setSelectedInstructorImage] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const instructorIdFromUrl = searchParams.get('instructor')
  
  // Default values
  const defaultValues: Partial<FormValues> = {
    teaching_style_conversational: 50,
    teaching_style_energy: 50,
    teaching_style_breadth: 50,
    teaching_style_flexibility: 50,
    teaching_style_creativity: 50,
    experience: 1,
    total_students: 0,
    price_lower: 60,
    price_upper: 50,
  }
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })
  
  // Fetch instructors when component mounts
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const { data, error } = await supabase
          .from('instructors')
          .select('id, name, image_url')
          
        if (error) throw error
        
        if (data) {
          setInstructors(data.map(instructor => ({
            id: instructor.id,
            name: instructor.name,
            image_url: instructor.image_url
          })))
          
          // If instructorId is provided in URL and exists in the fetched data, select it
          if (instructorIdFromUrl) {
            const instructorExists = data.some(inst => inst.id === instructorIdFromUrl)
            if (instructorExists) {
              form.setValue('instructor_id', instructorIdFromUrl)
              
              // Also fetch the instructor's data to populate the form
              fetchInstructorData(instructorIdFromUrl)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching instructors:', error)
        toast({
          title: "Error",
          description: "Failed to load instructors. Please try again later.",
          variant: "destructive",
        })
      }
    }
    
    fetchInstructors()
  }, [toast, form, instructorIdFromUrl])
  
  // Helper function to fetch instructor data when selected from URL
  const fetchInstructorData = async (instructorId: string) => {
    try {
      // First fetch instructor data to get pricing
      const { data: instructorData, error: instructorError } = await supabase
        .from('instructors')
        .select('price_lower, price_upper')
        .eq('id', instructorId)
        .single()
      
      if (!instructorError && instructorData) {
        // Set pricing fields
        if (instructorData.price_lower !== null) {
          form.setValue('price_lower', instructorData.price_lower);
        } else {
          form.setValue('price_lower', defaultValues.price_lower || 60);
        }
        
        if (instructorData.price_upper !== null) {
          form.setValue('price_upper', instructorData.price_upper);
        } else {
          form.setValue('price_upper', defaultValues.price_upper || 50);
        }
      }
      
      // Then fetch profile data
      const { data, error } = await supabase
        .from('instructor_profiles')
        .select('*')
        .eq('instructor_id', instructorId)
        .single()
      
      if (!error && data) {
        // Populate form with existing data
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && 
              key !== 'price_lower' && key !== 'price_upper') {
            // Handle numeric values correctly, including 0
            if (typeof value === 'number' || value === 0) {
              form.setValue(key as any, value);
            } else if (value !== null) {
              form.setValue(key as any, value as any);
            }
          }
        })
      } else {
        // Reset form to defaults for new profile
        form.reset({
          ...defaultValues,
          instructor_id: instructorId,
          // Preserve pricing from the instructor data
          price_lower: form.getValues('price_lower'),
          price_upper: form.getValues('price_upper')
        })
      }
    } catch (error) {
      console.error('Error fetching instructor data:', error)
    }
  }
  
  // Update selected instructor image when instructor changes
  const watchInstructorId = form.watch('instructor_id')
  
  useEffect(() => {
    if (watchInstructorId) {
      const selectedInstructor = instructors.find(inst => inst.id === watchInstructorId)
      if (selectedInstructor) {
        setSelectedInstructorImage(selectedInstructor.image_url)
      }
    }
  }, [watchInstructorId, instructors])
  
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    
    try {
      // Validate that the instructor exists
      const selectedInstructor = instructors.find(inst => inst.id === data.instructor_id);
      if (!selectedInstructor) {
        toast({
          title: "Error",
          description: "Please select a valid instructor from the list.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // If demo_url is empty, ensure it's undefined to avoid URL validation issues
      if (data.demo_url === '') {
        data.demo_url = undefined;
      }
      
      // Extract pricing data for the instructors table
      const pricingData = {
        price_lower: data.price_lower,
        price_upper: data.price_upper
      }
      
      // Remove pricing data from the profile data
      const profileData = {...data}
      delete profileData.price_lower
      delete profileData.price_upper
      
      // Handle image upload if there's a new image
      if (image) {
        try {
          const instructorId = data.instructor_id;
          const fileExt = image.name.split('.').pop();
          const fileName = `${instructorId}.${fileExt}`;
          const filePath = `${fileName}`;
          
          console.log("Attempting to upload image to instructors bucket:", filePath);
          
          // Upload image to the instructors bucket
          const { error: uploadError, data: uploadData } = await supabase
            .storage
            .from('instructors')
            .upload(filePath, image, {
              upsert: true,
              contentType: image.type,
              cacheControl: '3600'
            });
          
          if (uploadError) {
            console.error('Upload error details:', uploadError);
            
            // Check if error is related to permissions
            if (uploadError.message.includes('permission') || uploadError.message.includes('auth')) {
              throw new Error(`Permission denied: ${uploadError.message}. Please check storage RLS policies.`);
            } else {
              throw new Error(`Failed to upload image: ${uploadError.message}`);
            }
          }
          
          console.log("Image uploaded successfully, getting public URL");
          
          // Get the public URL for the uploaded image
          const { data: publicUrlData } = supabase
            .storage
            .from('instructors')
            .getPublicUrl(filePath);
          
          if (!publicUrlData || !publicUrlData.publicUrl) {
            throw new Error('Failed to get public URL for the uploaded image');
          }
          
          console.log("Public URL retrieved:", publicUrlData.publicUrl);
          
          // Update the instructor's image_url in the instructors table
          const { error: updateError } = await supabase
            .from('instructors')
            .update({ 
              image_url: publicUrlData.publicUrl,
              ...pricingData
            })
            .eq('id', instructorId);
          
          if (updateError) {
            throw new Error(`Failed to update instructor record: ${updateError.message}`);
          }
          
          console.log("Instructor record updated with new image URL");
          
        } catch (imageError: any) {
          console.error('Image upload error:', imageError);
          toast({
            title: "Image Upload Error",
            description: imageError.message || "Failed to upload image. Please try again.",
            variant: "destructive",
          });
          
          // Continue with form submission without the image
          console.log('Continuing with form submission without the image update');
          
          // Update just pricing fields in the instructors table
          const { error: priceUpdateError } = await supabase
            .from('instructors')
            .update(pricingData)
            .eq('id', data.instructor_id);
          
          if (priceUpdateError) throw priceUpdateError;
        }
      } else {
        // Update just pricing fields in the instructors table
        const { error: priceUpdateError } = await supabase
          .from('instructors')
          .update(pricingData)
          .eq('id', data.instructor_id);
        
        if (priceUpdateError) throw priceUpdateError;
      }
      
      // Check if profile already exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('instructor_profiles')
        .select('id')
        .eq('instructor_id', profileData.instructor_id)
        .single()
      
      let result
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('instructor_profiles')
          .update(profileData)
          .eq('instructor_id', profileData.instructor_id)
      } else {
        // Insert new profile
        result = await supabase
          .from('instructor_profiles')
          .insert([profileData])
      }
      
      if (result.error) throw result.error
      
      toast({
        title: "Success!",
        description: "Instructor profile saved successfully.",
      })
      
      // Redirect to instructors page after successful submission
      setTimeout(() => {
        router.push('/instructors')
      }, 2000)
    } catch (error: any) {
      console.error('Error saving instructor profile:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to save instructor profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Toaster />
      
      <Link 
        href="/instructors" 
        className="inline-flex items-center text-gray-600 hover:text-pink-600 mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Instructors
      </Link>
      
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create Instructor Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Instructor Selection */}
              <FormField
                control={form.control}
                name="instructor_id"
                render={({ field }) => {
                  const [searchTerm, setSearchTerm] = useState('');
                  
                  // Sort instructors alphabetically and filter based on search term
                  const filteredInstructors = React.useMemo(() => {
                    return instructors
                      .slice() // Create a copy to avoid modifying the original array
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .filter(instructor => 
                        instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
                      );
                  }, [instructors, searchTerm]);
                  
                  return (
                    <FormItem className="space-y-3">
                      <FormLabel>Search Instructors</FormLabel>
                      <div className="space-y-3">
                        <FormControl>
                          <Input
                            type="text" 
                            placeholder="Type name to filter..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </FormControl>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium">
                            Available instructors 
                            {filteredInstructors.length !== instructors.length && 
                              ` (${filteredInstructors.length} of ${instructors.length})`
                            }:
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {filteredInstructors.map(instructor => {
                              const isSelected = field.value === instructor.id;
                              return (
                                <button
                                  key={instructor.id}
                                  type="button"
                                  className={`px-3 py-1 text-sm rounded-md ${
                                    isSelected 
                                      ? 'bg-purple-600 text-white' 
                                      : 'bg-gray-100 hover:bg-gray-200'
                                  }`}
                                  onClick={() => {
                                    field.onChange(instructor.id);
                                    fetchInstructorData(instructor.id);
                                  }}
                                >
                                  {instructor.name}
                                </button>
                              );
                            })}
                          </div>
                          
                          {filteredInstructors.length === 0 && (
                            <p className="text-sm text-amber-600">
                              No instructors match your search. Try a different name.
                            </p>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-500">
                          If your name doesn't appear in the list above, your application is still under review. 
                          Please contact us if you believe this is an error.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              
              {/* Show selected instructor image or preview of new image */}
              {(selectedInstructorImage || imagePreview) && (
                <div className="flex justify-center mb-8">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden">
                    <Image 
                      src={imagePreview || selectedInstructorImage || ''} 
                      alt="Instructor" 
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium"
                  />
                  {image && (
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a square image for best results. This will be used on your instructor profile.
                </p>
              </div>
              
              {/* Price fields */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Intro Session Rate */}
                <FormField
                  control={form.control}
                  name="price_lower"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intro Session Rate ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          placeholder="60"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Price for an introductory private lesson
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Recurring Private Rate */}
                <FormField
                  control={form.control}
                  name="price_upper"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recurring Private Rate ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          placeholder="50"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormDescription>
                        Price for recurring private lessons
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Teaching Philosophy */}
              <FormField
                control={form.control}
                name="teaching_philosophy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teaching Philosophy</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your teaching philosophy and approach..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      What principles guide your teaching style?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Teaching Style Sliders */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Teaching Style</h3>
                
                {/* Conversational vs Direct */}
                <FormField
                  control={form.control}
                  name="teaching_style_conversational"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between mb-2">
                        <FormLabel>Conversational</FormLabel>
                        <span>Direct</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          max={100}
                          step={1}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Calm vs High-energy */}
                <FormField
                  control={form.control}
                  name="teaching_style_energy"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between mb-2">
                        <FormLabel>Calm</FormLabel>
                        <span>High-energy</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          max={100}
                          step={1}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Breadth vs Depth */}
                <FormField
                  control={form.control}
                  name="teaching_style_breadth"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between mb-2">
                        <FormLabel>Breadth</FormLabel>
                        <span>Depth</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          max={100}
                          step={1}
                          isPurple={true}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Flexible vs Regimented */}
                <FormField
                  control={form.control}
                  name="teaching_style_flexibility"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between mb-2">
                        <FormLabel>Flexible</FormLabel>
                        <span>Regimented</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          max={100}
                          step={1}
                          isPurple={true}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Creativity vs Precision */}
                <FormField
                  control={form.control}
                  name="teaching_style_creativity"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between mb-2">
                        <FormLabel>Creativity</FormLabel>
                        <span>Precision</span>
                      </div>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          max={100}
                          step={1}
                          onValueChange={(values) => {
                            field.onChange(values[0])
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {/* Approach for New Students */}
              <FormField
                control={form.control}
                name="approach_for_new_students"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How do you approach new students?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="When I assess a new student for the first time..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Describe how you work with students in their first lessons
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Favorite Song or Artist */}
              <FormField
                control={form.control}
                name="favorite_song_or_artist"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is a song or artist every dancer should know?</FormLabel>
                    <FormControl>
                      <Input placeholder="Artist or song title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Favorite Tip */}
              <FormField
                control={form.control}
                name="favorite_tip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your favorite dancing tip?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your best dancing advice..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Demo URL */}
              <FormField
                control={form.control}
                name="demo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo Video URL <span className="text-sm text-gray-500">(optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/..." {...field} />
                    </FormControl>
                    <FormDescription>
                      A link to a YouTube or Vimeo video showcasing your dancing or teaching
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Weekly Schedule */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Weekly Schedule</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Monday */}
                  <FormField
                    control={form.control}
                    name="monday_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monday</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9AM-1PM, 5PM-8PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Tuesday */}
                  <FormField
                    control={form.control}
                    name="tuesday_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tuesday</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9AM-1PM, 5PM-8PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Wednesday */}
                  <FormField
                    control={form.control}
                    name="wednesday_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Wednesday</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9AM-1PM, 5PM-8PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Thursday */}
                  <FormField
                    control={form.control}
                    name="thursday_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thursday</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9AM-1PM, 5PM-8PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Friday */}
                  <FormField
                    control={form.control}
                    name="friday_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Friday</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9AM-1PM, 5PM-8PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Saturday */}
                  <FormField
                    control={form.control}
                    name="saturday_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Saturday</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9AM-1PM, 5PM-8PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Sunday */}
                  <FormField
                    control={form.control}
                    name="sunday_schedule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sunday</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9AM-1PM, 5PM-8PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Additional Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Experience */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Total Students */}
                <FormField
                  control={form.control}
                  name="total_students"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Students Taught</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 