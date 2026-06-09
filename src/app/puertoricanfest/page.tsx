import type { Metadata } from "next"
import PuertoRicanFestContent from "./PuertoRicanFestContent"

export const metadata: Metadata = {
  title: "Puerto Rican Fest Dance Pass | Studio E Chicago",
  description:
    "Discover your dance confidence for $49. 30 days of unlimited salsa, bachata & cumbia with a welcoming Latino dance community in Humboldt Park.",
}

export default function PuertoRicanFestPage() {
  return <PuertoRicanFestContent />
}
