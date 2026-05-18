import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllClasses } from "@/lib/supabase/classesUtils"
import { buildFitnessWeeklyScheduleSnapshot } from "@/lib/fest-pass/fitnessScheduleSnapshot"
import PuertoRicanFestFitnessContent from "./PuertoRicanFestFitnessContent"

export const metadata: Metadata = {
  title: "Puerto Rican Fest Fitness Pass | Studio E Chicago",
  description:
    "30 days of unlimited Latin-inspired fitness for $49. Weeknight and Saturday morning classes in Humboldt Park. No experience needed.",
}

export default async function PuertoRicanFestFitnessPage() {
  const classes = await getAllClasses()
  const schedule = buildFitnessWeeklyScheduleSnapshot(classes)

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
      <PuertoRicanFestFitnessContent schedule={schedule} />
    </Suspense>
  )
}
