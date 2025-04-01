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

interface Instructor {
  id: string;
  name: string;
  image: string;
  specialty: string;
}

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState("");
  const [danceStyleImages, setDanceStyleImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [danceStyleEmblaRef, danceStyleEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedDanceStyleIndex, setSelectedDanceStyleIndex] = useState(0);
  const [instructorsEmblaRef, instructorsEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedInstructorIndex, setSelectedInstructorIndex] = useState(0);
  const [blogEmblaRef, blogEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedBlogIndex, setSelectedBlogIndex] = useState(0);

  const instructors: Instructor[] = [
    {
      id: "jocelyn-v",
      name: "Jocelyn V.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Jocelyn.png",
      specialty: "Heels & Reggaeton"
    },
    {
      id: "del-d",
      name: "Del D.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Del_1.png",
      specialty: "Salsa & Social Dancing"
    },
    {
      id: "brian-m",
      name: "Brian M.",
      image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Brian.jpeg",
      specialty: "Bachata & Sensual"
    }
  ];

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

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    if (danceStyleEmblaApi) {
      danceStyleEmblaApi.on('select', () => {
        setSelectedDanceStyleIndex(danceStyleEmblaApi.selectedScrollSnap());
      });
    }
  }, [danceStyleEmblaApi]);

  useEffect(() => {
    if (instructorsEmblaApi) {
      instructorsEmblaApi.on('select', () => {
        setSelectedInstructorIndex(instructorsEmblaApi.selectedScrollSnap());
      });
    }
  }, [instructorsEmblaApi]);

  useEffect(() => {
    if (blogEmblaApi) {
      blogEmblaApi.on('select', () => {
        setSelectedBlogIndex(blogEmblaApi.selectedScrollSnap());
      });
    }
  }, [blogEmblaApi]);

  const scrollTo = useCallback((index: number) => {
    emblaApi && emblaApi.scrollTo(index);
  }, [emblaApi]);

  const scrollToDanceStyle = useCallback((index: number) => {
    danceStyleEmblaApi && danceStyleEmblaApi.scrollTo(index);
  }, [danceStyleEmblaApi]);

  const scrollToInstructor = useCallback((index: number) => {
    instructorsEmblaApi && instructorsEmblaApi.scrollTo(index);
  }, [instructorsEmblaApi]);

  const scrollToBlog = useCallback((index: number) => {
    blogEmblaApi && blogEmblaApi.scrollTo(index);
  }, [blogEmblaApi]);

  const handleSearch = () => {
    if (selectedStyle) {
      router.push(`/instructors?style=${selectedStyle}`);
    } else {
      router.push("/instructors");
    }
  };

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

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={danceStyleEmblaRef}>
              <div className="flex">
                {[
                  { name: "Salsa", count: 24 },
                  { name: "Bachata", count: 18 },
                  { name: "Heels", count: 15 },
                  { name: "Choreo", count: 20 },
                ].map((style, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <Link 
                      href={`/instructors?style=${style.name.toLowerCase()}`} 
                      className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300 mx-2"
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
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToDanceStyle(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedDanceStyleIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to dance style ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={instructorsEmblaRef}>
              <div className="flex">
                {instructors.map((instructor, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="flex flex-col items-center text-center mx-2">
                      <div className="relative h-48 w-48 overflow-hidden rounded-full">
                        <Image
                          src={instructor.image}
                          alt={instructor.name}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <h3 className="mt-6 text-xl font-bold">{instructor.name}</h3>
                      <p className="text-[#FF3366]">{instructor.specialty}</p>
                      <div className="flex justify-center gap-2 mt-4">
                        <Link href={`/instructors/${instructor.id}`}>
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </Link>
                        <Link href={`/instructors/${instructor.id}?tab=book`}>
                          <Button size="sm">Book Now</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2].map((index) => (
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
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Link 
                key={instructor.name} 
                href={`/instructors?style=${instructor.style.toLowerCase()}`} 
                className="group relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  {instructor.image !== "/placeholder.svg" ? (
                    <>
                      <Image
                        src={instructor.image}
                        alt={`${instructor.name} profile photo`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{instructor.name}</h3>
                        <p className="text-sm">{instructor.style}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">{instructor.name}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold">{instructor.name}</h3>
                        <p className="text-sm">{instructor.style}</p>
                      </div>
                    </>
                  )}
                </div>
              </Link>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our community of dancers who have transformed their lives through dance
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
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
                    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Briana_Hall.jpeg",
                    style: "Bachata",
                  },
                  {
                    name: "Brandon Hampton",
                    quote:
                      "Austin is a creative entrepreneur at his core because he utilizes both out-of-the-box and practical methods for teaching, so that everyone regardless of their learning preference will fully grasp the lesson.",
                    image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Brandon_Hampton.png",
                    style: "Latin Dance",
                  },
                ].map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="bg-white rounded-lg shadow-lg p-6 mx-2">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500">{testimonial.style} Student</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
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
                  image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Briana_Hall.jpeg",
                  style: "Bachata",
                },
                {
                  name: "Brandon Hampton",
                  quote:
                    "Austin is a creative entrepreneur at his core because he utilizes both out-of-the-box and practical methods for teaching, so that everyone regardless of their learning preference will fully grasp the lesson.",
                  image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Brandon_Hampton.png",
                  style: "Latin Dance",
                },
              ].map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Briana_Hall.jpeg",
                style: "Bachata",
              },
              {
                name: "Brandon Hampton",
                quote:
                  "Austin is a creative entrepreneur at his core because he utilizes both out-of-the-box and practical methods for teaching, so that everyone regardless of their learning preference will fully grasp the lesson.",
                image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Brandon_Hampton.png",
                style: "Latin Dance",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.style} Student</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-8 md:py-24">
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
                    <Link href="https://open.spotify.com/episode/4bDxnq1c7OASVESYIU2EU3?si=1d292bc6e0bf4d2a" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3366]">
                      Eda Kachiri: Unleashing Passion in Your Dance Growing Your City
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-[#FF3366] font-semibold">
                      9
                    </div>
                    <Link href="https://open.spotify.com/episode/63vAHHJvfRiHNrUQ3OmnRK?si=bd6895e091614d01" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3366]">
                      B-Mac: Becoming an International Bachata Sensual Ambassador
                    </Link>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-[#FF3366] font-semibold">
                      8
                    </div>
                    <Link href="https://open.spotify.com/episode/3DxiwclbTdxcbTpgJ5jvUU?si=cbb7cc9e69864cdd" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF3366]">
                      The Harrison Twins: Fighting the Urge to Compare in Social Dance
                    </Link>
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

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <div className="overflow-hidden" ref={blogEmblaRef}>
              <div className="flex">
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
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <Card className="mx-2 overflow-hidden">
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
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollToBlog(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedBlogIndex === index ? 'bg-[#FF3366] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to blog post ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
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
              </div>
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
