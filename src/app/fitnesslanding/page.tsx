import Link from "next/link"
import { Activity, Apple, Dumbbell } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "6-Week Transformation Challenge | Studio E Fitness",
  description:
    "Lose 15–20 lbs in 6 weeks with personalized exercise, nutrition guidance, and accountability. Schedule your transformation orientation at Studio E Fitness Chicago.",
}

/** Original landing / booking funnel on Studio E Fitness Chicago */
const TRANSFORMATION_ORIENTATION_URL =
  "https://studioefitnesschicago.com/landing-page-page-5523-2573-2591-3708"

const benefits = [
  {
    icon: Dumbbell,
    title: "Personalized exercise plans",
    description:
      "Tailored workouts that evolve with your progress and are designed to fit your fitness level.",
    accent: "text-[#FF3366]",
  },
  {
    icon: Apple,
    title: "Custom nutrition guidance",
    description:
      "Easy-to-follow meal plans that fuel your body, support your goals, and fit seamlessly into your lifestyle.",
    accent: "text-[#FF7A5A]",
  },
  {
    icon: Activity,
    title: "Expert accountability & progress tracking",
    description:
      "Regular check-ins and support to ensure you stay motivated, on track, and achieving real results.",
    accent: "text-[#9933CC]",
  },
] as const

function ScheduleButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={TRANSFORMATION_ORIENTATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-center text-sm font-black uppercase tracking-wide text-gray-900 shadow-lg transition-opacity hover:opacity-95 md:text-base ${className}`}
    >
      Schedule your transformation orientation
    </a>
  )
}

export default function FitnessLandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#FF3366]/35">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF3366]/25 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Studio E</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Your transformation starts here!
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Ready to lose 15–20 lbs in 6 weeks? Our proven system combines exercise, nutrition, and
              accountability to help you crush your goals.
            </p>
            <div className="mt-10 flex justify-center">
              <ScheduleButton className="w-full max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* What's in it for you */}
      <section className="border-t border-white/10 bg-[#14141c] py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black md:text-4xl">What&apos;s in it for you?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/75">
            Our 6-week challenge includes everything you need to succeed:
          </p>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description, accent }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm"
              >
                <Icon className={`h-10 w-10 ${accent}`} aria-hidden />
                <h3 className="mt-5 text-xl font-bold capitalize leading-snug text-white md:text-2xl">{title}</h3>
                <p className="mt-4 leading-relaxed text-white/75">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <ScheduleButton className="w-full max-w-lg" />
          </div>
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] py-16 md:py-20">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-black leading-tight md:text-3xl">
            Book your spot today and take the first step towards your transformation!
          </h2>
          <div className="mt-8 flex justify-center">
            <ScheduleButton />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0f0f14] py-10">
        <div className="container px-4 text-center text-sm text-white/50">
          <p>Studio E · Copyright © {new Date().getFullYear()} · All rights reserved</p>
          <Link href="/privacy" className="mt-3 inline-block font-medium text-white/70 hover:text-white">
            Privacy Policy
          </Link>
          <p className="mt-6">
            <Link href="/fitness" className="text-white/60 hover:text-white/90">
              Studio E Fitness on joinstudioe.com
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
