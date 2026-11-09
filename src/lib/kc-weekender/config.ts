/**
 * Studio E KC Latin Dance Weekend — /kc-weekender
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const CHECKOUT_URL = "https://studioe-danceclassestraining.com/kc-weekender" as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "kc_weekender",
} as const

export const EVENT = {
  brand: "Studio E",
  name: "Studio E KC Latin Dance Weekend",
  shortName: "KC Weekender",
  format: "3 hours total · 3 classes",
  city: "Kansas City",
  dateLabel: "Saturday, November 28th",
  timeLabel: "10:00 AM – 1:00 PM",
  venueName: "Johnson County Arts and Heritage Center",
  addressLine: "8788 Metcalf Avenue",
  cityLine: "Overland Park, KS 66212",
} as const

export const PRICING = {
  single: 30,
  fullPass: 75,
  individualTotal: 90,
  savings: 15,
} as const

const VIBES =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes" as const
const CHALLENGE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/28-day-challenge" as const

export const ASSETS = {
  hero: `${VIBES}/Arik_Private.PNG`,
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
      alt: "High-energy group dancing at Studio E",
    },
    {
      src: `${CHALLENGE}/DSC05764%20(1).jpg`,
      alt: "Focused dance instruction at Studio E",
    },
  ],
} as const

export const CLASSES = [
  {
    id: "fundamentals",
    title: "Salsa Fundamentals",
    body: "Build the patterns, timing, and partner connection that make social dancing feel easier.",
  },
  {
    id: "musicality",
    title: "Salsa Musicality and Styling",
    body: "Learn how to hear the music, add intentional styling, and look more confident without overthinking.",
  },
  {
    id: "footwork",
    title: "Salsa Footwork",
    body: "Train faster, sharper footwork and bring a distinct flavor to your dancing.",
  },
] as const

export const INSTRUCTOR = {
  name: "Austin Moulder",
  role: "Founder of Studio E",
  bio: "Founder of Studio E, Chicago’s quickest growing Latin social dance studio in the heart of Chicago’s Puerto Rican district. Austin brings Chicago-level Latin social dance instruction to Kansas City for this weekend.",
  photo: ASSETS.instructor,
} as const

export const COPY = {
  pageTitle: "Studio E KC Latin Dance Weekend | Kansas City Salsa",
  metaDescription:
    "Saturday, Nov 28 · 10 AM–1 PM at Johnson County Arts and Heritage Center. Three salsa classes. Full pass $75 or single class $30. Studio E brings Chicago-level Latin dance to Kansas City.",
  heroHeadline: "Three Hours. Three Classes. One Serious Upgrade to Your Salsa.",
  heroSubheadline: "Studio E is bringing Chicago-level Latin dance instruction to Kansas City.",
  primaryCta: "Get the Full Pass",
  secondaryCta: "Choose a Single Class",
  stickyCta: "Get the Full Pass",
  credibilityHeadline: "Built for the social floor",
  credibilityBody:
    "Real instruction energy from Studio E’s Chicago community—teaching, partnerwork, and high-energy group moments.",
  learnHeadline: "What you’ll learn",
  learnBody: "Three focused salsa classes in one weekend.",
  offerHeadline: "Choose your ticket",
  offerBody: `Full pass covers all three classes for $${PRICING.fullPass}. Buying individually is $${PRICING.individualTotal}—save $${PRICING.savings} with the full pass.`,
  instructorHeadline: "Your instructor",
  instructorStudioLine:
    "Studio E is a Chicago-based Latin social dance brand rooted in Humboldt Park / Paseo Boricua.",
  faqHeadline: "FAQ",
  finalHeadline: "Your next breakthrough starts with showing up.",
  finalCta: `Get the Full Pass for $${PRICING.fullPass}`,
  checkoutHeadline: "Secure your spot",
  checkoutHelper: "Full pass $75 · Single class $30 · Choose your option in checkout",
} as const

export const FAQS = [
  {
    question: "Who is this for?",
    answer:
      "Latin dancers in Kansas City—especially beginner and intermediate social dancers who want a focused salsa upgrade.",
  },
  {
    question: "Is this On 1 or On 2?",
    answer:
      "This weekend is On 1. We also offer privates if you want to level up your On 2—send a message to @the_studio_e on Instagram for more information.",
  },
  {
    question: "Do I need a partner?",
    answer:
      "No. You can attend solo. Partnerwork is taught in class—details on rotating partners will be confirmed on site.",
  },
  {
    question: "Can I attend only one class?",
    answer: `Yes. Single classes are $${PRICING.single} each. The full pass ($${PRICING.fullPass}) covers all three and saves $${PRICING.savings}.`,
  },
  {
    question: "What should I bring?",
    answer:
      "Comfortable clothes you can move in and shoes you can dance in. Water is recommended.",
  },
  {
    question: "What happens after I purchase?",
    answer:
      "You’ll receive confirmation through checkout with event details. Classes are Saturday, November 28th, 10:00 AM–1:00 PM at Johnson County Arts and Heritage Center, 8788 Metcalf Avenue, Overland Park, KS 66212.",
  },
] as const
