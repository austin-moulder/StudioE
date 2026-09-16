/**
 * Config for the 28-day challenge landing page (/challenge).
 */

/** FastPay checkout — same link for every challenge track. */
export const CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6a95dce1d6768df054448f36" as const

/** Member BOGO: $150 for 2 privates (buy two packs to cover a full 4-private challenge). */
export const MEMBER_BOGO_URL =
  "https://link.fastpaydirect.com/payment-link/6a8dba67d6768df054447de5" as const

export const CHALLENGE_PAGE_URL = "https://www.joinstudioe.com/challenge" as const

export const PRICING = {
  regular: 599,
  early: 399,
  earlyNote: "Lock in $399 when you sign up before your first class.",
} as const

export const MEMBER_BOGO = {
  price: 150,
  regularPair: 300,
  headline: "Already a member?",
  body: "Lock in BOGO privates — $150 for 2. Grab two packs to cover all 4 privates in a 28-day challenge.",
  cta: "Get 2 Privates for $150",
  note: "Members: buy two BOGO packs ($300 total) to complete the full 4-private challenge path.",
} as const

const ASSET_BASE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/28-day-challenge" as const

export const CHALLENGE_IMAGES = {
  hero: `${ASSET_BASE}/DSC05745.jpg`,
  practice: `${ASSET_BASE}/DSC05764%20(1).jpg`,
  community: `${ASSET_BASE}/IMG_2657.JPG`,
} as const

export const COPY = {
  brand: "Studio E",
  pageTitle: "28-Day Dance Challenges | Studio E Chicago",
  heroHeadline: "Master one dance in 28 days.",
  heroBody:
    "Four private lessons plus unlimited group classes — built so the curriculum sticks for life.",
  primaryCta: "Start My Challenge — $399",
  stickyCta: "Lock In $399",
  includedHeadline: "What’s in every challenge",
  tracksHeadline: "Pick your focus",
  tracksBody: "Every track uses the same package. Choose the style you want to own.",
  pathHeadline: "How the 28 days work",
  outcomeHeadline: "Walk away with it for good.",
  outcomeBody:
    "When you finish a challenge, you don’t just “try” the style — you leave with the curriculum and the confidence to dance that topic for the rest of your life.",
  pricingHeadline: "Sign up before your first class.",
  pricingBody: "Same checkout for every challenge. Pick your track with us after you enroll.",
} as const

export const INCLUDED = [
  "4 private lessons focused on your challenge track",
  "Unlimited eligible group classes during the 28 days",
  "English or Spanish instruction",
  "Choose private times that work for you (space permitting)",
  "1–2 privates per week so you learn and retain the material",
] as const

export type ChallengeTrack = {
  name: string
  group: "core" | "advanced" | "specialty"
}

export const TRACKS: ChallengeTrack[] = [
  { name: "Salsa", group: "core" },
  { name: "Bachata", group: "core" },
  { name: "Cumbia", group: "core" },
  { name: "Advanced Salsa", group: "advanced" },
  { name: "Advanced Bachata", group: "advanced" },
  { name: "Advanced Cumbia", group: "advanced" },
  { name: "Mambo / Salsa On 2", group: "specialty" },
  { name: "Cha-Cha", group: "specialty" },
  { name: "Styling Intensive", group: "specialty" },
  { name: "Bachata Sensual", group: "specialty" },
]

export const TRACK_GROUPS = [
  { id: "core" as const, label: "Core" },
  { id: "advanced" as const, label: "Advanced" },
  { id: "specialty" as const, label: "Specialty" },
]

export const PATH_STEPS = [
  {
    title: "Enroll before class one",
    body: "Lock in the early price, then tell us which challenge track you’re taking.",
  },
  {
    title: "Book 1–2 privates each week",
    body: "Four focused privates paced so new material sticks — not a one-and-done dump.",
  },
  {
    title: "Dance unlimited group classes",
    body: "Practice what you learned on the social floor with the Studio E community.",
  },
  {
    title: "Leave with lasting confidence",
    body: "You finish with the curriculum in your body — ready to dance that topic for life.",
  },
] as const

export const FAQS = [
  {
    question: "What’s included?",
    answer:
      "Every 28-day challenge includes 4 private lessons plus unlimited eligible group classes for the duration of the challenge.",
  },
  {
    question: "Do I pick English or Spanish?",
    answer:
      "Yes. Challenges can be delivered in English or Spanish — tell us your preference when you enroll.",
  },
  {
    question: "When are the private lessons?",
    answer:
      "You choose private times that work for your schedule, space permitting. Most students book 1–2 privates per week.",
  },
  {
    question: "How do I get the $399 price?",
    answer:
      "Sign up before your first class to lock in $399 instead of the regular $599 rate.",
  },
  {
    question: "Is checkout the same for every challenge?",
    answer:
      "Yes. One checkout covers enrollment. After you pay, we’ll confirm which track you’re joining (Salsa, Bachata, Cumbia, advanced, specialty, and more).",
  },
] as const
