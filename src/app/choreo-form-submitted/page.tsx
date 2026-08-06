import Link from "next/link"
import { CheckCircle2, Instagram, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import ChoreoGoogleAds from "@/components/analytics/ChoreoGoogleAds"
import GoogleTag from "@/components/analytics/GoogleTag"

export const metadata: Metadata = {
  title: "Thank You | Studio E Choreography Inquiry",
  description:
    "Thank you for submitting your choreography inquiry. Someone from the Studio E team will reach out soon.",
}

const INSTAGRAM_URL = "https://www.instagram.com/the_studio_e/"

export default function ChoreoFormSubmittedPage() {
  return (
    <>
      <GoogleTag />
      <ChoreoGoogleAds />

      <div className="flex min-h-screen flex-col bg-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#FF7A5A]/95 via-[#FF3366]/95 to-[#9933CC]/95" />
          <div className="container relative z-10 px-4 py-12 md:py-20">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
            >
              ← Back to Studio E
            </Link>
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                Form received
              </div>
              <h1 className="mb-4 text-3xl font-black leading-tight text-white md:text-5xl">
                Thank you for submitting the form
              </h1>
              <p className="text-xl font-light leading-relaxed text-white/95">
                Someone from the Studio E team will reach out soon to talk through your date,
                vision, and next steps.
              </p>
              <p className="mt-4 text-lg font-light leading-relaxed text-white/85">
                If you need anything in the meantime, email us at{" "}
                <a
                  href="mailto:studioelatindance@gmail.com"
                  className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
                >
                  studioelatindance@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="flex-1 py-10 md:py-14">
          <div className="container mx-auto max-w-2xl px-4">
            <div className="mb-10 flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <Sparkles className="mt-0.5 h-7 w-7 flex-shrink-0 text-[#9933CC]" aria-hidden />
              <div>
                <h2 className="mb-2 text-lg font-bold text-gray-900">While you wait</h2>
                <p className="leading-relaxed text-gray-700">
                  Follow Studio E for behind-the-scenes choreography clips and community vibes—or
                  claim a free first class and feel the floor before your big celebration.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:border-[#FF3366]/40 hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF3366] to-[#9933CC] text-white shadow-md">
                  <Instagram className="h-7 w-7" aria-hidden />
                </span>
                <span className="font-bold text-gray-900 transition-colors group-hover:text-[#FF3366]">
                  Follow @the_studio_e
                </span>
                <span className="text-sm text-gray-600">See what&apos;s happening at the studio</span>
              </a>

              <Link
                href="/founder-deal"
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-8 text-center shadow-sm transition-all hover:border-[#9933CC]/40 hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#9933CC] to-[#FF3366] text-white shadow-md">
                  <Sparkles className="h-7 w-7" aria-hidden />
                </span>
                <span className="font-bold text-gray-900 transition-colors group-hover:text-[#9933CC]">
                  Get your first class free
                </span>
                <span className="text-sm text-gray-600">Try Studio E before the big day</span>
              </Link>
            </div>

            <p className="mt-10 text-center text-sm text-gray-500">
              <Link href="/wedding-dance" className="font-medium text-[#FF3366] hover:underline">
                Wedding dance
              </Link>
              {" · "}
              <Link href="/quince" className="font-medium text-[#FF3366] hover:underline">
                Quinceañera choreography
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
