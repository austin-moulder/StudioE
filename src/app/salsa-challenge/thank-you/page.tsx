import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Watch Your Free Salsa Basics Video | Studio E",
  description:
    "Watch the free salsa basics video, then claim your free first beginner salsa class in Chicago with Studio E.",
}

const VIDEOS = {
  leads: {
    id: "o0J-8q-X9N0",
    label: "Leads",
    caption:
      "In this video you'll lock in the basic step, right turn, and left turn so you can stop overthinking and start enjoying the music.",
  },
  follows: {
    id: "HXtTg_XKWIk",
    label: "Follows",
    caption:
      "In this video you'll lock in the basic step, right turn, and left turn so you can stop overthinking and start enjoying the music.",
  },
} as const

type ThankYouPageProps = {
  searchParams?: { audience?: string }
}

export default function SalsaChallengeThankYouPage({ searchParams }: ThankYouPageProps) {
  const audience = searchParams?.audience === "follows" ? "follows" : "leads"
  const video = VIDEOS[audience]

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-900 px-4 py-12 text-white md:py-16">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            You&apos;re In. Watch This, Then Claim Your Free First Class.
          </h1>
          <p className="mt-5 text-lg text-white/85 md:text-xl">
            Start with the basics here, then I&apos;ll help you use them on a real dance floor in Chicago.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#FF3366]">
            For {video.label}
          </p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-lg">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={`Salsa basics video for ${video.label.toLowerCase()}`}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600 md:text-base">{video.caption}</p>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 px-4 py-14 md:py-16">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Ready To Try This In Person?</h2>
          <p className="mt-5 text-base leading-relaxed text-gray-700 md:text-lg">
            Once you&apos;ve watched the video (or if you&apos;re already excited), grab a free first beginner salsa
            class with me in Chicago. I&apos;ll walk you through the same basics with live feedback so you feel
            confident at your next social.
          </p>
          <Link
            href="/founder-deal"
            className="mt-8 inline-flex w-full max-w-md items-center justify-center rounded-full bg-[#FF3366] px-8 py-4 text-base font-black uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 md:text-lg"
          >
            Claim Your Free First Class
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            No partner needed. No experience required. Just bring comfortable shoes and be ready to move.
          </p>
        </div>
      </section>
    </div>
  )
}
