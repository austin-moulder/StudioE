/**
 * 21-Day Latin Morning Reset landing — single source of truth.
 */

export const CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6ab17e67f426560dbc2f179a" as const

export const META_PIXEL_ID = "1976276599649833" as const

export const OFFER = {
  name: "21-Day Latin Morning Reset",
  price: 21,
  durationDays: 21,
  classTime: "10AM",
  classDays: "Monday through Friday",
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park",
} as const

export const ASSETS = {
  hero: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Fitness/group_shot.jpg",
} as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "latin_morning_reset",
} as const

export const COPY = {
  announcement: "WEEKDAY 10AM CLASSES | BEGINNER-FRIENDLY | NO PARTNER REQUIRED",
  heroHeadline: "Dance Your Way Into Better Energy, Strength, and Confidence Before Noon.",
  heroSubheadline:
    "The 21-Day Latin Morning Reset is a fun, beginner-friendly weekday workout combining Latin dance, mobility, strength, and community. Show up at 10AM, move your body, meet great people, and start your day feeling better.",
  primaryCta: "START YOUR 21-DAY RESET",
  offerCta: "JOIN THE LATIN MORNING RESET",
  finalCta: "START MY 21-DAY RESET",
  stickyCta: "START YOUR 21-DAY RESET — $21",
  microcopy: "Only $21 to get started. No dance experience required.",
  whatYouGetHeadline: "A Better Morning Starts With One Class.",
  howItWorksHeadline: "How It Works",
  formatHeadline: "What’s Inside the Class",
  formatNote:
    "Low-pressure and beginner-friendly. No partner needed. Every movement can be modified.",
  forYouHeadline: "This Is For You If…",
  offerHeadline: "Your First 21 Days Start Here.",
  afterHeadline: "Build The Habit. Keep The Momentum.",
  afterBody:
    "Members who want to continue can join Morning Latin Club, our recurring weekday morning community with ongoing classes, strength, mobility, and social connection.",
  finalHeadline: "Stop Waiting For The Perfect Morning.",
  finalBody: "You do not need more motivation. You need a simple place to show up. Start with 21 days.",
  disclaimer:
    "Participants should consult a medical professional before beginning exercise and should stop if they experience pain, dizziness, or unusual symptoms.",
} as const

export const WHAT_YOU_GET = [
  {
    title: "Latin dance-inspired movement",
    body: "Move to salsa, bachata, merengue, and cumbia-inspired rhythms that feel joyful—not like a chore.",
  },
  {
    title: "Simple strength and core work",
    body: "Build strength with approachable exercises that support better posture, power, and everyday energy.",
  },
  {
    title: "Mobility and stretching",
    body: "Warm up, open up, and leave feeling looser—so your body feels ready for the rest of the day.",
  },
  {
    title: "An encouraging community",
    body: "Show up with people who are here to feel good, stay consistent, and start the morning together.",
  },
] as const

export const HOW_IT_WORKS = [
  "Join us at 10AM, Monday through Friday",
  "Follow an easy, scalable 60-minute class",
  "Build consistency over 21 days",
  "Decide whether the Morning Latin Club is your next step",
] as const

export const CLASS_FORMAT = [
  { minutes: 10, label: "Mobility and warm-up" },
  { minutes: 25, label: "Salsa, bachata, merengue, and cumbia-inspired movement" },
  { minutes: 15, label: "Strength and core" },
  { minutes: 10, label: "Stretch and reset" },
] as const

export const FOR_YOU_IF = [
  "You want exercise that does not feel like punishment",
  "You enjoy music, movement, and community",
  "You want more energy during the day",
  "You are ready to become consistent",
  "You have been intimidated by traditional gyms or dance classes",
] as const

export const OFFER_INCLUDES = [
  "Weekday 10AM access",
  "21-day consistency challenge",
  "Beginner-friendly instruction",
  "One guest pass",
  "Final Friday celebration class",
] as const

export const FAQS = [
  {
    question: "Do I need dance experience?",
    answer: "No.",
  },
  {
    question: "Do I need a partner?",
    answer: "No.",
  },
  {
    question: "What should I wear?",
    answer: "Comfortable workout clothes and supportive shoes.",
  },
  {
    question: "Is this only for advanced dancers?",
    answer: "Not at all.",
  },
  {
    question: "Can I modify the workout?",
    answer: "Yes. Every movement can be scaled.",
  },
  {
    question: "Where is it?",
    answer: `Studio E, ${OFFER.addressLine}, ${OFFER.cityLine}, in ${OFFER.neighborhood}.`,
  },
] as const

export function buildCheckoutUrl(extraParams?: Record<string, string>) {
  const url = new URL(CHECKOUT_URL)
  Object.entries(UTM).forEach(([key, value]) => {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value)
  })
  if (typeof window !== "undefined") {
    const incoming = new URLSearchParams(window.location.search)
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"].forEach(
      (key) => {
        const value = incoming.get(key)
        if (value) url.searchParams.set(key, value)
      }
    )
  }
  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  return url.toString()
}
