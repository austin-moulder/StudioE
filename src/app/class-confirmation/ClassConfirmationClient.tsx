"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { CheckCircle, Clock, MapPin, Sparkles, Zap } from "lucide-react"
import {
  BENEFITS,
  COPY,
  IMAGES,
  OFFER_SECONDS,
  PRICING,
  USE_CASES,
  buildPrivateCheckoutUrl,
} from "@/lib/class-confirmation/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

const SPOTS_KEY = "studioe_class_confirmation_private_spots_v1"
const SPOTS_MIN = 2
const SPOTS_MAX = 6

function getSpotsLeft(): number {
  if (typeof window === "undefined") return 4
  try {
    const raw = window.localStorage.getItem(SPOTS_KEY)
    if (raw) {
      const n = Number(raw)
      if (Number.isInteger(n) && n >= SPOTS_MIN && n <= SPOTS_MAX) return n
    }
  } catch {
    /* ignore */
  }
  const count = Math.floor(Math.random() * (SPOTS_MAX - SPOTS_MIN + 1)) + SPOTS_MIN
  try {
    window.localStorage.setItem(SPOTS_KEY, String(count))
  } catch {
    /* ignore */
  }
  return count
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
  "inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-white shadow-lg transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

export default function ClassConfirmationClient() {
  const [timeLeft, setTimeLeft] = useState(OFFER_SECONDS)
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)

  useEffect(() => {
    setSpotsLeft(getSpotsLeft())
    trackMeta("ViewContent", {
      content_name: "50% Off Private Upsell",
      content_category: "private_lesson",
      value: PRICING.sale,
      currency: "USD",
    })
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) return
    const id = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(id)
  }, [timeLeft])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")
  const offerExpired = timeLeft <= 0

  const goCheckout = useCallback(
    (placement: string) => {
      if (offerExpired) return
      trackMeta("InitiateCheckout", {
        content_name: "50% Off Private",
        value: PRICING.sale,
        currency: "USD",
        placement,
      })
      window.location.href = buildPrivateCheckoutUrl({ placement })
    },
    [offerExpired]
  )

  return (
    <div className="min-h-screen bg-[#F7F1E8] pb-24 text-stone-900 antialiased sm:pb-0">
      {/* Thank you */}
      <header className="relative isolate overflow-hidden bg-[#1C1410] text-white">
        <Image
          src={IMAGES.hero}
          alt="Studio E dancers in a private lesson"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-[#1C1410]/80 to-[#1C1410]/50" />
        <div className="relative z-10 mx-auto max-w-xl px-4 py-14 text-center sm:px-6 sm:py-16">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle className="h-9 w-9 text-green-400" aria-hidden />
          </div>
          <h1 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {COPY.thankYouHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            {COPY.thankYouBody}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="overflow-hidden rounded-2xl border-2 border-[#FF3366] bg-white shadow-xl">
          <div className="bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-5 py-6 text-center text-white sm:px-6">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
              <Sparkles className="h-4 w-4" aria-hidden />
              {COPY.offerEyebrow}
            </div>
            <h2 className="font-montserrat text-2xl font-black sm:text-3xl">{COPY.offerHeadline}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/90 sm:text-base">
              {COPY.offerSubheadline}
            </p>
            <div className="mt-4 flex items-baseline justify-center gap-3">
              <span className="font-montserrat text-2xl font-bold text-white/60 line-through">
                ${PRICING.regular}
              </span>
              <span className="font-montserrat text-5xl font-black">${PRICING.sale}</span>
            </div>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/85">
              {PRICING.discountLabel} · today only on this page
            </p>
          </div>

          <div className="p-5 sm:p-7">
            <div className="mb-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-5 text-center">
              <div className="flex items-center gap-2 text-red-600">
                <Clock className="h-5 w-5" aria-hidden />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {offerExpired ? "Offer expired" : "This offer expires in"}
                </span>
              </div>
              <span
                className={`font-montserrat text-4xl font-black tabular-nums sm:text-5xl ${
                  offerExpired ? "text-gray-400" : "text-red-600"
                }`}
              >
                {minutes}:{seconds}
              </span>
              {spotsLeft !== null && !offerExpired ? (
                <p className="text-sm font-semibold text-red-700">
                  Only {spotsLeft} discounted private{spotsLeft === 1 ? "" : "s"} left at this price
                </p>
              ) : null}
            </div>

            {!offerExpired ? (
              <button type="button" onClick={() => goCheckout("offer_card")} className={ctaClass}>
                {COPY.primaryCta}
              </button>
            ) : (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-center text-stone-600">
                {COPY.expiredMessage}
              </div>
            )}

            <h3 className="mb-4 mt-8 font-montserrat text-lg font-black text-stone-900">
              {COPY.whyHeadline}
            </h3>
            <ul className="space-y-3">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-stone-700 sm:text-base">
                  <Zap className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {USE_CASES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-stone-200 bg-stone-50 p-4"
                >
                  <p className="font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3 rounded-xl border border-[#E8DCC8] bg-[#F7F1E8] p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
              <p className="text-sm leading-relaxed text-stone-700">{COPY.suburbNote}</p>
            </div>

            {!offerExpired ? (
              <button
                type="button"
                onClick={() => goCheckout("offer_card_bottom")}
                className={`mt-8 ${ctaClass}`}
              >
                Lock In Before Time Runs Out
              </button>
            ) : null}
          </div>
        </div>

        {/* Photos */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200">
            <Image
              src={IMAGES.practice}
              alt="Student practicing with an instructor at Studio E"
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200">
            <Image
              src={IMAGES.community}
              alt="Studio E dancers smiling after class"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-stone-500">
          Questions?{" "}
          <a
            href="mailto:studioelatindance@gmail.com"
            className="font-medium text-[#FF3366] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
          >
            Email the Studio E team
          </a>
        </p>
      </div>

      {!offerExpired ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 backdrop-blur sm:hidden">
          <button type="button" onClick={() => goCheckout("sticky")} className={ctaClass}>
            {COPY.stickyCta}
          </button>
        </div>
      ) : null}
    </div>
  )
}
