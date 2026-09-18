import {
  CANT_MAKE_THIS_WEEK_FAQ,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const REGGAETON_CONFIG: PopupClassLandingConfig = {
  id: "reggaeton",
  checkoutUrl: "https://link.fastpaydirect.com/payment-link/6aadc331f426560dbc2f11a8",
  spotsStorageKey: "studioe_reggaeton_spots_left_v1",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "reggaeton_wednesday",
  },
  event: {
    name: "Reggaeton Wednesday",
    format: "Beginner-friendly reggaeton class",
    startHour: 19,
    startMinute: 30,
    timeZone: "America/Chicago",
    weekday: 3,
    durationLabel: "7:30 PM to 8:30 PM",
    price: 25,
    capacity: 20,
    venueName: "Studio E",
    addressLine: "2657 W Division St",
    cityLine: "Chicago, IL",
    neighborhood: "In the heart of Humboldt Park",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=2657+W+Division+St,+Chicago,+IL+60622&output=embed",
  },
  assets: {
    flyer:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Reggaeton_popup.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Reggaeton_vid.mp4",
  },
  copy: {
    accentLabel: "Open to All",
    heroHeadline: "Reggaeton Night: A High-Energy Dance Class in Humboldt Park",
    heroSubheadline:
      "Learn fun, confident movement in a judgment-free room, bring your best friend for free, and leave feeling amazing.",
    primaryCta: "Reserve My Spot for $25",
    secondaryCta: "Bring My Friend",
    capacityNote:
      "Only 20 tickets available for personalized instruction and sufficient mirror space.",
    videoHeadline: "Come for the Fun. Leave With More Confidence.",
    offerHeadline: "Your $25 Gets You In",
    friendHeadline: "Bring Your Best Friend Free",
    friendBody:
      "Your ticket includes one free spot for a friend who is new to the studio. Come together, learn together, and make Wednesday night more fun.",
    priceFriendLine: "$25 · Bring a friend free",
    limitedHeadline: "Only 20 Tickets Available",
    limitedBody:
      "We keep the class small so the instructor can give you real attention and everyone has enough mirror space to learn comfortably.",
    communityHeadline: "A Judgment-Free Dance Space",
    communityBody:
      "This class is designed as a supportive space where anyone can move, learn, laugh, and build confidence without feeling judged.",
    communityBadge: null,
    finalHeadline: "Your Wednesday Night Plans Are Set.",
    finalBody: "Grab your ticket, bring your friend, and come move with us in Humboldt Park.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Reggaeton class flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Reggaeton class energy at Studio E",
  },
  offerBullets: [
    "60-minute beginner-friendly reggaeton class",
    "A fun, welcoming environment open to all",
    "Bring one friend free",
    "Personalized instruction in a capped 20-person class",
    "A high-energy Wednesday night experience in Humboldt Park",
  ],
  offerTerms: [
    "The paying customer and free friend must attend together.",
    "The free friend must be new to the studio.",
    "One free friend per paid ticket.",
    "Only 20 total tickets available.",
  ],
  faqs: [
    {
      question: "Do I need dance experience?",
      answer:
        "No. The class is beginner-friendly and designed for anyone who wants to try something fun in a supportive environment.",
    },
    {
      question: "What does my ticket include?",
      answer: "One spot in the 60-minute Reggaeton class at Studio E.",
    },
    {
      question: "Can I bring a friend?",
      answer:
        "Yes. Each paid ticket includes one free friend who is new to the studio. You must attend together.",
    },
    {
      question: "Who is this class for?",
      answer:
        "This class is open to all. Come as you are — beginners are welcome.",
    },
    {
      question: "Where is the class?",
      answer: "Studio E, 2657 W Division St, Chicago, IL, in Humboldt Park.",
    },
    {
      question: "How many spots are available?",
      answer:
        "Only 20 spots are available to keep instruction personalized and provide sufficient mirror space.",
    },
    {
      question: "What time should I arrive?",
      answer: "We recommend arriving 10 to 15 minutes early for check-in.",
    },
    CANT_MAKE_THIS_WEEK_FAQ,
  ],
}
