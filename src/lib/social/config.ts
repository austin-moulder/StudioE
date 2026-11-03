/**
 * Friday intro lesson + social RSVP landing (/social).
 */

export const SOCIAL_TIME_ZONE = "America/Chicago" as const

export const RSVP_FORM = {
  id: "a5zi6OeuMxKDAXasoveA",
  url: "https://api.leadconnectorhq.com/widget/form/a5zi6OeuMxKDAXasoveA",
  name: "Friday Intro Lesson & Social RSVP",
} as const

export const VENUE = {
  name: "Studio E",
  addressLine: "2657 W Division St",
  cityLine: "Chicago, IL 60622",
  neighborhood: "Humboldt Park",
  parkingNote: "Free parking available on Washtenaw and Rockwell, and in the park.",
} as const

export const SCHEDULE = {
  introLabel: "Free Intro Lesson: 7:00–8:00 PM",
  socialLabel: "Social Dancing: 7:30–10:00 PM",
  introShort: "7:00–8:00 PM",
  socialShort: "7:30–10:00 PM",
} as const

export const ASSETS = {
  hero:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05366.jpg",
  gallery: [
    {
      src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05448.jpg",
      alt: "Dancers smiling and dancing together at a Studio E Friday social",
    },
    {
      src: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/IMG_1101.JPG",
      alt: "Studio E instructor teaching Latin dance before Friday social dancing",
    },
  ],
  testimonialVideoEmbed: "https://www.youtube.com/embed/-q-yfv1YEI0",
} as const

export type FridayTheme = {
  /** YYYY-MM-DD in America/Chicago */
  dateKey: string
  title: string
  public: boolean
  note?: string
}

/** Fixed 2026 Friday themes for the social calendar. */
export const FRIDAY_THEMES_2026: readonly FridayTheme[] = [
  { dateKey: "2026-11-06", title: "Fall Social", public: true },
  {
    dateKey: "2026-11-13",
    title: "Private Event",
    public: false,
    note: "No public social this Friday",
  },
  { dateKey: "2026-11-20", title: "La Parranda Boricua Social", public: true },
  { dateKey: "2026-12-04", title: "Bachata & Chill Social", public: true },
  { dateKey: "2026-12-11", title: "Christmas Music Salsa/Bachata Social", public: true },
  { dateKey: "2026-12-18", title: "White Elephant/Loteria Social", public: true },
] as const

export const BENEFITS = [
  {
    title: "Learn without feeling lost",
    body: "A beginner-friendly intro lesson gets you moving before the social starts.",
  },
  {
    title: "Come solo, leave connected",
    body: "No partner required. Meet people through movement instead of awkward small talk.",
  },
  {
    title: "Dance in a real community",
    body: "Enjoy Salsa, Bachata, Latin music, and a welcoming Humboldt Park dance floor.",
  },
] as const

export const STEPS = [
  {
    title: "RSVP",
    body: "Choose the free intro lesson, the social, or both.",
  },
  {
    title: "Arrive at Studio E",
    body: "Come to 2657 W Division St by 7:00 PM.",
  },
  {
    title: "Learn, connect, and dance",
    body: "Take the intro lesson, then stay for social dancing from 7:30–10:00 PM.",
  },
] as const

export const TESTIMONIALS = [
  {
    name: "Jose M.",
    quote:
      "Had a great experience at Studio E. Austin was very helpful and patient, this is a great opportunity for beginners and seasoned dancers to learn and improve their skills. Highly recommended!",
    link: "https://maps.app.goo.gl/9GS6sBGT2XaBC58LA",
  },
  {
    name: "Sylvia K.",
    quote:
      "Studio E is an amazing place to learn to dance!! I was a complete beginner and Austin was able to get me to dancing salsa and bachata confidently in no time.",
    link: "https://maps.app.goo.gl/HPLEJRjhfzVNs5jp9",
  },
  {
    name: "Emily G.",
    quote:
      "I love coming to Studio E! There’s so many fun classes and events to meet people at. The 28 day salsa challenge has helped me so much become a more confident social dancer. I can’t wait for summer and more salsa with Studio E.",
    link: "https://maps.app.goo.gl/SxfKnQnBZmfk67ua6",
  },
] as const

