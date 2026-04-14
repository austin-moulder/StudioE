"use client"

import { Ticket } from "lucide-react"
import { useEffect, useState } from "react"
import { isAprilMayFreeSocial } from "./socialAprilMayFree"

const SQUARE_PASS_URL = "https://square.link/u/yqUnN9HB"

type OfferMode = "loading" | "free" | "pass"

export default function SocialHeroOfferCard() {
  const [mode, setMode] = useState<OfferMode>("loading")

  useEffect(() => {
    setMode(isAprilMayFreeSocial() ? "free" : "pass")
  }, [])

  if (mode === "loading") {
    return (
      <div
        className="min-h-[160px] rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm animate-pulse"
        aria-hidden
      />
    )
  }

  const freeSeason = mode === "free"

  if (!freeSeason) {
    return (
      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
        <div className="mb-2 flex items-center gap-2 text-white/80">
          <Ticket className="h-4 w-4" />
          <span className="text-sm font-semibold">The offer</span>
        </div>
        <div className="space-y-3 text-sm leading-snug text-white/90">
          <p className="font-semibold text-white">
            Buy 1 drop-in, get access to 4 socials FREE that month.
          </p>
          <p className="text-white/85">
            Your free social window starts the day you purchase—not a calendar month.
          </p>
          <p className="text-white/85">
            Arriving after 7:30 pm? You&apos;ll need a dancer pass to enter unless you&apos;re already a member.
          </p>
          <a
            id="buy-pass"
            href={SQUARE_PASS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-white bg-white/15 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition-colors hover:bg-white/25 sm:w-auto"
          >
            Buy pass ahead
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
      <div className="mb-2 flex items-center gap-2 text-white/80">
        <Ticket className="h-4 w-4" />
        <span className="text-sm font-semibold">April &amp; May</span>
      </div>
      <div className="space-y-3 text-sm leading-snug text-white/90">
        <p className="font-semibold text-white">
          <span className="text-[#FF7A5A]">FREE</span> Happy Hour &amp; Social entry through May.
        </p>
        <p className="text-white/85">
          No drop-in bundle or dancer pass this spring—just RSVP and come dance. Social-dancer pass details and
          buy-ahead return <span className="font-semibold text-white">June 1</span>.
        </p>
      </div>
    </div>
  )
}
