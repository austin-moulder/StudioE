"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { Check, ChevronDown, MapPin } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import {
  ASSETS,
  CHECKOUT_URL,
  CLASSES,
  COPY,
  EVENT,
  FAQS,
  INSTRUCTOR,
  PRICING,
  UTM,
} from "@/lib/kc-weekender/config"

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

const primaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

const secondaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl border-2 border-white/60 bg-transparent px-6 py-3.5 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-base"

const secondaryLightClass =
  "inline-flex w-full items-center justify-center rounded-2xl border-2 border-[#1C1410]/15 bg-white px-6 py-3.5 text-center font-montserrat text-sm font-black uppercase tracking-wide text-[#1C1410] transition hover:border-[#FF3366]/40 hover:text-[#FF3366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] sm:text-base"

function scrollToCheckout() {
  document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function KcWeekenderClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: EVENT.name,
      content_category: "workshop",
      value: PRICING.fullPass,
      currency: "USD",
    })
    setCheckoutSrc(buildPopupCheckoutUrl(CHECKOUT_URL, UTM, { placement: "embed" }))
  }, [])

  const goCheckout = useCallback((placement: string) => {
    trackMeta("InitiateCheckout", {
      content_name: EVENT.name,
      value: PRICING.fullPass,
      currency: "USD",
      placement,
    })
    scrollToCheckout()
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#0F1419] pb-24 text-white antialiased sm:pb-0">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F1419]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Studio E home">
            <StudioELogo width={36} height={36} alt="Studio E Logo" className="h-9 w-9" />
            <span className="hidden font-montserrat text-sm font-bold tracking-wide sm:inline">
              STUDIO E
            </span>
          </Link>
          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#E8C97A]">
            {EVENT.shortName}
          </p>
          <button type="button" onClick={() => goCheckout("header")} className={`${primaryCtaClass} !w-auto !px-4 !py-2.5 !text-xs sm:!text-sm`}>
            {COPY.primaryCta}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={ASSETS.hero}
          alt="Studio E salsa instruction"
          fill
          priority
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/70 via-[#0F1419]/85 to-[#0F1419]" />

        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF7A5A]">
            {EVENT.brand} · {EVENT.city}
          </p>
          <h1 className="mt-4 text-center font-montserrat text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/85 sm:text-lg">
            {COPY.heroSubheadline}
          </p>

          <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-white/15 bg-black/40 px-5 py-4 text-center text-sm text-white/80">
            <p>
              <span className="font-semibold text-white/55">Date:</span> {EVENT.datePlaceholder}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-white/55">Start:</span> {EVENT.startTimePlaceholder}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#FF3366]" aria-hidden />
              {EVENT.venueNamePlaceholder} · {EVENT.venueAddressPlaceholder}
            </p>
            <p className="mt-2 text-xs text-white/55">{EVENT.format}</p>
          </div>

          <div className="mx-auto mt-6 flex max-w-sm flex-wrap items-baseline justify-center gap-3 rounded-2xl border border-[#FF3366]/35 bg-black/35 px-5 py-4">
            <div className="text-center">
              <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A]">
                Full pass
              </p>
              <p className="font-montserrat text-5xl font-black text-[#FF7A5A]">${PRICING.fullPass}</p>
              <p className="text-xs text-white/70">Save ${PRICING.savings} vs 3 singles</p>
            </div>
            <div className="h-12 w-px bg-white/15" aria-hidden />
            <div className="text-center">
              <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">
                Single class
              </p>
              <p className="font-montserrat text-3xl font-black text-white/85">${PRICING.single}</p>
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
            <button type="button" onClick={() => goCheckout("hero_primary")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
            <button type="button" onClick={() => goCheckout("hero_secondary")} className={secondaryCtaClass}>
              {COPY.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Checkout embed — early for conversion */}
      <section
        id="checkout"
        className="scroll-mt-20 border-y border-white/10 bg-[#151B22] px-4 py-12 sm:px-6"
        aria-labelledby="checkout-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2
            id="checkout-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.checkoutHeadline}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/70">
            {COPY.checkoutHelper}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            {checkoutSrc ? (
              <iframe
                src={checkoutSrc}
                title={`${EVENT.name} checkout`}
                className="block min-h-[820px] w-full border-0 bg-white"
                loading="lazy"
                allow="payment *"
              />
            ) : (
              <div className="flex min-h-[240px] items-center justify-center px-6 text-sm text-stone-500">
                Loading checkout…
              </div>
            )}
          </div>
          <p className="mt-4 text-center text-sm text-white/55">
            If checkout doesn&apos;t load,{" "}
            {checkoutSrc ? (
              <a
                href={checkoutSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#FF7A5A] underline underline-offset-2"
              >
                open it in a new tab
              </a>
            ) : (
              "open it in a new tab"
            )}
            .
          </p>
        </div>
      </section>

      {/* Photo credibility */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="credibility-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="credibility-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.credibilityHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-white/70">
            {COPY.credibilityBody}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ASSETS.gallery.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-800">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll learn */}
      <section className="bg-[#151B22] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="learn-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="learn-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.learnHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-white/70">{COPY.learnBody}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CLASSES.map((cls, i) => (
              <article
                key={cls.id}
                className="rounded-2xl border border-white/10 bg-[#0F1419] p-6"
              >
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  Class {i + 1}
                </p>
                <h3 className="mt-2 font-montserrat text-xl font-black">{cls.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{cls.body}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-md">
            <button type="button" onClick={() => goCheckout("learn")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Offer comparison */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="offer-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="offer-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.offerHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/70">{COPY.offerBody}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="flex flex-col rounded-2xl border border-white/15 bg-white/5 p-6">
              <h3 className="font-montserrat text-2xl font-black">Single Class</h3>
              <p className="mt-1 text-sm text-white/60">One of three salsa classes</p>
              <p className="mt-4 font-montserrat text-5xl font-black">${PRICING.single}</p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-white/80">
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E8C97A]" aria-hidden />
                  Choose one class in checkout
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E8C97A]" aria-hidden />
                  Beginner &amp; intermediate friendly
                </li>
              </ul>
              <button
                type="button"
                onClick={() => goCheckout("offer_single")}
                className={`mt-8 ${secondaryLightClass}`}
              >
                {COPY.secondaryCta}
              </button>
            </article>

            <article className="relative flex flex-col rounded-2xl border-2 border-[#FF3366] bg-white p-6 text-[#1C1410] shadow-[0_16px_40px_rgba(255,51,102,0.2)]">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-4 py-1 font-montserrat text-[10px] font-black uppercase tracking-[0.16em] text-white">
                Best value
              </span>
              <h3 className="font-montserrat text-2xl font-black">Full Pass</h3>
              <p className="mt-1 text-sm text-stone-500">All 3 classes · 3 hours</p>
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <p className="font-montserrat text-5xl font-black">${PRICING.fullPass}</p>
                <span className="rounded-full bg-[#FF3366]/10 px-3 py-1 text-sm font-bold text-[#FF3366]">
                  Save ${PRICING.savings}
                </span>
              </div>
              <p className="mt-1 text-xs text-stone-500">
                vs ${PRICING.individualTotal} if purchased individually
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-stone-700">
                {CLASSES.map((cls) => (
                  <li key={cls.id} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                    {cls.title}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => goCheckout("offer_full")}
                className={`mt-8 ${primaryCtaClass}`}
              >
                {COPY.primaryCta}
              </button>
            </article>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="bg-[#151B22] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="instructor-heading">
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[240px_1fr] md:gap-12">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-2xl bg-stone-800">
            <Image
              src={INSTRUCTOR.photo}
              alt={`${INSTRUCTOR.name}, ${INSTRUCTOR.role}`}
              fill
              className="object-cover object-top"
              sizes="240px"
            />
          </div>
          <div>
            <h2
              id="instructor-heading"
              className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
            >
              {COPY.instructorHeadline}
            </h2>
            <p className="mt-3 font-montserrat text-xl font-black text-[#FF7A5A]">{INSTRUCTOR.name}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/60">
              {INSTRUCTOR.role}
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80">{INSTRUCTOR.bio}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{COPY.instructorStudioLine}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="faq-heading"
            className="mb-8 text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.faqHeadline}
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQS.map((item, index) => {
              const open = openFaq === index
              const panelId = `kc-faq-${index}`
              const buttonId = `kc-faq-btn-${index}`
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-3 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3366]"
                    >
                      <span className="font-montserrat text-sm font-bold sm:text-base">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#FF3366] transition ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="pb-4"
                  >
                    <p className="text-sm leading-relaxed text-white/70">{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/90">
            {EVENT.format} · Full pass ${PRICING.fullPass} · Save ${PRICING.savings}
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <button
              type="button"
              onClick={() => goCheckout("final")}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 sm:text-base"
            >
              {COPY.finalCta}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/50 sm:px-6">
        <p className="font-montserrat font-bold text-white/80">{EVENT.brand}</p>
        <p className="mt-1">{EVENT.name}</p>
        <p className="mt-1 text-xs">
          {EVENT.datePlaceholder} · {EVENT.venueNamePlaceholder}
        </p>
      </footer>

      {/* Mobile sticky */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0F1419]/95 p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => goCheckout("sticky")} className={primaryCtaClass}>
          {COPY.stickyCta}
        </button>
      </div>
    </div>
  )
}
