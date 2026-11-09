/**
 * Chicago Latin Dance Youth Program landing.
 * Primary conversion: Youth Program Info Request form.
 * Secondary: $89 deposit (applied to January 2027). Free unlimited classes
 * for the rest of 2026. Next charge February 2, 2027 (Bronze or Gold).
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const YOUTH_TIME_ZONE = "America/Chicago" as const

/** Deposit applied to January 2027; next billing decision Feb 2, 2027. */
export const YOUTH_START = {
  year: 2027,
  month: 1,
  day: 1,
  label: "January 2027",
  short: "JAN 2027",
  yearLabel: "2027",
} as const

export const NEXT_BILLING = {
  label: "February 2, 2027",
  short: "Feb 2, 2027",
} as const

/** @deprecated Prefer YOUTH_START — kept for callers that still expect a Date. */
export function getYouthStartMonday(_now: Date = new Date()): Date {
  return new Date(Date.UTC(YOUTH_START.year, YOUTH_START.month - 1, YOUTH_START.day, 18, 0, 0))
}

export function formatYouthStartLabel(_date?: Date): string {
  return YOUTH_START.label
}

export function formatYouthStartShort(_date?: Date): string {
  return YOUTH_START.short
}

export const PROGRAM = {
  name: "Chicago Latin Dance Youth Program",
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
  daysLabel: "Tuesday – Thursday",
  sessionWeeks: 4,
  performanceBlockMonths: 4,
} as const

export const ASSETS = {
  playing:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Youth/DSC05903.jpg",
  group:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Youth/DSC05911.jpg",
} as const

export const HERO_FACTS = [
  { label: "Ages 5–12", value: "4:30 – 5:15 PM" },
  { label: "Ages 13–17", value: "5:15 – 6:15 PM" },
  { label: "Days", value: "Tuesday – Thursday" },
  { label: "Location", value: "2657 W Division St, Chicago" },
] as const

export const HERO_TAGS = [
  "Beginner-friendly",
  "No partner required",
  "Free classes for the rest of 2026",
] as const

export const AGE_GROUPS = [
  {
    id: "littles",
    ages: "Ages 5–12",
    time: "4:30 – 5:15 PM",
    body: "Playful after-school movement, rhythm, coordination, confidence, friendship, and respect.",
    curriculumHeadline: "Curriculum",
    curriculum: [
      "Socialization activities that help kids connect and feel welcome",
      "Mini consent training—asking, listening, and respecting boundaries",
      "How to respect your body and others on and off the dance floor",
      "Basic dance drills and rhythm drills set to Latin music",
      "Coordination, balance, and listening skills through games and movement",
      "Confidence and joy—no partner or experience required",
    ],
  },
  {
    id: "teens",
    ages: "Ages 13–17",
    time: "5:15 – 6:15 PM",
    body: "Latin social dance foundations, strength, musicality, partner connection, confidence, and self-expression.",
    curriculumHeadline: "Curriculum",
    curriculum: [
      "Beginning strength training and exercise for dancers",
      "All fundamentals for social dancing: salsa, bachata, cumbia, and merengue",
      "Timing, basic steps, partner connection, leading, and following",
      "Musicality and how to feel comfortable on a social dance floor",
      "Respectful partnering and clear communication with classmates",
      "Room to grow technique, stamina, and self-expression",
    ],
  },
] as const

/** Single FastPay link for the $89 youth deposit. */
export const DEPOSIT_URL =
  "https://link.fastpaydirect.com/payment-link/6af20709d4cfb789aef228d4" as const

export const DEPOSIT = {
  price: 89,
  covers: "January 2027",
  href: DEPOSIT_URL,
  freePreviewHeadline: "Free classes for the rest of 2026",
  freePreviewNote:
    "Pay an $89 deposit now—applied to January 2027. From today through the end of 2026, your child gets unlimited youth classes free while we build the program. That means really small class sizes and personalized attention. You will not be charged again until February 2, 2027, when you can choose the Bronze or Gold plan.",
} as const

