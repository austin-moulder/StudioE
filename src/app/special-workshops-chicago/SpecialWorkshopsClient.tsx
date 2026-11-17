"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronDown, MapPin } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import {
  getCountdownParts,
  type CountdownParts,
} from "@/lib/popup-class/event-time"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import {
  CHECKOUT_URL,
  COPY,
  FAQS,
  PROCESS,
  SERIES_START_MS,
  UTM,
  VENUE,
  WORKSHOPS,
} from "@/lib/special-workshops-chicago/config"

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

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function Countdown({ parts, ended }: { parts: CountdownParts; ended: boolean }) {
  if (ended) {
    return (
      <p className="font-montserrat text-xl font-black text-[#E8C97A] sm:text-2xl">
        {COPY.countdownEnded}
      </p>
    )
  }

  const units: [string, number][] =
    parts.days > 0
      ? [
          ["Days", parts.days],
          ["Hrs", parts.hours],
          ["Min", parts.minutes],
          ["Sec", parts.seconds],
        ]
      : [
          ["Hrs", parts.hours],
          ["Min", parts.minutes],
          ["Sec", parts.seconds],
        ]

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      role="timer"
      aria-live="polite"
    >
      {units.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[4rem] rounded-xl border border-white/15 bg-black/35 px-2.5 py-2 text-center backdrop-blur-sm"
        >
          <div className="font-montserrat text-2xl font-black tabular-nums text-white sm:text-3xl">
            {pad(value)}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/65">{label}</div>
        </div>
      ))}
    </div>
  )
}

