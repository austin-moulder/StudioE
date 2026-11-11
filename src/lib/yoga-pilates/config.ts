import {
  CANT_MAKE_THIS_WEEK_FAQ,
  RECHARGE_POPUP_THEME,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const YOGA_PILATES_CONFIG: PopupClassLandingConfig = {
  id: "yoga-pilates",
  checkoutUrl: "https://studioe-danceclassestraining.com/yoga-pilates",
  embedCheckout: true,
  spotsStorageKey: "studioe_yoga_pilates_spots_left_v2",
  spotsRange: { min: 12, max: 15 },
  theme: RECHARGE_POPUP_THEME,
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "yoga_pilates_saturday",
  },
  event: {
    name: "Yoga + Pilates Saturday",
    format: "Latina-focused wellness · Yoga at 10 AM · Pilates at 11 AM",
    startHour: 10,
    startMinute: 0,
    timeZone: "America/Chicago",
    weekday: 6,
    durationLabel: "Saturdays · Yoga 10 AM · Pilates 11 AM",
    price: 35,
    capacity: 20,
    venueName: "Studio E",
    addressLine: "2659 W Division St",
    cityLine: "Chicago, IL",
    neighborhood: "A unique Latina-focused wellness space in Humboldt Park",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=2659+W+Division+St,+Chicago,+IL+60622&output=embed",
  },
  assets: {
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Yoga_popup_flyer.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Yoga_Vid_1.mp4",
  },
  addressInHero: true,
  learnPoints: [
    { lead: "Yoga at 10 AM", rest: "breathe, stretch, and reset your week" },
    { lead: "Pilates at 11 AM", rest: "core strength and control that supports how you move" },
    { lead: "Bring a friend free", rest: "every ticket includes one friend at no extra cost" },
    { lead: "Mats available", rest: "rent a mat at the studio if you don’t bring your own" },
  ],
  process: {
    headline: "How It Works",
    steps: [
      {
        title: "Purchase your ticket",
        body: "Choose 1 class for $25 or the full 2-hour workshop for $35. Checkout below.",
      },
      {
        title: "Tell us your plan",
        body: "If you bought 1 class, text which one you want—Yoga at 10 AM or Pilates at 11 AM. Share your friend’s name with your ticket.",
      },
      {
        title: "Show up and recharge",
        body: "Come to Studio E at 2659 W Division St. Arrive a few minutes early so you can settle in.",
      },
    ],
  },
  copy: {
    heroEyebrow: "Studio E · Humboldt Park",
    accentLabel: "Saturday Recharge",
    heroHeadline: "Yoga + Pilates: Reset Your Body. Soften Your Week.",
    heroSubheadline:
      "A Latina-focused wellness morning in Humboldt Park. Saturdays: yoga at 10 AM, pilates at 11 AM. Bring a friend free. Typically $35 per person per class—get one class for $25 or the full two hours for $35.",
    primaryCta: "Get the Full Workshop for $35",
    secondaryCta: "Bring My Friend Free",
    capacityNote:
      "We keep the room capped so the morning stays calm, personal, and easy to follow.",
    videoHeadline: "Slow Down. Breathe. Rebuild.",
    educationHeadline: "A Unique Latina Wellness Space",
    educationBody:
      "This isn’t a crowded gym class. It’s a softer Saturday morning built for recovery, strength, and community—yoga to open and settle, pilates to rebuild from the core. Come for one class or stay for both. Every ticket includes a friend free.",
    offerHeadline: "",
    friendHeadline: "Every Ticket Includes a Friend Free",
    friendBody:
      "Purchase once and bring someone with you at no extra cost. Share their name after checkout, then show up together.",
    priceFriendLine: "$35 full workshop · $25 one class · Friend free",
    limitedHeadline: "Limited Saturday Spots",
    limitedBody:
      "We keep capacity tight so the room stays quiet enough to recharge—and so every person gets real coaching.",
    communityHeadline: "Recharge Before the Week Starts Again",
    communityBody:
      "Come for the stretch, stay for the strength, leave lighter. Mats are available to rent if you need one.",
    communityBadge: "Beginner-friendly · Friend free · Mats available to rent",
    finalHeadline: "Give Yourself One Soft Saturday Morning.",
    finalBody:
      "Lock in the full workshop for $35—or start with one class for $25—and bring a friend free. Then show up ready to breathe.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Get the Full Workshop — $35",
    flyerAlt: "Yoga + Pilates Saturday workshop flyer at Studio E — friend free",
    videoAriaLabel: "Yoga and pilates recharge energy at Studio E",
  },
  offerBullets: [],
  offerTerms: [],
  faqs: [
    {
      question: "What’s the difference between $25 and $35?",
      answer:
        "$25 is one class—Yoga at 10 AM or Pilates at 11 AM (tell us which after checkout). $35 is the full 2-hour workshop covering both.",
    },
    {
      question: "Do I get a friend free?",
      answer:
        "Yes. Every ticket includes one friend free. After checkout, tell us their name so we can check you both in.",
    },
    {
      question: "Do I need experience?",
      answer:
        "No. Both yoga and pilates are taught in a welcoming, beginner-friendly way. Come as you are.",
    },
    {
      question: "Do I need to bring a mat?",
      answer:
        "Bring your own if you have one. Mats are also available to rent at the studio.",
    },
    {
      question: "Where is it?",
      answer:
        "Studio E, 2659 W Division St, Chicago, IL—a unique Latina-focused wellness space in Humboldt Park.",
    },
    {
      question: "What happens after I purchase?",
      answer:
        "Complete checkout, then tell us your friend’s name. If you bought one class, text which one you want—Yoga at 10 AM or Pilates at 11 AM. Then show up Saturday.",
    },
    {
      question: "What should I wear?",
      answer: "Comfortable clothes you can stretch and move in. Bare feet or grip socks work well.",
    },
    CANT_MAKE_THIS_WEEK_FAQ,
  ],
}
