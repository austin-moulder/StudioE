"use client"

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getDanceStyleImages } from "@/lib/supabase/imageUtils";
import useEmblaCarousel from 'embla-carousel-react'

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState("");
  const [danceStyleImages, setDanceStyleImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await getDanceStyleImages();
        setDanceStyleImages(images);
      } catch (error) {
        console.error("Error loading dance style images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleSearch = () => {
    if (selectedStyle) {
      router.push(`/instructors?style=${selectedStyle}`);
    } else {
      router.push("/instructors");
    }
  };

  const scrollTo = useCallback((index: number) => {
    emblaApi && emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[600px] w-full bg-gray-300">
          {/* Placeholder for hero image */}
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find Your Perfect Dance Instructor
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Connect with professional dance instructors for private lessons tailored to your skill level and goals.
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row">
            <div className="relative w-full">
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger className="h-12 bg-white/90 text-gray-800 border-0 w-full">
                  <SelectValue placeholder="What dance style are you interested in?" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-sm border-0">
                  <SelectItem value="salsa" className="hover:bg-gray-100/80">Salsa</SelectItem>
                  <SelectItem value="bachata" className="hover:bg-gray-100/80">Bachata</SelectItem>
                  <SelectItem value="heels" className="hover:bg-gray-100/80">Heels</SelectItem>
                  <SelectItem value="other" className="hover:bg-gray-100/80">Other Styles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              size="lg" 
              className="h-12 px-8 border-2 border-white shadow-lg"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Dance Styles */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Popular Dance Styles</h2>
            <p className="mt-4 text-lg text-gray-500">
              Explore a variety of dance styles taught by our expert instructors
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Salsa", count: 24 },
              { name: "Bachata", count: 18 },
              { name: "Heels", count: 15 },
              { name: "Choreo", count: 20 },
            ].map((style) => (
              <Link 
                key={style.name} 
                href={`/instructors?style=${style.name.toLowerCase()}`} 
                className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  {danceStyleImages[style.name.toLowerCase()] ? (
                    <>
                      <Image
                        src={danceStyleImages[style.name.toLowerCase()]}
                        alt={`${style.name} dance style`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{style.name}</h3>
                        <p className="text-sm">{style.count} Instructors</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">{style.name}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{style.name}</h3>
                        <p className="text-sm">{style.count} Instructors</p>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/dance-styles">
              <Button variant="outline" size="lg">
                View All Dance Styles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Instructors</h2>
            <p className="mt-4 text-lg text-gray-500">Learn from the best dance instructors in the industry</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Jocelyn V.",
                image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Jocelyn.png",
                style: "Heels & Reggaeton",
                rating: 4.9,
                reviews: 127,
                location: "Chicago, IL",
                featured: true,
                price: {
                  lower: 50,
                  upper: 70
                }
              },
              {
                name: "Del D.",
                image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Del_1.png",
                style: "Salsa & Social Dancing",
                rating: 4.7,
                reviews: 82,
                location: "Chicago, IL",
                featured: true,
                price: {
                  lower: 65,
                  upper: 85
                }
              },
              {
                name: "Brian M.",
                image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Brian.jpeg",
                style: "Bachata & Sensual",
                rating: 5.0,
                reviews: 156,
                location: "Barcelona, Spain",
                alias: "B-Mac",
                price: {
                  lower: 60,
                  upper: 80
                }
              },
            ].map((instructor) => (
              <Card key={instructor.name} className="overflow-hidden">
                <div className="aspect-[4/3] relative">
                  {instructor.image !== "/placeholder.svg" ? (
                    <Image
                      src={instructor.image}
                      alt={`${instructor.name} profile photo`}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: instructor.name === "Jocelyn V." ? "center 25%" : 
                                        instructor.name === "Brian M." ? "center 30%" : "center"
                      }}
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">{instructor.name}</span>
                    </div>
                  )}
                  {instructor.featured && (
                    <div className="absolute top-2 right-2 bg-[#FF3366] text-white px-4 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <CardContent className="p-6 bg-white">
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
                    <span className="font-medium">${instructor.price.lower}-{instructor.price.upper}</span>
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

          <div className="mt-12 text-center">
            <Link href="/instructors">
              <Button size="lg">
                Browse All Instructors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Students Say</h2>
            <p className="mt-4 text-lg text-gray-500">
              Hear from students who have found their perfect dance instructors
            </p>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {[
                {
                  name: "Susan Clark",
                  quote:
                    "Austin is above and beyond! He is an amazing dancer and instructor! Such a FUN and positive experience. He is lovely, happy and very inspiring!",
                  image: "/placeholder.svg",
                  style: "Zumba",
                },
                {
                  name: "Brianna Hook",
                  quote:
                    "They broke down the steps so clearly and answered every question patiently. I left feeling confident, for the first time, that I could implement the basics in leading on the dance floor!",
                  image: "/placeholder.svg",
                  style: "Bachata",
                },
                {
                  name: "Brandon Hampton",
                  quote:
                    "Austin is a creative entrepreneur at his core because he utilizes both out-of-the-box and practical methods for teaching, so that everyone regardless of their learning preference will fully grasp the lesson.",
                  image: "/placeholder.svg",
                  style: "Latin Dance",
                },
              ].map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 pl-4 md:pl-8 first:pl-0">
                  <Card className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.style} Student</p>
                      </div>
                    </div>
                    <div className="mt-4 flex-grow">
                      <p className="text-gray-500">&quot;{testimonial.quote}&quot;</p>
                    </div>
                    <div className="mt-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  selectedIndex === index ? "bg-[#FF3366]" : "bg-gray-300"
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-square max-w-md mx-auto md:mx-0">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_Main.png"
                alt="Studio E Podcast Cover"
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Studio E Podcast</h2>
              <p className="mt-4 text-lg text-gray-500">
                Join host Austin René for conversations with top dance instructors, performers, and industry experts.
              </p>
              <p className="mt-4 text-gray-500">
                With 10 episodes already released and Season 2 coming soon, The Studio E Podcast dives deep into the
                world of dance, sharing stories, techniques, and inspiration for dancers of all levels.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="https://open.spotify.com/show/3SdEa5nSOMzobeGp211vsq?si=238892d582ea4ec2" target="_blank" rel="noopener noreferrer">
                  <Button className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Listen on Spotify
                  </Button>
                </Link>
                <Link href="/podcast">
                  <Button variant="outline">
                    View All Episodes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Recent Episodes:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-[#FF3366] font-semibold">
                      10
                    </div>
                    <span>Eda Kachiri: Unleashing Passion in Your Dance Growing Your City</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-[#FF3366] font-semibold">
                      9
                    </div>
                    <span>B-Mac: Becoming an International Bachata Sensual Ambassador</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-[#FF3366] font-semibold">
                      8
                    </div>
                    <span>The Harrison Twins: Fighting the Urge to Compare in Social Dance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Dance Journey?</h2>
            <p className="mt-4 text-lg">
              Join hundreds of students who have found their perfect dance instructor through Studio E.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/instructors">
                <Button size="lg" variant="secondary">
                  Find an Instructor
                </Button>
              </Link>
              <Link href="https://forms.gle/LX4zHkZ1uLurnW9q6" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  Become an Instructor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From Our Blog</h2>
            <p className="mt-4 text-lg text-gray-500">
              Latest articles, tips, and stories from the world of dance
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "10 Tips for Beginner Ballet Dancers",
                excerpt:
                  "Starting ballet as an adult can be intimidating. Here are some tips to help you get started on the right foot.",
                image: "/placeholder.svg",
                date: "June 15, 2025",
                category: "Ballet",
              },
              {
                title: "The History and Evolution of Hip Hop Dance",
                excerpt:
                  "Explore the rich cultural history of hip hop dance, from its origins in the Bronx to its global influence today.",
                image: "/placeholder.svg",
                date: "June 10, 2025",
                category: "Hip Hop",
              },
              {
                title: "Preparing for Your First Dance Competition",
                excerpt:
                  "Competition day can be nerve-wracking. Here's how to prepare mentally and physically for your first dance competition.",
                image: "/placeholder.svg",
                date: "June 5, 2025",
                category: "Competition",
              },
            ].map((post, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[3/2] relative bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">{post.title}</span>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                  <p className="mt-2 text-gray-500">{post.excerpt}</p>
                  <Button variant="link" className="mt-4 p-0 h-auto">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button size="lg" variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
