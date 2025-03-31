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
    title: "Unleashing Passion in Your Dance Growing Your City",
    guest: "Eda Kachiri",
    guestTitle: "Bachata & Merengue Instructor",
    duration: "55:42",
    date: "September 13, 2024",
    description: "Eda discusses how to build a thriving dance community and grow the dance scene in your city.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_EdaKachiri.png",
  },
  {
    number: 9,
    title: "Becoming an International Bachata Sensual Ambassador",
    guest: "Brian MacDonald",
    guestTitle: "Bachata Instructor",
    duration: "51:05",
    date: "August 30, 2024",
    description:
      "Brian shares his journey from local instructor to international bachata ambassador and offers advice for aspiring teachers.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_BMac.png",
  },
  {
    number: 8,
    title: "Fighting the Urge to Compare in Social Dance",
    guest: "Harrison Twins",
    guestTitle: "Dance Instructors",
    duration: "01:04:10",
    date: "August 16, 2024",
    description: "The Harrison Twins explore the psychology of comparison in social dance and how to overcome it.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_HarrisonTwins.png",
  },
  {
    number: 7,
    title: "Physical Therapist Shares Best Practices for Social Dancer Longevity",
    guest: "Stephanie Groth",
    guestTitle: "Physical Therapist",
    duration: "52:41",
    date: "August 2, 2024",
    description: "Stephanie shares expert advice on injury prevention and body maintenance for dancers.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_Stephanie.png",
  },
  {
    number: 6,
    title: "Confidence, Femininity, and Unleashing Your Sexy Alter Ego",
    guest: "Jocelyn & Nathalie",
    guestTitle: "Heels & Reggaeton Instructors",
    duration: "44:28",
    date: "July 19, 2024",
    description:
      "Jocelyn and Nathalie discuss how dance can be a powerful tool for self-expression and confidence building.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_Jocelyn_&_Nathalie.png",
  },
  {
    number: 5,
    title: "Exploring the Evolution of Bachata and Afro-Cuban Culture",
    guest: "Ritmos Negros",
    guestTitle: "Dance Historian & Performer",
    duration: "01:02:25",
    date: "June 28, 2024",
    description: "A deep dive into the rich cultural history and evolution of Bachata and Afro-Cuban dance styles.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_RitmosNegros.png",
  },
  {
    number: 4,
    title: "Dance Travel, Injury Recovery, and Dating Non-Dancers",
    guest: "Natalye Medina",
    guestTitle: "Professional Dancer & Instructor",
    duration: "47:18",
    date: "June 14, 2024",
    description: "Natalye shares insights on balancing travel as a dancer, recovering from injuries, and navigating relationships with non-dancers.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_Natalye.png",
  },
  {
    number: 3,
    title: "Build A Career as a Latin Social Dance DJ",
    guest: "DJ Diem",
    guestTitle: "Professional Latin DJ",
    duration: "49:51",
    date: "May 31, 2024",
    description: "DJ Diem shares his journey and insights on building a successful career as a Latin social dance DJ.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_DJDiemClassic.png",
  },
  {
    number: 2,
    title: "Training Fundamentals and Tips for Growing as a Dancer",
    guest: "Jackie & Rafa",
    guestTitle: "Professional Dance Partners",
    duration: "54:02",
    date: "May 17, 2024",
    description: "Jackie and Rafa discuss training fundamentals and share their best tips for growing as a dancer.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_Jackie_&_Rafa.png",
  },
  {
    number: 1,
    title: "Welcome to Studio E: The Podcast for Latin Dancers",
    guest: "Austin Moulder",
    guestTitle: "Host & Founder",
    duration: "06:56",
    date: "March 23, 2024",
    description: "An introduction to Studio E Podcast, where we explore the world of Latin dance through conversations with instructors and industry professionals.",
    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Podcast/Podcast_Cover_Main.png",
  },
]

export function PodcastTabs() {
  return (
    <Tabs defaultValue="season1" className="w-full">
      <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2 bg-gray-100">
        <TabsTrigger value="season1">Season 1</TabsTrigger>
        <TabsTrigger value="upcoming">Season 2 (Coming Soon)</TabsTrigger>
      </TabsList>

      <TabsContent value="season1" className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode, index) => (
            <Card key={index} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-square relative overflow-hidden">
                <Image 
                  src={episode.image} 
                  alt={episode.title} 
                  fill 
                  className="object-cover" 
                  style={{ objectPosition: "center" }}
                  priority={index < 3}
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[#F94C8D] text-sm font-bold shadow-md">
                  EP {episode.number}
                </div>
              </div>
              <CardContent className="p-6 bg-white flex-grow flex flex-col">
                <h3 className="text-xl font-bold">{episode.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline">Guest</Badge>
                  <span className="text-sm font-medium">{episode.guest}</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{episode.description}</p>
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {episode.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {episode.duration}
                    </div>
                  </div>
                  <div className="flex items-start mt-2">
                    <Button variant="link" className="p-0 h-auto text-primary pl-0">
                      Listen Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="upcoming">
        <div className="mx-auto max-w-2xl text-center py-12">
          <h3 className="text-2xl font-bold">Season 2 Coming Soon!</h3>
          <p className="mt-4 text-muted-foreground">
            We&apos;re currently working on exciting new episodes for Season 2 of The Studio E Podcast. Subscribe to our
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