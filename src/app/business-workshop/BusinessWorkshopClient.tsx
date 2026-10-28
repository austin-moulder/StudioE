"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { ArrowRight, Check, ChevronDown, Clock, MapPin, Star } from "lucide-react"
import {
  FounderTrackRecordSection,
  SuccessStoriesSection,
} from "@/components/founder-proof/FounderProofSections"
import { getCountdownParts } from "@/lib/popup-class/event-time"
import {
  AUSTIN_BIO,
  AUSTIN_PHOTO,
  AUDIENCES,
  EVENT,
  FAQS,
  FLYER,
  LEARN_POINTS,
  RSVP_FORM,
  WORKSHOP_START_MS,
} from "@/lib/business-workshop/config"

const FORM_IFRAME_ID = `inline-${RSVP_FORM.id}`

type IFrameResizeWindow = Window & {
  iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement) => void
}

function initFormEmbed() {
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
      minHeight: isMobile ? 480 : 560,
    },
    iframe
  )
  return true
}

function enableFormEmbedScrollFallback() {
  const iframe = document.getElementById(FORM_IFRAME_ID) as HTMLIFrameElement | null
  if (!iframe || iframe.getAttribute("data-iframe-resizer-initialized") === "true") return
  iframe.setAttribute("scrolling", "yes")
  iframe.style.minHeight = "70vh"
  iframe.style.overflow = "auto"
}

const ctaClass =
  "inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] sm:text-base"

