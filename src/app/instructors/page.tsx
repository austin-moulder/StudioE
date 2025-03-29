import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function InstructorsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[300px] w-full bg-gray-300">
          {/* Placeholder for hero image */}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Perfect Instructor
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Browse our network of professional dance instructors and find the perfect match for your goals.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search Instructors
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input id="search" placeholder="Name, dance style, or keyword" className="pl-10" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:flex md:w-auto">
              <div className="space-y-2">
                <label htmlFor="style" className="text-sm font-medium">
                  Dance Style
                </label>
                <Select>
                  <SelectTrigger id="style" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Styles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Styles</SelectItem>
                    <SelectItem value="salsa">Salsa</SelectItem>
                    <SelectItem value="bachata">Bachata</SelectItem>
                    <SelectItem value="heels">Heels</SelectItem>
                    <SelectItem value="choreo">Choreo</SelectItem>
                    <SelectItem value="zouk">Zouk</SelectItem>
                    <SelectItem value="dj">DJ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Select>
                  <SelectTrigger id="location" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="online">Online Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="experience" className="text-sm font-medium">
                  Experience Level
                </label>
                <Select>
                  <SelectTrigger id="experience" className="w-full md:w-[180px]">
                    <SelectValue placeholder="Any Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Experience</SelectItem>
                    <SelectItem value="beginner">Beginner Friendly</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <button className="flex h-10 items-center justify-center rounded-md bg-[#F94C8D] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#F94C8D]/90">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">48 Instructors Found</h2>
            <Select defaultValue="recommended">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating-high">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                name: "Jocelyn Views",
                style: "Heels & Reggaeton, Choreo",
                location: "Chicago, IL",
                rating: 4.9,
                reviews: 127,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Nathalie Ocampo",
                style: "Heels & Contemporary",
                location: "Chicago, IL",
                rating: 4.8,
                reviews: 93,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Rachel Marie",
                style: "Choreo & Hip Hop",
                location: "Chicago, IL",
                rating: 5.0,
                reviews: 156,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Del Dominguez",
                style: "Salsa & Social Dancing",
                location: "Chicago, IL",
                rating: 4.7,
                reviews: 82,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Sam Guerrero",
                style: "Salsa & Styling",
                location: "Chicago, IL",
                rating: 4.9,
                reviews: 115,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Juan Hernandez",
                style: "Salsa & Performance",
                location: "Chicago, IL",
                rating: 4.8,
                reviews: 78,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Denisse Aldana",
                style: "Salsa & Social Dancing",
                location: "Chicago, IL",
                rating: 4.9,
                reviews: 104,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Mario Cuevas",
                style: "DJ",
                location: "Chicago, IL",
                rating: 5.0,
                reviews: 142,
                alias: "DJ Machito",
                image: "/placeholder.svg",
              },
              {
                name: "Taylore Diem",
                style: "DJ",
                location: "Chicago, IL",
                rating: 4.8,
                reviews: 89,
                alias: "DJ Diem Classic",
                image: "/placeholder.svg",
              },
              {
                name: "Eda Kachiri",
                style: "Bachata & Merengue",
                location: "Chicago, IL",
                rating: 4.9,
                reviews: 118,
                alias: "",
                image: "/placeholder.svg",
              },
              {
                name: "Brian MacDonald",
                style: "Bachata & Sensual",
                location: "Barcelona, Spain",
                rating: 4.7,
                reviews: 95,
                alias: "B-Mac",
                image: "/placeholder.svg",
              },
              {
                name: "Destiny Rivera",
                style: "Bachata & Salsa",
                location: "Chicago, IL",
                rating: 4.8,
                reviews: 107,
                alias: "",
                image: "/placeholder.svg",
              },
            ].map((instructor, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[4/3] relative bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">{instructor.name}</span>
                  {index % 3 === 0 && <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-4 py-1 rounded-full text-sm font-medium">Featured</div>}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{instructor.name}</h3>
                      <p className="text-sm text-gray-500">{instructor.style}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#9D4EDD] text-white px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-current" />
                      {instructor.rating}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {instructor.location}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">$45-75</span>
                    <span className="text-gray-500"> / hour</span>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <span className="text-sm text-gray-500">{instructor.reviews} reviews</span>
                    <Link href={`/instructors/${instructor.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#F94C8D] hover:underline text-sm">
                      View Profile
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Link href="/instructors?page=1" className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm opacity-50 cursor-not-allowed">&lt;</Link>
              <Link href="/instructors?page=1" className="flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-[#F94C8D] px-3 text-sm text-white">1</Link>
              <Link href="/instructors?page=2" className="flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm">2</Link>
              <Link href="/instructors?page=3" className="flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm">3</Link>
              <Link href="/instructors?page=4" className="flex h-9 min-w-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm">4</Link>
              <Link href="/instructors?page=2" className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm">&gt;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Become an Instructor CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Are You a Dance Instructor?</h2>
              <p className="mt-4 text-lg text-gray-500">
                Join our community of professional dance instructors and connect with students who are eager to learn.
              </p>
              <ul className="mt-6 space-y-2">
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Set your own rates and availability</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Turn your side hustle into your main hustle</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Discounted rates for training spaces (coming soon)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Connect with students in your area</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Establish credibility in the community</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Automate recurring payments and schedule instant payouts (coming soon)</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 h-5 w-5 text-[#FF3366]">✓</div>
                  <span>Access business experts dedicated to helping you grow</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link href="/apply-to-teach">
                  <Button size="lg">Apply to Teach</Button>
                </Link>
                <Link href="/consulting">
                  <Button size="lg" variant="outline">Grow Your Business</Button>
                </Link>
                <Link href="/certifications">
                  <Button size="lg" variant="secondary">Get Certified</Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Dance instructor teaching</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 