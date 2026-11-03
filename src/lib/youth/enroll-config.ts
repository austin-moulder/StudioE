/**
 * Post-checkout youth enrollment — collect child info after FastPay signup.
 */

import { formatYouthStartLabel, YOUTH_START } from "@/lib/youth/config"

export const META_PIXEL_ID = "1976276599649833" as const

export const ENROLL_FORM = {
  id: "bAONiT68YZhcjApZ6jug",
  url: "https://api.leadconnectorhq.com/widget/form/bAONiT68YZhcjApZ6jug",
  name: "Youth Program Child Enrollment",
} as const

export function getEnrollCopy(_now: Date = new Date()) {
  const startLabel = formatYouthStartLabel()
  return {
    announcement: "YOU’RE IN · ONE MORE STEP",
    headline: "Tell Us About Your Dancer",
    subheadline:
      "Thanks for joining the Chicago Latin Dance Youth Program. Complete this short form so we can enroll your child and get them ready for class.",
    formIntro:
      "Add each child you want to enroll—preferred days of the week included. We’ll use this to set up their schedule and welcome them on day one.",
    nextStepsHeadline: "What Happens Next",
    nextSteps: [
      "Submit the enrollment form below for each child",
      "You’ll get a text confirming enrollment",
      `Official start ${startLabel} · Tuesday–Thursday at Studio E`,
      `Classes for the rest of 2026 are free · your $89 deposit covers January ${YOUTH_START.yearLabel}`,
    ],
    rollingAdmissionNote: `Official start is ${startLabel}. Enjoy free youth classes for the rest of 2026 until then—your deposit covers January.`,
    footerNote: "Studio E · 2657 W Division St, Chicago, IL",
  }
}
