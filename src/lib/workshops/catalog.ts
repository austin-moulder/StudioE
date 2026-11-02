/**
 * Instagram-bio workshop hub catalog.
 * All prices, times, venues, and checkout URLs come from existing popup configs.
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
import { buildPopupCheckoutUrl, type PopupClassLandingConfig } from "@/lib/popup-class/types"
import { POSING_CONFIG } from "@/lib/posing/config"
import { REGGAETON_CONFIG } from "@/lib/reggaeton/config"
import { SALSA_ON_2_CONFIG } from "@/lib/salsa-on-2/config"
import { TWERK_THURSDAY_CONFIG, TWERK_SOLD_OUT_DATES } from "@/lib/twerk-thursday/config"

export const WORKSHOPS_HUB_UTM = {
  utm_source: "instagram",
  utm_medium: "bio",
  utm_campaign: "workshops_hub",
} as const

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
  registrationUrl: string
  capacity?: number
  soldOutDates?: readonly string[]
}

/** Style labels taken from each workshop’s existing name/format. */
const STYLE_BY_ID: Record<string, string> = {
  "twerk-thursday": "Twerk",
  reggaeton: "Reggaeton",
  merengue: "Merengue",
  chacha: "Cha-Cha",
  "cumbia-wepa": "Cumbia",
  "afro-cuban-movement": "Afro-Cuban",
  "salsa-on-2": "Salsa On 2",
  posing: "Posing",
}

function toListing(config: PopupClassLandingConfig): WorkshopListing {
  const { event, assets, copy, checkoutUrl, id, soldOut } = config
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
    registrationUrl: buildPopupCheckoutUrl(checkoutUrl, WORKSHOPS_HUB_UTM),
    capacity: event.capacity,
    soldOutDates: soldOut?.dates ?? (id === "twerk-thursday" ? TWERK_SOLD_OUT_DATES : undefined),
  }
}

/**
 * Active low-ticket / specialty workshops sourced from live landing configs.
 * Posing is included only while its fixed date is still upcoming.
 */
export const WORKSHOP_LISTINGS: readonly WorkshopListing[] = [
  toListing(CHACHA_CONFIG),
  toListing(SALSA_ON_2_CONFIG),
  toListing(MERENGUE_CONFIG),
  toListing(AFRO_CUBAN_CONFIG),
  toListing(CUMBIA_WEPA_CONFIG),
  toListing(TWERK_THURSDAY_CONFIG),
  toListing(REGGAETON_CONFIG),
  toListing(POSING_CONFIG),
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
