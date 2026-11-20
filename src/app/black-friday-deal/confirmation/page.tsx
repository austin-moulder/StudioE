"use client"

import Link from "next/link"
import { useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import {
  CHECKOUT_PROMO_PARAMS,
  CONFIRMATION,
  COPY,
  PRICING,
  STAFF_PROMO_TAG,
  VENUE,
} from "@/lib/black-friday-deal/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

const REDEMPTION_KEY = "studioe_bf_bogo_redemption_v1"

export default function BlackFridayConfirmationPage() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "Purchase",
      content_name: COPY.offerName,
      content_category: "membership_promo",
      value: PRICING.goldRate,
      currency: "USD",
      promo: "black_friday_bogo",
      tag: STAFF_PROMO_TAG,
    })
    window.dataLayer.push({
      event: "BF_PromoRedemption",
      tag: STAFF_PROMO_TAG,
      offer: CHECKOUT_PROMO_PARAMS.offer,
    })
    if (typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        value: PRICING.goldRate,
        currency: "USD",
        content_name: COPY.offerName,
        content_ids: ["black_friday_bogo_gold"],
      })
      window.fbq("trackCustom", "BF_PromoRedemption", {
        tag: STAFF_PROMO_TAG,
      })
    }
    try {
      window.localStorage.setItem(
        REDEMPTION_KEY,
        JSON.stringify({
          tag: STAFF_PROMO_TAG,
          redeemedAt: new Date().toISOString(),
          offer: "black_friday_bogo_month",
        })
      )
    } catch {
      /* ignore */
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0B0F] px-4 py-12 text-white antialiased sm:px-6">
      <div className="mx-auto max-w-lg">
        <div className="flex justify-center">
          <Link href="/" aria-label="Studio E home">
            <StudioELogo width={48} height={48} alt="Studio E" className="h-12 w-12" />
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-[#FFD166]/30 bg-[#121018] px-6 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#FFD166]" aria-hidden />
          <p className="mt-4 font-montserrat text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF7A5A]">
            Black Friday BOGO
          </p>
          <h1 className="mt-2 font-montserrat text-2xl font-black tracking-tight sm:text-3xl">
            {CONFIRMATION.headline}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/80">
            {CONFIRMATION.body}
          </p>

          <div className="mt-6 rounded-2xl border border-[#FF3366]/35 bg-[#FF3366]/10 px-4 py-3">
            <p className="font-montserrat text-xs font-black uppercase tracking-[0.16em] text-[#FFD166]">
              Free 28-day credit
            </p>
            <p className="mt-1 text-sm text-white/85">
              Your next Gold Plan cycle is credited at 100% off automatically. This is a studio
              credit, not cash value.
            </p>
          </div>

          <ol className="mt-8 space-y-3 text-left">
            {CONFIRMATION.nextSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-white/75">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-xs font-black text-white">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          <p className="mt-8 rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-[11px] text-white/50">
            {CONFIRMATION.staffNote}
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-white/50">
          <p className="font-montserrat font-bold text-white/70">{VENUE.name}</p>
          <p className="mt-1">
            {VENUE.addressLine}, {VENUE.cityLine}
          </p>
          <p className="mt-1">
            <a href={`mailto:${VENUE.email}`} className="underline">
              {VENUE.email}
            </a>
            {" · "}
            <a href={`tel:${VENUE.phoneTel}`} className="underline">
              {VENUE.phone}
            </a>
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/privacy" className="underline">
              Privacy
            </Link>
            <Link href="/terms" className="underline">
              Terms / Cancellation
            </Link>
            <Link href="/black-friday-deal" className="underline">
              Back to offer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
