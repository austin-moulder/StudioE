"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Script from "next/script"
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Music3,
  Sparkles,
  Users,
} from "lucide-react"
import SocialDonationFaq from "@/components/social/SocialDonationFaq"
import {
  ASSETS,
  BENEFITS,
  FAQS,
  FRIDAY_THEMES_2026,
  RSVP_FORM,
  SCHEDULE,
  STEPS,
  TESTIMONIALS,
  VENUE,
  formatThemeDateLabel,
  getUpcomingFridayInfo,
} from "@/lib/social/config"

const FORM_IFRAME_ID = `inline-${RSVP_FORM.id}`

type IFrameResizeWindow = Window & {
  iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement) => void
}

function initRsvpFormEmbed() {
  const iframe = document.getElementById(FORM_IFRAME_ID) as HTMLIFrameElement | null
  if (!iframe) return false
  if (iframe.getAttribute("data-iframe-resizer-initialized") === "true") return true
  const { iFrameResize } = window as IFrameResizeWindow
  if (typeof iFrameResize !== "function") return false
  const isMobile = window.matchMedia("(max-width: 768px)").matches
  iFrameResize(
    {
      autoResize: true,
      scrolling: false,
      checkOrigin: false,
      heightCalculationMethod: "max",
      minHeight: isMobile ? 520 : 640,
    },
    iframe
  )
  return true
}

function enableFormScrollFallback() {
  const iframe = document.getElementById(FORM_IFRAME_ID) as HTMLIFrameElement | null
  if (!iframe || iframe.getAttribute("data-iframe-resizer-initialized") === "true") return
  iframe.setAttribute("scrolling", "yes")
  iframe.style.minHeight = "70vh"
  iframe.style.overflow = "auto"
}

const primaryCtaClass =
  "inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.3)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

function RsvpCta({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <a
      href="#rsvp"
      className={
        light
          ? `inline-flex w-full max-w-md items-center justify-center rounded-2xl border-2 border-white bg-white px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] sm:text-base ${className}`
          : `${primaryCtaClass} ${className}`
      }
    >
      Reserve My Free Spot
      <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
    </a>
  )
}

