import type { Metadata } from "next"
import ComparePlansClient from "./ComparePlansClient"

export const metadata: Metadata = {
  title: "Compare Chicago Latin Dance Studios | Studio E",
  description:
    "See how Studio E compares to Latin Rhythms, Latin Street, and Mayambo on pricing, structure, socials, privates, teaching style, and more in Chicago.",
  openGraph: {
    title: "Compare Chicago Latin Dance Plans | Studio E",
    description:
      "A clear side-by-side look at Chicago Latin dance studios—and why Studio E stands apart.",
    url: "https://www.joinstudioe.com/compareplans",
    type: "website",
  },
}

export default function ComparePlansPage() {
  return <ComparePlansClient />
}