/** Plans parents choose starting February 2, 2027 — not charged at deposit. */
export const PLANS = [
  {
    id: "bronze",
    name: "Bronze",
    regular: 119,
    price: 89,
    cadence: "every 4 weeks",
    frequency: "1 class per week",
    includes: [
      "1 class per week",
      "Monthly billing every 4 weeks",
      "Make-up flexibility across Tuesday–Thursday",
      "Showcase every 4-month block",
      "No 16-week lock-in",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    regular: 169,
    price: 124,
    cadence: "every 4 weeks",
    frequency: "2 classes per week",
    featured: true,
    includes: [
      "2 classes per week",
      "Monthly billing every 4 weeks",
      "Make-up flexibility across Tuesday–Thursday",
      "Showcase every 4-month block",
      "No 16-week lock-in",
    ],
  },
] as const

export const CONTACT_FORM = {
  id: "ZgTxqbTAMAqPuL3ylojP",
  url: "https://api.leadconnectorhq.com/widget/form/ZgTxqbTAMAqPuL3ylojP",
  name: "Youth Program Info Request",
} as const

export const COPY = {
  announcement: `FREE CLASSES FOR THE REST OF 2026 · $89 DEPOSIT → JAN 2027 · NEXT CHARGE ${NEXT_BILLING.short.toUpperCase()}`,
  heroHeadline: "Give Your Child a Place to Move, Make Friends, and Grow.",
  heroSubheadline:
    "Beginner-friendly Latin dance classes for kids and teens in Humboldt Park, with flexible Tuesday–Thursday scheduling and age-appropriate instruction.",
  primaryCta: "Get Youth Program Details",
  secondaryCta: "Enroll With the $89 Deposit",
  formHeadline: "Youth Program Info Request",
  formBody:
    "Have questions about age groups, schedules, or getting started? Leave your information and we’ll text or call you shortly.",
  offerHeadline: "Two Age Groups. Clear Schedules.",
  offerBody: "Age-appropriate Latin dance after school—built for kids and teens.",
  howHeadline: "How It Works",
  howBody: "Start with a short form. We’ll help you choose the right fit.",
  pricingHeadline: "Free for the Rest of 2026",
  pricingBody:
    "Parents pay an $89 deposit for their child, applied to January 2027. Between now and then, your child has unlimited access to youth classes—for free—while we build the program. Expect really small class sizes and personalized attention.",
  pricingNote: `You will not be charged again until ${NEXT_BILLING.label}, when you can decide to continue on the Gold or Bronze plan.`,
  plansHeadline: "Plans starting February 2027",
  plansBody: `On ${NEXT_BILLING.label}, choose Bronze (1×/week) or Gold (2×/week). Until then, the $89 deposit is all you pay.`,
  trustHeadline: "What Parents Want to Know",
  finalHeadline: "Still Have Questions?",
  finalBody:
    "Submit the short form and Studio E will help you get your child started—age group, schedule, and next steps.",
  contactNav: "Contact",
} as const

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Submit the short form",
    body: "Share your info so we can reach you quickly about the youth program.",
  },
  {
    step: "2",
    title: "Speak with Studio E",
    body: "We’ll talk through age group, schedule, and what fits your child best.",
  },
  {
    step: "3",
    title: "Pay the $89 deposit",
    body: "Your deposit is applied to January 2027. Free unlimited youth classes for the rest of 2026 while we build—small groups, personalized attention.",
  },
  {
    step: "4",
    title: "Choose Bronze or Gold later",
    body: `No charge again until ${NEXT_BILLING.label}. Then decide whether to continue on Bronze or Gold.`,
  },
] as const

export const TRUST_POINTS = [
  "Free unlimited classes for the rest of 2026",
  "Small class sizes & personalized attention while we build",
  "Age-appropriate instruction",
  "Beginner-friendly · consent & respectful partnering",
  "Flexible Tuesday–Thursday scheduling",
  "Humboldt Park location · showcase every 4 months",
] as const

export const FAQS = [
  {
    question: "What ages are accepted?",
    answer:
      "Ages 5–12 and ages 13–17. Each group has its own class time so instruction stays age-appropriate.",
  },
  {
    question: "What time does each age group meet?",
    answer: "Ages 5–12 meet 4:30–5:15 PM. Ages 13–17 meet 5:15–6:15 PM.",
  },
  {
    question: "Which days can my child attend?",
    answer:
      "Tuesday through Thursday. Your child can come on any of those days—it does not have to be the same weekday every week.",
  },
  {
    question: "Does my child need dance experience?",
    answer:
      "No. Classes are beginner-friendly and built around age-appropriate fundamentals.",
  },
  {
    question: "Does my child need a partner?",
    answer: "No. Dancers can come alone and learn with the group.",
  },
  {
    question: "What happens if my child misses class?",
    answer:
      "Make the class up later that same week or the following week on another Tuesday, Wednesday, or Thursday.",
  },
  {
    question: "What does the deposit cover?",
    answer:
      "The $89 deposit is applied to January 2027. For the rest of 2026, your child gets unlimited youth classes free while we build the program—small class sizes and personalized attention.",
  },
  {
    question: "Are classes really free for the rest of 2026?",
    answer:
      "Yes. After the $89 deposit, there is no additional charge until February 2, 2027. Between now and then, attendance is unlimited and free.",
  },
  {
    question: "When will I be charged again?",
    answer: `Not until ${NEXT_BILLING.label}. Then you can choose the Bronze plan ($89 every 4 weeks, 1 class/week) or the Gold plan ($124 every 4 weeks, 2 classes/week).`,
  },
  {
    question: "What is the monthly price after the deposit?",
    answer:
      "Nothing until February 2, 2027. Starting then, Bronze is $89 every 4 weeks (1 class/week) and Gold is $124 every 4 weeks (2 classes/week).",
  },
  {
    question: "Is there a long-term commitment?",
    answer:
      "No. After February 2027, plans are monthly—every 4 weeks is one session. There is no 16-week lock-in.",
  },
  {
    question: "How does enrollment work?",
    answer:
      "Most parents start by submitting the info form so we can help with age group and schedule. If you’re ready now, pay the $89 deposit, then complete a short enrollment form for each child.",
  },
  {
    question: "What should my child wear?",
    answer:
      "Comfortable clothes they can move in, and shoes they can dance in. Avoid heavy outdoor boots; sneakers or dance shoes work well.",
  },
  {
    question: "How do I ask questions before enrolling?",
    answer:
      "Submit the Youth Program Info Request form on this page. We’ll text or call you shortly to help you get started.",
  },
] as const

/** Compatibility helpers for older imports. */
export function getYouthCopy() {
  return {
    ...COPY,
    startLabel: formatYouthStartLabel(),
    contactLink: COPY.primaryCta,
    contactHeadline: COPY.formHeadline,
    contactBody: COPY.formBody,
  }
}

export function getYouthFaqs() {
  return FAQS
}

export const WHY_POINTS = TRUST_POINTS
