import {
  GOOGLE_MAPS_PLACE_URL,
  GOOGLE_PLACE_ID_FALLBACK,
} from "./config"
import { GOOGLE_FIVE_STAR_SNAPSHOT } from "./snapshot"
import type { GoogleReview, GoogleReviewsResponse } from "./types"

function truncateReview(text: string, max = 320) {
  const cleaned = text.replace(/\s+/g, " ").trim()
  if (cleaned.length <= max) return cleaned
  const slice = cleaned.slice(0, max)
  const lastSpace = slice.lastIndexOf(" ")
  return `${(lastSpace > 180 ? slice.slice(0, lastSpace) : slice).trim()}…`
}

function onlyFiveStars(reviews: GoogleReview[]) {
  return reviews
    .filter((r) => r.rating === 5 && r.text.trim().length > 40)
    .map((r) => ({ ...r, text: truncateReview(r.text) }))
    .slice(0, 3)
}

/**
 * Places API (New) Place Details — returns up to 5 reviews when a key is set.
 * Docs: https://developers.google.com/maps/documentation/places/web-service/place-details
 */
async function fetchFromPlacesApi(): Promise<GoogleReviewsResponse | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.GOOGLE_MAPS_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID || GOOGLE_PLACE_ID_FALLBACK
  if (!apiKey || !placeId) return null

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "rating,userRatingCount,reviews.rating,reviews.text,reviews.authorAttribution,reviews.relativePublishTimeDescription",
    },
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    console.error("Google Places reviews fetch failed", res.status, await res.text())
    return null
  }

  const data = (await res.json()) as {
    rating?: number
    userRatingCount?: number
    reviews?: Array<{
      rating?: number
      text?: { text?: string }
      relativePublishTimeDescription?: string
      authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
    }>
  }

  const mapped: GoogleReview[] = (data.reviews ?? []).map((r) => ({
    authorName: r.authorAttribution?.displayName || "Google reviewer",
    rating: r.rating ?? 0,
    text: r.text?.text || "",
    relativeTime: r.relativePublishTimeDescription,
    authorUrl: r.authorAttribution?.uri,
    profilePhotoUrl: r.authorAttribution?.photoUri,
  }))

  const fiveStar = onlyFiveStars(mapped)
  if (fiveStar.length === 0) return null

  return {
    reviews: fiveStar,
    rating: data.rating,
    userRatingCount: data.userRatingCount,
    mapsUrl: GOOGLE_MAPS_PLACE_URL,
    source: "google_places",
    fetchedAt: new Date().toISOString(),
  }
}

export async function getGoogleFiveStarReviews(): Promise<GoogleReviewsResponse> {
  try {
    const live = await fetchFromPlacesApi()
    if (live && live.reviews.length > 0) return live
  } catch (error) {
    console.error("Google Places reviews error", error)
  }

  return {
    reviews: onlyFiveStars([...GOOGLE_FIVE_STAR_SNAPSHOT]),
    rating: 4.9,
    userRatingCount: 73,
    mapsUrl: GOOGLE_MAPS_PLACE_URL,
    source: "google_maps_snapshot",
    fetchedAt: new Date().toISOString(),
  }
}
