import {
  CANT_MAKE_THIS_WEEK_FAQ,
  DOMINICAN_POPUP_THEME,
  type PopupClassLandingConfig,
} from "@/lib/popup-class/types"

export const META_PIXEL_ID = "1976276599649833" as const

export const MERENGUE_CONFIG: PopupClassLandingConfig = {
  id: "merengue",
  checkoutUrl: "https://studioe-danceclassestraining.com/merengue",
  embedCheckout: true,
  spotsStorageKey: "studioe_merengue_spots_left_v1",
  theme: DOMINICAN_POPUP_THEME,
  bannerStripe: "dominican",
  utm: {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "merengue_wednesday",
  },
  event: {
    name: "Merengue Workshop",
    format: "High-energy merengue partnerwork",
    startHour: 18,
    startMinute: 30,
    timeZone: "America/Chicago",
    weekday: 3,
    durationLabel: "6:30 PM to 7:30 PM",
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
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Merengue_PopUp.png",
    video:
      "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Popups/Merengue_Vid.mp4",
  },
  learnPoints: [
    { lead: "Learn the basic step", rest: "so you can start the same night" },
    { lead: "Pick up the hidden tricks", rest: "that turn one step into endless variety" },
    { lead: "Stay on the floor", rest: "without running out of ideas" },
  ],
  copy: {
    accentLabel: "Wednesday Night Merengue",
    heroHeadline: "Merengue: Learn the Basics. Dance It All Night.",
    heroSubheadline:
      "A high-energy workshop for every level. Absolute beginners get the basics. If you already dance merengue, a few hidden tricks give you unlimited variety on the floor.",
    primaryCta: "Reserve My Spot for $25",
    secondaryCta: "Bring My Friend",
    capacityNote:
      "Only 20 tickets available for personalized instruction and enough floor space to really move.",
    videoHeadline: "High Energy. Built to Last All Night.",
    educationHeadline: "Basics First. Then Unlimited Variety.",
    educationBody:
      "Merengue is the Dominican party dance—a simple step with more room to play than it looks. We start with the basics so absolute beginners can get on the floor, then show the small tricks that keep the same dance feeling new for hours. Intermediate dancers use those tricks to level up their creativity fast.",
    offerHeadline: "Your $25 Gets You In",
    friendHeadline: "Bring Your Best Friend Free",
    friendBody:
      "Your ticket includes one free spot for a friend who is new to the studio. Learn the partnerwork together and take it straight to the social floor.",
    priceFriendLine: "$25 · Bring a friend free",
    limitedHeadline: "Only 20 Tickets Available",
    limitedBody:
      "We keep the room small so the instructor can coach your step and everyone has room to dance.",
    communityHeadline: "The Dance You Can Keep Going",
    communityBody:
      "Merengue fills Dominican parties because the step is simple and the variations never run out. This workshop is the fastest way to learn it—welcoming for absolute beginners, and a creativity boost if you already know the basic.",
    communityBadge: "All levels · Absolute beginners welcome",
    finalHeadline: "Your Wednesday Night Plans Are Set.",
    finalBody:
      "Grab your ticket, bring a friend or come solo, and leave with merengue you can dance all night.",
    countdownEnded: "Class is starting soon.",
    stickyCta: "Reserve My Spot — $25",
    flyerAlt: "Merengue partnerwork workshop flyer at Studio E — bring a friend for free, $25",
    videoAriaLabel: "Merengue class energy at Studio E",
  },
  offerBullets: [
    "60-minute high-energy merengue workshop",
    "Basics for absolute beginners",
    "Hidden tricks that give you unlimited variety on the dance floor",
    "Partnerwork you can use the same night",
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
        "No. Absolute beginners are welcome—we start with the basic merengue step. If you already dance it, the workshop is built so you can level up your creativity fast.",
    },
    {
      question: "What will I actually learn?",
      answer:
        "The basics of merengue, plus hidden tricks that turn one step into unlimited variety so you can keep dancing it all night.",
    },
    {
      question: "Do I need a partner?",
      answer:
        "No. Come alone or bring a friend. It’s a partnerwork workshop, and we rotate so everyone gets practice.",
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
        "Only 20 spots are available so instruction stays personal and everyone has room to move.",
    },
    {
      question: "What time should I arrive?",
      answer: "We recommend arriving 10 to 15 minutes early for check-in.",
    },
    CANT_MAKE_THIS_WEEK_FAQ,
  ],
}
