"use client"

import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { useEffect, useState } from "react"
import { Check, ChevronDown, MapPin } from "lucide-react"
import StudioELogo from "@/components/StudioELogo"
import {
  AGE_GROUPS,
  ASSETS,
  CONTACT_FORM,
  COPY,
  DEPOSIT,
  FAQS,
  HERO_FACTS,
  HERO_TAGS,
  HOW_IT_WORKS,
  NEXT_BILLING,
  PLANS,
  PROGRAM,
  TRUST_POINTS,
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
      minHeight: window.matchMedia("(max-width: 768px)").matches ? 420 : 520,
    },
    iframe
  )
  return true
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

const primaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_28px_rgba(255,51,102,0.35)] transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

const secondaryCtaClass =
  "inline-flex w-full items-center justify-center rounded-2xl border-2 border-white/70 bg-transparent px-6 py-3.5 text-center font-montserrat text-sm font-black uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1410] sm:text-base"

const secondaryCtaLightClass =
  "inline-flex w-full items-center justify-center rounded-2xl border-2 border-[#1C1410]/15 bg-white px-6 py-3.5 text-center font-montserrat text-sm font-black uppercase tracking-wide text-[#1C1410] transition hover:border-[#FF3366]/40 hover:text-[#FF3366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:text-base"

function FormEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8DCC8] bg-white p-1 shadow-sm sm:p-3">
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
        data-height="520"
        data-layout-iframe-id={CONTACT_IFRAME_ID}
        data-form-id={CONTACT_FORM.id}
        className="block w-full border-0 bg-white"
        style={{ width: "100%", minHeight: "420px", border: "none", borderRadius: "8px" }}
      />
    </div>
  )
}

