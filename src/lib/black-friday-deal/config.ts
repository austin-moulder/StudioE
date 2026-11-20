/**
 * Black Friday BOGO Month — /black-friday-deal
 * Gold Plan: pay 1× 28-day cycle at the locked-in first-class rate ($124),
 * next 28-day cycle credited 100% off. New members only. 20 passes.
 *
 * Launch: Fri Nov 27, 2026 · 7:00 AM America/Chicago
 * Ends:   Fri Nov 27, 2026 · 7:00 PM America/Chicago (12 hours)
 */

export const META_PIXEL_ID = "1976276599649833" as const

/** Staff / CRM identification — passed into checkout query params. */
export const STAFF_PROMO_TAG = "BF_BOGO_GOLD_2026" as const

export const CHECKOUT_URL =
  "https://studioe-danceclassestraining.com/black-friday-deal" as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "black_friday_bogo_gold",
} as const

/** Extra params so staff can identify Black Friday BOGO purchases. */
export const CHECKOUT_PROMO_PARAMS = {
  promo: "black_friday_bogo",
  tag: STAFF_PROMO_TAG,
  offer: "bogo_month_gold",
  staff_flag: STAFF_PROMO_TAG,
} as const

export const LAUNCH_MS = Date.parse("2026-11-27T07:00:00-06:00")
export const EXPIRE_MS = Date.parse("2026-11-27T19:00:00-06:00")

export const PRICING = {
  /** Locked-in Gold Plan rate when signing up before first class (membership page). */
  goldRate: 124,
  /** Standard Gold Plan rate without the first-class discount. */
  goldRegular: 169,
  billingLabel: "every 4 weeks",
} as const

export const CAPACITY = {
  total: 20,
  /** Spots left at launch; trickle toward 1 by expiration. */
  startLeft: 20,
  endLeft: 1,
} as const

export const VENUE = {
  name: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL 60622",
  neighborhood: "Humboldt Park · Paseo Boricua",
  email: "studioelatindance@gmail.com",
  phone: "(816) 419-6279",
  phoneTel: "+18164196279",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=2657+W+Division+St,+Chicago,+IL+60622&output=embed",
} as const

export const SOCIAL = {
  instagramUrl: "https://www.instagram.com/the_studio_e/",
  instagramHandle: "@the_studio_e",
  googleReviewsUrl:
    "https://www.google.com/maps/place/Studio+E/@41.90265,-87.69418,17z/data=!4m6!3m5!1s0x880fd33a872cc87d:0xeecb5e416ff48003!8m2!3d41.90265!4d-87.69418!16s%2Fg%2F11l6v0xqk0",
  googleRating: 4.9,
  googleReviewCount: 73,
} as const

const VIBES =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes" as const
const POPUPS =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups" as const

export const ASSETS = {
  hero: `${VIBES}/Wide_group.jpg`,
  gallery: [
    { src: `${VIBES}/Wide_group.jpg`, alt: "Studio E group class on the dance floor" },
    { src: `${VIBES}/DSC05837.jpg`, alt: "Dancers moving together at Studio E Chicago" },
    { src: `${VIBES}/DSC05366.jpg`, alt: "High-energy Latin dance class at Studio E" },
    { src: `${VIBES}/DSC05448.jpg`, alt: "Members smiling and connecting at Studio E" },
    { src: `${VIBES}/DSC05316.jpg`, alt: "Partnerwork practice at Studio E" },
    { src: `${VIBES}/IMG_1101.JPG`, alt: "Instructor leading a Studio E class" },
  ],
  videos: [
    {
      src: `${POPUPS}/Wepa_Vid.mp4`,
      label: "Cumbia Wepa class energy",
    },
    {
      src: `${POPUPS}/Merengue_Vid.mp4`,
      label: "Merengue class energy",
    },
  ],
  testimonialVideoEmbed: "https://www.youtube.com/embed/-q-yfv1YEI0",
} as const

export type OfferPhase = "prelaunch" | "live" | "expired"

export function getOfferPhase(nowMs: number = Date.now()): OfferPhase {
  if (nowMs < LAUNCH_MS) return "prelaunch"
  if (nowMs >= EXPIRE_MS) return "expired"
  return "live"
}

/**
 * Spots remaining during the live window: linear trickle from 20 → 1.
 * Pre-launch shows full capacity; expired shows sold out.
 */
export function getPassesLeft(nowMs: number = Date.now()): number {
  if (nowMs < LAUNCH_MS) return CAPACITY.total
  if (nowMs >= EXPIRE_MS) return 0
  const progress = (nowMs - LAUNCH_MS) / (EXPIRE_MS - LAUNCH_MS)
  return Math.max(
    CAPACITY.endLeft,
    Math.round(CAPACITY.startLeft - progress * (CAPACITY.startLeft - CAPACITY.endLeft))
  )
}

