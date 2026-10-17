import {
  CANT_MAKE_THIS_WEEK_FAQ,
  PUERTO_RICO_POPUP_THEME,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const SALSA_ON_2_CONFIG: PopupClassLandingConfig = {
  id: "salsa-on-2",
  checkoutUrl: "https://studioe-danceclassestraining.com/salsa-on-2",
  embedCheckout: true,
  spotsStorageKey: "studioe_salsa_on_2_spots_left_v1",
  spotsRange: { min: 5, max: 10 },
  theme: PUERTO_RICO_POPUP_THEME,
  bannerStripe: "puerto-rico",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "salsa_on_2_tuesday",
  },
  event: {
    name: "Salsa On 2 Workshop",
    format: "Weekly Salsa On 2 workshop",
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
    accentLabel: "Tuesday Night Workshop",
    heroHeadline: "Salsa On 2 Workshop: One Sequence, Built for Every Level of On 2.",
    heroSubheadline:
      "A special method that challenges advanced dancers and gives On 2 beginners a real place to learn. You should already dance salsa—this is not a class for complete beginners. Come alone or bring a friend free.",
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
      "On 2 is New York–style mambo—the smooth, musical timing shaped by Puerto Rican and Latin dancers on the floors of NYC and carried today by the strongest social dancers in Chicago. We teach one sequence at several levels in the same room, so advanced dancers stay challenged and dancers stepping into On 2 have a clear path in.",
    communityBadge: "Every Tuesday · 8:30 PM",
    finalHeadline: "Your Tuesday Night Training Is Set.",
    finalBody:
      "Grab your ticket, bring a friend or come solo, and level up your salsa with one focused hour of On 2.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Salsa On 2 Workshop flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Salsa On 2 class at Studio E",
  },
  offerBullets: [
    "60-minute Salsa On 2 workshop",
    "A special multi-level method: one sequence taught so advanced dancers stay challenged",
    "A clear learning space for On 2 beginners who already dance salsa",
    "On 2 timing, footwork, and musicality broken down step by step",
    "Partnerwork you can use on the social floor right away",
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
        "You should already dance salsa. This workshop is not for complete beginners. We use a special method—multiple levels of a similar sequence in the same class—so advanced dancers get real value, and dancers transitioning into On 2 get a place to learn without being left behind.",
    },
    {
      question: "What does my ticket include?",
      answer: "One spot in the 60-minute Salsa On 2 Workshop at Studio E, plus one free friend who is new to the studio.",
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
