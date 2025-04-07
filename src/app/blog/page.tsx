"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBlogPosts, getBlogCategories, searchBlogPosts, getBlogPostsByCategory } from "@/lib/blog/blogUtils"
import { BlogPost, BlogCategory } from "@/types/blog"
import { format } from 'date-fns'
import { useRouter } from "next/navigation"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const fetchedPosts = await getBlogPosts()
        setPosts(fetchedPosts)

        // Set the first post as featured for demo purposes
        if (fetchedPosts.length > 0) {
          setFeaturedPost(fetchedPosts[0])
        }

        const fetchedCategories = await getBlogCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error loading blog data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    try {
      let filteredPosts: BlogPost[] = []
      
      if (searchTerm && selectedCategory !== "all") {
        // Search with both term and category
        const searched = await searchBlogPosts(searchTerm)
        filteredPosts = searched.filter(post => post.category === selectedCategory)
      } else if (searchTerm) {
        // Search by term only
        filteredPosts = await searchBlogPosts(searchTerm)
      } else if (selectedCategory !== "all") {
        // Filter by category only
        filteredPosts = await getBlogPostsByCategory(selectedCategory)
      } else {
        // No filters, get all posts
        filteredPosts = await getBlogPosts()
      }
      
      setPosts(filteredPosts)
    } catch (error) {
      console.error("Error searching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fallback data for when no posts are available
  const placeholderPosts = Array.from({ length: 6 }).map((_, index) => ({
    id: index,
    title: [
      "10 Tips for Beginner Ballet Dancers",
      "The History and Evolution of Hip Hop Dance",
      "Preparing for Your First Dance Competition",
      "How to Choose the Right Dance Shoes",
      "Instructor Spotlight: Maria Chen's Journey",
      "The Mental Health Benefits of Regular Dancing",
    ][index],
    slug: `post-${index}`,
    excerpt: [
      "Starting ballet as an adult can be intimidating. Here are some tips to help you get started on the right foot.",
      "Explore the rich cultural history of hip hop dance, from its origins in the Bronx to its global influence today.",
      "Competition day can be nerve-wracking. Here's how to prepare mentally and physically for your first dance competition.",
      "Different dance styles require different footwear. Learn how to select the perfect shoes for your dance practice.",
      "From taking her first dance class at age 5 to becoming one of our most sought-after instructors, Maria's story inspires.",
      "Beyond physical fitness, dancing offers significant mental health benefits including stress reduction and improved cognitive function.",
    ][index],
    content: "",
    featured_image: "",
    category: [
      "Tips & Techniques",
      "Dance History",
      "Competition",
      "Equipment",
      "Instructor Spotlight",
      "Health & Wellness",
    ][index],
    published: true,
    created_at: new Date(2025, 5, 15 - index * 5).toISOString(),
    author_name: "Dance Instructor",
    author_image: ""
  }))

  const placeholderCategories = [
    { id: 1, name: "Tips & Techniques", post_count: 24, icon: "💡" },
    { id: 2, name: "Dance History", post_count: 18, icon: "📚" },
    { id: 3, name: "Instructor Spotlights", post_count: 15, icon: "🌟" },
    { id: 4, name: "Health & Wellness", post_count: 12, icon: "🧘" },
    { id: 5, name: "Event Recaps", post_count: 20, icon: "🎭" },
    { id: 6, name: "Student Stories", post_count: 16, icon: "👥" },
  ]

  // Use actual data if available, or placeholder data if not
  const displayPosts = posts.length > 0 ? posts : placeholderPosts
  const displayCategories = categories.length > 0 ? categories : placeholderCategories
  const displayFeaturedPost = featuredPost || placeholderPosts[0]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[300px] w-full bg-gray-300">
          {/* Placeholder for hero image */}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Studio E Blog</h1>
          <p className="mt-6 max-w-2xl text-lg">Tips, stories, and insights from the world of dance</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search Articles
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input 
                  id="search" 
                  placeholder="Search by keyword or topic" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {displayCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSearch} disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
              {displayFeaturedPost.featured_image ? (
                <Image
                  src={displayFeaturedPost.featured_image}
                  alt={displayFeaturedPost.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-gray-400 text-lg">Featured Article Image</span>
              )}
            </div>
            <div>
              <Badge className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90">Featured</Badge>
              <h3 className="mt-2 text-3xl font-bold">
                {displayFeaturedPost.title}
              </h3>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                {displayFeaturedPost.created_at ? 
                  format(new Date(displayFeaturedPost.created_at), 'MMMM d, yyyy') : 
                  'No date'}
              </div>
              <p className="mt-4 text-gray-500">
                {displayFeaturedPost.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                    {displayFeaturedPost.author_image ? (
                      <Image
                        src={displayFeaturedPost.author_image}
                        alt={displayFeaturedPost.author_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">
                        {displayFeaturedPost.author_name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium">{displayFeaturedPost.author_name}</span>
                </div>
                <Link href={`/blog/${displayFeaturedPost.slug}`}>
                  <Button>
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>

          {loading ? (
            <div className="text-center py-8">Loading posts...</div>
          ) : displayPosts.length === 0 ? (
            <div className="text-center py-8">No posts found. Try a different search.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative bg-gray-200 flex items-center justify-center">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-lg">{post.title}</span>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-xs text-gray-500">
                        {post.created_at ? 
                          format(new Date(post.created_at), 'MMMM d, yyyy') : 
                          'No date'}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                    <p className="mt-2 text-gray-500 line-clamp-3">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="link" className="mt-4 p-0 h-auto">
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {displayCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category.name);
                  handleSearch();
                }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient/10 text-2xl">
                  {category.icon || '📝'}
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.post_count} articles</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscribe to Our Newsletter</h2>
            <p className="mt-4 text-lg text-gray-500">
              Stay updated with the latest articles, tips, and dance events.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Input placeholder="Enter your email" className="h-12" />
              <Button size="lg" className="h-12">
                Subscribe
              </Button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from Studio E.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 