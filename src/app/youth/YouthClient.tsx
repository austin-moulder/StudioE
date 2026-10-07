"use client"

import Image from "next/image"
import Script from "next/script"
import { useEffect, useState } from "react"
import { Check, ChevronDown, MapPin } from "lucide-react"
import {
  AGE_GROUPS,
  ASSETS,
  CONTACT_FORM,
  COPY,
  FAQS,
  HOW_IT_WORKS,
  PLANS,
  PROGRAM,
  WHY_POINTS,
} from "@/lib/youth/config"

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

const CONTACT_IFRAME_ID = `inline-${CONTACT_FORM.id}`

type IFrameResizeWindow = Window & {
  iFrameResize?: (options: Record<string, unknown>, target: HTMLIFrameElement) => void
}

function initContactFormEmbed() {
  const iframe = document.getElementById(CONTACT_IFRAME_ID) as HTMLIFrameElement | null
  if (!iframe) return false
  if (iframe.getAttribute("data-iframe-resizer-initialized") === "true") return true

  const { iFrameResize } = window as IFrameResizeWindow
  if (typeof iFrameResize !== "function") return false

  iFrameResize(
    {
      autoResize: true,
      scrolling: false,
      checkOrigin: false,
      heightCalculationMethod: "max",
      minHeight: window.matchMedia("(max-width: 768px)").matches ? 480 : 560,
    },
    iframe
  )
  return true
}

const contactLinkClass =
  "mt-4 inline-block text-sm font-semibold underline underline-offset-4 transition hover:opacity-80"

const ctaClass =
  "mx-auto inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

