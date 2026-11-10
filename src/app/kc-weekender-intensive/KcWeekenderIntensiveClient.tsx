"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { Check, ChevronDown, MapPin, X } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import {
  EVENT,
  INSTRUCTOR,
  INTENSIVE,
  INTENSIVE_ASSETS,
  INTENSIVE_CHECKOUT_URL,
  INTENSIVE_COPY,
  INTENSIVE_FAQS,
  INTENSIVE_FOCUS,
  INTENSIVE_STACK,
  INTENSIVE_UTM,
} from "@/lib/kc-weekender/intensive-config"

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
  "inline-flex w-full items-center justify-center rounded-xl bg-[#1C1410] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-[#E8C97A] transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1410] focus-visible:ring-offset-2 sm:text-base"

function scrollToCheckout() {
  document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function KcWeekenderIntensiveClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: INTENSIVE.name,
      content_category: "workshop_upsell",
      value: INTENSIVE.price,
      currency: "USD",
    })
    setCheckoutSrc(
      buildPopupCheckoutUrl(INTENSIVE_CHECKOUT_URL, INTENSIVE_UTM, { placement: "embed" })
    )
  }, [])

  const goCheckout = useCallback((placement: string) => {
    trackMeta("InitiateCheckout", {
      content_name: INTENSIVE.name,
      value: INTENSIVE.price,
      currency: "USD",
      placement,
    })
    scrollToCheckout()
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#F3EEE4] pb-24 text-[#1C1410] antialiased sm:pb-0">
      {/* Minimal bar */}
      <header className="sticky top-0 z-50 border-b border-[#1C1410]/10 bg-[#F3EEE4]/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Studio E home">
            <StudioELogo width={32} height={32} alt="Studio E Logo" className="h-8 w-8" />
            <span className="font-montserrat text-xs font-bold tracking-wide">STUDIO E</span>
          </Link>
          <button
            type="button"
            onClick={() => goCheckout("header")}
            className="rounded-full bg-[#1C1410] px-4 py-2 font-montserrat text-[11px] font-black uppercase tracking-[0.14em] text-[#E8C97A]"
          >
            Add · ${INTENSIVE.price}
          </button>
        </div>
      </header>

      {/* Compact hero — offer first */}
      <section className="px-4 pb-8 pt-8 sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#8B6914]">
            {INTENSIVE_COPY.heroEyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-montserrat text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl">
            {INTENSIVE_COPY.heroHeadline}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#1C1410]/75">
            {INTENSIVE_COPY.heroSubheadline}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-[#1C1410] sm:min-h-full">
              <Image
                src={INTENSIVE_ASSETS.hero}
                alt="Focused salsa coaching at Studio E"
                fill
                priority
                className="object-cover object-center opacity-90"
                sizes="(max-width: 640px) 100vw, 55vw"
              />
            </div>

            <div className="rounded-2xl border border-[#1C1410]/12 bg-white p-5 shadow-sm sm:p-6">
              <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">
                {INTENSIVE.eligibility}
              </p>
              <p className="mt-3 font-montserrat text-5xl font-black">${INTENSIVE.price}</p>
              <p className="mt-1 text-sm text-[#1C1410]/65">
                {INTENSIVE.duration} · {INTENSIVE.timeLabel}
              </p>
              <p className="mt-3 flex items-start gap-1.5 text-xs text-[#1C1410]/65">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                <span>
                  {EVENT.dateLabel}
                  <br />
                  {EVENT.venueName}
                </span>
              </p>
              <p className="mt-4 border-t border-[#1C1410]/08 pt-3 text-sm font-semibold text-[#8B6914]">
                {INTENSIVE_COPY.scarcity}
              </p>
              <button
                type="button"
                onClick={() => goCheckout("hero")}
                className={`mt-5 ${primaryCtaClass}`}
              >
                {INTENSIVE_COPY.primaryCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout early */}
      <section
        id="checkout"
        className="scroll-mt-16 border-y border-[#1C1410]/10 bg-white px-4 py-10 sm:px-6"
        aria-labelledby="checkout-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2
            id="checkout-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight"
          >
            {INTENSIVE_COPY.checkoutHeadline}
          </h2>
          <p className="mt-2 text-center text-sm text-[#1C1410]/65">{INTENSIVE_COPY.checkoutHelper}</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#1C1410]/1 bg-white shadow-sm">
            {checkoutSrc ? (
              <iframe
                src={checkoutSrc}
                title={`${INTENSIVE.shortName} checkout`}
                className="block min-h-[780px] w-full border-0 bg-white"
                loading="lazy"
                allow="payment *"
              />
            ) : (
              <div className="flex min-h-[200px] items-center justify-center text-sm text-stone-500">
                Loading checkout…
              </div>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-[#1C1410]/5">
            If checkout doesn&apos;t load,{" "}
            {checkoutSrc ? (
              <a
                href={checkoutSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
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

      {/* Tight focus + for/not-for */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl">
            {INTENSIVE_COPY.focusHeadline}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#1C1410]/7">
            {INTENSIVE_COPY.focusBody}
          </p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {INTENSIVE_FOCUS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 border-b border-[#1C1410]/08 py-2.5 text-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B6914]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#1C1410] px-5 py-4 text-[#F3EEE4]">
              <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C97A]">
                {INTENSIVE_COPY.bestForHeadline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{INTENSIVE_COPY.bestFor}</p>
            </div>
            <div className="rounded-xl border border-[#1C1410]/15 bg-white px-5 py-4">
              <p className="flex items-center gap-1.5 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1410]/5">
                <X className="h-3.5 w-3.5" aria-hidden />
                {INTENSIVE_COPY.notForHeadline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1C1410]/75">{INTENSIVE_COPY.notFor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slim photo strip */}
      <section className="px-4 pb-4 sm:px-6" aria-label="Studio photos">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2">
          {INTENSIVE_ASSETS.gallery.map((photo) => (
            <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-stone-300">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Included — compact card */}
      <section className="px-4 py-10 sm:px-6" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#1C1410]/12 bg-white p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="stack-heading" className="font-montserrat text-xl font-black">
                {INTENSIVE_COPY.stackHeadline}
              </h2>
              <p className="mt-1 text-sm text-[#1C1410]/6">Cap of {INTENSIVE.capacity}</p>
            </div>
            <p className="font-montserrat text-4xl font-black">${INTENSIVE.price}</p>
          </div>
          <ul className="mt-5 space-y-2.5">
            {INTENSIVE_STACK.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#1C1410]/8">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#8B6914]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => goCheckout("stack")}
            className={`mt-6 ${primaryCtaClass}`}
          >
            {INTENSIVE_COPY.primaryCta}
          </button>
        </div>
      </section>

      {/* Instructor — one line + photo thumb */}
      <section className="border-t border-[#1C1410]/08 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-stone-300">
            <Image
              src={INSTRUCTOR.photo}
              alt={INSTRUCTOR.name}
              fill
              className="object-cover object-top"
              sizes="64px"
            />
          </div>
          <div>
            <p className="font-montserrat text-sm font-black">
              {INSTRUCTOR.name} · {INSTRUCTOR.role}
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#1C1410]/65">
              Runs immediately before the main KC Weekender classes at {EVENT.venueName}.
            </p>
            <Link
              href="/kc-weekender"
              className="mt-1 inline-block text-xs font-semibold underline underline-offset-2"
            >
              Main workshop details
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — compact */}
      <section className="bg-white px-4 py-10 sm:px-6" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2 id="faq-heading" className="font-montserrat text-xl font-black">
            FAQ
          </h2>
          <div className="mt-4 divide-y divide-[#1C1410]/1 border-y border-[#1C1410]/1">
            {INTENSIVE_FAQS.map((item, index) => {
              const open = openFaq === index
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
                  >
                    <span className="font-montserrat text-sm font-bold">{item.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <p className="pb-3.5 text-sm leading-relaxed text-[#1C1410]/7">{item.answer}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final — short */}
      <section className="bg-[#1C1410] px-4 py-12 text-[#F3EEE4] sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl">
            {INTENSIVE_COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">{INTENSIVE_COPY.finalBody}</p>
          <button
            type="button"
            onClick={() => goCheckout("final")}
            className="mx-auto mt-6 inline-flex w-full max-w-md items-center justify-center rounded-xl bg-[#E8C97A] px-6 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#1C1410] transition hover:bg-[#f0d99a]"
          >
            {INTENSIVE_COPY.primaryCta}
          </button>
        </div>
      </section>

      <footer className="px-4 py-8 text-center text-xs text-[#1C1410]/45 sm:px-6">
        <p className="font-montserrat font-bold text-[#1C1410]/7">Studio E</p>
        <p className="mt-1">
          {INTENSIVE.shortName} · {EVENT.dateLabel} · {INTENSIVE.timeLabel}
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1C1410]/1 bg-[#F3EEE4]/95 p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => goCheckout("sticky")} className={primaryCtaClass}>
          {INTENSIVE_COPY.stickyCta}
        </button>
      </div>
    </div>
  )
}
