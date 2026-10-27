/** Studio E Google Business Profile (from Google Maps place URL). */
export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Studio+E/@41.90265,-87.69418,17z/data=!4m6!3m5!1s0x880fd33a872cc87d:0xeecb5e416ff48003!8m2!3d41.90265!4d-87.69418!16s%2Fg%2F11l6v0xqk0" as const

export const GOOGLE_REVIEW_WRITE_URL =
  "https://g.page/r/CQOA9G9BXsvuEBM/review" as const

/**
 * Hex feature id from Google Maps. Used when looking up Place Details
 * if a ChIJ place id is not configured.
 */
export const GOOGLE_MAPS_FEATURE_ID = "0x880fd33a872cc87d:0xeecb5e416ff48003" as const

/** Optional ChIJ place id — set via env GOOGLE_PLACE_ID when available. */
export const GOOGLE_PLACE_ID_FALLBACK = process.env.GOOGLE_PLACE_ID || ""
