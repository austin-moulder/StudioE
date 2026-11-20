"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { Check, ChevronDown, ExternalLink, MapPin, Star } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import {
  getCountdownParts,
  type CountdownParts,
} from "@/lib/popup-class/event-time"
import { buildPopupCheckoutUrl } from "@/lib/popup-class/types"
import {
  ASSETS,
  CHECKOUT_PROMO_PARAMS,
  CHECKOUT_URL,
  CONFIRMATION,
  COPY,
  EXPIRE_MS,
  FAQS,
  LAUNCH_MS,
  PRICING,
  SOCIAL,
  STEPS,
  TESTIMONIALS,
  UTM,
  VALUE_STACK,
  VENUE,
  getOfferPhase,
  getPassesLeft,
  type OfferPhase,
} from "@/lib/black-friday-deal/config"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    dataLayer?: Record<string, unknown>[]
  }
}

function track(eventName: string, params?: Record<string, unknown>) {
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

function CountdownBlock({
  parts,
  endedLabel,
  live,
}: {
  parts: CountdownParts
  endedLabel: string
  live: boolean
}) {
  if (!live) {
    return (
      <p className="font-montserrat text-sm font-black text-[#FFD166] sm:text-base">{endedLabel}</p>
    )
  }
  const units: [string, number][] = [
    ["Days", parts.days],
    ["Hrs", parts.hours],
    ["Min", parts.minutes],
    ["Sec", parts.seconds],
  ]
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5" role="timer" aria-live="polite">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="min-w-[3.25rem] rounded-lg border border-white/20 bg-black/40 px-2 py-1.5 text-center"
        >
          <p className="font-montserrat text-lg font-black tabular-nums text-white sm:text-xl">
            {pad(value)}
          </p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-white/65">{label}</p>
        </div>
      ))}
    </div>
  )
}

const ctaClass =
  "inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.4)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD166] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0F] sm:text-base"

const ctaDisabledClass =
  "inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl bg-white/15 px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white/70 sm:text-base"

