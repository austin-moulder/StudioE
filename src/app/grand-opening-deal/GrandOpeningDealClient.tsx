"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Check, ChevronDown, MapPin, Star } from "lucide-react"
import PhotoGalleryCarousel from "@/components/popup-class/PhotoGalleryCarousel"
import { getCountdownParts, type CountdownParts } from "@/lib/popup-class/event-time"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import {
  COPY,
  DEAL,
  FAQS,
  INCLUDES,
  OFFER_ENDS_MS,
  PHOTOS,
  SCHEDULE_IMAGE,
  STEPS,
  UTM,
} from "@/lib/grand-opening-deal/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

function trackMeta(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: eventName, ...params })
  if (typeof window.fbq === "function") {
    window.fbq("track", eventName, params)
  }
}

const ctaClass =
  "mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1410] sm:text-base"

function OfferCountdown({ parts, ended }: { parts: CountdownParts; ended: boolean }) {
  if (ended) {
    return <p className="font-montserrat text-lg font-black text-[#FF3366]">{COPY.offerEnded}</p>
  }
  const units: [string, number][] = [
    ["Days", parts.days],
    ["Hrs", parts.hours],
    ["Min", parts.minutes],
    ["Sec", parts.seconds],
  ]
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" aria-live="polite">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[4.25rem] rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-center"
        >
          <p className="font-montserrat text-2xl font-black tabular-nums text-white">
            {String(value).padStart(2, "0")}
          </p>
          <p className="mt-0.5 font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function GrandOpeningDealClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [parts, setParts] = useState<CountdownParts>(() => getCountdownParts(OFFER_ENDS_MS))
  const [ended, setEnded] = useState(false)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: DEAL.name,
      content_category: "offer",
      value: DEAL.price,
      currency: "USD",
    })
    setCheckoutSrc(buildPopupCheckoutUrl(DEAL.checkoutUrl, UTM, { placement: "embed" }))
  }, [])

  useEffect(() => {
    const tick = () => {
      const next = getCountdownParts(OFFER_ENDS_MS)
      setParts(next)
      setEnded(next.totalMs <= 0)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const goCheckout = useCallback((placement: string) => {
    if (Date.now() >= OFFER_ENDS_MS) return
    trackMeta("InitiateCheckout", {
      content_name: DEAL.name,
      value: DEAL.price,
      currency: "USD",
      placement,
    })
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <div
      className="min-h-screen scroll-smooth bg-[#1C1410] pb-24 text-white antialiased sm:pb-0"
      style={{ ["--popup-accent" as string]: "#FF3366" }}
    >
      <section className="bg-[#F7F1E8] px-4 py-8 text-stone-900 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B1538]">
            {COPY.reviewEyebrow}
          </p>
          <h2 className="mt-2 font-montserrat text-2xl font-black tracking-tight text-[#1C1410] sm:text-3xl">
            {COPY.reviewHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-stone-700">
            {COPY.reviewBody}
          </p>
          <a
            href={DEAL.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1C1410] px-6 py-3.5 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] transition hover:bg-black"
          >
            <Star className="h-4 w-4 fill-[#FF3366]" aria-hidden />
            {COPY.reviewCta}
          </a>
        </div>
      </section>

      <header className="relative isolate overflow-hidden">
        <Image
          src={PHOTOS[0]}
          alt="Studio E dancers together on the floor"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1410]/70 via-[#1C1410]/80 to-[#1C1410]" />
        <div className="relative mx-auto max-w-xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16">
          <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF3366]">
            {COPY.heroEyebrow} · {DEAL.neighborhood}
          </p>
          <h1 className="mt-3 text-center font-montserrat text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-white/85 sm:text-lg">
            {COPY.heroSubheadline}
          </p>

          <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-[#FF3366]/40 bg-black/40 px-5 py-5 text-center">
            <p className="font-montserrat text-2xl font-bold text-white/40 line-through">
              ${DEAL.regularPrice}
            </p>
            <p className="font-montserrat text-6xl font-black text-[#FF7A5A]">${DEAL.price}</p>
            <p className="mt-1 text-sm text-white/80">2 weeks of unlimited classes</p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {COPY.newMemberNote}
            </p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-white/75">
              <MapPin className="h-3.5 w-3.5 text-[#FF3366]" aria-hidden />
              {DEAL.addressLine}, {DEAL.cityLine}
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              {COPY.offerEndsLabel}
            </p>
            <OfferCountdown parts={parts} ended={ended} />
            <p className="mt-3 text-sm text-white/70">Saturday, October 24 · 11:59 PM</p>
          </div>

          <div className="mt-8">
            {ended ? (
              <p className="text-center font-montserrat text-sm font-bold text-[#FF3366]">
                {COPY.offerEnded}
              </p>
            ) : (
              <button type="button" onClick={() => goCheckout("hero")} className={ctaClass}>
                {COPY.primaryCta}
              </button>
            )}
          </div>
        </div>
      </header>

      <PhotoGalleryCarousel
        headline={COPY.galleryHeadline}
        body={COPY.galleryBody}
        images={PHOTOS}
        imageAlt="Studio E community dancing together"
      />

      <section className="border-t border-white/10 px-4 py-14 sm:px-6" aria-labelledby="includes-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="includes-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.includesHeadline}
          </h2>
          <ul className="mt-8 space-y-3">
            {INCLUDES.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                <span className="text-base leading-snug text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#14100E] px-4 py-14 sm:px-6" aria-labelledby="how-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="how-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.howHeadline}
          </h2>
          <ol className="mt-8 space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-montserrat text-base font-black">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 sm:px-6" aria-labelledby="schedule-heading">
        <div className="mx-auto max-w-md">
          <h2
            id="schedule-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.scheduleHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-center text-base text-white/75">{COPY.scheduleBody}</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white">
            <Image
              src={SCHEDULE_IMAGE}
              alt="Studio E November class schedule"
              width={2550}
              height={3300}
              className="h-auto w-full"
              sizes="(max-width: 640px) 100vw, 28rem"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-14 sm:px-6" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2 id="faq-heading" className="mb-8 text-center font-montserrat text-3xl font-black sm:text-4xl">
            FAQ
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((item, index) => {
              const open = openFaq === index
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-3 py-4 text-left"
                    >
                      <span className="font-montserrat text-sm font-bold sm:text-base">{item.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#FF3366] transition ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  {open ? (
                    <p className="pb-4 text-sm leading-relaxed text-white/75">{item.answer}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-gradient-to-br from-[#FF3366] via-[#8B1538] to-[#1C1410] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">{COPY.finalHeadline}</h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">{COPY.finalBody}</p>
          <div className="mt-6">
            <OfferCountdown parts={parts} ended={ended} />
          </div>
          {!ended ? (
            <div className="mt-8">
              <button
                type="button"
                onClick={() => goCheckout("final")}
                className="mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-base font-black uppercase tracking-wide text-[#8B1538]"
              >
                {COPY.primaryCta}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {!ended ? (
        <section
          id="checkout"
          className="scroll-mt-6 border-t border-white/10 px-4 py-14 sm:px-6"
          aria-labelledby="checkout-heading"
        >
          <div className="mx-auto max-w-xl">
            <h2
              id="checkout-heading"
              className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
            >
              {COPY.checkoutHeadline}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-base text-white/80">{COPY.checkoutHelper}</p>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-white/60">
              {COPY.newMemberNote}
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              {checkoutSrc ? (
                <iframe
                  src={checkoutSrc}
                  title={`${DEAL.name} checkout`}
                  className="block min-h-[820px] w-full border-0 bg-white"
                  loading="lazy"
                  allow="payment *"
                />
              ) : (
                <div className="flex min-h-[240px] items-center justify-center text-sm text-stone-500">
                  Loading checkout…
                </div>
              )}
            </div>
            {checkoutSrc ? (
              <p className="mt-4 text-center text-sm text-white/65">
                If the form doesn&apos;t load,{" "}
                <a
                  href={checkoutSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#FF3366] underline underline-offset-2"
                >
                  open checkout in a new tab
                </a>
                .
              </p>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="px-4 py-14 text-center sm:px-6">
          <p className="font-montserrat text-lg font-black text-[#FF3366]">{COPY.offerEnded}</p>
        </section>
      )}

      <footer className="px-4 py-8 text-center text-xs text-white/50 sm:px-6">
        <p className="font-montserrat font-bold text-white/70">{DEAL.venueName}</p>
        <p className="mt-1">
          {DEAL.addressLine}, {DEAL.cityLine}
        </p>
      </footer>

      {!ended ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#1C1410]/95 p-3 backdrop-blur sm:hidden">
          <button type="button" onClick={() => goCheckout("sticky")} className={ctaClass}>
            {COPY.stickyCta}
          </button>
        </div>
      ) : null}
    </div>
  )
}
