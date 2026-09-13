"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import OfferVideo from "@/components/OfferVideo"
import {
  FAQS,
  FOOTER,
  HOW_IT_WORKS,
  OFFER,
  OFFER_STACK,
  VIDEO,
  buildCheckoutUrl,
  getFixedOfferExpiryMs,
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
}

function getExpiryTimestamp(): number {
  return getFixedOfferExpiryMs()
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

const ctaClass =
  "w-full rounded-xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-white shadow-lg transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

export default function ConsolationPassClient() {
  const [expiresAt, setExpiresAt] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 24, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* 1. Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] text-white">
        <div className="absolute inset-0 bg-black/15" aria-hidden />
        <div className="relative mx-auto max-w-xl px-4 pb-12 pt-10 sm:px-6 sm:pt-14">
          <p className="mb-4 text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-white/90">
            Studio E · Chicago
          </p>
          <h1 className="text-center font-montserrat text-[1.65rem] font-black leading-[1.15] tracking-tight sm:text-4xl">
            {OFFER.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-center text-base leading-relaxed text-white/90 sm:text-lg">
            {OFFER.subheadline}
          </p>

          <div
            className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/30 bg-white/15 px-4 py-5 text-center backdrop-blur-sm"
            role="timer"
            aria-live="polite"
            aria-label={OFFER.countdownLabel}
          >
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-white">
              {OFFER.countdownLabel}
            </p>
            {expired ? (
              <p className="mt-3 font-montserrat text-2xl font-black">Offer expired</p>
            ) : (
              <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3">
                {(
                  [
                    ["Hours", timeLeft.hours],
                    ["Min", timeLeft.minutes],
                    ["Sec", timeLeft.seconds],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-[4.25rem] rounded-xl bg-white px-2 py-2 text-gray-900"
                  >
                    <div className="font-montserrat text-2xl font-black tabular-nums sm:text-3xl">
                      {pad(value)}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="mx-auto mt-6 max-w-md text-center text-sm font-semibold leading-relaxed text-white sm:text-base">
            {OFFER.purchaseUrgency}
          </p>

          <div className="mt-8">
            <button
              type="button"
              disabled={expired}
              onClick={() => goToCheckout("hero")}
              className="w-full rounded-xl bg-white px-6 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {OFFER.ctaPrimary}
            </button>
            <p className="mt-3 text-center text-xs leading-relaxed text-white/80">
              {OFFER.finePrint}
            </p>
          </div>
        </div>
      </header>

      {/* 2. How it works — purchase vs redeem */}
      <section className="border-b border-gray-100 px-4 py-12 sm:px-6" aria-labelledby="how-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="how-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight text-gray-900 sm:text-3xl"
          >
            Purchase now. Redeem later.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base leading-relaxed text-gray-600">
            Buy in the next 24 hours. Start dancing anytime before {OFFER.redeemBy} by booking your first class.
          </p>
          <ol className="mt-8 space-y-4">
            {HOW_IT_WORKS.map((step) => (
              <li key={step.title} className="rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
                <p className="font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366]">
                  {step.title}
                </p>
                <p className="mt-1.5 text-base leading-relaxed text-gray-700">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. VSL */}
      <section className="border-b border-gray-100 bg-gray-50 px-4 py-12 sm:px-6" aria-labelledby="vsl-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="vsl-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight text-gray-900 sm:text-3xl"
          >
            Watch this next
          </h2>
          <OfferVideo
            src={VIDEO.src}
            poster={VIDEO.poster}
            title="Studio E giveaway follow-up video about the 2-week unlimited pass"
            onPlayStart={() => trackEvent("video_start", { video: "Giveaway_Second_Place" })}
            onTimeUpdate={(pct) => {
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
            }}
            onComplete={() => {
              if (!milestones.current.complete) {
                milestones.current.complete = true
                trackEvent("video_complete")
              }
            }}
          />
        </div>
      </section>

      {/* 4. Offer stack */}
      <section className="px-4 py-12 sm:px-6" aria-labelledby="stack-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="stack-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight text-gray-900 sm:text-3xl"
          >
            What’s included
          </h2>
          <ul className="mt-8 space-y-3">
            {OFFER_STACK.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                <span className="text-base leading-snug text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            disabled={expired}
            onClick={() => goToCheckout("offer_stack")}
            className={`mt-8 ${ctaClass}`}
          >
            {OFFER.ctaPrimary}
          </button>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Lock It In Before the Timer Ends
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">
            Purchase in the next 24 hours for ${OFFER.price}. Redeem anytime before{" "}
            {OFFER.redeemBy} by booking your first class.
          </p>
          <button
            type="button"
            disabled={expired}
            onClick={() => goToCheckout("mid_cta")}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-montserrat text-base font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            {OFFER.ctaSecondary}
          </button>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="faq-heading"
            className="mb-6 text-center font-montserrat text-2xl font-black tracking-tight text-gray-900 sm:text-3xl"
          >
            FAQ
          </h2>
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
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
                      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3366]"
                    >
                      <span className="font-montserrat text-sm font-bold text-gray-900 sm:text-base">
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
                    className="px-4 pb-4"
                  >
                    <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
                    {item.linkHref ? (
                      <a
                        href={item.linkHref}
                        className="mt-2 inline-block text-sm font-semibold text-[#FF3366] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
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
            className={`mt-8 ${ctaClass}`}
          >
            {OFFER.ctaPrimary}
          </button>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-600 sm:px-6">
        <div className="mx-auto max-w-xl space-y-3">
          <p className="font-montserrat text-base font-bold text-gray-900">{FOOTER.businessName}</p>
          <p>{FOOTER.address}</p>
          <p>
            <a
              href={`mailto:${FOOTER.email}`}
              className="text-[#FF3366] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
            >
              {FOOTER.email}
            </a>
            {" · "}
            <a
              href={`tel:+18164196279`}
              className="text-[#FF3366] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
            >
              {FOOTER.phone}
            </a>
          </p>
          <p className="pt-2">
            <a
              href={FOOTER.officialRulesHref}
              className="underline-offset-2 hover:text-[#FF3366] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
            >
              Official rules
            </a>
            {" · "}
            <a
              href={FOOTER.termsHref}
              className="underline-offset-2 hover:text-[#FF3366] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
            >
              Terms
            </a>
            {" · "}
            <a
              href={FOOTER.privacyHref}
              className="underline-offset-2 hover:text-[#FF3366] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
            >
              Privacy
            </a>
          </p>
          <p className="pt-2 text-xs leading-relaxed text-gray-500">
            {FOOTER.residencyNote} {FOOTER.eligibilityNote}
          </p>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <button
          type="button"
          disabled={expired}
          onClick={() => goToCheckout("sticky")}
          className={ctaClass}
        >
          {OFFER.ctaSecondary}
        </button>
      </div>
      <div className="h-20 sm:hidden" aria-hidden />
    </div>
  )
}
