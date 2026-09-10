/**
 * Config for the giveaway consolation offer page.
 *
 * Tracking hooks (wire these in your pixels / GHL):
 * - Meta Pixel: map trackEvent() names in ConsolationPassClient to fbq('trackCustom', ...)
 * - Google Analytics / Ads: events already push to window.dataLayer + gtag when available
 * - GHL: add custom webhook or GTM listener on the same event names, or embed this page URL in a GHL funnel
 */

/** FastPay link for claiming the $25 2-week unlimited pass. */
export const CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6a975b4fd6768df05444938c" as const

/** Acuity link for booking the first class (starts the 14-day window). */
export const BOOKING_URL =
  "https://app.acuityscheduling.com/schedule/76f316b6/?template=class" as const

export const OFFER = {
  price: 25,
  durationDays: 14,
  expiryHours: 24,
  headline:
    "You Didn’t Win the Free Year. But You Still Get 2 Weeks Unlimited for $25.",
  subheadline:
    "Try Chicago’s Latin dance community, meet great people, and take as many eligible classes as you want for 14 days.",
  ctaPrimary: "Claim My 2-Week Pass for $25",
  ctaSecondary: "Claim My Pass for $25",
  finePrint: "Chicago residents only. Offer expires 24 hours after delivery.",
  countdownLabel: "Your $25 offer expires in",
} as const

export const UTM = {
  utm_source: "giveaway",
  utm_medium: "vsl",
  utm_campaign: "consolation_offer",
} as const

/** Shared poster used across consolation, founder-deal, and newmemberdeal videos. */
export const SHARED_VIDEO_POSTER =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Videos/Screenshot%202026-09-10%20at%2012.40.20%20PM.png" as const

export const VIDEO = {
  src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Videos/Giveaway_Second_Place.mp4",
  poster: SHARED_VIDEO_POSTER,
} as const

export const OFFER_STACK = [
  "14 days of unlimited eligible Latin dance classes",
  "Beginner-friendly instruction",
  "Meet and dance with the Chicago Puerto Rican community",
  "No long-term commitment",
  "Simple online booking",
] as const

export type FaqItem = {
  question: string
  answer: string
  linkHref?: string
  linkLabel?: string
}

export const FAQS: FaqItem[] = [
  {
    question: "Who is this for?",
    answer:
      "Only eligible for new students. Existing members cannot redeem this purchase.",
  },
  {
    question: "Where are classes located?",
    answer: "Studio E, 2657 W Division Street, Humboldt Park, Chicago, IL 60622.",
  },
  {
    question: "What classes are included?",
    answer:
      "Unlimited eligible classes include salsa, bachata, merengue, cumbia, and cha-cha.",
  },
  {
    question: "When does the 14-day period begin?",
    answer: "The 14-day period begins when you book your first class.",
    linkHref: BOOKING_URL,
    linkLabel: "Book your first class here",
  },
  {
    question: "Is there a long-term commitment?",
    answer:
      "No. This pass is a one-time 14-day offer with no membership required to redeem it.",
  },
  {
    question: "What happens after the 14 days?",
    answer:
      "After the 14 days, you’ll have the option to join a 28-day challenge or a membership at a very special price not available to the rest of the public.",
  },
  {
    question: "What is the refund/cancellation policy?",
    answer: "There are no refunds for the unlimited pass.",
  },
]

export const FOOTER = {
  businessName: "Studio E",
  address: "2657 W Division Street, Chicago, IL 60622",
  email: "studioelatindance@gmail.com",
  phone: "(816) 419-6279",
  officialRulesHref: "/giveaway",
  termsHref: "/terms",
  privacyHref: "/privacy",
  residencyNote: "Chicago residents only.",
  eligibilityNote: "This offer is available only to eligible giveaway entrants.",
} as const

export const STORAGE_KEY = "studioe_consolation_offer_expires_at" as const

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
