import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

const HERO_IMAGE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05366.jpg"

const CTA_BUTTON_CLASS =
  "inline-flex w-full items-center justify-center rounded-full bg-[#FF3366] px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 md:text-lg"

const HERO_BULLETS = [
  "Lock in your timing so you don't feel off-beat",
  "Nail the basic, right turn, and left turn without overthinking",
  "Know exactly what to practice before your next social",
] as const

const WHO_THIS_IS_FOR = [
  "You're brand new to salsa and don't want to feel stupid on the dance floor.",
  "You've taken a class before but still feel awkward or off-beat.",
  "You're part of Chicago's Puerto Rican / Latin community and want to actually show up to socials instead of \"maybe next weekend.\"",
] as const

const HOW_IT_WORKS = [
  "Tap the button to get instant access to the video.",
  "Practice the basic, right turn, and left turn with clear counts and timing.",
  "Claim your free first salsa class in Chicago and try it with real music and real people.",
] as const

const VIDEO_LEARNINGS = [
  "The exact salsa timing and where the pause is so you stop guessing.",
  "How to do the basic, right turn, and left turn in a way that feels natural.",
  "Common beginner mistakes that make you look stiff (and how to fix them).",
  "A short practice drill you can repeat daily in under 10 minutes.",
] as const

export default function SalsaChallengeContent() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden text-white">
        <Image
          src={HERO_IMAGE}
          alt="Salsa dancers at Studio E in Chicago"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/40 via-black/50 to-black/70" />

        <div className="container relative z-10 px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/75">Studio E · Chicago</p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              Master Salsa Basics in 20 Minutes So You Don&apos;t Feel Lost at Chicago Socials
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/90 md:text-xl">
              Free video covering the basic step, right turn, and left turn, taught slow and clear so you can actually
              use it on the dance floor.
            </p>
            <ul className="mt-6 space-y-2.5 text-base text-white/90 md:text-lg">
              {HERO_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#FF7A5A]" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link href="/salsa-challenge/thank-you" className={CTA_BUTTON_CLASS}>
                Get The Free Basics Video
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                You&apos;ll also get an invite to a free first salsa class in Chicago so you can try this in a real
                social vibe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-black text-gray-900 md:text-3xl">This Is For You If…</h2>
            <ul className="mt-8 space-y-4">
              {WHO_THIS_IS_FOR.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-gray-700 md:text-lg">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-black text-gray-900 md:text-3xl">How It Works</h2>
            <ol className="mt-8 space-y-6">
              {HOW_IT_WORKS.map((item, index) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF3366] text-lg font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1.5 text-base text-gray-700 md:text-lg">{item}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-lg font-semibold text-gray-900">
              The video is free. The class invite is free. You just have to show up.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl font-black text-gray-900 md:text-3xl">What You&apos;ll Learn In The Video</h2>
            <ul className="mt-8 space-y-4">
              {VIDEO_LEARNINGS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-gray-700 md:text-lg">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/salsa-challenge/thank-you" className={`mt-10 ${CTA_BUTTON_CLASS}`}>
              Get The Free Basics Video
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-900 py-10 text-center text-sm text-white/70">
        <div className="container px-4">
          <Link href="/" className="font-medium text-white/90 underline underline-offset-2 hover:text-white">
            Studio E
          </Link>
          <span className="mx-2">·</span>
          <span>Humboldt Park, Chicago</span>
        </div>
      </section>
    </div>
  )
}
