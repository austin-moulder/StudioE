/**
 * Shared upcoming-weekday event scheduling for popup class landings.
 * Uses America/Chicago wall-clock times.
 */

type ZoneParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  weekday: number // 0 Sun … 6 Sat
}

export type EventSchedule = {
  timeZone: string
  /** Weekday: 0 = Sunday … 6 = Saturday */
  weekday: number
  startHour: number
  startMinute: number
}

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

function getZoneParts(date: Date, timeZone: string): ZoneParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  let hour = Number(get("hour"))
  if (hour === 24) hour = 0

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour,
    minute: Number(get("minute")),
    second: Number(get("second")),
    weekday: WEEKDAY_MAP[get("weekday")] ?? 0,
  }
}

export function zonedWallTimeToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): number {
  let utc = Date.UTC(year, month - 1, day, hour, minute, 0)
  for (let i = 0; i < 4; i++) {
    const parts = getZoneParts(new Date(utc), timeZone)
    const asIfUtc = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second
    )
    const desired = Date.UTC(year, month - 1, day, hour, minute, 0)
    utc += desired - asIfUtc
  }
  return utc
}

function addCalendarDays(
  year: number,
  month: number,
  day: number,
  days: number
): { year: number; month: number; day: number } {
  const base = new Date(Date.UTC(year, month - 1, day + days))
  return {
    year: base.getUTCFullYear(),
    month: base.getUTCMonth() + 1,
    day: base.getUTCDate(),
  }
}

/**
 * If now is before that weekday's start time → that occurrence.
 * If now is at/after start → the following week.
 */
export function getUpcomingEventStartMs(
  schedule: EventSchedule,
  now: Date = new Date()
): number {
  const tz = schedule.timeZone
  const parts = getZoneParts(now, tz)
  const daysUntil = (schedule.weekday - parts.weekday + 7) % 7
  const thisOccurrence = addCalendarDays(parts.year, parts.month, parts.day, daysUntil)
  const thisStart = zonedWallTimeToUtcMs(
    thisOccurrence.year,
    thisOccurrence.month,
    thisOccurrence.day,
    schedule.startHour,
    schedule.startMinute,
    tz
  )

  if (now.getTime() < thisStart) {
    return thisStart
  }

  const nextOccurrence = addCalendarDays(
    thisOccurrence.year,
    thisOccurrence.month,
    thisOccurrence.day,
    7
  )
  return zonedWallTimeToUtcMs(
    nextOccurrence.year,
    nextOccurrence.month,
    nextOccurrence.day,
    schedule.startHour,
    schedule.startMinute,
    tz
  )
}

export function formatEventDateLabel(eventStartMs: number, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(eventStartMs))
}

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}

export function getCountdownParts(eventStartMs: number, nowMs: number = Date.now()): CountdownParts {
  const totalMs = Math.max(0, eventStartMs - nowMs)
  const totalSeconds = Math.floor(totalMs / 1000)
  return {
    totalMs,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}
