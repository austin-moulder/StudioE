"use client"

import Image from "next/image"
import Script from "next/script"
import { useCallback, useEffect, useState } from "react"
import { Check, ChevronDown, MapPin } from "lucide-react"
import {
  ACUITY_RSVP_URL,
  ASSETS,
  COPY,
  EVENT,
  FAQS,
  FOOD,
  LINEUP,
  SCHEDULE,
  SOCIAL_POINTS,
  WORKSHOPS,
} from "@/lib/grand-opening/config"

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

const ctaClass =
  "mx-auto inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

export default function GrandOpeningClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: EVENT.name,
      content_category: "event",
      content_ids: ["grand-opening"],
    })
  }, [])

  const goRsvp = useCallback((placement: string) => {
    trackMeta("InitiateCheckout", {
      content_name: EVENT.name,
      content_category: "event",
      placement,
    })
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#F7F1E8] text-stone-900 antialiased pb-24 sm:pb-0">
      <div className="bg-[#1C1410] px-4 py-2.5 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
          {COPY.announcement}
        </p>
      </div>

      {/* Hero */}
      <header className="relative isolate min-h-[92svh] overflow-hidden bg-[#1C1410] text-white">
        <Image
          src={ASSETS.hero}
          alt="Studio E dancers filling the floor at Humboldt Park"
          fill
          priority
          className="scale-105 object-cover object-center animate-[go-ken_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-[#1C1410]/75 to-[#1C1410]/30" />
        <div className="absolute inset-0 bg-[#FF3366]/12 mix-blend-multiply" />

        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-xl flex-col justify-end px-4 pb-14 pt-16 sm:px-6 sm:pb-16 md:justify-center">
          <p className="mb-2 text-center font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-[#E8C97A] animate-[go-rise_0.7s_ease-out_both]">
            {EVENT.dateLabel} · {EVENT.neighborhood}
          </p>
          <p
            className="text-center font-montserrat text-5xl font-black tracking-tight text-white animate-[go-rise_0.8s_ease-out_0.06s_both] sm:text-6xl md:text-7xl"
            style={{ textShadow: "0 8px 40px rgba(0,0,0,0.45)" }}
          >
            {COPY.heroBrand}
          </p>
          <h1 className="mt-3 text-center font-montserrat text-3xl font-black leading-[1.08] tracking-tight animate-[go-rise_0.85s_ease-out_0.12s_both] sm:text-4xl md:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-center text-base leading-relaxed text-white/90 animate-[go-rise_0.9s_ease-out_0.18s_both] sm:text-lg">
            {COPY.heroSubheadline}
          </p>
          <div className="mt-8 animate-[go-rise_1s_ease-out_0.26s_both]">
            <button type="button" onClick={() => goRsvp("hero")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </header>

      {/* Schedule */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="night-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="night-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.nightHeadline}
          </h2>
          <ol className="mt-10 space-y-0">
            {SCHEDULE.map((item, index) => (
              <li
                key={item.time}
                className="grid grid-cols-[6.5rem_1fr] gap-4 border-t border-[#E8DCC8] py-5 first:border-t-0 sm:grid-cols-[7.5rem_1fr]"
              >
                <p className="font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] sm:text-base">
                  {item.time}
                </p>
                <div>
                  <p className="font-montserrat text-lg font-black text-[#1C1410]">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.detail}</p>
                  {index === 0 ? (
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-stone-400">
                      Night opens
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Workshops */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="workshops-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="workshops-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.workshopsHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-stone-600">
            {COPY.workshopsBody}
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {WORKSHOPS.map((ws) => (
              <article key={ws.title} className="text-center sm:text-left">
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  {ws.level}
                </p>
                <h3 className="mt-2 font-montserrat text-2xl font-black text-[#1C1410]">{ws.title}</h3>
                <p className="mt-2 text-base font-semibold text-stone-800">with {ws.instructor}</p>
                <p className="mt-2 text-sm text-stone-600">{ws.hook}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="bg-[#1C1410] px-4 py-14 text-white sm:px-6 sm:py-16" aria-labelledby="social-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="social-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.socialHeadline}
          </h2>
          <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
            {SOCIAL_POINTS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7A5A]" aria-hidden />
                <span className="text-base text-white/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lineup */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="lineup-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="lineup-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.lineupHeadline}
          </h2>
          <div className="mt-10 space-y-8">
            {LINEUP.map((block) => (
              <div key={block.label} className="text-center">
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  {block.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="font-montserrat text-xl font-black text-[#1C1410]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food */}
      <section
        className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-14 text-white sm:px-6 sm:py-16"
        aria-labelledby="food-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="food-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.foodHeadline}
          </h2>
          <ul className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10">
            {FOOD.map((name) => (
              <li key={name} className="font-montserrat text-2xl font-black">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RSVP embed */}
      <section
        id="rsvp"
        className="scroll-mt-6 bg-[#1C1410] px-4 py-14 text-white sm:px-6 sm:py-16"
        aria-labelledby="rsvp-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="rsvp-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.rsvpHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base text-white/85">{COPY.rsvpBody}</p>
          <p className="mt-4 flex items-center justify-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-[#E8C97A]">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {EVENT.addressLine} · {EVENT.cityLine}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <iframe
              src={ACUITY_RSVP_URL}
              title={`${EVENT.name} RSVP`}
              className="block min-h-[800px] w-full border-0"
              allow="payment *"
            />
          </div>
          <Script src="https://embed.acuityscheduling.com/js/embed.js" strategy="afterInteractive" />
          <p className="mt-4 text-center text-sm text-white/65">
            If the scheduler doesn&apos;t load,{" "}
            <a
              href={ACUITY_RSVP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#E8C97A] underline underline-offset-2"
            >
              open RSVP in a new tab
            </a>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F1E8] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="faq-heading"
            className="mb-8 text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            FAQ
          </h2>
          <div className="divide-y divide-[#E8DCC8] border-y border-[#E8DCC8]">
            {FAQS.map((item, index) => {
              const open = openFaq === index
              const panelId = `go-faq-${index}`
              const buttonId = `go-faq-btn-${index}`
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-3 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3366]"
                    >
                      <span className="font-montserrat text-sm font-bold text-[#1C1410] sm:text-base">
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
                    className="pb-4"
                  >
                    <p className="text-sm leading-relaxed text-stone-600">{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1C1410] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/85">
            {COPY.finalBody}
          </p>
          <div className="mt-8">
            <button type="button" onClick={() => goRsvp("final")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8DCC8] bg-[#F7F1E8] px-4 py-10 text-center text-sm text-stone-500 sm:px-6">
        <p className="font-montserrat text-base font-bold text-[#1C1410]">{EVENT.venueName}</p>
        <p className="mt-1">
          {EVENT.addressLine}, {EVENT.cityLine}
        </p>
        <p className="mt-1 text-xs">
          {EVENT.name} · {EVENT.dateLabel}
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8DCC8] bg-[#F7F1E8]/95 p-3 backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={() => goRsvp("sticky")}
          className={`${ctaClass} max-w-none`}
        >
          {COPY.stickyCta}
        </button>
      </div>

      <style jsx global>{`
        @keyframes go-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes go-ken {
          from {
            transform: scale(1.05);
          }
          to {
            transform: scale(1.12);
          }
        }
      `}</style>
    </div>
  )
}
