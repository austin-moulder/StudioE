"use client"

import Image from "next/image"
import { useCallback, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import {
  ASSETS,
  CLASS_CARDS,
  COPY,
  EXPECT,
  FAQS,
  FOR_YOU_IF,
  HOW_IT_WORKS,
  HERO_POINTS,
  MEMBERSHIPS,
  OFFER,
  buildCheckoutUrl,
} from "@/lib/weekend-salsa-bachata/config"

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

export default function WeekendSalsaBachataClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const goCheckout = useCallback((placement: string) => {
    trackMeta("InitiateCheckout", {
      content_name: OFFER.name,
      value: OFFER.firstClassPrice,
      currency: "USD",
      placement,
    })
    window.location.href = buildCheckoutUrl({ placement })
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#F7F1E8] text-stone-900 antialiased pb-24 sm:pb-0">
      <div className="bg-[#1C1410] px-4 py-2.5 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
          {COPY.announcement}
        </p>
      </div>

      {/* Hero */}
      <header className="relative isolate min-h-[90svh] overflow-hidden bg-[#1C1410] text-white">
        <Image
          src={ASSETS.hero}
          alt="Studio E community gathered together for social dancing"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-[#1C1410]/75 to-[#1C1410]/40" />
        <div className="absolute inset-0 bg-[#FF3366]/15 mix-blend-multiply" />

        <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-xl flex-col justify-end px-4 pb-14 pt-16 sm:px-6 sm:pb-16 md:justify-center">
          <p className="mb-4 text-center font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-[#E8C97A]">
            Studio E · Weekend Program
          </p>
          <h1 className="text-center font-montserrat text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-center text-base leading-relaxed text-white/88 sm:text-lg">
            {COPY.heroSubheadline}
          </p>

          <div className="mt-8 flex flex-col items-center">
            <button type="button" onClick={() => goCheckout("hero")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
            <p className="mt-3 text-center text-sm text-[#E8C97A]">{COPY.ctaMicro}</p>
          </div>

          <ul className="mx-auto mt-10 max-w-md space-y-2.5">
            {HERO_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-white/90 sm:text-base">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7A5A]" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Two ways */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="twoways-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="twoways-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.twoWaysHeadline}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {CLASS_CARDS.map((card) => (
              <article
                key={card.name}
                className="rounded-2xl border border-[#E8DCC8] bg-white p-6 shadow-sm"
              >
                <h3 className="font-montserrat text-xl font-black uppercase tracking-wide text-[#FF3366]">
                  {card.name}
                </h3>
                <p className="mt-2 font-montserrat text-2xl font-black text-[#1C1410]">{card.time}</p>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">{card.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-lg text-center text-sm font-medium text-stone-600">
            {COPY.twoWaysNote}
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="how-heading">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200 md:order-2">
            <Image
              src={ASSETS.classEnergy}
              alt="Dancers in a Studio E class building energy and connection"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="md:order-1">
            <h2
              id="how-heading"
              className="font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
            >
              {COPY.howHeadline}
            </h2>
            <ol className="mt-10 space-y-6">
              {HOW_IT_WORKS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-montserrat text-base font-bold text-[#1C1410]">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="bg-[#F7F1E8] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="membership-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="membership-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.membershipHeadline}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {MEMBERSHIPS.map((plan) => (
              <article
                key={plan.id}
                className={`flex flex-col rounded-2xl border p-6 ${
                  plan.featured
                    ? "border-[#FF3366] bg-white shadow-[0_16px_40px_rgba(255,51,102,0.18)] ring-2 ring-[#FF3366]/30"
                    : "border-[#E8DCC8] bg-white shadow-sm"
                }`}
              >
                {plan.featured ? (
                  <p className="mb-3 font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                    Full weekend path
                  </p>
                ) : (
                  <p className="mb-3 font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                    Focused path
                  </p>
                )}
                <h3 className="font-montserrat text-2xl font-black uppercase tracking-wide text-[#1C1410]">
                  {plan.name}
                </h3>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="font-montserrat text-4xl font-black text-[#1C1410]">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-stone-500">{plan.cadence}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => goCheckout(`membership_${plan.id}`)}
                  className={`mt-8 ${ctaClass} ${
                    plan.featured ? "" : "from-[#1C1410] to-[#3A2420] shadow-none"
                  }`}
                >
                  {plan.cta}
                </button>
                <p className="mt-3 text-center text-xs text-stone-500">{COPY.ctaMicro}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center">
            <p className="mb-3 text-center text-sm text-stone-600">
              Not ready to pick a plan? Start with the first class.
            </p>
            <button type="button" onClick={() => goCheckout("membership_first_class")} className={ctaClass}>
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Rollover */}
      <section className="bg-[#1C1410] px-4 py-14 text-white sm:px-6 sm:py-16" aria-labelledby="rollover-heading">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="rollover-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.rolloverHeadline}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/85">
            {COPY.rolloverBody}
          </p>
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
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="expect-heading">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200">
            <Image
              src={ASSETS.social}
              alt="Studio E dancers connecting during a social dance moment"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2
              id="expect-heading"
              className="font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
            >
              {COPY.expectHeadline}
            </h2>
            <ul className="mt-10 space-y-3">
              {EXPECT.map((item) => (
                <li key={item} className="flex items-start gap-3 px-1 py-1">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7A5A]" aria-hidden />
                  <span className="text-base leading-snug text-stone-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* $15 offer band */}
      <section
        className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-14 text-white sm:px-6 sm:py-16"
        aria-labelledby="firstclass-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="firstclass-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.firstClassHeadline}
          </h2>
          <p className="mt-4 font-montserrat text-6xl font-black tabular-nums">
            ${OFFER.firstClassPrice}
          </p>
          <p className="mt-2 text-sm text-white/85">credited toward membership</p>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/90">
            {COPY.firstClassBody}
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => goCheckout("first_class_band")}
              className="mx-auto flex w-full max-w-md items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] sm:text-base"
            >
              {COPY.claimCta}
            </button>
          </div>
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
              const panelId = `wsb-faq-${index}`
              const buttonId = `wsb-faq-btn-${index}`
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
              {COPY.claimCta}
            </button>
          </div>
          <p className="mt-4 text-sm text-[#E8C97A]">{COPY.ctaMicro}</p>
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
