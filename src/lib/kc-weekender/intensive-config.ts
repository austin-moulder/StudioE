/**
 * KC Weekender 9:00 AM Salsa Intensive — /kc-weekender-intensive
 * Premium add-on for full-pass buyers only.
 */

import { EVENT, INSTRUCTOR } from "@/lib/kc-weekender/config"

export const META_PIXEL_ID = "1976276599649833" as const

export const INTENSIVE_CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6af2b81103c375ed645fe8bf" as const

export const INTENSIVE_UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "kc_weekender_intensive",
} as const

export const INTENSIVE = {
  name: "9:00 AM Salsa Intensive: Partnerwork, Timing & Styling Lab",
  shortName: "Salsa Intensive",
  timeLabel: "9:00 AM – 10:00 AM",
  duration: "60 minutes",
  price: 49,
  capacity: 10,
  eligibility: "Full-pass buyers only",
  level: "Intermediate and above",
  levelNote:
    "Participants should already know the basic salsa step and be comfortable dancing with a partner.",
} as const

/** Distinct from /kc-weekender gallery — coaching / floor-focused frames. */
export const INTENSIVE_ASSETS = {
  hero: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/28-day-challenge/DSC05745.jpg",
  instructor: INSTRUCTOR.photo,
  gallery: [
    {
      src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05837.jpg",
      alt: "Studio E dancers in a focused moment on the floor",
    },
    {
      src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05316.jpg",
      alt: "Partner connection during Studio E social dancing",
    },
    {
      src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/Wide_group.jpg",
      alt: "Wide view of dancers moving together at Studio E",
    },
  ],
} as const

export const INTENSIVE_FOCUS = [
  "Cleaner timing",
  "Better partner connection",
  "More confident lead/follow technique",
  "Styling that looks natural instead of forced",
  "Individual corrections from the instructor",
  "One polished combination you can use socially",
] as const

export const INTENSIVE_STACK = [
  "Small-group format capped at 10",
  "At least 3 direct instructor feedback points to refine across the day",
  "Partner rotation and focused drills",
  "Personalized corrections",
  "One usable salsa combination",
  "Short recap video sent after the workshop",
] as const

export const INTENSIVE_COPY = {
  pageTitle: "9:00 AM Salsa Intensive | KC Weekender Add-On",
  metaDescription:
    "Full-pass add-on: 9:00 AM Salsa Intensive before the KC Weekender. Small group of 10. Partnerwork, timing & styling lab for $49.",
  announcement: "FULL-PASS ONLY · CAP OF 10 · 9:00 AM",
  heroEyebrow: "Add-on lab · Sat Nov 28",
  heroHeadline:
    "Want a personalized list of improvement areas before the workshops start? Add the 9:00 AM Salsa Intensive.",
  heroSubheadline:
    "Start the day in a capped small group with direct coaching on timing, connection, and styling before the main workshop begins.",
  primaryCta: "Add the Salsa Intensive for $49",
  stickyCta: "Add the Salsa Intensive for $49",
  bestForHeadline: "Best for",
  bestFor:
    "Dancers who know the basics and want more confidence, cleaner technique, and personalized feedback.",
  notForHeadline: "Not for",
  notFor: "Not recommended if you have never taken a salsa class.",
  scarcity: "Only 10 spots. This will not be available after capacity is reached.",
  focusHeadline: "Sixty minutes. Direct coaching.",
  focusBody:
    "Not a beginner class. Not choreography. A small-group lab on timing, connection, and styling.",
  stackHeadline: "Included",
  checkoutHeadline: "Reserve your intensive spot",
  checkoutHelper: `$${INTENSIVE.price} · Full-pass buyers only · Cap of ${INTENSIVE.capacity}`,
  finalHeadline: "Walk into the workshops already sharper.",
  finalBody: "One hour of focused feedback. Then the main day starts at 10.",
} as const

export const INTENSIVE_FAQS = [
  {
    question: "Do I need a full pass?",
    answer: "Yes. This intensive is available to full-pass buyers only.",
  },
  {
    question: "Is this for beginners?",
    answer:
      "No. Basic salsa experience is required. You should already know the basic step and be comfortable dancing with a partner.",
  },
  {
    question: "Will I dance with different partners?",
    answer: "Yes, unless a specific accommodation is needed.",
  },
  {
    question: "What should I bring?",
    answer: "Comfortable dance shoes and water.",
  },
] as const

/** Shared teaser copy for the upsell block on /kc-weekender */
export const INTENSIVE_TEASER = {
  eyebrow: "Full-pass upgrade · Cap of 10",
  headline:
    "Want a personalized list of improvement areas before the workshops start? Add the 9:00 AM Salsa Intensive.",
  subheadline:
    "Start the day in a capped small group with direct coaching on timing, connection, and styling before the main workshop begins.",
  cta: INTENSIVE_COPY.primaryCta,
  href: "/kc-weekender-intensive",
  price: INTENSIVE.price,
  scarcity: INTENSIVE_COPY.scarcity,
} as const

export { EVENT, INSTRUCTOR }
