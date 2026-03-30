import { NextResponse } from "next/server"

const ACUITY_SCHEDULE_URL =
  "https://app.acuityscheduling.com/schedule/76f316b6/?template=class"

export function GET() {
  return NextResponse.redirect(ACUITY_SCHEDULE_URL)
}
