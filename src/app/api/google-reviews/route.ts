import { NextResponse } from "next/server"
import { getGoogleFiveStarReviews } from "@/lib/google-reviews/fetch"

export const revalidate = 3600

export async function GET() {
  const payload = await getGoogleFiveStarReviews()
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
