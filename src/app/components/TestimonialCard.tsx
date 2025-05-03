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

// Helper function to determine if a name is likely male or female
function getDefaultImageByName(name: string): string {
  // Common male names that start with these letters are more likely to be male
  const maleFirstLetters = ['j', 'r', 'd', 'm', 'b', 'c', 'p', 'g', 'a', 't', 'k', 'w', 'n', 'h', 'f'];
  
  // Get first name (in case of full names)
  const firstName = name.split(' ')[0].toLowerCase();
  
  // Default male image
  const maleImage = "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/John_Doe.png";
  
  // Default female image
  const femaleImage = "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Briana_Hall.jpeg";
  
  // Names ending with these are more likely to be female
  if (firstName.endsWith('a') || 
      firstName.endsWith('e') || 
      firstName.endsWith('i') || 
      firstName.endsWith('y') ||
      firstName.includes('ann') ||
      firstName.includes('mary') ||
      firstName.includes('elle') ||
      firstName.includes('lisa') ||
      firstName.includes('sara') ||
      firstName.includes('emma')) {
    return femaleImage;
  }
  
  // Check first letter against common male first letters
  const firstLetter = firstName.charAt(0);
  if (maleFirstLetters.includes(firstLetter)) {
    return maleImage;
  }
  
  // Default to male if unsure
  return maleImage;
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

  // Get default image based on name if no image_url is provided
  const defaultImage = getDefaultImageByName(name);

  // For compact view
  if (variant === "compact") {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mx-2">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            {image_url && image_url !== "/placeholder.svg" ? (
              <Image
                src={image_url}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={defaultImage}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
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
        <div className="relative h-24 w-24 overflow-hidden rounded-full flex-shrink-0">
          {image_url && image_url !== "/placeholder.svg" ? (
            <Image 
              src={image_url} 
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <Image 
              src={defaultImage} 
              alt={name}
              fill
              className="object-cover"
            />
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