export default function SocialClient() {
  const friday = useMemo(() => getUpcomingFridayInfo(), [])
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      if (initRsvpFormEmbed() || attempts >= 50) {
        if (attempts >= 50) enableFormScrollFallback()
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const displayTheme = friday.isPublic
    ? friday.themeTitle
    : friday.nextPublic?.theme.title ?? friday.themeTitle
  const displayDate = friday.isPublic
    ? friday.dateLabel
    : friday.nextPublic?.dateLabel ?? friday.dateLabel

  return (
    <div className="min-h-screen scroll-smooth bg-[#FAF8F6] pb-24 text-stone-900 antialiased sm:pb-0">
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />

      {/* 1. HERO */}
      <header className="relative overflow-hidden bg-[#1a1a2e] text-white">
        <div className="absolute inset-0">
          <Image
            src={ASSETS.hero}
            alt="Packed Studio E Friday social with dancers filling the Humboldt Park studio"
            fill
            priority
            className="object-cover object-center opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/75 via-[#1a1a2e]/85 to-[#1a1a2e]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:py-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
              <Sparkles className="h-3.5 w-3.5 text-[#FF7A5A]" aria-hidden />
              Studio E · Humboldt Park
            </p>
            <h1 className="mt-4 font-montserrat text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Your Friday Night Just Got Better.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              Learn your first Latin dance steps for free, then stay for social dancing, music, and
              good energy at Studio E in Humboldt Park. And be back in bed by 11pm!
            </p>

            <div className="mt-6 space-y-2 text-sm text-white/90 sm:text-base">
              <p className="flex items-center gap-2 font-semibold">
                <Calendar className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                {friday.isPublic ? friday.dateLabel : `Next public night: ${displayDate}`}
              </p>
              <p className="flex items-center gap-2 font-semibold text-[#FF7A5A]">
                <Music3 className="h-4 w-4" aria-hidden />
                {friday.isPublic ? friday.themeTitle : displayTheme}
              </p>
              {!friday.isPublic ? (
                <p className="rounded-xl border border-amber-300/40 bg-amber-500/15 px-3 py-2 text-sm text-amber-100">
                  {friday.dateLabel} is a private event — no public social. RSVP for the next open
                  Friday below.
                </p>
              ) : null}
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                {SCHEDULE.introLabel}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                {SCHEDULE.socialLabel}
              </p>
              <p className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                No partner needed · Beginner-friendly · All ages welcome
              </p>
            </div>

            <div className="mt-8 hidden lg:block">
              <RsvpCta />
            </div>
          </div>

          {/* Desktop form beside hero */}
          <div id="rsvp" className="scroll-mt-24 lg:scroll-mt-8">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white p-3 shadow-2xl sm:p-4">
              <p className="px-1 pb-2 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-[#FF3366]">
                Save Your Spot
              </p>
              <p className="px-1 pb-3 text-sm text-stone-600">
                RSVP takes less than a minute. We’ll send you the details so you know exactly what
                to expect.
              </p>
              <iframe
                src={RSVP_FORM.url}
                id={FORM_IFRAME_ID}
                data-layout='{"id":"INLINE"}'
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name={RSVP_FORM.name}
                data-height="640"
                data-layout-iframe-id={FORM_IFRAME_ID}
                data-form-id={RSVP_FORM.id}
                title={RSVP_FORM.name}
                className="w-full border-none"
                style={{ minHeight: "520px", width: "100%" }}
              />
            </div>
            <div className="mt-4 lg:hidden">
              <RsvpCta light className="border-white/40 bg-transparent text-white hover:bg-white hover:text-[#FF3366]" />
            </div>
          </div>
        </div>
      </header>

      {/* 3. BENEFIT CARDS */}
      <section className="px-5 py-12 sm:px-8 sm:py-14" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="benefits-heading" className="sr-only">
            Why come to Studio E Fridays
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {BENEFITS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm"
              >
                <h3 className="font-montserrat text-base font-bold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Video proof */}
      <section className="border-y border-stone-200/80 bg-white px-5 py-12 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-montserrat text-2xl font-black sm:text-3xl">
            See the energy
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-stone-600">
            Real Studio E dancers — the same Friday vibe you’ll walk into.
          </p>
          <div className="mx-auto mt-6 max-w-sm overflow-hidden rounded-3xl bg-black shadow-lg">
            <div className="aspect-[9/16] w-full max-h-[640px]">
              <iframe
                src={ASSETS.testimonialVideoEmbed}
                title="Studio E Friday social testimonial reel"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compact gallery */}
      <section className="px-5 py-10 sm:px-8" aria-label="Studio E Friday social photos">
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2">
          {ASSETS.gallery.map((photo) => (
            <div key={photo.src} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHAT TO EXPECT */}
      <section className="bg-white px-5 py-12 sm:px-8 sm:py-14" aria-labelledby="expect-heading">
        <div className="mx-auto max-w-4xl">
          <h2
            id="expect-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            What to expect
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-stone-200/80 bg-[#FAF8F6] p-5 text-center sm:text-left"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF3366] text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-montserrat text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-2 text-sm text-stone-700 sm:grid-cols-2">
            {[
              "Comfortable clothes",
              "Shoes you can move in",
              "No partner needed",
              "Beginner-friendly environment",
              VENUE.parkingNote,
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <RsvpCta />
          </div>
        </div>
      </section>

      {/* 6. WEEKLY THEMES */}
      <section className="px-5 py-12 sm:px-8 sm:py-14" aria-labelledby="themes-heading">
        <div className="mx-auto max-w-5xl">
          <h2
            id="themes-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            What’s Coming Up
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-stone-600">
            Friday themes through December — RSVP for the night that fits you.
          </p>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
            {FRIDAY_THEMES_2026.map((theme) => {
              const isNext = theme.dateKey === friday.dateKey
              return (
                <article
                  key={theme.dateKey}
                  className={`min-w-[260px] snap-start rounded-2xl border p-5 sm:min-w-0 ${
                    theme.public
                      ? isNext
                        ? "border-[#FF3366] bg-white shadow-md ring-1 ring-[#FF3366]/25"
                        : "border-stone-200 bg-white shadow-sm"
                      : "border-stone-300 bg-stone-100"
                  }`}
                >
                  <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF3366]">
                    {formatThemeDateLabel(theme.dateKey)}
                    {isNext ? " · This Friday" : ""}
                  </p>
                  <h3 className="mt-2 font-montserrat text-lg font-black leading-snug text-stone-900">
                    {theme.title}
                  </h3>
                  {!theme.public ? (
                    <p className="mt-2 text-sm font-semibold text-stone-500">
                      {theme.note ?? "Unavailable to the public"}
                    </p>
                  ) : (
                    <a
                      href="#rsvp"
                      className="mt-4 inline-flex font-montserrat text-xs font-black uppercase tracking-wide text-[#FF3366] underline-offset-4 hover:underline"
                    >
                      RSVP for This Friday →
                    </a>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. SOCIAL PROOF */}
      <section className="border-y border-stone-200/80 bg-white px-5 py-12 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-montserrat text-3xl font-black sm:text-4xl">
            What dancers are saying
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((review) => (
              <blockquote
                key={review.name}
                className="rounded-2xl border border-stone-200/80 bg-[#FAF8F6] p-5"
              >
                <p className="text-yellow-500" aria-label="5 star rating">
                  ★★★★★
                </p>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">“{review.quote}”</p>
                <footer className="mt-4">
                  <cite className="not-italic font-montserrat text-sm font-bold text-stone-900">
                    {review.name}
                  </cite>
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-xs font-medium text-[#FF3366] underline-offset-2 hover:underline"
                  >
                    View Google review
                  </a>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="px-5 py-12 sm:px-8 sm:py-14" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="faq-heading" className="text-center font-montserrat text-3xl font-black">
            FAQ
          </h2>
          <div className="mt-8 space-y-2">
            {FAQS.map((faq, index) => {
              const open = openFaq === index
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
                    aria-expanded={open}
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
                    <div className="border-t border-stone-200/80 px-5 pb-4 pt-3 text-sm leading-relaxed text-stone-600">
                      {faq.question === "Is there a donation?" ? (
                        <div className="space-y-3">
                          <p>
                            The first intro lesson is free with RSVP. For the social, Studio E asks
                            for a donation at the door to support instructors:
                          </p>
                          <SocialDonationFaq />
                        </div>
                      ) : (
                        <p>{faq.answer}</p>
                      )}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Make This Friday Different.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/90">
            Your first intro lesson is free with RSVP. Come learn, meet people, and dance with Studio
            E.
          </p>
          <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-white/95">
            <li className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" aria-hidden />
              {displayDate}
            </li>
            <li className="flex items-center gap-2">
              <Music3 className="h-4 w-4 shrink-0" aria-hidden />
              {displayTheme}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              Free intro {SCHEDULE.introShort}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              Social {SCHEDULE.socialShort}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {VENUE.name} · {VENUE.addressLine}
            </li>
          </ul>
          <div className="mt-8 flex justify-center">
            <RsvpCta light />
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur-md sm:hidden">
        <RsvpCta />
      </div>
    </div>
  )
}
