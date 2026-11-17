/**
 * Studio E Chicago specialty workshops — /special-workshops-chicago
 * Non-recurring December Christmas series. Shared $30 workshop ticket checkout.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const CHECKOUT_URL =
  "https://studioe-danceclassestraining.com/specialty-workshops" as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "specialty_workshops_chicago_xmas",
} as const

export const PRICING = {
  ticket: 30,
  friendFree: true,
  capacityPerWorkshop: 20,
} as const

export const VENUE = {
  name: "Studio E",
  addressLine: "2659 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=2659+W+Division+St,+Chicago,+IL+60622&output=embed",
  mapsLink:
    "https://www.google.com/maps/place/Studio+E/@41.90265,-87.69418,17z/data=!4m6!3m5!1s0x880fd33a872cc87d:0xeecb5e416ff48003!8m2!3d41.90265!4d-87.69418!16s%2Fg%2F11l6v0xqk0",
} as const

export const SOCIAL = {
  instagramUrl: "https://www.instagram.com/the_studio_e/",
  instagramHandle: "@the_studio_e",
  googleReviewsUrl:
    "https://www.google.com/maps/place/Studio+E/@41.90265,-87.69418,17z/data=!4m6!3m5!1s0x880fd33a872cc87d:0xeecb5e416ff48003!8m2!3d41.90265!4d-87.69418!16s%2Fg%2F11l6v0xqk0",
  googleRating: 4.9,
  googleReviewCount: 73,
} as const

/** First workshop of the series — used for countdown. */
export const SERIES_START_MS = Date.parse("2026-12-03T20:30:00-06:00")

const VIBES =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes" as const

export const ASSETS = {
  instructor:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Accelerator.jpg",
  gallery: [
    {
      src: `${VIBES}/DSC05448.jpg`,
      alt: "Dancers smiling and moving together at a Studio E social",
    },
    {
      src: `${VIBES}/IMG_1101.JPG`,
      alt: "Studio E instructor teaching Latin dance",
    },
    {
      src: `${VIBES}/DSC05366.jpg`,
      alt: "High-energy group dancing at Studio E Chicago",
    },
  ],
  testimonialVideoEmbed: "https://www.youtube.com/embed/-q-yfv1YEI0",
} as const

export const WORKSHOPS = [
  {
    id: "wepa-wonderland",
    title: "Wepa Wonderland",
    style: "Wepa · Cumbia",
    skillLevel: "Advanced",
    subtitle: "Adv. Wepa Musicality Workshop",
    outcome:
      "Sharpen your Wepa musicality so your timing, accents, and expression hit harder on the social floor.",
    dateLabel: "Thursday, December 3rd",
    dateShort: "Dec 3",
    timeLabel: "8:30 – 10:00 PM",
    startMs: Date.parse("2026-12-03T20:30:00-06:00"),
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Wepa_Wonderland.png",
    flyerAlt: "Wepa Wonderland — advanced wepa musicality workshop flyer, December 3 at Studio E",
  },
  {
    id: "unwrap-the-rhythm",
    title: "Unwrap the Rhythm",
    style: "Bachata",
    skillLevel: "Advanced",
    subtitle: "Adv. Bachata Musicality Workshop",
    outcome:
      "Train advanced Bachata musicality so you hear more in the music and move with clearer intention.",
    dateLabel: "Thursday, December 10th",
    dateShort: "Dec 10",
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
    style: "Salsa On 1",
    skillLevel: "Advanced",
    subtitle: "Advanced Salsa On 1 Workshop",
    outcome:
      "Clean up your Salsa On 1 shines so your footwork looks sharper and more confident in socials.",
    dateLabel: "Thursday, December 17th",
    dateShort: "Dec 17",
    timeLabel: "8:30 – 10:00 PM",
    startMs: Date.parse("2026-12-17T20:30:00-06:00"),
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Salsa_Shines_Santa.png",
    flyerAlt:
      "Salsa Shines with Santa — advanced salsa On 1 workshop flyer, December 17 at Studio E",
  },
] as const

export type SpecialtyWorkshop = (typeof WORKSHOPS)[number]
export type SpecialtyWorkshopId = SpecialtyWorkshop["id"]

export const OUTCOMES = [
  {
    title: "A focused 90-minute specialty workshop",
    body: "One night. One style. Deep work instead of a watered-down open class.",
  },
  {
    title: "Advanced technique and musicality",
    body: "Built for dancers who already move — and want cleaner, more musical dancing.",
  },
  {
    title: "A structured theme for each night",
    body: "Wepa Wonderland, Unwrap the Rhythm, or Salsa Shines with Santa — each night has a clear focus.",
  },
  {
    title: "An energetic Studio E community experience",
    body: "Train with dancers who care about getting better, in Humboldt Park’s Latin dance hub.",
  },
  {
    title: "Choose Wepa, Bachata, or Salsa",
    body: "One $30 ticket = one workshop night you select. Bring a friend free.",
  },
] as const

export const INSTRUCTOR = {
  name: "Austin Moulder",
  role: "Founder of Studio E",
  bio: "Founder of Studio E, Chicago’s Latin social dance studio in the heart of Humboldt Park / Paseo Boricua.",
  photo: ASSETS.instructor,
} as const

