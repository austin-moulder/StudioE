"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Sparkles, Users, Zap } from "lucide-react"

const CHECKOUT_URL = "https://link.fastpaydirect.com/payment-link/6a8dba67d6768df054447de5"
const OFFER_SECONDS = 5 * 60

export default function NewMemberDealClient() {
  const [timeLeft, setTimeLeft] = useState(OFFER_SECONDS)

  useEffect(() => {
    if (timeLeft <= 0) return

    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(countdown)
  }, [timeLeft])

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
  const seconds = String(timeLeft % 60).padStart(2, "0")
  const offerExpired = timeLeft <= 0

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" aria-hidden />
          </div>
          <h1 className="mb-4 text-3xl font-black leading-tight text-gray-900 md:text-5xl">
            Thank you for becoming a member
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-700">
            Your purchase is confirmed. Welcome to Studio E—we&apos;re excited to dance with you.
          </p>
        </div>

        <div className="mb-10 text-center">
          <p className="text-2xl font-black text-gray-900 md:text-3xl">
            How badly do you want to learn{" "}
            <span className="text-[#FF3366]">FAST</span>?
          </p>
        </div>

        <Card className="mb-10 overflow-hidden border-2 border-red-500 shadow-xl">
          <div className="bg-gradient-to-r from-red-600 via-[#FF3366] to-[#FF7A5A] px-6 py-5 text-center text-white">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold">
              <Sparkles className="h-4 w-4" aria-hidden />
              New members only
            </div>
            <h2 className="text-2xl font-black md:text-3xl">BOGO Private Lesson</h2>
            <div className="mt-3 flex items-baseline justify-center gap-3">
              <span className="text-2xl text-white/70 line-through">$300</span>
              <span className="text-5xl font-black">$150</span>
            </div>
            <p className="mt-2 text-white/90">Buy one private, get one free</p>
          </div>

          <CardContent className="p-6 md:p-8">
            <div className="mb-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-5 text-center">
              <div className="flex items-center gap-2 text-red-600">
                <Clock className="h-5 w-5" aria-hidden />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {offerExpired ? "Offer expired" : "This offer expires in"}
                </span>
              </div>
              <span
                className={`text-4xl font-black tabular-nums md:text-5xl ${
                  offerExpired ? "text-gray-400" : "text-red-600"
                }`}
              >
                {minutes}:{seconds}
              </span>
            </div>

            {!offerExpired ? (
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:opacity-95"
              >
                Claim My BOGO Private — $150
              </a>
            ) : (
              <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center text-gray-600">
                This new-member offer has expired. Reach out to the Studio E team if you still want help getting started.
              </div>
            )}

            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Most people use it in 1 of 2 ways:
            </h3>
            <ol className="mb-8 space-y-4">
              <li className="flex gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366] text-sm font-bold text-white">
                  1
                </span>
                <p className="pt-1 text-gray-700">
                  <span className="font-semibold text-gray-900">2 privates to kick off your journey</span>
                  {" "}so you&apos;re prepared for your first class.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF3366] text-sm font-bold text-white">
                  2
                </span>
                <p className="pt-1 text-gray-700">
                  <span className="font-semibold text-gray-900">1 private at the beginning</span>
                  {" "}to get a jumpstart, and{" "}
                  <span className="font-semibold text-gray-900">1 private in the last week of your 4-week cycle</span>
                  {" "}to clean things up and prepare for the next strong month.
                </p>
              </li>
            </ol>

            <div className="space-y-4 rounded-2xl bg-gray-50 p-5">
              <div className="flex gap-3">
                <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FF3366]" aria-hidden />
                <p className="text-gray-700">
                  We find that people who mix group classes and privates grow{" "}
                  <span className="font-bold text-gray-900">5x as fast</span> as people who do group
                  classes alone—and it&apos;s even faster when they do privates with a partner.
                </p>
              </div>
              <div className="flex gap-3">
                <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9933CC]" aria-hidden />
                <p className="text-gray-700">
                  Best news:{" "}
                  <span className="font-bold text-gray-900">
                    it doesn&apos;t cost more to bring a partner into the private with you
                  </span>
                  —unlike other studios.
                </p>
              </div>
            </div>

            {!offerExpired && (
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF3366] to-[#FF7A5A] px-6 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:opacity-95"
              >
                Lock In BOGO Before Time Runs Out
              </a>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          Questions?{" "}
          <a
            href="mailto:studioelatindance@gmail.com"
            className="font-medium text-[#FF3366] hover:underline"
          >
            Email the Studio E team
          </a>
        </p>
      </div>
    </div>
  )
}
