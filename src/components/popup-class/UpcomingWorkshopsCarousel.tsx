"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  formatEventDateLabel,
  getUpcomingEventStartMs,
} from "@/lib/popup-class/event-time"
import { POPUP_WORKSHOP_CARDS } from "@/lib/popup-class/workshops"

type Lang = "en" | "es"

type UpcomingWorkshopsCarouselProps = {
  currentId: string
  lang?: Lang
  headline?: string
  ctaLabel?: string
}

export default function UpcomingWorkshopsCarousel({
  currentId,
  lang = "en",
  headline = "More Upcoming Workshops",
  ctaLabel = "View class",
}: UpcomingWorkshopsCarouselProps) {
  const locale = lang === "es" ? "es-MX" : "en-US"

  const cards = useMemo(() => {
    const now = new Date()
    return POPUP_WORKSHOP_CARDS.filter((card) => card.id !== currentId)
      .map((card) => {
        const startMs = getUpcomingEventStartMs(card.schedule, now)
        return {
          ...card,
          startMs,
          dateLabel: formatEventDateLabel(startMs, card.schedule.timeZone, locale),
          title: lang === "es" && card.nameEs ? card.nameEs : card.name,
          timeLabel:
            lang === "es" && card.durationLabelEs
              ? card.durationLabelEs
              : card.durationLabel,
        }
      })
      .sort((a, b) => a.startMs - b.startMs)
  }, [currentId, lang, locale])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
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
    if (!emblaApi || cards.length < 2) return
    const id = window.setInterval(() => {
      emblaApi.scrollNext()
    }, 4200)
    return () => window.clearInterval(id)
  }, [emblaApi, cards.length])

  if (cards.length === 0) return null

  return (
    <section
      className="border-t border-white/10 bg-[var(--popup-bg)] px-4 py-12 sm:px-6"
      aria-labelledby="upcoming-workshops-heading"
    >
      <div className="mx-auto max-w-xl">
        <h2
          id="upcoming-workshops-heading"
          className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
        >
          {headline}
        </h2>

        <div className="relative mt-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="min-w-0 shrink-0 grow-0 basis-[82%] pl-3 first:pl-0 sm:basis-[70%]"
                >
                  <Link
                    href={card.href}
                    className="group block overflow-hidden rounded-2xl border border-white/15 bg-white/5 transition hover:border-[color-mix(in_srgb,var(--popup-accent)_55%,transparent)] hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--popup-accent)]"
                  >
                    <div className="relative aspect-square overflow-hidden bg-black/40">
                      <Image
                        src={card.flyer}
                        alt={card.flyerAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 82vw, 28rem"
                      />
                    </div>
                    <div className="space-y-1 px-4 py-4">
                      <p className="font-montserrat text-base font-black text-white">
                        {card.title}
                      </p>
                      <p className="text-sm font-semibold text-[var(--popup-soft)]">
                        {card.dateLabel}
                      </p>
                      <p className="text-sm text-white/75">{card.timeLabel}</p>
                      <p className="pt-2 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-[var(--popup-accent)]">
                        {ctaLabel} →
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {cards.length > 1 ? (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Previous workshop"
                onClick={() => emblaApi?.scrollPrev()}
                className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--popup-accent)]"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <div className="flex items-center gap-1.5">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    type="button"
                    aria-label={`Go to ${card.title}`}
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
                aria-label="Next workshop"
                onClick={() => emblaApi?.scrollNext()}
                className="rounded-full border border-white/20 bg-white/5 p-2 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--popup-accent)]"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
