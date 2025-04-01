"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import useEmblaCarousel from "embla-carousel-react"
import { useEffect, useState } from "react"

// Dynamically import PodcastTabs with the correct path
const PodcastTabs = dynamic(() => import("@/app/podcast/podcast-tabs").then(mod => mod.PodcastTabs), {
  ssr: true,
  loading: () => <div className="text-center py-12">Loading podcast episodes...</div>
})

export default function PodcastPage() {
  const [instructorsEmblaRef, instructorsEmblaApi] = useEmblaCarousel({ loop: true })
  const [selectedInstructorIndex, setSelectedInstructorIndex] = useState(0)

  useEffect(() => {
    if (instructorsEmblaApi) {
      instructorsEmblaApi.on('select', () => {
        setSelectedInstructorIndex(instructorsEmblaApi.selectedScrollSnap())
      })
    }
  }, [instructorsEmblaApi])

  const scrollToInstructor = (index: number) => {
    if (instructorsEmblaApi) {
      instructorsEmblaApi.scrollTo(index)
    }
  }

  const featuredInstructors = [
    {
      name: "Eda Kachiri",
      role: "Bachata & Merengue Instructor",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Eda_Kachiri.png",
      episode: 10,
      spotifyLink: "https://open.spotify.com/episode/4bDxnq1c7OASVESYIU2EU3?si=1d292bc6e0bf4d2a"
    },
    {
      name: "B-Mac",
      role: "Bachata Instructor",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Brian.jpeg",
      episode: 9,
      spotifyLink: "https://open.spotify.com/episode/63vAHHJvfRiHNrUQ3OmnRK?si=bd6895e091614d01"
    },
    {
      name: "The Harrison Twins",
      role: "Dance Instructors",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Harrison_Twins.png",
      episode: 8,
      spotifyLink: "https://open.spotify.com/episode/3DxiwclbTdxcbTpgJ5jvUU?si=cbb7cc9e69864cdd"
    },
    {
      name: "Jocelyn & Nathalie",
      role: "Heels & Reggaeton Instructors",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Jocelyn_&_Nathalie.png",
      episode: 6,
      spotifyLink: "https://open.spotify.com/episode/0JDUrjDFdgQwcwqjAuHpZe?si=ec115ec0d7be44b9"
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full">{/* Gradient background only */}</div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">The Studio E Podcast</h1>
          <p className="mt-6 max-w-2xl text-lg">
            Conversations with top dance instructors, performers, and industry experts
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="https://open.spotify.com/show/3SdEa5nSOMzobeGp211vsq?si=238892d582ea4ec2" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Listen on Spotify
              </Button>
            </Link>
            <Link href="https://open.spotify.com/show/3SdEa5nSOMzobeGp211vsq?si=238892d582ea4ec2" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/20 text-white hover:bg-white/30">
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About the Podcast */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-square max-w-md mx-auto md:mx-0">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_Main.png"
                alt="The Studio E Podcast by Austin René"
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About the Podcast</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The Studio E Podcast is your window into the vibrant world of dance, hosted by Austin René.
              </p>
              <p className="mt-4 text-muted-foreground">
                Each episode features in-depth conversations with dance professionals, exploring their journeys,
                techniques, and insights into the industry. Whether you&apos;re a beginner looking for inspiration or a
                seasoned dancer seeking to deepen your knowledge, this podcast offers valuable content for everyone
                passionate about dance.
              </p>
              <p className="mt-4 text-muted-foreground">
                With 10 episodes already released and Season 2 coming soon, we&apos;re just getting started on this journey
                of exploration and celebration of dance culture.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Profile_Picture_Standing.jpeg"
                    alt="Austin René"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Austin René</h3>
                  <p className="text-sm text-muted-foreground">Host & Producer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Episodes</h2>
            <p className="mt-4 text-lg text-muted-foreground">Explore our collection of insightful conversations</p>
          </div>

          <PodcastTabs />
        </div>
      </section>

      {/* Combined Latest Episode and Playlist Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Listen to Studio E</h2>
            <p className="mt-4 text-lg text-muted-foreground">Catch up on our latest episode or enjoy our curated playlist</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold mb-4">Latest Episode</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Listen to our latest conversation with dance industry leaders sharing insights and inspiration.
              </p>
              <iframe 
                style={{ borderRadius: "12px" }} 
                src="https://open.spotify.com/embed/show/3SdEa5nSOMzobeGp211vsq/video?utm_source=generator&theme=0&t=1107" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Podcast Playlist</h3>
              <p className="text-sm text-muted-foreground mb-4">
                A curated collection of our guests' favorite songs for your dance practice.
              </p>
              <iframe 
                style={{ borderRadius: "12px" }} 
                src="https://open.spotify.com/embed/playlist/24tmywD1cwwqz8RD8OIr5n?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Instructors</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Meet some of our incredible Studio E guests who have since become official instructors on the platform!
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={instructorsEmblaRef}>
              <div className="flex">
                {featuredInstructors.map((guest, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="flex flex-col items-center text-center mx-2">
                      <div className="relative h-48 w-48 overflow-hidden rounded-full">
                        <Image
                          src={guest.image || "/placeholder.svg"}
                          alt={guest.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <h3 className="mt-6 text-xl font-bold">{guest.name}</h3>
                      <p className="text-primary">
                        {guest.role}
                      </p>
                      <Link href={guest.spotifyLink} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm font-medium hover:underline">
                        Listen to Episode {guest.episode}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {featuredInstructors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToInstructor(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedInstructorIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to instructor ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredInstructors.map((guest, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative h-48 w-48 overflow-hidden rounded-full">
                  <Image
                    src={guest.image || "/placeholder.svg"}
                    alt={guest.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold">{guest.name}</h3>
                <p className="text-primary">
                  {guest.role}
                </p>
                <Link href={guest.spotifyLink} target="_blank" rel="noopener noreferrer" className="mt-2 text-sm font-medium hover:underline">
                  Listen to Episode {guest.episode}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get Involved</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a question for our host? Want to suggest a topic or guest for the podcast?
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact the Host</Button>
              </Link>
              <Link href="https://forms.gle/hSrhSi5Zdab8R3Pw5" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  Suggest a Guest
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 