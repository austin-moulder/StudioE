/**
 * Weekend Salsa & Bachata landing — single source of truth.
 */

export const CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6ab18d50f426560dbc2f17f3" as const

export const META_PIXEL_ID = "1976276599649833" as const

export const OFFER = {
  name: "Saturday Salsa and Bachata",
  firstClassPrice: 15,
  classBlock: "11AM to 1PM",
  day: "Saturday",
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park",
} as const

export const ASSETS = {
  hero: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/Wide_group.jpg",
  classEnergy:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05837.jpg",
  social: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05316.jpg",
} as const

export const MEMBERSHIPS = [
  {
    id: "bronze",
    name: "Bronze",
    price: 89,
    cadence: "every 4 weeks",
    cta: "START WITH ONE CLASS",
    featured: false,
    includes: [
      "One Saturday class each week",
      "Choose Salsa or Bachata",
      "2 rollover classes if you miss a Saturday",
      "Your $15 first-class payment can be applied toward membership",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: 124,
    cadence: "every 4 weeks",
    cta: "START WITH BOTH CLASSES",
    featured: true,
    includes: [
      "Both Saturday classes each week",
      "Salsa and Bachata",
      "4 rollover classes if you miss a Saturday",
      "Your $15 first-class payment can be applied toward membership",
    ],
  },
] as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "weekend_salsa_bachata",
} as const

export const COPY = {
  announcement: "SATURDAY CLASSES | SALSA + BACHATA | BEGINNER-FRIENDLY",
  heroHeadline: "Your Weekend Just Got More Fun.",
  heroSubheadline:
    "Learn Salsa and Bachata at Studio E every Saturday from 11AM to 1PM. No partner required. No weekday evenings needed. Start with your first class for just $15, then roll that payment into your Studio E membership.",
  primaryCta: "TRY YOUR FIRST CLASS FOR $15",
  claimCta: "CLAIM MY $15 FIRST CLASS",
  stickyCta: "Try Your First Class For $15",
  ctaMicro: "Your $15 is credited toward membership.",
  twoWaysHeadline: "One Saturday. Two Ways To Dance.",
  twoWaysNote: "Choose one class or take both during the same Saturday block.",
  howHeadline: "How The Weekend Program Works",
  membershipHeadline: "Choose Your Membership",
  rolloverHeadline: "Your Classes Do Not Disappear If You Miss A Saturday.",
  rolloverBody:
    "Life happens. That is why Studio E includes rollover classes. Bronze members receive 2 rollover classes, and Gold members receive 4 rollover classes. You can keep learning without feeling like you wasted your membership.",
  forYouHeadline: "This Is For You If...",
  expectHeadline: "What To Expect On Saturday",
  firstClassHeadline: "Start With Your First Class For $15",
  firstClassBody:
    "You do not need to commit before you know if Studio E is right for you. Come experience a Saturday class for $15. If you decide to continue, that $15 rolls directly into your Bronze or Gold membership.",
  finalHeadline: "Make Saturday Your Dance Day.",
  finalBody:
    "Try your first class for $15, find your rhythm, and decide whether Salsa, Bachata, or both belong in your weekend routine.",
  disclaimer:
    "Class availability and membership terms are subject to Studio E’s current schedule and policies.",
} as const

export const HERO_POINTS = [
  "Saturday mornings from 11AM to 1PM",
  "Learn Salsa, Bachata, or both",
  "Beginner-friendly instruction",
  "No partner required",
  "Miss a Saturday? Use your rollover classes.",
] as const

export const CLASS_CARDS = [
  {
    name: "Salsa",
    body: "Learn the fundamentals, rhythm, timing, partner connection, and patterns you need to start dancing socially.",
  },
  {
    name: "Bachata",
    body: "Build your rhythm, footwork, body movement, and partner connection in a welcoming environment.",
  },
] as const

export const HOW_IT_WORKS = [
  {
    title: "Start with your $15 first class",
    body: "Come try Salsa, Bachata, or both and experience the Studio E community.",
  },
  {
    title: "Choose your membership",
    body: "Select one class or both classes every 4 weeks.",
  },
  {
    title: "Keep building your skills",
    body: "Attend consistently, practice with different partners, and grow your confidence over time.",
  },
] as const

export const FOR_YOU_IF = [
  "You cannot make weekday evening classes",
  "You want a consistent weekend activity",
  "You are a complete beginner",
  "You want to learn without bringing a partner",
  "You want to meet people through music and movement",
  "You want Salsa, Bachata, or both",
] as const

export const EXPECT = [
  "Friendly instruction",
  "Clear, progressive fundamentals",
  "Partner rotation so nobody gets left out",
  "A welcoming environment",
  "Options for different experience levels",
  "Two hours of dancing, learning, and community",
] as const

export const FAQS = [
  {
    question: "Do I need a partner?",
    answer:
      "No. You can come alone. We rotate partners throughout class so everyone gets to learn and practice.",
  },
  {
    question: "Do I need dance experience?",
    answer:
      "No. The weekend program is designed to welcome beginners and help you build from the fundamentals.",
  },
  {
    question: "Can I take only Salsa or only Bachata?",
    answer: "Yes. Bronze includes one class. Gold includes both Salsa and Bachata.",
  },
  {
    question: "What happens if I miss a Saturday?",
    answer: "Bronze includes 2 rollover classes. Gold includes 4 rollover classes.",
  },
  {
    question: "Can I apply the $15 toward membership?",
    answer: "Yes. Your $15 first-class payment can be rolled into your Studio E membership.",
  },
  {
    question: "What should I wear?",
    answer:
      "Wear comfortable clothing that allows you to move. Bring supportive shoes that are easy to dance in.",
  },
  {
    question: "Where is Studio E located?",
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
