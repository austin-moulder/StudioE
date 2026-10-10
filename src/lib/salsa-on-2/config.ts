import {
  CANT_MAKE_THIS_WEEK_FAQ,
  NYC_POPUP_THEME,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const SALSA_ON_2_CONFIG: PopupClassLandingConfig = {
  id: "salsa-on-2",
  checkoutUrl: "https://studioe-danceclassestraining.com/salsa-on-2",
  embedCheckout: true,
  spotsStorageKey: "studioe_salsa_on_2_spots_left_v1",
  spotsRange: { min: 5, max: 10 },
  theme: NYC_POPUP_THEME,
  bannerStripe: "nyc-subway",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "salsa_on_2_tuesday",
  },
  event: {
    name: "Salsa On 2 Intensive",
    format: "Weekly Salsa On 2 intensive",
    startHour: 20,
    startMinute: 30,
    timeZone: "America/Chicago",
    weekday: 2,
    durationLabel: "8:30 PM to 9:30 PM",
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
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/On_2_Flyer.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Jon_On2.mp4",
  },
  copy: {
    accentLabel: "New York Style · Tuesday Nights",
    heroHeadline: "Salsa On 2 Intensive: Find the Groove Chicago’s Best Dancers Use.",
    heroSubheadline:
      "One focused hour on the timing, footwork, and partnerwork that make On 2 feel smooth and musical. Come alone or bring a friend free.",
    primaryCta: "Reserve My Spot for $25",
    secondaryCta: "Bring My Friend",
    capacityNote:
      "Only 20 tickets available for personalized instruction and sufficient mirror space.",
    videoHeadline: "See the On 2 Groove",
    offerHeadline: "Your $25 Gets You In",
    friendHeadline: "Bring Your Best Friend Free",
    friendBody:
      "Your ticket includes one free spot for a friend who is new to the studio. Train together, rotate partners, and leave with someone to practice with on the social floor.",
    priceFriendLine: "$25 · Bring a friend free",
    limitedHeadline: "Only 20 Tickets Available",
    limitedBody:
      "We keep the class small so the instructor can correct your timing and technique in real time and everyone has enough mirror space.",
    communityHeadline: "Train Hard. Then Go Dance.",
    communityBody:
      "On 2 is New York–style mambo—the smooth, musical timing born on the dance floors of NYC and carried by the strongest social dancers in Chicago. This intensive breaks it down so it actually clicks—then you put it to work with a room full of people who love salsa as much as you do.",
    communityBadge: "Every Tuesday · 8:30 PM",
    finalHeadline: "Your Tuesday Night Training Is Set.",
    finalBody:
      "Grab your ticket, bring a friend or come solo, and level up your salsa with one focused hour of On 2.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Salsa On 2 Intensive flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Salsa On 2 class at Studio E",
  },
  offerBullets: [
    "60-minute Salsa On 2 intensive",
    "On 2 timing, footwork, and musicality broken down step by step",
    "Partnerwork you can use on the social floor right away",
    "Multiple levels of the same sequence—for dancers new to On 2 and seasoned Mamboheads alike",
    "Come alone or bring one friend free (new to the studio)",
    "Personalized instruction in a capped 20-person class",
  ],
  offerTerms: [
    "The paying customer and free friend must attend together.",
    "The free friend must be new to the studio.",
    "One free friend per paid ticket.",
    "Only 20 total tickets available.",
  ],
  faqs: [
    {
      question: "What experience do I need?",
      answer:
        "You should have experience dancing salsa. Each class teaches multiple levels of a similar sequence, so there’s something for both the dancer transitioning into On 2 and the well-traveled Mambohead.",
    },
    {
      question: "What does my ticket include?",
      answer: "One spot in the 60-minute Salsa On 2 Intensive at Studio E, plus one free friend who is new to the studio.",
    },
    {
      question: "Do I need a partner?",
      answer: "No. Come alone or bring a friend. We rotate partners so everyone gets practice.",
    },
    {
      question: "Can I bring a friend?",
      answer:
        "Yes. Each paid ticket includes one free friend who is new to the studio. You must attend together.",
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
