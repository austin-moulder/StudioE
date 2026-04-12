import Link from "next/link"
import type { ReactNode } from "react"
import { Calendar, CheckCircle2, Flame, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Now To Save Your Spot | Studio E Fitness",
  description:
    "Limited spots — complete your registration. Book a goal-setting meeting with a coach and take the next step in your Studio E transformation.",
}

/** GoHighLevel booking / preview funnel */
const GHL_FUNNEL_URL = "https://app.gohighlevel.com/v2/preview/EC9I4Cf4ob30ck3wU6DC"

function PrimaryCta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={GHL_FUNNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 md:text-base ${className}`}
    >
      {children}
    </a>
  )
}

function SecondaryCta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={GHL_FUNNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-8 py-4 text-center text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:text-base ${className}`}
    >
      {children}
    </a>
  )
}

export default function FitnessLanding2Page() {
  return (
    <div className="min-h-screen bg-[#0c0c10] text-white">
      {/* Urgency strip */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-3 text-center text-sm font-black uppercase tracking-wide text-gray-900 md:text-base">
        <p>⚠️ Limited spots ⚠️</p>
        <p className="mt-1">Registration ends soon!</p>
      </div>

      <header className="border-b border-white/10 bg-[#14141c] py-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">Studio E</p>
        <p className="mt-2 text-lg font-bold text-white/90">Book now to save your spot</p>
      </header>

      {/* Hero: wait / congrats */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1025] to-[#0c0c10] px-4 py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_var(--tw-gradient-stops))] from-[#FF3366]/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-2xl font-black md:text-3xl">🚨 Wait! 🚨</p>
          <p className="mt-2 text-lg text-white/90 md:text-xl">One last step! 👇</p>
          <h1 className="mt-8 text-3xl font-black leading-tight md:text-4xl">
            Congratulations on registering 👏
          </h1>
          <p className="mt-4 text-lg text-white/80">
            You&apos;re almost there — book your goal-setting time with a coach using the calendar on our booking
            page.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <PrimaryCta>Book a consultation</PrimaryCta>
            <SecondaryCta className="sm:!border-[#FF3366]/50 sm:!bg-transparent sm:!text-white">
              Open full booking page
            </SecondaryCta>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/10 px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-black md:text-3xl">Here&apos;s how our process works</h2>

          <div className="mt-12 space-y-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-10 w-10 flex-shrink-0 text-emerald-400" aria-hidden />
                <div>
                  <h3 className="text-xl font-bold text-emerald-100 md:text-2xl">✅ Step 1: Register ✅</h3>
                  <p className="mt-2 text-white/85">You completed this! 😃</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#FF3366]/40 bg-[#FF3366]/10 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Calendar className="h-10 w-10 flex-shrink-0 text-[#FF7A5A]" aria-hidden />
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">👉 Step 2: You are here! 👈</h3>
                  <p className="mt-3 text-white/85">
                    Use the calendar on the booking page and schedule a goal-setting meeting with a coach.
                  </p>
                  <div className="mt-6">
                    <PrimaryCta className="w-full sm:w-auto">Book a consultation</PrimaryCta>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Flame className="h-10 w-10 flex-shrink-0 text-orange-400" aria-hidden />
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">Step 3: Set goals &amp; crush them 🔥</h3>
                  <p className="mt-3 text-white/80">
                    Come meet with a coach, talk through your goals, and see if the program is the right fit for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded booking hint */}
      <section className="border-t border-white/10 bg-[#14141c] px-4 py-12">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/50">Calendar &amp; booking</p>
          <p className="mt-3 text-lg text-white/85">
            The scheduling widget loads on our secure booking page (same link as below).
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-xl">
            <iframe
              src={GHL_FUNNEL_URL}
              title="Studio E — book a consultation"
              className="min-h-[720px] w-full"
              loading="lazy"
            />
          </div>
          <p className="mt-4 text-sm text-white/50">
            If the calendar doesn&apos;t load here, use{" "}
            <a
              href={GHL_FUNNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#FF7A5A] underline underline-offset-2 hover:text-[#FF3366]"
            >
              open booking in a new tab
            </a>
            .
          </p>
        </div>
      </section>

      {/* Alumni / testimonials */}
      <section className="px-4 py-16 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-2 text-center">
            <Sparkles className="h-6 w-6 text-amber-400" aria-hidden />
            <h2 className="text-2xl font-black md:text-3xl">Just a few of our alumni…</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <blockquote className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <p className="text-lg leading-relaxed text-white/90">
                &ldquo;I have NEVER liked working out, especially in a gym! I LOVE THIS GYM! All of the people I have
                worked out with are so encouraging and helpful. They have done a great job creating a community. I
                feel better than I have felt in years! I am 58 years old… if I can do it, so can you!!&rdquo;
              </p>
              <footer className="mt-6 font-bold text-[#FF3366]">— Krista H.</footer>
            </blockquote>
            <blockquote className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <p className="text-lg leading-relaxed text-white/90">
                &ldquo;This gym is not just a place to work out, get fit and get your wellbeing and fitness goals…
                it&apos;s so so much more. It&apos;s a big family, a support group of incredible non judgmental people
                who will encourage you in your journey and celebrate your victories. You changed my view about working
                out!&rdquo;
              </p>
              <footer className="mt-6 font-bold text-[#9933CC]">— Nat M.</footer>
            </blockquote>
          </div>

          <div className="mt-14 text-center">
            <p className="text-xl font-black md:text-2xl">More success stories 🤩</p>
            <p className="mt-3 text-2xl font-black text-[#FF7A5A] md:text-3xl">Are you next⁉️ 🔥</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryCta>Schedule your transformation orientation</PrimaryCta>
              <SecondaryCta>Book a consultation</SecondaryCta>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0c0c10] py-12">
        <div className="container px-4 text-center text-sm text-white/50">
          <p>
            Studio E · Copyright © {new Date().getFullYear()} · All rights reserved
          </p>
          <Link href="/privacy" className="mt-4 inline-block font-medium text-white/70 hover:text-white">
            Privacy Policy
          </Link>
          <p className="mt-6">
            <Link href="/fitnesslanding" className="text-white/50 hover:text-white/80">
              6-week challenge landing
            </Link>
            {" · "}
            <Link href="/fitness" className="text-white/50 hover:text-white/80">
              Studio E Fitness
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
