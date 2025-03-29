import Image from "next/image"
import { Calendar, MapPin, Clock, Users, Search, Filter, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[300px] w-full">{/* Removed the image placeholder */}</div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Upcoming Dance Events</h1>
          <p className="mt-6 max-w-2xl text-lg">
            Workshops, showcases, competitions, and social events for dancers of all levels.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
              <label htmlFor="search" className="text-sm font-medium">
                Search Events
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="search" placeholder="Event name, dance style, or keyword" className="pl-10" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:flex md:w-auto md:items-end">
              <div className="space-y-2">
                <label htmlFor="event-type" className="text-sm font-medium">
                  Event Type
                </label>
                <Select>
                  <SelectTrigger id="event-type" className="w-full md:w-[180px]">
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="workshop">Workshops</SelectItem>
                    <SelectItem value="showcase">Showcases</SelectItem>
                    <SelectItem value="competition">Competitions</SelectItem>
                    <SelectItem value="social">Social Events</SelectItem>
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
                    <SelectItem value="online">Online Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="flex items-center gap-2 h-10 self-end bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              
              <Button className="flex items-center gap-2 h-10 self-end bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90 ml-2">
                <CalendarPlus className="h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Salsa Sundays at Cubby Bear",
                    type: "Social",
                    date: "April 16, 2023",
                    time: "7:00 PM - 1:00 AM",
                    location: "Cubby Bear, Chicago",
                    price: 15,
                    spotsLeft: 45,
                    image: "/placeholder.svg?height=400&width=600&text=SalsaSundays",
                  },
                  {
                    title: "Sensual Tuesdays",
                    type: "Workshop",
                    date: "April 18, 2023",
                    time: "8:00 PM - 12:30 AM",
                    location: "Dance Studio Chicago",
                    price: 20,
                    spotsLeft: 32,
                    image: "/placeholder.svg?height=400&width=600&text=SensualTuesdays",
                  },
                  {
                    title: "Baila Tuesdays",
                    type: "Social",
                    date: "April 18, 2023",
                    time: "8:00 PM - 1:00 AM",
                    location: "Baila Chicago",
                    price: 15,
                    spotsLeft: 50,
                    image: "/placeholder.svg?height=400&width=600&text=BailaTuesdays",
                  },
                  {
                    title: "Latin Wednesdays at Jonny Cabs",
                    type: "Social",
                    date: "April 19, 2023",
                    time: "7:00 PM - 11:00 PM",
                    location: "Jonny Cabs, Chicago",
                    price: 10,
                    spotsLeft: 38,
                    image: "/placeholder.svg?height=400&width=600&text=LatinWednesdays",
                  },
                  {
                    title: "Tropical Wednesdays at Vintage",
                    type: "Social",
                    date: "April 19, 2023",
                    time: "7:00 PM - 2:00 AM",
                    location: "Vintage Lounge, Chicago",
                    price: 15,
                    spotsLeft: 42,
                    image: "/placeholder.svg?height=400&width=600&text=TropicalWednesdays",
                  },
                  {
                    title: "SALSA BACHATA THURSDAY'S AT ALHAMBRA PALACE",
                    type: "Social",
                    date: "April 20, 2023",
                    time: "8:00 PM - 2:00 AM",
                    location: "Alhambra Palace, Chicago",
                    price: 20,
                    spotsLeft: 35,
                    image: "/placeholder.svg?height=400&width=600&text=AlhambraPalace",
                  },
                  {
                    title: "Tropical Thursdays at The Loft",
                    type: "Social",
                    date: "April 20, 2023",
                    time: "8:30 PM - 2:00 AM",
                    location: "The Loft, Chicago",
                    price: 15,
                    spotsLeft: 40,
                    image: "/placeholder.svg?height=400&width=600&text=TropicalThursdays",
                  },
                  {
                    title: "Video Mix First Friday @ CLUB M",
                    type: "Social",
                    date: "April 21, 2023",
                    time: "7:00 PM - 2:00 AM",
                    location: "Club M, Chicago",
                    price: 0,
                    spotsLeft: 60,
                    image: "/placeholder.svg?height=400&width=600&text=VideoMixFriday",
                  },
                  {
                    title: "Latin Fridays and Saturdays at LV Club",
                    type: "Social",
                    date: "April 21, 2023",
                    time: "9:00 PM - 4:00 AM",
                    location: "LV Club, Chicago",
                    price: 25,
                    spotsLeft: 30,
                    image: "/placeholder.svg?height=400&width=600&text=LatinFridays",
                  },
                ].map((event, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-[3/2] relative">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      {index % 3 === 0 && <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-4 py-1 rounded-full text-sm font-medium">Featured</div>}
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90">{event.type}</Badge>
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          {`${event.spotsLeft} spots left`}
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-medium">{event.price === 0 ? "Free" : `$${event.price}`}</span>
                        <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">Register</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#F94C8D] text-white border-[#F94C8D] hover:bg-[#F94C8D] hover:text-white hover:border-[#F94C8D]">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="featured">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => {
                  const featuredEvents = [
                    {
                      title: "Annual Dance Gala",
                      description:
                        "Join us for our prestigious annual gala featuring performances from top dancers across all styles.",
                      date: "October 15, 2025",
                      time: "7:00 PM - 11:00 PM",
                      location: "Grand Ballroom, Plaza Hotel, New York",
                      price: 150,
                      image: "/placeholder.svg?height=400&width=600&text=Gala",
                    },
                    {
                      title: "International Dance Festival",
                      description:
                        "A week-long celebration of dance from around the world, featuring workshops, performances, and cultural exchanges.",
                      date: "September 20-27, 2025",
                      time: "Various Times",
                      location: "Cultural Arts Center, Los Angeles",
                      price: 200,
                      image: "/placeholder.svg?height=400&width=600&text=Festival",
                    },
                    {
                      title: "Dance for a Cause",
                      description:
                        "A charity event bringing together dancers of all styles to raise funds for arts education in underserved communities.",
                      date: "August 30, 2025",
                      time: "6:00 PM - 10:00 PM",
                      location: "Community Center, Chicago",
                      price: 75,
                      image: "/placeholder.svg?height=400&width=600&text=Charity",
                    },
                  ]

                  const event = featuredEvents[index]

                  return (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-[3/2] relative">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-[#F94C8D] text-white px-4 py-1 rounded-full text-sm font-medium">Featured</div>
                      </div>
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-[#F94C8D] text-white hover:bg-[#F94C8D]/90">Special Event</Badge>
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            {event.location}
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <span className="font-medium">${event.price}</span>
                          <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">Register</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Salsa Sundays at Cubby Bear",
                    type: "Social",
                    date: "March 19, 2023",
                    time: "7:00 PM - 1:00 AM",
                    location: "Cubby Bear, Chicago",
                    image: "/placeholder.svg?height=400&width=600&text=PastSalsaSundays",
                  },
                  {
                    title: "Sensual Tuesdays",
                    type: "Workshop",
                    date: "March 21, 2023",
                    time: "8:00 PM - 12:30 AM",
                    location: "Dance Studio Chicago",
                    image: "/placeholder.svg?height=400&width=600&text=PastSensualTuesdays",
                  },
                  {
                    title: "Baila Tuesdays",
                    type: "Social",
                    date: "March 21, 2023",
                    time: "8:00 PM - 1:00 AM",
                    location: "Baila Chicago",
                    image: "/placeholder.svg?height=400&width=600&text=PastBailaTuesdays",
                  },
                  {
                    title: "Latin Wednesdays at Jonny Cabs",
                    type: "Social",
                    date: "March 22, 2023",
                    time: "7:00 PM - 11:00 PM",
                    location: "Jonny Cabs, Chicago",
                    image: "/placeholder.svg?height=400&width=600&text=PastLatinWednesdays",
                  },
                  {
                    title: "St Patrick's Sunday Salsa Party",
                    type: "Special Event",
                    date: "March 19, 2023",
                    time: "5:00 PM - 9:00 PM",
                    location: "Studio E Main Hall, Chicago",
                    image: "/placeholder.svg?height=400&width=600&text=StPatricks",
                  },
                  {
                    title: "The Mambo Revival",
                    type: "Workshop",
                    date: "March 23, 2023",
                    time: "6:00 PM - 10:00 PM",
                    location: "Dance Hub, Chicago",
                    image: "/placeholder.svg?height=400&width=600&text=MamboRevival",
                  },
                ].map((event, index) => (
                  <Card key={index} className="overflow-hidden opacity-80">
                    <div className="aspect-[3/2] relative">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover grayscale"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Badge variant="secondary" className="text-lg py-1 px-3">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end">
                        <Button variant="outline">View Gallery</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC]" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Want to Host an Event?</h2>
            <p className="mt-4 text-lg">
              Are you a dance instructor or studio owner looking to host a workshop, showcase, or social event? Partner
              with Studio E to reach more dancers!
            </p>
            <Button size="lg" variant="secondary" className="mt-8">
              Submit Your Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 