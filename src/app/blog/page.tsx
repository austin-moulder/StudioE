"use client"

import { useEffect, useState, useRef, FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Search, User, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBlogPosts, getBlogCategories, searchBlogPosts, getBlogPostsByCategory } from "@/lib/blog/blogUtils"
import { BlogPost, BlogCategory } from "@/types/blog"
import { format } from 'date-fns'
import { useRouter, useSearchParams } from "next/navigation"
import { addSubscriber, SubscribeState } from "@/lib/actions/subscribeActions"
import { Suspense } from "react"

// Wrap the core content in a component to use Suspense
function BlogContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL search params
  const initialSearchTerm = searchParams.get('q') || "";
  const initialCategory = searchParams.get('category') || null;

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [isLoading, setIsLoading] = useState(true)

  // State for the subscription form
  const initialState: SubscribeState = { message: null, errors: {}, success: false };
  const [formState, setFormState] = useState<SubscribeState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories only once on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await getBlogCategories()
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error loading blog categories:", error)
      }
    }
    loadCategories()
  }, [])

  // Fetch posts based on searchTerm and selectedCategory (driven by URL)
  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true)
      try {
        let fetchedPosts: BlogPost[];
        if (searchTerm && selectedCategory) {
          // Search within a category (less common, might need specific API or client-side filter)
          // For now, let's prioritize search term if both are present
          fetchedPosts = await searchBlogPosts(searchTerm);
          // Optionally filter further by category client-side if needed
          fetchedPosts = fetchedPosts.filter(p => p.category === selectedCategory);
        } else if (searchTerm) {
          fetchedPosts = await searchBlogPosts(searchTerm);
        } else if (selectedCategory) {
          fetchedPosts = await getBlogPostsByCategory(selectedCategory);
        } else {
          fetchedPosts = await getBlogPosts();
        }
        setPosts(fetchedPosts)
      } catch (error) {
        console.error("Error loading blog posts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts()
  // Depend on the state variables which reflect the URL params
  }, [searchTerm, selectedCategory])

  // Effect to clear subscription form message
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      const timer = setTimeout(() => setFormState(initialState), 5000);
      return () => clearTimeout(timer);
    } else if (formState.message && !formState.errors) {
      const timer = setTimeout(() => setFormState(initialState), 5000);
      return () => clearTimeout(timer);
    }
  }, [formState]);

  // Handle subscription form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormState(initialState);
    const formData = new FormData(event.currentTarget);
    const result = await addSubscriber(initialState, formData);
    setFormState(result);
    setIsSubmitting(false);
  };

  // Update URL on search form submission
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('q', searchTerm)
    } else {
      params.delete('q')
    }
    // Keep existing category param if present
    if (selectedCategory) {
      params.set('category', selectedCategory)
    } else {
       params.delete('category')
    }
    router.push(`/blog?${params.toString()}`)
  }

  // Update URL on category change (from Select or Cards)
  const handleCategoryChange = (category: string | null) => {
    // Update state immediately for responsive UI feel
    setSelectedCategory(category);
    
    const params = new URLSearchParams(searchParams)
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    // Keep existing search term param
    if (searchTerm) {
      params.set('q', searchTerm)
    } else {
      params.delete('q')
    }
    router.push(`/blog?${params.toString()}`)
  }

  // Derive featuredPost and otherPosts from the potentially filtered 'posts' state
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  // Calculate post counts (based on the currently displayed posts)
  const categoryCounts: { [key: string]: number } = {};
  posts.forEach(post => {
    if (post.category) { 
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  });

  // Map category names to icons
  const categoryIcons: { [key: string]: string } = {
    "Tips & Techniques": "💡",
    "Dance History": "📚",
    "Instructor Spotlights": "🌟",
    "Health & Wellness": "🧘",
    "Event Recaps": "🎭",
    "Student Stories": "👥",
  };
  const defaultIcon = "📝";

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

      {/* Search and Filter Section - Use form with onSubmit */}
      <section className="py-8 border-b">
        <div className="container">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 md:flex-row md:items-end">
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
                  value={searchTerm} // Controlled input
                  onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              {/* Use handleCategoryChange for Select */}
              <Select 
                value={selectedCategory || 'all'} // Use 'all' if null
                onValueChange={(value) => handleCategoryChange(value === 'all' ? null : value)}
              >
                <SelectTrigger id="category" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {/* Categories state is fetched separately */}
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Post - Rendering logic uses 'posts' which is updated by useEffect */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>

          {isLoading ? (
            // Skeleton/Placeholder for Featured Article while loading
            <div className="animate-pulse grid gap-8 md:grid-cols-2 items-center">
              <div className="aspect-[4/3] rounded-lg bg-gray-200"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-16 bg-gray-200 rounded w-full"></div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ) : featuredPost ? (
            // Render the actual featured post content if it exists
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                {featuredPost.featured_image ? (
                  <Image
                    src={featuredPost.featured_image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    priority // Prioritize loading the featured image
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <span className="text-gray-400 text-lg">Featured Article Image</span>
                )}
              </div>
              <div>
                <Badge className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90">Featured</Badge>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <h3 className="mt-2 text-3xl font-bold hover:text-[#F94C8D] transition-colors">
                    {featuredPost.title}
                  </h3>
                </Link>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  {featuredPost.created_at ? 
                    format(new Date(featuredPost.created_at), 'MMMM d, yyyy') : 
                    'No date'}
                </div>
                <p className="mt-4 text-gray-500">
                  {/* Display excerpt or beginning of content */}
                  {featuredPost.excerpt || featuredPost.content?.substring(0, 150) || 'No description available.'}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                      {featuredPost.author_image ? (
                        <Image
                          src={featuredPost.author_image}
                          // Ensure author_name exists before trying to split
                          alt={featuredPost.author_name || 'Author'}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">
                          {/* Provide fallback if author_name is missing */}
                          {featuredPost.author_name?.split(' ').map(n => n[0]).join('') || 'A'}
                        </span>
                      )}
                    </div>
                    {/* Display author name or fallback */}
                    <span className="text-sm font-medium">{featuredPost.author_name || 'Unknown Author'}</span>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button>
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // Optional: Message when no featured post exists after loading
            <div className="text-center py-8 text-gray-500">No featured article available.</div>
          )}
        </div>
      </section>

      {/* Latest Posts - Rendering logic uses 'posts' which is updated by useEffect */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>

          {isLoading ? (
            <div className="text-center py-8">Loading posts...</div>
          ) : otherPosts.length === 0 ? (
             // Adjusted check: if otherPosts is empty (after potentially removing the featured one)
            <div className="text-center py-8">No other articles found.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Map over otherPosts instead of posts */}
              {otherPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="aspect-[3/2] relative bg-gray-200 flex items-center justify-center">
                    {/* Correct property name */}
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <span className="text-gray-400 text-lg">{post.title}</span>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      {/* Check if category exists before rendering badge */}
                      {post.category && <Badge variant="outline">{post.category}</Badge>}
                      <span className="text-xs text-gray-500">
                        {post.created_at ? 
                          format(new Date(post.created_at), 'MMMM d, yyyy') : 
                          'No date'}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="mt-2 text-xl font-bold line-clamp-2 hover:text-[#F94C8D] transition-colors">{post.title}</h3>
                    </Link>
                    <p className="mt-2 text-gray-500 line-clamp-3">{post.excerpt || post.content?.substring(0, 100) || ''}</p>
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

      {/* Browse by Category - onClick uses handleCategoryChange */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">Browse by Category</h3>
          {/* Check if categories are loaded before rendering */}
          {!isLoading && categories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {/* Iterate over fetched categories */}
              {categories.map((category) => (
                <div
                  key={category.id} // Use category.id from fetched data
                  className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCategoryChange(category.name)} // Use fetched category name
                >
                  {/* Use icon map */}
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F94C8D]/10 to-[#9D4EDD]/10 text-[#F94C8D]">
                    <span className="text-2xl">{categoryIcons[category.name] || defaultIcon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-1">{category.name}</h4>
                    {/* Display dynamic post count */}
                    <p className="text-sm text-gray-500">
                      {categoryCounts[category.name] || 0} posts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
               {/* Placeholder while loading */}
              {[1, 2, 3].map(i => <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-[88px]"></div>)}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No categories found.</p>
          )}
        </CardContent>
      </Card>

      {/* Newsletter Section - Uses handleSubmit for subscription */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscribe to Our Newsletter</h2>
            <p className="mt-4 text-lg text-gray-500">
              Stay updated with the latest articles, tips, and dance events.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-4">
               <div className="relative">
                 <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                 <Input 
                   name="email" 
                   type="email" 
                   placeholder="Enter your email" 
                   required 
                   className="h-12 pl-10" 
                   aria-describedby="footer-email-error"
                 />
               </div>
                {formState.errors?.email && (
                  <p id="footer-email-error" className="mt-1 text-xs text-red-600">
                    {formState.errors.email[0]}
                  </p>
                )}
              <Button type="submit" size="lg" className="w-full h-12 bg-[#F94C8D] hover:bg-[#F94C8D]/90" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
              {formState.message && (
                <p className={`mt-2 text-sm ${formState.success ? 'text-green-600' : 'text-red-600'}`}>
                  {formState.message}
                </p>
              )}
            </form>
            <p className="mt-4 text-xs text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from Studio E.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Default export uses Suspense for searchParams
export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}> {/* Or a better skeleton */}
      <BlogContent />
    </Suspense>
  );
} 