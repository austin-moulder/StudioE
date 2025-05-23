"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { getInstructorCountByStyle } from "@/lib/instructors/instructorUtils"

export default function DanceStylesPage() {
  const [danceStyles, setDanceStyles] = useState([
    {
      name: "Salsa",
      description: "Salsa is a vibrant, energetic Latin dance characterized by its quick footwork, hip movements, and partner connection. Originating from Cuba and New York, it incorporates elements of other Latin and Afro-Caribbean dances. Salsa is danced to lively, percussive music typically at 180-240 beats per minute, with dancers moving on counts 1, 2, 3 and 5, 6, 7 of an 8-beat bar. Popular styles include Cuban (Casino), LA, and New York style, each with their own flavor and technique. Salsa's social nature makes it perfect for building community and confidence.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Salsa_2.jpg",
      instructors: 0
    },
    {
      name: "Bachata",
      description: "Bachata is a style of music and dance that originated in the Dominican Republic. It features romantic, often heartfelt lyrics paired with a distinctive rhythm created by guitar, bass, bongos, and güira (a type of scraper). The dance is known for its simple steps, hip movements, and close partner connection, making it both easy to learn and expressive to perform. Over time, bachata has evolved from its traditional roots to include more modern influences, but it still retains the passionate, soulful essence that makes it so popular around the world.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Bachata_2.jpg",
      instructors: 0
    },
    {
      name: "Heels",
      description: "Heels dance is a contemporary style performed wearing high heels, combining elements of jazz, hip hop, and commercial choreography. This expressive form emphasizes feminine movements, body awareness, and confidence. Dancers learn to navigate complex choreography while balancing in heels, incorporating graceful arm movements, hair flips, floor work, and powerful poses. Heels dancing has grown in popularity through music videos, performances, and social media, attracting dancers looking to explore sensuality and confidence in their movement. Classes focus on technique, body control, and artistic expression.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Heels_2.png",
      instructors: 0
    },
    {
      name: "Choreo",
      description: "Choreography (Choreo) is the art of designing movement sequences, typically set to music. As a dance style category, it refers to structured dance routines created for performances, videos, or competitions. Unlike improvised social dancing, choreographed routines feature planned formations, transitions, and synchronized movements. Choreography classes teach students to execute specific routines while developing musicality, spatial awareness, and performance quality. This style emphasizes precision, memory, and artistic expression, making it excellent for building discipline and teamwork. Many styles fall under this umbrella, including contemporary, jazz, hip hop, and commercial choreography.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Choreo_2.jpg",
      instructors: 0
    }
  ]);

  const [otherStyles, setOtherStyles] = useState([
    { name: "Hip Hop", count: 0 },
    { name: "Reggaeton", count: 0 },
    { name: "Jazz", count: 0 },
    { name: "Mambo", count: 0 },
    { name: "DJ", count: 0 },
    { name: "Zumba", count: 0 },
    { name: "Zouk", count: 0 },
    { name: "Kizomba", count: 0 },
  ]);

  const fetchInstructorCounts = useCallback(async () => {
    try {
      // Fetch counts for main dance styles
      const updatedDanceStyles = [...danceStyles];
      for (let i = 0; i < updatedDanceStyles.length; i++) {
        const count = await getInstructorCountByStyle(updatedDanceStyles[i].name);
        updatedDanceStyles[i] = { 
          ...updatedDanceStyles[i], 
          instructors: count 
        };
      }
      setDanceStyles(updatedDanceStyles);

      // Fetch counts for other dance styles
      const updatedOtherStyles = [...otherStyles];
      for (let i = 0; i < updatedOtherStyles.length; i++) {
        const count = await getInstructorCountByStyle(updatedOtherStyles[i].name);
        updatedOtherStyles[i] = { 
          ...updatedOtherStyles[i], 
          count 
        };
      }
      setOtherStyles(updatedOtherStyles);
    } catch (error) {
      console.error("Error fetching instructor counts:", error);
    }
  }, [danceStyles, otherStyles]);

  useEffect(() => {
    fetchInstructorCounts();
  }, [fetchInstructorCounts]);

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
            Dance Styles
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Explore the various dance styles taught by our expert instructors
          </p>
        </div>
      </section>

      {/* Dance Styles Descriptions */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="space-y-24">
            {danceStyles.map((style, index) => (
              <div 
                key={style.name} 
                className={`grid gap-12 md:grid-cols-2 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">{style.name}</h2>
                  
                  <div className="md:hidden relative aspect-square rounded-lg overflow-hidden mb-4">
                    <Image 
                      src={style.image} 
                      alt={`${style.name} Dancers`}
                      fill
                      className={`object-cover ${style.name === 'Heels' ? 'object-top' : ''} scale-[1.02]`}
                      sizes="100vw"
                    />
                  </div>
                  
                  <p className="text-gray-500">{style.description}</p>
                  <div className="mt-6">
                    <Link href="/instructors">
                      <Button className="bg-[#F94C8D] hover:bg-[#F94C8D]/90">
                        Find {style.name} Instructors
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className={`relative aspect-square rounded-lg overflow-hidden hidden md:block ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <Image 
                    src={style.image} 
                    alt={`${style.name} Dancers`}
                    fill
                    className={`object-cover ${style.name === 'Heels' ? 'object-top' : ''} scale-[1.02]`}
                    sizes="50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Styles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Other Popular Styles</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherStyles.map((style) => (
              <Link key={style.name} href="/instructors?style=all" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-xl mb-2">{style.name}</h3>
                <p className="text-sm text-gray-500">{style.count} Instructors</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-[#FF7A5A]/10 via-[#FF3366]/10 to-[#9933CC]/10 rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Start Your Dance Journey?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
              Connect with our expert instructors and find the perfect dance style for you
            </p>
            <Link href="/instructors">
              <Button size="lg">
                Find Your Instructor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 