/**
 * Studio E Official Grand Opening — Friday, October 23.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const RSVP_FORM = {
  id: "FgJ6LpKa7iKMZI0CSenq",
  url: "https://api.leadconnectorhq.com/widget/form/FgJ6LpKa7iKMZI0CSenq",
  name: "Grand Opening RSVP",
} as const

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
  flyer: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Grand-Opening-flyer.png",
} as const

export const COPY = {
  announcement: "FRIDAY OCT 23 · FREE RSVP · $1,000+ RAFFLE",
  heroBrand: "Studio E",
  heroHeadline: "Official Grand Opening",
  heroSubheadline:
    "One night opening with a community bombazo led by AfriCaribe, plus workshops, a two-room social with DJ Machito, performances, merch runway, food, and an after party—celebrating our home on Paseo Boricua. Every free RSVP is entered into a special raffle worth $1,000+.",
  primaryCta: "RSVP FREE",
  stickyCta: "RSVP For Grand Opening",
  nightHeadline: "The Night, Hour By Hour",
  workshopsHeadline: "Two Workshops. Every Level.",
  workshopsBody: "Lessons kick off at 8PM. Pick your track—or sample both rooms later on the social floor.",
  socialHeadline: "Two Rooms. Two DJs. All Night.",
  lineupHeadline: "Performances & Runway",
  foodHeadline: "Fuel Up With Local Favorites",
  rsvpHeadline: "Save Your Spot",
  rsvpBody:
    "RSVP free so we can plan the room and welcome you in on October 23. All RSVPs are entered into a special raffle worth $1,000+.",
  finalHeadline: "Be There When Studio E Officially Opens.",
  finalBody:
    "A community bombazo with AfriCaribe, workshops, DJ Machito on the social floor, live performances, merch runway, food from Dope Drip Café and Reina’s Cakes, and a midnight after party. RSVP free—and get entered into the $1,000+ raffle.",
} as const

export const SCHEDULE = [
  {
    time: "7:00 PM",
    title: "Community Bombazo with AfriCaribe",
    detail:
      "AfriCaribe hosts a community bombazo—the only fitting way we can imagine to open a Latin dance studio on Paseo Boricua.",
  },
  { time: "8:00 PM", title: "Lessons & Workshops", detail: "Advanced On 2 with Austin · Beginner On 1 with Arik." },
  {
    time: "9:00 PM",
    title: "Social Dance",
    detail: "Two rooms open with DJ Machito, organizer of the famous Mambo Revival Social, and DJ K-Arik.",
  },
  { time: "11:00 PM", title: "Performances", detail: "Una Bulla and Enclave Verso take the floor." },
  { time: "12:00 AM", title: "After Party", detail: "The after party kicks off in the second room." },
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
  "DJ Machito (organizer of the Mambo Revival Social)",
  "DJ K-Arik",
  "After party in the second room at midnight",
  "Open until 1:00 AM",
] as const

export const LINEUP = [
  { label: "Performances", items: ["Una Bulla", "Enclave Verso"] },
  { label: "Runway", items: ["Studio E Merch Runway with students"] },
] as const

export const FOOD = ["Dope Drip Café", "Reina’s Cakes"] as const

export const FAQS = [
  {
    question: "Is RSVP required?",
    answer:
      "Yes—RSVP free so we can plan capacity and welcome you smoothly at the door. Every RSVP is also entered into a special raffle worth $1,000+.",
  },
  {
    question: "What’s the raffle?",
    answer:
      "All free RSVPs are entered into a special raffle worth $1,000+. Details will be shared at the Grand Opening.",
  },
  {
    question: "Do I need a partner?",
    answer: "No. Come solo or with friends. Workshops and social dancing welcome everyone.",
  },
  {
    question: "What time should I arrive?",
    answer:
      "AfriCaribe opens the night with a community bombazo at 7:00 PM. Arrive early to join in and settle in before workshops at 8:00 PM.",
  },
  {
    question: "Where is it?",
    answer: `Studio E, ${EVENT.addressLine}, ${EVENT.cityLine}, in ${EVENT.neighborhood}.`,
  },
] as const
