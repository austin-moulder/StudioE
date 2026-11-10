/**
 * KC Weekender 9:00 AM Salsa Intensive — /kc-weekender-intensive
 * Premium add-on for full-pass buyers only.
 */

import { ASSETS, EVENT, INSTRUCTOR } from "@/lib/kc-weekender/config"

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

export const INTENSIVE_ASSETS = {
  hero: ASSETS.hero,
  instructor: INSTRUCTOR.photo,
  gallery: ASSETS.gallery,
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
  "At least 3 direct instructor feedback points to refine across the day of workshops",
  "Partner rotation and focused drills",
  "Personalized corrections",
  "One usable salsa combination",
  "Short recap video sent after the workshop",
] as const

export const INTENSIVE_COPY = {
  pageTitle: "9:00 AM Salsa Intensive | KC Weekender Add-On",
  metaDescription:
    "Full-pass add-on: 9:00 AM Salsa Intensive before the KC Weekender. Small group of 10. Partnerwork, timing & styling lab for $49.",
  announcement: "FULL-PASS ADD-ON · CAP OF 10 · SAT NOV 28",
  heroEyebrow: "Studio E · KC Weekender Intensive",
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
  focusHeadline: "What this intensive is",
  focusBody:
    "This is not an extra beginner class and not a choreography class. It is a small-group coaching intensive.",
  stackHeadline: "What’s included",
  photoHeadline: "Coaching that transfers to the floor",
  photoBody:
    "Partnerwork, timing, and styling—refined in a small room before the main workshop day begins.",
  contextHeadline: "Before the main workshop",
  contextBody: `This lab runs ${INTENSIVE.timeLabel} at ${EVENT.venueName}, immediately before the ${EVENT.timeLabel} KC Weekender classes.`,
  checkoutHeadline: "Add your intensive",
  checkoutHelper: "Full-pass buyers only · $49 · Cap of 10",
  finalHeadline: "Start the day with a clear list of what to improve.",
  finalBody: "Sixty minutes of focused coaching. Then walk into the workshops already sharper.",
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
