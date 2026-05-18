import type { Metadata } from "next"
import PuertoRicanFestFitnessContent from "./PuertoRicanFestFitnessContent"

export const metadata: Metadata = {
  title: "Puerto Rican Fest Fitness Pass | Studio E Chicago",
  description:
    "30 days of unlimited Latin-inspired fitness for $49. Morning classes in Humboldt Park. No experience needed.",
}

export default function PuertoRicanFestFitnessPage() {
  return <PuertoRicanFestFitnessContent />
}