export const COPY = {
  pageTitle: "Black Friday BOGO Month | Studio E Chicago",
  metaDescription:
    "Black Friday only: join Studio E’s Gold Plan for $124, get your next 28 days credited free. New members only. 20 passes. Friday Nov 27, 7 AM–7 PM Chicago time.",
  offerName: "Black Friday BOGO Month",
  stickyPrelaunch: "Black Friday BOGO opens Friday 7:00 AM · Countdown",
  stickyLive: "Black Friday BOGO ends Friday 7:00 PM · Only",
  stickyExpired: "This Black Friday BOGO offer has ended",
  heroEyebrow: "Black Friday · New members only",
  heroHeadline: "Black Friday: Get 2 Months of Studio E for the Price of 1",
  heroSubheadline:
    "Start dancing, build confidence, and find your people in Chicago. Join the Gold Plan, pay for your first 28 days, and we’ll credit your next 28 days free.",
  conceptLine: "Pay for 28 Days. Get Your Next 28 Days Free.",
  primaryCta: "Claim the BOGO Gold Plan",
  stickyCta: "Claim the BOGO Gold Plan",
  prelaunchCta: "Opens Friday at 7:00 AM",
  expiredCta: "Offer ended Friday at 7:00 PM",
  newMemberBanner: "NEW MEMBERS ONLY · One free 28-day credit per new member",
  creditBanner: "Your next 28 days are credited 100% off — a studio credit, not cash value",
  valueHeadline: "What’s included",
  howHeadline: "How it works",
  mediaHeadline: "The room you’ll train in",
  mediaBody: "Raw Studio E class energy — street-style Latin dance, real people, real progress.",
  proofHeadline: "Why dancers stay at Studio E",
  proofBody: "Google reviews from people who came for the dance and stayed for the community.",
  faqHeadline: "FAQ",
  urgencyHeadline: "Only 20 BOGO passes · 12 hours only",
  urgencyBody:
    "This offer launches Friday, November 27 at 7:00 AM and disappears at 7:00 PM Chicago time. When the 20 passes are gone — or the clock hits 7 PM — the link stops.",
  checkoutHeadline: "Claim your BOGO Gold Plan",
  checkoutHelper: `Gold Plan $${PRICING.goldRate} for your first 28 days · Next 28 days credited free · Then $${PRICING.goldRate} ${PRICING.billingLabel}`,
  checkoutFallback: "Open checkout in a new tab",
  finalHeadline: "Pay for 28 days. Get your next 28 days free.",
  finalBody: `New members only. Gold Plan $${PRICING.goldRate}. One BOGO credit. Must purchase on this page before Friday 7:00 PM.`,
  accessNote:
    "Membership starts immediately — you’ll have access through January 22. Text us if you need to delay your start date (up to 30 days from purchase).",
  countdownToLaunch: "Opens in",
  countdownToExpire: "Ends in",
  offerEnded: "This Black Friday BOGO offer ended at 7:00 PM on Friday, November 27.",
  offerNotOpen: "Checkout opens Friday, November 27 at 7:00 AM Chicago time.",
} as const

export const VALUE_STACK = [
  {
    title: "28 days of Gold Plan access",
    body: `8 classes every 4 weeks, member events, happy hour social, 1:1 weekly support, and 1 guest pass — at the locked-in $${PRICING.goldRate} rate.`,
  },
  {
    title: "Next 28 days credited free",
    body: "Studio E automatically credits your following 28-day cycle at 100% off. It’s a credit, not cash value.",
  },
  {
    title: "Street-style Latin dance instruction",
    body: "Salsa, Bachata, and more — taught for the social floor, not a stage routine.",
  },
  {
    title: "Community and social dance experience",
    body: "Build confidence and find your people in Humboldt Park on Paseo Boricua.",
  },
  {
    title: "Beginner-friendly environment",
    body: "No partner required. New dancers are welcome — show up ready to learn.",
  },
  {
    title: "English and Spanish support",
    body: "Where applicable, instructors and community support help you feel at home either way.",
  },
] as const

export const STEPS = [
  {
    title: "Purchase",
    body: `Claim the BOGO Gold Plan on this page for $${PRICING.goldRate}. New members only — one promotion per person.`,
  },
  {
    title: "Start your first 28 days",
    body: "Access starts immediately (through January 22 if you begin now). Text us to delay your start up to 30 days from purchase.",
  },
  {
    title: "Receive your free 28-day credit",
    body: "Studio E automatically credits your next 28-day cycle at 100% off. After that, Gold renews at $124 every 4 weeks unless you cancel before renewal.",
  },
] as const

