import type { Metadata } from "next"
import { CHALLENGE_IMAGES, COPY } from "@/lib/challenge/config"
import ChallengeClient from "./ChallengeClient"

const OG_DESCRIPTION =
  "Studio E 28-day challenges: 4 privates plus unlimited group classes in salsa, bachata, cumbia, and more. Lock in $399 before your first class."

export const metadata: Metadata = {
  title: COPY.pageTitle,
  description: OG_DESCRIPTION,
  openGraph: {
    title: COPY.pageTitle,
    description: OG_DESCRIPTION,
    url: "https://www.joinstudioe.com/challenge",
    type: "website",
    images: [
      {
        url: CHALLENGE_IMAGES.hero,
        width: 1200,
        height: 630,
        alt: "Studio E 28-day dance challenge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: COPY.pageTitle,
    description: OG_DESCRIPTION,
    images: [CHALLENGE_IMAGES.hero],
  },
}

export default function ChallengePage() {
  return <ChallengeClient />
}
