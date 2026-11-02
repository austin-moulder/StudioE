"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Footprints, Sparkles } from "lucide-react"
import {
  BENEFITS,
  CHALLENGE_PATH,
  DISCLOSURE,
  MARCUS_QUOTE,
  PULSE_DISCOUNT_CODE,
  PULSE_PARTNERSHIP_PHOTO,
  WHY_RECOMMENDS,
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

const primaryCtaClass =
  "inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.3)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

function ShopCta({
  placement,
  className = "",
}: {
  placement: PulseCtaPlacement
  className?: string
}) {
  return (
    <a
      href={getPulseAffiliateUrl(placement)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      onClick={() => trackPulseClick(placement)}
      className={`${primaryCtaClass} ${className}`}
    >
      Shop Pulse Dance Shoes
      <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
    </a>
  )
}

export default function PulseClient() {
  return (
    <div className="min-h-screen scroll-smooth bg-[#FAF8F6] text-stone-900 antialiased">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#8B1538] to-[#9933CC] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,122,90,0.28),_transparent_55%)]" />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
              <Footprints className="h-3.5 w-3.5 text-[#FF7A5A]" aria-hidden />
              Recommended by Studio E
            </p>
            <h1 className="mt-5 font-montserrat text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Dance With More Confidence From Your First Class
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Get the comfortable, flexible dance shoes we recommend for Studio E Salsa and Bachata
              students.
            </p>
            <div className="mt-8">
              <ShopCta placement="pulse_hero" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#FF7A5A]">
              Use code {PULSE_DISCOUNT_CODE} at checkout for your Studio E discount.
            </p>
            <p className="mt-3 max-w-md text-xs leading-relaxed text-white/65">{DISCLOSURE}</p>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/15 shadow-2xl lg:max-w-none">
            <Image
              src={PULSE_PARTNERSHIP_PHOTO}
              alt="Studio E instructors with Pulse Dance Shoes partnership"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
          </div>
        </div>
      </header>

      {/* Benefits */}
      <section className="px-5 py-14 sm:px-8 sm:py-16" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="benefits-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            Built for how Latin dancers move
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-stone-600">
            Simple upgrades that help beginners and social dancers feel better on the floor.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm"
              >
                <h3 className="font-montserrat text-base font-bold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ShopCta placement="pulse_mid" />
          </div>
        </div>
      </section>

      {/* Why Studio E recommends */}
      <section className="border-y border-stone-200/80 bg-white px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-center font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
            From our floors in Humboldt Park
          </p>
          <h2 className="mt-3 text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Why Studio E Recommends Them
          </h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {WHY_RECOMMENDS.map((item, index) => (
              <li key={item.title} className="text-center md:text-left">
                <span className="font-montserrat text-sm font-bold text-[#FF3366]">
                  0{index + 1}
                </span>
                <h3 className="mt-2 font-montserrat text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Marcus Aurelius — dance in any shoes */}
      <section className="bg-[#1a1a2e] px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={PULSE_PARTNERSHIP_PHOTO}
              alt="Studio E and Pulse Dance Shoes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 360px"
            />
          </div>
          <blockquote>
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              How we think about shoes at Studio E
            </p>
            <p className="mt-4 font-montserrat text-xl font-bold leading-snug sm:text-2xl">
              “{MARCUS_QUOTE.text}”
            </p>
            <footer className="mt-4 text-sm text-white/70">— {MARCUS_QUOTE.attribution}</footer>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/85">
              {MARCUS_QUOTE.studioNote}
            </p>
          </blockquote>
        </div>
      </section>

      {/* Discount reminder */}
      <section className="border-b border-stone-200/80 bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left">
          <Sparkles className="h-5 w-5 text-[#FF3366]" aria-hidden />
          <p className="text-sm text-stone-700 sm:text-base">
            Studio E discount: enter{" "}
            <span className="font-montserrat font-black text-[#FF3366]">{PULSE_DISCOUNT_CODE}</span>{" "}
            at Pulse checkout.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Ready to feel more comfortable on the dance floor?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/90">
            Shop Pulse through Studio E’s link and use code {PULSE_DISCOUNT_CODE} at checkout.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={getPulseAffiliateUrl("pulse_final")}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackPulseClick("pulse_final")}
              className="inline-flex w-full max-w-md items-center justify-center rounded-2xl border-2 border-white bg-white px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] sm:text-base"
            >
              Shop Pulse Dance Shoes
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
            </a>
          </div>
          <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-white/75">{DISCLOSURE}</p>
        </div>
      </section>

      {/* Studio E next steps */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl">
            Keep dancing with Studio E
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-stone-600">
            New to Latin dance? Start with our 28-Day Latin Dance Confidence Challenge—or head back
            to the Studio E home page.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={CHALLENGE_PATH}
              className="inline-flex w-full max-w-xs items-center justify-center rounded-2xl bg-[#1a1a2e] px-6 py-3.5 font-montserrat text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#2a2a3e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1a2e] focus-visible:ring-offset-2"
            >
              Join the 28-Day Challenge
            </Link>
            <Link
              href="/"
              className="inline-flex w-full max-w-xs items-center justify-center font-montserrat text-sm font-bold text-[#FF3366] underline-offset-4 hover:underline"
            >
              Back to joinstudioe.com
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
