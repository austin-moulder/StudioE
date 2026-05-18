import type { Class } from "@/lib/supabase/classesUtils"
import type { ScheduleSlot, WeeklyScheduleRow } from "@/lib/fest-pass/scheduleSnapshot"

export type { ScheduleSlot, WeeklyScheduleRow }

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const FALLBACK_SCHEDULE: WeeklyScheduleRow[] = [
  {
    day: "Monday",
    slots: [
      { time: "6:00 PM", label: "Latin-Inspired Strength" },
      { time: "7:15 PM", label: "Conditioning & Core" },
    ],
  },
  {
    day: "Tuesday",
    slots: [
      { time: "6:30 PM", label: "Full-Body Fitness" },
      { time: "7:30 PM", label: "Latin Cardio" },
    ],
  },
  {
    day: "Wednesday",
    slots: [
      { time: "6:00 PM", label: "Strength & Mobility" },
      { time: "7:15 PM", label: "HIIT Fitness" },
    ],
  },
  {
    day: "Thursday",
    slots: [
      { time: "6:30 PM", label: "Latin-Inspired Fitness" },
      { time: "7:45 PM", label: "Conditioning" },
    ],
  },
  {
    day: "Friday",
    slots: [{ time: "6:00 PM", label: "Friday Fitness Burn" }],
  },
  {
    day: "Saturday",
    slots: [
      { time: "9:00 AM", label: "Saturday Morning Strength" },
      { time: "10:30 AM", label: "Weekend Fitness Bootcamp" },
    ],
  },
]

function formatTime12h(time24: string): string {
  const [h, m] = time24.split(":").map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return time24
  const period = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 || 12
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`
}

function isStudioEFitnessClass(item: Class): boolean {
  const company = item.company?.name?.toLowerCase() ?? ""
  const location = item.location?.toLowerCase() ?? ""
  const address = item.company?.address?.toLowerCase() ?? ""
  return (
    company.includes("fitness") ||
    company.includes("studio e") ||
    location.includes("2659") ||
    location.includes("2657") ||
    location.includes("division") ||
    address.includes("2659") ||
    address.includes("division")
  )
}

function isFitnessClass(name: string): boolean {
  const n = name.toLowerCase()
  if (n.includes("salsa") || n.includes("bachata") || n.includes("cumbia")) {
    return n.includes("fitness") || n.includes("train to dance")
  }
  return (
    n.includes("fitness") ||
    n.includes("strength") ||
    n.includes("conditioning") ||
    n.includes("cardio") ||
    n.includes("bootcamp") ||
    n.includes("hiit") ||
    n.includes("zumba") ||
    n.includes("training") ||
    n.includes("workout")
  )
}

function isFitnessTimeSlot(item: Class): boolean {
  const day = item.day_of_week?.toLowerCase() ?? ""
  const [hours] = item.start_time.split(":").map(Number)
  if (Number.isNaN(hours)) return false
  if (day === "saturday" || day === "sunday") return hours >= 8 && hours <= 12
  return hours >= 18 && hours <= 21
}

export function buildFitnessWeeklyScheduleSnapshot(classes: Class[]): WeeklyScheduleRow[] {
  const relevant = classes.filter(
    (c) =>
      c.is_active !== false &&
      isStudioEFitnessClass(c) &&
      isFitnessClass(c.class_name) &&
      isFitnessTimeSlot(c)
  )

  if (relevant.length === 0) return FALLBACK_SCHEDULE

  const byDay = new Map<string, Map<string, string>>()

  for (const item of relevant) {
    const day = item.day_of_week || "Other"
    if (!DAY_ORDER.includes(day)) continue

    const timeLabel = formatTime12h(item.start_time)
    const key = `${timeLabel}-${item.class_name}`

    if (!byDay.has(day)) byDay.set(day, new Map())
    byDay.get(day)!.set(key, `${timeLabel}|${item.class_name}`)
  }

  const rows: WeeklyScheduleRow[] = []

  for (const day of DAY_ORDER) {
    const slotsMap = byDay.get(day)
    if (!slotsMap || slotsMap.size === 0) continue

    const slots = Array.from(slotsMap.values())
      .map((v) => {
        const [time, label] = v.split("|")
        return { time, label }
      })
      .sort((a, b) => {
        const parse = (t: string) => {
          const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
          if (!match) return 0
          let h = parseInt(match[1], 10)
          const m = parseInt(match[2], 10)
          const pm = match[3].toUpperCase() === "PM"
          if (pm && h !== 12) h += 12
          if (!pm && h === 12) h = 0
          return h * 60 + m
        }
        return parse(a.time) - parse(b.time)
      })
      .slice(0, 4)

    if (slots.length > 0) rows.push({ day, slots })
  }

  if (rows.length < 3) return FALLBACK_SCHEDULE

  return rows
}
