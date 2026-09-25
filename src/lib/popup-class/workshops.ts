import type { EventSchedule } from "./event-time"

export type PopupWorkshopCard = {
  id: string
  href: string
  name: string
  nameEs?: string
  flyer: string
  flyerAlt: string
  durationLabel: string
  durationLabelEs?: string
  schedule: EventSchedule
}

/**
 * Cross-link catalog for popup class landings.
 * Keep schedule/assets in sync with each page config.
 */
export const POPUP_WORKSHOP_CARDS: readonly PopupWorkshopCard[] = [
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
  },
  {
    id: "reggaeton",
    href: "/reggaeton",
    name: "Reggaeton Friday",
    nameEs: "Reggaeton Friday",
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Reggaeton_Popup.png",
    flyerAlt: "Reggaeton Friday class flyer",
    durationLabel: "9:00 PM – 10:00 PM",
    durationLabelEs: "9:00 PM – 10:00 PM",
    schedule: {
      weekday: 5,
      startHour: 21,
      startMinute: 0,
      timeZone: "America/Chicago",
    },
  },
] as const
