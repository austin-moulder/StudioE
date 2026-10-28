export const META_PIXEL_ID = "1976276599649833" as const

export const AUSTIN_PHOTO =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Accelerator.jpg" as const

export const FLYER =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Business_Workshop.png" as const

/** Sunday, Nov 22, 2026 · 3:00 PM America/Chicago */
export const WORKSHOP_START_MS = Date.parse("2026-11-22T15:00:00-06:00")

export const RSVP_FORM = {
  id: "UoxcpP6swhlIvNw1KHpi",
  url: "https://api.leadconnectorhq.com/widget/form/UoxcpP6swhlIvNw1KHpi",
} as const

export const SPOTS_STORAGE_KEY = "studioe_business_workshop_spots_left_v1" as const
export const SPOTS_CAPACITY = 20 as const
export const SPOTS_MIN = 5 as const
export const SPOTS_MAX = 15 as const

export const EVENT = {
  name: "Build Your Business in 90 Minutes",
  dateLabel: "Sunday, November 22, 2026",
  timeLabel: "3:00 PM – 4:30 PM",
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=2657+W+Division+St,+Chicago,+IL+60622&output=embed",
} as const

export const LEARN_POINTS = [
  {
    title: "Incorporate a business",
    body: "The nitty-gritty of setting up the structure so you can operate for real.",
  },
  {
    title: "Build a killer offer",
    body: "Craft an offer people actually want to buy—clear, compelling, and sellable.",
  },
  {
    title: "Acquire massive social proof",
    body: "Stack credibility fast so prospects trust you before they ever meet you.",
  },
  {
    title: "Build a scalable marketing campaign",
    body: "A campaign engine you can grow—not a one-off post that dies in a day.",
  },
  {
    title: "Drive sales",
    body: "Turn attention into revenue with a simple, repeatable path to the close.",
  },
] as const

export const AUDIENCES = [
  "Early career professionals",
  "Undergrad college students",
  "MBAs",
  "Small business owners",
  "Hobby enthusiasts ready to monetize",
] as const

export const AUSTIN_BIO =
  "Former consultant for Boston Consulting Group (1% offer rate). Former Operations Director for a $250M tech marketplace where he oversaw 150+ employees. Former VC-backed entrepreneur for an education technology startup. Now the bootstrapped owner of Chicago’s fastest-growing Latin dance business—170 active members before the grand opening."

export const FAQS = [
  {
    question: "Is this workshop free?",
    answer:
      "Yes. Build Your Business in 90 Minutes is free to attend. Spots are limited—reserve yours below.",
  },
  {
    question: "Who is this for?",
    answer:
      "Early career professionals, undergrad students, MBAs, small business owners, and hobby enthusiasts who want a clear path to build a business and make money from it.",
  },
  {
    question: "Do I need an existing business?",
    answer:
      "No. Come with an idea, a side hustle, a hobby you want to monetize, or a business that’s already running. You’ll leave with a practical framework either way.",
  },
  {
    question: "Who facilitates?",
    answer: `Austin Moulder. ${AUSTIN_BIO}`,
  },
  {
    question: "Where is it?",
    answer: "Studio E, 2657 W Division St, Chicago, IL, in Humboldt Park.",
  },
  {
    question: "What should I bring?",
    answer:
      "A notebook or laptop and an open mind. Arrive 10–15 minutes early for check-in.",
  },
] as const
