/**
 * Chicago Latin Dance Youth Program landing.
 * Primary conversion: Youth Program Info Request form.
 * Secondary: $89 deposit enrollment (Bronze/Gold monthly).
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const YOUTH_TIME_ZONE = "America/Chicago" as const

/** Official paid program start (January 1 following the free 2026 preview window). */
export const YOUTH_START = {
  year: 2027,
  month: 1,
  day: 1,
  label: "January 1",
  short: "JAN 1",
  yearLabel: "2027",
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

export const HERO_TAGS = ["Beginner-friendly", "No partner required"] as const

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

export const DEPOSIT = {
  price: 89,
  covers: "January classes",
  freePreviewNote:
    "All youth classes for the rest of 2026—until the January start—are FREE. Your $89 deposit covers January.",
} as const

export const PLANS = [
  {
    id: "bronze",
    name: "Bronze",
    regular: 119,
    price: 89,
    cadence: "every 4 weeks",
    frequency: "1 class per week",
    href: "https://link.fastpaydirect.com/payment-link/6ab3f511baea3cadef54ed93",
    includes: [
      "$89 deposit covers January classes",
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
    href: "https://link.fastpaydirect.com/payment-link/6ab3f553baea3cadef54ed96",
    includes: [
      "$89 deposit covers January, then continue on Gold monthly",
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
  announcement: `STARTS ${YOUTH_START.short} · FREE CLASSES THROUGH 2026 · TUE–THU`,
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
  pricingHeadline: "Enrollment Options",
  pricingBody:
    "Ready now? You can enroll immediately. Have questions first? Submit the form and we’ll help you choose.",
  pricingNote:
    "Both age groups perform in a showcase at the end of each 4-month block. Monthly billing every 4 weeks after the $89 January deposit.",
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
    title: "Choose your attendance pattern",
    body: "Pick the Tuesday–Thursday days that work for your family—days can flex week to week.",
  },
  {
    step: "4",
    title: "Pay the deposit and begin",
    body: "The earlier you start, the more free classes you get before January. Your $89 deposit covers January.",
  },
] as const

export const TRUST_POINTS = [
  "Age-appropriate instruction",
  "Beginner-friendly",
  "Consent and respectful partnering",
  "Flexible scheduling",
  "Humboldt Park location",
  "Showcase opportunity",
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
      "The $89 deposit covers January classes. Youth classes for the rest of 2026—until the January start—are free.",
  },
  {
    question: "What is the monthly price after the deposit?",
    answer:
      "After January, tuition continues monthly every 4 weeks. Bronze is $89 for 1 class per week. Gold is $124 for 2 classes per week.",
  },
  {
    question: "Is there a long-term commitment?",
    answer:
      "No. It’s monthly—every 4 weeks is one session. There is no 16-week lock-in.",
  },
  {
    question: "How does enrollment work?",
    answer:
      "Most parents start by submitting the info form so we can help with age group and schedule. If you’re ready now, you can pay the $89 deposit, then complete a short enrollment form for each child.",
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
