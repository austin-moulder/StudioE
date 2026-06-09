import type { FestDay } from "@/lib/fest-pass/constants"

export const FITNESS_MORNING_SLOTS = ["7:00 - 7:50am", "8:00 - 8:50am", "9:00 - 11:00am"] as const

export const FITNESS_WEEKDAYS: FestDay[] = ["M", "T", "W", "Th", "F"]

/** grid[timeSlotIndex][dayIndex] Mon–Fri */
export const FITNESS_SCHEDULE_GRID: string[][] = [
  ["CALORIE BURN INTENSIVE", "SAZON & SHRED", "GUIDED / OPEN TRAINING", "1:1 TRAINING", "GUIDED / OPEN TRAINING"],
  ["BODY SCULPT", "MINDFUL MOVEMENT", "REPS & REGGAETON", "1:1 TRAINING", "BICHOTA SZN"],
  ["1:1 TRAINING", "1:1 TRAINING", "1:1 TRAINING", "1:1 TRAINING", "1:1 TRAINING"],
]
