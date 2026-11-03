/**
 * Chicago Latin Dance Youth Program landing.
 * $89 deposit covers January. Monthly thereafter (every 4 weeks = 1 session).
 * Tue–Thu only. Free classes for the rest of 2026 until the January start.
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

export const AGE_GROUPS = [
  {
    id: "littles",
    ages: "Ages 5–12",
    time: "4:30 – 5:15 PM",
    body: "A warm, playful after-school class where younger dancers build rhythm, friendship, and respect for themselves and others—through Latin music and movement.",
    curriculumHeadline: "What they’ll learn",
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
    body: "A focused teen class that builds real social-dance foundations—plus strength, musicality, and the confidence to dance at socials and school events.",
    curriculumHeadline: "What they’ll learn",
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
      "1 class per week · billed monthly (every 4 weeks)",
      "Come any Tuesday–Thursday—days don’t have to stay the same",
      "Miss a day? Make it up later that week or the next",
      "Showcase performance at the end of each 4-month block",
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
      "Start with the $89 deposit for January, then continue on Gold monthly",
      "2 classes per week · billed monthly (every 4 weeks)",
      "Come any Tuesday–Thursday—days don’t have to stay the same",
      "Miss a day? Make it up later that week or the next",
      "Showcase performance at the end of each 4-month block",
    ],
  },
] as const

export const CONTACT_FORM = {
  id: "ZgTxqbTAMAqPuL3ylojP",
  url: "https://api.leadconnectorhq.com/widget/form/ZgTxqbTAMAqPuL3ylojP",
  name: "Youth Program Info Request",
} as const

export function getYouthCopy(_now: Date = new Date()) {
  const startLabel = formatYouthStartLabel()
  return {
    startLabel,
    contactLink: "Have questions first? Get more info",
    contactHeadline: "Not Ready to Enroll Yet?",
    contactBody:
      "Leave your info and we’ll reach out to answer your questions about schedules, age groups, and getting your child started.",
    announcement: `STARTS ${YOUTH_START.short} · FREE CLASSES THROUGH 2026 · TUE–THU`,
    heroHeadline: "Chicago Latin Dance Youth Program",
    heroSubheadline: `Give your child a joyful after-school place to move, make friends, and grow through Latin dance—right in the heart of Humboldt Park. Official start ${startLabel}. Classes for the rest of 2026 are free; a $89 deposit covers January.`,
    primaryCta: "ENROLL WITH $89 DEPOSIT",
    scheduleHeadline: "Two Age Groups. Tuesday Through Thursday.",
    scheduleBody:
      "Classes run Tuesday–Thursday for each age group. Your child can come any of those days—it does not have to be the same day every week. If they are sick or out of town, make the class up later that week or the following week.",
    startHeadline: `Official Start: ${startLabel}`,
    startBody: `Paid classes begin ${startLabel}. Until then, all remaining 2026 youth classes are free. Your $89 deposit holds their spot and covers January. After that, tuition continues monthly—every 4 weeks is one session.`,
    howItWorksHeadline: "How Enrollment Works",
    howItWorksBody: "Three simple steps from signup to first class.",
    whyHeadline: "Why Families Choose Studio E",
    pricingHeadline: "$89 Deposit · Monthly After January",
    pricingBody:
      "Pay $89 now to cover January. Classes for the rest of 2026 are free. After January, continue monthly—Bronze (1×/week) or Gold (2×/week). Every 4 weeks = one session. Month-to-month—no 16-week lock-in.",
    pricingNote:
      "Both age groups perform in a showcase at the end of each 4-month block.",
    finalHeadline: "Ready For After-School Dance?",
    finalBody: `Enroll your dancer with an $89 deposit that covers January. Free classes through the rest of 2026. Official start ${startLabel}. Come any Tuesday–Thursday that works.`,
  }
}

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Pay the $89 Deposit",
    body: "Secure January with a $89 deposit. Enjoy free youth classes for the rest of 2026 until the official start.",
  },
  {
    step: "2",
    title: "Enroll Your Kids",
    body: "You’ll be sent to a short enrollment page to add each child’s info, preferred days of the week, and preferred start date.",
  },
  {
    step: "3",
    title: "Get Confirmed",
    body: "We’ll text you to confirm enrollment—then you’re set for class on the Tuesday–Thursday schedule that works for your family.",
  },
] as const

export const WHY_POINTS = [
  "Beginner-friendly Latin dance for kids and teens",
  "Age-appropriate classes so every dancer can thrive",
  "Consent, respect, confidence, and cultural connection",
  "Flexible Tuesday–Thursday schedule with make-up days",
  "Showcase performance every 4 months",
  "No partner required to start",
] as const

export function getYouthFaqs(_now: Date = new Date()) {
  const startLabel = formatYouthStartLabel()
  return [
    {
      question: "When do classes start?",
      answer: `Official paid start is ${startLabel}. Youth classes for the rest of 2026—until January—are free. Your $89 deposit covers January classes.`,
    },
    {
      question: "What does the $89 deposit cover?",
      answer:
        "The $89 deposit covers January classes. After January, tuition continues monthly (every 4 weeks = one session). Month-to-month—you’re not locked into a 16-week commitment.",
    },
    {
      question: "What happens after I sign up?",
      answer:
        "After checkout, you’ll go to an enrollment page to add each child’s info and preferred days of the week. Then we’ll text you to confirm enrollment.",
    },
    {
      question: "What days can my child come?",
      answer:
        "Tuesday through Thursday. Your child can come on any of those days—it does not have to be the same weekday every week. Ages 5–12 meet 4:30–5:15 PM and ages 13–17 meet 5:15–6:15 PM.",
    },
    {
      question: "What if my child is sick or out of town?",
      answer:
        "Make the class up later that same week or the following week. You are not locked into one fixed weekday.",
    },
    {
      question: "What’s the difference between Bronze and Gold?",
      answer:
        "Bronze is 1 class per week. Gold is 2 classes per week. Both start with the $89 January deposit, then continue monthly every 4 weeks.",
    },
    {
      question: "How long is the commitment?",
      answer:
        "It’s monthly. Every 4 weeks is one session. There is no 16-week commitment—you can continue month to month.",
    },
    {
      question: "Is there a performance?",
      answer:
        "Yes. Both age groups have a showcase performance at the end of each 4-month block.",
    },
    {
      question: "What ages is the youth program for?",
      answer:
        "Ages 5–12 meet 4:30–5:15 PM. Ages 13–17 meet 5:15–6:15 PM.",
    },
    {
      question: "Does my child need dance experience?",
      answer:
        "No. Classes welcome beginners and build from the fundamentals—with age-appropriate curriculum for kids and teens.",
    },
    {
      question: "Do they need a partner?",
      answer: "No. Dancers can come alone and learn with the group.",
    },
    {
      question: "Where is class?",
      answer: `Studio E, ${PROGRAM.addressLine}, ${PROGRAM.cityLine}, in ${PROGRAM.neighborhood}.`,
    },
  ]
}
