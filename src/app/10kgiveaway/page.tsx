import Link from "next/link"
import type { ReactNode } from "react"
import { Calendar, Gift, Sparkles, Trophy } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "$10K Celebration Giveaway | Studio E Fitness",
  description:
    "Your entry is reserved. Book your intro session to activate your giveaway entry and unlock exclusive prizes — over $10,000 in memberships and rewards.",
}

const GHL_GIVEAWAY_URL = "https://app.gohighlevel.com/v2/preview/67LOMzgu8bmIb2OEYOK5"

function BookCta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={GHL_GIVEAWAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 md:text-base ${className}`}
    >
      {children}
    </a>
  )
}

const howItWorks = [
  {
    n: "1",
    title: "Book your intro session",
    body: "Choose a time that works for you below (or open the full booking page).",
  },
  {
    n: "2",
    title: "Visit",
    body: "Meet our coaches and see what makes our community special.",
  },
  {
    n: "3",
    title: "Enter the celebration giveaway",
    body: "You’ll unlock chances to win prizes when you visit.",
  },
  {
    n: "4",
    title: "Win instantly",
    body: "Members and new visitors both have a chance to win.",
  },
] as const

const prizes = [
  { icon: "💪", text: "Program discounts" },
  { icon: "🎯", text: "Free personal training sessions" },
  { icon: "🥗", text: "Nutrition coaching" },
  { icon: "🎁", text: "Exclusive gym perks & prizes" },
] as const

export default function TenKGiveawayPage() {
  return (
    <div className="min-h-screen bg-[#0c0c10] text-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2d1040] via-[#1a1025] to-[#0c0c10] px-4 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_var(--tw-gradient-stops))] from-[#FF3366]/25 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-4xl md:text-5xl" aria-hidden>
            🎉
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
            You&apos;re in! Your entry is reserved
          </h1>
          <p className="mt-4 text-lg text-white/85 md:text-xl">
            You&apos;re officially entered into the Celebration Giveaway for residents.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            To activate your entry and unlock your prizes, book your{" "}
            <strong className="text-white">Intro Session</strong> below. That locks in your visit and gives you a
            shot at exclusive rewards.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <BookCta>Book your intro session</BookCta>
            <a
              href={GHL_GIVEAWAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#FF7A5A] underline underline-offset-2 hover:text-white"
            >
              Open full booking page →
            </a>
          </div>
        </div>
      </section>

      {/* Calendar / embed */}
      <section className="border-t border-white/10 bg-[#14141c] px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-2 text-[#FF3366]">
            <Calendar className="h-6 w-6" aria-hidden />
            <h2 className="text-lg font-bold uppercase tracking-wide text-white/90">Pick your intro time</h2>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/55">
            Calendar loads from our secure booking page. If you see an empty area, use the button or link above.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl">
            <iframe
              src={GHL_GIVEAWAY_URL}
              title="Studio E — book your intro session"
              className="min-h-[680px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="h-8 w-8 text-amber-400" aria-hidden />
            <h2 className="text-center text-2xl font-black md:text-4xl">How the giveaway works</h2>
          </div>
          <ol className="mt-12 space-y-5">
            {howItWorks.map((step) => (
              <li
                key={step.n}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF3366] to-[#9933CC] text-lg font-black text-white">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold capitalize text-white md:text-xl">{step.title}</h3>
                  <p className="mt-2 text-white/75">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prizes */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[#1a1025] to-[#0c0c10] px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <Gift className="h-8 w-8 text-[#FF7A5A]" aria-hidden />
            <h2 className="text-2xl font-black md:text-4xl">What you could win</h2>
          </div>
          <ul className="mx-auto mt-10 max-w-lg space-y-4 text-left text-lg">
            {prizes.map((p) => (
              <li key={p.text} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-4 py-3">
                <span className="text-2xl" aria-hidden>
                  {p.icon}
                </span>
                <span className="font-medium text-white/90">{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-12 max-w-2xl text-lg font-semibold leading-relaxed text-white/90 md:text-xl">
            We&apos;re giving away <span className="text-[#FF7A5A]">over $10,000</span> in memberships and prizes to
            celebrate our community.
          </p>
          <div className="mt-10 flex justify-center">
            <BookCta>Book your intro session</BookCta>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#14141c] px-4 py-12">
        <div className="container mx-auto flex flex-col items-center gap-4 text-center">
          <Sparkles className="h-8 w-8 text-amber-300" aria-hidden />
          <p className="max-w-md text-white/70">Questions? You can always reach us through your confirmation email.</p>
          <Link href="/privacy" className="text-sm font-medium text-[#FF7A5A] hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </section>
    </div>
  )
}
