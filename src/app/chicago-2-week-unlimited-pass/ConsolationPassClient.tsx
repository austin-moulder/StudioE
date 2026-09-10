"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Check, ChevronDown, Play } from "lucide-react"
import {
  FAQS,
  FOOTER,
  OFFER,
  OFFER_STACK,
  STORAGE_KEY,
  VIDEO,
  buildCheckoutUrl,
} from "@/lib/consolation-pass/config"

type TimeLeft = { hours: number; minutes: number; seconds: number }

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Central event helper.
 * - GA / GTM: pushes to dataLayer and calls gtag('event', ...) when present
 * - Meta Pixel: call fbq('trackCustom', name, props) when pixel is installed
 * - GHL: listen via GTM custom events or add a GHL tracking script that hooks these names
 */
function trackEvent(name: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...props })

  if (typeof window.gtag === "function") {
    window.gtag("event", name, props)
  }

  // Meta Pixel — uncomment / ensure fbq is loaded site-wide:
  // if (typeof window.fbq === "function") window.fbq("trackCustom", name, props)

  // GHL — optional: postMessage / fetch to a webhook when connected
  // fetch("/api/track-activity", { method: "POST", body: JSON.stringify({ name, props }) })
}

function getExpiryTimestamp(): number {
  if (typeof window === "undefined") return Date.now() + OFFER.expiryHours * 60 * 60 * 1000

  const params = new URLSearchParams(window.location.search)
  const expiresParam = params.get("expires")
  const deliveredParam = params.get("delivered") || params.get("delivered_at")

  if (expiresParam) {
    const parsed = Date.parse(expiresParam)
    if (!Number.isNaN(parsed)) return parsed
  }

  if (deliveredParam) {
    const delivered = Date.parse(deliveredParam)
    if (!Number.isNaN(delivered)) {
      return delivered + OFFER.expiryHours * 60 * 60 * 1000
    }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const n = Number(stored)
      if (!Number.isNaN(n)) return n
    }
  } catch {
    /* ignore */
  }

  const expiresAt = Date.now() + OFFER.expiryHours * 60 * 60 * 1000
  try {
    window.localStorage.setItem(STORAGE_KEY, String(expiresAt))
  } catch {
    /* ignore */
  }
  return expiresAt
}

