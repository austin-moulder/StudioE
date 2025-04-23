"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { TestimonialCard } from "./TestimonialCard"
import { Testimonial } from "@/types/testimonial"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  variant?: "default" | "compact" | "business"
  showRating?: boolean
  title?: string
  subtitle?: string
}

export function TestimonialCarousel({ 
  testimonials, 
  variant = "default",
  showRating = true,
  title = "What People Say About Us",
  subtitle = "Hear from students who have experienced the Studio E difference"
}: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
      
      emblaApi.on('reInit', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })

      const onSelect = () => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
      }

      emblaApi.on('select', onSelect)
      emblaApi.on('reInit', onSelect)
      onSelect()
    }
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    emblaApi && emblaApi.scrollTo(index)
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext()
  }, [emblaApi])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="mx-auto max-w-3xl relative">
          {/* Mobile Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <TestimonialCard 
                    testimonial={testimonial} 
                    variant={variant}
                    showRating={showRating}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="hidden md:block">
            <Button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-0 -ml-10 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-0 -mr-10 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
          
          {/* Dot indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
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
      </div>
    </section>
  )
} 