import type { Metadata } from "next"
import GoogleTag from "@/components/analytics/GoogleTag"
import MerchClient from "./MerchClient"

export const metadata: Metadata = {
  title: "Studio E Founders Drop | Grand Opening Merch",
  description:
    "Shop the Studio E Founders Drop and claim the FOUNDER offer on The Classic line.",
  openGraph: {
    title: "Studio E Founders Drop | Grand Opening Merch",
    description:
      "Shop the Studio E Founders Drop and claim the FOUNDER offer on The Classic line.",
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
