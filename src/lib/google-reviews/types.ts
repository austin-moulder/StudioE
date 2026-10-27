export type GoogleReview = {
  authorName: string
  rating: number
  text: string
  relativeTime?: string
  authorUrl?: string
  profilePhotoUrl?: string
}

export type GoogleReviewsResponse = {
  reviews: GoogleReview[]
  rating?: number
  userRatingCount?: number
  mapsUrl: string
  source: "google_places" | "google_maps_snapshot"
  fetchedAt: string
}