function calcTimeLeft(expiresAt: number): TimeLeft {
  const diff = Math.max(0, expiresAt - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

export default function ConsolationPassClient() {
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 24, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showPlayOverlay, setShowPlayOverlay] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const milestones = useRef({ p25: false, p50: false, p75: false, complete: false })

  useEffect(() => {
    trackEvent("page_view", { page: "/chicago-2-week-unlimited-pass" })
    const expiry = getExpiryTimestamp()
    setExpiresAt(expiry)
    setTimeLeft(calcTimeLeft(expiry))
  }, [])

  useEffect(() => {
    if (!expiresAt) return
    const tick = () => {
      const next = calcTimeLeft(expiresAt)
      setTimeLeft(next)
      if (next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
        setExpired(true)
      }
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [expiresAt])

  const goToCheckout = useCallback((placement: string) => {
    trackEvent("cta_click", { placement, offer: "2_week_unlimited_25" })
    trackEvent("checkout_redirect", { placement })
    window.location.href = buildCheckoutUrl({ placement })
  }, [])

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    setShowPlayOverlay(false)
    video
      .play()
      .then(() => setVideoPlaying(true))
      .catch(() => {
        setShowPlayOverlay(true)
        setVideoPlaying(false)
      })
  }

  const onVideoPlay = () => {
    setVideoPlaying(true)
    setShowPlayOverlay(false)
    trackEvent("video_start", { video: "Giveaway_Second_Place" })
  }

  const onVideoTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const pct = (video.currentTime / video.duration) * 100
    if (pct >= 25 && !milestones.current.p25) {
      milestones.current.p25 = true
      trackEvent("video_25")
    }
    if (pct >= 50 && !milestones.current.p50) {
      milestones.current.p50 = true
      trackEvent("video_50")
    }
    if (pct >= 75 && !milestones.current.p75) {
      milestones.current.p75 = true
      trackEvent("video_75")
    }
  }

  const onVideoEnded = () => {
    if (!milestones.current.complete) {
      milestones.current.complete = true
      trackEvent("video_complete")
    }
    setVideoPlaying(false)
    setShowPlayOverlay(true)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5F0E6] font-sans antialiased">
      {/* 1. Hero */}
      <header className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse at top, rgba(201,162,39,0.35), transparent 55%), radial-gradient(ellipse at bottom right, rgba(185,28,28,0.4), transparent 50%)",
          }}
        />
        <div className="relative mx-auto max-w-xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <p className="mb-4 text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
            Studio E · Chicago
          </p>
          <h1 className="text-center font-montserrat text-[1.65rem] font-black leading-[1.15] tracking-tight text-[#F5F0E6] sm:text-4xl">
            {OFFER.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-[#F5F0E6]/85 sm:text-lg">
            {OFFER.subheadline}
          </p>

          <div
            className="mx-auto mt-8 max-w-sm rounded-2xl border border-[#D4AF37]/40 bg-black/50 px-4 py-5 text-center"
            role="timer"
            aria-live="polite"
            aria-label={OFFER.countdownLabel}
          >
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              {OFFER.countdownLabel}
            </p>
            {expired ? (
              <p className="mt-3 font-montserrat text-2xl font-black text-[#F5F0E6]">Offer expired</p>
            ) : (
              <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3">
                {(
                  [
                    ["Hours", timeLeft.hours],
                    ["Min", timeLeft.minutes],
                    ["Sec", timeLeft.seconds],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="min-w-[4.25rem] rounded-xl bg-[#F5F0E6] px-2 py-2 text-[#0a0a0a]">
                    <div className="font-montserrat text-2xl font-black tabular-nums sm:text-3xl">
                      {pad(value)}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-[#0a0a0a]/60">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              type="button"
              disabled={expired}
              onClick={() => goToCheckout("hero")}
              className="w-full rounded-xl bg-[#B91C1C] px-6 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-white shadow-[0_8px_30px_rgba(185,28,28,0.45)] transition hover:bg-[#991B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {OFFER.ctaPrimary}
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-[#F5F0E6]/65">
              {OFFER.finePrint}
            </p>
          </div>
        </div>
      </header>

      {/* 2. VSL */}
      <section className="border-t border-white/10 bg-[#111111] px-4 py-12 sm:px-6" aria-labelledby="vsl-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="vsl-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight text-[#F5F0E6] sm:text-3xl"
          >
            Watch this next
          </h2>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-black">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              preload="metadata"
              poster={VIDEO.poster}
              controls={videoPlaying}
              onPlay={onVideoPlay}
              onTimeUpdate={onVideoTimeUpdate}
              onEnded={onVideoEnded}
              aria-label="Studio E giveaway follow-up video about the 2-week unlimited pass"
            >
              <source src={VIDEO.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {showPlayOverlay ? (
              <button
                type="button"
                onClick={handlePlayClick}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                aria-label="Play video"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B91C1C] text-white shadow-lg">
                  <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
                </span>
                <span className="font-montserrat text-sm font-bold uppercase tracking-wide text-white">
                  Tap to play
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3. Offer stack */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="stack-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight text-[#F5F0E6] sm:text-3xl"
          >
            What’s included
          </h2>
          <ul className="mt-8 space-y-3">
            {OFFER_STACK.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#161616] px-4 py-3.5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden />
                <span className="text-base leading-snug text-[#F5F0E6]">{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled={expired}
            onClick={() => goToCheckout("offer_stack")}
            className="mt-8 w-full rounded-xl bg-[#B91C1C] px-6 py-4 font-montserrat text-base font-black uppercase tracking-wide text-white transition hover:bg-[#991B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {OFFER.ctaPrimary}
          </button>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="border-y border-[#D4AF37]/30 bg-gradient-to-br from-[#1a1208] via-[#0a0a0a] to-[#2a0a0a] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight text-[#F5F0E6] sm:text-4xl">
            Start Dancing This Week
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[#F5F0E6]/75">
            Lock in 14 days of unlimited eligible classes for ${OFFER.price}.
          </p>
          <button
            type="button"
            disabled={expired}
            onClick={() => goToCheckout("mid_cta")}
            className="mt-8 w-full rounded-xl bg-[#D4AF37] px-6 py-4 font-montserrat text-base font-black uppercase tracking-wide text-[#0a0a0a] transition hover:bg-[#E0C04A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            {OFFER.ctaSecondary}
          </button>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="faq-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            FAQ
          </h2>
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#161616]">
            {FAQS.map((item, index) => {
              const open = openFaq === index
              const panelId = `consolation-faq-${index}`
              const buttonId = `consolation-faq-btn-${index}`
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                    >
                      <span className="font-montserrat text-sm font-bold text-[#F5F0E6] sm:text-base">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#D4AF37] transition ${open ? "rotate-180" : ""}`}
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
                    <p className="text-sm leading-relaxed text-[#F5F0E6]/75">{item.answer}</p>
                    {item.linkHref ? (
                      <a
                        href={item.linkHref}
                        className="mt-2 inline-block text-sm font-semibold text-[#D4AF37] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                      >
                        {item.linkLabel ?? item.linkHref}
                      </a>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>

          <button
            type="button"
            disabled={expired}
            onClick={() => goToCheckout("faq")}
            className="mt-8 w-full rounded-xl bg-[#B91C1C] px-6 py-4 font-montserrat text-base font-black uppercase tracking-wide text-white transition hover:bg-[#991B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {OFFER.ctaPrimary}
          </button>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-white/10 bg-black px-4 py-10 text-center text-sm text-[#F5F0E6]/65 sm:px-6">
        <div className="mx-auto max-w-xl space-y-3">
          <p className="font-montserrat text-base font-bold text-[#F5F0E6]">{FOOTER.businessName}</p>
          <p>{FOOTER.address}</p>
          <p>
            <a
              href={`mailto:${FOOTER.email}`}
              className="underline-offset-2 hover:text-[#D4AF37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {FOOTER.email}
            </a>
            {" · "}
            <a
              href={`tel:+18164196279`}
              className="underline-offset-2 hover:text-[#D4AF37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {FOOTER.phone}
            </a>
          </p>
          <p className="pt-2">
            <a
              href={FOOTER.officialRulesHref}
              className="underline-offset-2 hover:text-[#D4AF37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Official rules
            </a>
            {" · "}
            <a
              href={FOOTER.termsHref}
              className="underline-offset-2 hover:text-[#D4AF37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Terms
            </a>
            {" · "}
            <a
              href={FOOTER.privacyHref}
              className="underline-offset-2 hover:text-[#D4AF37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Privacy
            </a>
          </p>
          <p className="pt-2 text-xs leading-relaxed">
            {FOOTER.residencyNote} {FOOTER.eligibilityNote}
          </p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D4AF37]/30 bg-black/95 p-3 backdrop-blur sm:hidden">
        <button
          type="button"
          disabled={expired}
          onClick={() => goToCheckout("sticky")}
          className="w-full rounded-xl bg-[#B91C1C] px-4 py-3.5 font-montserrat text-sm font-black uppercase tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] disabled:opacity-50"
        >
          {OFFER.ctaSecondary}
        </button>
      </div>
      <div className="h-20 sm:hidden" aria-hidden />
    </div>
  )
}