export default function YouthClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    trackMeta("ViewContent", {
      content_name: PROGRAM.name,
      content_category: "youth_program",
    })

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
    <div className="min-h-screen scroll-smooth bg-[#F7F1E8] pb-24 text-stone-900 antialiased sm:pb-0">
      {/* Minimal landing nav */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#1C1410]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Studio E home">
            <StudioELogo width={36} height={36} alt="Studio E Logo" className="h-9 w-9" />
            <span className="font-montserrat text-sm font-bold tracking-wide text-white">STUDIO E</span>
          </Link>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-[#E8C97A] transition hover:text-white"
          >
            {COPY.contactNav}
          </button>
        </div>
      </div>

      <div className="bg-[#1C1410] px-4 py-2 text-center">
        <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A] sm:text-xs">
          {COPY.announcement}
        </p>
      </div>

      {/* Hero — keep short so form is one scroll away */}
      <header className="relative isolate overflow-hidden bg-[#1C1410] text-white">
        <Image
          src={ASSETS.group}
          alt="Chicago Latin Dance Youth Program group at Studio E"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1410]/55 via-[#1C1410]/75 to-[#1C1410]" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12">
          <p className="text-center font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-[#E8C97A]">
            Studio E · Youth Program
          </p>
          <h1 className="mt-3 text-center font-montserrat text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl">
            {COPY.heroHeadline}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-white/90 sm:text-lg">
            {COPY.heroSubheadline}
          </p>

          <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
            {HERO_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-center sm:text-left"
              >
                <p className="font-montserrat text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8C97A]">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {HERO_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-white/85"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-white/70">
            <MapPin className="h-3.5 w-3.5 text-[#E8C97A]" aria-hidden />
            {PROGRAM.neighborhood}
          </p>

          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                trackMeta("Lead", { content_name: "Youth form CTA", placement: "hero" })
                scrollToId("contact")
              }}
              className={primaryCtaClass}
            >
              {COPY.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className={secondaryCtaClass}
            >
              {COPY.secondaryCta}
            </button>
          </div>
        </div>
      </header>

      {/* Form — primary conversion, directly under hero */}
      <section
        id="contact"
        className="scroll-mt-20 bg-white px-4 py-10 sm:px-6 sm:py-12"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-xl">
          <h2
            id="contact-heading"
            className="text-center font-montserrat text-2xl font-black tracking-tight text-[#1C1410] sm:text-3xl"
          >
            {COPY.formHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-base leading-relaxed text-stone-600">
            {COPY.formBody}
          </p>
          <div className="mt-6">
            <FormEmbed />
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
          <p className="mt-6 text-center text-sm text-stone-600">
            Ready now?{" "}
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className="font-semibold text-[#FF3366] underline underline-offset-2"
            >
              Enroll with the ${DEPOSIT.price} deposit
            </button>
            .
          </p>
        </div>
      </section>

      {/* Offer / age groups */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="offer-heading">
        <div className="mx-auto max-w-4xl">
          <h2
            id="offer-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.offerHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-stone-600">
            {COPY.offerBody}
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {AGE_GROUPS.map((group) => (
              <article
                key={group.id}
                className="rounded-2xl border border-[#E8DCC8] bg-white p-6 shadow-sm sm:p-7"
              >
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  {group.ages}
                </p>
                <h3 className="mt-2 font-montserrat text-2xl font-black text-[#1C1410] sm:text-3xl">
                  {group.time}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{group.body}</p>
                <p className="mt-5 font-montserrat text-xs font-bold uppercase tracking-[0.16em] text-[#1C1410]">
                  {group.curriculumHeadline}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {group.curriculum.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3366]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 text-center font-montserrat text-sm font-bold uppercase tracking-[0.14em] text-[#1C1410]">
            {PROGRAM.daysLabel}
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className={primaryCtaClass}
            >
              {COPY.primaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="how-heading">
        <div className="mx-auto max-w-4xl">
          <h2
            id="how-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
          >
            {COPY.howHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-stone-600">
            {COPY.howBody}
          </p>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <li
                key={item.step}
                className="rounded-2xl border border-[#E8DCC8] bg-[#F7F1E8]/70 p-5"
              >
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  Step {item.step}
                </p>
                <h3 className="mt-2 font-montserrat text-lg font-black text-[#1C1410]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust + photo */}
      <section className="px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="trust-heading">
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
              id="trust-heading"
              className="font-montserrat text-3xl font-black tracking-tight text-[#1C1410] sm:text-4xl"
            >
              {COPY.trustHeadline}
            </h2>
            <ul className="mt-8 space-y-3">
              {TRUST_POINTS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                  <span className="text-base leading-snug text-stone-800">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-md">
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className={primaryCtaClass}
              >
                {COPY.primaryCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment — deposit + free rest of year */}
      <section
        id="pricing"
        className="scroll-mt-24 bg-[#1C1410] px-4 py-14 text-white sm:px-6 sm:py-16"
        aria-labelledby="pricing-heading"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-center font-montserrat text-xs font-bold uppercase tracking-[0.22em] text-[#E8C97A]">
            {DEPOSIT.freePreviewHeadline}
          </p>
          <h2
            id="pricing-heading"
            className="mt-2 text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.pricingHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-white/85">
            {COPY.pricingBody}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm font-semibold text-[#E8C97A]">
            {COPY.pricingNote}
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#FF3366]/40 bg-white/5 p-6 text-center">
            <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-[#FF7A5A]">
              Today
            </p>
            <p className="mt-2 font-montserrat text-5xl font-black">${DEPOSIT.price}</p>
            <p className="mt-1 text-sm text-white/75">
              Deposit applied to {DEPOSIT.covers}
            </p>
            <ul className="mt-5 space-y-2 text-left text-sm text-white/80">
              {[
                "Unlimited youth classes free for the rest of 2026",
                "Small class sizes & personalized attention while we build",
                `No charge again until ${NEXT_BILLING.label}`,
                "Then choose Bronze or Gold",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E8C97A]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={DEPOSIT.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackMeta("InitiateCheckout", {
                  content_name: `${PROGRAM.name} — Deposit`,
                  value: DEPOSIT.price,
                  currency: "USD",
                  placement: "youth_deposit",
                })
              }
              className={`mt-8 ${primaryCtaClass}`}
            >
              {COPY.secondaryCta}
            </a>
          </div>

          <h3 className="mt-14 text-center font-montserrat text-2xl font-black tracking-tight">
            {COPY.plansHeadline}
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-white/65">{COPY.plansBody}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                className={`flex flex-col rounded-2xl border p-6 ${
                  plan.featured
                    ? "border-[#FF3366] bg-white text-[#1C1410] shadow-[0_16px_40px_rgba(255,51,102,0.2)]"
                    : "border-white/15 bg-white/5 text-white"
                }`}
              >
                <h3 className="font-montserrat text-2xl font-black uppercase tracking-wide">
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 font-montserrat text-xs font-bold uppercase tracking-[0.16em] ${
                    plan.featured ? "text-[#FF3366]" : "text-[#E8C97A]"
                  }`}
                >
                  {plan.frequency}
                </p>
                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                  <span
                    className={`font-montserrat text-xl font-bold line-through ${
                      plan.featured ? "text-stone-400" : "text-white/40"
                    }`}
                  >
                    ${plan.regular}
                  </span>
                  <span className="font-montserrat text-4xl font-black">${plan.price}</span>
                  <span className={`text-sm ${plan.featured ? "text-stone-500" : "text-white/60"}`}>
                    / {plan.cadence}
                  </span>
                </div>
                <p className={`mt-2 text-xs ${plan.featured ? "text-stone-500" : "text-white/55"}`}>
                  Starts {NEXT_BILLING.label} · not charged at deposit
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.includes.map((item) => (
                    <li
                      key={item}
                      className={`flex items-start gap-2.5 text-sm ${
                        plan.featured ? "text-stone-700" : "text-white/85"
                      }`}
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.featured ? "text-[#FF3366]" : "text-[#E8C97A]"
                        }`}
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
            <a
              href={DEPOSIT.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackMeta("InitiateCheckout", {
                  content_name: `${PROGRAM.name} — Deposit`,
                  value: DEPOSIT.price,
                  currency: "USD",
                  placement: "youth_deposit_after_plans",
                })
              }
              className={primaryCtaClass}
            >
              {COPY.secondaryCta}
            </a>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className={secondaryCtaClass}
            >
              {COPY.primaryCta}
            </button>
          </div>
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
          <div className="mx-auto mt-10 max-w-md">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className={primaryCtaClass}
            >
              {COPY.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className={`mt-3 ${secondaryCtaLightClass}`}
            >
              {COPY.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA — form first */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-16 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.finalHeadline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/90">
            {COPY.finalBody}
          </p>
          <div className="mx-auto mt-8 max-w-md space-y-3">
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 font-montserrat text-sm font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 sm:text-base"
            >
              {COPY.primaryCta}
            </button>
            <button
              type="button"
              onClick={() => scrollToId("pricing")}
              className={secondaryCtaClass}
            >
              {COPY.secondaryCta}
            </button>
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

      {/* Mobile sticky — form primary, not checkout */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={() => {
            trackMeta("Lead", { content_name: "Youth form CTA", placement: "sticky" })
            scrollToId("contact")
          }}
          className={primaryCtaClass}
        >
          {COPY.primaryCta}
        </button>
      </div>
    </div>
  )
}
