/**
 * Chicago Latin Dance Youth Program landing.
 * Pricing mirrors /membership (Bronze / Gold); no first-class-free offer.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const PROGRAM = {
  name: "Chicago Latin Dance Youth Program",
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
} as const

export const ASSETS = {
  playing:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Youth/DSC05903.jpg",
  group:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Youth/DSC05911.jpg",
} as const

export const AGE_GROUPS = [
  {
    id: "littles",
    ages: "Ages 5–8",
    time: "4:00 – 5:00 PM",
    body: "Playful Latin rhythm, coordination, confidence, and community—built for younger dancers who learn best through movement and fun.",
  },
  {
    id: "juniors",
    ages: "Ages 9–14",
    time: "5:00 – 6:00 PM",
    body: "Stronger foundations in salsa, bachata, and Latin social dance—with room to grow technique, musicality, and self-expression.",
  },
] as const

export const PLANS = [
  {
    id: "bronze",
    name: "Bronze",
    regular: 119,
    price: 89,
    cadence: "every 4 weeks",
    href: "https://link.fastpaydirect.com/payment-link/6a8db4c6d6768df054447dd0",
    includes: [
      "4 classes every 4 weeks",
      "Exclusive member events",
      "Happy hour social access",
      "1 guest pass every 4 weeks",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    regular: 169,
    price: 124,
    cadence: "every 4 weeks",
    href: "https://link.fastpaydirect.com/payment-link/6a8db489f9c8c807930b9f2b",
    featured: true,
    includes: [
      "8 classes every 4 weeks",
      "Exclusive member events",
      "Happy hour social access",
      "1:1 weekly support",
      "1 guest pass every 4 weeks",
    ],
  },
] as const

export const COPY = {
  announcement: "AFTER-SCHOOL LATIN DANCE | AGES 5–14 | STUDIO E CHICAGO",
  heroHeadline: "Chicago Latin Dance Youth Program",
  heroSubheadline:
    "Give your child a joyful after-school place to move, make friends, and grow through Latin dance—right in the heart of Humboldt Park.",
  primaryCta: "ENROLL IN YOUTH PROGRAM",
  scheduleHeadline: "Two Age Groups. Two Perfect Hours.",
  scheduleBody:
    "Weekday afternoons at Studio E. Pick the class that matches your child’s age.",
  whyHeadline: "Why Families Choose Studio E",
  pricingHeadline: "Same Studio E Membership Pricing",
  pricingBody:
    "Youth classes use the same Bronze and Gold memberships as the rest of Studio E. Sign up before the first class to lock in the listed rate.",
  pricingNote: "Memberships renew every 4 weeks (28 days).",
  finalHeadline: "Ready For After-School Dance?",
  finalBody:
    "Enroll your dancer in the Chicago Latin Dance Youth Program and give them rhythm, confidence, and community.",
} as const

export const WHY_POINTS = [
  "Beginner-friendly Latin dance for kids and teens",
  "Age-appropriate classes so every dancer can thrive",
  "Confidence, coordination, and cultural connection",
  "A welcoming Studio E community in Humboldt Park",
  "No partner required to start",
] as const

export const FAQS = [
  {
    question: "What ages is the youth program for?",
    answer: "We have a class for ages 5–8 (4:00–5:00 PM) and a class for ages 9–14 (5:00–6:00 PM).",
  },
  {
    question: "Does my child need dance experience?",
    answer: "No. Classes are designed to welcome beginners and help them build from the fundamentals.",
  },
  {
    question: "Do they need a partner?",
    answer: "No. Dancers can come alone and learn with the group.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Youth classes use the same Studio E membership pricing as adult programs: Bronze at $89 every 4 weeks and Gold at $124 every 4 weeks when you sign up before the first class.",
  },
  {
    question: "Where is class?",
    answer: `Studio E, ${PROGRAM.addressLine}, ${PROGRAM.cityLine}, in ${PROGRAM.neighborhood}.`,
  },
] as const
