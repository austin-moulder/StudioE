export const META_PIXEL_ID = "1976276599649833" as const

const VIBES =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes" as const

/** 11:59 PM Chicago time on October 24, 2026 (CDT, UTC−5). */
export const OFFER_ENDS_MS = Date.parse("2026-10-24T23:59:00-05:00")

export const DEAL = {
  name: "Grand Opening Deal",
  price: 49,
  regularPrice: 124,
  venueName: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL",
  neighborhood: "Humboldt Park · Paseo Boricua",
  checkoutUrl: "https://studioe-danceclassestraining.com/grand-opening-checkout",
  reviewUrl: "https://g.page/r/CQOA9G9BXsvuEBM/review",
} as const

export const UTM = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "grand_opening_deal",
} as const

export const PHOTOS = [
  `${VIBES}/Wide_group.jpg`,
  `${VIBES}/DSC05837.jpg`,
  `${VIBES}/DSC05366.jpg`,
  `${VIBES}/DSC05448.jpg`,
  `${VIBES}/DSC05316.jpg`,
  `${VIBES}/IMG_1101.JPG`,
] as const

export const COPY = {
  reviewEyebrow: "Had a good time tonight?",
  reviewHeadline: "Help this studio stay on Paseo Boricua.",
  reviewBody:
    "Studio E is a new Latino-owned business. If tonight meant something to you, leave a positive review. Reviews are how people find us—and how more dancers walk into a room that can change their lives.",
  reviewCta: "Leave a Google Review",
  heroEyebrow: "Grand Opening Deal",
  heroHeadline: "2 Weeks of Unlimited Classes for $49",
  heroSubheadline:
    "Our unlimited option is normally $124. Buy tonight, then redeem anytime before January 1, 2027, and dance as much as you want at Studio E.",
  primaryCta: "Get 2 Weeks Unlimited — $49",
  stickyCta: "Get the Deal — $49",
  offerEndsLabel: "Offer ends",
  offerEnded: "This offer ended at 11:59 PM on October 24.",
  galleryHeadline: "The Room You Just Danced In",
  galleryBody: "Same floor. Same people. Two weeks to keep showing up.",
  includesHeadline: "What $49 Gets You",
  howHeadline: "How It Works",
  finalHeadline: "Keep the Night Going.",
  finalBody:
    "Two weeks of unlimited classes, normally $124, for $49 tonight. Redeem anytime before January 1, 2027.",
  checkoutHeadline: "Claim the Grand Opening Deal",
  checkoutHelper: "$49 for 2 weeks of unlimited classes. Redeem by January 1, 2027.",
  newMemberNote:
    "This offer is only for completely new members. It won’t be honored for anyone who already has a Studio E membership.",
  scheduleHeadline: "November Schedule",
  scheduleBody: "Here’s the class schedule you can use during your two weeks.",
} as const

export const SCHEDULE_IMAGE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/November_Schedule.png"

export const INCLUDES = [
  "2 weeks of unlimited Studio E classes",
  "Normally $124 — tonight it’s $49",
  "Buy tonight and redeem anytime before January 1, 2027",
  "Start your two weeks whenever you’re ready, as long as you redeem by New Year’s Day",
  "Same studio, 2657 W Division St, on Paseo Boricua",
] as const

export const STEPS = [
  {
    title: "Buy tonight",
    body: "The $49 price is only available until 11:59 PM on October 24. After that, unlimited classes go back to $124.",
  },
  {
    title: "Redeem before January 1, 2027",
    body: "Your pass doesn’t have to start tomorrow. Redeem it anytime before January 1, 2027, and your two weeks begin when you do.",
  },
  {
    title: "Show up and dance",
    body: "Come to Studio E at 2657 W Division St and take as many classes as you want for those two weeks.",
  },
] as const

export const FAQS = [
  {
    question: "When does this offer end?",
    answer:
      "11:59 PM Chicago time on Saturday, October 24, 2026. After that, this $49 price is gone.",
  },
  {
    question: "When do I have to use it?",
    answer:
      "Purchase tonight, then redeem anytime before January 1, 2027. Your two weeks of unlimited classes start when you redeem.",
  },
  {
    question: "What does unlimited mean?",
    answer:
      "During your two weeks you can take as many Studio E classes as you want. This is a one-time pass, not an ongoing membership.",
  },
  {
    question: "Can current members use this deal?",
    answer:
      "No. It’s only available to people who are completely new to Studio E. Existing members won’t be able to redeem it.",
  },
  {
    question: "Why is it $49 instead of $124?",
    answer:
      "Our regular unlimited option is $124. This Grand Opening price is only for people buying before 11:59 PM on October 24.",
  },
  {
    question: "Where is the studio?",
    answer: "Studio E, 2657 W Division St, Chicago, IL, in Humboldt Park on Paseo Boricua.",
  },
] as const