export const FAQS = [
  {
    question: "Do I need a partner?",
    answer: "No. Come solo — no partner required.",
  },
  {
    question: "I’ve never danced before. Is this for me?",
    answer:
      "Yes. The intro lesson is beginner-friendly and designed to get you moving before the social starts.",
  },
  {
    question: "What should I wear?",
    answer: "Comfortable clothes and shoes you can move in.",
  },
  {
    question: "What time should I arrive?",
    answer: "Arrive by 7:00 PM for the free intro lesson. Social dancing runs 7:30–10:00 PM.",
  },
  {
    question: "What is free?",
    answer:
      "Your first intro dance lesson is free with RSVP. That covers the 7:00–8:00 PM beginner-friendly intro.",
  },
  {
    question: "Is the intro lesson really free?",
    answer: "Yes. The first intro lesson is free with RSVP.",
  },
  {
    question: "How long is the social?",
    answer: "Social dancing runs from 7:30–10:00 PM.",
  },
  {
    question: "Is there an age requirement?",
    answer: "All ages are welcome.",
  },
  {
    question: "What happens after I RSVP?",
    answer:
      "We’ll send you the details so you know exactly what to expect — where to go, when to arrive, and how the night works.",
  },
  {
    question: "Is there a donation?",
    answer:
      "The first intro lesson is free with RSVP. Friday socials ask for a $10–$25 donation at the door to help pay instructors. Most attendees give $15–$25.",
  },
] as const

type ChicagoParts = {
  year: number
  month: number
  day: number
  weekday: number // 0 Sun … 6 Sat
}

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

function getChicagoParts(date: Date): ChicagoParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SOCIAL_TIME_ZONE,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? ""

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: WEEKDAY_MAP[get("weekday")] ?? 0,
  }
}

function addDays(year: number, month: number, day: number, days: number) {
  const base = new Date(Date.UTC(year, month - 1, day + days))
  return {
    year: base.getUTCFullYear(),
    month: base.getUTCMonth() + 1,
    day: base.getUTCDate(),
  }
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function getNextFridayParts(now: Date = new Date()) {
  const today = getChicagoParts(now)
  const daysUntilFriday = (5 - today.weekday + 7) % 7
  return addDays(today.year, today.month, today.day, daysUntilFriday)
}

export function formatFridayLabel(year: number, month: number, day: number) {
  const utc = new Date(Date.UTC(year, month - 1, day, 18, 0, 0))
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(utc)
}

export function formatThemeDateLabel(dateKey: string) {
  const [y, m, d] = dateKey.split("-").map(Number)
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d, 18, 0, 0)))
}

export function findTheme(dateKey: string): FridayTheme | null {
  return FRIDAY_THEMES_2026.find((t) => t.dateKey === dateKey) ?? null
}

export type UpcomingFridayInfo = {
  dateKey: string
  year: number
  month: number
  day: number
  dateLabel: string
  theme: FridayTheme | null
  isPublic: boolean
  themeTitle: string
  /** Next public Friday on/after this date (for private weeks). */
  nextPublic: {
    dateKey: string
    dateLabel: string
    theme: FridayTheme
  } | null
}

export function getUpcomingFridayInfo(now: Date = new Date()): UpcomingFridayInfo {
  const fri = getNextFridayParts(now)
  const dateKey = toDateKey(fri.year, fri.month, fri.day)
  const theme = findTheme(dateKey)
  const isPublic = theme ? theme.public : true
  const themeTitle = theme?.title ?? "Friday Social"

  let nextPublic: UpcomingFridayInfo["nextPublic"] = null
  if (!isPublic) {
    const upcoming = FRIDAY_THEMES_2026.find((t) => t.public && t.dateKey > dateKey)
    if (upcoming) {
      const [y, m, d] = upcoming.dateKey.split("-").map(Number)
      nextPublic = {
        dateKey: upcoming.dateKey,
        dateLabel: formatFridayLabel(y, m, d),
        theme: upcoming,
      }
    }
  }

  return {
    dateKey,
    year: fri.year,
    month: fri.month,
    day: fri.day,
    dateLabel: formatFridayLabel(fri.year, fri.month, fri.day),
    theme,
    isPublic,
    themeTitle,
    nextPublic,
  }
}
