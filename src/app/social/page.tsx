import type { Metadata } from "next"
import GoogleTag from "@/components/analytics/GoogleTag"
import SocialGoogleAds from "@/components/analytics/SocialGoogleAds"
import { ASSETS } from "@/lib/social/config"
import SocialClient from "./SocialClient"

export const metadata: Metadata = {
  title: "Latin Dance Happy Hour in Humboldt Park | Studio E",
  description:
    "Free beginner Latin dance intro lesson every Friday at Studio E in Humboldt Park, then social dancing until 10 PM. No partner needed. RSVP in under a minute.",
  openGraph: {
    title: "Latin Dance Happy Hour in Humboldt Park | Studio E",
    description:
      "Free intro lesson 7–8 PM, social dancing 7:30–10 PM every Friday at Studio E. No partner needed.",
    url: "https://www.joinstudioe.com/social",
    type: "website",
    images: [
      {
        url: ASSETS.hero,
        width: 1200,
        height: 800,
        alt: "Studio E Friday social dancers in Humboldt Park",
      },
    ],
  },
}

/** Next-Friday theme resolves from request time. */
export const dynamic = "force-dynamic"

export default function SocialPage() {
  return (
    <>
      <GoogleTag />
      <SocialGoogleAds />
      <SocialClient />
      <p className="sr-only">
        Studio E Friday Latin dance happy hour at 2657 W Division St, Chicago. Free intro lesson
        7:00–8:00 PM with RSVP. Social dancing 7:30–10:00 PM. No partner needed. Beginner-friendly.
        All ages welcome.
      </p>
    </>
  )
}
