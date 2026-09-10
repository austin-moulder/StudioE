import type { Metadata } from "next"
import ConsolationPassClient from "./ConsolationPassClient"

export const metadata: Metadata = {
  title: "2 Weeks Unlimited Latin Dance for $25 | Studio E Chicago",
  description:
    "You didn’t win the free year—but you can still claim 2 weeks of unlimited eligible Latin dance classes at Studio E for $25. Chicago residents only.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "2 Weeks Unlimited for $25 | Studio E",
    description:
      "Try Chicago’s Latin dance community with 14 days of unlimited eligible classes for $25.",
    url: "https://www.joinstudioe.com/chicago-2-week-unlimited-pass",
    type: "website",
  },
}

export default function ChicagoTwoWeekUnlimitedPassPage() {
  return <ConsolationPassClient />
}
