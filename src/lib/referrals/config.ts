/**
 * Single source of truth for Studio E referral program copy, rewards, and URLs.
 * Edit amounts and messaging here — the page reads from this config.
 *
 * Photo placement map (real Studio E assets only):
 * - Hero background: Vibes/Wide_group.jpg — community group moment
 * - How-it-works strip: Vibes/DSC05366.jpg — class / dance floor energy
 * - Community collage left: Vibes/Brandon_Smile.jpg — smiling member
 * - Community collage center: Vibes/DSC05448.jpg — social dancing
 * - Community collage right: Vibes/IMG_1101.JPG — studio community moment
 * - Membership section accent: Vibes/DSC05837.jpg — class atmosphere
 * - Open Graph / WhatsApp share image: Vibes/Wide_group.jpg
 */

export const REFERRAL_PAGE_URL = "https://www.joinstudioe.com/referrals" as const
export const MEMBERSHIP_URL = "https://www.joinstudioe.com/membership" as const

export const REFERRAL_SHARE = {
  title: "Bring Your People to Studio E",
  text: "Hey! I dance at Studio E in Chicago and think you’d love it. Come try salsa, bachata, and more with me. Mention my name when you sign up so we both get the referral benefit:",
  url: REFERRAL_PAGE_URL,
  whatsappMessage:
    "Hey! I dance at Studio E in Chicago and think you’d love it. Come try salsa, bachata, and more with me. Mention my name when you sign up so we both get the referral benefit: https://www.joinstudioe.com/referrals",
} as const

export const REFERRAL_COPY = {
  pageTitle: "Bring Your People to Studio E",
  heroHeadline: "Your people belong here too.",
  heroBody:
    "Invite a friend to dance with you at Studio E. When they become a qualified paid member, you earn Studio E credit and they get $25 off their first paid membership payment.",
  primaryCta: "Share with a Friend",
  secondaryCta: "View Memberships",
  stickyCta: "Share With a Friend",
  rewardsHeadline: "Your referrals add up.",
  rewardsNote:
    "After 5 qualified referrals, earn $25 Studio E credit for every additional qualified referral.",
  progressDisclaimer:
    "This visual shows the reward milestones. Progress isn’t tracked automatically on this page.",
  scriptHeadline: "What should I say?",
  scriptBody:
    "Tell them: “Come to Studio E with me. When you sign up, tell the instructor I sent you.”",
  finalHeadline: "Bring one person. Build the community.",
  finalCta: "Share the Referral Offer",
} as const

/** Credit math: $25 each referral + $50 at 3 + $100 at 5 = $275 at ambassador. */
export const REFERRAL_TIERS = [
  {
    id: "first",
    referrals: 1,
    title: "First Referral",
    reward: "Earn $25 Studio E credit.",
    totalLabel: null as string | null,
  },
  {
    id: "connector",
    referrals: 3,
    title: "Studio E Connector",
    reward: "Refer 3 qualified members and unlock an additional $50 bonus.",
    totalLabel: "$125 total credit earned.",
  },
  {
    id: "ambassador",
    referrals: 5,
    title: "Studio E Ambassador",
    reward: "Refer 5 qualified members and unlock an additional $100 bonus.",
    totalLabel: "$275 total credit earned.",
  },
] as const

export const HOW_IT_WORKS = [
  "Share Studio E with a friend.",
  "Your friend tells the instructor they heard about Studio E from you before signing up.",
  "They join a paid Studio E membership.",
  "They remain active through their first 28-day billing cycle.",
  "Studio E confirms the referral and applies your credit.",
] as const

export const QUALIFICATION_RULES = [
  "The referred person must be new to Studio E or have not been an active paid member during the previous 12 months.",
  "They must identify the referring member before or at signup.",
  "The referral must result in a paid Bronze Plan, Gold Plan, or 28-Day Challenge.",
  "Free classes, guest passes, unpaid trials, merchandise purchases, and duplicate/self-referrals do not qualify.",
  "The referred member must remain active through the first 28-day billing cycle.",
  "Referral credit is issued after verification.",
  "Credits are non-cash, non-transferable, and cannot be exchanged for cash.",
  "One referred person can count toward one referring member only.",
  "Studio E may reject duplicate, fraudulent, or unclear referrals.",
] as const

export const MEMBERSHIP_PLANS = [
  {
    name: "Bronze Plan",
    detail: "4 classes every 4 weeks",
  },
  {
    name: "Gold Plan",
    detail: "8 classes every 4 weeks",
  },
  {
    name: "28-Day Challenge",
    detail: "4 private lessons plus unlimited classes for 28 days",
  },
] as const

export const REFERRAL_FAQS = [
  {
    question: "What counts as a qualified referral?",
    answer:
      "A new (or returning after 12+ months inactive) person who names you before or at signup, joins a paid Bronze, Gold, or 28-Day Challenge membership, and stays active through their first 28-day billing cycle. Free classes, guest passes, unpaid trials, merchandise, and self-referrals do not qualify.",
  },
  {
    question: "When do I receive my credit?",
    answer:
      "After Studio E verifies the referral—once your friend has remained active through their first 28-day billing cycle. Credit is applied after verification.",
  },
  {
    question: "Can I refer more than one person?",
    answer:
      "Yes. Your credits add up across referrals, with bonus unlocks at 3 and 5 qualified referrals, then $25 for each additional qualified referral after 5.",
  },
  {
    question: "Can I earn cash?",
    answer:
      "No. Studio E credits are non-cash, non-transferable, and cannot be exchanged for cash.",
  },
  {
    question: "What if my friend forgets to mention my name?",
    answer:
      "They need to identify you before or at signup for the referral to count. If they forget, ask them to tell an instructor as soon as possible so Studio E can review it—unclear referrals may not qualify.",
  },
  {
    question: "Which memberships qualify?",
    answer:
      "Paid Bronze Plan, Gold Plan, or 28-Day Challenge memberships. Free classes, guest passes, unpaid trials, and merchandise purchases do not qualify.",
  },
  {
    question: "Where can I use my Studio E credit?",
    answer:
      "Studio E credit can be used toward Studio E offerings after it is issued. Credits are non-cash and non-transferable. Ask the front desk or an instructor if you need help applying credit on your account.",
  },
] as const

const ASSET =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1" as const

export const REFERRAL_IMAGES = {
  /** Hero background */
  heroCommunity: `${ASSET}/Vibes/Wide_group.jpg`,
  /** How-it-works visual */
  classEnergy: `${ASSET}/Vibes/DSC05366.jpg`,
  /** Community collage */
  smilingMember: `${ASSET}/Vibes/Brandon_Smile.jpg`,
  socialDancing: `${ASSET}/Vibes/DSC05448.jpg`,
  communityMoment: `${ASSET}/Vibes/IMG_1101.JPG`,
  /** Membership section */
  classAtmosphere: `${ASSET}/Vibes/DSC05837.jpg`,
} as const

export function getWhatsAppShareUrl(message: string = REFERRAL_SHARE.whatsappMessage) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}
