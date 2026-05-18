export const STUDIO_ADDRESS = "2657 W Division St, Chicago, IL 60622"
export const STUDIO_MAP_EMBED_URL =
  "https://maps.google.com/maps?q=2657%20W%20Division%20St%2C%20Chicago%2C%20IL%2060622&t=&z=15&ie=UTF8&iwloc=&output=embed"

export const FITNESS_STUDIO_ADDRESS = "2659 W Division St, Chicago, IL 60622"
export const FITNESS_STUDIO_MAP_EMBED_URL =
  "https://maps.google.com/maps?q=2659%20W%20Division%20St%2C%20Chicago%2C%20IL%2060622&t=&z=15&ie=UTF8&iwloc=&output=embed"

export const ACUITY_SCHEDULE_URL =
  "https://app.acuityscheduling.com/schedule/76f316b6/?template=class"

export const SQUARE_DANCE_PASS_URL = "https://square.link/u/XiB4krZT"
export const SQUARE_FITNESS_PASS_URL = "https://square.link/u/3S5ogGf8"

export const FEST_DAYS = ["M", "T", "W", "Th", "F"] as const
export type FestDay = (typeof FEST_DAYS)[number]
