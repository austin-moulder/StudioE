/**
 * Post-checkout youth enrollment — collect child info after FastPay signup.
 */

export const META_PIXEL_ID = "1976276599649833" as const

export const ENROLL_FORM = {
  id: "bAONiT68YZhcjApZ6jug",
  url: "https://api.leadconnectorhq.com/widget/form/bAONiT68YZhcjApZ6jug",
  name: "Youth Program Child Enrollment",
} as const

export const ENROLL_COPY = {
  announcement: "YOU’RE IN · ONE MORE STEP",
  headline: "Tell Us About Your Dancer",
  subheadline:
    "Thanks for joining the Chicago Latin Dance Youth Program. Complete this short form so we can enroll your child and get them ready for class.",
  formIntro:
    "Add each child you want to enroll—preferred days of the week and preferred start date included. We’ll use this to set up their schedule and welcome them on day one.",
  nextStepsHeadline: "What Happens Next",
  nextSteps: [
    "Submit the enrollment form below for each child",
    "You’ll get a text confirming enrollment and your selected start date",
    "Classes officially start October 12 · Monday–Thursday at Studio E",
  ],
  rollingAdmissionNote:
    "Classes start October 12, with rolling admission through November. Join later and your child still gets the full number of classes for the session.",
  footerNote: "Studio E · 2657 W Division St, Chicago, IL",
} as const
