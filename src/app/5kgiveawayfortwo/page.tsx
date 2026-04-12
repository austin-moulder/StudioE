import Link from "next/link"
import { Heart, Trophy, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "$5K Giveaway — Nominate Someone | Win Together | Studio E",
  description:
    "Nominate one other person for the Studio E transformation giveaway. If they’re selected, you BOTH win the grand prize.",
}

/** Resolved from https://forms.gle/2AJVmbCDAdUkUrLs9 */
const GOOGLE_FORM_EMBED_SRC =
  "https://docs.google.com/forms/d/e/1FAIpQLSdP-K_htHT8qqM9i7ojRYiyeG3V7IUMoKbihfs0f12h1DwbjQ/viewform?embedded=true"

const GOOGLE_FORM_SHORT = "https://forms.gle/2AJVmbCDAdUkUrLs9"

export default function FiveKGiveawayForTwoPage() {
  return (
    <div className="min-h-screen bg-[#0c0c10] text-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0f24] via-[#120a18] to-[#0c0c10] px-4 pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,_var(--tw-gradient-stops))] from-[#9933CC]/35 via-[#FF3366]/15 to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">Studio E</p>
          <div className="mt-6 flex justify-center gap-2 text-[#FF7A5A]">
            <Users className="h-8 w-8 md:h-10 md:w-10" aria-hidden />
            <Heart className="h-8 w-8 fill-current md:h-10 md:w-10" aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl font-black leading-tight text-white md:text-5xl">
            If you could nominate one other person to win, who would it be?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-semibold text-[#FF7A5A] md:text-xl">
            If they&apos;re selected, you&apos;ll <span className="text-white">BOTH</span> win the grand prize.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            Tell us about someone who deserves this transformation. You&apos;ll confirm on the form that they can be
            contacted by the gym to verify their phone number.
          </p>
          <p className="mt-6 text-sm text-white/45">
            Entering solo instead?{" "}
            <Link href="/5kgiveaway" className="font-medium text-[#FF7A5A] hover:text-white hover:underline">
              Use the main $5K giveaway form
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="nominate" className="border-t border-white/10 bg-[#14141c] px-4 py-10 md:py-14">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6 flex flex-col items-center gap-2 text-center md:flex-row md:justify-center md:gap-3">
            <Trophy className="h-7 w-7 text-amber-400" aria-hidden />
            <h2 className="text-2xl font-black md:text-3xl">Submit your nomination</h2>
          </div>
          <p className="mb-8 text-center text-sm text-white/55">
            Their first name, last name, phone, your reason for nominating them, your name, and confirmation that
            they may be contacted.
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-xl">
            <iframe
              src={GOOGLE_FORM_EMBED_SRC}
              title="Studio E $5K giveaway — nominate someone to win together"
              className="h-[min(2200px,92vh)] w-full min-h-[1500px] bg-white"
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
