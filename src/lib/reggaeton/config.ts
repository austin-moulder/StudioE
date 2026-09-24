import {
  CANT_MAKE_THIS_WEEK_FAQ,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const REGGAETON_CONFIG: PopupClassLandingConfig = {
  id: "reggaeton",
  checkoutUrl: "https://studioe-danceclassestraining.com/reggaeton-checkout",
  embedCheckout: true,
  /** Bumped so returning visitors get a fresh spots-left roll for the Friday schedule. */
  spotsStorageKey: "studioe_reggaeton_spots_left_v2",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "reggaeton_friday",
  },
  event: {
    name: "Reggaeton Friday",
    format: "Beginner-friendly reggaeton class + club night pre-game",
    startHour: 21,
    startMinute: 0,
    timeZone: "America/Chicago",
    weekday: 5,
    durationLabel: "9:00 PM to 10:00 PM",
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
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Reggaeton_Popup.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Reggaeton_vid.mp4",
  },
  copy: {
    accentLabel: "Class + Club Pre-Game",
    heroHeadline: "Reggaeton Friday: Learn the Moves. Meet Your People. Hit the Club.",
    heroSubheadline:
      "Come alone or bring a friend. Learn fundamentals you can improvise with on the floor, meet new people, then we all head to a local club that plays reggaeton together.",
    primaryCta: "Reserve My Spot for $25",
    secondaryCta: "Bring My Friend",
    capacityNote:
      "Only 20 tickets available for personalized instruction and sufficient mirror space.",
    videoHeadline: "Come for the Fun. Leave Ready for the Club.",
    offerHeadline: "Your $25 Gets You In",
    friendHeadline: "Bring Your Best Friend Free",
    friendBody:
      "Your ticket includes one free spot for a friend who is new to the studio. Show up together, learn together, and roll into the night with a built-in crew.",
    priceFriendLine: "$25 · Bring a friend free",
    limitedHeadline: "Only 20 Tickets Available",
    limitedBody:
      "We keep the class small so the instructor can give you real attention and everyone has enough mirror space to learn comfortably.",
    communityHeadline: "Your Night Out, Sorted",
    communityBody:
      "Want to dance but don’t always have the girl squad — and don’t have the moves ready? We take care of both. This is an exciting class that doubles as a pre-game: BYOB (be responsible), right next door to Studio E’s Latin Dance Happy Hour social. After class, we finish by heading to a local club that plays reggaeton together. Instructor Brandon Hampton — a proud gay man — is on call as the nightly safety contact. If you’re out and need someone to help with creeps, or just want a dance partner, he’s there and ready.",
    communityBadge: "Safety contact on call: Brandon Hampton",
    finalHeadline: "Your Friday Night Plans Are Set.",
    finalBody:
      "Grab your ticket, bring a friend or come solo, learn the moves, meet people, and head to the club with us.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Reggaeton Friday flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Reggaeton class energy at Studio E",
  },
  offerBullets: [
    "60-minute beginner-friendly reggaeton class",
    "Fundamental steps you can improvise with at the club",
    "Come alone or bring one friend free (new to the studio)",
    "Meet new people before you go out",
    "We finish class by heading to a local reggaeton club together",
    "Right next door to Studio E’s Latin Dance Happy Hour social",
    "BYOB — be responsible",
    "Personalized instruction in a capped 20-person class",
  ],
  offerTerms: [
    "The paying customer and free friend must attend together.",
    "The free friend must be new to the studio.",
    "One free friend per paid ticket.",
    "Only 20 total tickets available.",
    "BYOB — drink responsibly.",
  ],
  faqs: [
    {
      question: "Do I need dance experience?",
      answer:
        "No. The class is beginner-friendly. We focus on fundamentals you can actually use to improvise when you get to the club.",
    },
    {
      question: "What does my ticket include?",
      answer:
        "One spot in the 60-minute Reggaeton Friday class at Studio E, plus the group plan to head to a local club that plays reggaeton after class.",
    },
    {
      question: "Can I come alone?",
      answer:
        "Yes. Come alone or bring a friend. The class is built so you can meet people and leave with a crew for the night.",
    },
    {
      question: "Can I bring a friend?",
      answer:
        "Yes. Each paid ticket includes one free friend who is new to the studio. You must attend together.",
    },
    {
      question: "Is this a women-only class?",
      answer: "No. This class is open to all.",
    },
    {
      question: "What about the club after class?",
      answer:
        "We finish the class by heading together to a local club that plays reggaeton. Think of the class as your pre-game with moves, music, and people.",
    },
    {
      question: "Is the class BYOB?",
      answer: "Yes. BYOB — please be responsible.",
    },
    {
      question: "Who is the safety contact?",
      answer:
        "Instructor Brandon Hampton is a proud gay man and the nightly safety contact. If you’re out and need help with creeps, or just want a dance partner, he’s on call and ready.",
    },
    {
      question: "Where is the class?",
      answer:
        "Studio E, 2657 W Division St, Chicago, IL, in Humboldt Park — right next door to Studio E’s Latin Dance Happy Hour social.",
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