export default function YouthClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    let attempts = 0
    const interval = setInterval(() => {
      attempts += 1
      if (initContactFormEmbed()) {
        clearInterval(interval)
        return
      }
      if (attempts >= 50) {
        clearInterval(interval)
        const iframe = document.getElementById(CONTACT_IFRAME_ID) as HTMLIFrameElement | null
        if (iframe) {
          iframe.setAttribute("scrolling", "yes")
          iframe.style.minHeight = "70vh"
        }
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen scroll-smooth bg-[#F7F1E8] text-stone-900 antialiased">
      <div className="bg-[#1C1410] px-4 py-2.5 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
          {COPY.announcement}
        </p>
      </div>

      {/* Hero */}
      <header className="relative isolate min-h-[90svh] overflow-hidden bg-[#1C1410] text-white">
        <Image
          src={ASSETS.group}
          alt="Chicago Latin Dance Youth Program group at Studio E"
          fill
          priority
          className="scale-105 object-cover object-center animate-[youth-ken_18s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410] via-[#1C1410]/70 to-[#1C1410]/35" />
        <div className="absolute inset-0 bg-[#FF3366]/10 mix-blend-multiply" />

        <div className="relative z-10 mx-auto flex min-h-[90svh] max-w-xl flex-col justify-end px-4 pb-14 pt-16 sm:px-6 sm:pb-16 md:justify-center">
          <p className="mb-3 text-center font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-[#E8C97A] animate-[youth-rise_0.7s_ease-out_both]">
            Studio E · Youth Program
          </p>
          <h1 className="text-center font-montserrat text-4xl font-black leading-[1.08] tracking-tight animate-[youth-rise_0.85s_ease-out_0.08s_both] sm:text-5xl md:text-6xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-center text-base leading-relaxed text-white/90 animate-[youth-rise_0.9s_ease-out_0.16s_both] sm:text-lg">
            {COPY.heroSubheadline}
          </p>
          <p className="mt-4 flex items-center justify-center gap-2 font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-white/70 animate-[youth-rise_0.9s_ease-out_0.2s_both]">
            <MapPin className="h-3.5 w-3.5 text-[#E8C97A]" aria-hidden />
            {PROGRAM.addressLine} · {PROGRAM.neighborhood}
          </p>
          <div className="mt-8 animate-[youth-rise_1s_ease-out_0.28s_both]">
            <a href="#pricing" className={ctaClass}>
              {COPY.primaryCta}
            </a>
            <div className="text-center">
              <a href="#contact" className={`${contactLinkClass} text-white/85`}>
                {COPY.contactLink}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Schedule */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="schedule-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="schedule-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.scheduleHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-stone-600">
            {COPY.scheduleBody}
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8">
            {AGE_GROUPS.map((group) => (
              <article key={group.id} className="text-center sm:text-left">
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  {group.ages}
                </p>
                <h3 className="mt-2 font-montserrat text-3xl font-black text-[#1C1410]">
                  {group.time}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{group.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-lg text-center font-montserrat text-sm font-bold uppercase tracking-[0.14em] text-[#1C1410]">
            {PROGRAM.daysLabel}
          </p>
        </div>
      </section>

      {/* Start date + enrollment window */}
      <section
        className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-14 text-white sm:px-6 sm:py-16"
        aria-labelledby="start-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="start-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.startHeadline}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/90">
            {COPY.startBody}
          </p>
          <div className="mt-8">
            <a
              href="#pricing"
              className="mx-auto inline-flex w-full max-w-md items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] sm:text-base"
            >
              {COPY.primaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* How enrollment works */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="how-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="how-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.howItWorksHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-stone-600">
            {COPY.howItWorksBody}
          </p>
          <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {HOW_IT_WORKS.map((item) => (
              <li key={item.step} className="text-center sm:text-left">
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  Step {item.step}
                </p>
                <h3 className="mt-2 font-montserrat text-xl font-black text-[#1C1410]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why + photo */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="why-heading">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-200">
            <Image
              src={ASSETS.playing}
              alt="Youth dancers playing and moving during class at Studio E"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2
              id="why-heading"
              className="font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
            >
              {COPY.whyHeadline}
            </h2>
            <ul className="mt-8 space-y-3">
              {WHY_POINTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                  <span className="text-base leading-snug text-stone-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="scroll-mt-24 bg-[#F7F1E8] px-4 py-14 sm:px-6 sm:py-16"
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="pricing-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.pricingHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-stone-600">
            {COPY.pricingBody}
          </p>
          <p className="mt-2 text-center text-sm font-semibold text-[#FF3366]">{COPY.setupFeeNote}</p>
          <p className="mt-2 text-center text-sm text-stone-500">{COPY.pricingNote}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                className={`flex flex-col rounded-2xl border bg-white p-6 ${
                  plan.featured
                    ? "border-[#FF3366] shadow-[0_16px_40px_rgba(255,51,102,0.16)] ring-2 ring-[#FF3366]/25"
                    : "border-[#E8DCC8] shadow-sm"
                }`}
              >
                <h3 className="font-montserrat text-2xl font-black uppercase tracking-wide text-[#1C1410]">
                  {plan.name}
                </h3>
                <p className="mt-1 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-[#FF3366]">
                  {plan.frequency}
                </p>
                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                  <span className="font-montserrat text-xl font-bold text-stone-400 line-through">
                    ${plan.regular}
                  </span>
                  <span className="font-montserrat text-4xl font-black text-[#1C1410]">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-stone-500">/ {plan.cadence}</span>
                </div>
                <p className="mt-2 text-xs text-stone-500">
                  Billed every 4 weeks · full 16-week session
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackMeta("InitiateCheckout", {
                      content_name: `${PROGRAM.name} — ${plan.name}`,
                      value: plan.price,
                      currency: "USD",
                      placement: `youth_${plan.id}`,
                    })
                  }
                  className={`mt-8 ${ctaClass} ${
                    plan.featured ? "" : "from-[#1C1410] to-[#3A2420] shadow-none"
                  }`}
                >
                  Join {plan.name}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section
        id="contact"
        className="scroll-mt-6 bg-[#F7F1E8] px-4 py-14 sm:px-6 sm:py-16"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2
            id="contact-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.contactHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base text-stone-600">
            {COPY.contactBody}
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8DCC8] bg-white p-1 shadow-sm sm:mt-8 sm:p-3">
            <Script
              src="https://link.msgsndr.com/js/form_embed.js"
              strategy="afterInteractive"
              onLoad={initContactFormEmbed}
            />
            <iframe
              src={CONTACT_FORM.url}
              id={CONTACT_IFRAME_ID}
              title={CONTACT_FORM.name}
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name={CONTACT_FORM.name}
              data-height="560"
              data-layout-iframe-id={CONTACT_IFRAME_ID}
              data-form-id={CONTACT_FORM.id}
              className="block w-full border-0 bg-white"
              style={{ width: "100%", minHeight: "480px", border: "none", borderRadius: "8px" }}
            />
          </div>
          <p className="mt-4 text-center text-sm text-stone-500">
            If the form doesn&apos;t load,{" "}
            <a
              href={CONTACT_FORM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#FF3366] underline underline-offset-2"
            >
              open it in a new tab
            </a>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="faq-heading">
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
              const panelId = `youth-faq-${index}`
              const buttonId = `youth-faq-btn-${index}`
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
            <a href="#pricing" className={ctaClass}>
              {COPY.primaryCta}
            </a>
            <div>
              <a href="#contact" className={`${contactLinkClass} text-white/80`}>
                {COPY.contactLink}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8DCC8] bg-[#F7F1E8] px-4 py-10 text-center text-sm text-stone-500 sm:px-6">
        <p className="font-montserrat text-base font-bold text-[#1C1410]">{PROGRAM.venueName}</p>
        <p className="mt-1">
          {PROGRAM.addressLine}, {PROGRAM.cityLine}
        </p>
        <p className="mt-1 text-xs">{PROGRAM.name}</p>
      </footer>

      <style jsx global>{`
        @keyframes youth-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes youth-ken {
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