function Countdown() {
  const [parts, setParts] = useState(() => getCountdownParts(WORKSHOP_START_MS))

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(getCountdownParts(WORKSHOP_START_MS))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  if (parts.totalMs <= 0) {
    return (
      <p className="font-montserrat text-sm font-bold uppercase tracking-wide text-[#FF7A5A]">
        Workshop is starting soon
      </p>
    )
  }

  const cells = [
    { label: "Days", value: parts.days },
    { label: "Hrs", value: parts.hours },
    { label: "Min", value: parts.minutes },
    { label: "Sec", value: parts.seconds },
  ]

  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
        Starts in
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="rounded-xl border border-white/15 bg-white/10 px-2 py-3 text-center backdrop-blur-sm"
          >
            <p className="font-montserrat text-2xl font-black tabular-nums text-white sm:text-3xl">
              {String(cell.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/65">
              {cell.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BusinessWorkshopClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      if (initFormEmbed() || attempts >= 50) {
        if (attempts >= 50) enableFormEmbedScrollFallback()
        clearInterval(interval)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#0B1220] pb-24 text-white antialiased sm:pb-0">
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={FLYER}
            alt="Build Your Business in 90 Minutes workshop flyer"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/70 via-[#0B1220]/85 to-[#0B1220]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:items-center lg:py-20">
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Free 90-minute workshop · Spots limited
            </p>
            <h1 className="mt-4 font-montserrat text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              Build Your Business in 90 Minutes
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              Learn the nitty-gritty of incorporating a business, building a killer offer, acquiring
              massive social proof, launching a scalable marketing campaign, and driving sales—so you
              know how to build a business and make money from it.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                {EVENT.dateLabel} · {EVENT.timeLabel}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                {EVENT.venueName} · {EVENT.addressLine}
              </span>
            </div>

            <div className="mt-8 max-w-md">
              <Countdown />
            </div>

            <div className="mt-8">
              <a href="#rsvp" className={ctaClass}>
                Reserve My Free Spot
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:max-w-none">
            <Image
              src={FLYER}
              alt="Build Your Business in 90 Minutes — Sunday, Nov 22, 3:00–4:30 PM"
              fill
              sizes="(max-width: 1024px) 90vw, 380px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="border-t border-white/10 bg-[#111827] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
            In 90 minutes
          </p>
          <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            What you’ll walk out knowing
          </h2>
          <p className="mt-4 max-w-2xl text-white/75">
            A practical playbook—not theory fluff. Five core moves every operator needs.
          </p>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LEARN_POINTS.map((item, index) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 md:last:col-span-2 lg:last:col-span-1"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-montserrat text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
            Perfect for
          </p>
          <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Built for ambitious professionals
          </h2>
          <p className="mt-4 max-w-2xl text-white/75">
            Whether you’re early in your career or already running something, this workshop meets
            you where you are—and shows you how to make money from what you build.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {AUDIENCES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-4 py-4"
              >
                <Check className="h-5 w-5 flex-shrink-0 text-[#FF3366]" aria-hidden />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-2xl border border-[#FF3366]/30 bg-[#FF3366]/10 px-5 py-4 text-base font-medium leading-relaxed text-white/95">
            By the end of the workshop, you’ll know how to build a business and make money from it.
          </p>
        </div>
      </section>

      {/* FACILITATOR */}
      <section className="border-y border-white/10 bg-[#111827] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-14">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl">
            <Image
              src={AUSTIN_PHOTO}
              alt="Austin Moulder, workshop facilitator"
              fill
              sizes="280px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Facilitated by
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
              Austin Moulder
            </h2>
            <div className="mt-3 flex gap-0.5" aria-label="Proven operator track record">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#F5B301] text-[#F5B301]" aria-hidden />
              ))}
            </div>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">{AUSTIN_BIO}</p>
          </div>
        </div>
      </section>

      <FounderTrackRecordSection theme="dark" showFreeWorkshopCallout />
      <SuccessStoriesSection theme="dark" />

      {/* DETAILS + MAP */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
            When &amp; where
          </p>
          <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Show up ready to build
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">
              <p className="font-montserrat text-lg font-bold">{EVENT.dateLabel}</p>
              <p className="mt-1 text-white/80">{EVENT.timeLabel}</p>
              <p className="mt-5 font-semibold">{EVENT.venueName}</p>
              <p className="text-white/75">
                {EVENT.addressLine}
                <br />
                {EVENT.cityLine} · {EVENT.neighborhood}
              </p>
              <a href="#rsvp" className={`${ctaClass} mt-8`}>
                Reserve My Free Spot
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title={`Map to ${EVENT.venueName}`}
                src={EVENT.mapsEmbedSrc}
                className="h-64 w-full border-0 lg:h-full lg:min-h-[280px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-[#111827] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            FAQ
          </h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((faq, index) => {
              const open = openFaq === index
              return (
                <div key={faq.question} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-montserrat text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-white/50 transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <p className="border-t border-white/10 px-5 pb-5 pt-3 text-sm leading-relaxed text-white/75">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* RSVP FORM */}
      <section id="rsvp" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Free · Spots limited
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
              Reserve your spot
            </h2>
            <p className="mt-3 text-white/75">
              {EVENT.dateLabel} · {EVENT.timeLabel} · Studio E
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-xl sm:p-4">
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
              data-form-name="Business Workshop RSVP"
              data-height="560"
              data-layout-iframe-id={FORM_IFRAME_ID}
              data-form-id={RSVP_FORM.id}
              title="Build Your Business in 90 Minutes RSVP"
              className="w-full border-none"
              style={{ minHeight: "480px", width: "100%" }}
            />
          </div>

          <div className="mt-10 rounded-2xl border border-[#FF3366]/30 bg-[#FF3366]/10 px-5 py-6 text-center sm:px-8">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-[#FF7A5A]">
              After you RSVP
            </p>
            <h3 className="mt-3 font-montserrat text-2xl font-black tracking-tight">
              Ready for the full Career Accelerator?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/80">
              The free workshop is step one. When you’re ready for 8 weeks of live projects,
              mentorship, and placement opportunities, continue to the Career Accelerator.
            </p>
            <Link
              href="/career-accelerator"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] transition hover:bg-[#FAF7F5]"
            >
              Go to Career Accelerator
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366] via-[#8B1538] to-[#0B1220]" />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Make money doing what you love.
          </h2>
          <p className="mt-4 text-white/90">
            90 minutes. One playbook. Leave knowing how to build—and monetize—your business.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="#rsvp"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] transition hover:bg-[#FAF7F5]"
            >
              Reserve My Free Spot
            </a>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0B1220]/95 p-3 backdrop-blur-md sm:hidden">
        <a href="#rsvp" className={ctaClass}>
          Reserve My Free Spot
        </a>
      </div>
    </div>
  )
}
