"use client"

import Image from "next/image"
import { useCallback, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import {
  ASSETS,
  CLASS_FORMAT,
  COPY,
  FAQS,
  FOR_YOU_IF,
  HOW_IT_WORKS,
  OFFER,
  OFFER_INCLUDES,
  WHAT_YOU_GET,
  buildCheckoutUrl,
} from "@/lib/latin-morning-reset/config"

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
  "mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

export default function LatinMorningResetClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const goCheckout = useCallback((placement: string) => {
    trackMeta("InitiateCheckout", {
      content_name: OFFER.name,
      value: OFFER.price,
      currency: "USD",
      placement,
    })
    window.location.href = buildCheckoutUrl({ placement })
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#F7F1E8] text-stone-900 antialiased pb-24 sm:pb-0">
      {/* Announcement */}
      <div className="bg-[#1C1410] px-4 py-2.5 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
          {COPY.announcement}
        </p>
      </div>

      {/* Hero */}
      <header className="relative isolate overflow-hidden bg-[#1C1410] text-white">
        <Image
          src={ASSETS.hero}
          alt="Studio E group in a weekday morning Latin fitness class"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-[#1C1410]/75 to-[#1C1410]/45" />
        <div className="absolute inset-0 bg-[#FF3366]/10 mix-blend-multiply" />

        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-3xl flex-col justify-end px-4 pb-12 pt-16 sm:px-6 sm:pb-16 md:justify-center">
          <p className="mb-4 font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-[#E8C97A]">
            Studio E · {OFFER.name}
          </p>
          <h1 className="max-w-2xl font-montserrat text-[1.85rem] font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {COPY.heroSubheadline}
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <button type="button" onClick={() => goCheckout("hero")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
            <p className="text-sm text-white/75">{COPY.microcopy}</p>
          </div>
        </div>
      </header>

      {/* What you get */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="get-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="get-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.whatYouGetHeadline}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {WHAT_YOU_GET.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#E8DCC8] bg-white p-5 shadow-sm"
              >
                <h3 className="font-montserrat text-base font-black text-[#1C1410]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="how-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="how-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.howItWorksHeadline}
          </h2>
          <ol className="mt-10 space-y-5">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="pt-1.5 text-base font-medium leading-snug text-stone-800">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Class format */}
      <section className="bg-[#1C1410] px-4 py-14 text-white sm:px-6 sm:py-16" aria-labelledby="format-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="format-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.formatHeadline}
          </h2>
          <ul className="mt-10 space-y-3">
            {CLASS_FORMAT.map((block) => (
              <li
                key={block.label}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5"
              >
                <span className="shrink-0 font-montserrat text-lg font-black text-[#E8C97A]">
                  {block.minutes} min
                </span>
                <span className="pt-0.5 text-base leading-snug text-white/90">{block.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm leading-relaxed text-[#E8C97A]">{COPY.formatNote}</p>
        </div>
      </section>

      {/* For you if */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="foryou-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="foryou-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.forYouHeadline}
          </h2>
          <ul className="mt-10 space-y-3">
            {FOR_YOU_IF.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[#E8DCC8] bg-white px-4 py-3.5"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                <span className="text-base leading-snug text-stone-800">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => goCheckout("for_you")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Offer */}
      <section
        className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-14 text-white sm:px-6 sm:py-16"
        aria-labelledby="offer-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="offer-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.offerHeadline}
          </h2>
          <p className="mt-6 font-montserrat text-6xl font-black tabular-nums">${OFFER.price}</p>
          <p className="mt-2 text-sm text-white/85">to get started</p>
          <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
            {OFFER_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden />
                <span className="text-base leading-snug text-white/95">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => goCheckout("offer")}
              className="mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] sm:text-base"
            >
              {COPY.offerCta}
            </button>
          </div>
        </div>
      </section>

      {/* After */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="after-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="after-heading"
            className="font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.afterHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-600">
            {COPY.afterBody}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm font-medium text-stone-500">
            Start with the ${OFFER.price} reset first. Morning Latin Club is an optional next step
            after your 21 days.
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
          <div className="divide-y divide-[#E8DCC8] rounded-2xl border border-[#E8DCC8] bg-white">
            {FAQS.map((item, index) => {
              const open = openFaq === index
              const panelId = `lmr-faq-${index}`
              const buttonId = `lmr-faq-btn-${index}`
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
                    className="px-4 pb-4"
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
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => goCheckout("final")} className={ctaClass}>
              {COPY.finalCta}
            </button>
          </div>
          <p className="mt-4 text-sm text-white/65">{COPY.microcopy}</p>
        </div>
      </section>

      <footer className="border-t border-[#E8DCC8] bg-[#F7F1E8] px-4 py-10 text-center text-sm text-stone-500 sm:px-6">
        <p className="font-montserrat text-base font-bold text-[#1C1410]">{OFFER.venueName}</p>
        <p className="mt-1">
          {OFFER.addressLine}, {OFFER.cityLine}
        </p>
        <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-stone-500">
          {COPY.disclaimer}
        </p>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8DCC8] bg-[#F7F1E8]/95 p-3 backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={() => goCheckout("sticky")}
          className={`${ctaClass} max-w-none`}
        >
          {COPY.stickyCta}
        </button>
      </div>
    </div>
  )
}
