/**
 * Studio E KC Latin Dance Weekend — /kc-weekender
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const CHECKOUT_URL = "https://studioe-danceclassestraining.com/kc-weekender" as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "kc_weekender",
} as const

export const EVENT = {
  brand: "Studio E",
  name: "Studio E KC Latin Dance Weekend",
  shortName: "KC Weekender",
  format: "3 hours total · 3 classes",
  city: "Kansas City",
  dateLabel: "Saturday, November 28th",
  timeLabel: "10:00 AM – 1:00 PM",
  venueName: "Johnson County Arts and Heritage Center",
  addressLine: "8788 Metcalf Avenue",
  cityLine: "Overland Park, KS 66212",
  /** America/Chicago — doors / first class */
  startMs: Date.parse("2026-11-28T10:00:00-06:00"),
} as const

export const PRICING = {
  single: 30,
  fullPass: 75,
  individualTotal: 90,
  savings: 15,
} as const

/** Spots theater: start at 34 of 40, trickle to 2 by event day. */
export const CAPACITY = {
  total: 40,
  startLeft: 34,
  endLeft: 2,
  /** When the countdown from 34 begins (America/Chicago). */
  trickleStartMs: Date.parse("2026-11-09T00:00:00-06:00"),
} as const

/**
 * Spots remaining decline linearly from startLeft → endLeft between
 * trickleStartMs and EVENT.startMs.
 */
export function getKcSpotsLeft(nowMs: number = Date.now()): number {
  const { startLeft, endLeft, trickleStartMs } = CAPACITY
  const endMs = EVENT.startMs
  if (nowMs <= trickleStartMs) return startLeft
  if (nowMs >= endMs) return endLeft
  const progress = (nowMs - trickleStartMs) / (endMs - trickleStartMs)
  return Math.max(endLeft, Math.round(startLeft - progress * (startLeft - endLeft)))
}

const VIBES =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes" as const
const CHALLENGE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/28-day-challenge" as const

export const ASSETS = {
  flyer:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Kc_weekender_1.png",
  flyerAlt: "Studio E KC Latin Dance Weekend flyer — Saturday November 28",
  hero: `${VIBES}/Arik_Private.PNG`,
  instructor:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Accelerator.jpg",
  gallery: [
    {
      src: `${VIBES}/DSC05448.jpg`,
      alt: "Dancers smiling and moving together at a Studio E social",
    },
    {
      src: `${VIBES}/IMG_1101.JPG`,
      alt: "Studio E instructor teaching Latin dance",
    },
    {
      src: `${VIBES}/DSC05366.jpg`,
      alt: "High-energy group dancing at Studio E",
    },
    {
      src: `${CHALLENGE}/DSC05764%20(1).jpg`,
      alt: "Focused dance instruction at Studio E",
    },
  ],
} as const

export const CLASSES = [
  {
    id: "fundamentals",
    time: "10:00 AM",
    title: "Salsa Fundamentals",
    body: "Build the patterns, timing, and partner connection that make social dancing feel easier.",
  },
  {
    id: "partnerwork",
    time: "11:00 AM",
    title: "Salsa Partnerwork and Creativity",
    body: "Learn partner connection, creative options, and how to keep dances interesting without freezing up.",
  },
  {
    id: "musicality",
    time: "12:00 PM",
    title: "Salsa Musicality and Styling",
    body: "Learn how to hear the music, add intentional styling, and look more confident without overthinking.",
  },
] as const

export const AUDIENCE_COPY = {
  headline: "Built for KC dancers who want a real salsa upgrade.",
  body: "Beginners are welcome, especially in Class 1. Experienced dancers will get layered variations and higher-level challenges throughout the day.",
} as const

export const INSTRUCTOR = {
  name: "Austin Moulder",
  role: "Founder of Studio E",
  bio: "Founder of Studio E, Chicago’s quickest growing Latin social dance studio in the heart of Chicago’s Puerto Rican district. Austin brings Chicago-level Latin social dance instruction to Kansas City for this weekend.",
  photo: ASSETS.instructor,
} as const

export const COPY = {
  pageTitle: "Studio E KC Latin Dance Weekend | Kansas City Salsa",
  metaDescription:
    "Saturday, Nov 28 · 10 AM–1 PM at Johnson County Arts and Heritage Center. Three salsa classes. Full pass $75 or single class $30. Studio E brings Chicago-level Latin dance to Kansas City.",
  heroHeadline: "Three Hours. Three Classes. One Serious Upgrade to Your Salsa.",
  heroSubheadline: "Studio E is bringing Chicago-level Latin dance instruction to Kansas City.",
  primaryCta: "Get the Full Pass",
  secondaryCta: "Choose a Single Class",
  stickyCta: "Get the Full Pass",
  credibilityHeadline: "Built for the social floor",
  credibilityBody:
    "Real instruction energy from Studio E’s Chicago community—teaching, partnerwork, and high-energy group moments.",
  learnHeadline: "What you’ll learn",
  learnBody: "Three focused salsa classes in one weekend—10 AM to 1 PM.",
  offerHeadline: "Choose your ticket",
  offerBody: `Full pass covers all three classes for $${PRICING.fullPass}. Buying individually is $${PRICING.individualTotal}—save $${PRICING.savings} with the full pass.`,
  spotsLine: (n: number) => `Only ${n} of ${CAPACITY.total} spots left`,
  instructorHeadline: "Your instructor",
  instructorStudioLine:
    "Studio E is a Chicago-based Latin social dance brand rooted in Humboldt Park / Paseo Boricua.",
  faqHeadline: "FAQ",
  finalHeadline: "Your next breakthrough starts with showing up.",
  finalCta: `Get the Full Pass for $${PRICING.fullPass}`,
  checkoutHeadline: "Secure your spot",
  checkoutHelper: "Full pass $75 · Single class $30 · Choose your option in checkout",
} as const

export const FAQS = [
  {
    question: "Who is this for?",
    answer:
      "Built for KC dancers who want a real salsa upgrade. Beginners are welcome, especially in Class 1. Experienced dancers will get layered variations and higher-level challenges throughout the day.",
  },
  {
    question: "Is this On 1 or On 2?",
    answer:
      "This weekend is On 1. We also offer privates if you want to level up your On 2—send a message to @the_studio_e on Instagram for more information.",
  },
  {
    question: "Do I need a partner?",
    answer:
      "No. You can attend solo. Partnerwork is taught in class—details on rotating partners will be confirmed on site.",
  },
  {
    question: "Can I attend only one class?",
    answer: `Yes. Single classes are $${PRICING.single} each. The full pass ($${PRICING.fullPass}) covers all three and saves $${PRICING.savings}.`,
  },
  {
    question: "What should I bring?",
    answer:
      "Comfortable clothes you can move in and shoes you can dance in. Water is recommended.",
  },
  {
    question: "What happens after I purchase?",
    answer:
      "You’ll receive confirmation through checkout with event details. Classes are Saturday, November 28th, 10:00 AM–1:00 PM at Johnson County Arts and Heritage Center, 8788 Metcalf Avenue, Overland Park, KS 66212.",
  },
] as const
