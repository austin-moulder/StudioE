"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  Check,
  ChevronDown,
  MapPin,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
} from "lucide-react"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import {
  CAPACITY,
  CHECKOUT_URL,
  COPY,
  FAQS,
  IMAGES,
  LOCATION,
  PRICING,
  STEPS,
  TESTIMONIALS,
  TOPICS,
  UTM,
  VALUE_CARDS,
  VIDEO_EMBED,
  WHO_FOR,
} from "@/lib/get-started/config"

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

function getSpotsLeft(): number {
  if (typeof window === "undefined") return 4
  try {
    const raw = window.localStorage.getItem(CAPACITY.storageKey)
    if (raw) {
      const n = Number(raw)
      if (
        Number.isInteger(n) &&
        n >= CAPACITY.minDisplay &&
        n <= CAPACITY.maxDisplay
      ) {
        return n
      }
    }
  } catch {
    /* ignore */
  }
  const count =
    Math.floor(Math.random() * (CAPACITY.maxDisplay - CAPACITY.minDisplay + 1)) +
    CAPACITY.minDisplay
  try {
    window.localStorage.setItem(CAPACITY.storageKey, String(count))
  } catch {
    /* ignore */
  }
  return count
}

const ctaClass =
  "inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2"

const VALUE_ICONS = [Target, Sparkles, Zap, Users] as const

function CheckoutEmbed({ src, tall }: { src: string | null; tall?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
      {src ? (
        <iframe
          src={src}
          title="Studio E $39 Founder Private checkout"
          className={`block w-full border-0 bg-white ${tall ? "min-h-[900px]" : "min-h-[820px]"}`}
          loading="lazy"
          allow="payment *"
        />
      ) : (
        <div className="flex min-h-[320px] items-center justify-center bg-stone-50 text-sm text-stone-500">
          Loading secure checkout…
        </div>
      )}
    </div>
  )
}

