import Link from "next/link"
import { CheckCircle2, Instagram, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ticket Confirmed | Studio E",
  description:
    "Your Studio E ticket purchase is confirmed. We look forward to seeing you at the studio.",
}

const INSTAGRAM_URL = "https://www.instagram.com/the_studio_e/"

const MAILTO_CHALLENGE =
  "mailto:studioelatindance@gmail.com?subject=Tell%20me%20about%20the%2028-Day%20Latin%20Confidence%20Challenge&body=Hi%2C%0A%0AI'd%20like%20to%20hear%20more%20about%20the%2028-day%20Latin%20Confidence%20Challenge.%0A%0AMy%20phone%20number%20is%3A%20"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/95 via-[#FF3366]/95 to-[#9933CC]/95 z-0" />
        <div className="container relative z-10 px-4 py-12 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-8"
          >
            ← Back to Studio E
          </Link>
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm border border-white/20">
              <CheckCircle2 className="h-5 w-5" aria-hidden />
              Payment received
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Your ticket is confirmed
            </h1>
            <p className="text-xl text-white/95 font-light leading-relaxed">
              Thank you for your purchase. We have your spot saved and we cannot wait to welcome you to Studio E.
            </p>
            <p className="mt-4 text-lg text-white/85 font-light leading-relaxed">
              You will receive a confirmation email from Square with your receipt. If you have any questions before the event, reply to that email or reach us at{" "}
              <a
                href="mailto:studioelatindance@gmail.com"
                className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
              >
                studioelatindance@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="flex-1 py-10 md:py-14">
        <div className="container px-4 max-w-2xl mx-auto">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-10">
            <Sparkles className="h-7 w-7 text-[#9933CC] flex-shrink-0 mt-0.5" aria-hidden />
            <div>
              <h2 className="font-bold text-gray-900 text-lg mb-2">While you&apos;re here</h2>
              <p className="text-gray-700 leading-relaxed">
                Follow us for class clips, event photos, and community vibes—or ask about our{" "}
                <span className="font-semibold text-gray-900">28-Day Latin Dance Confidence Challenge</span>{" "}
                if you want a structured path from nervous beginner to confident social dancer.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:border-[#FF3366]/40 hover:shadow-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF3366] to-[#9933CC] text-white shadow-md">
                <Instagram className="h-7 w-7" aria-hidden />
              </span>
              <span className="font-bold text-gray-900 group-hover:text-[#FF3366] transition-colors">
                Follow @the_studio_e
              </span>
              <span className="text-sm text-gray-600">See what&apos;s happening at the studio</span>
            </a>

            <a
              href={MAILTO_CHALLENGE}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:border-[#9933CC]/40 hover:shadow-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#9933CC] to-[#FF3366] text-white shadow-md">
                <Sparkles className="h-7 w-7" aria-hidden />
              </span>
              <span className="font-bold text-gray-900 group-hover:text-[#9933CC] transition-colors">
                Ask about the 28-day challenge
              </span>
              <span className="text-sm text-gray-600">We&apos;ll reply with details and next steps</span>
            </a>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link href="/classes" className="font-medium text-[#FF3366] hover:underline">
              Browse classes
            </Link>
            {" · "}
            <Link href="/events" className="font-medium text-[#FF3366] hover:underline">
              Upcoming events
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
