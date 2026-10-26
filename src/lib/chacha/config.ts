import {
  BALLROOM_POPUP_THEME,
  CANT_MAKE_THIS_WEEK_FAQ,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const CHACHA_CONFIG: PopupClassLandingConfig = {
  id: "chacha",
  checkoutUrl: "https://studioe-danceclassestraining.com/chacha",
  embedCheckout: true,
  spotsStorageKey: "studioe_chacha_spots_left_v1",
  theme: BALLROOM_POPUP_THEME,
  bannerStripe: "ballroom",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "chacha_tuesday",
  },
  event: {
    name: "Cha-Cha Workshop",
    format: "Street-style cha-cha for the social floor",
    startHour: 19,
    startMinute: 30,
    timeZone: "America/Chicago",
    weekday: 2,
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
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/ChaCha_PopUp.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/ChaCha_Vid.mp4",
  },
  learnPoints: [
    { lead: "Get the social timing", rest: "so cha-cha feels natural on a crowded floor" },
    { lead: "Leave with something new", rest: "whether this is your first class or your fiftieth" },
    { lead: "Use it the same night", rest: "at the social, not just in the lesson" },
  ],
  copy: {
    accentLabel: "Tuesday Night Cha-Cha",
    heroHeadline: "Cha-Cha the Way It’s Danced at Socials.",
    heroSubheadline:
      "All levels welcome. The instructor scales the class up and down so everyone leaves with at least one new thing—street-style cha-cha you can actually use on the social floor.",
    primaryCta: "Reserve My Spot for $25",
    secondaryCta: "Bring My Friend",
    capacityNote:
      "Only 20 tickets available so the instructor can meet you where you are.",
    videoHeadline: "Ballroom Polish. Social Floor Energy.",
    educationHeadline: "The Cha-Cha People Actually Dance.",
    educationBody:
      "This is street-style cha-cha—the version you hear and dance at socials—not a competition syllabus. The room has a little ballroom polish. The dancing is built for a real floor. Beginners get a clear basic. Dancers who already know cha-cha get the next layer. The instructor scales the same material so every level takes away at least one new thing.",
    offerHeadline: "Your $25 Gets You In",
    friendHeadline: "Bring Your Best Friend Free",
    friendBody:
      "Your ticket includes one free spot for a friend who is new to the studio. Learn the social cha-cha together and take it straight to the floor.",
    priceFriendLine: "$25 · Bring a friend free",
    limitedHeadline: "Only 20 Tickets Available",
    limitedBody:
      "We keep the room small so the instructor can scale the material and everyone has room to dance.",
    communityHeadline: "One Class. Something New for Every Level.",
    communityBody:
      "Absolute beginners are welcome, and so are people who already dance cha-cha at socials. The curriculum moves with the room, so nobody sits through a class that is only for someone else.",
    communityBadge: "All levels · Everyone leaves with something new",
    finalHeadline: "Your Tuesday Night Plans Are Set.",
    finalBody:
      "Grab your ticket, bring a friend or come solo, and leave with cha-cha you can dance at the social.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Cha-Cha workshop flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Cha-Cha class at Studio E",
  },
  offerBullets: [
    "60-minute street-style cha-cha workshop",
    "The cha-cha danced at socials",
    "Curriculum scaled so every level learns something new",
    "All levels welcome, including absolute beginners",
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
      question: "Do I need dance experience?",
      answer:
        "No. All levels are welcome, including absolute beginners. The instructor scales the class up and down so everyone leaves with at least one new thing.",
    },
    {
      question: "Is this ballroom cha-cha?",
      answer:
        "The room has a little ballroom feel. The dancing is street-style cha-cha—the kind people dance at socials.",
    },
    {
      question: "What if I’m already dancing cha-cha?",
      answer:
        "Stay. The same class is taught in layers, so experienced dancers get a harder version while beginners stay with the basic.",
    },
    {
      question: "Do I need a partner?",
      answer: "No. Come alone or bring a friend. You’ll still get to practice the social cha-cha.",
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
        "Only 20 spots are available so the instructor can scale the material and everyone has room to move.",
    },
    {
      question: "What time should I arrive?",
      answer: "We recommend arriving 10 to 15 minutes early for check-in.",
    },
    CANT_MAKE_THIS_WEEK_FAQ,
  ],
}
