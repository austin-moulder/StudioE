/**
 * Twerk Thursday landing — single source of truth for event details.
 * Edit times, capacity, assets, and checkout here.
 */

/** FastPay checkout — replace if the payment link changes. */
export const CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6aad73969f7ff2c808a76607" as const

export const META_PIXEL_ID = "1976276599649833" as const

export const EVENT = {
  name: "Twerk Thursday",
  format: "Ladies-only beginner twerk class",
  /** America/Chicago wall-clock start (8:30 PM). */
  startHour: 20,
  startMinute: 30,
  /** America/Chicago wall-clock end (9:30 PM). */
  endHour: 21,
  endMinute: 30,
  timeZone: "America/Chicago",
  /** Weekday: 0 = Sunday … 4 = Thursday */
  weekday: 4,
  durationLabel: "8:30 PM to 9:30 PM",
  price: 25,
  capacity: 20,
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "In the heart of Humboldt Park",
  neighborhoodShort: "Humboldt Park",
  mapsQuery: "Studio E, 2657 W Division St, Chicago, IL 60622",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=2657+W+Division+St,+Chicago,+IL+60622&output=embed",
} as const

export const ASSETS = {
  flyer:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Pop_Ups-3.png",
  video:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Pop_Ups-7.mp4",
} as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "twerk_thursday",
} as const

export const COPY = {
  heroHeadline: "Twerk Thursday: A Ladies-Only Dance Night in Humboldt Park",
  heroSubheadline:
    "Learn fun, confident movement in a judgment-free room, bring your best friend for free, and leave feeling amazing.",
  primaryCta: "Reserve My Spot for $25",
  secondaryCta: "Bring My Friend",
  capacityNote:
    "Only 20 tickets available for personalized instruction and sufficient mirror space.",
  videoHeadline: "Come for the Fun. Leave With More Confidence.",
  offerHeadline: "Your $25 Gets You In",
  friendHeadline: "Bring Your Best Friend Free",
  friendBody:
    "Your ticket includes one free spot for a female friend who is new to the studio. Come together, learn together, and make Thursday night more fun.",
  limitedHeadline: "Only 20 Tickets Available",
  limitedBody:
    "We keep the class small so the instructor can give you real attention and everyone has enough mirror space to learn comfortably.",
  womenHeadline: "A Women-Only Affirmation Space",
  womenBody:
    "This class is designed as a supportive space where women can move, learn, laugh, and build confidence without feeling judged.",
  womenOnlyLine: "Women only. No men allowed.",
  finalHeadline: "Your Thursday Night Plans Are Set.",
  finalBody: "Grab your ticket, bring your friend, and come move with us in Humboldt Park.",
  countdownEnded: "Class is starting soon.",
  stickyCta: "Reserve My Spot — $25",
} as const

export const OFFER_BULLETS = [
  "60-minute beginner-friendly twerk class",
  "A fun, welcoming women-only environment",
  "Bring one female friend free",
  "Personalized instruction in a capped 20-person class",
  "A high-energy Thursday night experience in Humboldt Park",
] as const

export const OFFER_TERMS = [
  "The paying customer and free friend must attend together.",
  "The free friend must be new to the studio.",
  "One free friend per paid ticket.",
  "Only 20 total tickets available.",
] as const

export const FAQS = [
  {
    question: "Do I need dance experience?",
    answer:
      "No. The class is beginner-friendly and designed for women who want to try something fun in a supportive environment.",
  },
  {
    question: "What does my ticket include?",
    answer: "One spot in the 60-minute Twerk Thursday class at Studio E.",
  },
  {
    question: "Can I bring a friend?",
    answer:
      "Yes. Each paid ticket includes one free female friend who is new to the studio. You must attend together.",
  },
  {
    question: "Is the class really women-only?",
    answer: "Yes. This is a women-only class and no men are allowed.",
  },
  {
    question: "Where is the class?",
    answer: "Studio E, 2657 W Division St, Chicago, IL, in Humboldt Park.",
  },
  {
    question: "How many spots are available?",
    answer:
      "Only 20 spots are available to keep instruction personalized and provide sufficient mirror space.",
  },
  {
    question: "What time should I arrive?",
    answer: "We recommend arriving 10 to 15 minutes early for check-in.",
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
