import { EVENT } from "./config"

type ZoneParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  weekday: number // 0 Sun … 6 Sat
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

/**
 * Convert a wall-clock date/time in `timeZone` to a UTC epoch ms.
 */
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
 * Upcoming Twerk Thursday start (Thursday 8:30 PM America/Chicago).
 * If now is before that Thursday 8:30 PM Chicago → that Thursday.
 * If now is at/after Thursday 8:30 PM Chicago → the following Thursday.
 */
export function getUpcomingEventStartMs(now: Date = new Date()): number {
  const tz = EVENT.timeZone
  const parts = getZoneParts(now, tz)
  const daysUntilThursday = (EVENT.weekday - parts.weekday + 7) % 7
  const thisThu = addCalendarDays(parts.year, parts.month, parts.day, daysUntilThursday)
  const thisThuStart = zonedWallTimeToUtcMs(
    thisThu.year,
    thisThu.month,
    thisThu.day,
    EVENT.startHour,
    EVENT.startMinute,
    tz
  )

  if (now.getTime() < thisThuStart) {
    return thisThuStart
  }

  const nextThu = addCalendarDays(thisThu.year, thisThu.month, thisThu.day, 7)
  return zonedWallTimeToUtcMs(
    nextThu.year,
    nextThu.month,
    nextThu.day,
    EVENT.startHour,
    EVENT.startMinute,
    tz
  )
}

/** Readable date like "Thursday, September 24" in America/Chicago. */
export function formatEventDateLabel(eventStartMs: number): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: EVENT.timeZone,
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
