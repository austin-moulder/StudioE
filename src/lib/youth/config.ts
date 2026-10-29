/**
 * Chicago Latin Dance Youth Program landing.
 * Youth tuition: Bronze (1x/wk) / Gold (2x/wk), billed every 4 weeks for a 16-week session.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const YOUTH_TIME_ZONE = "America/Chicago" as const

const WEEKDAY_OFFSET: Record<string, number> = {
  Mon: 0,
  Tue: 1,
  Wed: 2,
  Thu: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
}

type ChicagoParts = {
  year: number
  month: number
  day: number
  weekday: string
}

function getChicagoParts(date: Date): ChicagoParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: YOUTH_TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(date)

  const map = Object.fromEntries(
    parts.filter((p) => p.type !== "literal").map((p) => [p.type, p.value])
  )

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    weekday: map.weekday,
  }
}

/**
 * Starting week Monday = Monday of the calendar week that contains
 * (current America/Chicago date + 14 days).
 */
export function getYouthStartMonday(now: Date = new Date()): Date {
  const today = getChicagoParts(now)
  const plusTwoWeeks = getChicagoParts(
    new Date(Date.UTC(today.year, today.month - 1, today.day + 14, 18, 0, 0))
  )
  const offset = WEEKDAY_OFFSET[plusTwoWeeks.weekday] ?? 0
  return new Date(
    Date.UTC(plusTwoWeeks.year, plusTwoWeeks.month - 1, plusTwoWeeks.day - offset, 18, 0, 0)
  )
}

export function formatYouthStartLabel(date: Date = getYouthStartMonday()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatYouthStartShort(date: Date = getYouthStartMonday()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  })
    .format(date)
    .toUpperCase()
}

export const PROGRAM = {
  name: "Chicago Latin Dance Youth Program",
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
  daysLabel: "Monday – Thursday",
  sessionWeeks: 16,
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
    time: "4:15 – 5:15 PM",
    body: "Playful Latin rhythm, coordination, confidence, and community—built for younger dancers who learn best through movement and fun.",
  },
  {
    id: "juniors",
    ages: "Ages 9–17",
    time: "5:15 – 6:15 PM",
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
    frequency: "1 class per week",
    href: "https://link.fastpaydirect.com/payment-link/6ab3f511baea3cadef54ed93",
    includes: [
      "1 class per week for the full 16-week session",
      "Come any Monday–Thursday—days don’t have to stay the same",
      "Miss a day? Make it up later that week or the next",
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
      "2 classes per week for the full 16-week session",
      "Come any Monday–Thursday—days don’t have to stay the same",
      "Miss a day? Make it up later that week or the next",
    ],
  },
] as const

export const CONTACT_FORM = {
  id: "ZgTxqbTAMAqPuL3ylojP",
  url: "https://api.leadconnectorhq.com/widget/form/ZgTxqbTAMAqPuL3ylojP",
  name: "Youth Program Info Request",
} as const

export function getYouthCopy(now: Date = new Date()) {
  const monday = getYouthStartMonday(now)
  const startLabel = formatYouthStartLabel(monday)
  const short = formatYouthStartShort(monday)
  return {
    startLabel,
    contactLink: "Have questions first? Get more info",
    contactHeadline: "Not Ready to Enroll Yet?",
    contactBody:
      "Leave your info and we’ll reach out to answer your questions about schedules, age groups, and getting your child started.",
    announcement: `STARTS ${short} · MONDAY–THURSDAY`,
    heroHeadline: "Chicago Latin Dance Youth Program",
    heroSubheadline: `Give your child a joyful after-school place to move, make friends, and grow through Latin dance—right in the heart of Humboldt Park. Classes officially start ${startLabel}, Monday through Thursday.`,
    primaryCta: "ENROLL IN YOUTH PROGRAM",
    scheduleHeadline: "Two Age Groups. Flexible Monday Through Thursday.",
    scheduleBody:
      "Classes run Monday–Thursday for each age group. Your child can come any of those days—it does not have to be the same day every week. If they are sick or out of town, make the class up later that week or the following week.",
    startHeadline: `Official Start: ${startLabel}`,
    startBody: `Classes start ${startLabel}, with rolling admission—join later and your child still gets the full number of classes.`,
    howItWorksHeadline: "How Enrollment Works",
    howItWorksBody: "Three simple steps from signup to first class.",
    whyHeadline: "Why Families Choose Studio E",
    pricingHeadline: "Youth Session Tuition",
    pricingBody:
      "Bronze is for 1×/week students. Gold is for 2×/week students. Tuition is simply for class time—so kids can grow confidence as dancers.",
    pricingNote:
      "Billed every 4 weeks at the rates below. Tuition covers the full 16-week session—this is a session commitment.",
    finalHeadline: "Ready For After-School Dance?",
    finalBody: `Enroll your dancer in the Chicago Latin Dance Youth Program—classes start ${startLabel}, with rolling admission. Come any Monday–Thursday that works.`,
  }
}

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Sign Up",
    body: "Choose Bronze or Gold and complete checkout. You can sign up for multiple children in one go.",
  },
  {
    step: "2",
    title: "Enroll Your Kids",
    body: "You’ll be sent to a short enrollment page to add each child’s info, preferred days of the week, and preferred start date.",
  },
  {
    step: "3",
    title: "Get Confirmed",
    body: "We’ll text you to confirm enrollment and your selected start date—then you’re set for class.",
  },
] as const

export const WHY_POINTS = [
  "Beginner-friendly Latin dance for kids and teens",
  "Age-appropriate classes so every dancer can thrive",
  "Confidence, coordination, and cultural connection",
  "Flexible Monday–Thursday schedule with make-up days",
  "No partner required to start",
] as const

export function getYouthFaqs(now: Date = new Date()) {
  const startLabel = formatYouthStartLabel(getYouthStartMonday(now))
  return [
    {
      question: "When do classes start?",
      answer: `Youth classes officially start ${startLabel}, with rolling admission. Join later and your child still gets the full number of classes for the session.`,
    },
    {
      question: "What happens after I sign up?",
      answer:
        "After checkout, you’ll go to an enrollment page to add each child’s info, preferred days of the week, and preferred start date. Then we’ll text you to confirm enrollment and your selected start date.",
    },
    {
      question: "What days can my child come?",
      answer:
        "Monday through Thursday. Your child can come on any of those days—it does not have to be the same weekday every week. Ages 5–8 meet 4:15–5:15 PM and ages 9–17 meet 5:15–6:15 PM.",
    },
    {
      question: "What if my child is sick or out of town?",
      answer:
        "Make the class up later that same week or the following week. You are not locked into one fixed weekday.",
    },
    {
      question: "What’s the difference between Bronze and Gold?",
      answer:
        "Bronze is for students who take 1 class per week. Gold is for students who take 2 classes per week. Both are billed every 4 weeks for the full 16-week session.",
    },
    {
      question: "How long is the commitment?",
      answer:
        "Tuition is priced every 4 weeks, but it covers a full 16-week session. Enrolling is a commitment for the entire session.",
    },
    {
      question: "What ages is the youth program for?",
      answer: "We have a class for ages 5–8 (4:15–5:15 PM) and a class for ages 9–17 (5:15–6:15 PM).",
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
      question: "Where is class?",
      answer: `Studio E, ${PROGRAM.addressLine}, ${PROGRAM.cityLine}, in ${PROGRAM.neighborhood}.`,
    },
  ]
}
