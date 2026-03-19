import Link from "next/link"
import { Gift } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mambo Revival Giveaway | Studio E",
  description:
    "Mambo Revival attendees can enter to win 1 month of unlimited classes in April at Studio E plus a 1-hour private tune-up.",
}

const GIVEAWAY_FORM_URL = "https://forms.gle/TpyjSpdPDEqzt7Bk8"
const MAILTO_CHALLENGE =
  "mailto:studioelatindance@gmail.com?subject=Tell%20me%20about%20the%2028-Day%20Latin%20Confidence%20Challenge&body=Hi%2C%0A%0AI'd%20like%20to%20hear%20more%20about%20the%2028-day%20Latin%20Confidence%20Challenge.%0A%0AMy%20phone%20number%20is%3A%20"

export default function GiveawayPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header / Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A5A]/95 via-[#FF3366]/95 to-[#9933CC]/95 z-0" />
        <div className="container relative z-10 px-4 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-8"
          >
            ← Back to Studio E
          </Link>
          <div className="max-w-3xl">
            <p className="text-white/90 text-sm font-semibold uppercase tracking-wider mb-2">
              Studio E Giveaway
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Mambo Revival Giveaway
            </h1>
            <p className="text-xl text-white/95 font-light">
              For Mambo Revival attendees on Sunday, March 22.
            </p>
            <p className="text-lg text-white/80 font-light mt-1">
              One winner gets 1 month of unlimited classes at Studio E in April + a 1-hour private tune-up.
            </p>
          </div>
        </div>
      </section>

      {/* Giveaway details + Form */}
      <section className="flex-1 py-10 md:py-14">
        <div className="container px-4 max-w-3xl mx-auto">
          <div className="flex items-start gap-3 p-4 mb-8 rounded-xl bg-gray-50 border border-gray-100">
            <Gift className="h-6 w-6 text-[#FF3366] flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-gray-900 mb-1">One prize package</h2>
              <p className="text-gray-700 text-sm mb-2">
                One winner receives both:
              </p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>· 1 month of unlimited classes at Studio E for April (2657 W Division St)</li>
                <li>· 1-hour private tune-up session</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-600 mb-6">
            Enter your information below so we can send you the tickets and class details if you win.
          </p>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white">
            <iframe
              src={GIVEAWAY_FORM_URL}
              title="Mambo Revival Giveaway: Unlimited Classes and a Free Private"
              className="w-full"
              style={{ minHeight: "800px" }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Bottom CTA: 28-day Challenge */}
      <section className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] text-white py-12 md:py-16">
        <div className="container px-4 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Want to get results faster?
          </h2>
          <p className="text-lg text-white/95 mb-6">
            Our 28-Day Latin Confidence Challenge is the only program in Chicago that guarantees results—or your money back.
          </p>
          <a
            href={MAILTO_CHALLENGE}
            className="inline-block w-full md:w-auto font-bold bg-white text-gray-900 py-4 px-8 rounded-full shadow-lg hover:opacity-95 transition-opacity text-center"
          >
            Tell me about the Challenge
          </a>
        </div>
      </section>
    </div>
  )
}
