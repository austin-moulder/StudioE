import type { Metadata } from "next"
import GoogleTag from "@/components/analytics/GoogleTag"
import { REFERRAL_COPY, REFERRAL_IMAGES } from "@/lib/referrals/config"
import ReferralsClient from "./ReferralsClient"

const OG_DESCRIPTION =
  "Invite a friend to Studio E. When they become a qualified paid member, you earn Studio E credit and they get $25 off their first paid membership payment."

export const metadata: Metadata = {
  title: REFERRAL_COPY.pageTitle,
  description: OG_DESCRIPTION,
  openGraph: {
    title: REFERRAL_COPY.pageTitle,
    description: OG_DESCRIPTION,
    url: "https://www.joinstudioe.com/referrals",
    type: "website",
    images: [
      {
        url: REFERRAL_IMAGES.heroCommunity,
        width: 1200,
        height: 630,
        alt: "Studio E community gathered together at the studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: REFERRAL_COPY.pageTitle,
    description: OG_DESCRIPTION,
    images: [REFERRAL_IMAGES.heroCommunity],
  },
}

export default function ReferralsPage() {
  return (
    <>
      <GoogleTag />
      <ReferralsClient />
    </>
  )
}
