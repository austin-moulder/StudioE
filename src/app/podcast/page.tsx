import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PodcastTabs } from "./podcast-tabs"

export default function PodcastPage() {
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
            <Button size="lg" variant="secondary" className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen on Spotify
            </Button>
            <Button size="lg" variant="outline" className="bg-white/20 text-white hover:bg-white/30">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* About the Podcast */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative aspect-square max-w-md mx-auto md:mx-0">
              <Image
                src="/placeholder.svg?height=400&width=400&text=PodcastCover"
                alt="The Studio E Podcast by Austin René"
                fill
                className="object-contain"
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
                    src="/placeholder.svg?height=64&width=64&text=AR"
                    alt="Austin René"
                    fill
                    className="object-cover"
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
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Episodes</h2>
            <p className="mt-4 text-lg text-muted-foreground">Explore our collection of insightful conversations</p>
          </div>

          <PodcastTabs />
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Eda Kachiri",
                role: "Bachata & Merengue Instructor",
                image: "/placeholder.svg?height=192&width=192&text=Eda",
                episode: 10,
              },
              {
                name: "B-Mac",
                role: "Bachata Instructor",
                image: "/placeholder.svg?height=192&width=192&text=BMac",
                episode: 9,
              },
              {
                name: "The Harrison Twins",
                role: "Dance Instructors",
                image: "/placeholder.svg?height=192&width=192&text=Twins",
                episode: 8,
              },
              {
                name: "Jocelyn & Nathalie",
                role: "Heels & Reggaeton Instructors",
                image: "/placeholder.svg?height=192&width=192&text=J&N",
                episode: 6,
              },
            ].map((guest, index) => (
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
                <Link href="#" className="mt-2 text-sm font-medium hover:underline">
                  Listen to Episode {guest.episode}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Never Miss an Episode</h2>
            <p className="mt-4 text-lg">
              Subscribe to The Studio E Podcast on your favorite platform and join our community of dance enthusiasts.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
              </Button>
              <Button size="lg" variant="secondary" className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.885 16.788c-.089.089-.198.159-.32.201-.122.041-.25.051-.375.029-.124-.022-.239-.077-.336-.159l-4.75-4.75v5.17c0 .135-.027.27-.079.395-.052.125-.128.238-.224.333-.096.096-.209.172-.334.224-.125.053-.26.079-.395.079s-.27-.026-.395-.079c-.125-.052-.238-.128-.334-.224-.096-.095-.172-.208-.224-.333-.052-.125-.079-.26-.079-.395V6.72c0-.135.027-.27.079-.395.052-.125.128-.238.224-.334.096-.095.209-.171.334-.223.125-.052.26-.079.395-.079s.27.027.395.079c.125.052.238.128.334.223.096.096.172.209.224.334.052.125.079.26.079.395v5.17l4.75-4.75c.097-.082.212-.137.336-.159.125-.022.253-.012.375.029.122.042.231.112.32.201.089.089.159.198.201.32.041.122.051.25.029.375-.022.124-.077.239-.159.336l-4.25 4.25 4.25 4.25c.082.097.137.212.159.336.022.125.012.253-.029.375-.042.122-.112.231-.201.32z" />
                </svg>
                Apple Podcasts
              </Button>
              <Button size="lg" variant="secondary" className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.495 17.95h-1.509c-.577 0-.694-.364-.694-.713 0-.352.117-.716.694-.716h1.509c.577 0 .694.364.694.716 0 .349-.117.713-.694.713zm-9.99 0H5.995c-.577 0-.694-.364-.694-.713 0-.352.117-.716.694-.716h1.51c.577 0 .694.364.694.716 0 .349-.117.713-.694.713zm7.805-3.906l-1.13 1.13c-.293.293-.768.293-1.061 0l-1.13-1.13c-.293-.293-.293-.768 0-1.061l1.13-1.13c.293-.293.768-.293 1.061 0l1.13 1.13c.293.293.293.768 0 1.061zm-5.619 0l-1.13 1.13c-.293.293-.768.293-1.061 0l-1.13-1.13c-.293-.293-.293-.768 0-1.061l1.13-1.13c.293-.293.768-.293 1.061 0l1.13 1.13c.293.293.293.768 0 1.061zm7.805-3.906h-1.509c-.577 0-.694-.364-.694-.713 0-.352.117-.716.694-.716h1.509c.577 0 .694.364.694.716 0 .349-.117.713-.694.713zm-9.99 0H5.995c-.577 0-.694-.364-.694-.713 0-.352.117-.716.694-.716h1.51c.577 0 .694.364.694.716 0 .349-.117.713-.694.713z" />
                </svg>
                Google Podcasts
              </Button>
            </div>
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
              <Button size="lg">Contact the Host</Button>
              <Button size="lg" variant="outline">
                Suggest a Guest
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 