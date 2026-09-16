"use client"

import Image from "next/image"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"
import {
  CHECKOUT_URL,
  CHALLENGE_IMAGES,
  COPY,
  FAQS,
  INCLUDED,
  MEMBER_BOGO,
  MEMBER_BOGO_URL,
  PATH_STEPS,
  PRICING,
  TRACK_GROUPS,
  TRACKS,
} from "@/lib/challenge/config"

const ctaClass =
  "inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-7 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-white shadow-lg transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2 sm:w-auto"

function PriceScratch({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-baseline justify-center gap-3">
      <span
        className={`font-montserrat text-2xl font-bold line-through sm:text-3xl ${
          light ? "text-white/60" : "text-stone-400"
        }`}
      >
        ${PRICING.regular}
      </span>
      <span
        className={`font-montserrat text-5xl font-black tabular-nums sm:text-6xl ${
          light ? "text-white" : "text-stone-900"
        }`}
      >
        ${PRICING.early}
      </span>
    </div>
  )
}

export default function ChallengeClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="flex min-h-screen flex-col bg-white text-stone-900 pb-24 sm:pb-0">
      {/* Hero */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-stone-950 text-white">
        <Image
          src={CHALLENGE_IMAGES.hero}
          alt="Studio E dancers in a private lesson during a 28-day challenge"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/25 via-transparent to-[#9933CC]/15" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-end px-4 pb-16 pt-28 sm:pb-20 md:justify-center md:px-6">
          <div className="animate-[fadeUp_0.7s_ease-out_both]">
            <p className="mb-4 font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-[#FF7A5A] sm:text-sm">
              {COPY.brand} · 28-Day Challenges
            </p>
            <h1 className="font-montserrat text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {COPY.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg">
              {COPY.heroBody}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={CHECKOUT_URL}
                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-7 py-4 text-center font-montserrat text-base font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] sm:w-auto"
              >
                {COPY.primaryCta}
              </a>
              <div className="text-left">
                <PriceScratch light />
                <p className="mt-1 text-xs text-white/75">{PRICING.earlyNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="border-b border-stone-100 px-4 py-16 sm:px-6 md:py-20" aria-labelledby="included-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="included-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.includedHeadline}
          </h2>
          <ul className="mt-10 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 px-1 py-1">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                <span className="text-base leading-snug text-stone-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tracks */}
      <section className="bg-stone-50 px-4 py-16 sm:px-6 md:py-20" aria-labelledby="tracks-heading">
        <div className="mx-auto max-w-3xl">
          <h2
            id="tracks-heading"
            className="text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {COPY.tracksHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-base text-stone-600">
            {COPY.tracksBody}
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {TRACK_GROUPS.map((group) => (
              <div key={group.id}>
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {TRACKS.filter((t) => t.group === group.id).map((track) => (
                    <li
                      key={track.name}
                      className="border-b border-stone-200 pb-2.5 font-montserrat text-base font-bold text-stone-900"
                    >
                      {track.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a href={CHECKOUT_URL} className={ctaClass}>
              {COPY.primaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Path + photo */}
      <section className="px-4 py-16 sm:px-6 md:py-20" aria-labelledby="path-heading">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200 md:order-2">
            <Image
              src={CHALLENGE_IMAGES.practice}
              alt="Studio E student practicing during a challenge private"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="md:order-1">
            <h2
              id="path-heading"
              className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
            >
              {COPY.pathHeadline}
            </h2>
            <ol className="mt-8 space-y-6">
              {PATH_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-montserrat text-base font-bold text-stone-900">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Outcome — portrait photo kept in frame, not cropped as a wide banner */}
      <section
        className="border-b border-stone-100 bg-stone-950 px-4 py-16 text-white sm:px-6 md:py-20"
        aria-labelledby="outcome-heading"
      >
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl bg-stone-900 md:mx-0">
            <Image
              src={CHALLENGE_IMAGES.community}
              alt="Studio E dancers celebrating progress together"
              fill
              className="object-cover object-[center_20%]"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className="text-center md:text-left">
            <h2
              id="outcome-heading"
              className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            >
              {COPY.outcomeHeadline}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg md:mx-0">
              {COPY.outcomeBody}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-16 text-white sm:px-6 md:py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl">
            {COPY.pricingHeadline}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/90">{COPY.pricingBody}</p>
          <div className="mt-8">
            <PriceScratch light />
            <p className="mt-2 text-sm text-white/80">{PRICING.earlyNote}</p>
          </div>
          <a
            href={CHECKOUT_URL}
            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-white px-7 py-4 font-montserrat text-base font-black uppercase tracking-wide text-[#FF3366] shadow-lg transition hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#FF3366] sm:w-auto"
          >
            {COPY.primaryCta}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone-50 px-4 py-16 sm:px-6 md:py-20" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-xl">
          <h2
            id="faq-heading"
            className="mb-8 text-center font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            FAQ
          </h2>
          <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
            {FAQS.map((item, index) => {
              const open = openFaq === index
              const panelId = `challenge-faq-${index}`
              const buttonId = `challenge-faq-btn-${index}`
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
                      <span className="font-montserrat text-sm font-bold text-stone-900 sm:text-base">
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

          <div className="mt-10 text-center">
            <a href={CHECKOUT_URL} className={ctaClass}>
              {COPY.primaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* Already a member — BOGO privates */}
      <section
        className="border-t border-stone-200 bg-white px-4 py-16 sm:px-6 md:py-20"
        aria-labelledby="member-heading"
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="member-heading"
            className="font-montserrat text-3xl font-black tracking-tight sm:text-4xl"
          >
            {MEMBER_BOGO.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-stone-600">
            {MEMBER_BOGO.body}
          </p>
          <div className="mt-8 flex items-baseline justify-center gap-3">
            <span className="font-montserrat text-2xl font-bold text-stone-400 line-through">
              ${MEMBER_BOGO.regularPair}
            </span>
            <span className="font-montserrat text-5xl font-black text-stone-900">
              ${MEMBER_BOGO.price}
            </span>
          </div>
          <p className="mt-2 text-sm text-stone-500">for 2 privates</p>
          <a href={MEMBER_BOGO_URL} className={`mt-8 ${ctaClass}`}>
            {MEMBER_BOGO.cta}
          </a>
          <p className="mx-auto mt-4 max-w-sm text-xs leading-relaxed text-stone-500">
            {MEMBER_BOGO.note}
          </p>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-10 text-center text-sm text-stone-500 sm:px-6">
        <p className="font-montserrat text-base font-bold text-stone-900">{COPY.brand}</p>
        <p className="mt-1">2657 W Division Street, Chicago, IL 60622</p>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <a href={CHECKOUT_URL} className={`${ctaClass} w-full`}>
          {COPY.stickyCta} · <span className="line-through opacity-70">${PRICING.regular}</span> $
          {PRICING.early}
        </a>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
