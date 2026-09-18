"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { Check, ChevronDown, MapPin, Users } from "lucide-react"
import {
  ASSETS,
  COPY,
  EVENT,
  FAQS,
  OFFER_BULLETS,
  OFFER_TERMS,
  buildCheckoutUrl,
} from "@/lib/twerk-thursday/config"
import {
  formatEventDateLabel,
  getCountdownParts,
  getUpcomingEventStartMs,
  type CountdownParts,
} from "@/lib/twerk-thursday/event-time"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

const SPOTS_STORAGE_KEY = "studioe_twerk_thursday_spots_left_v2"
const SPOTS_MIN = 3
const SPOTS_MAX = 12

function getSpotsLeft(): number {
  if (typeof window === "undefined") return 7
  try {
    const raw = window.localStorage.getItem(SPOTS_STORAGE_KEY)
    if (raw) {
      const n = Number(raw)
      if (Number.isInteger(n) && n >= SPOTS_MIN && n <= SPOTS_MAX) return n
    }
  } catch {
    /* ignore */
  }
  const count = Math.floor(Math.random() * (SPOTS_MAX - SPOTS_MIN + 1)) + SPOTS_MIN
  try {
    window.localStorage.setItem(SPOTS_STORAGE_KEY, String(count))
  } catch {
    /* ignore */
  }
  return count
}

