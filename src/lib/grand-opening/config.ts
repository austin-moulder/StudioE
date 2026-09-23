/**
 * Studio E Official Grand Opening — Friday, October 23.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const ACUITY_RSVP_URL =
  "https://app.acuityscheduling.com/schedule.php?owner=38921205&appointmentType=98613107" as const

export const EVENT = {
  name: "Studio E Official Grand Opening",
  dateLabel: "Friday, October 23",
  year: 2026,
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
} as const

export const ASSETS = {
  hero: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05837.jpg",
} as const

export const COPY = {
  announcement: "FRIDAY OCT 23 · HUMBOLDT PARK · FREE RSVP",
  heroBrand: "Studio E",
  heroHeadline: "Official Grand Opening",
  heroSubheadline:
    "One night of bomba, workshops, two-room social, performances, merch runway, and food—celebrating our home on Division Street.",
  primaryCta: "RSVP FREE",
  stickyCta: "RSVP For Grand Opening",
  nightHeadline: "The Night, Hour By Hour",
  workshopsHeadline: "Two Workshops. Every Level.",
  workshopsBody: "Lessons kick off at 8PM. Pick your track—or sample both rooms later on the social floor.",
  socialHeadline: "Two Rooms. Two DJs. All Night.",
  lineupHeadline: "Performances & Runway",
  foodHeadline: "Fuel Up With Local Favorites",
  rsvpHeadline: "Save Your Spot",
  rsvpBody: "RSVP free so we can plan the room and welcome you in on October 23.",
  finalHeadline: "Be There When Studio E Officially Opens.",
  finalBody:
    "Bombazo, workshops, social dancing until 1AM, live performances, merch runway, and food from Dope Drip Café and Reina’s Cakes.",
} as const

export const SCHEDULE = [
  { time: "7:00 PM", title: "Bombazo", detail: "Bompleneras open the night with live bomba energy." },
  { time: "8:00 PM", title: "Lessons & Workshops", detail: "Advanced On 2 with Austin · Beginner On 1 with Arik." },
  { time: "9:00 PM", title: "Social Dance", detail: "Two rooms open. DJ Alvin the Third and DJ K-Arik." },
  { time: "11:00 PM", title: "Performances", detail: "Una Bulla and Enclave Dance take the floor." },
  { time: "1:00 AM", title: "Social Ends", detail: "Dance until the lights come up." },
] as const

export const WORKSHOPS = [
  {
    level: "Advanced",
    title: "On 2 Salsa Workshop",
    instructor: "Austin",
    hook: "60 moves in 60 minutes",
  },
  {
    level: "Beginner",
    title: "On 1 Salsa Workshop",
    instructor: "Arik",
    hook: "Fundamentals that stick",
  },
] as const

export const SOCIAL_POINTS = [
  "Two social dance rooms",
  "DJ Alvin the Third",
  "DJ K-Arik",
  "Open until 1:00 AM",
] as const

export const LINEUP = [
  { label: "Performances", items: ["Una Bulla", "Enclave Dance"] },
  { label: "Runway", items: ["Studio E Merch Runway with students"] },
] as const

export const FOOD = ["Dope Drip Café", "Reina’s Cakes"] as const

export const FAQS = [
  {
    question: "Is RSVP required?",
    answer: "Yes—RSVP free so we can plan capacity and welcome you smoothly at the door.",
  },
  {
    question: "Do I need a partner?",
    answer: "No. Come solo or with friends. Workshops and social dancing welcome everyone.",
  },
  {
    question: "What time should I arrive?",
    answer: "Doors energy starts with Bompleneras at 7:00 PM. Arrive early to settle in before workshops at 8:00 PM.",
  },
  {
    question: "Where is it?",
    answer: `Studio E, ${EVENT.addressLine}, ${EVENT.cityLine}, in ${EVENT.neighborhood}.`,
  },
] as const
