import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { Calendar, MapPin, Ticket, CheckCircle2, Users, Music3, MessageCircleHeart } from "lucide-react"
import type { Metadata } from "next"
import NextHappyHourLabel from "@/components/social/NextHappyHourLabel"

export const metadata: Metadata = {
  title: "Latin Dance Happy Hour in Humboldt Park | Studio E",
  description:
    "Free beginner lesson plus social dancing every Friday at Studio E in Humboldt Park. No partner needed.",
}

const ACUITY_IFRAME_SRC =
  "https://app.acuityscheduling.com/schedule.php?owner=38921205&owner=38921205&appointmentType=91376831"

const MAILTO_CHALLENGE =
  "mailto:studioelatindance@gmail.com?subject=Tell%20me%20about%20the%2028-Day%20Latin%20Confidence%20Challenge&body=Hi%2C%0A%0AI'd%20like%20to%20hear%20more%20about%20the%2028-day%20Latin%20Confidence%20Challenge.%0A%0AMy%20phone%20number%20is%3A%20"

const reviewLinks = [
  "https://maps.app.goo.gl/9GS6sBGT2XaBC58LA",
  "https://maps.app.goo.gl/HPLEJRjhfzVNs5jp9",
  "https://maps.app.goo.gl/SxfKnQnBZmfk67ua6",
]

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-white">
      <Script id="social-scroll-top" strategy="afterInteractive">
        {`window.scrollTo({ top: 0, left: 0, behavior: 'auto' });`}
      </Script>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05366.jpg"
            alt="Packed Studio E happy hour social"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/70" />
        </div>

        <div className="container relative z-10 px-4 py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
            <div className="text-white">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                Every Friday at Studio E
              </p>
              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Latin Dance Happy Hour in Humboldt Park
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/90 md:text-2xl">
                Free beginner lesson + social dancing every Friday at Studio E. No partner needed.
              </p>
              <NextHappyHourLabel />

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                  <div className="mb-2 flex items-center gap-2 text-white/80">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-semibold">When</span>
                  </div>
                  <p className="text-sm font-medium">Fridays · 6:30-10:00 pm</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                  <div className="mb-2 flex items-center gap-2 text-white/80">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-semibold">Where</span>
                  </div>
                  <p className="text-sm font-medium">Studio E · 2657 W Division St · Humboldt Park</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm border border-white/10">
                  <div className="mb-2 flex items-center gap-2 text-white/80">
                    <Ticket className="h-4 w-4" />
                    <span className="text-sm font-semibold">Social dancer pass</span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-white/90">
                    $10 per social. Social Dancer membership required—sign up when you RSVP or at check-in.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#rsvp"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-gray-900 shadow-lg transition-opacity hover:opacity-95"
                >
                  RSVP for This Friday
                </a>
                <p className="mt-3 text-sm text-white/80">
                  Hosted by Studio E - hundreds of locals have already danced with us.
                </p>
              </div>
            </div>

            <div className="mx-auto hidden w-full max-w-md md:block">
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                <Image
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/Flyers-38.png"
                  alt="Studio E Friday happy hour social flyer"
                  width={900}
                  height={1200}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF3366]">
                The vibe
              </p>
              <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
                What is the Studio E Happy Hour Social?
              </h2>
              <ul className="mt-6 space-y-4 text-gray-700">
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF3366]" />
                  <span>30-minute beginner class (Salsa / Bachata basics) so you’re not lost on the floor</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF3366]" />
                  <span>3 hours of social dancing with Latin music and good vibes</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF3366]" />
                  <span>No partner needed, all levels welcome</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF3366]" />
                  <span>A space centered on Puerto Rican & Latin culture in Humboldt Park</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/DSC05448.jpg"
                  alt="Happy dancers at Studio E social"
                  width={800}
                  height={1000}
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/IMG_1101.JPG"
                  alt="Studio E teaching and social dancing"
                  width={800}
                  height={1000}
                  className="h-56 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-3xl font-black text-gray-900 md:text-4xl">Perfect if you...</h2>
            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="flex gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-[#9933CC]" />
                <span>Have always wanted to dance but feel nervous or “have two left feet”</span>
              </li>
              <li className="flex gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-[#9933CC]" />
                <span>Want to meet people in the neighborhood without awkward bar small talk</span>
              </li>
              <li className="flex gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-[#9933CC]" />
                <span>Miss dancing to Latin music and want to reconnect with your roots</span>
              </li>
              <li className="flex gap-3">
                <Users className="mt-1 h-5 w-5 flex-shrink-0 text-[#9933CC]" />
                <span>Just need a fun Friday that isn’t Netflix again</span>
              </li>
            </ul>
            <p className="mt-8 text-lg font-semibold text-[#FF3366]">
              Come as you are. You’ll leave more confident than you arrived.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <Calendar className="h-8 w-8 text-[#FF3366]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Reserve your spot</h3>
              <p className="mt-3 text-gray-600">
                Fill out the quick form below so we know you’re coming.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <Users className="h-8 w-8 text-[#9933CC]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Arrive between 6:15-6:30 pm</h3>
              <p className="mt-3 text-gray-600">
                Check in, grab some water, and get ready for the beginner class.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Free parking available on Washtenaw and Rockwell, and in the park · Doors open at 6:15 pm.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <Music3 className="h-8 w-8 text-[#FF7A5A]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Dance the night away</h3>
              <p className="mt-3 text-gray-600">
                Stay for social dancing, meet people, and if you love it, ask about our 28-day Latin Confidence Challenge.
              </p>
              <p className="mt-3 text-sm font-semibold text-[#FF3366]">
                Bonus: Get special intro pricing when you join on social night.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">What dancers are saying</h2>
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {[
              {
                name: "Jose M.",
                quote:
                  "Had a great experience at Studio E. Austin was very helpful and patient, this is a great opportunity for beginners and seasoned dancers to learn and improve their skills. Highly recommended!",
                link: reviewLinks[0],
              },
              {
                name: "Sylvia K.",
                quote:
                  "Studio E is an amazing place to learn to dance!! I was a complete beginner and Austin was able to get me to dancing salsa and bachata confidently in no time.",
                link: reviewLinks[1],
              },
              {
                name: "Emily G.",
                quote:
                  "I love coming to Studio E! There’s so many fun classes and events to meet people at. The 28 day salsa challenge has helped me so much become a more confident social dancer. I can’t wait for summer and more salsa with Studio E.",
                link: reviewLinks[2],
              },
            ].map((review, index) => (
              <div key={index} className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="text-yellow-500">★★★★★</div>
                <p className="mt-4 text-gray-700">
                  "{review.quote}"
                </p>
                <p className="mt-4 font-semibold text-gray-900">{review.name}</p>
                <a
                  href={review.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-[#FF3366] underline"
                >
                  View Google review
                </a>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl shadow-lg">
            <div className="aspect-[9/16] w-full max-h-[720px] bg-black">
              <iframe
                src="https://www.youtube.com/embed/-q-yfv1YEI0"
                title="Studio E testimonial reel"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">FAQ</h2>
            <div className="mt-10 space-y-4">
              {[
                {
                  question: "Do I need a partner?",
                  answer: "No.",
                },
                {
                  question: "I’ve never danced before.",
                  answer: "That’s exactly who the beginner class is for.",
                },
                {
                  question: "What should I wear?",
                  answer: "Comfortable clothes and shoes you can move in.",
                },
                {
                  question: "Is there an age limit?",
                  answer: "18+.",
                },
                {
                  question: "What is the Social Dancer Pass?",
                  answer:
                    "Friday socials use Social Dancer membership at $10 per social. Sign up when you RSVP or at check-in.",
                },
              ].map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="rsvp"
        className="bg-gradient-to-r from-[#FF3366] via-[#FF3366] to-[#9933CC] py-16 text-white md:py-20"
      >
        <div className="container px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Friday RSVP
            </p>
            <h2 className="text-3xl font-black md:text-4xl">Reserve your spot for this Friday</h2>
            <p className="mt-4 text-lg text-white/90">
              Let us know you’re coming so we can plan the room and welcome you in.
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <iframe
              src={ACUITY_IFRAME_SRC}
              width="100%"
              height="800"
              frameBorder="0"
              allow="payment"
              title="Studio E Friday Happy Hour Social RSVP"
            />
          </div>
        </div>
        <Script src="https://embed.acuityscheduling.com/js/embed.js" strategy="afterInteractive" />
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl rounded-[2rem] bg-gray-50 p-8 text-center shadow-sm md:p-10">
            <MessageCircleHeart className="mx-auto h-10 w-10 text-[#FF3366]" />
            <h2 className="mt-4 text-3xl font-black text-gray-900">Want more than one night out?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ask about our 28-day Latin Confidence Challenge, the only program in Chicago that guarantees results or your money back.
            </p>
            <a
              href={MAILTO_CHALLENGE}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-95"
            >
              Tell me about the Challenge
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
