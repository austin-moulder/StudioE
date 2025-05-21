"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/supabase'
import Image from 'next/image'

// Common amenities for dance spaces
const COMMON_AMENITIES = [
  'Mirrors',
  'Sound System',
  'Sprung Floor',
  'Marley Floor',
  'Air Conditioning',
  'Changing Room',
  'Waiting Area',
  'Wifi',
  'Parking',
  'Water Fountain',
  'Restrooms'
]

export default function SubmitDanceSpacePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [primaryPhotoIndex, setPrimaryPhotoIndex] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    price_per_hour: '',
    capacity: '',
    available_hours: '',
    selectedAmenities: [] as string[],
    customAmenity: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedAmenities: checked
        ? [...prev.selectedAmenities, amenity]
        : prev.selectedAmenities.filter(a => a !== amenity)
    }))
  }

  const handleAddCustomAmenity = () => {
    if (formData.customAmenity.trim() && !formData.selectedAmenities.includes(formData.customAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        selectedAmenities: [...prev.selectedAmenities, formData.customAmenity.trim()],
        customAmenity: ''
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    const newFiles = Array.from(e.target.files)
    setSelectedFiles(prev => [...prev, ...newFiles])
    
    // Generate previews for new files
    const newPreviews = newFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews])
  }

  const handleRemoveImage = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index])
    setPreviews(prev => prev.filter((_, i) => i !== index))
    
    // Update primary photo index if needed
    if (primaryPhotoIndex === index) {
      setPrimaryPhotoIndex(0)
    } else if (primaryPhotoIndex > index) {
      setPrimaryPhotoIndex(prev => prev - 1)
    }
  }

  const handleSetPrimary = (index: number) => {
    setPrimaryPhotoIndex(index)
  }

  const uploadImageToSupabase = async (file: File, index: number): Promise<string> => {
    // Create a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `rental_spaces/${fileName}`
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('rental_spaces')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      })
    
    if (error) {
      console.error('Error uploading file:', error)
      throw error
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('rental_spaces')
      .getPublicUrl(filePath)
    
    // Update progress
    setUploadProgress(Math.round(((index + 1) / selectedFiles.length) * 100))
    
    return urlData.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.description || !formData.address || 
        !formData.price_per_hour || !formData.capacity || !formData.available_hours || 
        selectedFiles.length === 0) {
      toast.error('Please fill in all required fields and add at least one photo')
      return
    }
    
    setLoading(true)
    setUploadProgress(0)
    
    try {
      // 1. Insert the rental space data
      const { data: spaceData, error: spaceError } = await supabase
        .from('rental_spaces')
        .insert([
          {
            name: formData.name,
            description: formData.description,
            address: formData.address,
            price_per_hour: parseInt(formData.price_per_hour),
            capacity: parseInt(formData.capacity),
            available_hours: formData.available_hours,
            rating: 5.0, // Default rating for new listings
            is_featured: false,
            is_active: null // Set to NULL by default, requiring admin approval
          }
        ])
        .select()
      
      if (spaceError) {
        throw spaceError
      }
      
      const spaceId = spaceData[0].id
      
      // 2. Upload photos and save their URLs
      const photoPromises = selectedFiles.map(async (file, index) => {
        const photoUrl = await uploadImageToSupabase(file, index)
        
        // Insert photo data
        return supabase
          .from('rental_space_photos')
          .insert([{
            rental_space_id: spaceId,
            photo_url: photoUrl,
            is_primary: index === primaryPhotoIndex
          }])
      })
      
      await Promise.all(photoPromises)
      
      // 3. Insert amenities
      const amenityPromises = formData.selectedAmenities.map(amenity => {
        return supabase
          .from('rental_space_amenities')
          .insert([{
            rental_space_id: spaceId,
            amenity: amenity
          }])
      })
      
      await Promise.all(amenityPromises)
      
      toast.success('Your space has been submitted successfully!')
      
      // Redirect to the dance space page
      setTimeout(() => {
        router.push('/find-dance-space')
      }, 2000)
      
    } catch (error: any) {
      console.error('Error submitting rental space:', error)
      toast.error('Failed to submit rental space: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">List Your Dance Space</h1>
        <p className="text-gray-600 mb-8">Share your studio with dance instructors looking for space to teach</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              
              <div>
                <Label htmlFor="name" className="font-medium">Space Name*</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., Studio One Chicago"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="font-medium">Description*</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1"
                  rows={5}
                  placeholder="Describe your space, its features, and what makes it great for dance instruction"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="address" className="font-medium">Address*</Label>
                <Input 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Full address including city, state, and zip code"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Capacity & Pricing */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Capacity & Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="price_per_hour" className="font-medium">Price Per Hour ($)*</Label>
                  <Input 
                    id="price_per_hour"
                    name="price_per_hour"
                    type="text"
                    inputMode="numeric"
                    value={formData.price_per_hour}
                    onChange={handleNumberInputChange}
                    className="mt-1"
                    placeholder="e.g., 35"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="capacity" className="font-medium">Maximum Capacity*</Label>
                  <Input 
                    id="capacity"
                    name="capacity"
                    type="text"
                    inputMode="numeric"
                    value={formData.capacity}
                    onChange={handleNumberInputChange}
                    className="mt-1"
                    placeholder="e.g., 20"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="available_hours" className="font-medium">Available Hours*</Label>
                <Input 
                  id="available_hours"
                  name="available_hours"
                  value={formData.available_hours}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="e.g., Mon-Fri: 8am-10pm, Sat-Sun: 9am-8pm"
                  required
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Amenities */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <p className="text-sm text-gray-600">Select all amenities that apply to your space</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {COMMON_AMENITIES.map(amenity => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity}`}
                      checked={formData.selectedAmenities.includes(amenity)}
                      onCheckedChange={(checked) => 
                        handleAmenityChange(amenity, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Input
                  placeholder="Add other amenity"
                  value={formData.customAmenity}
                  onChange={(e) => setFormData(prev => ({ ...prev, customAmenity: e.target.value }))}
                  className="flex-grow"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddCustomAmenity}
                  disabled={!formData.customAmenity.trim()}
                >
                  Add
                </Button>
              </div>
              
              {formData.selectedAmenities.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedAmenities.map(amenity => (
                      <div key={amenity} className="bg-gray-100 text-gray-800 text-xs rounded-full px-3 py-1 flex items-center">
                        {amenity}
                        <button 
                          type="button"
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => handleAmenityChange(amenity, false)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Photos */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Photos</h2>
              <p className="text-sm text-gray-600">Upload photos of your space (minimum 1, maximum 10). The first photo will be your primary image.</p>
              
              <div 
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="text-gray-500">
                  <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1">Click to upload or drag and drop</p>
                  <p className="text-xs">PNG, JPG, WEBP up to 5MB</p>
                </div>
              </div>
              
              {previews.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium mb-2">
                    Uploaded Photos ({previews.length})
                    {primaryPhotoIndex >= 0 && previews[primaryPhotoIndex] && 
                      " - Primary photo marked with a star"}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square rounded overflow-hidden">
                          <Image 
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        {/* Primary badge */}
                        {index === primaryPhotoIndex && (
                          <div className="absolute top-2 left-2 bg-yellow-400 text-white rounded-full p-1 shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Controls overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {index !== primaryPhotoIndex && (
                            <button 
                              type="button"
                              className="bg-yellow-400 text-white p-1 rounded hover:bg-yellow-500"
                              onClick={() => handleSetPrimary(index)}
                              title="Set as primary photo"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          )}
                          <button 
                            type="button"
                            className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                            onClick={() => handleRemoveImage(index)}
                            title="Remove photo"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#F94C8D] hover:bg-[#F94C8D]/90 text-white"
              disabled={loading}
              size="lg"
            >
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Submitting...'}
                </>
              ) : (
                'Submit Dance Space'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 