/**
 * Instagram-bio workshop hub catalog.
 * Prices, times, venues, and paths come from existing popup configs.
 */

import { AFRO_CUBAN_CONFIG } from "@/lib/afro-cuban-movement/config"
import { CHACHA_CONFIG } from "@/lib/chacha/config"
import { CUMBIA_WEPA_CONFIG } from "@/lib/cumbia-wepa/config"
import { MERENGUE_CONFIG } from "@/lib/merengue/config"
import {
  formatEventDateLabel,
  getNextAvailableStartMs,
  type EventSchedule,
} from "@/lib/popup-class/event-time"
import type { PopupClassLandingConfig } from "@/lib/popup-class/types"
import { POSING_CONFIG } from "@/lib/posing/config"
import { SALSA_ON_2_CONFIG } from "@/lib/salsa-on-2/config"
import { TWERK_THURSDAY_CONFIG, TWERK_SOLD_OUT_DATES } from "@/lib/twerk-thursday/config"
import { YOGA_PILATES_CONFIG } from "@/lib/yoga-pilates/config"

export type WorkshopListing = {
  id: string
  title: string
  style: string
  schedule: EventSchedule
  durationLabel: string
  locationLabel: string
  price: number
  description: string
  flyer: string
  flyerAlt: string
  /** Internal landing page — CTA goes here, not checkout. */
  landingPath: string
  capacity?: number
  /** $25 includes one additional friend free (from existing workshop offers). */
  includesFriendFree: boolean
  soldOutDates?: readonly string[]
}

/** Style labels taken from each workshop’s existing name/format. */
const STYLE_BY_ID: Record<string, string> = {
  "twerk-thursday": "Twerk",
  merengue: "Merengue",
  chacha: "Cha-Cha",
  "cumbia-wepa": "Cumbia",
  "afro-cuban-movement": "Afro-Cuban",
  "salsa-on-2": "Salsa On 2",
  posing: "Posing",
  "yoga-pilates": "Yoga + Pilates",
}

const LANDING_PATH_BY_ID: Record<string, string> = {
  "twerk-thursday": "/twerk-thursday",
  merengue: "/merengue",
  chacha: "/chacha",
  "cumbia-wepa": "/cumbia-wepa",
  "afro-cuban-movement": "/afro-cuban-movement",
  "salsa-on-2": "/salsa-on-2",
  posing: "/posing",
  "yoga-pilates": "/yoga-pilates",
}

function toListing(config: PopupClassLandingConfig): WorkshopListing {
  const { event, assets, copy, id, soldOut } = config
  return {
    id,
    title: event.name,
    style: STYLE_BY_ID[id] ?? event.format,
    schedule: {
      weekday: event.weekday,
      startHour: event.startHour,
      startMinute: event.startMinute,
      timeZone: event.timeZone,
      date: event.date,
      additionalSlots: event.additionalSlots,
    },
    durationLabel: event.durationLabel,
    locationLabel: `${event.venueName} · ${event.addressLine}`,
    price: event.price,
    description: copy.heroSubheadline,
    flyer: assets.flyer,
    flyerAlt: copy.flyerAlt || `${event.name} flyer`,
    landingPath: LANDING_PATH_BY_ID[id] ?? `/${id}`,
    capacity: event.capacity,
    // Existing bring-a-friend offer on workshop landings; excluded for Twerk per hub copy.
    includesFriendFree: id !== "twerk-thursday",
    soldOutDates: soldOut?.dates ?? (id === "twerk-thursday" ? TWERK_SOLD_OUT_DATES : undefined),
  }
}

/**
 * Active low-ticket / specialty workshops sourced from live landing configs.
 * Reggaeton is disabled for now. Posing only appears while its fixed date is upcoming.
 */
export const WORKSHOP_LISTINGS: readonly WorkshopListing[] = [
  toListing(CHACHA_CONFIG),
  toListing(SALSA_ON_2_CONFIG),
  toListing(MERENGUE_CONFIG),
  toListing(AFRO_CUBAN_CONFIG),
  toListing(CUMBIA_WEPA_CONFIG),
  toListing(TWERK_THURSDAY_CONFIG),
  toListing(POSING_CONFIG),
  toListing(YOGA_PILATES_CONFIG),
]

export type ResolvedWorkshop = WorkshopListing & {
  startMs: number
  dateLabel: string
}

export function getUpcomingWorkshops(now: Date = new Date()): ResolvedWorkshop[] {
  return WORKSHOP_LISTINGS.map((workshop) => {
    const startMs = getNextAvailableStartMs(workshop.schedule, workshop.soldOutDates, now)
    return {
      ...workshop,
      startMs,
      dateLabel: formatEventDateLabel(startMs, workshop.schedule.timeZone),
    }
  })
    .filter((workshop) => workshop.startMs > now.getTime())
    .sort((a, b) => a.startMs - b.startMs)
}
