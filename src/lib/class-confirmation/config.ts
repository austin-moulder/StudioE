/**
 * Shared confirmation / upsell after pay-to-attend checkouts
 * (weekend salsa/bachata, twerk, reggaeton, morning reset, etc.).
 */

export const PRIVATE_CHECKOUT_URL =
  "https://link.fastpaydirect.com/payment-link/6ab1904df426560dbc2f17fd" as const

export const META_PIXEL_ID = "1976276599649833" as const

/** Same 5-minute offer window as /newmemberdeal. */
export const OFFER_SECONDS = 5 * 60

export const PRICING = {
  regular: 150,
  sale: 75,
  discountLabel: "50% off",
} as const

const CHALLENGE_ASSET_BASE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/28-day-challenge" as const

export const IMAGES = {
  hero: `${CHALLENGE_ASSET_BASE}/DSC05745.jpg`,
  practice: `${CHALLENGE_ASSET_BASE}/DSC05764%20(1).jpg`,
  community: `${CHALLENGE_ASSET_BASE}/IMG_2657.JPG`,
} as const

export const UTM = {
  utm_source: "class_confirmation",
  utm_medium: "upsell",
  utm_campaign: "private_50_off",
} as const

export const COPY = {
  thankYouHeadline: "You’re in. See you on the floor.",
  thankYouBody:
    "Thanks for signing up. Your spot is confirmed—now give yourself the best shot at feeling confident your first time in class.",
  offerEyebrow: "Limited-time class upgrade",
  offerHeadline: "Add a Private Lesson at 50% Off",
  offerSubheadline:
    "Book a private before or after your class for extra support your first time. Just $75 (normally $150).",
  primaryCta: "Claim My Private — $75",
  stickyCta: "Lock In 50% Off Private — $75",
  expiredMessage:
    "This confirmation offer has expired. Reach out to the Studio E team if you still want a private before or after your class.",
  whyHeadline: "Why add a private now?",
  suburbNote:
    "Especially powerful if you’re coming in from the Chicago suburbs—make the commute count with an extra hour of focused instruction while you’re already here.",
} as const

export const BENEFITS = [
  "Walk into your first class already knowing the basics",
  "Book before class for a confidence boost—or after class to lock in what you learned",
  "Get personalized attention you won’t get in a packed group room",
  "Ideal for suburban dancers who want more value from a longer trip downtown",
] as const

export const USE_CASES = [
  {
    title: "Before class",
    body: "Get a calm, private warmup so your first group class feels familiar instead of overwhelming.",
  },
  {
    title: "After class",
    body: "Clean up what you just learned while it’s fresh—and leave with clarity for next time.",
  },
] as const

export function buildPrivateCheckoutUrl(extraParams?: Record<string, string>) {
  const url = new URL(PRIVATE_CHECKOUT_URL)
  Object.entries(UTM).forEach(([key, value]) => {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value)
  })
  if (typeof window !== "undefined") {
    const incoming = new URLSearchParams(window.location.search)
    ;["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"].forEach(
      (key) => {
        const value = incoming.get(key)
        if (value) url.searchParams.set(key, value)
      }
    )
  }
  if (extraParams) {
    Object.entries(extraParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  return url.toString()
}