function Snowfall() {
  const flakes = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 12) * 0.45}s`,
        duration: `${9 + (i % 7)}s`,
        size: 2 + (i % 4),
        opacity: 0.25 + (i % 5) * 0.1,
      })),
    []
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute top-[-8%] rounded-full bg-white"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `specialty-snow ${flake.duration} linear ${flake.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

const primaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl bg-[#C41E3A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(196,30,58,0.4)] transition hover:bg-[#A51830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C97A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1610] sm:text-base"

const secondaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl border-2 border-[#E8C97A]/55 bg-transparent px-6 py-3.5 text-center font-montserrat text-sm font-black uppercase tracking-wide text-[#E8C97A] transition hover:bg-[#E8C97A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C97A] sm:text-base"

export default function SpecialWorkshopsClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 1,
  })
  const [ended, setEnded] = useState(false)

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: "Specialty Workshops Chicago Christmas",
      content_category: "workshop",
    })
    setCheckoutSrc(buildPopupCheckoutUrl(CHECKOUT_URL, UTM, { placement: "embed" }))
  }, [])

  useEffect(() => {
    const tick = () => {
      const next = getCountdownParts(SERIES_START_MS)
      setParts(next)
      setEnded(next.totalMs <= 0)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const goCheckout = useCallback((placement: string) => {
    trackMeta("InitiateCheckout", {
      content_name: "Specialty Workshops Chicago Christmas",
      content_category: "workshop",
      placement,
    })
    scrollToId("checkout")
  }, [])

  return (
    <div className="relative min-h-screen scroll-smooth bg-[#0A1610] pb-24 text-white antialiased sm:pb-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes specialty-snow {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(12px, 110vh, 0); }
            }
            @keyframes specialty-glow {
              0%, 100% { opacity: 0.35; }
              50% { opacity: 0.7; }
            }
            @keyframes specialty-rise {
              from { opacity: 0; transform: translateY(18px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `,
        }}
      />

      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A1610]/92 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Studio E home">
            <StudioELogo width={36} height={36} alt="Studio E Logo" className="h-9 w-9" />
            <span className="hidden font-montserrat text-sm font-bold tracking-wide sm:inline">
              STUDIO E
            </span>
          </Link>
          <p
            className="text-lg text-[#E8C97A] sm:text-xl"
            style={{ fontFamily: "var(--font-specialty-script), cursive" }}
          >
            {COPY.accentLabel}
          </p>
          <button
            type="button"
            onClick={() => goCheckout("header")}
            className={`${primaryCtaClass} !w-auto !px-4 !py-2.5 !text-xs sm:!text-sm`}
          >
            {COPY.stickyCta}
          </button>
        </div>
      </header>

      {/* Hero — brand, headline, support, CTA, full-bleed flyer */}
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src={WORKSHOPS[0].flyer}
          alt={COPY.flyerHeroAlt}
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1610]/45 via-[#0A1610]/72 to-[#0A1610]" />
        <div
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#C41E3A]/25 blur-3xl"
          style={{ animation: "specialty-glow 5s ease-in-out infinite" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#1F6B45]/30 blur-3xl"
          style={{ animation: "specialty-glow 6.5s ease-in-out infinite" }}
          aria-hidden
        />
        <Snowfall />

        <div className="relative mx-auto flex min-h-[88vh] max-w-3xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 sm:pb-16">
          <p
            className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#E8C97A]"
            style={{ animation: "specialty-rise 0.7s ease-out both" }}
          >
            {COPY.heroEyebrow}
          </p>
          <p
            className="mt-3 text-center text-3xl text-[#E8C97A] sm:text-4xl"
            style={{
              fontFamily: "var(--font-specialty-script), cursive",
              animation: "specialty-rise 0.8s ease-out both",
            }}
          >
            {COPY.accentLabel}
          </p>
          <h1
            className="mt-3 text-center font-montserrat text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl"
            style={{ animation: "specialty-rise 0.9s ease-out both" }}
          >
            {COPY.heroHeadline}
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/85 sm:text-lg"
            style={{ animation: "specialty-rise 1s ease-out both" }}
          >
            {COPY.heroSubheadline}
          </p>

          <div
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3"
            style={{ animation: "specialty-rise 1.15s ease-out both" }}
          >
            <button type="button" onClick={() => goCheckout("hero_primary")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("workshops")}
              className={secondaryCtaClass}
            >
              {COPY.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Countdown strip */}
      <section className="border-y border-white/10 bg-[#0E1C14] px-4 py-8 sm:px-6" aria-label="Countdown">
        <div className="mx-auto max-w-md">
          <p className="mb-3 text-center font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            First night starts in
          </p>
          <Countdown parts={parts} ended={ended} />
        </div>
      </section>

      {/* Workshops */}
      <section
        id="workshops"
        className="scroll-mt-20 border-y border-white/10 bg-[#102018] px-4 py-14 sm:px-6 sm:py-16"
        aria-labelledby="workshops-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="workshops-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.workshopsHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-white/70">
            {COPY.workshopsBody}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {WORKSHOPS.map((workshop, index) => (
              <article key={workshop.id} className="flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-black/40 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
                  <Image
                    src={workshop.flyer}
                    alt={workshop.flyerAlt}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <p className="mt-4 font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8C97A]">
                  {workshop.dateLabel}
                </p>
                <h3 className="mt-1 font-montserrat text-xl font-black tracking-tight">
                  {workshop.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{workshop.subtitle}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/50">
                  {workshop.timeLabel} · {workshop.tags}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <button type="button" onClick={() => goCheckout("workshops")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="process-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="process-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {PROCESS.headline}
          </h2>
          <ol className="mt-10 space-y-6">
            {PROCESS.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C41E3A] font-montserrat text-sm font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-montserrat text-lg font-black">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Checkout */}
      <section
        id="checkout"
        className="scroll-mt-20 border-y border-white/10 bg-[#102018] px-4 py-12 sm:px-6"
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
                title="Specialty workshops checkout"
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
                className="font-semibold text-[#E8C97A] underline underline-offset-2"
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

      {/* Location */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="location-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="location-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.locationHeadline}
          </h2>
          <p className="mt-4 font-montserrat text-lg font-black">{VENUE.name}</p>
          <p className="mt-2 flex items-start justify-center gap-1.5 text-sm text-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C41E3A]" aria-hidden />
            <span>
              {VENUE.addressLine}
              <br />
              {VENUE.cityLine}
              <br />
              {VENUE.neighborhood}
            </span>
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={VENUE.mapsEmbedSrc}
              title="Studio E location map"
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-[#102018] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.faqHeadline}
          </h2>
          <ul className="mt-8 divide-y divide-white/10">
            {FAQS.map((faq, i) => {
              const open = openFaq === i
              return (
                <li key={faq.question}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span className="font-montserrat text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#E8C97A] transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <p className="pb-4 text-sm leading-relaxed text-white/70">{faq.answer}</p>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Final */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#C41E3A] via-[#7A1528] to-[#0A1610] px-4 py-16 sm:px-6 sm:py-20">
        <Snowfall />
        <div className="relative mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-white/85">{COPY.finalBody}</p>
          <div className="mx-auto mt-8 max-w-md">
            <button type="button" onClick={() => goCheckout("final")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0A1610]/95 p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => goCheckout("sticky_mobile")} className={primaryCtaClass}>
          {COPY.stickyCta}
        </button>
      </div>
    </div>
  )
}