export default function BlackFridayDealClient() {
  const [phase, setPhase] = useState<OfferPhase>("prelaunch")
  const [parts, setParts] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 1,
  })
  const [passesLeft, setPassesLeft] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [checkoutSrc, setCheckoutSrc] = useState<string | null>(null)
  const [iframeReady, setIframeReady] = useState(false)

  useEffect(() => {
    track("ViewContent", {
      content_name: COPY.offerName,
      content_category: "membership_promo",
      value: PRICING.goldRate,
      currency: "USD",
      content_ids: ["black_friday_bogo_gold"],
    })
    track("BF_PromoView", {
      promo: "black_friday_bogo",
      tag: CHECKOUT_PROMO_PARAMS.tag,
    })

    const src = buildPopupCheckoutUrl(CHECKOUT_URL, UTM, {
      placement: "embed",
      ...CHECKOUT_PROMO_PARAMS,
    })
    setCheckoutSrc(src)
    const t = window.setTimeout(() => setIframeReady(true), 350)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("preview_phase") as
      | OfferPhase
      | null
    const forced =
      preview === "prelaunch" || preview === "live" || preview === "expired" ? preview : null

    const tick = () => {
      const now = Date.now()
      const nextPhase = forced ?? getOfferPhase(now)
      setPhase(nextPhase)
      // Simulate live-window scarcity when previewing live before launch.
      const scarcityNow =
        forced === "live" && now < LAUNCH_MS
          ? LAUNCH_MS + Math.min(now % (EXPIRE_MS - LAUNCH_MS), EXPIRE_MS - LAUNCH_MS - 1)
          : forced === "expired"
            ? EXPIRE_MS
            : now
      setPassesLeft(getPassesLeft(scarcityNow))
      const target =
        nextPhase === "prelaunch" ? LAUNCH_MS : nextPhase === "live" ? EXPIRE_MS : EXPIRE_MS
      setParts(
        nextPhase === "expired"
          ? { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 }
          : getCountdownParts(target, now)
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const isLive = phase === "live"

  const goCheckout = useCallback(
    (placement: string) => {
      if (!isLive) {
        document.getElementById(phase === "prelaunch" ? "offer-details" : "expired")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        return
      }
      track("InitiateCheckout", {
        content_name: COPY.offerName,
        content_category: "membership_promo",
        value: PRICING.goldRate,
        currency: "USD",
        placement,
        promo: "black_friday_bogo",
        tag: CHECKOUT_PROMO_PARAMS.tag,
      })
      track("BF_CheckoutStart", {
        placement,
        tag: CHECKOUT_PROMO_PARAMS.tag,
      })
      document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
    },
    [isLive, phase]
  )

  const stickyLabel =
    phase === "prelaunch"
      ? COPY.stickyPrelaunch
      : phase === "live"
        ? `${COPY.stickyLive} ${passesLeft ?? "—"} left`
        : COPY.stickyExpired

  return (
    <div className="min-h-screen scroll-smooth bg-[#0B0B0F] pb-24 text-white antialiased sm:pb-0">
      {/* Sticky announcement + countdown */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#12080C]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-3 py-2.5 sm:flex-row sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" aria-label="Studio E home" className="shrink-0">
              <StudioELogo width={28} height={28} alt="Studio E" className="h-7 w-7" />
            </Link>
            <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.14em] text-[#FFD166] sm:text-xs">
              {stickyLabel}
            </p>
          </div>
          <CountdownBlock
            parts={parts}
            endedLabel={phase === "expired" ? COPY.offerEnded : COPY.offerNotOpen}
            live={phase !== "expired"}
          />
          {isLive ? (
            <button
              type="button"
              onClick={() => goCheckout("announcement_bar")}
              className={`${ctaClass} !w-auto !px-4 !py-2 !text-[10px] sm:!text-xs`}
            >
              {COPY.stickyCta}
            </button>
          ) : (
            <p className="hidden font-montserrat text-[10px] font-bold uppercase tracking-wide text-white/50 sm:block">
              {phase === "prelaunch" ? "Fri Nov 27 · 7 AM–7 PM" : "Sold out / closed"}
            </p>
          )}
        </div>
      </div>

      {/* Impossible-to-miss banners */}
      <div className="border-b border-[#FF3366]/40 bg-[#FF3366] px-4 py-2.5 text-center">
        <p className="font-montserrat text-[11px] font-black uppercase tracking-[0.16em] text-white sm:text-xs">
          {COPY.newMemberBanner}
        </p>
      </div>
      <div className="border-b border-[#FFD166]/30 bg-[#1A1408] px-4 py-2 text-center">
        <p className="font-montserrat text-[11px] font-bold tracking-wide text-[#FFD166] sm:text-xs">
          {COPY.creditBanner}
        </p>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden" id="offer-details">
        <Image
          src={ASSETS.hero}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/55 via-[#0B0B0F]/85 to-[#0B0B0F]" />

        <div className="relative mx-auto max-w-3xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
          <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.28em] text-[#FFD166]">
            {COPY.heroEyebrow}
          </p>
          <p className="mt-3 text-center font-montserrat text-sm font-black uppercase tracking-[0.12em] text-[#FF7A5A] sm:text-base">
            {COPY.conceptLine}
          </p>
          <h1 className="mt-3 text-center font-montserrat text-[1.7rem] font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/85 sm:text-base">
            {COPY.heroSubheadline}
          </p>

          <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-[#FFD166]/35 bg-black/45 px-5 py-5 text-center">
            <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFD166]">
              Gold Plan · First-class rate
            </p>
            <p className="mt-1 font-montserrat text-2xl font-bold text-white/40 line-through">
              ${PRICING.goldRegular}
            </p>
            <p className="font-montserrat text-5xl font-black text-white">
              ${PRICING.goldRate}
              <span className="text-base font-bold text-white/70"> / first 28 days</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-[#FFD166]">
              + next 28 days credited free
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/65">{COPY.accessNote}</p>
            {passesLeft != null && phase !== "expired" ? (
              <p className="mt-3 font-montserrat text-sm font-black text-[#FF7A5A]" aria-live="polite">
                {passesLeft} of 20 BOGO passes left
              </p>
            ) : null}
          </div>

          <div className="mx-auto mt-6 max-w-md text-center">
            <p className="mb-2 font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
              {phase === "prelaunch" ? COPY.countdownToLaunch : COPY.countdownToExpire}
            </p>
            <CountdownBlock
              parts={parts}
              endedLabel={phase === "expired" ? COPY.offerEnded : COPY.offerNotOpen}
              live={phase !== "expired"}
            />
          </div>

          <div className="mx-auto mt-8 max-w-md">
            {isLive ? (
              <button type="button" onClick={() => goCheckout("hero")} className={ctaClass}>
                {COPY.primaryCta}
              </button>
            ) : (
              <p className={ctaDisabledClass}>
                {phase === "prelaunch" ? COPY.prelaunchCta : COPY.expiredCta}
              </p>
            )}
            <p className="mt-3 text-center text-xs text-white/55">
              Must purchase on this page · Cannot combine with other offers
            </p>
          </div>

          <p className="mx-auto mt-5 flex max-w-md items-start justify-center gap-1.5 text-center text-sm text-white/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
            <span>
              {VENUE.name} · {VENUE.addressLine}, {VENUE.cityLine}
            </span>
          </p>
        </div>
      </section>

      {/* Value stack */}
      <section className="border-y border-white/10 bg-[#121018] px-4 py-14 sm:px-6" aria-labelledby="value-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="value-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.valueHeadline}
          </h2>
          <ul className="mt-10 space-y-3">
            {VALUE_STACK.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FFD166]" aria-hidden />
                <div>
                  <p className="font-montserrat text-base font-black">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-10 max-w-md">
            {isLive ? (
              <button type="button" onClick={() => goCheckout("value")} className={ctaClass}>
                {COPY.primaryCta}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-14 sm:px-6" aria-labelledby="how-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="how-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.howHeadline}
          </h2>
          <ol className="mt-10 space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-[#121018] px-4 py-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black">
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

      {/* Media — class footage + photos */}
      <section
        className="border-y border-white/10 bg-[#121018] px-4 py-14 sm:px-6"
        aria-labelledby="media-heading"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="media-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.mediaHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/70">{COPY.mediaBody}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {ASSETS.videos.map((video) => (
              <div
                key={video.src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-black"
              >
                <video
                  className="aspect-[9/16] max-h-[420px] w-full object-cover md:aspect-video md:max-h-none"
                  src={video.src}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={video.label}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {ASSETS.gallery.map((photo, i) => (
              <div key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-stone-900">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  priority={i < 2}
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="px-4 py-14 sm:px-6" aria-labelledby="proof-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="proof-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.proofHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-white/70">{COPY.proofBody}</p>

          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SOCIAL.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85"
            >
              {SOCIAL.googleRating}★ · {SOCIAL.googleReviewCount} Google reviews
            </a>
            <a
              href={SOCIAL.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85"
            >
              {SOCIAL.instagramHandle}
            </a>
          </div>

          <div className="mx-auto mt-8 aspect-video max-w-3xl overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={ASSETS.testimonialVideoEmbed}
              title="Studio E community testimonials"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex gap-0.5 text-[#FFD166]" aria-label="5 star review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
                  ))}
                </div>
                <p className="mt-2 font-montserrat text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF7A5A]">
                  {t.outcome}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-white/60">— {t.name}</span>
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#FFD166] underline underline-offset-2"
                  >
                    Google
                  </a>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-md">
            {isLive ? (
              <button type="button" onClick={() => goCheckout("proof")} className={ctaClass}>
                {COPY.primaryCta}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="border-y border-white/10 bg-[#121018] px-4 py-12 sm:px-6" aria-labelledby="urgency-heading">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#FF3366]/40 bg-gradient-to-br from-[#3A1018] to-[#0B0B0F] px-6 py-8 text-center">
          <h2
            id="urgency-heading"
            className="font-montserrat text-2xl font-black tracking-tight sm:text-3xl"
          >
            {COPY.urgencyHeadline}
          </h2>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-white/75">{COPY.urgencyBody}</p>
          {passesLeft != null && phase !== "expired" ? (
            <p className="mt-4 font-montserrat text-2xl font-black text-[#FF7A5A]">
              {passesLeft} / 20 remaining
            </p>
          ) : null}
          <div className="mt-5">
            <CountdownBlock
              parts={parts}
              endedLabel={COPY.offerEnded}
              live={phase !== "expired"}
            />
          </div>
          {isLive ? (
            <div className="mx-auto mt-6 max-w-sm">
              <button type="button" onClick={() => goCheckout("urgency")} className={ctaClass}>
                {COPY.primaryCta}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14 sm:px-6" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-2xl">
          <h2
            id="faq-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.faqHeadline}
          </h2>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
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
                      className={`h-5 w-5 shrink-0 text-[#FFD166] transition ${open ? "rotate-180" : ""}`}
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

      {/* Final CTA */}
      <section className="bg-gradient-to-b from-[#FF3366] via-[#8B1538] to-[#0B0B0F] px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-white/90">{COPY.finalBody}</p>
          <div className="mt-6">
            <CountdownBlock
              parts={parts}
              endedLabel={COPY.offerEnded}
              live={phase !== "expired"}
            />
          </div>
          {isLive ? (
            <div className="mx-auto mt-8 max-w-md">
              <button type="button" onClick={() => goCheckout("final")} className={ctaClass}>
                {COPY.primaryCta}
              </button>
            </div>
          ) : (
            <p className="mt-8 font-montserrat text-sm font-bold text-white/80">
              {phase === "prelaunch" ? COPY.offerNotOpen : COPY.offerEnded}
            </p>
          )}
        </div>
      </section>

      {/* Checkout */}
      {isLive ? (
        <section
          id="checkout"
          className="scroll-mt-24 border-t border-white/10 px-4 py-14 sm:px-6"
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
            <p className="mx-auto mt-3 max-w-md text-center font-montserrat text-xs font-black uppercase tracking-[0.14em] text-[#FF3366]">
              {COPY.newMemberBanner}
            </p>
            <p className="mx-auto mt-2 max-w-md text-center text-xs text-white/55">
              After purchase you&apos;ll see confirmation of your free 28-day credit. Staff tag:{" "}
              {CONFIRMATION.staffNote.replace("Staff tag: ", "")}
            </p>

            <div className="mt-5">
              {checkoutSrc ? (
                <a
                  href={checkoutSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track("InitiateCheckout", {
                      content_name: COPY.offerName,
                      value: PRICING.goldRate,
                      currency: "USD",
                      placement: "fallback_link",
                    })
                    track("BF_CheckoutStart", { placement: "fallback_link" })
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#FFD166]/60 px-6 py-3.5 font-montserrat text-sm font-black uppercase tracking-wide text-[#FFD166]"
                >
                  {COPY.checkoutFallback}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              ) : null}
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              {checkoutSrc && iframeReady ? (
                <iframe
                  src={checkoutSrc}
                  title="Black Friday BOGO Gold Plan checkout"
                  className="block min-h-[820px] w-full border-0 bg-white"
                  loading="eager"
                  allow="payment *"
                />
              ) : (
                <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 px-6 py-10 text-center text-sm text-stone-600">
                  <p>Checkout is opening… Use the button above anytime.</p>
                  {checkoutSrc ? (
                    <a
                      href={checkoutSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-montserrat text-sm font-black uppercase text-[#FF3366] underline"
                    >
                      {COPY.checkoutFallback}
                    </a>
                  ) : null}
                </div>
              )}
            </div>

            <p className="mt-4 text-center text-xs text-stone-400">
              After checkout, open{" "}
              <Link href="/black-friday-deal/confirmation" className="underline text-[#FFD166]">
                your BOGO confirmation
              </Link>{" "}
              for credit details.
            </p>
          </div>
        </section>
      ) : (
        <section id="expired" className="scroll-mt-24 px-4 py-14 text-center sm:px-6">
          <p className="font-montserrat text-lg font-black text-[#FF3366]">
            {phase === "prelaunch" ? COPY.offerNotOpen : COPY.offerEnded}
          </p>
          {phase === "prelaunch" ? (
            <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
              Bookmark this page. Checkout unlocks Friday, November 27 at 7:00 AM America/Chicago and
              closes at 7:00 PM — 20 passes only.
            </p>
          ) : (
            <Link
              href="/membership"
              className="mt-6 inline-flex font-montserrat text-sm font-bold text-[#FFD166] underline"
            >
              See current membership options
            </Link>
          )}
        </section>
      )}

      {/* Page footer */}
      <footer className="border-t border-white/10 px-4 py-10 text-center text-xs text-white/50 sm:px-6">
        <p className="font-montserrat text-sm font-bold text-white/80">{VENUE.name}</p>
        <p className="mt-1">
          {VENUE.addressLine}, {VENUE.cityLine}
        </p>
        <p className="mt-1">
          <a href={`mailto:${VENUE.email}`} className="underline underline-offset-2 hover:text-white/80">
            {VENUE.email}
          </a>
          {" · "}
          <a href={`tel:${VENUE.phoneTel}`} className="underline underline-offset-2 hover:text-white/80">
            {VENUE.phone}
          </a>
        </p>
        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label="Legal">
          <Link href="/privacy" className="underline underline-offset-2 hover:text-white/80">
            Privacy Policy
          </Link>
          <Link href="/terms" className="underline underline-offset-2 hover:text-white/80">
            Terms of Service
          </Link>
          <Link href="/terms" className="underline underline-offset-2 hover:text-white/80">
            Cancellation Policy
          </Link>
          <Link href="/codeofconduct" className="underline underline-offset-2 hover:text-white/80">
            Code of Conduct
          </Link>
        </nav>
        <p className="mt-4 text-[10px] text-white/40">
          Black Friday BOGO Month · New members only · One free 28-day credit · Must purchase on this
          page · Not combinable with other offers
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      {isLive ? (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0B0B0F]/96 p-3 backdrop-blur sm:hidden">
          <button type="button" onClick={() => goCheckout("sticky_mobile")} className={ctaClass}>
            {COPY.stickyCta} — ${PRICING.goldRate}
          </button>
        </div>
      ) : null}
    </div>
  )
}
