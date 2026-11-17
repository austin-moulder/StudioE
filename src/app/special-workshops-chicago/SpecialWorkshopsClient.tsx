"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Check, ChevronDown, ExternalLink, MapPin, Star } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import {
  getCountdownParts,
  type CountdownParts,
} from "@/lib/popup-class/event-time"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import {
  ASSETS,
  CHECKOUT_URL,
  COPY,
  FAQS,
  INSTRUCTOR,
  OUTCOMES,
  PRICING,
  PROCESS,
  SERIES_START_MS,
  SOCIAL,
  TESTIMONIALS,
  UTM,
  VENUE,
  WORKSHOPS,
  getWorkshopById,
  type SpecialtyWorkshopId,
} from "@/lib/special-workshops-chicago/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

const SELECTION_KEY = "studioe_specialty_workshop_selection_v1"

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
      <p className="font-montserrat text-lg font-black text-[#E8C97A] sm:text-xl">
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
      className="flex flex-wrap items-center justify-center gap-2"
      role="timer"
      aria-live="polite"
    >
      {units.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[3.5rem] rounded-lg border border-white/15 bg-black/40 px-2 py-1.5 text-center"
        >
          <div className="font-montserrat text-xl font-black tabular-nums text-white sm:text-2xl">
            {pad(value)}
          </div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-white/65">{label}</div>
        </div>
      ))}
    </div>
  )
}

const primaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl bg-[#C41E3A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(196,30,58,0.4)] transition hover:bg-[#A51830] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C97A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1610] sm:text-base"

const secondaryOutlineClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#E8C97A]/60 bg-transparent px-6 py-3.5 text-center font-montserrat text-sm font-black uppercase tracking-wide text-[#E8C97A] transition hover:bg-[#E8C97A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C97A] sm:text-base"

function CheckoutPanel({
  checkoutSrc,
  iframeReady,
  selectedTitle,
  onRetry,
  headingId,
}: {
  checkoutSrc: string | null
  iframeReady: boolean
  selectedTitle: string | null
  onRetry: () => void
  headingId: string
}) {
  return (
    <div className="mx-auto max-w-xl">
      <h2
        id={headingId}
        className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
      >
        {COPY.checkoutHeadline}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-center text-sm text-white/70">{COPY.checkoutHelper}</p>

      <div className="mt-4 rounded-2xl border border-[#E8C97A]/35 bg-black/35 px-4 py-3 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8C97A]">
          Ticket
        </p>
        <p className="mt-1 font-montserrat text-3xl font-black text-white">
          ${PRICING.ticket}
          <span className="ml-2 text-sm font-bold text-white/70">· Friend free</span>
        </p>
        {selectedTitle ? (
          <p className="mt-2 text-sm text-white/85">
            <span className="text-white/55">{COPY.selectedLabel}:</span> {selectedTitle}
          </p>
        ) : (
          <p className="mt-2 text-sm text-[#E8C97A]">{COPY.selectPrompt}</p>
        )}
      </div>

      <div className="mt-5">
        {checkoutSrc ? (
          <a
            href={checkoutSrc}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryOutlineClass}
          >
            {COPY.checkoutFallback}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          <button type="button" onClick={onRetry} className={secondaryOutlineClass}>
            {COPY.checkoutFallback}
          </button>
        )}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        {checkoutSrc && iframeReady ? (
          <iframe
            src={checkoutSrc}
            title="Specialty workshop ticket checkout"
            className="block min-h-[780px] w-full border-0 bg-white"
            loading="eager"
            allow="payment *"
          />
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 px-6 py-10 text-center">
            <p className="text-sm text-stone-600">
              {checkoutSrc
                ? "Checkout is opening… If it doesn’t appear, use the button above."
                : "Preparing checkout… Use the button above anytime."}
            </p>
            {checkoutSrc ? (
              <a
                href={checkoutSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="font-montserrat text-sm font-black uppercase tracking-wide text-[#C41E3A] underline underline-offset-2"
              >
                {COPY.checkoutFallback}
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default function SpecialWorkshopsClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [selectedId, setSelectedId] = useState<SpecialtyWorkshopId | null>(null)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)
  const [iframeReady, setIframeReady] = useState(false)
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 1,
  })
  const [ended, setEnded] = useState(false)

  const selected = useMemo(() => getWorkshopById(selectedId), [selectedId])

  const rebuildCheckoutSrc = useCallback((workshopId: SpecialtyWorkshopId | null) => {
    const workshop = getWorkshopById(workshopId)
    const extra: Record<string, string> = { placement: "embed" }
    if (workshop) {
      extra.workshop = workshop.id
      extra.workshop_name = workshop.title
      extra.utm_content = workshop.id
    }
    return buildPopupCheckoutUrl(CHECKOUT_URL, UTM, extra)
  }, [])

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: "Specialty Workshops Chicago Christmas",
      content_category: "workshop",
      value: PRICING.ticket,
      currency: "USD",
    })

    try {
      const saved = window.localStorage.getItem(SELECTION_KEY) as SpecialtyWorkshopId | null
      if (saved && getWorkshopById(saved)) setSelectedId(saved)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const src = rebuildCheckoutSrc(selectedId)
    setCheckoutSrc(src)
    setIframeReady(false)
    const readyTimer = window.setTimeout(() => setIframeReady(true), 400)
    return () => window.clearTimeout(readyTimer)
  }, [rebuildCheckoutSrc, selectedId])

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

  const selectWorkshop = useCallback((id: SpecialtyWorkshopId, placement: string) => {
    setSelectedId(id)
    try {
      window.localStorage.setItem(SELECTION_KEY, id)
    } catch {
      /* ignore */
    }
    const workshop = getWorkshopById(id)
    trackMeta("InitiateCheckout", {
      content_name: workshop?.title ?? "Specialty Workshop",
      content_category: "workshop",
      value: PRICING.ticket,
      currency: "USD",
      placement,
      workshop: id,
    })
    scrollToId("checkout")
  }, [])

  const goTicket = useCallback(
    (placement: string) => {
      if (selectedId) {
        selectWorkshop(selectedId, placement)
        return
      }
      trackMeta("InitiateCheckout", {
        content_name: "Specialty Workshops Chicago Christmas",
        content_category: "workshop",
        value: PRICING.ticket,
        currency: "USD",
        placement,
      })
      scrollToId("workshops")
    },
    [selectWorkshop, selectedId]
  )

  const snowFlakes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 41) % 100}%`,
        delay: `${(i % 10) * 0.5}s`,
        duration: `${10 + (i % 6)}s`,
        size: 2 + (i % 3),
        opacity: 0.2 + (i % 4) * 0.1,
      })),
    []
  )

  return (
    <div className="relative min-h-screen scroll-smooth bg-[#0A1610] pb-24 text-white antialiased sm:pb-0">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes specialty-snow {
              0% { transform: translate3d(0, -5%, 0); }
              100% { transform: translate3d(10px, 105vh, 0); }
            }
          `,
        }}
      />

      {/* Sticky header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0A1610]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Studio E home">
            <StudioELogo width={36} height={36} alt="Studio E Logo" className="h-9 w-9" />
            <span className="hidden font-montserrat text-sm font-bold tracking-wide sm:inline">
              STUDIO E
            </span>
          </Link>
          <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
            ${PRICING.ticket} · Friend free
          </p>
          <button
            type="button"
            onClick={() => goTicket("header")}
            className={`${primaryCtaClass} !w-auto !px-3 !py-2.5 !text-[10px] sm:!px-4 sm:!text-xs`}
          >
            {COPY.primaryCta}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={WORKSHOPS[0].flyer}
          alt=""
          fill
          priority
          className="object-cover object-[center_18%] opacity-35"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1610]/50 via-[#0A1610]/85 to-[#0A1610]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {snowFlakes.map((flake) => (
            <span
              key={flake.id}
              className="absolute top-0 rounded-full bg-white"
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

        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
          <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#E8C97A]">
            {COPY.heroEyebrow}
          </p>
          <h1 className="mt-4 text-center font-montserrat text-[1.65rem] font-black leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/85 sm:text-base">
            {COPY.heroSubheadline}
          </p>

          <dl className="mx-auto mt-7 grid max-w-lg grid-cols-2 gap-3 text-center sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/35 px-3 py-3">
              <dt className="text-[10px] font-bold uppercase tracking-wider text-white/50">Dates</dt>
              <dd className="mt-1 font-montserrat text-sm font-black">Dec 3 · 10 · 17</dd>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/35 px-3 py-3">
              <dt className="text-[10px] font-bold uppercase tracking-wider text-white/50">Time</dt>
              <dd className="mt-1 font-montserrat text-sm font-black">8:30–10:00 PM</dd>
            </div>
            <div className="col-span-2 rounded-xl border border-white/10 bg-black/35 px-3 py-3 sm:col-span-1">
              <dt className="text-[10px] font-bold uppercase tracking-wider text-white/50">Level</dt>
              <dd className="mt-1 font-montserrat text-sm font-black">Advanced</dd>
            </div>
          </dl>

          <p className="mx-auto mt-4 flex max-w-lg items-start justify-center gap-1.5 text-center text-sm text-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C41E3A]" aria-hidden />
            <span>
              {VENUE.name}, {VENUE.addressLine}, {VENUE.cityLine}
            </span>
          </p>

          <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-[#C41E3A]/45 bg-black/45 px-5 py-4 text-center">
            <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C97A]">
              Workshop ticket
            </p>
            <p className="mt-1 font-montserrat text-5xl font-black text-white">${PRICING.ticket}</p>
            <p className="mt-1 text-sm font-semibold text-white/80">Includes one friend free</p>
            <p className="mt-2 text-xs text-white/55">
              One ticket = one workshop night · Cap {PRICING.capacityPerWorkshop} per night
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-md">
            <Countdown parts={parts} ended={ended} />
          </div>

          <div className="mx-auto mt-7 max-w-md">
            <button type="button" onClick={() => goTicket("hero")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
            <p className="mt-3 text-center text-xs text-white/55">
              Next: choose your workshop → checkout → reply with your friend’s name
            </p>
          </div>
        </div>
      </section>

      {/* Early checkout */}
      <section
        id="checkout"
        className="scroll-mt-20 border-y border-white/10 bg-[#102018] px-4 py-12 sm:px-6"
        aria-labelledby="checkout-heading"
      >
        <CheckoutPanel
          checkoutSrc={checkoutSrc}
          iframeReady={iframeReady}
          selectedTitle={selected?.title ?? null}
          onRetry={() => setCheckoutSrc(rebuildCheckoutSrc(selectedId))}
          headingId="checkout-heading"
        />
        <p className="mx-auto mt-4 max-w-md text-center text-xs text-white/50">
          Prefer to pick a night first?{" "}
          <button
            type="button"
            onClick={() => scrollToId("workshops")}
            className="font-semibold text-[#E8C97A] underline underline-offset-2"
          >
            Jump to workshop selection
          </button>
        </p>
      </section>

      {/* Outcomes */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="value-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="value-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.valueHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/70">{COPY.valueBody}</p>
          <ul className="mt-10 space-y-4">
            {OUTCOMES.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#E8C97A]" aria-hidden />
                <div>
                  <p className="font-montserrat text-base font-black">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 max-w-md">
            <button type="button" onClick={() => goTicket("value")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Workshop cards */}
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
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-white/70">
            {COPY.workshopsBody}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {WORKSHOPS.map((workshop, index) => {
              const isSelected = selectedId === workshop.id
              return (
                <article
                  key={workshop.id}
                  className={`flex flex-col overflow-hidden rounded-2xl border bg-[#0A1610] ${
                    isSelected ? "border-[#E8C97A] ring-2 ring-[#E8C97A]/40" : "border-white/10"
                  }`}
                >
                  <div className="relative aspect-square bg-black/40">
                    <Image
                      src={workshop.flyer}
                      alt={workshop.flyerAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8C97A]">
                      {workshop.dateLabel}
                    </p>
                    <h3 className="mt-1 font-montserrat text-xl font-black tracking-tight">
                      {workshop.title}
                    </h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-white/55">
                      {workshop.style} · {workshop.skillLevel} · {workshop.timeLabel}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">
                      {workshop.outcome}
                    </p>
                    <button
                      type="button"
                      onClick={() => selectWorkshop(workshop.id, `card_${workshop.id}`)}
                      className={`${primaryCtaClass} mt-5 !py-3.5 !text-xs`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? "Selected — Continue to Checkout" : COPY.chooseCta}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="proof-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.proofHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/70">{COPY.proofBody}</p>

          <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-4 text-center">
            <a
              href={SOCIAL.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-[#E8C97A]/40"
            >
              {SOCIAL.googleRating}★ · {SOCIAL.googleReviewCount} Google reviews
            </a>
            <a
              href={SOCIAL.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:border-[#E8C97A]/40"
            >
              {SOCIAL.instagramHandle}
            </a>
          </div>

          <div className="mx-auto mt-10 aspect-video max-w-3xl overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={ASSETS.testimonialVideoEmbed}
              title="Studio E community testimonials"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {ASSETS.gallery.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-900">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex gap-0.5 text-[#E8C97A]" aria-label="5 star Google review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/85">&ldquo;{review.quote}&rdquo;</p>
                <footer className="mt-3 flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-white/60">— {review.name}</span>
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#E8C97A] underline underline-offset-2"
                  >
                    Google review
                  </a>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-5 rounded-2xl border border-white/10 bg-[#102018] p-6 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/15">
              <Image
                src={INSTRUCTOR.photo}
                alt={`${INSTRUCTOR.name}, ${INSTRUCTOR.role}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-montserrat text-lg font-black">{INSTRUCTOR.name}</p>
              <p className="text-sm font-semibold text-[#E8C97A]">{INSTRUCTOR.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{INSTRUCTOR.bio}</p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-md">
            <button type="button" onClick={() => goTicket("proof")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* What to expect / FAQ */}
      <section
        className="border-y border-white/10 bg-[#102018] px-4 py-14 sm:px-6 sm:py-16"
        aria-labelledby="expect-heading"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            id="expect-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.expectHeadline}
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

      {/* Urgency */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="urgency-heading">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#C41E3A]/40 bg-gradient-to-br from-[#3A1018] to-[#0A1610] px-6 py-8 text-center">
          <h2
            id="urgency-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.urgencyHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75">
            {COPY.urgencyBody}
          </p>
          <p className="mt-4 font-montserrat text-sm font-black text-[#E8C97A]">
            ${PRICING.ticket} · Friend free · {PRICING.capacityPerWorkshop} tickets per night
          </p>
          <div className="mx-auto mt-6 max-w-sm">
            <button type="button" onClick={() => goTicket("urgency")} className={primaryCtaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Confirmation flow */}
      <section
        className="border-y border-white/10 bg-[#102018] px-4 py-14 sm:px-6 sm:py-16"
        aria-labelledby="confirm-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="confirm-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.confirmationHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/70">
            {COPY.confirmationBody}
          </p>
          <ol className="mt-10 space-y-5">
            {PROCESS.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C41E3A] font-montserrat text-sm font-black">
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

      {/* Bottom checkout CTA + fallback */}
      <section
        id="checkout-bottom"
        className="scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16"
        aria-labelledby="checkout-bottom-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="checkout-bottom-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.finalHeadline}
          </h2>
          <p className="mt-3 text-base text-white/75">{COPY.finalBody}</p>
          {selected ? (
            <p className="mt-4 text-sm text-[#E8C97A]">
              {COPY.selectedLabel}: <span className="font-bold text-white">{selected.title}</span> ·{" "}
              {selected.dateShort}
            </p>
          ) : null}
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
            <button
              type="button"
              onClick={() => goTicket("final")}
              className={primaryCtaClass}
            >
              {COPY.primaryCta}
            </button>
            {checkoutSrc ? (
              <a
                href={checkoutSrc}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryOutlineClass}
              >
                {COPY.checkoutFallback}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
          </div>
          <p className="mt-6 text-sm text-white/55">
            <MapPin className="mr-1 inline h-3.5 w-3.5 text-[#C41E3A]" aria-hidden />
            {VENUE.name} · {VENUE.addressLine}, {VENUE.cityLine}
          </p>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0A1610]/96 p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => goTicket("sticky_mobile")} className={primaryCtaClass}>
          {COPY.primaryCta} — ${PRICING.ticket}
        </button>
      </div>
    </div>
  )
}
