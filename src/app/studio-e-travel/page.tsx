import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, MapPin, Clock } from "lucide-react";

export default function StudioETravel() {
  const destinations = [
    {
      name: "Fall 2025",
      locations: [
        {
          city: "Mexico City, Mexico",
          dates: "Sep 26 - Oct 6, 2025",
          duration: "11 days",
          highlight: "Fusion Salsa Festival",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Mexico.jpg",
        },
        {
          city: "Cali & Medellin, Colombia",
          dates: "Oct 22 - Nov 2, 2025",
          duration: "5-11 days",
          highlight: "World Salsa Festival",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Colombia.jpg",
        },
        {
          city: "Busan & Seoul, Korea",
          dates: "Oct 23 - Nov 2, 2025",
          duration: "5-10 days",
          highlight: "Busan Salsa Festival",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Korea.jpg",
        },
      ],
    },
    {
      name: "Winter 2025/26",
      locations: [
        {
          city: "San Juan, Puerto Rico",
          dates: "Jan 9 - Jan 19, 2026",
          duration: "10 days",
          highlight: "Festival de San Sebastian",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Puerto_Rico.jpg",
        },
        {
          city: "Milan, Italy",
          dates: "Jan 23 - Feb 2, 2026",
          duration: "10 days",
          highlight: "Salsanama Festival & Milan Fashion Week",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Italy.jpg",
        },
        {
          city: "Havana, Cuba",
          dates: "Feb 19 - Mar 1, 2026",
          duration: "10 days",
          highlight: "Havana Salsa Festival",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Cuba.jpg",
        },
      ],
    },
    {
      name: "Summer 2026",
      locations: [
        {
          city: "Madrid & Barcelona, Spain",
          dates: "May 21 - May 31, 2026",
          duration: "6-10 days",
          highlight: "Salsa Spain World Congress",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Spain.jpg",
        },
        {
          city: "Guatemala City, Guatemala",
          dates: "Aug 7 - Aug 18, 2026",
          duration: "10 days",
          highlight: "Guatemala Salsa Congress",
          image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Guatemala.jpg",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90 z-10" />
        <div className="relative h-[400px] w-full bg-[url('https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Locations/Hero.jpg')] bg-cover bg-center" />
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Travel with Studio E
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Join our annual international dance trip and explore the world through movement
          </p>
          <div className="mt-8">
            <Link href="/travel-vote">
              <Button size="lg" variant="secondary" className="font-semibold">
                Vote for Our Next Destination
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">2025-2026 Destinations</h2>
            <p className="mt-4 text-lg text-gray-500">
              Vote for your favorite destination by mid-May. The top choices will be selected for final voting.{" "}
              <Link 
                href="https://docs.google.com/document/d/1ULAS8mxe7DpGVmb98gHkZmbw2uO9OwHAuWTYwYnNxT0/edit?usp=sharing" 
                target="_blank"
                className="text-[#FF3366] hover:text-[#FF3366]/80 underline underline-offset-4"
              >
                View detailed itineraries
              </Link>
              {" "}for each destination.
            </p>
          </div>

          <div className="space-y-16">
            {destinations.map((season) => (
              <div key={season.name}>
                <h3 className="text-2xl font-bold mb-6">{season.name}</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {season.locations.map((location) => (
                    <Card key={location.city} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={location.image}
                          alt={location.city}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-semibold mb-4">{location.city}</h4>
                        <div className="space-y-3 text-gray-500">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>{location.dates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{location.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{location.highlight}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join the Adventure?</h2>
          <p className="text-gray-500 mb-8">
            Cast your vote by mid-May to help choose our next destination.
          </p>
          <Link href="/travel-vote">
            <Button size="lg" className="bg-[#FF3366] text-white hover:bg-[#FF3366]/90">
              Vote Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
} 