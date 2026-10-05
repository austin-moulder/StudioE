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
    durationLabel: "3:00 PM to 6:00 PM · Arrive 2:45 PM",
    price: 150,
    capacity: 20,
    venueName: "Indie Media Studios",
    addressLine: "5553 W Belmont Ave",
    cityLine: "Chicago, IL",
    neighborhood: "Three studio rooms · One location",
    mapsEmbedSrc: "https://www.google.com/maps?q=5553+W+Belmont+Ave,+Chicago,+IL&output=embed",
  },
  assets: {
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Posing.png",
    flyerSize: { width: 2550, height: 3300 },
  },
  gallery: {
    images: [
      `${EXAMPLES}/DSC02600.jpg`,
      `${EXAMPLES}/DSC02676.jpg`,
      `${EXAMPLES}/DSC03418.jpg`,
      `${EXAMPLES}/DSC03766.jpg`,
      `${EXAMPLES}/2V1A7013.jpg`,
      `${EXAMPLES}/2V1A4191.jpg`,
      `${EXAMPLES}/2V1A1647.jpg`,
      `${EXAMPLES}/2V1A4600.jpg`,
      `${EXAMPLES}/2V1A4763.jpg`,
      `${EXAMPLES}/2V1A6961.jpg`,
    ],
    imageAlt: "Professional photo from a previous Studio E posing shoot",
  },
  learnPoints: [
    { lead: "Move with confidence", rest: "in front of the camera" },
    { lead: "Pose naturally", rest: "without looking stiff or awkward" },
    { lead: "Style yourself", rest: "for photos that actually feel like you" },
    { lead: "Capture your personality", rest: "through movement" },
  ],
  addressInHero: true,
  process: {
    headline: "How the Day Works",
    steps: [
      {
        title: "Reserve your spot",
        body: "Check out below to lock in your place in the workshop.",
      },
      {
        title: "Get your confirmation",
        body: "You’ll receive a confirmation with everything you need for the day.",
      },
      {
        time: "2:45 PM",
        title: "Arrive and get ready",
        body: "Come to Indie Media Studios at 5553 W Belmont Ave. Use the private changing areas and mirrors, and our stylist will help you level up your look.",
      },
      {
        time: "3:30 – 4:00 PM",
        title: "Posing workshop",
        body: "Learn dynamic poses from professional Latin dancers and photographers.",
      },
      {
        time: "4:00 PM",
        title: "Shoot across three studio rooms",
        body: "Put your new poses to work in three different sets, with multiple looks featuring pieces from top Chicago Fashion Week designers.",
      },
      {
        title: "Get your photos",
        body: "Your professionally edited photos are sent to you within 7 days of the workshop.",
      },
    ],
  },
  copy: {
    heroEyebrow: "Studio E × Indie Media Studios",
    locationHeadline: "Where We Shoot",
    accentLabel: "Chicago Fashion Week",
    heroHeadline: "Pose With Confidence: Look Better in Every Photo",
    heroSubheadline:
      "Instantly look better on camera with dynamic poses developed by professional Latin dancers and professional photographers. A 3-hour workshop with a directed photoshoot, multiple looks with pieces from top Chicago designers, and 5 edited photos.",
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
    priceFriendLine: "$150 · Pro photos & designer looks included",
    limitedHeadline: "Limited Spots Available",
    limitedBody:
      "We keep the group small so the photographer and dance coaches can direct every guest personally.",
    communityHeadline: "Part of Chicago Fashion Week",
    communityBody:
      "Join us at Indie Media Studios for an afternoon of movement, style, and pieces from Chicago Fashion Week designers—then stay to connect with the community after the shoot.",
    communityBadge: "Chicago Fashion Week · October 18",
    finalHeadline: "Look Like Yourself—Only Better.",
    finalBody:
      "Three hours. Pro direction, three studio sets, multiple looks with pieces from top Chicago designers, and photos you’ll use for years.",
    countdownEnded: "The workshop is underway.",
    stickyCta: "Reserve My Spot — $150",
    flyerAlt: "Pose With Confidence posing workshop flyer at Indie Media Studios — $150",
    videoAriaLabel: "Pose With Confidence workshop",
  },
  offerBullets: [
    "Posing fundamentals workshop with professional Latin dancers",
    "Shoot across 3 different studio rooms at Indie Media Studios",
    "Multiple looks with pieces from top Chicago Fashion Week designers",
    "A stylist on standby for hair, makeup, and accessory guidance",
    "Private changing areas and mirrors to get ready",
    "Directed photoshoot with a professional photographer",
    "5 professionally edited photos",
    "Post-workshop social connection with the community",
  ],
  offerTerms: [
    "One-time workshop: Sunday, October 18, 3:00–6:00 PM (arrive 2:45 PM).",
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
        "A posing fundamentals workshop, a directed photoshoot with a professional photographer across 3 studio rooms, multiple looks with pieces from top Chicago designers, a stylist on standby for hair, makeup, and accessory guidance, 5 professionally edited photos, and a post-workshop social.",
    },
    {
      question: "Will someone do my hair and makeup?",
      answer:
        "Our stylist is on standby to give guidance and help you polish your look, but this isn’t a full makeover. Come mostly ready, and we’ll help you take it to the next level.",
    },
    {
      question: "When and where is it?",
      answer:
        "Sunday, October 18, at Indie Media Studios, 5553 W Belmont Ave, Chicago, IL. Arrive at 2:45 PM to get ready. The workshop runs 3:30 to 4:00 PM, then we shoot across three different studio rooms, all in the same building.",
    },
    {
      question: "Is this part of Chicago Fashion Week?",
      answer: "Yes. Pose With Confidence is part of Chicago Fashion Week.",
    },
    {
      question: "What should I wear or bring?",
      answer:
        "Bring a look you feel confident in. Select professional designers from Chicago Fashion Week will also be there with special pieces to add variety to your looks—all included in the shoot. Feel free to bring accessories that speak to your personality too (jewelry, watches, headwear, props). There are private changing areas and mirrors on site to help you get ready.",
    },
    {
      question: "When do I get my photos?",
      answer: "Your 5 professionally edited photos are sent to you within 7 days of the workshop.",
    },
    {
      question: "What time should I arrive?",
      answer:
        "Arrive at 2:45 PM so you have time to change and get styled before the workshop starts at 3:30 PM.",
    },
  ],
}
