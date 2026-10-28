"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Handshake,
  MapPin,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react"
import { getCountdownParts } from "@/lib/popup-class/event-time"
import { BUSINESS_SUCCESS_STORIES } from "@/lib/founder-proof/content"
import {
  AUSTIN_BIO,
  AUSTIN_PHOTO,
  AUDIENCES,
  EVENT,
  FAQS,
  FLYER,
  LEARN_POINTS,
  RSVP_FORM,
  SPOTS_CAPACITY,
  SPOTS_MAX,
  SPOTS_MIN,
  SPOTS_STORAGE_KEY,
  WORKSHOP_START_MS,
} from "@/lib/business-workshop/config"

function getSpotsLeft(): number {
  if (typeof window === "undefined") return 10
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

const BENEFITS = [
  {
    title: "Build an offer people want",
    body: "Leave with a clearer, more sellable offer—not a vague idea.",
    icon: Target,
  },
  {
    title: "Create proof people trust",
    body: "Learn how to stack social proof so prospects believe you faster.",
    icon: ShieldCheck,
  },
  {
    title: "Turn attention into sales",
    body: "Connect marketing to a simple, repeatable path to revenue.",
    icon: Megaphone,
  },
] as const

const HOW_IT_WORKS = [
  { title: "Reserve", body: "Claim your free spot online." },
  { title: "Attend", body: `${EVENT.dateLabel} · ${EVENT.timeLabel} at Studio E.` },
  { title: "Leave with the playbook", body: "Offer, proof, marketing, and sales—in 90 minutes." },
  {
    title: "Explore the Accelerator",
    body: "If you want 8 weeks of live projects, continue to the Career Accelerator.",
  },
] as const

const TESTIMONIALS = BUSINESS_SUCCESS_STORIES.slice(0, 3)

const ctaClass =
  "inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] sm:text-base"

function ReserveCta({ className = "" }: { className?: string }) {
  return (
    <a href="#rsvp" className={`${ctaClass} ${className}`}>
      Reserve My Free Spot
      <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
    </a>
  )
}

function Countdown() {
  const [parts, setParts] = useState(() => getCountdownParts(WORKSHOP_START_MS))

  useEffect(() => {
    const id = window.setInterval(() => setParts(getCountdownParts(WORKSHOP_START_MS)), 1000)
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
    <div aria-live="polite">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
        Starts in
      </p>
      <div className="grid grid-cols-4 gap-2">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="rounded-xl border border-white/15 bg-white/10 px-2 py-2.5 text-center"
          >
            <p className="font-montserrat text-xl font-black tabular-nums sm:text-2xl">
              {String(cell.value).padStart(2, "0")}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
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
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null)

  useEffect(() => {
    setSpotsLeft(getSpotsLeft())
  }, [])

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

      {/* 1. HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={FLYER}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/75 via-[#0B1220]/9 to-[#0B1220]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Free workshop · Cap of {SPOTS_CAPACITY}
            </p>
            <h1 className="mt-3 font-montserrat text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
              Build a Business in 90 Minutes
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              A free, practical workshop for turning an idea, skill, or existing business into a
              clearer path to revenue.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-white/85">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 text-[#FF7A5A]" aria-hidden />
                <span>
                  {EVENT.dateLabel} · {EVENT.timeLabel}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#FF7A5A]" aria-hidden />
                <span>
                  {EVENT.venueName} · {EVENT.addressLine}, {EVENT.neighborhood}
                </span>
              </li>
            </ul>

            <div className="mt-6 max-w-sm">
              <Countdown />
            </div>

            {spotsLeft !== null ? (
              <p className="mt-4 text-sm font-semibold text-[#FF7A5A]">
                Only {spotsLeft} of {SPOTS_CAPACITY} spots left
              </p>
            ) : null}

            <div className="mt-7">
              <ReserveCta />
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:max-w-none">
            <Image
              src={FLYER}
              alt={`${EVENT.name} flyer — ${EVENT.dateLabel}, ${EVENT.timeLabel}`}
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </header>

      {/* 2. BENEFIT CARDS */}
      <section className="border-t border-white/10 px-5 py-14 sm:px-8 sm:py-16" aria-labelledby="benefits-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="benefits-heading" className="sr-only">
            Core benefits
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {BENEFITS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#111827] p-5"
              >
                <item.icon className="h-6 w-6 text-[#FF3366]" aria-hidden />
                <h3 className="mt-4 font-montserrat text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ReserveCta />
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU'LL LEAVE WITH */}
      <section
        id="learn"
        className="scroll-mt-20 border-t border-white/10 bg-[#111827] px-5 py-14 sm:px-8 sm:py-16"
      >
        <div className="mx-auto max-w-5xl">
          <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
            In 90 minutes
          </p>
          <h2 className="mt-2 font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            What you’ll leave with
          </h2>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LEARN_POINTS.map((item, i) => (
              <li
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#0B1220] p-5 lg:last:col-span-1"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF3366] text-sm font-black">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-montserrat text-base font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-white/70">{item.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex justify-center">
            <ReserveCta />
          </div>
        </div>
      </section>

      {/* 4. WHO IT'S FOR */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            Who it’s for
          </h2>
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
          <div className="mt-8 flex justify-center">
            <ReserveCta />
          </div>
        </div>
      </section>

      {/* 5. AUSTIN COMPACT PROOF */}
      <section className="border-y border-white/10 bg-[#111827] px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border border-white/15">
            <Image
              src={AUSTIN_PHOTO}
              alt="Austin Moulder, workshop facilitator"
              fill
              sizes="80px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.18em] text-[#FF7A5A]">
              Facilitated by Austin Moulder
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
              BCG consultant (1% offer rate) · Ops Director for a $250M marketplace · VC-backed
              edtech founder · Bootstrapping Studio E (170 active members before grand opening)
            </p>
            <p className="mt-2 text-xs text-white/55">
              Career professionals regularly pay $250+/hour for operator time at this level. This
              workshop is free.
            </p>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="px-5 py-14 sm:px-8 sm:py-16" aria-labelledby="stories-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="stories-heading" className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            What professionals say
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((story) => (
              <blockquote
                key={story.name}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#111827] p-5"
              >
                <p className="flex-1 text-sm leading-relaxed text-white/80">“{story.quote}”</p>
                <footer className="mt-4 border-t border-white/10 pt-3">
                  <cite className="not-italic font-montserrat text-sm font-bold">{story.name}</cite>
                  <p className="text-xs text-white/55">{story.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ReserveCta />
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="border-t border-white/10 bg-[#111827] px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            How it works
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-[#0B1220] p-4">
                <span className="font-montserrat text-xs font-bold uppercase tracking-wider text-[#FF7A5A]">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 font-montserrat text-base font-bold">{step.title}</h3>
                <p className="mt-1 text-sm text-white/70">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ReserveCta />
          </div>
          <p className="mt-4 text-center text-sm text-white/60">
            After the workshop,{" "}
            <Link href="/career-accelerator" className="font-semibold text-[#FF7A5A] underline-offset-2 hover:underline">
              explore the Career Accelerator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-montserrat text-3xl font-black tracking-tight">FAQ</h2>
          <div className="mt-8 space-y-2">
            {FAQS.map((faq, index) => {
              const open = openFaq === index
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#111827]"
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
                      className={`h-5 w-5 flex-shrink-0 text-white/50 transition ${open ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <p className="border-t border-white/10 px-5 pb-4 pt-3 text-sm leading-relaxed text-white/75">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL RSVP */}
      <section id="rsvp" className="scroll-mt-20 border-t border-white/10 bg-[#111827] px-5 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <p className="inline-flex items-center gap-2 font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-[#FF7A5A]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Free · Cap of {SPOTS_CAPACITY}
            </p>
            <h2 className="mt-3 font-montserrat text-3xl font-black tracking-tight">
              Reserve your spot
            </h2>
            <p className="mt-3 text-white/75">
              {EVENT.dateLabel} · {EVENT.timeLabel}
              <br />
              {EVENT.venueName} · {EVENT.addressLine}
            </p>
            {spotsLeft !== null ? (
              <p className="mt-3 text-sm font-semibold text-[#FF7A5A]">
                Only {spotsLeft} spots left
              </p>
            ) : null}
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
              title="Reserve your free Build a Business in 90 Minutes spot"
              className="w-full border-none"
              style={{ minHeight: "480px", width: "100%" }}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-white/15 bg-[#0B1220] px-5 py-6 text-center">
            <Handshake className="mx-auto h-6 w-6 text-[#FF7A5A]" aria-hidden />
            <h3 className="mt-3 font-montserrat text-lg font-bold">Next step after you RSVP</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-white/70">
              Want 8 weeks of live projects and mentorship? Apply to the Career Accelerator when
              you’re ready.
            </p>
            <Link
              href="/career-accelerator"
              className="mt-4 inline-flex items-center justify-center font-montserrat text-sm font-bold text-[#FF7A5A] underline-offset-4 hover:underline"
            >
              Go to Career Accelerator
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0B1220]/95 p-3 backdrop-blur-md sm:hidden">
        <ReserveCta />
      </div>

      {/* Screen-reader detail preserved */}
      <p className="sr-only">{AUSTIN_BIO}</p>
    </div>
  )
}
