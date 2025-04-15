"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, DollarSign, Users, Star, Check } from 'lucide-react'
import { RentalSpace, getFeaturedRentalSpace, getAllRentalSpaces } from '@/lib/supabase/rentalSpacesUtils'
import { getFileUrl } from '@/lib/supabase/supabaseUtils'

export default function FindDanceSpacePage() {
  const [featuredSpace, setFeaturedSpace] = useState<RentalSpace | null>(null)
  const [otherSpaces, setOtherSpaces] = useState<RentalSpace[]>([])
  const [loading, setLoading] = useState(true)

  // Placeholder image for when Supabase images aren't available yet
  const placeholderImage = '/images/placeholder-studio.jpg'

  useEffect(() => {
    async function fetchRentalSpaces() {
      try {
        // Fetch the featured space
        const featured = await getFeaturedRentalSpace()
        setFeaturedSpace(featured)

        // Fetch other spaces
        const spaces = await getAllRentalSpaces(true) // true to exclude the featured space
        setOtherSpaces(spaces)
      } catch (error) {
        console.error('Error fetching rental spaces:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRentalSpaces()
  }, [])

  // Function to get the proper image URL
  const getImageUrl = (path: string) => {
    // If path is already a full URL, return it
    if (path.startsWith('http')) return path
    
    // If path is a Supabase storage path, get the public URL
    if (path.startsWith('studios/')) {
      try {
        return getFileUrl('assetsv1', path)
      } catch (error) {
        console.error('Error getting file URL:', error)
        return placeholderImage
      }
    }
    
    // Return path as is if none of the above
    return path || placeholderImage
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-16">
        <div className="container flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Find Your Perfect Dance Space</h1>
          <p className="mt-6 max-w-2xl text-lg">
            Discover affordable studios and spaces to teach private lessons or group classes
          </p>
        </div>
      </section>

      {/* Featured Space Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-[#F94C8D] mb-2">Featured Space</Badge>
            <h2 className="text-3xl font-bold">Our Top Recommended Space for Instructors</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              This instructor-friendly space offers special rates for Studio E community members and has all the amenities you need to teach successfully.
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-[300px] md:h-full bg-gray-200" />
                <div className="p-6">
                  <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4" />
                  <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-8" />
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-4" />
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-4" />
                  <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-8" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-8 bg-gray-200 rounded-md w-full" />
                    <div className="h-8 bg-gray-200 rounded-md w-full" />
                  </div>
                </div>
              </div>
            </div>
          ) : featuredSpace ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-[300px] md:h-full">
                  <Image 
                    src={getImageUrl(featuredSpace.imageUrl)}
                    alt={featuredSpace.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold">{featuredSpace.name}</h3>
                      <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
                        <span>{featuredSpace.rating}/5</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-2 text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{featuredSpace.address}</span>
                    </div>
                    
                    <p className="mt-4">{featuredSpace.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                        <span><span className="font-bold">${featuredSpace.pricePerHour}</span> / hour</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-blue-600" />
                        <span>Up to <span className="font-bold">{featuredSpace.capacity}</span> people</span>
                      </div>
                      <div className="flex items-center col-span-2">
                        <Clock className="h-5 w-5 mr-2 text-purple-600" />
                        <span>{featuredSpace.availableHours}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Amenities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {featuredSpace.amenities.map((amenity, index) => (
                          <span key={index} className="inline-flex items-center bg-gray-100 px-2.5 py-0.5 rounded-full text-sm text-gray-800">
                            <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <Button 
                      className="bg-[#F94C8D] hover:bg-[#F94C8D]/90"
                      onClick={() => console.log(`Booking ${featuredSpace.name}`)}
                    >
                      Book This Space
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-gray-500">No featured space available at the moment. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Other Spaces Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">More Great Spaces for Teaching</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Explore these additional options for your dance classes and private lessons
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Card key={i} className="overflow-hidden bg-white animate-pulse">
                  <div className="aspect-[3/2] relative bg-gray-200" />
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-4" />
                    <div className="h-4 bg-gray-200 rounded-md w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded-md w-full mb-4" />
                    <div className="h-8 bg-gray-200 rounded-md w-1/3 mt-4 ml-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : otherSpaces.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {otherSpaces.map(space => (
                <Card key={space.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/2] relative">
                    <Image 
                      src={getImageUrl(space.imageUrl)}
                      alt={space.name} 
                      fill 
                      className="object-cover" 
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-3.5 w-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                      {space.rating}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{space.name}</h3>
                    <div className="flex items-start mt-1 text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{space.address}</span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">{space.description}</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                        <span>${space.pricePerHour}/hr</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-blue-600" />
                        <span>Up to {space.capacity}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-1">
                      {space.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="inline-flex items-center bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-800">
                          {amenity}
                        </span>
                      ))}
                      {space.amenities.length > 3 && (
                        <span className="inline-flex items-center bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-800">
                          +{space.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-6 text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => console.log(`Inquiring about ${space.name}`)}
                      >
                        Inquire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-gray-500">No additional spaces available at the moment. Please check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Out of Town Section */}
      <section className="py-12 bg-[#9333EA]/10">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#9333EA]">Coming in from out of town?</h2>
            <p className="mt-2 max-w-xl mx-auto text-gray-600">
              We offer a spacious 3-bedroom, 2-bathroom accommodation with a custom private dance instruction room.
              Ideal for:
            </p>
            <ul className="mt-4 max-w-xl mx-auto text-gray-600 text-left inline-block">
              <li className="flex items-start mb-2">
                <div className="mr-2 h-5 w-5 text-[#9333EA]">✓</div>
                <span>Instructors looking to train without leaving the residence</span>
              </li>
              <li className="flex items-start mb-2">
                <div className="mr-2 h-5 w-5 text-[#9333EA]">✓</div>
                <span>Instructors looking to teach private lessons on-site</span>
              </li>
              <li className="flex items-start mb-2">
                <div className="mr-2 h-5 w-5 text-[#9333EA]">✓</div>
                <span>Performance dance teams (accommodates up to 8 individuals)</span>
              </li>
              <li className="flex items-start mb-2">
                <div className="mr-2 h-5 w-5 text-[#9333EA]">✓</div>
                <span>Dance groups planning a Chicago trip (minutes from all major studios)</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button 
                className="bg-[#9333EA] hover:bg-[#9333EA]/90 text-white"
                onClick={() => {
                  window.location.href = 'mailto:studioelatindance@gmail.com?subject=Out of Town Accommodation Request&body=I\'m interested in the 3B/2B space with dance instruction room. Please send more information.';
                }}
              >
                Request More Information
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Find a Space Through Studio E</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              We make it easy and affordable to find professional teaching spaces
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-[#F94C8D]/10 text-[#F94C8D] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Discounted Rates</h3>
              <p className="text-gray-600">
                Through our partnerships, Studio E instructors receive special rates unavailable to the general public.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-[#9333EA]/10 text-[#9333EA] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pre-Vetted Quality</h3>
              <p className="text-gray-600">
                We personally inspect each space to ensure it meets our standards for quality dance instruction.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-[#FF3366]/10 text-[#FF3366] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Booking</h3>
              <p className="text-gray-600">
                Book by the hour, day, or establish recurring reservations for your regular classes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 