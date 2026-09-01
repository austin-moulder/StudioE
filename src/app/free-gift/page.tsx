import type { Metadata } from "next"
import GoogleTag from "@/components/analytics/GoogleTag"
import FreeGiftClient from "./FreeGiftClient"

export const metadata: Metadata = {
  title: "Free Gift | Chicago Social Dance Starter Guide | Studio E",
  description:
    "Download the Chicago Social Dance Starter Guide, learn your first salsa steps, and claim your first class free at Studio E in Humboldt Park.",
  openGraph: {
    title: "Chicago Social Dance Starter Guide | Studio E",
    description:
      "Your free guide to exploring Chicago's social dance scene—plus a path to your first class on us.",
    url: "https://www.joinstudioe.com/free-gift",
    type: "website",
  },
}

export default function FreeGiftPage() {
  return (
    <>
      <GoogleTag />
      <FreeGiftClient />
    </>
  )
}
