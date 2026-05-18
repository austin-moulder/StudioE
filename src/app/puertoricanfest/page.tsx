import type { Metadata } from "next"
import PuertoRicanFestContent from "./PuertoRicanFestContent"

export const metadata: Metadata = {
  title: "Puerto Rican Fest Dance Pass | Studio E Chicago",
  description:
    "30 days of unlimited beginner-friendly salsa, bachata & cumbia for $49. Evening & weekend classes in Humboldt Park. No partner needed.",
}

export default function PuertoRicanFestPage() {
  return <PuertoRicanFestContent />
}
