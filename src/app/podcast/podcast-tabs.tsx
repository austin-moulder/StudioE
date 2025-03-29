"use client"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Episode data
const episodes = [
  {
    number: 10,
    title: "Eda Kachiri: Unleashing Passion in Your Dance Growing Your City",
    guest: "Eda Kachiri",
    guestTitle: "Bachata & Merengue Instructor",
    duration: "55:42",
    date: "September 13, 2024",
    description: "Eda discusses how to build a thriving dance community and grow the dance scene in your city.",
    image: "/placeholder.svg?height=400&width=600&text=Eda",
  },
  {
    number: 9,
    title: "B-Mac: Becoming an International Bachata Sensual Ambassador",
    guest: "Brian MacDonald",
    guestTitle: "Bachata Instructor",
    duration: "51:05",
    date: "August 30, 2024",
    description:
      "Brian shares his journey from local instructor to international bachata ambassador and offers advice for aspiring teachers.",
    image: "/placeholder.svg?height=400&width=600&text=BMac",
  },
  {
    number: 8,
    title: "The Harrison Twins: Fighting the Urge to Compare in Social Dance",
    guest: "Harrison Twins",
    guestTitle: "Dance Instructors",
    duration: "1:04:10",
    date: "August 16, 2024",
    description: "The Harrison Twins explore the psychology of comparison in social dance and how to overcome it.",
    image: "/placeholder.svg?height=400&width=600&text=Twins",
  },
  {
    number: 7,
    title: "Stephanie Groth: Physical Therapist Shares Best Practices for Social Dancer Longevity",
    guest: "Stephanie Groth",
    guestTitle: "Physical Therapist",
    duration: "52:41",
    date: "August 2, 2024",
    description: "Stephanie shares expert advice on injury prevention and body maintenance for dancers.",
    image: "/placeholder.svg?height=400&width=600&text=Stephanie",
  },
  {
    number: 6,
    title: "Jocelyn & Nathalie: Confidence, Femininity, and Unleashing Your Sexy Alter Ego",
    guest: "Jocelyn & Nathalie",
    guestTitle: "Heels & Reggaeton Instructors",
    duration: "44:28",
    date: "July 19, 2024",
    description:
      "Jocelyn and Nathalie discuss how dance can be a powerful tool for self-expression and confidence building.",
    image: "/placeholder.svg?height=400&width=600&text=J&N",
  },
  {
    number: 5,
    title: "Ritmos Negros: Exploring the Evolution of Bachata and Afro-Cuban Culture",
    guest: "Ritmos Negros",
    guestTitle: "Dance Historian & Performer",
    duration: "1:02:25",
    date: "June 28, 2024",
    description: "A deep dive into the rich cultural history and evolution of Bachata and Afro-Cuban dance styles.",
    image: "/placeholder.svg?height=400&width=600&text=Ritmos",
  },
  {
    number: 4,
    title: "Jackie & Rafa: Building a Dance Partnership",
    guest: "Jackie & Rafa",
    guestTitle: "Professional Dance Partners",
    duration: "48:15",
    date: "June 14, 2024",
    description: "Jackie and Rafa discuss the challenges and rewards of building a successful dance partnership.",
    image: "/placeholder.svg?height=400&width=600&text=Jackie&Rafa",
  },
]

export function PodcastTabs() {
  return (
    <Tabs defaultValue="season1" className="w-full">
      <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2">
        <TabsTrigger value="season1">Season 1</TabsTrigger>
        <TabsTrigger value="upcoming">Season 2 (Coming Soon)</TabsTrigger>
      </TabsList>

      <TabsContent value="season1" className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-[3/2] relative bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] flex items-center justify-center">
                <Image src={episode.image || "/placeholder.svg"} alt={episode.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm font-medium">
                  EP {episode.number}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{episode.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline">Guest</Badge>
                  <span className="text-sm font-medium">{episode.guest}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{episode.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {episode.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {episode.duration}
                  </div>
                </div>
                <Button variant="link" className="mt-4 p-0 h-auto">
                  Listen Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="upcoming">
        <div className="mx-auto max-w-2xl text-center py-12">
          <h3 className="text-2xl font-bold">Season 2 Coming Soon!</h3>
          <p className="mt-4 text-muted-foreground">
            We're currently working on exciting new episodes for Season 2 of The Studio E Podcast. Subscribe to our
            newsletter or follow us on social media to be the first to know when new episodes drop.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Subscribe for Updates</Button>
            <Button variant="outline">Suggest a Topic</Button>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
} 