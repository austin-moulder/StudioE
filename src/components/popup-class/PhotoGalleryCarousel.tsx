"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PhotoGalleryCarouselProps = {
  headline: string
  body?: string
  images: readonly string[]
  imageAlt: string
}

export default function PhotoGalleryCarousel({
  headline,
  body,
  images,
  imageAlt,
}: PhotoGalleryCarouselProps) {
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
    <section
      className="border-t border-white/10 px-4 py-12 sm:px-6"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-xl">
        <h2
          id="gallery-heading"
          className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
        >
          {headline}
        </h2>
        {body ? (
          <p className="mx-auto mt-3 max-w-md text-center text-base leading-relaxed text-white/80">
            {body}
          </p>
        ) : null}

        <div className="mt-8 overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {images.map((src, index) => (
              <div key={src} className="min-w-0 shrink-0 grow-0 basis-[78%] pl-3 sm:basis-[66%]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 bg-black/40">
                  <Image
                    src={src}
                    alt={`${imageAlt} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 78vw, 26rem"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 ? (
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => emblaApi?.scrollPrev()}
              className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--popup-accent)]"
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
                    index === selectedIndex
                      ? "bg-[var(--popup-accent)]"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => emblaApi?.scrollNext()}
              className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--popup-accent)]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
