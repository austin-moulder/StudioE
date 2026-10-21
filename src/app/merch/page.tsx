import type { Metadata } from "next"
import GoogleTag from "@/components/analytics/GoogleTag"
import MerchClient from "./MerchClient"

export const metadata: Metadata = {
  title: "Studio E Merch",
  description:
    "Studio E apparel rooted in culture and made for movement. Members get early access to new drops and special pricing.",
  openGraph: {
    title: "Studio E Merch",
    description:
      "Rooted in culture. Made for movement. Members get early access to new drops and special pricing.",
    url: "https://www.joinstudioe.com/merch",
    type: "website",
  },
}

export default function MerchPage() {
  return (
    <>
      <GoogleTag />
      <MerchClient />
    </>
  )
}
