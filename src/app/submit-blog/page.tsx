"use client"

import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/supabase'
import SupabaseImageUploader from '@/components/SupabaseImageUploader'
import { AuthorSelect } from '@/components/AuthorSelect'
import { BlogAuthor } from '@/lib/blog/blogUtils'

interface Category {
  id: number;
  name: string;
  icon?: string;
  post_count?: number;
}

export default function SubmitBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedAuthor, setSelectedAuthor] = useState<BlogAuthor | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    category: '',
    published: false,
    author_id: '',
  })

  // Load categories when the component mounts
  useEffect(() => {
    async function loadCategories() {
      try {
        const { data, error } = await supabase
          .from('blog_categories')
          .select('*')
          .order('name')
        
        if (error) throw error
        if (data) setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    
    loadCategories()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // If changing the title, also generate a slug
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        slug: slug
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAuthorChange = (authorId: string, authorData?: BlogAuthor) => {
    setFormData(prev => ({ ...prev, author_id: authorId }))
    setSelectedAuthor(authorData || null)
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, featured_image: url }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Form validation checks
      if (!formData.title || !formData.content || !formData.category || !formData.author_id) {
        throw new Error('Please fill out all required fields')
      }

      // Submit to Supabase blog_posts table
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt,
          featured_image: formData.featured_image,
          category: formData.category,
          published: false,
          author_id: formData.author_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error submitting blog post:', error)
        throw error
      }
      
      toast.success('Blog post submitted successfully! It will be published after admin approval.')
      
      // Reset form after successful submission
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featured_image: '',
        category: '',
        published: false,
        author_id: '',
      })
      setSelectedAuthor(null)
      
      // Redirect to blog page after 2 seconds
      setTimeout(() => {
        router.push('/blog')
      }, 2000)
      
    } catch (error: any) {
      console.error('Error submitting form:', error)
      toast.error(error?.message || 'Failed to submit blog post. Please try again.')
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Submit a Blog Post</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Share your dance knowledge and stories with the Studio E community
          </p>
        </div>
      </section>

      <div className="container py-12 max-w-3xl mx-auto">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold">Blog Submission Form</h2>
            <p className="text-gray-500">Fill out the form below to submit your blog post</p>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Blog Post Details Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Post Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="font-medium">
                        Post Title <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="e.g. 5 Essential Tips for Beginning Dancers"
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug" className="font-medium">
                        URL Slug <span className="text-gray-400 text-sm ml-1">(auto-generated, can be edited)</span>
                      </Label>
                      <Input 
                        id="slug"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g. 5-essential-tips-for-beginning-dancers"
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt" className="font-medium">
                        Excerpt <span className="text-gray-400 text-sm ml-1">(short summary shown in previews)</span>
                      </Label>
                      <Textarea 
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Write a brief summary of your post (150-200 characters)"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content" className="font-medium">
                        Post Content <span className="text-red-500">*</span>
                      </Label>
                      <Textarea 
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                        placeholder="Write your blog post content here..."
                        rows={12}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="font-medium">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                        required
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white shadow-md">
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="featured_image" className="font-medium">
                        Featured Image <span className="text-gray-400 text-sm ml-1">(recommended size: 1200x800px)</span>
                      </Label>
                      <SupabaseImageUploader
                        bucket="blog_images"
                        folder="featured"
                        onUploadComplete={(url) => handleImageUpload(url)}
                        acceptedFileTypes="image/jpeg, image/png, image/webp"
                        maxFileSizeMB={2}
                      />
                      {formData.featured_image && (
                        <div className="mt-2">
                          <img 
                            src={formData.featured_image} 
                            alt="Featured image preview" 
                            className="max-h-40 rounded-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Author Information Section */}
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium mb-4">Author Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="author" className="font-medium">
                        Author <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-1">
                        <AuthorSelect
                          value={formData.author_id}
                          onChange={handleAuthorChange}
                        />
                      </div>
                      {selectedAuthor && selectedAuthor.profile_image && (
                        <div className="mt-4 flex items-center gap-3">
                          <img 
                            src={selectedAuthor.profile_image} 
                            alt={selectedAuthor.name}
                            className="h-16 w-16 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{selectedAuthor.name}</p>
                            {selectedAuthor.bio && (
                              <p className="text-sm text-gray-500 line-clamp-2">{selectedAuthor.bio}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/blog')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#F94C8D] hover:bg-[#F94C8D]/90 text-white"
                  >
                    {loading ? 'Submitting...' : 'Submit Blog Post'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 