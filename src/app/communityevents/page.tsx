import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar, FileText, Heart, Sparkles, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Community Events | Studio E Chicago",
  description:
    "Social calendar and community happenings for Studio E members—culture, connection, and curiosity beyond the dance floor in Humboldt Park.",
}

/** Replace with your Google Calendar embed URL when ready (Share → Integrate calendar → embed URL). */
const GOOGLE_CALENDAR_EMBED_URL = ""

/** Replace with a public URL to your social-events PDF when ready (e.g. Supabase or Google Drive view link). */
const SOCIAL_EVENTS_PDF_URL = ""

export default function CommunityEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#FF3366]/35 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF3366]/20 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">Studio E Chicago</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
            Community events beyond the dance floor
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            We’re a dance studio—and we’re building a home. Come get to know each other off the floor, stay rooted in
            culture, and try new things side by side with the same beginner’s mindset we bring into class.
          </p>
        </div>
      </section>

      <section className="border-b border-gray-100 py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <Heart className="h-8 w-8 text-[#FF3366]" aria-hidden />
              <h2 className="mt-4 text-lg font-bold text-gray-900">More than choreography</h2>
              <p className="mt-2 text-gray-600">
                We care about who you are when the music stops—friendships, support, and showing up for each other.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <Users className="h-8 w-8 text-[#9933CC]" aria-hidden />
              <h2 className="mt-4 text-lg font-bold text-gray-900">Culturally grounded</h2>
              <p className="mt-2 text-gray-600">
                Outings and gatherings that honor where we come from and the neighborhoods we belong to—including
                Humboldt Park and Paseo Boricua.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <Sparkles className="h-8 w-8 text-[#FF7A5A]" aria-hidden />
              <h2 className="mt-4 text-lg font-bold text-gray-900">Beginners together</h2>
              <p className="mt-2 text-gray-600">
                Novel experiences hit different when nobody’s pretending to have it figured out yet. Curiosity over ego.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-lg font-medium text-gray-800">
            This is home—show up messy, joyful, awkward, brave. That’s the whole point.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 flex items-center gap-2 text-[#FF3366]">
              <Calendar className="h-6 w-6" aria-hidden />
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Social calendar</h2>
            </div>
            <p className="mb-8 text-gray-600">
              Members: bookmark this page—the live calendar lives here once the embed URL is plugged in below.
            </p>

            {GOOGLE_CALENDAR_EMBED_URL ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
                <iframe
                  src={GOOGLE_CALENDAR_EMBED_URL}
                  title="Studio E social calendar"
                  className="h-[600px] w-full bg-white"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
                <Calendar className="mb-4 h-12 w-12 text-gray-400" aria-hidden />
                <p className="text-lg font-semibold text-gray-800">Google Calendar embed — placeholder</p>
                <p className="mt-2 max-w-md text-sm text-gray-600">
                  Add{" "}
                  <code className="rounded bg-gray-200 px-1.5 py-0.5 text-xs font-mono text-gray-800">
                    GOOGLE_CALENDAR_EMBED_URL
                  </code>{" "}
                  in{" "}
                  <code className="rounded bg-gray-200 px-1.5 py-0.5 text-xs font-mono text-gray-800">
                    communityevents/page.tsx
                  </code>{" "}
                  with your calendar’s iframe src (Google Calendar → Settings → Integrate calendar).
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50 py-14 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-2 flex items-center gap-2 text-[#9933CC]">
              <FileText className="h-6 w-6" aria-hidden />
              <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Social events (PDF)</h2>
            </div>
            <p className="mb-8 text-gray-600">
              Printable or shareable lineup of outings and community hangs—embedded here once the PDF is hosted.
            </p>

            {SOCIAL_EVENTS_PDF_URL ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
                <iframe
                  src={SOCIAL_EVENTS_PDF_URL}
                  title="Studio E social events PDF"
                  className="min-h-[720px] w-full bg-white"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                <FileText className="mb-4 h-12 w-12 text-gray-400" aria-hidden />
                <p className="text-lg font-semibold text-gray-800">PDF embed — placeholder</p>
                <p className="mt-2 max-w-md text-sm text-gray-600">
                  Host your flyer or events PDF publicly, then set{" "}
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-800">
                    SOCIAL_EVENTS_PDF_URL
                  </code>{" "}
                  (e.g. Google Drive viewer link or Supabase storage URL) to show it inline.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] py-14 text-white md:py-16">
        <div className="container px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85">Not a member yet?</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight md:text-4xl">
            Grab your free first class and join the familia.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
            See what Studio E feels like before you miss the next outing.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/founder-deal"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-black uppercase tracking-wide text-gray-900 shadow-lg transition-opacity hover:opacity-95 md:text-lg"
            >
              Claim your free class
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