function pad(n: number) {
  return String(n).padStart(2, "0")
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
  "mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-[#FF2D6A] px-6 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-white shadow-[0_10px_30px_rgba(255,45,106,0.45)] transition hover:bg-[#E8255C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D6A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0508] sm:text-lg"

function Countdown({
  parts,
  ended,
}: {
  parts: CountdownParts
  ended: boolean
}) {
  if (ended) {
    return (
      <p className="font-montserrat text-xl font-black text-[#FF2D6A] sm:text-2xl">
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
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" role="timer" aria-live="polite">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[4rem] rounded-xl border border-white/15 bg-black/40 px-2.5 py-2 text-center backdrop-blur-sm"
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

export default function TwerkThursdayClient() {
  const [eventStartMs, setEventStartMs] = useState<number | null>(null)
  const [dateLabel, setDateLabel] = useState("")
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 1,
  })
  const [ended, setEnded] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const start = getUpcomingEventStartMs()
    setEventStartMs(start)
    setDateLabel(formatEventDateLabel(start))
    setSpotsLeft(getSpotsLeft())
    trackMeta("ViewContent", {
      content_name: EVENT.name,
      content_category: "event",
      value: EVENT.price,
      currency: "USD",
    })
  }, [])

  useEffect(() => {
    if (!eventStartMs) return
    const tick = () => {
      const next = getCountdownParts(eventStartMs)
      setParts(next)
      setEnded(next.totalMs <= 0)
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [eventStartMs])

  const goCheckout = useCallback((placement: string) => {
    trackMeta("InitiateCheckout", {
      content_name: EVENT.name,
      value: EVENT.price,
      currency: "USD",
      placement,
    })
    window.location.href = buildCheckoutUrl({ placement })
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#1A0508] text-white antialiased pb-24 sm:pb-0">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={ASSETS.flyer}
            alt="Twerk Thursday ladies-only workshop at Studio E"
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A0508]/70 via-[#2A0A12]/85 to-[#1A0508]" />
        </div>

        <div className="relative mx-auto max-w-xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF8FB3]">
            Studio E · Humboldt Park
          </p>
          <p
            className="mt-3 text-center text-2xl text-[#FF2D6A]"
            style={{ fontFamily: "var(--font-twerk-script), cursive" }}
          >
            Ladies Only
          </p>

          <h1 className="mt-3 text-center font-montserrat text-[1.7rem] font-black leading-[1.12] tracking-tight sm:text-4xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-base leading-relaxed text-white/85 sm:text-lg">
            {COPY.heroSubheadline}
          </p>

          <div className="mx-auto mt-6 max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-black/30 shadow-xl">
            <div className="relative aspect-square">
              <Image
                src={ASSETS.flyer}
                alt="Twerk Thursday flyer — bring a friend for free, $25"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 28rem"
              />
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-sm space-y-2 rounded-2xl border border-[#FF2D6A]/35 bg-[#FF2D6A]/10 px-4 py-4 text-center text-sm">
            <p className="font-montserrat text-base font-black text-white">
              {dateLabel || "Loading date…"}
            </p>
            <p className="text-white/85">{EVENT.durationLabel}</p>
            <p className="text-white/85">
              {EVENT.venueName} · {EVENT.addressLine}
            </p>
            <p className="font-montserrat text-lg font-black text-[#FF2D6A]">
              ${EVENT.price} · Bring a friend free
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Starts in
            </p>
            <Countdown parts={parts} ended={ended} />
          </div>

          <div className="mt-8 flex flex-col items-center">
            <button type="button" onClick={() => goCheckout("hero")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
            <p className="mt-3 max-w-md text-center text-xs leading-relaxed text-white/70">
              {COPY.capacityNote}
            </p>
          </div>
        </div>
      </header>

      {/* Video */}
      <section className="border-t border-white/10 px-4 py-12 sm:px-6" aria-labelledby="video-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="video-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.videoHeadline}
          </h2>
          <div className="mx-auto mt-6 flex max-w-[280px] justify-center overflow-hidden rounded-2xl border border-white/15 bg-black shadow-lg sm:max-w-[320px]">
            <video
              className="aspect-[9/16] h-auto w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              poster={ASSETS.flyer}
              aria-label="Twerk Thursday class energy at Studio E"
            >
              <source src={ASSETS.video} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Offer */}
      <section className="bg-[#2A0A12] px-4 py-12 sm:px-6" aria-labelledby="offer-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="offer-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.offerHeadline}
          </h2>
          <ul className="mt-8 space-y-3">
            {OFFER_BULLETS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2D6A]" aria-hidden />
                <span className="text-base leading-snug text-white/90">{item}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-white/65">
            {OFFER_TERMS.map((term) => (
              <li key={term}>• {term}</li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => goCheckout("offer")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Friend offer */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="friend-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="friend-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.friendHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
            {COPY.friendBody}
          </p>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => goCheckout("friend")} className={ctaClass}>
              {COPY.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Limited capacity */}
      <section className="bg-[#2A0A12] px-4 py-12 sm:px-6" aria-labelledby="limited-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="limited-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.limitedHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
            {COPY.limitedBody}
          </p>
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#FF2D6A]/40 bg-[#FF2D6A]/10 px-5 py-6">
            <Users className="mx-auto h-8 w-8 text-[#FF2D6A]" aria-hidden />
            <p className="mt-3 font-montserrat text-sm font-bold uppercase tracking-[0.18em] text-[#FF8FB3]">
              Limited to {EVENT.capacity} attendees
            </p>
            {spotsLeft !== null ? (
              <p className="mt-3 font-montserrat text-3xl font-black text-white">
                {spotsLeft} spot{spotsLeft === 1 ? "" : "s"} left
              </p>
            ) : null}
            <p className="mt-2 text-xs text-white/60">Cap of {EVENT.capacity} total tickets</p>
          </div>
        </div>
      </section>

      {/* Women only */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="women-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="women-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.womenHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
            {COPY.womenBody}
          </p>
          <p className="mt-6 inline-block rounded-full border border-[#FF2D6A] bg-[#FF2D6A]/15 px-5 py-2.5 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF2D6A]">
            {COPY.womenOnlyLine}
          </p>
        </div>
      </section>

      {/* Location */}
      <section className="bg-[#2A0A12] px-4 py-12 sm:px-6" aria-labelledby="location-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="location-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            Where We Dance
          </h2>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <MapPin className="mx-auto h-6 w-6 text-[#FF2D6A]" aria-hidden />
            <p className="mt-3 font-montserrat text-lg font-black">{EVENT.venueName}</p>
            <p className="mt-1 text-white/85">{EVENT.addressLine}</p>
            <p className="text-white/85">{EVENT.cityLine}</p>
            <p className="mt-1 text-sm text-[#FF8FB3]">{EVENT.neighborhood}</p>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Map to Studio E on Division Street"
              src={EVENT.mapsEmbedSrc}
              className="h-48 w-full grayscale-[30%] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => goCheckout("location")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="faq-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            FAQ
          </h2>
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
            {FAQS.map((item, index) => {
              const open = openFaq === index
              const panelId = `twerk-faq-${index}`
              const buttonId = `twerk-faq-btn-${index}`
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF2D6A]"
                    >
                      <span className="font-montserrat text-sm font-bold text-white sm:text-base">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#FF2D6A] transition ${open ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm leading-relaxed text-white/75">{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 bg-gradient-to-br from-[#FF2D6A] via-[#C4184E] to-[#4A0A1C] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">{COPY.finalBody}</p>
          <div className="mt-6 space-y-1 text-sm text-white/90">
            <p className="font-montserrat text-lg font-black">${EVENT.price} · Bring one female friend free</p>
            <p>{dateLabel}</p>
            <p>{EVENT.durationLabel}</p>
          </div>
          <div className="mt-6">
            <Countdown parts={parts} ended={ended} />
          </div>
          {spotsLeft !== null ? (
            <p className="mt-5 font-montserrat text-sm font-bold text-white">
              Only {spotsLeft} ticket{spotsLeft === 1 ? "" : "s"} left · Cap of {EVENT.capacity}
            </p>
          ) : null}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => goCheckout("final")}
              className="mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-base font-black uppercase tracking-wide text-[#FF2D6A] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#C4184E] sm:text-lg"
            >
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      <footer className="px-4 py-8 text-center text-xs text-white/50 sm:px-6">
        <p className="font-montserrat font-bold text-white/70">{EVENT.venueName}</p>
        <p className="mt-1">
          {EVENT.addressLine}, {EVENT.cityLine}
        </p>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#1A0508]/95 p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => goCheckout("sticky")} className={`${ctaClass} max-w-none`}>
          {COPY.stickyCta}
        </button>
      </div>
    </div>
  )
}
