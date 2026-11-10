"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { Check, ChevronDown, MapPin, X } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import { EVENT, INSTRUCTOR } from "@/lib/kc-weekender/config"
import {
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
  "inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

const secondaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl border-2 border-white/60 bg-transparent px-6 py-3.5 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-base"

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
    <div className="min-h-screen scroll-smooth bg-[#0F1419] pb-24 text-white antialiased sm:pb-0">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F1419]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Studio E home">
            <StudioELogo width={36} height={36} alt="Studio E Logo" className="h-9 w-9" />
            <span className="hidden font-montserrat text-sm font-bold tracking-wide sm:inline">
              STUDIO E
            </span>
          </Link>
          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#E8C97A]">
            {INTENSIVE.shortName}
          </p>
          <button
            type="button"
            onClick={() => goCheckout("header")}
            className={`${primaryCtaClass} !w-auto !px-4 !py-2.5 !text-xs sm:!text-sm`}
          >
            Add for ${INTENSIVE.price}
          </button>
        </div>
      </header>

      <div className="bg-[#1C1410] px-4 py-2 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
          {INTENSIVE_COPY.announcement}
        </p>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={INTENSIVE_ASSETS.hero}
          alt="Studio E salsa private coaching"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/65 via-[#0F1419]/85 to-[#0F1419]" />

        <div className="relative mx-auto max-w-3xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF7A5A]">
            {INTENSIVE_COPY.heroEyebrow}
          </p>
          <h1 className="mt-4 text-center font-montserrat text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
            {INTENSIVE_COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/85 sm:text-lg">
            {INTENSIVE_COPY.heroSubheadline}
          </p>

          <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-white/15 bg-black/45 px-5 py-4 text-center text-sm text-white/80">
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-[#E8C97A]">
              {INTENSIVE.eligibility}
            </p>
            <p className="mt-2">
              <span className="font-semibold text-white/55">When:</span> {EVENT.dateLabel} ·{" "}
              {INTENSIVE.timeLabel}
            </p>
            <p className="mt-1 flex items-start justify-center gap-1.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF3366]" aria-hidden />
              <span>
                {EVENT.venueName}
                <br />
                {EVENT.addressLine}, {EVENT.cityLine}
              </span>
            </p>
            <p className="mt-3 font-montserrat text-5xl font-black text-[#FF7A5A]">
              ${INTENSIVE.price}
            </p>
            <p className="mt-1 text-xs text-white/65">
              {INTENSIVE.duration} add-on · Cap of {INTENSIVE.capacity}
            </p>
            <p className="mt-3 text-sm font-semibold text-[#FF7A5A]">{INTENSIVE_COPY.scarcity}</p>
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <button type="button" onClick={() => goCheckout("hero")} className={primaryCtaClass}>
              {INTENSIVE_COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Checkout */}
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
            {INTENSIVE_COPY.checkoutHeadline}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/70">
            {INTENSIVE_COPY.checkoutHelper}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
            {checkoutSrc ? (
              <iframe
                src={checkoutSrc}
                title={`${INTENSIVE.shortName} checkout`}
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

      {/* Photos */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="photo-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="photo-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {INTENSIVE_COPY.photoHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-white/70">
            {INTENSIVE_COPY.photoBody}
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTENSIVE_ASSETS.gallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-800"
              >
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

      {/* Focus + Best for */}
      <section className="bg-[#151B22] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {INTENSIVE_COPY.focusHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/70">
            {INTENSIVE_COPY.focusBody}
          </p>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            {INTENSIVE_FOCUS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-[#0F1419] px-4 py-3 text-sm text-white/85"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#E8C97A]/35 bg-[#E8C97A]/10 p-5">
              <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#E8C97A]">
                {INTENSIVE_COPY.bestForHeadline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">{INTENSIVE_COPY.bestFor}</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                <X className="h-3.5 w-3.5" aria-hidden />
                {INTENSIVE_COPY.notForHeadline}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{INTENSIVE_COPY.notFor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value stack */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="stack-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {INTENSIVE_COPY.stackHeadline}
          </h2>
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border-2 border-[#FF3366] bg-white p-6 text-[#1C1410] shadow-[0_16px_40px_rgba(255,51,102,0.2)] sm:p-8">
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#FF3366]">
              {INTENSIVE.shortName}
            </p>
            <div className="mt-2 flex flex-wrap items-baseline gap-3">
              <p className="font-montserrat text-5xl font-black">${INTENSIVE.price}</p>
              <span className="text-sm text-stone-500">add-on · {INTENSIVE.duration}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#FF3366]">{INTENSIVE_COPY.scarcity}</p>
            <ul className="mt-6 space-y-3">
              {INTENSIVE_STACK.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => goCheckout("stack")}
              className={`mt-8 ${primaryCtaClass}`}
            >
              {INTENSIVE_COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Context + instructor */}
      <section className="bg-[#151B22] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-[220px_1fr] md:gap-12">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl bg-stone-800">
            <Image
              src={INSTRUCTOR.photo}
              alt={`${INSTRUCTOR.name}, ${INSTRUCTOR.role}`}
              fill
              className="object-cover object-top"
              sizes="220px"
            />
          </div>
          <div>
            <h2 className="font-montserrat text-3xl font-black tracking-tight">
              {INTENSIVE_COPY.contextHeadline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              {INTENSIVE_COPY.contextBody}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Led by {INSTRUCTOR.name}, {INSTRUCTOR.role}. {INSTRUCTOR.bio}
            </p>
            <Link
              href="/kc-weekender"
              className="mt-5 inline-block text-sm font-semibold text-[#FF7A5A] underline underline-offset-2"
            >
              View the main KC Weekender details
            </Link>
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
            FAQ
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {INTENSIVE_FAQS.map((item, index) => {
              const open = openFaq === index
              const panelId = `intensive-faq-${index}`
              const buttonId = `intensive-faq-btn-${index}`
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
          <div className="mx-auto mt-10 max-w-md">
            <button type="button" onClick={() => goCheckout("faq")} className={primaryCtaClass}>
              {INTENSIVE_COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {INTENSIVE_COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/90">{INTENSIVE_COPY.finalBody}</p>
          <p className="mt-3 text-sm font-semibold text-white/85">{INTENSIVE_COPY.scarcity}</p>
          <div className="mx-auto mt-8 max-w-md space-y-3">
            <button
              type="button"
              onClick={() => goCheckout("final")}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 sm:text-base"
            >
              {INTENSIVE_COPY.primaryCta}
            </button>
            <Link href="/kc-weekender" className={`${secondaryCtaClass} block`}>
              Back to KC Weekender
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-10 text-center text-sm text-white/50 sm:px-6">
        <p className="font-montserrat font-bold text-white/80">Studio E</p>
        <p className="mt-1">{INTENSIVE.name}</p>
        <p className="mt-1 text-xs">
          {EVENT.dateLabel} · {INTENSIVE.timeLabel}
        </p>
        <p className="mt-1 text-xs">
          {EVENT.venueName} · {EVENT.addressLine}, {EVENT.cityLine}
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0F1419]/95 p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => goCheckout("sticky")} className={primaryCtaClass}>
          {INTENSIVE_COPY.stickyCta}
        </button>
      </div>
    </div>
  )
}
