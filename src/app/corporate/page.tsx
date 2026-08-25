import type { Metadata } from "next"
import CorporateClient from "./CorporateClient"

export const metadata: Metadata = {
  title: "Studio E for Businesses | Corporate Latin Dance Team Building",
  description:
    "Culturally-grounded Latin social dance experiences that put team building fundamentals first. 60–90 minute sessions for offsites, ERGs, new hire cohorts, and more in Chicago.",
  openGraph: {
    title: "Studio E for Businesses | Culture & Confidence Sessions",
    description:
      "Unlock your team’s potential with Latin social dance experiences designed for connection, inclusion, and confidence.",
    url: "https://www.joinstudioe.com/corporate",
    type: "website",
  },
}

export default function CorporatePage() {
  return <CorporateClient />
}
