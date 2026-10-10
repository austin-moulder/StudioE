import type { EventSchedule } from "./event-time"
import { TWERK_SOLD_OUT_DATES } from "@/lib/twerk-thursday/config"

export type PopupWorkshopCard = {
  id: string
  href: string
  name: string
  nameEs?: string
  flyer: string
  /** Use "contain" for non-square flyers so the card doesn't crop them. */
  flyerFit?: "contain"
  flyerAlt: string
  durationLabel: string
  durationLabelEs?: string
  schedule: EventSchedule
  soldOutDates?: readonly string[]
}

/**
 * Cross-link catalog for popup class landings.
 * Keep schedule/assets in sync with each page config.
 */
export const POPUP_WORKSHOP_CARDS: readonly PopupWorkshopCard[] = [
  {
    id: "posing",
    href: "/posing",
    name: "Pose With Confidence",
    nameEs: "Pose With Confidence",
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Posing.png",
    flyerFit: "contain",
    flyerAlt: "Pose With Confidence posing workshop flyer",
    durationLabel: "3:00 PM – 6:00 PM",
    durationLabelEs: "3:00 PM – 6:00 PM",
    schedule: {
      date: { year: 2026, month: 10, day: 18 },
      weekday: 0,
      startHour: 15,
      startMinute: 0,
      timeZone: "America/Chicago",
    },
  },
  {
    id: "salsa-on-2",
    href: "/salsa-on-2",
    name: "Salsa On 2 Intensive",
    nameEs: "Salsa On 2 Intensivo",
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/On_2.png",
    flyerAlt: "Salsa On 2 Intensive class flyer",
    durationLabel: "8:30 PM – 9:30 PM",
    durationLabelEs: "8:30 PM – 9:30 PM",
    schedule: {
      weekday: 2,
      startHour: 20,
      startMinute: 30,
      timeZone: "America/Chicago",
    },
  },
  {
    id: "afro-cuban-movement",
    href: "/afro-cuban-movement",
    name: "Afro-Cuban Movement",
    nameEs: "Movimiento Afro-Cubano",
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Afro_Cuban_Movement_Flyer.png",
    flyerAlt: "Afro-Cuban Movement class flyer",
    durationLabel: "7:30 PM – 8:30 PM",
    durationLabelEs: "7:30 PM – 8:30 PM",
    schedule: {
      weekday: 3,
      startHour: 19,
      startMinute: 30,
      timeZone: "America/Chicago",
    },
  },
  {
    id: "cumbia-wepa",
    href: "/cumbia-wepa",
    name: "Cumbia Wepa",
    nameEs: "Cumbia Wepa",
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Cumba_Wepa_Workshop.png",
    flyerAlt: "Cumbia Wepa Workshop flyer",
    durationLabel: "6:30 PM – 7:30 PM",
    durationLabelEs: "6:30 PM – 7:30 PM",
    schedule: {
      weekday: 4,
      startHour: 18,
      startMinute: 30,
      timeZone: "America/Chicago",
    },
  },
  {
    id: "twerk-thursday",
    href: "/twerk-thursday",
    name: "Twerk Thursday",
    nameEs: "Twerk Thursday",
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Twerk_popup.png",
    flyerAlt: "Twerk Thursday class flyer",
    durationLabel: "8:30 PM – 9:30 PM",
    durationLabelEs: "8:30 PM – 9:30 PM",
    schedule: {
      weekday: 4,
      startHour: 20,
      startMinute: 30,
      timeZone: "America/Chicago",
    },
    soldOutDates: TWERK_SOLD_OUT_DATES,
  },
] as const
