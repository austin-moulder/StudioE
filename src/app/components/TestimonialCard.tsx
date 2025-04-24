"use client"

import Image from "next/image"
import { Testimonial } from "@/types/testimonial"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  testimonial: Testimonial
  variant?: "default" | "compact" | "business"
  showRating?: boolean
}

export function TestimonialCard({ 
  testimonial, 
  variant = "default",
  showRating = true
}: TestimonialCardProps) {
  const { name, quote, style, type, image_url, rating = 5 } = testimonial
  
  // For business testimonials
  if (variant === "business") {
    return (
      <Card className="p-6">
        <div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            {type && <p className="text-sm text-muted-foreground">{type}</p>}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground">"{quote}"</p>
        </div>
      </Card>
    )
  }

  // For compact view
  if (variant === "compact") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mx-2">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
            {image_url && image_url !== "/placeholder.svg" ? (
              <Image
                src={image_url}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center w-full h-full text-gray-400 text-xs">{name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            {style && <p className="text-sm text-gray-500">{style} Student</p>}
            {type && <p className="text-sm text-gray-500">{type}</p>}
          </div>
        </div>
        <p className="text-gray-600 italic mb-4">"{quote}"</p>
        {showRating && (
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Default view
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-8 mx-2">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center">
          {image_url && image_url !== "/placeholder.svg" ? (
            <Image 
              src={image_url} 
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-gray-400 text-xs">{name.charAt(0)}</span>
          )}
        </div>
        <div>
          <blockquote className="italic text-lg text-gray-500">
            "{quote}"
          </blockquote>
          <footer className="mt-4 font-medium text-base not-italic">
            — {name}
            {style && <span className="text-sm text-gray-500 ml-2">({style} Student)</span>}
            {type && <span className="text-sm text-gray-500 ml-2">({type})</span>}
          </footer>
        </div>
      </div>
    </div>
  )
} 