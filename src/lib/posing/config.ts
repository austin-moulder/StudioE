import { POSING_POPUP_THEME, type PopupClassLandingConfig } from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

const EXAMPLES =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Posing_Examples" as const

export const POSING_CONFIG: PopupClassLandingConfig = {
  id: "posing",
  checkoutUrl: "https://studioe-danceclassestraining.com/posing-checkout",
  embedCheckout: true,
  spotsStorageKey: "studioe_posing_spots_left_v1",
  theme: POSING_POPUP_THEME,
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "posing_workshop",
  },
  event: {
    name: "Pose With Confidence",
    format: "Chicago Fashion Week posing workshop + pro photoshoot",
    date: { year: 2026, month: 10, day: 18 },
    weekday: 0,
    startHour: 15,
    startMinute: 0,
    timeZone: "America/Chicago",
    durationLabel: "3:00 PM to 6:00 PM",
    price: 150,
    capacity: 20,
    venueName: "Studio E",
    addressLine: "2657 W Division St",
    cityLine: "Chicago, IL",
    neighborhood: "Paseo Boricua · Humboldt Park",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=2657+W+Division+St,+Chicago,+IL+60622&output=embed",
  },
  assets: {
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Posing_workshop.png",
  },
  gallery: {
    images: [
      `${EXAMPLES}/DSC02600.jpg`,
      `${EXAMPLES}/DSC02676.jpg`,
      `${EXAMPLES}/DSC03418.jpg`,
      `${EXAMPLES}/DSC03502.jpg`,
      `${EXAMPLES}/DSC03766.jpg`,
      `${EXAMPLES}/DSC03925.jpg`,
    ],
    imageAlt: "Professional photo from a previous Studio E posing shoot",
  },
  learnPoints: [
    { lead: "Move with confidence", rest: "in front of the camera" },
    { lead: "Pose naturally", rest: "without looking stiff or awkward" },
    { lead: "Style yourself", rest: "for photos that actually feel like you" },
    { lead: "Capture your personality", rest: "through movement" },
  ],
  copy: {
    accentLabel: "Chicago Fashion Week",
    heroHeadline: "Pose With Confidence: Look Better in Every Photo",
    heroSubheadline:
      "Instantly look better on camera with dynamic poses developed by professional Latin dancers and professional photographers. A 3-hour workshop with a directed photoshoot, styling, hair and makeup, and 5 edited photos.",
    primaryCta: "Reserve My Spot for $150",
    secondaryCta: "",
    capacityNote:
      "Limited spots so every guest gets real direction from the dancers and photographer.",
    videoHeadline: "Shot at Previous Workshops",
    galleryHeadline: "Real Photos From Previous Shoots",
    galleryBody: "Every guest leaves with professionally edited photos like these.",
    educationHeadline: "Learn How To…",
    educationBody:
      "Our poses come from professional Latin dancers who know how bodies read on camera—and photographers who know what makes a shot.",
    offerHeadline: "Your $150 Experience Includes",
    friendHeadline: "",
    friendBody: "",
    priceFriendLine: "$150 · Pro photos, hair & makeup included",
    limitedHeadline: "Limited Spots Available",
    limitedBody:
      "We keep the group small so the photographer and dance coaches can direct every guest personally.",
    communityHeadline: "Part of Chicago Fashion Week",
    communityBody:
      "Join us in Paseo Boricua for an afternoon of movement, style, and photos you’ll actually want to post—then stay to connect with the community after the shoot.",
    communityBadge: "Chicago Fashion Week · October 18",
    finalHeadline: "Look Like Yourself—Only Better.",
    finalBody:
      "Three hours. Pro direction, styling, hair and makeup, three Paseo Boricua locations, and photos you’ll use for years.",
    countdownEnded: "The workshop is underway.",
    stickyCta: "Reserve My Spot — $150",
    flyerAlt: "Pose With Confidence posing workshop flyer at Studio E — $150",
    videoAriaLabel: "Pose With Confidence workshop",
  },
  offerBullets: [
    "60-minute posing fundamentals workshop",
    "3 iconic Paseo Boricua shooting locations",
    "Professional styling, hair, and makeup",
    "Directed photoshoot with a professional photographer",
    "5 professionally edited photos",
    "Post-workshop social connection with the community",
  ],
  offerTerms: [
    "One-time workshop: Sunday, October 18, 3:00–6:00 PM.",
    "Limited spots available.",
  ],
  faqs: [
    {
      question: "Do I need modeling or dance experience?",
      answer:
        "No. The workshop starts with posing fundamentals, so anyone can follow along and look better on camera right away.",
    },
    {
      question: "What’s included for $150?",
      answer:
        "A 60-minute posing fundamentals workshop, styling, hair and makeup, a directed photoshoot with a professional photographer at 3 Paseo Boricua locations, 5 professionally edited photos, and a post-workshop social.",
    },
    {
      question: "When and where is it?",
      answer:
        "Sunday, October 18, from 3:00 to 6:00 PM. We start at Studio E, 2657 W Division St, Chicago, then shoot at locations around Paseo Boricua.",
    },
    {
      question: "Is this part of Chicago Fashion Week?",
      answer: "Yes. Pose With Confidence is part of Chicago Fashion Week.",
    },
    {
      question: "What should I wear or bring?",
      answer:
        "Come in an outfit that feels like you. Our styling guidance will help you get the most out of it on camera.",
    },
    {
      question: "When do I get my photos?",
      answer: "Your 5 professionally edited photos are delivered after the workshop.",
    },
    {
      question: "What time should I arrive?",
      answer: "We recommend arriving 10 to 15 minutes early for check-in.",
    },
  ],
}
