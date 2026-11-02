"use client"

import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import type { ResolvedWorkshop } from "@/lib/workshops/catalog"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

function trackWorkshopReserve(workshop: ResolvedWorkshop) {
  if (typeof window === "undefined") return
  const params = {
    content_name: workshop.title,
    content_category: "workshop",
    content_ids: [workshop.id],
    value: workshop.price,
    currency: "USD",
    outbound_url: workshop.registrationUrl,
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "workshop_reserve_click", ...params })
  window.dataLayer.push({ event: "outbound_click", ...params })
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "WorkshopReserveClick", params)
    window.fbq("track", "InitiateCheckout", params)
  }
}

type WorkshopCardProps = {
  workshop: ResolvedWorkshop
  featured?: boolean
}

export default function WorkshopCard({ workshop, featured = false }: WorkshopCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
        featured ? "border-[#FF3366]/40 ring-1 ring-[#FF3366]/20" : "border-stone-200"
      }`}
    >
      <div className="grid sm:grid-cols-[112px_1fr]">
        <div className="relative aspect-square bg-stone-100 sm:aspect-auto sm:min-h-full">
          <Image
            src={workshop.flyer}
            alt={workshop.flyerAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 112px"
          />
        </div>

        <div className="flex flex-col gap-3 p-4 sm:p-5">
          <div>
            <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF3366]">
              {workshop.style}
            </p>
            <h3 className="mt-1 font-montserrat text-lg font-black leading-snug text-stone-900 sm:text-xl">
              {workshop.title}
            </h3>
          </div>

          <ul className="space-y-1.5 text-sm text-stone-600">
            <li className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
              <span>{workshop.dateLabel}</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
              <span>{workshop.durationLabel}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
              <span>{workshop.locationLabel}</span>
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-stone-600">{workshop.description}</p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="font-montserrat text-2xl font-black text-stone-900">
              ${workshop.price}
              {workshop.capacity ? (
                <span className="ml-2 align-middle text-xs font-semibold uppercase tracking-wide text-stone-400">
                  Cap {workshop.capacity}
                </span>
              ) : null}
            </p>
            <a
              href={workshop.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWorkshopReserve(workshop)}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-4 py-2.5 font-montserrat text-xs font-black uppercase tracking-wide text-white shadow-md shadow-[#FF3366]/25 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2"
            >
              Reserve My Spot
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
