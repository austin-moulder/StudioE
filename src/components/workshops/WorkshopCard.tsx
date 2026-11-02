"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
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
    landing_path: workshop.landingPath,
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "workshop_reserve_click", ...params })
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "WorkshopReserveClick", params)
    window.fbq("track", "Lead", params)
  }
}

type WorkshopCardProps = {
  workshop: ResolvedWorkshop
  featured?: boolean
  /** Tighter padding for carousel slides */
  compact?: boolean
}

export default function WorkshopCard({
  workshop,
  featured = false,
  compact = false,
}: WorkshopCardProps) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
        featured ? "border-2 border-[#FF3366]" : "border-stone-200"
      }`}
    >
      <div className="relative aspect-square bg-stone-100">
        <Image
          src={workshop.flyer}
          alt={workshop.flyerAlt}
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 280px"
        />
        {featured ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#FF3366] px-3 py-0.5 font-montserrat text-[10px] font-bold uppercase tracking-wide text-white">
            Next up
          </span>
        ) : null}
      </div>

      <div className={`flex flex-1 flex-col gap-2.5 ${compact ? "p-3.5" : "p-4"}`}>
        <div>
          <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF3366]">
            {workshop.style}
          </p>
          <h3 className="mt-1 font-montserrat text-lg font-black leading-snug text-stone-900 line-clamp-2">
            {workshop.title}
          </h3>
        </div>

        <ul className="space-y-1.5 text-xs text-stone-600 sm:text-sm">
          <li className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-[#FF3366]" aria-hidden />
            <span>{workshop.dateLabel}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[#FF3366]" aria-hidden />
            <span>{workshop.durationLabel}</span>
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FF3366]" aria-hidden />
            <span className="line-clamp-1">{workshop.locationLabel}</span>
          </li>
        </ul>

        <p className="text-xs leading-relaxed text-stone-600 line-clamp-3 sm:text-sm">
          {workshop.description}
        </p>

        {workshop.includesFriendFree ? (
          <p className="flex items-start gap-1.5 text-xs font-semibold text-stone-800">
            <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF3366]" aria-hidden />
            ${workshop.price} includes 1 additional friend free
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div>
            <p className="font-montserrat text-xl font-black text-stone-900">${workshop.price}</p>
            {workshop.capacity ? (
              <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">
                Cap {workshop.capacity}
              </p>
            ) : null}
          </div>
          <Link
            href={workshop.landingPath}
            onClick={() => trackWorkshopReserve(workshop)}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-4 py-2.5 font-montserrat text-xs font-black uppercase tracking-wide text-white shadow-md shadow-[#FF3366]/25 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2"
          >
            Reserve My Spot
          </Link>
        </div>
      </div>
    </article>
  )
}
