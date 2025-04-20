"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createSampleBlogPostWithImages } from "@/lib/blog/blogUtils"
import BlogContent from '../../components/BlogContent'
import { BlogPost } from "@/types/blog"

export default function BlogImageDemoPage() {
  const [samplePost, setSamplePost] = useState<BlogPost | null>(null)

  useEffect(() => {
    // Generate the sample post
    const post = createSampleBlogPostWithImages()
    setSamplePost(post)
  }, [])

  if (!samplePost) {
    return (
      <div className="container py-20 text-center">
        <div className="space-y-4">
          <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-4/6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 py-20">
        <div className="container text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {samplePost.title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg">
            {samplePost.excerpt}
          </p>
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

            {/* Post Content */}
            <BlogContent content={samplePost.content} />

            <div className="mt-12 pt-6 border-t">
              <h3 className="text-xl font-bold mb-4">How to Use Custom Image Syntax in Your Blog Posts</h3>
              <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto text-sm">
                {`!![Alt text for the image](https://example.com/image.jpg|width=800,height=500,caption=Your caption here)`}
              </pre>
              <p className="mt-4 text-muted-foreground">
                When adding images to your Supabase blog content, use the custom syntax above. 
                The double exclamation marks (!!) indicate it's a special image that will be rendered
                with our custom component. You can specify width, height, and an optional caption.
              </p>

              <h4 className="text-lg font-bold mt-8 mb-2">Example:</h4>
              <pre className="p-4 bg-gray-100 rounded-lg overflow-x-auto text-sm">
                {`!![Dancers in a studio](https://example.com/dancers.jpg|width=800,height=500,caption=Students practicing at Studio E)`}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 