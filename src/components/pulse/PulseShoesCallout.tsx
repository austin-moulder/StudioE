"use client"

import Image from "next/image"
import Link from "next/link"
import {
  DISCLOSURE,
  PULSE_DISCOUNT_CODE,
  PULSE_PAGE_PATH,
  PULSE_PARTNERSHIP_PHOTO,
  getPulseAffiliateUrl,
  type PulseCtaPlacement,
} from "@/lib/pulse/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

function trackPulseClick(placement: PulseCtaPlacement) {
  if (typeof window === "undefined") return
  const params = {
    content_name: "Pulse Dance Shoes",
    content_category: "affiliate",
    placement,
    outbound_url: getPulseAffiliateUrl(placement),
  }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: "pulse_cta_click", ...params })
  window.dataLayer.push({ event: "outbound_click", ...params })
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "PulseCTAClick", params)
    window.fbq("track", "Lead", params)
  }
}

type PulseShoesCalloutProps = {
  placement: Extract<PulseCtaPlacement, "merch_callout" | "newmember_callout">
  className?: string
}

export default function PulseShoesCallout({ placement, className = "" }: PulseShoesCalloutProps) {
  const href = getPulseAffiliateUrl(placement)

  return (
    <aside
      className={`overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm ${className}`}
      aria-labelledby={`pulse-callout-${placement}`}
    >
      <div className="grid sm:grid-cols-[140px_1fr]">
        <div className="relative aspect-[4/3] bg-stone-100 sm:aspect-auto sm:min-h-[140px]">
          <Image
            src={PULSE_PARTNERSHIP_PHOTO}
            alt="Studio E partnership with Pulse Dance Shoes"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 140px"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 p-4 sm:p-5">
          <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF3366]">
            Looking for dance shoes?
          </p>
          <h3
            id={`pulse-callout-${placement}`}
            className="font-montserrat text-base font-black leading-snug text-stone-900 sm:text-lg"
          >
            Pulse — the shoes Studio E recommends
          </h3>
          <p className="text-sm leading-relaxed text-stone-600">
            Comfortable Latin dance sneakers for beginners and social dancers. Use code{" "}
            <span className="font-semibold text-stone-900">{PULSE_DISCOUNT_CODE}</span> at checkout.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackPulseClick(placement)}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-4 py-2.5 font-montserrat text-xs font-black uppercase tracking-wide text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2"
            >
              Shop Pulse Dance Shoes
            </a>
            <Link
              href={PULSE_PAGE_PATH}
              className="font-montserrat text-xs font-semibold text-[#FF3366] underline-offset-2 hover:underline"
            >
              Why we recommend them
            </Link>
          </div>
          <p className="text-[11px] leading-snug text-stone-400">{DISCLOSURE}</p>
        </div>
      </div>
    </aside>
  )
}
