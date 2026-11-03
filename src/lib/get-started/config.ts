/**
 * Config for /get-started — $39 Founder Private landing.
 */

export const CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6aea178900921ddbe8ee16db" as const

export const UTM = {
  utm_source: "get_started",
  utm_medium: "landing",
  utm_campaign: "founder_private_39",
} as const

export const PRICING = {
  regular: 150,
  sale: 39,
  savings: 111,
  savingsPercentLabel: "74% off",
  duration: "60-minute private lesson",
} as const

export const LOCATION = {
  line: "2657 W Division Street, Chicago, IL 60622",
  short: "2657 W Division St · Humboldt Park",
  neighborhood: "Humboldt Park · Paseo Boricua",
} as const

const CHALLENGE_ASSET_BASE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/28-day-challenge" as const

const VIBES_BASE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes" as const

export const IMAGES = {
  hero: `${CHALLENGE_ASSET_BASE}/DSC05745.jpg`,
  practice: `${CHALLENGE_ASSET_BASE}/DSC05764%20(1).jpg`,
  community: `${CHALLENGE_ASSET_BASE}/IMG_2657.JPG`,
  vibes: [
    {
      src: `${VIBES_BASE}/DSC05448.jpg`,
      alt: "Dancers smiling and dancing together at Studio E",
    },
    {
      src: `${VIBES_BASE}/IMG_1101.JPG`,
      alt: "Studio E instructor teaching Latin dance",
    },
    {
      src: `${VIBES_BASE}/DSC05366.jpg`,
      alt: "Studio E community on the dance floor",
    },
  ],
} as const

export const VIDEO_EMBED = "https://www.youtube.com/embed/-q-yfv1YEI0" as const

export const COPY = {
  brand: "Studio E",
  pageTitle: "First Private Dance Lesson for $39 | Studio E Chicago",
  metaDescription:
    "Get a 60-minute private dance lesson at Studio E for $39 (normally $150). Beginner-friendly, no partner required. Humboldt Park, Chicago.",
  positioning: "Your fastest way to stop feeling lost on the dance floor.",
  heroHeadline: "Get Your First Private Dance Lesson for $39.",
  heroSubheadline:
    "Get 60 minutes of personalized dance instruction at Studio E, normally $150. Start with a private lesson built around your goals, your level, and the kind of dancing you actually want to do.",
  primaryCta: "Claim My $39 Private",
  stickyCta: "Claim My $39 Private",
  trustMicrocopy:
    "Secure checkout. After purchase, reply with 2–3 times that work for you next week and which dance you'd like to learn: salsa, bachata, cumbia, merengue, chacha, twerk, afrocuban, reggaeton.",
  valueHeadline: "Why start with a private",
  stepsHeadline: "How it works",
  whoHeadline: "Who this is for",
  topicsHeadline: "What you can work on",
  proofHeadline: "Chicago’s Latin social dance community",
  proofBody:
    "Confidence through movement. Belonging before perfection. Street-style Latin social dancing in Humboldt Park.",
  scarcityHeadline: "Privates Available This Month",
  scarcityLine: (n: number) => `Only ${n} of 20 Privates Remaining`,
  rolloverEyebrow: "Bonus if you continue",
  rolloverHeadline: "Your $39 private can roll into the 28-Day Challenge",
  rolloverBody:
    "After your private, we’ll show you the next best path if you want to keep progressing. If you enroll in the 28-Day Challenge under the current terms, your $39 private can be credited toward that purchase.",
  finalHeadline: "Stop Waiting to Feel Comfortable Dancing.",
  finalSubheadline:
    "Start with one focused private lesson and leave knowing exactly what to work on next.",
} as const

export const VALUE_CARDS = [
  {
    title: "Personalized instruction",
    body: "One-on-one attention focused on your goals, level, and pace.",
  },
  {
    title: "Learn what you actually want",
    body: "Pick the style and skills that matter to you — not a one-size-fits-all curriculum.",
  },
  {
    title: "Build confidence faster",
    body: "Clarify the basics so group classes and socials feel less overwhelming.",
  },
  {
    title: "No partner or experience required",
    body: "Come solo. Beginners are welcome. We’ll meet you where you are.",
  },
] as const

