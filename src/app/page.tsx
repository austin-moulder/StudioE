import type { Metadata } from "next"
import StudioEHomePage from "@/components/home/StudioEHomePage"
import { getGoogleFiveStarReviews } from "@/lib/google-reviews/fetch"
import { MERCH_IMAGES } from "@/lib/merch/shopify"

export const metadata: Metadata = {
  title: "Studio E | Latin Social Dance Community in Chicago",
  description:
    "Studio E is a Latin social dance community in Chicago helping people build confidence, find belonging, and express themselves through street-style Salsa, Bachata, and Latin social dance. Claim your first class free.",
  openGraph: {
    title: "Studio E | Latin Social Dance Community in Chicago",
    description:
      "Find your confidence through Latin social dance. The quickest and easiest way to learn to social dance in Chicago.",
    url: "https://www.joinstudioe.com",
    type: "website",
    images: [
      {
        url: MERCH_IMAGES.hero,
        width: 1600,
        height: 2000,
        alt: "Studio E Latin social dance community",
      },
    ],
  },
}

export default async function Home() {
  const googleReviews = await getGoogleFiveStarReviews()
  return <StudioEHomePage googleReviews={googleReviews} />
}
