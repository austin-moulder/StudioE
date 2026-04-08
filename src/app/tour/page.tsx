import Image from "next/image"
import Link from "next/link"
import { Footprints, Gift, MapPin, Music, Sparkles, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Un Verano en Humboldt Park | Paseo Boricua Tour + Salsa Class | Studio E",
  description:
    "2-hour Boricua night out: 1 hr Humboldt Park walking tour with Boricua Tours, 1 hr beginner salsa/bachata at Studio E, plus a free pass to our weekly Happy Hour & Social. $69.",
}

const HERO_IMAGE =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/IMG_1101.JPG"

const MAILTO_RESERVE =
  "mailto:studioelatindance@gmail.com?subject=Reserve%20Un%20Verano%20en%20Humboldt%20Park%20(%2469)&body=Hi%2C%0A%0AI%27d%20like%20to%20reserve%20my%20spot%20for%20Un%20Verano%20en%20Humboldt%20Park%20(%2469%20per%20person).%0A%0AName%3A%20%0APreferred%20date(s)%3A%20%0APhone%3A%20%0ANumber%20of%20guests%3A%20"

export default function TourPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[min(100svh,920px)] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Studio E teaching and social dancing in Humboldt Park"
            fill
            className="object-cover object-[50%_35%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40" />
        </div>

        <div className="relative z-10 flex min-h-[min(100svh,920px)] flex-col">
          <div className="container flex-1 px-4 pb-12 pt-8 md:pb-16 md:pt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white"
            >
              ← Back to Studio E
            </Link>

            <div className="mt-8 max-w-3xl md:mt-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
                Studio E × Boricua Tours
              </p>
              <h1 className="text-3xl font-black leading-tight text-white md:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
                Un Verano en Humboldt Park: Paseo Boricua Tour + Salsa Class for $69
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
                1 hr walking tour + 1 hr beginner salsa or bachata + free pass to our weekly Happy Hour &amp;
                Social. No partner or experience needed.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={MAILTO_RESERVE}
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-gray-900 shadow-lg transition-opacity hover:opacity-95"
                >
                  Reserve Your Spot for $69
                </a>
                <Link href="/social" className="text-center text-sm font-medium text-white/85 underline-offset-2 hover:underline sm:text-left">
                  See our weekly Happy Hour &amp; Social
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-14 md:py-20">
        <div className="container px-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF3366]">
            The experience
          </p>
          <h2 className="max-w-4xl text-3xl font-black text-gray-900 md:text-4xl">
            What is Un Verano en Humboldt Park?
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700">
            Un Verano en Humboldt Park is a 2-hour Boricua night out inspired by the classic salsa anthem
            &ldquo;Un Verano en Nueva York.&rdquo; We start in the streets, walking through murals, flags, and
            stories of Puerto Rican Chicago. Then we head into the studio, where you&rsquo;ll learn salsa and
            bachata steps you can actually use at a party. Your ticket also includes a pass to our upcoming weekly
            social, so you can come back, practice, and plug into the community.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="border-t border-gray-100 bg-gray-50 py-14 md:py-20">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">What you get</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <Footprints className="h-9 w-9 text-[#FF3366]" aria-hidden />
              <h3 className="mt-4 text-xl font-bold text-gray-900">1 hr Boricua walking tour</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#FF3366]">·</span>
                  Guided walk through Humboldt Park &amp; Paseo Boricua
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF3366]">·</span>
                  History, culture, and local stories
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF3366]">·</span>
                  Photo spots at flags, murals, and landmark spots
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF3366]">·</span>
                  Led by Boricua Tours, local experts
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <Music className="h-9 w-9 text-[#9933CC]" aria-hidden />
              <h3 className="mt-4 text-xl font-bold text-gray-900">1 hr Salsa / Bachata class</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#9933CC]">·</span>
                  Beginner-friendly lesson, no partner required
                </li>
                <li className="flex gap-2">
                  <span className="text-[#9933CC]">·</span>
                  Learn real social steps, not just choreography
                </li>
                <li className="flex gap-2">
                  <span className="text-[#9933CC]">·</span>
                  Taught in a welcoming, judgment-free studio
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <Gift className="h-9 w-9 text-[#FF7A5A]" aria-hidden />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Bonus – Weekly Happy Hour &amp; Social</h3>
              <ul className="mt-4 space-y-3 text-gray-600">
                <li className="flex gap-2">
                  <span className="text-[#FF7A5A]">·</span>
                  Free entry to our next weekly Boricua Happy Hour &amp; Social
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF7A5A]">·</span>
                  Practice what you learned with real music &amp; real people
                </li>
                <li className="flex gap-2">
                  <span className="text-[#FF7A5A]">·</span>
                  Meet locals, make friends, and feel part of the scene
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="py-14 md:py-20">
        <div className="container px-4">
          <h2 className="text-3xl font-black text-gray-900 md:text-4xl">Who this is for</h2>
          <ul className="mt-8 max-w-2xl space-y-4 text-lg text-gray-700">
            <li className="flex gap-3">
              <Users className="mt-1 h-6 w-6 flex-shrink-0 text-[#9933CC]" aria-hidden />
              <span>School and community organizers looking for cultural enrichment</span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-[#FF3366]" aria-hidden />
              <span>
                Out-of-towners who want the <em className="font-semibold text-gray-900 not-italic">real</em> Puerto
                Rican Chicago
              </span>
            </li>
            <li className="flex gap-3">
              <Sparkles className="mt-1 h-6 w-6 flex-shrink-0 text-[#FF7A5A]" aria-hidden />
              <span>Locals who want to reconnect with culture and community</span>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] py-14 text-white md:py-20">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black md:text-4xl">How it works</h2>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {[
              {
                step: "1",
                title: "Pick your date",
                body: "Reserve your spot for $69.",
              },
              {
                step: "2",
                title: "Meet your guide",
                body: "2657 W Division St — start with the 1 hr walking tour.",
              },
              {
                step: "3",
                title: "Head to the studio",
                body: "Same address — 1 hr beginner salsa / bachata class.",
              },
              {
                step: "4",
                title: "Come back",
                body: "Use your free pass for our weekly Boricua Happy Hour & Social; we’ll email the date + details.",
              },
            ].map((item) => (
              <li
                key={item.step}
                className="flex gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-lg font-black text-[#9933CC]">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/90">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 6 */}
      <section className="py-14 md:py-20">
        <div className="container px-4">
          <h2 className="text-3xl font-black text-gray-900 md:text-4xl">Details &amp; logistics</h2>
          <ul className="mt-8 max-w-3xl space-y-4 text-gray-700">
            <li>
              <span className="font-bold text-gray-900">Days &amp; Times:</span> Daily, from 8am–5pm
            </li>
            <li>
              <span className="font-bold text-gray-900">Meeting Point:</span> 2657 W Division St
            </li>
            <li>
              <span className="font-bold text-gray-900">Studio Location:</span> 2657 W Division St
            </li>
            <li>
              <span className="font-bold text-gray-900">Group Size:</span> At least 6 people. Limited to 20
              people for an intimate experience
            </li>
            <li>
              <span className="font-bold text-gray-900">What to Wear:</span> Comfortable clothes + shoes you can
              move in
            </li>
            <li>
              <span className="font-bold text-gray-900">Language:</span> English &amp; Spanish friendly
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 7 */}
      <section id="reserve" className="border-t border-gray-100 bg-gray-50 py-14 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-gray-900 md:text-4xl">Your Night Out, One Simple Price</h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700">
              Your ticket is <strong>$69 per person</strong> and includes the full experience: 1 hr guided tour, 1 hr
              dance class, and a free pass to our upcoming weekly Boricua Happy Hour &amp; Social. No hidden fees,
              no surprises.
            </p>
            <p className="mt-6 text-base leading-relaxed text-gray-600">
              If you don&rsquo;t feel more confident and connected by the end of the class, talk to us before you
              leave and we&rsquo;ll credit your ticket toward another class or event.
            </p>
            <a
              href={MAILTO_RESERVE}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-95"
            >
              Reserve Your Spot for $69
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 8 */}
      <section className="py-14 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">FAQ</h2>
            <div className="mt-10 space-y-4">
              {[
                {
                  q: "Do I need any dance experience?",
                  a: "Nope. This is built for complete beginners. We’ll start from zero and keep it fun, simple, and pressure-free.",
                },
                {
                  q: "What if it rains?",
                  a: "Light rain: we walk with umbrellas. Heavy weather: we’ll adjust the route or move parts indoors and notify you by email/text.",
                },
                {
                  q: "Can I reschedule or cancel?",
                  a: "All sales are final, but we can credit your purchase to our studio offerings if canceled more than 48 hours in advance.",
                },
                {
                  q: "Is alcohol served at the happy hour?",
                  a: "No, we focus on creating a culturally rooted safe space for dance expression.",
                },
                {
                  q: "Do I need a partner?",
                  a: "No partner needed — we rotate and welcome solo dancers.",
                },
                {
                  q: "Where should I park?",
                  a: "Free street parking is often available nearby; we’ll include specifics in your confirmation email.",
                },
              ].map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
