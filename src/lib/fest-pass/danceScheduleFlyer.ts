import type { FestDay } from "@/lib/fest-pass/constants"

export const DANCE_EVENING_SLOTS = ["6:30 - 7:20pm", "7:30 - 8:20pm", "8:30 - 9:20pm"] as const

export type DanceStudioSchedule = {
  studioLabel: string
  /** grid[timeSlotIndex][dayIndex]; Friday happy hour only in row 0 */
  grid: string[][]
  fridaySpanLabel: string
}

export const DANCE_STUDIO_SCHEDULES: DanceStudioSchedule[] = [
  {
    studioLabel: "Studio 1 • 2657 W Division St",
    fridaySpanLabel: "HAPPY HOUR SOCIAL",
    grid: [
      ["PRIVATES", "SALSA FUNDAMENTALS", "SALSA LEVEL 2", "NY STYLE SALSA FUNDAMENTALS"],
      ["SALSA FUNDAMENTALS", "BACHATA FUNDAMENTALS", "SALSA LEVEL 3", "NY STYLE SALSA LEVEL 2"],
      ["SALSA LEVEL 2", "BACHATA LEVEL 2", "BACHATA LEVEL 3", "MASCULINE STYLING"],
    ],
  },
  {
    studioLabel: "Studio 2 • 2659 W Division St",
    fridaySpanLabel: "HAPPY HOUR SOCIAL",
    grid: [
      ["CUMBIA FOUNDATIONS", "SALSA LEVEL 2", "RHYTHM & SWEAT", "SALSA FUNDAMENTALS"],
      ["CUMBIA LEVEL 2", "PRIVATES", "PRIVATES", "BACHATA FOOTWORK"],
      ["PRIVATES", "PRIVATES", "PRIVATES", "FEMININE STYLING"],
    ],
  },
]

export const DANCE_WEEKDAYS: FestDay[] = ["M", "T", "W", "Th", "F"]
