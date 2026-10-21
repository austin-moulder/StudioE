"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type MerchGalleryProps = {
  images: readonly string[]
  imageAlt: string
}

export default function MerchGallery({ images, imageAlt }: MerchGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" })
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
    if (!emblaApi || images.length < 2) return
    const id = window.setInterval(() => emblaApi.scrollNext(), 3800)
    return () => window.clearInterval(id)
  }, [emblaApi, images.length])

  if (images.length === 0) return null

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div key={src} className="min-w-0 shrink-0 grow-0 basis-[78%] pl-3 sm:basis-[42%] lg:basis-[30%]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200">
                <Image
                  src={src}
                  alt={`${imageAlt} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 78vw, 30vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => emblaApi?.scrollPrev()}
          className="rounded-full border border-stone-300 bg-white p-2 text-stone-900 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div className="flex items-center gap-1.5">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to photo ${index + 1}`}
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
          aria-label="Next photo"
          onClick={() => emblaApi?.scrollNext()}
          className="rounded-full border border-stone-300 bg-white p-2 text-stone-900 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
