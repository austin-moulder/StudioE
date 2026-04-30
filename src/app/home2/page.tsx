import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Studio E | Group Dance Classes in Chicago",
  description:
    "Claim your free class at Studio E. Learn partnerwork, styling, and social confidence with a welcoming dance community in Chicago.",
}

function FreeClassButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/founder-deal"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 md:text-base ${className}`}
    >
      Try Free Class
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  )
}

const pillars = [
  {
    title: "Partnerwork",
    body: "Build real lead-and-follow confidence so you can social dance with anyone, not just memorize solo moves.",
  },
  {
    title: "Styling",
    body: "Develop body movement, timing, and musical expression that makes your dancing look clean and feel natural.",
  },
  {
    title: "Community",
    body: "Join a welcoming group that supports your growth in class and on the social dance floor every week.",
  },
] as const

export default function Home2Page() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#FF3366]/35">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF3366]/20 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Studio E</p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Start Your Dance Transformation
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Group dance classes in Chicago that help beginners become confident social dancers.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base text-white/75 md:text-lg">
              Learn salsa and bachata through proven coaching focused on connection, style, and community.
            </p>
            <div className="mt-10 flex justify-center">
              <FreeClassButton className="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#14141c] py-12">
        <div className="container px-4">
          <div className="grid gap-4 text-center md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-3xl font-black text-[#FF3366] md:text-4xl">10K+</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/70">Classes Taken</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-3xl font-black text-[#FF7A5A] md:text-4xl">4.9/5</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/70">Google Rating</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-3xl font-black text-[#9933CC] md:text-4xl">1,000+</p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/70">Students Helped</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-gray-900 py-16 md:py-20">
        <div className="container px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                New classes every month
              </p>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.95] md:text-6xl">
                Train,
                <br />
                Retain,
                <br />
                Evolve
              </h2>
              <p className="mt-6 max-w-xl text-lg text-gray-700">
                We do the planning for you to make your learning journey the fastest and easiest possible.
              </p>
              <p className="mt-3 max-w-xl text-lg text-gray-700">
                We tailor instruction to your learning styling and adjust every week to make sure you see results
                week-in, week-out.
              </p>
              <div className="mt-8">
                <FreeClassButton className="bg-[#3A53E8] hover:opacity-90" />
              </div>
            </div>
            <div className="mx-auto w-full max-w-md">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/Brandon_Smile.jpg"
                  alt="Studio E student smiling in class"
                  width={900}
                  height={1200}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black md:text-4xl">Our 3 Pillar System</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/75">
            Everything we teach is built to help you become a confident social dancer faster.
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                <CheckCircle2 className="h-8 w-8 text-[#FF3366]" aria-hidden />
                <h3 className="mt-4 text-2xl font-bold">{pillar.title}</h3>
                <p className="mt-4 leading-relaxed text-white/75">{pillar.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <FreeClassButton />
          </div>
        </div>
      </section>

      <section className="bg-[#14141c] py-16 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div className="flex items-start gap-4">
                <Users className="mt-1 h-8 w-8 flex-shrink-0 text-[#FF7A5A]" aria-hidden />
                <div>
                  <h2 className="text-3xl font-black leading-tight md:text-4xl">Stronger Together</h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/80">
                    At Studio E, you are not learning alone. You are joining a local movement of people who show up for
                    each other, practice together, and celebrate each other&apos;s growth.
                  </p>
                  <p className="mt-3 text-white/75">
                    From your first class to your first social dance, our instructors and community help you feel welcome
                    and supported every step of the way.
                  </p>
                  <div className="mt-8">
                    <FreeClassButton />
                  </div>
                </div>
              </div>
              <div>
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                  <Image
                    src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05837.jpg"
                    alt="Studio E community group photo"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 text-gray-900 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Find Studio E</p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl">2657 W Division St, Chicago, IL</h2>
              <p className="mt-4 text-lg text-gray-600">
                Visit us in Humboldt Park and start your free class at Studio E.
              </p>
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 shadow-lg">
              <iframe
                src="https://maps.google.com/maps?q=2657%20W%20Division%20St%2C%20Chicago%2C%20IL&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Studio E map at 2657 W Division St"
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] py-16">
        <div className="container px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Studio E · Chicago</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight md:text-5xl">
            The Jump Start You Need. The Dance Community You&apos;ll Love.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/90">Partnerwork | Styling | Community</p>
          <div className="mt-10 flex justify-center">
            <FreeClassButton className="bg-white !text-gray-900" />
          </div>
        </div>
      </section>
    </div>
  )
}
