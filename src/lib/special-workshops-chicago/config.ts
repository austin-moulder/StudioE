/**
 * Studio E Chicago specialty workshops — /special-workshops-chicago
 * Non-recurring December Christmas series. Shared workshop-pass checkout.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const CHECKOUT_URL =
  "https://studioe-danceclassestraining.com/specialty-workshops" as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "specialty_workshops_chicago_xmas",
} as const

export const VENUE = {
  name: "Studio E",
  addressLine: "2659 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=2659+W+Division+St,+Chicago,+IL+60622&output=embed",
} as const

/** First workshop of the series — used for countdown. */
export const SERIES_START_MS = Date.parse("2026-12-03T20:30:00-06:00")

export const WORKSHOPS = [
  {
    id: "wepa-wonderland",
    title: "Wepa Wonderland",
    subtitle: "Adv. Wepa Musicality Workshop",
    tags: "Wepa · Cumbia · Advanced · Xmas",
    dateLabel: "Thursday, December 3rd",
    timeLabel: "8:30 – 10:00 PM",
    startMs: Date.parse("2026-12-03T20:30:00-06:00"),
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Wepa_Wonderland.png",
    flyerAlt: "Wepa Wonderland — advanced wepa musicality workshop flyer, December 3 at Studio E",
  },
  {
    id: "unwrap-the-rhythm",
    title: "Unwrap the Rhythm",
    subtitle: "Adv. Bachata Musicality Workshop",
    tags: "Bachata · Advanced · Xmas",
    dateLabel: "Thursday, December 10th",
    timeLabel: "8:30 – 10:00 PM",
    startMs: Date.parse("2026-12-10T20:30:00-06:00"),
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Unwrap_Rhythm.png",
    flyerAlt:
      "Unwrap the Rhythm — advanced bachata musicality workshop flyer, December 10 at Studio E",
  },
  {
    id: "salsa-shines-santa",
    title: "Salsa Shines with Santa",
    subtitle: "Advanced Salsa On 1 Workshop",
    tags: "Salsa · On 1 · Advanced · Xmas",
    dateLabel: "Thursday, December 17th",
    timeLabel: "8:30 – 10:00 PM",
    startMs: Date.parse("2026-12-17T20:30:00-06:00"),
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Salsa_Shines_Santa.png",
    flyerAlt:
      "Salsa Shines with Santa — advanced salsa On 1 workshop flyer, December 17 at Studio E",
  },
] as const

export type SpecialtyWorkshop = (typeof WORKSHOPS)[number]

export const PROCESS = {
  headline: "How it works",
  steps: [
    {
      title: "Explore the workshops",
      body: "Browse this month’s Christmas specialty nights and pick the one you want to attend.",
    },
    {
      title: "Purchase a workshop pass",
      body: "Checkout below. One specialty workshop pass covers your spot for the series night you choose.",
    },
    {
      title: "Reply to your confirmation",
      body: "Respond to the confirmation message with your preferred workshop and the friend you’d like to bring.",
    },
  ],
} as const

export const COPY = {
  pageTitle: "Christmas Specialty Workshops | Studio E Chicago",
  metaDescription:
    "Three advanced Christmas specialty workshops at Studio E Chicago — Dec 3, 10, and 17, 8:30–10 PM. Purchase a workshop pass, then reply with your preferred night and the friend you’d like to bring.",
  heroEyebrow: "Studio E · Chicago",
  accentLabel: "Christmas Series",
  heroHeadline: "Three Christmas Nights. Three Specialty Workshops.",
  heroSubheadline:
    "Advanced Wepa, Bachata, and Salsa On 1 — Thursdays in December, 8:30–10 PM at Studio E.",
  primaryCta: "Get Your Workshop Pass",
  secondaryCta: "See the Workshops",
  stickyCta: "Get Your Workshop Pass",
  workshopsHeadline: "This December at Studio E",
  workshopsBody: "All three nights run 8:30–10:00 PM. Choose the workshop that fits your style.",
  checkoutHeadline: "Get your workshop pass",
  checkoutHelper:
    "After checkout, reply to your confirmation with your preferred workshop and the friend you’d like to bring.",
  locationHeadline: "Where we dance",
  faqHeadline: "FAQ",
  finalHeadline: "Pick your Christmas night. Bring your people.",
  finalBody:
    "Grab a workshop pass, tell us which night you want, and reply with the friend you’re bringing.",
  countdownEnded: "Workshop night is here.",
  flyerHeroAlt: WORKSHOPS[0].flyerAlt,
} as const

export const FAQS = [
  {
    question: "What’s included with a workshop pass?",
    answer:
      "A specialty workshop pass lets you attend one of the listed Christmas workshops. After you purchase, reply to your confirmation with your preferred workshop and the friend you’d like to bring.",
  },
  {
    question: "How do I choose which workshop I attend?",
    answer:
      "Explore the three nights on this page, purchase your pass, then respond to the confirmation message with the workshop you want.",
  },
  {
    question: "Can I bring a friend?",
    answer:
      "Yes. After checkout, reply to your confirmation with the friend you’d like to bring so we can check you both in.",
  },
  {
    question: "What level are these workshops?",
    answer:
      "These are advanced specialty workshops — Wepa musicality, Bachata musicality, and Salsa On 1 shines.",
  },
  {
    question: "When and where?",
    answer:
      "Thursdays December 3, 10, and 17 from 8:30–10:00 PM at Studio E, 2659 W Division St, Chicago, IL (Humboldt Park).",
  },
  {
    question: "What should I wear?",
    answer: "Comfortable clothes you can move in and shoes you can dance in.",
  },
] as const
