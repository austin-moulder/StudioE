import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllClasses } from "@/lib/supabase/classesUtils"
import { buildWeeklyScheduleSnapshot } from "@/lib/fest-pass/scheduleSnapshot"
import PuertoRicanFestContent from "./PuertoRicanFestContent"

export const metadata: Metadata = {
  title: "Puerto Rican Fest Dance Pass | Studio E Chicago",
  description:
    "30 days of unlimited beginner-friendly salsa, bachata & cumbia for $49. Evening & weekend classes in Humboldt Park. No partner needed.",
}

export default async function PuertoRicanFestPage() {
  const classes = await getAllClasses()
  const schedule = buildWeeklyScheduleSnapshot(classes)

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
      <PuertoRicanFestContent schedule={schedule} />
    </Suspense>
  )
}
