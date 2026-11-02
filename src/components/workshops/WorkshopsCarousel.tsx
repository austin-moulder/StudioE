"use client"

import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import WorkshopCard from "@/components/workshops/WorkshopCard"
import type { ResolvedWorkshop } from "@/lib/workshops/catalog"

type WorkshopsCarouselProps = {
  workshops: ResolvedWorkshop[]
}

export default function WorkshopsCarousel({ workshops }: WorkshopsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: workshops.length > 1,
    align: "start",
    skipSnaps: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || workshops.length < 2) return
    const id = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 4500)
    return () => window.clearInterval(id)
  }, [emblaApi, workshops.length])

  if (workshops.length === 0) return null

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {workshops.map((workshop, index) => (
            <div
              key={workshop.id}
              className="min-w-0 shrink-0 grow-0 basis-[85%] pl-3 first:pl-0 sm:basis-[55%] md:basis-[42%]"
            >
              <WorkshopCard workshop={workshop} featured={index === 0} compact />
            </div>
          ))}
        </div>
      </div>

      {workshops.length > 1 ? (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous workshop"
            onClick={() => emblaApi?.scrollPrev()}
            className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <div className="flex items-center gap-1.5">
            {workshops.map((workshop, index) => (
              <button
                key={workshop.id}
                type="button"
                aria-label={`Go to ${workshop.title}`}
                aria-current={index === selectedIndex}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition ${
                  index === selectedIndex ? "bg-[#FF3366]" : "bg-stone-300 hover:bg-stone-400"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next workshop"
            onClick={() => emblaApi?.scrollNext()}
            className="rounded-full border border-stone-200 bg-white p-2 text-stone-700 shadow-sm transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  )
}
