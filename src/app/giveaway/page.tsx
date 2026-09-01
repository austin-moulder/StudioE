import type { Metadata } from "next"
import GoogleTag from "@/components/analytics/GoogleTag"
import GiveawayClient from "./GiveawayClient"

export const metadata: Metadata = {
  title: "Year of Dance Giveaway | Studio E Chicago",
  description:
    "Enter to win 12 months of unlimited classes at Studio E in Humboldt Park. Chicago residents—enter before September 11.",
  openGraph: {
    title: "Year of Dance Giveaway | Studio E",
    description:
      "Win a full year of unlimited Latin dance classes at Studio E, 2657 W Division St, Humboldt Park.",
    url: "https://www.joinstudioe.com/giveaway",
    type: "website",
  },
}

export default function GiveawayPage() {
  return (
    <>
      <GoogleTag />
      <GiveawayClient />
    </>
  )
}