/** Verbatim Google / site testimonials already used on Studio E landings. */
export const TESTIMONIALS = [
  {
    name: "Jose M.",
    quote:
      "Had a great experience at Studio E. Austin was very helpful and patient, this is a great opportunity for beginners and seasoned dancers to learn and improve their skills. Highly recommended!",
    link: "https://maps.app.goo.gl/9GS6sBGT2XaBC58LA",
    outcome: "Welcoming instructors · skill growth",
  },
  {
    name: "Sylvia K.",
    quote:
      "Studio E is an amazing place to learn to dance!! I was a complete beginner and Austin was able to get me to dancing salsa and bachata confidently in no time.",
    link: "https://maps.app.goo.gl/HPLEJRjhfzVNs5jp9",
    outcome: "Beginner → confident social dancer",
  },
  {
    name: "Emily G.",
    quote:
      "I love coming to Studio E! There’s so many fun classes and events to meet people at. The 28 day salsa challenge has helped me so much become a more confident social dancer. I can’t wait for summer and more salsa with Studio E.",
    link: "https://maps.app.goo.gl/SxfKnQnBZmfk67ua6",
    outcome: "Confidence · belonging · enjoyment",
  },
  {
    name: "Karla",
    quote:
      "The people I've met are absolutely amazing. They've become part of my chosen family. The classes are incredible, and I always leave having learned something new. The instructors create an environment where I feel comfortable asking questions, growing, and challenging myself.",
    link: SOCIAL.googleReviewsUrl,
    outcome: "Belonging · supportive community",
  },
  {
    name: "Janet Tan",
    quote:
      "What's different here is Austin. As the owner and founder, he's built something truly special: a welcoming, supportive community centered around Latin dance. Everyone is so friendly and encouraging, whether you're a total beginner or more advanced.",
    link: SOCIAL.googleReviewsUrl,
    outcome: "Welcoming · beginner-friendly",
  },
  {
    name: "Aisolis Ramos",
    quote:
      "I had the best time at Studio E! I went to a free class yesterday and brought a friend with me, and we both left smiling the whole way home. The atmosphere was welcoming, fun, and supportive.",
    link: SOCIAL.googleReviewsUrl,
    outcome: "Enjoyment · welcoming vibe",
  },
] as const

export const FAQS = [
  {
    question: "Who qualifies?",
    answer:
      "New Studio E members only. One Black Friday BOGO promotion per new member. Existing members are not eligible.",
  },
  {
    question: "What exactly is free?",
    answer:
      "Your next 28-day Gold Plan cycle is credited at 100% off. The free month is a Studio E credit, not cash value, and it is not transferable.",
  },
  {
    question: "When does the credit apply?",
    answer:
      "After you purchase, you pay for your first 28-day cycle. Studio E automatically applies the 100% credit to the following 28-day cycle.",
  },
  {
    question: "What happens after the free month?",
    answer:
      "Your Gold Plan renews after the second 28-day duration is complete at $124 every 4 weeks. If you need to cancel, send us a message before the membership renews.",
  },
  {
    question: "Do I need dance experience?",
    answer:
      "No. Studio E is beginner-friendly. Come ready to learn — no partner required.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes. There are no cancellation fees. Send us a message before your membership renews. We do not refund purchases after they are made.",
  },
  {
    question: "Can I combine this with another offer?",
    answer: `This offer is already combined with our initial first-class discount — Gold Plan is normally $${PRICING.goldRegular} per month; you lock in $${PRICING.goldRate} for life and get an additional free month. It cannot be combined with any other promotions.`,
  },
  {
    question: "When does my membership start?",
    answer:
      "It starts immediately. If you begin now, you’ll have access through January 22. You can text us to delay the start date up to 30 days from the date of purchase.",
  },
  {
    question: "When does this Black Friday offer end?",
    answer:
      "Friday, November 27, 2026 at 7:00 PM America/Chicago — 12 hours after the 7:00 AM launch. Only 20 passes are available. Must purchase through this page.",
  },
] as const

export const CONFIRMATION = {
  pageTitle: "BOGO Confirmed | Studio E Black Friday",
  headline: "You’re in — Black Friday BOGO confirmed",
  body: `Thanks for joining Studio E on the Gold Plan. You paid for your first 28 days ($${PRICING.goldRate}). Your next 28-day cycle will be credited 100% off automatically — that’s your free month (studio credit, not cash value).`,
  nextSteps: [
    "Watch for your checkout confirmation email/receipt.",
    "Access starts immediately (through January 22 if you begin now), or text us to delay up to 30 days from purchase.",
    "After your free credited month, Gold renews at $124 every 4 weeks unless you message us to cancel before renewal.",
    "Questions? Email studioelatindance@gmail.com or call (816) 419-6279.",
  ],
  staffNote: `Staff tag: ${STAFF_PROMO_TAG}`,
} as const
