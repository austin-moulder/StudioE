"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, User, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBlogPostBySlug } from "@/lib/blog/blogUtils"
import { BlogPost } from "@/types/blog"
import { format } from 'date-fns'
import { notFound } from "next/navigation"
import BlogContent from '../../components/BlogContent'

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

// Add JSON-LD structured data component
function BlogPostStructuredData({ post }: { post: BlogPost }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featured_image,
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": {
      "@type": "Person",
      "name": post.author_name,
      "image": post.author_image
    },
    "publisher": {
      "@type": "Organization",
      "name": "Studio E",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.joinstudioe.com/studio-e-logo.svg"
      }
    },
    "description": post.excerpt,
    "articleBody": post.content,
    "keywords": post.category
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([])
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    async function loadPost() {
      setLoading(true)
      try {
        const fetchedPost = await getBlogPostBySlug(params.slug)
        if (fetchedPost) {
          setPost(fetchedPost)
          
          // Generate table of contents from headers
          const headers: TableOfContentsItem[] = []
          const lines = fetchedPost.content.split('\n')
          
          lines.forEach((line, index) => {
            // Check for ## or ### headers
            if (line.startsWith('##') && !line.startsWith('###')) {
              const title = line.replace(/^##\s*/, '').trim()
              const id = `header-${index}`
              headers.push({ id, title, level: 2 })
            } else if (line.startsWith('###')) {
              const title = line.replace(/^###\s*/, '').trim()
              const id = `header-${index}`
              headers.push({ id, title, level: 3 })
            }
          })
          
          setTableOfContents(headers)
          setShowToc(headers.length > 0)
        }
      } catch (error) {
        console.error("Error loading blog post:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [params.slug])

  if (!loading && !post) {
    notFound()
  }

  // Placeholder data for when the post is loading
  const placeholderPost: BlogPost = {
    id: 0,
    title: "Loading...",
    slug: params.slug,
    content: "Loading content...",
    excerpt: "Loading excerpt...",
    featured_image: "",
    category: "Loading...",
    published: true,
    created_at: new Date().toISOString(),
    author_name: "Loading...",
    author_image: ""
  }

  const displayPost = post || placeholderPost

  return (
    <div className="flex flex-col">
      {!loading && post && <BlogPostStructuredData post={post} />}
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full bg-gray-200">
          {displayPost.featured_image ? (
            <Image
              src={displayPost.featured_image}
              alt={displayPost.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-gray-400 text-lg">Featured Image</span>
            </div>
          )}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {displayPost.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Badge className="bg-white/20 hover:bg-white/30">{displayPost.category}</Badge>
            <div className="flex items-center text-sm">
              <Calendar className="mr-1 h-4 w-4" />
              {displayPost.created_at ? 
                format(new Date(displayPost.created_at), 'MMMM d, yyyy') : 
                'No date'}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Link href="/blog">
              <Button variant="outline" className="mb-8 -ml-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to all articles
              </Button>
            </Link>

            {/* Author Info */}
            <div className="mb-8 flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                {displayPost.author_image ? (
                  <Image
                    src={displayPost.author_image}
                    alt={displayPost.author_name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div>
                <div className="font-medium">{displayPost.author_name}</div>
                <div className="text-sm text-gray-500">Author</div>
              </div>
            </div>

            {/* Table of Contents */}
            {showToc && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <List className="h-5 w-5" />
                  <h4>Table of Contents</h4>
                </div>
                <nav>
                  <ul className="list-inside space-y-1">
                    {tableOfContents.map((item) => (
                      <li 
                        key={item.id}
                        className={`${item.level === 3 ? 'ml-4' : ''}`}
                      >
                        <a 
                          href={`#${item.id}`}
                          className="text-[#F94C8D] hover:underline"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Post Content */}
            {loading ? (
              <div className="space-y-4">
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-4/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : (
              <BlogContent content={displayPost.content} />
            )}

            {/* Tags and Sharing */}
            <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row sm:justify-between gap-4">
              <Link href="/blog">
                <Button variant="outline">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to all articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles - Would be implemented in a real app */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Continue Reading</h2>
            <p className="mt-4 text-lg text-gray-500">
              Explore more articles about {displayPost.category}
            </p>
            <Link href={`/blog?category=${displayPost.category}`}>
              <Button className="mt-6">
                View Articles in {displayPost.category}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 