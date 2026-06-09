import type { FestDay } from "@/lib/fest-pass/constants"

export const DANCE_EVENING_SLOTS = ["6:30 - 7:20pm", "7:30 - 8:20pm", "8:30 - 9:20pm"] as const

export type DanceStudioSchedule = {
  studioLabel: string
  /** grid[timeSlotIndex][dayIndex] Mon–Thu */
  grid: string[][]
  /** Same shape as grid — true = beginner-friendly (bold on flyer) */
  beginnerGrid: boolean[][]
  fridaySpanLabel: string
  /** Friday happy hour starts on this row index (0 = 6:30 slot) */
  fridaySpanStartRow: number
  fridaySpanRowCount: number
}

export const DANCE_STUDIO_SCHEDULES: DanceStudioSchedule[] = [
  {
    studioLabel: "Studio 1 • 2657 W Division St",
    fridaySpanLabel: "HAPPY HOUR SOCIAL",
    fridaySpanStartRow: 1,
    fridaySpanRowCount: 2,
    grid: [
      ["CUMBIA FUNDAMENTALS", "SALSA FUNDAMENTALS", "SALSA LEVEL 3", "NY STYLE SALSA FUNDAMENTALS"],
      ["SALSA FUNDAMENTALS", "BACHATA FUNDAMENTALS", "BACHATA LEVEL 3", "NY STYLE SALSA OPEN LEVEL"],
      ["BACHATA FUNDAMENTALS", "PRIVATES", "PRIVATES", "PRIVATES"],
    ],
    beginnerGrid: [
      [true, true, false, true],
      [true, true, false, false],
      [true, false, false, false],
    ],
  },
  {
    studioLabel: "Studio 2 • 2659 W Division St",
    fridaySpanLabel: "HAPPY HOUR SOCIAL",
    fridaySpanStartRow: 1,
    fridaySpanRowCount: 2,
    grid: [
      ["CUMBIA LEVEL 2", "SALSA LEVEL 2", "RHYTHM & SWEAT", "SALSA FUNDAMENTALS"],
      ["SALSA LEVEL 2", "BACHATA LEVEL 2", "PRIVATES", "BACHATA FOOTWORK"],
      ["BACHATA LEVEL 2", "PRIVATES", "PRIVATES", "FEMININE STYLING"],
    ],
    beginnerGrid: [
      [false, false, true, true],
      [false, false, false, true],
      [false, false, false, false],
    ],
  },
]

export const DANCE_WEEKDAYS: FestDay[] = ["M", "T", "W", "Th", "F"]