export const STEPS = [
  {
    title: "Purchase your Founder Private",
    body: "Secure your $39 lesson through checkout below. Scheduling comes after payment.",
  },
  {
    title: "Reply with 2–3 available times",
    body: "After purchase, reply with times that work for you during the following week.",
  },
  {
    title: "Reply with your preferred topic",
    body: "Choose what you want to work on: salsa, bachata, cumbia, merengue, chacha, twerk, reggaeton, heels, or styling.",
  },
  {
    title: "Show up and begin your dance journey",
    body: "Arrive at Studio E ready for 60 minutes of focused, personalized instruction.",
  },
] as const

export const WHO_FOR = [
  "Complete beginners",
  "People who feel awkward in group classes",
  "Students who want faster progress",
  "Couples or solo dancers",
  "People preparing for socials, dates, events, or travel",
] as const

export const TOPICS = [
  "Salsa",
  "Bachata",
  "Cumbia",
  "Merengue",
  "Cha-cha",
  "Timing and rhythm",
  "Basic steps",
  "Partner connection",
  "Leading or following",
  "Confidence on the social dance floor",
] as const

export const TESTIMONIALS = [
  {
    name: "Jose M.",
    quote:
      "Had a great experience at Studio E. Austin was very helpful and patient, this is a great opportunity for beginners and seasoned dancers to learn and improve their skills. Highly recommended!",
  },
  {
    name: "Sylvia K.",
    quote:
      "Studio E is an amazing place to learn to dance!! I was a complete beginner and Austin was able to get me to dancing salsa and bachata confidently in no time.",
  },
  {
    name: "Emily G.",
    quote:
      "I love coming to Studio E! There’s so many fun classes and events to meet people at. The 28 day salsa challenge has helped me so much become a more confident social dancer.",
  },
] as const

export const FAQS = [
  {
    question: "Is this really only $39?",
    answer:
      "Yes. This Founder Private is $39 for a full 60-minute private dance lesson at Studio E.",
  },
  {
    question: "What is the normal price?",
    answer: "A standard 60-minute private lesson at Studio E is $150. This Founder offer is $39.",
  },
  {
    question: "Do I need a partner?",
    answer:
      "You do not need a partner. If you want to sign up with someone else, it's the same price — just $39 total.",
  },
  {
    question: "What styles can I learn?",
    answer:
      "You can request salsa, bachata, cumbia, merengue, cha-cha, twerk, afrocuban, reggaeton, heels, styling, and related fundamentals like timing, basic steps, partner connection, leading, or following.",
  },
  {
    question: "I have never danced before. Is this for me?",
    answer:
      "Yes. This private is beginner-friendly and built around your level. No experience required.",
  },
  {
    question: "How do I schedule after purchasing?",
    answer:
      "After checkout, reply with 2–3 available times during the following week and which dance you'd like to learn. We’ll confirm your lesson from there.",
  },
  {
    question: "When will I hear from Studio E?",
    answer:
      "After you purchase, you’ll receive instructions to reply with your availability and preferred topic so we can book your private.",
  },
  {
    question: "Can I use the $39 toward the 28-Day Challenge?",
    answer:
      "After your private, we’ll show you the next best path if you want to keep progressing. If you enroll in the 28-Day Challenge under the current terms, your $39 private can be credited toward that purchase. You’re never obligated to enroll.",
  },
  {
    question: "Where is Studio E located?",
    answer: "Studio E is at 2657 W Division Street, Chicago, IL 60622 (Humboldt Park / Paseo Boricua).",
  },
  {
    question: "What happens if I need to reschedule?",
    answer:
      "Private appointments and lessons follow a 24-hour reschedule policy. A reschedule requested within 24 hours of the appointment start will not be honored, and the private will be forfeited.",
  },
] as const

export const CAPACITY = {
  total: 20,
  minDisplay: 2,
  maxDisplay: 6,
  storageKey: "studioe_get_started_privates_v1",
} as const
