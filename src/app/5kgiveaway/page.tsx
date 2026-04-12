import Link from "next/link"
import { Sparkles, Trophy } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "$5K Full-Body Transformation Giveaway | Studio E",
  description:
    "Enter free to win 90 days of tailored full-body transformation coaching and training — worth $5,000+. Apply with Studio E.",
}

/** Resolved from https://forms.gle/JheV8MdMXzhqC4Ck8 — embedded Google Form */
const GOOGLE_FORM_EMBED_SRC =
  "https://docs.google.com/forms/d/e/1FAIpQLScf7wzLc3Vt32Rp8tthMQ8l1Ko-wpjKPPMMBuhqBdykQ7Hyqg/viewform?embedded=true"

const GOOGLE_FORM_SHORT = "https://forms.gle/JheV8MdMXzhqC4Ck8"

export default function FiveKGiveawayPage() {
  return (
    <div className="min-h-screen bg-[#0c0c10] text-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0f18] via-[#120a14] to-[#0c0c10] px-4 pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,_var(--tw-gradient-stops))] from-[#FF3366]/30 via-[#9933CC]/10 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">Studio E</p>
          <p className="mt-4 text-sm font-bold uppercase tracking-wide text-[#FF7A5A] md:text-base">
            Join the &ldquo;$5K transformation&rdquo; giveaway for free today
          </p>
          <h1 className="mt-6 text-3xl font-black leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="block text-[#FF3366] md:inline md:mr-2">$5,000</span>
            <span className="block md:inline">full-body</span>
            <span className="mt-1 block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent md:mt-2">
              transformation giveaway
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            Enter to win <strong className="font-semibold text-white">90 days</strong> of tailored full-body
            transformation coaching and training <strong className="font-semibold text-white">free</strong>{" "}
            <span className="text-[#FF7A5A]">(worth $5,000+)</span>
          </p>
        </div>
      </section>

      <section id="enter" className="border-t border-white/10 bg-[#14141c] px-4 py-10 md:py-14">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6 flex flex-col items-center gap-2 text-center md:flex-row md:justify-center md:gap-3">
            <Trophy className="h-7 w-7 text-amber-400" aria-hidden />
            <h2 className="text-2xl font-black md:text-3xl">Enter to win below</h2>
          </div>
          <p className="mb-8 text-center text-sm text-white/55">
            Complete the short application. Fields match our official form: first name, last name, email, phone,
            goals, why you should be chosen, and optional nomination note.
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xl">
            <iframe
              src={GOOGLE_FORM_EMBED_SRC}
              title="Studio E $5K transformation giveaway — enter to win"
              className="h-[min(2000px,90vh)] w-full min-h-[1400px] bg-white"
              loading="lazy"
            />
          </div>
          <p className="mt-4 text-center text-sm text-white/45">
            Form not loading?{" "}
            <a
              href={GOOGLE_FORM_SHORT}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#FF7A5A] underline underline-offset-2 hover:text-white"
            >
              Open the form in a new tab
            </a>
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 bg-gradient-to-r from-[#FF3366]/20 via-[#9933CC]/15 to-transparent px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Sparkles className="h-8 w-8 text-amber-300" aria-hidden />
          </div>
          <h2 className="mt-4 text-2xl font-black md:text-4xl">Real people, real results</h2>
          <p className="mt-4 text-lg text-white/75">
            Enter for your chance to win — then come meet the coaches and community that make Studio E different.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#enter"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-black uppercase tracking-wide text-gray-900 shadow-lg transition-opacity hover:opacity-95"
            >
              Enter for chance to win
            </a>
            <Link
              href="/fitness"
              className="text-sm font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
            >
              Studio E Fitness
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0c0c10] py-10">
        <div className="container px-4 text-center text-sm text-white/45">
          <p className="font-semibold text-white/60">Studio E</p>
          <Link href="/privacy" className="mt-3 inline-block text-[#FF7A5A] hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  )
}
