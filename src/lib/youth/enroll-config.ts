/**
 * Post-checkout youth enrollment — collect child info after FastPay signup.
 */

import { NEXT_BILLING, YOUTH_START } from "@/lib/youth/config"

export const META_PIXEL_ID = "1976276599649833" as const

export const ENROLL_FORM = {
  id: "bAONiT68YZhcjApZ6jug",
  url: "https://api.leadconnectorhq.com/widget/form/bAONiT68YZhcjApZ6jug",
  name: "Youth Program Child Enrollment",
} as const

export function getEnrollCopy(_now: Date = new Date()) {
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
      "Free unlimited youth classes for the rest of 2026 · Tuesday–Thursday at Studio E",
      `Your $89 deposit is applied to ${YOUTH_START.label} · next charge ${NEXT_BILLING.label} (Bronze or Gold)`,
    ],
    rollingAdmissionNote: `Free classes for the rest of 2026 while we build—small groups and personalized attention. Your $89 deposit applies to ${YOUTH_START.label}. You won’t be charged again until ${NEXT_BILLING.label}.`,
    footerNote: "Studio E · 2657 W Division St, Chicago, IL",
  }
}
