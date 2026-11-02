/**
 * Studio E × Pulse Dance Shoes affiliate landing (/pulse)
 * and shared callouts on merch + new-member pages.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const PULSE_AFFILIATE_BASE = "https://go.pulsedanceshoes.com/austin" as const
export const PULSE_DISCOUNT_CODE = "STUDIOE15" as const
export const PULSE_PAGE_PATH = "/pulse" as const
export const CHALLENGE_PATH = "/challenge" as const

export const PULSE_PARTNERSHIP_PHOTO =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Merch/Instructor_Backgrounds-8%20(2).png" as const

export const DISCLOSURE =
  "Disclosure: Studio E may earn a commission if you purchase through this link or use code STUDIOE15. This does not increase your price." as const

export const MARCUS_QUOTE = {
  text: "The student as boxer, not fencer. The fencer’s weapon is picked up and put down again. The boxer’s is part of him. All he has to do is clench his fist.",
  attribution: "Marcus Aurelius",
  studioNote:
    "We say the same thing about dancing: you should be able to dance in any shoes. Pulse sneakers are built for Latin movement—and comfortable enough to wear anywhere, anytime.",
} as const

export type PulseCtaPlacement =
  | "pulse_hero"
  | "pulse_mid"
  | "pulse_final"
  | "merch_callout"
  | "newmember_callout"

/** Build Pulse affiliate URL with UTM parameters for attribution. */
export function getPulseAffiliateUrl(placement: PulseCtaPlacement): string {
  const url = new URL(PULSE_AFFILIATE_BASE)
  url.searchParams.set("utm_source", "studioe")
  url.searchParams.set("utm_medium", "affiliate")
  url.searchParams.set("utm_campaign", "pulse_dance_shoes")
  url.searchParams.set("utm_content", placement)
  return url.toString()
}

export const BENEFITS = [
  {
    title: "More comfort while you dance",
    body: "Flexible soles and a lighter feel so you can stay on the floor longer—without fighting stiff footwear.",
  },
  {
    title: "Easier movement and turns",
    body: "Built for dance movement, so pivots, steps, and social patterns feel more natural than in street shoes.",
  },
  {
    title: "Confidence in class and on socials",
    body: "When your shoes work with you, it’s easier to focus on the music, your partner, and the room.",
  },
  {
    title: "Skip stiff street shoes",
    body: "Everyday sneakers and dress shoes weren’t made for Latin social dance. Pulse shoes are.",
  },
] as const

export const WHY_RECOMMENDS = [
  {
    title: "Designed for dance movement",
    body: "Pulse shoes are made for the way Latin dancers actually move—not for the gym or the sidewalk alone.",
  },
  {
    title: "Right for beginners and social dancers",
    body: "Comfortable and beginner-friendly for Studio E Salsa and Bachata students finding their feet.",
  },
  {
    title: "Dance anywhere, anytime",
    body: "The shoes Studio E recommends when you want footwear you can wear to class, to a social, and out into the city.",
  },
] as const