/** Verbatim Google reviews already used across Studio E landings. */
export const TESTIMONIALS = [
  {
    name: "Jose M.",
    quote:
      "Had a great experience at Studio E. Austin was very helpful and patient, this is a great opportunity for beginners and seasoned dancers to learn and improve their skills. Highly recommended!",
    link: "https://maps.app.goo.gl/9GS6sBGT2XaBC58LA",
  },
  {
    name: "Sylvia K.",
    quote:
      "Studio E is an amazing place to learn to dance!! I was a complete beginner and Austin was able to get me to dancing salsa and bachata confidently in no time.",
    link: "https://maps.app.goo.gl/HPLEJRjhfzVNs5jp9",
  },
  {
    name: "Emily G.",
    quote:
      "I love coming to Studio E! There’s so many fun classes and events to meet people at. The 28 day salsa challenge has helped me so much become a more confident social dancer. I can’t wait for summer and more salsa with Studio E.",
    link: "https://maps.app.goo.gl/SxfKnQnBZmfk67ua6",
  },
] as const

export const PROCESS = {
  headline: "What happens after you click",
  steps: [
    {
      title: "Choose your workshop",
      body: "Tap “Choose This Workshop” on the night you want — Wepa, Bachata, or Salsa.",
    },
    {
      title: "Get your $30 ticket",
      body: "Complete checkout. Your ticket includes one friend free.",
    },
    {
      title: "Reply with your friend’s name",
      body: "After purchase, reply to the confirmation message with the friend you’re bringing so we can check you both in.",
    },
  ],
} as const

export const COPY = {
  pageTitle: "Christmas Specialty Workshops | Studio E Chicago",
  metaDescription:
    "Three advanced Christmas Latin dance workshops in Chicago — Dec 3, 10, and 17, 8:30–10 PM at Studio E. $30 ticket includes a friend free. Choose Wepa, Bachata, or Salsa On 1.",
  heroEyebrow: "Studio E · Humboldt Park",
  heroHeadline: "Three Advanced Christmas Latin Dance Workshops in Chicago",
  heroSubheadline:
    "Specialty Wepa, Bachata Musicality, and Salsa On1 workshops for dancers who want sharper musicality, cleaner movement, and a more confident social-dance experience.",
  primaryCta: "Get Your Workshop Ticket",
  chooseCta: "Choose This Workshop",
  valueHeadline: "What you walk out with",
  valueBody:
    "These nights are built for advanced dancers who want a clear upgrade — not another open class that tries to teach everyone at once.",
  workshopsHeadline: "Pick your night",
  workshopsBody:
    "One $30 ticket = one workshop. Each ticket includes a friend free. Choose the night that matches the skill you want to sharpen.",
  proofHeadline: "Why dancers train at Studio E",
  proofBody: "Real reviews, real classes, and a Chicago Latin dance community that shows up.",
  expectHeadline: "What to expect",
  urgencyHeadline: "Only 20 tickets per workshop",
  urgencyBody:
    "Each night is capped at 20 tickets. When a workshop sells out, that checkout link stops working for that night. First workshop is Thursday, December 3rd.",
  checkoutHeadline: "Secure your $30 ticket",
  checkoutHelper:
    "Select your workshop above, then complete checkout. Your ticket includes one friend free — reply to confirmation with their name.",
  checkoutFallback: "Open checkout in a new tab",
  confirmationHeadline: "After you purchase",
  confirmationBody:
    "You’ll get a confirmation message. Reply with your friend’s name so we can check you both in for the workshop you selected.",
  finalHeadline: "Sharper musicality. Cleaner movement. One focused night.",
  finalBody: `$${PRICING.ticket} · Friend free · Advanced · Studio E Chicago`,
  countdownEnded: "Workshop night is here.",
  selectedLabel: "Selected workshop",
  selectPrompt: "Choose a workshop above, then complete checkout.",
} as const

export const FAQS = [
  {
    question: "What level is required?",
    answer:
      "These are advanced specialty workshops. They’re built for dancers who already have a foundation in Latin social dance and want sharper musicality and cleaner movement.",
  },
  {
    question: "Do I need a partner?",
    answer: "No. You can attend solo. No partner is required.",
  },
  {
    question: "Can I bring a friend?",
    answer:
      "Yes. Every $30 ticket includes one friend free. After checkout, reply to your confirmation with their name so we can check you both in.",
  },
  {
    question: "What should I wear?",
    answer: "Comfortable clothes you can move in and shoes you can dance in.",
  },
  {
    question: "How early should I arrive?",
    answer: "Arrive a few minutes early so you can check in and settle in before the workshop starts.",
  },
  {
    question: "Is the workshop beginner-friendly?",
    answer:
      "No. These Christmas specialty workshops are advanced. If you’re brand new to Latin dance, start with our beginner-friendly classes or Friday intro lesson instead.",
  },
  {
    question: "What happens after purchase?",
    answer:
      "Choose your workshop on this page, complete the $30 checkout, then reply to your confirmation message with the friend you’re bringing. Show up at Studio E for your selected night, 8:30–10:00 PM.",
  },
  {
    question: "How much does it cost?",
    answer: `$${PRICING.ticket} per ticket. Each ticket includes one friend free. One ticket = one selected workshop night.`,
  },
] as const

export function getWorkshopById(id: string | null | undefined): SpecialtyWorkshop | null {
  if (!id) return null
  return WORKSHOPS.find((w) => w.id === id) ?? null
}