function scrollToCheckout() {
  const desktop = document.getElementById("checkout-desktop")
  const mobile = document.getElementById("checkout-mobile")
  const target =
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
      ? desktop
      : mobile
  ;(target ?? desktop ?? mobile)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function ScrollCta({ placement, label = COPY.primaryCta }: { placement: string; label?: string }) {
  const onClick = useCallback(() => {
    trackMeta("InitiateCheckout", {
      content_name: "Founder Private $39",
      value: PRICING.sale,
      currency: "USD",
      placement,
    })
    scrollToCheckout()
  }, [placement])

  return (
    <button type="button" onClick={onClick} className={ctaClass}>
      {label}
    </button>
  )
}

export default function GetStartedClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)

  useEffect(() => {
    setSpotsLeft(getSpotsLeft())
    trackMeta("ViewContent", {
      content_name: "Founder Private $39",
      content_category: "private_lesson",
      value: PRICING.sale,
      currency: "USD",
    })
    setCheckoutSrc(buildPopupCheckoutUrl(CHECKOUT_URL, UTM, { placement: "embed" }))
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#F7F1E8] pb-24 text-stone-900 antialiased sm:pb-0">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-stone-950 text-white">
        <Image
          src={IMAGES.hero}
          alt="Studio E dancers in a focused private lesson"
          fill
          priority
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/80 to-stone-950" />

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-12 lg:pb-16 lg:pt-16">
          <div className="text-center lg:text-left">
            <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF7A5A]">
              {COPY.brand} · {LOCATION.neighborhood}
            </p>
            <p className="mt-4 text-sm font-semibold italic text-white/85 sm:text-base">
              {COPY.positioning}
            </p>
            <h1 className="mt-3 font-montserrat text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
              {COPY.heroHeadline}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg lg:mx-0">
              {COPY.heroSubheadline}
            </p>

            <div className="mx-auto mt-6 inline-flex flex-wrap items-baseline justify-center gap-3 rounded-2xl border border-white/15 bg-black/35 px-5 py-4 lg:mx-0 lg:justify-start">
              <span className="font-montserrat text-2xl font-bold text-white/45 line-through">
                ${PRICING.regular}
              </span>
              <span className="font-montserrat text-5xl font-black tabular-nums text-[#FF7A5A]">
                ${PRICING.sale}
              </span>
              <span className="w-full text-sm text-white/80 sm:w-auto">
                {PRICING.duration} · Save ${PRICING.savings} (~{PRICING.savingsPercentLabel})
              </span>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/75 lg:justify-start">
              <MapPin className="h-3.5 w-3.5 text-[#FF3366]" aria-hidden />
              {LOCATION.line}
            </p>

            <div className="mt-6 lg:hidden">
              <ScrollCta placement="hero_mobile" />
            </div>

            <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-white/65 lg:mx-0 lg:max-w-lg">
              {COPY.trustMicrocopy}
            </p>
          </div>

          {/* Desktop checkout in hero */}
          <div id="checkout-desktop" className="scroll-mt-6 hidden lg:block">
            <CheckoutEmbed src={checkoutSrc} />
          </div>
        </div>
      </section>

      {/* Mobile checkout below hero */}
      <section
        id="checkout-mobile"
        className="scroll-mt-6 border-b border-stone-200 bg-white px-4 py-10 sm:px-6 lg:hidden"
        aria-label="Checkout"
      >
        <div className="mx-auto max-w-xl">
          <h2 className="text-center font-montserrat text-2xl font-black tracking-tight">
            {COPY.primaryCta}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-stone-600">
            ${PRICING.regular} value · ${PRICING.sale} today · {PRICING.duration}
          </p>
          <div className="mt-6">
            <CheckoutEmbed src={checkoutSrc} />
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-xs leading-relaxed text-stone-500">
            {COPY.trustMicrocopy}
          </p>
        </div>
      </section>

      {/* Value stack */}
      <section className="px-4 py-14 sm:px-6 md:py-16" aria-labelledby="value-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="value-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.valueHeadline}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {VALUE_CARDS.map((card, i) => {
              const Icon = VALUE_ICONS[i] ?? Sparkles
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-[#FF3366]" aria-hidden />
                  <h3 className="mt-3 font-montserrat text-lg font-black">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.body}</p>
                </div>
              )
            })}
          </div>
          <div className="mx-auto mt-10 max-w-md">
            <ScrollCta placement="value" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white px-4 py-14 sm:px-6 md:py-16" aria-labelledby="steps-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="steps-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.stepsHeadline}
          </h2>
          <ol className="mt-10 space-y-5">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-stone-100 bg-[#F7F1E8]/60 px-5 py-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-montserrat text-base font-black sm:text-lg">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-10 max-w-md">
            <ScrollCta placement="steps" />
          </div>
        </div>
      </section>

      {/* Who + Topics */}
      <section className="px-4 py-14 sm:px-6 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-montserrat text-3xl font-black tracking-tight">
              {COPY.whoHeadline}
            </h2>
            <ul className="mt-6 space-y-3">
              {WHO_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                  <span className="text-base text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-montserrat text-3xl font-black tracking-tight">
              {COPY.topicsHeadline}
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {TOPICS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                  <span className="text-sm text-stone-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-stone-500">
              One lesson helps you start clear — we don’t promise a finished result in 60 minutes.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-md">
          <ScrollCta placement="who_topics" />
        </div>
      </section>

      {/* Proof */}
      <section className="bg-stone-950 px-4 py-14 text-white sm:px-6 md:py-16" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-4xl">
          <h2
            id="proof-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.proofHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-white/75">
            {COPY.proofBody}
          </p>

          <div className="mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <iframe
              src={VIDEO_EMBED}
              title="Studio E community testimonials"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {IMAGES.vibes.map((photo) => (
              <div key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex gap-0.5 text-[#FF7A5A]" aria-label="5 star Google review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-xs font-semibold text-white/55">— {t.name}</footer>
              </blockquote>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <ScrollCta placement="proof" />
          </div>
        </div>
      </section>

      {/* Scarcity */}
      <section className="border-y border-stone-200 bg-white px-4 py-12 sm:px-6" aria-live="polite">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl">
            {COPY.scarcityHeadline}
          </h2>
          <p className="mt-4 font-montserrat text-3xl font-black tabular-nums text-[#FF3366] sm:text-4xl">
            {spotsLeft != null
              ? COPY.scarcityLine(spotsLeft)
              : `Only — of ${CAPACITY.total} Privates Remaining`}
          </p>
          <div className="mx-auto mt-6 h-3 max-w-sm overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] transition-all"
              style={{
                width:
                  spotsLeft != null
                    ? `${Math.max(8, (spotsLeft / CAPACITY.total) * 100)}%`
                    : "20%",
              }}
            />
          </div>
          <div className="mx-auto mt-8 max-w-md">
            <ScrollCta placement="scarcity" />
          </div>
        </div>
      </section>

      {/* Challenge rollover bonus */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="rollover-heading">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#FF3366]/25 bg-white p-6 shadow-sm sm:p-8">
          <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF3366]">
            {COPY.rolloverEyebrow}
          </p>
          <h2 id="rollover-heading" className="mt-2 font-montserrat text-2xl font-black tracking-tight">
            {COPY.rolloverHeadline}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
            {COPY.rolloverBody}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-14 sm:px-6 md:py-16" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-2xl">
          <h2
            id="faq-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight"
          >
            FAQ
          </h2>
          <div className="mt-8 divide-y divide-stone-200 rounded-2xl border border-stone-200">
            {FAQS.map((faq, i) => {
              const open = openFaq === i
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span className="font-montserrat text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-stone-400 transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <p className="px-5 pb-4 text-sm leading-relaxed text-stone-600">{faq.answer}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
          <div className="mx-auto mt-10 max-w-md">
            <ScrollCta placement="faq" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FF3366] via-[#E62E5C] to-[#9933CC] px-4 py-16 text-white sm:px-6 md:py-20">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            {COPY.finalSubheadline}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="font-montserrat text-xl font-bold text-white/50 line-through">
              ${PRICING.regular}
            </span>
            <span className="font-montserrat text-5xl font-black">${PRICING.sale}</span>
            <span className="text-sm text-white/85">today · {PRICING.duration}</span>
          </div>

          <div className="mx-auto mt-8 hidden max-w-xl lg:block">
            <CheckoutEmbed src={checkoutSrc} tall />
          </div>

          <div className="mx-auto mt-8 max-w-md lg:hidden">
            <ScrollCta placement="final" />
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <ScrollCta placement="sticky" label={COPY.stickyCta} />
      </div>
    </div>
  )
}
