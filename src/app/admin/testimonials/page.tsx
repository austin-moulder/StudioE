"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Testimonial } from "@/types/testimonial"
import { getAllTestimonialsAdmin } from "@/lib/testimonials/testimonialUtils"
import { supabase } from "@/lib/supabase/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Pencil, Trash2, Plus } from "lucide-react"

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    quote: "",
    style: "",
    image_url: "",
    rating: 5,
    featured: false,
    type: ""
  })

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getAllTestimonialsAdmin()
        setTestimonials(data)
      } catch (error) {
        console.error("Error loading testimonials:", error)
        alert("Failed to load testimonials")
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'rating') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 5
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, featured: e.target.checked }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      quote: testimonial.quote,
      style: testimonial.style || "",
      image_url: testimonial.image_url || "",
      rating: testimonial.rating || 5,
      featured: testimonial.featured,
      type: testimonial.type || ""
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTestimonials(prev => prev.filter(item => item.id !== id))
      alert("Testimonial deleted successfully")
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      alert("Failed to delete testimonial")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingTestimonial) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: formData.name,
            quote: formData.quote,
            style: formData.style || null,
            image_url: formData.image_url || null,
            rating: formData.rating,
            featured: formData.featured,
            type: formData.type || null
          })
          .eq('id', editingTestimonial.id)

        if (error) throw error

        setTestimonials(prev => 
          prev.map(item => 
            item.id === editingTestimonial.id 
              ? { ...item, ...formData } 
              : item
          )
        )
        
        alert("Testimonial updated successfully")
      } else {
        // Create new testimonial
        const { data, error } = await supabase
          .from('testimonials')
          .insert({
            name: formData.name,
            quote: formData.quote,
            style: formData.style || null,
            image_url: formData.image_url || null,
            rating: formData.rating,
            featured: formData.featured,
            type: formData.type || null
          })
          .select()

        if (error) throw error

        setTestimonials(prev => [...prev, data[0]])
        
        alert("Testimonial created successfully")
      }

      // Reset form and close edit mode
      setFormData({
        name: "",
        quote: "",
        style: "",
        image_url: "",
        rating: 5,
        featured: false,
        type: ""
      })
      setEditingTestimonial(null)
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving testimonial:", error)
      alert("Failed to save testimonial")
    }
  }

  const handleNew = () => {
    setEditingTestimonial(null)
    setFormData({
      name: "",
      quote: "",
      style: "",
      image_url: "",
      rating: 5,
      featured: false,
      type: ""
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingTestimonial(null)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Testimonials Management</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
        </h1>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quote" className="block font-medium">Quote</label>
                <textarea
                  id="quote"
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="style" className="block font-medium">Style</label>
                  <Input
                    id="style"
                    name="style"
                    value={formData.style}
                    onChange={handleInputChange}
                    placeholder="e.g., Bachata, Salsa"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="type" className="block font-medium">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">General Testimonial</option>
                    <option value="dance">Dance Testimonial</option>
                    <option value="business">Business Testimonial</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image_url" className="block font-medium">Image URL</label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <span className="block font-medium">Rating</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1"
                      onClick={() => handleRatingChange(star)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleFeaturedChange}
                  className="rounded"
                />
                <label htmlFor="featured" className="font-medium">Featured testimonial</label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTestimonial ? "Save Changes" : "Create Testimonial"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testimonials Management</h1>
        <Button onClick={handleNew}>
          <Plus className="mr-2 h-4 w-4" /> New Testimonial
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <caption className="text-sm text-gray-500 mb-2">A list of all testimonials</caption>
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Quote</th>
                  <th className="text-left p-2">Style</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Featured</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="border-b">
                    <td className="p-2 font-medium">{testimonial.name}</td>
                    <td className="p-2 max-w-xs truncate">{testimonial.quote}</td>
                    <td className="p-2">{testimonial.style || "-"}</td>
                    <td className="p-2">
                      {testimonial.type === 'business' ? "Business" : 
                       testimonial.type === 'dance' ? "Dance" : "General"}
                    </td>
                    <td className="p-2">{testimonial.featured ? "Yes" : "No"}</td>
                    <td className="p-2 text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 