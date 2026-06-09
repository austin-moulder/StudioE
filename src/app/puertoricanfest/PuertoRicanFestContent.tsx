"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle2, MapPin, Music2, Star, Users } from "lucide-react"
import FestCheckoutLink from "@/components/fest-pass/FestCheckoutLink"
import FestWeeklyScheduleTable from "@/components/fest-pass/FestWeeklyScheduleTable"
import StudioMap from "@/components/fest-pass/StudioMap"
import {
  ACUITY_SCHEDULE_URL,
  SQUARE_DANCE_PASS_URL,
  STUDIO_ADDRESS,
} from "@/lib/fest-pass/constants"
import { DANCE_EVENING_SLOTS, DANCE_STUDIO_SCHEDULES } from "@/lib/fest-pass/danceScheduleFlyer"
import { DANCE_TESTIMONIALS } from "@/lib/fest-pass/danceTestimonials"

const HERO_IMAGE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/Wide_group.jpg"

const HERO_BULLETS = [
  "Unlimited classes for 30 days",
  "Find a welcoming group of Latinos who LOVE Latin music",
  "Beginner‑friendly instructors from the Puerto Rican community",
] as const

const STEPS = [
  {
    step: "1",
    title: "Grab your $49 Fest Pass online",
    body: "Secure checkout takes about a minute. One-time payment—no subscription.",
  },
  {
    step: "2",
    title: "Pick your first beginner class on the schedule",
    body: "Choose a time that fits your week. No partner required.",
  },
  {
    step: "3",
    title: "Show up and dance as often as you want for 30 days",
    body: "Come to class, hit Friday socials, and build confidence on the floor.",
  },
] as const

const INCLUDED = [
  "Unlimited salsa, bachata and cumbia classes for 30 days",
  "Weekend beginner workshops to get you comfortable fast",
  "Friday socials to practice with real people",
  "1:1 help from instructors so you never feel lost",
  "Members‑only WhatsApp group for events and rides",
] as const

const FAQS = [
  {
    q: "Do I need experience?",
    a: "No. Total beginners welcome.",
  },
  {
    q: "Do I need a partner?",
    a: "No. We rotate partners in class.",
  },
  {
    q: "Is this a subscription?",
    a: "No. It is a one‑time $49 pass for 30 days. No auto‑renew.",
  },
] as const

function scrollToCheckout() {
  document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export default function PuertoRicanFestContent() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-[480px] overflow-hidden text-white md:min-h-[540px]">
        <Image
          src={HERO_IMAGE}
          alt="Studio E dance class in session"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF3366]/25 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
            Puerto Rican Fest · Studio E
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Puerto Rican Fest Dance Pass – Discover your dance confidence for just $49
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-medium leading-snug text-white/95 md:text-2xl">
            Even if you have two left feet. No partner needed.
          </p>
          <ul className="mt-8 max-w-xl space-y-3">
            {HERO_BULLETS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-white/90 md:text-lg">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF7A5A]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={scrollToCheckout}
              className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black uppercase tracking-wide text-gray-900 shadow-xl transition-opacity hover:opacity-95 md:text-lg"
            >
              Claim my $49 Fest Pass
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>
            <p className="flex items-center gap-1.5 text-sm text-white/70">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {STUDIO_ADDRESS}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 py-14 md:py-16">
        <div className="container px-4">
          <h2 className="text-center text-2xl font-black text-gray-900 md:text-3xl">How it works</h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center md:text-left"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-lg font-black text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 flex items-center gap-2 text-[#FF3366]">
              <Calendar className="h-6 w-6" aria-hidden />
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">When are classes?</h2>
            </div>
            <p className="mb-8 text-lg text-gray-600">
              We run beginner‑friendly salsa and bachata most weeknights 6–9 pm plus weekend workshops.
            </p>
            <div className="space-y-10">
              {DANCE_STUDIO_SCHEDULES.map((studio) => (
                <FestWeeklyScheduleTable
                  key={studio.studioLabel}
                  studioLabel={studio.studioLabel}
                  timeSlots={DANCE_EVENING_SLOTS}
                  grid={studio.grid}
                  beginnerGrid={studio.beginnerGrid}
                  fridaySpanLabel={studio.fridaySpanLabel}
                  fridaySpanStartRow={studio.fridaySpanStartRow}
                  fridaySpanRowCount={studio.fridaySpanRowCount}
                />
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              Classes in <span className="font-bold text-gray-900">bold</span> are beginner-friendly.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Drop-ins welcome · No partner needed ·{" "}
              <a
                href={ACUITY_SCHEDULE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#FF3366] underline underline-offset-2"
              >
                View full schedule &amp; book
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-2 flex items-center justify-center gap-2 text-[#9933CC] md:justify-start">
              <Music2 className="h-6 w-6" aria-hidden />
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">
                What&apos;s included in your 30‑day pass
              </h2>
            </div>
            <ul className="mt-8 space-y-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-gray-700 md:text-lg">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={scrollToCheckout}
                className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95"
              >
                Claim my $49 Fest Pass
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container px-4">
          <h2 className="text-center text-2xl font-black text-gray-900 md:text-3xl">What dancers are saying</h2>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {DANCE_TESTIMONIALS.map((review) => (
              <div
                key={review.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5 text-[#FF3366]" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <p className="mt-4 text-base leading-relaxed text-gray-700">&ldquo;{review.quote}&rdquo;</p>
                <p className="mt-4 font-bold text-gray-900">{review.name}</p>
                <p className="text-sm font-medium text-[#FF3366]">{review.style} Student</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudioMap />

      <section className="py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex items-center gap-2">
              <Users className="h-6 w-6 text-[#FF7A5A]" aria-hidden />
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">FAQ</h2>
            </div>
            <dl className="space-y-6">
              {FAQS.map((item) => (
                <div key={item.q} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <dt className="text-lg font-bold text-gray-900">{item.q}</dt>
                  <dd className="mt-2 text-gray-600">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="checkout"
        className="scroll-mt-6 bg-gradient-to-r from-[#FF3366] to-[#9933CC] py-16 text-white md:py-20"
      >
        <div className="container px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85">One-time · $49</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight md:text-4xl">
            Claim your $49 Fest Pass
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/90">
            30 days of unlimited beginner-friendly salsa, bachata &amp; cumbia at Studio E in Humboldt Park.
          </p>
          <div className="mt-10 flex flex-col items-center">
            <FestCheckoutLink href={SQUARE_DANCE_PASS_URL} label="Checkout" size="large" />
            <p className="mt-5 max-w-md text-sm text-white/85">
              Secure checkout. One-time payment. No auto‑renew.
            </p>
          </div>
          <p className="mx-auto mt-8 max-w-sm text-xs text-white/70">
            Questions?{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-white">
              Contact us
            </Link>{" "}
            or{" "}
            <a
              href={ACUITY_SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              view our full class schedule
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
