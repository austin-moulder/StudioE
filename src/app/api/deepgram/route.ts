import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // For build time, we just return an empty key
  // At runtime, this will return the actual API key if set
  return NextResponse.json({
    key: process.env.DEEPGRAM_API_KEY ?? "",
    available: !!process.env.DEEPGRAM_API_KEY
  });
}
