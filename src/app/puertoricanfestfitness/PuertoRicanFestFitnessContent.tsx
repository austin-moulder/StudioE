"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Loader2,
  MapPin,
  Users,
} from "lucide-react"
import { getStripe } from "@/lib/stripe/config"
import type { WeeklyScheduleRow } from "@/lib/fest-pass/fitnessScheduleSnapshot"

const HERO_BULLETS = [
  "Unlimited Latin‑inspired fitness classes for 30 days",
  "Evening & weekend options in Humboldt Park",
  "Beginner‑friendly coaches and community",
] as const

const STEPS = [
  {
    step: "1",
    title: "Grab your $49 Fitness Pass online",
    body: "Secure checkout takes about a minute. One-time payment—no subscription.",
  },
  {
    step: "2",
    title: "Pick your first class on the schedule",
    body: "Choose a weeknight or Saturday morning slot that fits your life.",
  },
  {
    step: "3",
    title: "Show up and train as often as you want for 30 days",
    body: "Come to class, build strength, and feel the energy of the community.",
  },
] as const

const INCLUDED = [
  "Unlimited Latin-inspired fitness classes for 30 days",
  "Saturday morning sessions to build strength fast",
  "Small-group workouts so you never feel lost in a big gym",
  "1:1 help from coaches so you never feel lost",
  "Members-only WhatsApp group for events and rides",
] as const

const FAQS = [
  {
    q: "Do I need experience?",
    a: "No. Total beginners welcome.",
  },
  {
    q: "Do I need a partner?",
    a: "No. Every class is coached for individuals and small groups.",
  },
  {
    q: "Is this a subscription?",
    a: "No. One‑time $49 pass. No auto‑renew.",
  },
] as const

function scrollToCheckout() {
  document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function FitnessPassButton({
  size = "default",
  label = "Claim my $49 Fitness Pass",
}: {
  size?: "default" | "large"
  label?: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/stripe/fest-fitness-pass-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Could not start checkout")
      }

      const stripe = await getStripe()
      if (!stripe) {
        throw new Error("Payment system is unavailable. Please try again later.")
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })
      if (stripeError) throw new Error(stripeError.message)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed")
    } finally {
      setLoading(false)
    }
  }

  const sizeClasses =
    size === "large"
      ? "w-full max-w-lg px-10 py-5 text-lg md:text-xl"
      : "w-full max-w-md px-8 py-4 text-base md:text-lg"

  return (
    <>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-white font-black uppercase tracking-wide text-gray-900 shadow-xl transition-opacity hover:opacity-95 disabled:opacity-70 ${sizeClasses}`}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Redirecting…
          </>
        ) : (
          <>
            {label}
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
          </>
        )}
      </button>
      {error && <p className="mt-3 text-center text-sm font-medium text-red-100">{error}</p>}
    </>
  )
}

export function CheckoutStatusBanner() {
  const searchParams = useSearchParams()
  const status = searchParams.get("checkout")

  if (status === "success") {
    return (
      <div className="border-b border-green-200 bg-green-50 px-4 py-4 text-center">
        <p className="text-base font-semibold text-green-800">
          Payment received — welcome to the Fest Fitness Pass! Check your email for confirmation. We&apos;ll see you in
          class.
        </p>
      </div>
    )
  }

  if (status === "canceled") {
    return (
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-4 text-center">
        <p className="text-base font-medium text-amber-900">
          Checkout was canceled. Your pass is still waiting — scroll down when you&apos;re ready.
        </p>
      </div>
    )
  }

  return null
}

function ScheduleGrid({ schedule }: { schedule: WeeklyScheduleRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      
        
          <div className="hidden md:block">
            {schedule.map((row) => (
              <div
                key={row.day}
                className="grid grid-cols-[minmax(7rem,1fr)_1fr] border-b border-gray-100 last:border-b-0"
              >
                <div className="bg-gray-50 px-4 py-3 font-bold text-gray-900">{row.day}</div>
                <div className="px-4 py-3">
                  <ul className="space-y-2">
                    {row.slots.map((slot) => (
                      <li
                        key={`${row.day}-${slot.time}-${slot.label}`}
                        className="flex flex-wrap gap-x-2 text-gray-700"
                      >
                        <span className="font-semibold text-[#FF3366]">{slot.time}</span>
                        <span>{slot.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
      </div>

      <div className="divide-y divide-gray-100 md:hidden">
        {schedule.map((row) => (
          <div key={row.day} className="px-4 py-4">
            <p className="font-bold text-gray-900">{row.day}</p>
            <ul className="mt-2 space-y-2">
              {row.slots.map((slot) => (
                <li key={`${row.day}-m-${slot.time}-${slot.label}`} className="text-sm text-gray-700">
                  <span className="font-semibold text-[#FF3366]">{slot.time}</span>
                  <span className="mx-1.5 text-gray-300">·</span>
                  {slot.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PuertoRicanFestFitnessContent({ schedule }: { schedule: WeeklyScheduleRow[] }) {
  return (
    <div className="min-h-screen bg-white">
      <CheckoutStatusBanner />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#FF3366]/35 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF3366]/20 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
            Puerto Rican Fest · Studio E Fitness
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Puerto Rican Fest Fitness Pass – 30 Days for $49
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-medium leading-snug text-white/95 md:text-2xl">
            Feel stronger, tighter, and more energized in 30 days. No experience needed.
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
              Claim my $49 Fitness Pass
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>
            <p className="flex items-center gap-1.5 text-sm text-white/70">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              2659 W Division St · Humboldt Park
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
          <div className="mx-auto max-w-3xl">
            <div className="mb-2 flex items-center gap-2 text-[#FF3366]">
              <Calendar className="h-6 w-6" aria-hidden />
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">When are classes?</h2>
            </div>
            <p className="mb-8 text-lg text-gray-600">
              We run most fitness classes on weeknights 6–9 pm plus Saturday mornings.
            </p>
            <ScheduleGrid schedule={schedule} />
            <p className="mt-4 text-center text-sm text-gray-500">
              Sample times from our current schedule. Exact classes may vary—your pass covers all eligible sessions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-2 flex items-center justify-center gap-2 text-[#9933CC] md:justify-start">
              <Dumbbell className="h-6 w-6" aria-hidden />
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
                Claim my $49 Fitness Pass
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </section>

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
            Claim your $49 Fest Fitness Pass
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/90">
            30 days of unlimited Latin-inspired fitness at Studio E Fitness in Humboldt Park.
          </p>
          <div className="mt-10 flex flex-col items-center">
            <FitnessPassButton size="large" label="Checkout" />
            <p className="mt-5 max-w-md text-sm text-white/85">
              Secure checkout. One-time payment. No auto‑renew.
            </p>
          </div>
          <p className="mx-auto mt-8 max-w-sm text-xs text-white/70">
            Questions?{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-white">
              Contact us
            </Link>{" "}
            or visit{" "}
            <Link href="/fitness" className="underline underline-offset-2 hover:text-white">
              Studio E Fitness
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}

