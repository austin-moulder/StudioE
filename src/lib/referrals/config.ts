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
    "Invite a friend to dance with you at Studio E. When they become a qualified paid member, you get $100 cash and they get $25 off their first paid membership payment.",
  primaryCta: "Share with a Friend",
  secondaryCta: "View Memberships",
  stickyCta: "Share With a Friend",
  rewardsHeadline: "Get paid in cash for every friend.",
  rewardsNote:
    "After 5 qualified referrals, every additional qualified referral pays $200 cash ($100 plus a $100 bonus).",
  progressDisclaimer:
    "This visual shows the reward milestones. Progress isn’t tracked automatically on this page.",
  scriptHeadline: "What should I say?",
  scriptBody:
    "Tell them: “Come to Studio E with me. When you sign up, tell the instructor I sent you.”",
  finalHeadline: "Bring one person. Build the community.",
  finalCta: "Share the Referral Offer",
} as const

/** Cash math: $100 each referral + $50 bonus at 3 + $100 bonus at 5 and every one after. */
export const REFERRAL_TIERS = [
  {
    id: "first",
    referrals: 1,
    title: "First Referral",
    reward: "Get $100 cash for every qualified referral.",
    totalLabel: "$100 cash.",
  },
  {
    id: "connector",
    referrals: 3,
    title: "Studio E Connector",
    reward: "Your 3rd qualified referral unlocks an extra $50 bonus.",
    totalLabel: "$350 cash total.",
  },
  {
    id: "ambassador",
    referrals: 5,
    title: "Studio E Ambassador",
    reward: "Your 5th qualified referral unlocks an extra $100 bonus.",
    totalLabel: "$650 cash total.",
  },
] as const

export const HOW_IT_WORKS = [
  "Share Studio E with a friend.",
  "Your friend tells the instructor they heard about Studio E from you before signing up.",
  "They join a paid Studio E membership.",
  "They stay a paid member for 29 days—the referral qualifies on the first day of their second month.",
  "Studio E confirms the referral and pays you in cash.",
] as const

export const QUALIFICATION_RULES = [
  "The referred person must be new to Studio E or have not been an active paid member during the previous 12 months.",
  "They must identify the referring member before or at signup.",
  "The referral must result in a paid Bronze Plan, Gold Plan, or 28-Day Challenge.",
  "Free classes, guest passes, unpaid trials, merchandise purchases, and duplicate/self-referrals do not qualify.",
  "The referred member must stay a paid member for 29 days. The referral qualifies on the first day of their second month with Studio E.",
  "Rewards are paid in cash after Studio E verifies the referral.",
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
      "A new (or returning after 12+ months inactive) person who names you before or at signup, joins a paid Bronze, Gold, or 28-Day Challenge membership, and stays a paid member for 29 days. The referral qualifies on the first day of their second month. Free classes, guest passes, unpaid trials, merchandise, and self-referrals do not qualify.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Once your friend reaches day 29 (the first day of their second month) and Studio E verifies the referral, we pay you in cash.",
  },
  {
    question: "Can I refer more than one person?",
    answer:
      "Yes. Every qualified referral pays $100 cash. Your 3rd adds a $50 bonus ($350 total), your 5th adds a $100 bonus ($650 total), and every referral after that pays $200 ($100 plus a $100 bonus).",
  },
  {
    question: "Is this cash or studio credit?",
    answer: "Cash. There is no credit system—referral rewards are paid out in cash.",
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
