import type { Metadata } from "next"
import ChoreoGoogleAds from "@/components/analytics/ChoreoGoogleAds"
import QuinceClient from "./QuinceClient"

export const metadata: Metadata = {
  title: "Quinceañera Dance Choreography | Studio E Chicago",
  description:
    "Custom quinceañera vals, court choreography, surprise dances, and father-daughter moments at Studio E in Humboldt Park, Chicago. English & Español.",
  openGraph: {
    title: "Quinceañera Dance Choreography | Studio E",
    description:
      "Make her quince unforgettable with custom choreography from Studio E Chicago.",
    url: "https://www.joinstudioe.com/quince",
    type: "website",
  },
}

export default function QuincePage() {
  return (
    <>
      <ChoreoGoogleAds />
      <QuinceClient />
    </>
  )
}
