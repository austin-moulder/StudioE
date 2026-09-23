/**
 * Chicago Latin Dance Youth Program landing.
 * Youth tuition: Bronze (1x/wk) / Gold (2x/wk), billed every 4 weeks for a 16-week session.
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
  setupFeeWaiverDeadline: "October 5",
  setupFeeAmount: 100,
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

export const COPY = {
  announcement: "STARTS OCT 12 | SIGN UP BY OCT 5 · $100 SETUP FEE WAIVED",
  heroHeadline: "Chicago Latin Dance Youth Program",
  heroSubheadline:
    "Give your child a joyful after-school place to move, make friends, and grow through Latin dance—right in the heart of Humboldt Park. Classes officially start October 12, Monday through Thursday.",
  primaryCta: "ENROLL IN YOUTH PROGRAM",
  scheduleHeadline: "Two Age Groups. Flexible Monday Through Thursday.",
  scheduleBody:
    "Classes run Monday–Thursday for each age group. Your child can come any of those days—it does not have to be the same day every week. If they are sick or out of town, make the class up later that week or the following week.",
  startHeadline: "Official Start: October 12",
  startBody:
    "Students can enroll anytime in October and November before we begin cohort programming. Sign up by October 5 and we waive the $100 set-up fee.",
  whyHeadline: "Why Families Choose Studio E",
  pricingHeadline: "Youth Session Tuition",
  pricingBody:
    "Bronze is for 1×/week students. Gold is for 2×/week students. Tuition is simply for class time—so kids can grow confidence as dancers.",
  pricingNote:
    "Billed every 4 weeks at the rates below. Tuition covers the full 16-week session—this is a session commitment.",
  setupFeeNote: "Sign up by October 5 and we waive the $100 set-up fee.",
  finalHeadline: "Ready For After-School Dance?",
  finalBody:
    "Enroll your dancer in the Chicago Latin Dance Youth Program—classes start October 12. Come any Monday–Thursday that works, and lock in the waived set-up fee if you sign up by October 5.",
} as const

export const WHY_POINTS = [
  "Beginner-friendly Latin dance for kids and teens",
  "Age-appropriate classes so every dancer can thrive",
  "Confidence, coordination, and cultural connection",
  "Flexible Monday–Thursday schedule with make-up days",
  "No partner required to start",
] as const

export const FAQS = [
  {
    question: "When do classes start?",
    answer:
      "Youth classes officially start October 12. You can enroll anytime in October and November before we begin cohort programming. Sign up by October 5 and we waive the $100 set-up fee.",
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
    question: "Is there a set-up fee?",
    answer:
      "There is a $100 set-up fee. Sign up by October 5 and we waive it.",
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
] as const
