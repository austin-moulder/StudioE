/**
 * Chicago Latin Dance Youth Program landing.
 * Youth tuition uses Bronze (1x/wk) / Gold (2x/wk) rates billed every 4 weeks
 * for a 16-week session. Adult perks (guest passes, events, happy hour) do not apply.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const PROGRAM = {
  name: "Chicago Latin Dance Youth Program",
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
  startDateLabel: "October 12",
  daysLabel: "Monday – Thursday",
  enrollmentWindow: "October and November",
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
    ages: "Ages 9–14",
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
    href: "https://link.fastpaydirect.com/payment-link/6a8db4c6d6768df054447dd0",
    includes: [
      "1 class per week for the full 16-week session",
      "Pick the weekday that fits your child’s schedule",
      "Built for growing confidence as kids and dancers",
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
    href: "https://link.fastpaydirect.com/payment-link/6a8db489f9c8c807930b9f2b",
    includes: [
      "2 classes per week for the full 16-week session",
      "Pick the 2 weekdays that fit your child’s schedule",
      "Built for growing confidence as kids and dancers",
    ],
  },
] as const

export const COPY = {
  announcement: "STARTS OCT 12 | MON–THU · PICK 1–2 DAYS | AGES 5–14",
  heroHeadline: "Chicago Latin Dance Youth Program",
  heroSubheadline:
    "Give your child a joyful after-school place to move, make friends, and grow through Latin dance—right in the heart of Humboldt Park. Classes officially start October 12, Monday through Thursday.",
  primaryCta: "ENROLL IN YOUTH PROGRAM",
  scheduleHeadline: "Two Age Groups. Monday Through Thursday.",
  scheduleBody:
    "We offer class four days a week for each age group. Parents pick the 1–2 days that best fit their child’s busy schedule.",
  startHeadline: "Official Start: October 12",
  startBody:
    "Students can enroll anytime in October and November before we begin cohort programming. Jump in when you’re ready—spots fill as families lock in their after-school routine.",
  whyHeadline: "Why Families Choose Studio E",
  pricingHeadline: "Youth Session Tuition",
  pricingBody:
    "Bronze is for 1×/week students. Gold is for 2×/week students. You’re simply paying for class time so kids can grow confidence as dancers—youth enrollment does not include adult guest passes, member events, or happy hour social access.",
  pricingNote:
    "Billed every 4 weeks at the rates below. Tuition covers the full 16-week session—this is a session commitment.",
  finalHeadline: "Ready For After-School Dance?",
  finalBody:
    "Enroll your dancer in the Chicago Latin Dance Youth Program—classes start October 12. Pick 1 or 2 days that fit, Monday through Thursday.",
} as const

export const WHY_POINTS = [
  "Beginner-friendly Latin dance for kids and teens",
  "Age-appropriate classes so every dancer can thrive",
  "Confidence, coordination, and cultural connection",
  "Flexible 1–2 days per week around busy schedules",
  "No partner required to start",
] as const

export const FAQS = [
  {
    question: "When do classes start?",
    answer:
      "Youth classes officially start October 12. You can enroll anytime in October and November before we begin cohort programming.",
  },
  {
    question: "What days are youth classes?",
    answer:
      "Monday through Thursday—four class days available each week per age group. Parents choose the 1–2 days that best fit their child’s schedule. Ages 5–8 meet 4:15–5:15 PM and ages 9–14 meet 5:15–6:15 PM.",
  },
  {
    question: "What’s the difference between Bronze and Gold?",
    answer:
      "Bronze is for students who take 1 class per week. Gold is for students who take 2 classes per week. Both are billed every 4 weeks for the full 16-week session.",
  },
  {
    question: "Do youth plans include guest passes or member events?",
    answer:
      "No. Youth tuition is just for class—1 or 2 days per week to help kids grow confidence as dancers. Adult perks like guest passes, member events, and happy hour social access do not apply.",
  },
  {
    question: "How long is the commitment?",
    answer:
      "Tuition is priced every 4 weeks, but it covers a full 16-week session. Enrolling is a commitment for the entire session.",
  },
  {
    question: "What ages is the youth program for?",
    answer: "We have a class for ages 5–8 (4:15–5:15 PM) and a class for ages 9–14 (5:15–6:15 PM).",
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
] as const
