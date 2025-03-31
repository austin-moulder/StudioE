"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchTerm) {
      params.set("q", searchTerm);
    }
    
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    
    const query = params.toString();
    router.push(`/blog${query ? `?${query}` : ""}`);
  };

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
                  <SelectItem value="tips">Tips & Techniques</SelectItem>
                  <SelectItem value="instructor">Instructor Spotlights</SelectItem>
                  <SelectItem value="history">Dance History</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                  <SelectItem value="events">Event Recaps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Article</h2>

          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Featured Article Image</span>
            </div>
            <div>
              <Badge className="bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90">Featured</Badge>
              <h3 className="mt-2 text-3xl font-bold">
                The Evolution of Contemporary Dance: Past, Present, and Future
              </h3>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                June 20, 2025
              </div>
              <p className="mt-4 text-gray-500">
                Contemporary dance has undergone significant transformations since its inception in the mid-20th
                century. This article explores its rich history, current trends, and where this dynamic art form is
                headed in the future.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">ER</span>
                  </div>
                  <span className="text-sm font-medium">Elena Rodriguez</span>
                </div>
                <Button>
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => {
              // Generate some varied sample data
              const titles = [
                "10 Tips for Beginner Ballet Dancers",
                "The History and Evolution of Hip Hop Dance",
                "Preparing for Your First Dance Competition",
                "How to Choose the Right Dance Shoes",
                "Instructor Spotlight: Maria Chen's Journey from Student to Master",
                "The Mental Health Benefits of Regular Dancing",
              ]
              const excerpts = [
                "Starting ballet as an adult can be intimidating. Here are some tips to help you get started on the right foot.",
                "Explore the rich cultural history of hip hop dance, from its origins in the Bronx to its global influence today.",
                "Competition day can be nerve-wracking. Here's how to prepare mentally and physically for your first dance competition.",
                "Different dance styles require different footwear. Learn how to select the perfect shoes for your dance practice.",
                "From taking her first dance class at age 5 to becoming one of our most sought-after instructors, Maria's story inspires.",
                "Beyond physical fitness, dancing offers significant mental health benefits including stress reduction and improved cognitive function.",
              ]
              const categories = [
                "Tips & Techniques",
                "Dance History",
                "Competition",
                "Equipment",
                "Instructor Spotlight",
                "Health & Wellness",
              ]
              const dates = [
                "June 15, 2025",
                "June 10, 2025",
                "June 5, 2025",
                "May 28, 2025",
                "May 20, 2025",
                "May 15, 2025",
              ]

              return (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-[3/2] relative bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">{titles[index]}</span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{categories[index]}</Badge>
                      <span className="text-xs text-gray-500">{dates[index]}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold">{titles[index]}</h3>
                    <p className="mt-2 text-gray-500 line-clamp-3">{excerpts[index]}</p>
                    <Button variant="link" className="mt-4 p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { name: "Tips & Techniques", count: 24, icon: "💡" },
              { name: "Dance History", count: 18, icon: "📚" },
              { name: "Instructor Spotlights", count: 15, icon: "🌟" },
              { name: "Health & Wellness", count: 12, icon: "🧘" },
              { name: "Event Recaps", count: 20, icon: "🎭" },
              { name: "Student Stories", count: 16, icon: "👥" },
            ].map((category) => (
              <Link
                key={category.name}
                href="#"
                className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient/10 text-2xl">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} articles</p>
                </div>
              </Link>
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