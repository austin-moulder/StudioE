"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react"

const PHOTO_HERO =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/IMG_0393.JPG"
const PHOTO_SECONDARY =
  "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Vibes/IMG_2876.JPG"

const CTA_HREF =
  "mailto:studioelatindance@gmail.com?subject=Corporate%20Latin%20Dance%20Event%20-%20%5BCompany%20Name%5D"

const problems = [
  "Hybrid work and constant change have made it hard for teams to feel truly connected",
  "“Team building” often means another meeting, not a meaningful experience",
  "Diverse teams want to feel seen culturally, not just checked off in a DEI report",
  "ERGs are asked to improve engagement, belonging, and morale—but have limited time and resources",
]

const whyDance = [
  {
    title: "Built-in collaboration",
    body: "Every move requires clear, respectful partner communication.",
  },
  {
    title: "Shared vulnerability",
    body: "Everyone is a beginner together—including leadership.",
  },
  {
    title: "Culturally grounded",
    body: "Rooted in Latin traditions, and welcome to all.",
  },
  {
    title: "High energy, low pressure",
    body: "No performance—just guided connection and fun.",
  },
]

const outcomes = [
  "Stronger cross-team relationships and trust",
  "A live experience of inclusion, not a lecture",
  "Increased confidence in trying new things in front of peers",
  "A memorable shared story that reinforces your culture",
]

const occasions = [
  "Quarterly or annual offsites",
  "Hispanic Heritage Month / Latinx ERG events",
  "New hire or internship cohorts",
  "Wellness / mental health awareness weeks",
  "Celebrating major milestones",
]

const howItWorks = [
  {
    step: "1",
    title: "Align",
    time: "15-minute call",
    points: [
      "Clarify your goals (engagement, DEI, offsite, ERG, and more)",
      "Align on date, location, and headcount",
    ],
  },
  {
    step: "2",
    title: "Design",
    time: "Behind the scenes",
    points: [
      "Curate music, lesson plan, and activities to your team’s comfort level",
      "Coordinate logistics with your onsite contact",
    ],
  },
  {
    step: "3",
    title: "Experience",
    time: "60–90 minutes",
    points: [
      "Warm-up, foundational steps, guided partner work, group social dancing",
      "Optional reflection / photo moment to close",
    ],
  },
]

const sessionFlow = [
  "Light welcome + framing: why we’re here and how it connects to your business culture",
  "Gentle warm-up and basic steps (no prior dance experience required)",
  "Styling drills that inform how certain movement practices can reduce chronic pain (lower-back pain, tight shoulders and neck)",
  "Partner drills focused on communication and listening",
  "Historical context for the dance form, to build cultural sensitivity skills",
  "Reflection on how the lessons in class mirror collaboration at work",
]

const trustPoints = [
  "Rooted in the Chicago Latin dance community in the heart of Little Puerto Rico",
  "1,000+ students taught since 2023",
  "Facilitator experience leading 50+ person teams in consulting and tech",
  "Backed by a medically trained co-facilitator focused on safety & access",
]

const impactItems = [
  "Quick pre-event pulse survey",
  "Live event testimonials: live video testimonial collection (time-permitting)",
  "Post-event engagement survey (3–5 questions on connection, inclusion, and engagement)",
  "1-page recap: participation, survey highlights, and qualitative quotes you can share internally",
]

const faqs = [
  {
    q: "What are the contact boundaries?",
    a: "We only teach “open-position” in corporate sessions, which means employees will only dance using hand-to-hand contact. More advanced points of contact like the back and hips will not be taught.",
  },
  {
    q: "What accommodations are made for differently-abled bodies?",
    a: "Individuals unable to stand are able to participate in styling, which is largely focused on upper body movement. They are also invited to participate in the end-of-session reflection and cultural immersion sections. Our experience is multisensory, which means there are opportunities for people of all abilities to participate.",
  },
  {
    q: "What should people wear?",
    a: "We cater our teaching so participants can dance in business casual clothing. No special shoes required.",
  },
  {
    q: "Travel fees / location limits?",
    a: "Pricing includes events within the city of Chicago. Beyond that, a simple travel fee applies.",
  },
  {
    q: "Language & cultural sensitivity?",
    a: "Sessions are in English, with cultural context from Puerto Rican and broader Latin traditions, designed to be inclusive for all backgrounds. Spanish instruction can be provided upon request.",
  },
  {
    q: "Photography & social media?",
    a: "We’re happy to allow photos. If you’d like us to bring our professional photographer or create a recap reel, we can scope that as an add-on.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/15 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-white md:text-lg">{q}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-white/80 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-white/85 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function CorporateClient() {
  return (
    <div className="flex flex-col bg-[#0c0a0b] text-white">
      {/* Hero */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <Image
          src={PHOTO_HERO}
          alt="Studio E Latin dance session"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/50 to-[#0c0a0b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/25 via-transparent to-[#9933CC]/20" />

        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-16 pt-28 md:justify-center md:pb-24 md:pt-20">
          <p className="mb-4 font-montserrat text-sm font-bold uppercase tracking-[0.35em] text-[#FF7A5A] md:text-base animate-[fadeUp_0.7s_ease-out_both]">
            Studio E
          </p>
          <h1 className="max-w-4xl font-montserrat text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl animate-[fadeUp_0.8s_ease-out_0.08s_both]">
            Culture &amp; Confidence Sessions for Businesses
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/90 md:text-xl animate-[fadeUp_0.8s_ease-out_0.16s_both]">
            Unlock your team&apos;s potential with culturally-grounded Latin social dance that puts
            team building fundamentals at the forefront.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-[fadeUp_0.8s_ease-out_0.24s_both]">
            <a
              href={CTA_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-base font-bold text-[#FF3366] shadow-lg transition hover:bg-white/95"
            >
              Book a Corporate Session
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-white/10 bg-[#141014] py-16 md:py-20">
        <div className="container px-4 text-center">
          <p className="mx-auto max-w-3xl text-2xl font-light leading-relaxed text-white/90 md:text-3xl">
            Studio E was founded in 2023 with a simple mission:{" "}
            <span className="font-semibold text-white">
              unlock confidence, creativity, and technical mastery for all.
            </span>
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              The problem
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              What your teams feel… but won&apos;t say
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Studio E designs Latin social dance experiences that hit effective team-building goals
              in 60 minutes.
            </p>
            <ul className="mt-10 space-y-5">
              {problems.map((item) => (
                <li key={item} className="flex gap-4 text-lg leading-relaxed text-white/85">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#FF3366]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why dance works + photo */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/15 via-transparent to-[#9933CC]/20" />
        <div className="container relative px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-square">
              <Image
                src={PHOTO_SECONDARY}
                alt="Team dancing together at Studio E"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
                Why it works
              </p>
              <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
                Why Latin social dance works at work
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {whyDance.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-white/70 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-[#141014] py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Outcomes
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              What your team walks away with
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
            {outcomes.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FF7A5A]" aria-hidden />
                <p className="text-white/90 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When teams bring us in */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Occasions
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              When teams bring us in
            </h2>
          </div>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
            {occasions.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 border-l-2 border-[#FF3366] bg-gradient-to-r from-[#FF3366]/10 to-transparent px-5 py-4"
              >
                <span className="font-montserrat text-sm font-bold text-[#FF7A5A]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg text-white/90">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 bg-[#141014] py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Process
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-white/70">
              We ground our experiences in your corporate culture. Our facilitator is an ex-BCG
              management consultant and Tech Operations Director, with experience leading 50+ person
              teams.
            </p>
          </div>
          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] font-montserrat text-xl font-black">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[#FF7A5A]">
                  {item.time}
                </p>
                <ul className="mt-4 space-y-2 text-white/75">
                  {item.points.map((point) => (
                    <li key={point} className="leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical session */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              The session
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              What happens in a typical session
            </h2>
            <ol className="mt-10 space-y-6">
              {sessionFlow.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-[#FF7A5A]">
                    {i + 1}
                  </span>
                  <p className="pt-1 text-lg leading-relaxed text-white/85">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0">
          <Image
            src={PHOTO_HERO}
            alt=""
            fill
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0c0a0b]/85" />
        </div>
        <div className="container relative px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Credibility
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              Why teams trust us with their people
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {trustPoints.map((item) => (
              <div key={item} className="flex gap-3 border-t border-white/15 pt-5">
                <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-[#FF3366]" aria-hidden />
                <p className="text-lg text-white/90 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-[#141014] py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Measurement
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              How we help you show impact
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
            {impactItems.map((item, i) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <span className="font-montserrat text-3xl font-black text-[#FF3366]/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-lg leading-relaxed text-white/90">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7A5A]">
              Facilitators
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              Who we are
            </h2>
            <p className="mt-4 text-white/65">
              The co-facilitator is subject to availability, and may be any one of our 10+
              distinguished instructors.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8">
              <div className="mb-4 flex items-center gap-3">
                <Users className="h-6 w-6 text-[#FF3366]" aria-hidden />
                <div>
                  <h3 className="text-2xl font-bold">Austin Moulder</h3>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#FF7A5A]">
                    Head Facilitator
                  </p>
                </div>
              </div>
              <p className="leading-relaxed text-white/80">
                Austin earned his MBA from Washington University in St. Louis, where he was named a
                Poets&amp;Quants Best &amp; Brightest MBA. He worked in Go-To-Market and Strategic
                Workforce Planning at Boston Consulting Group, then founded Cohort Guidance, a Learn
                Capital–backed edtech platform that reduced the cost of quality college guidance by
                90%. He later served as Director of Operations at a $200M marketplace, leading a
                global team of 50. Austin now builds Studio E to scale Latin culture through dance
                and community.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8">
              <div className="mb-4 flex items-center gap-3">
                <HeartHandshake className="h-6 w-6 text-[#9933CC]" aria-hidden />
                <div>
                  <h3 className="text-2xl font-bold">Noushin Ansari</h3>
                  <p className="text-sm font-semibold uppercase tracking-wide text-[#FF7A5A]">
                    Co-Facilitator
                  </p>
                </div>
              </div>
              <p className="leading-relaxed text-white/80">
                Noushin earned her M.D. from the University of Missouri–Kansas City at age 24 and
                completed residencies in Family Medicine and Neurology. She is a practicing General
                Neurologist with the Endeavor Health Network in Chicago. A lifelong dancer, she
                organized the 2023 Kansas City Salsa, Bachata, and Kizomba Festival and now teaches
                with Studio E. She believes dance is a powerful tool for stress reduction,
                confidence, and high performance.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 flex items-center gap-3">
              <Building2 className="h-7 w-7 text-white" aria-hidden />
              <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
                FAQ
              </h2>
            </div>
            <div>
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
              Ready to level up your event?
            </h2>
            <ol className="mx-auto mt-10 max-w-xl space-y-4 text-left text-lg text-white/85">
              <li className="flex gap-3">
                <span className="font-bold text-[#FF7A5A]">1.</span>
                Share your preferred dates, location, and headcount
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#FF7A5A]">2.</span>
                We&apos;ll confirm availability and recommend the best package for your goals
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-[#FF7A5A]">3.</span>
                Once confirmed, we send a simple agreement and invoice to lock in your date
              </li>
            </ol>
            <a
              href={CTA_HREF}
              className="mt-12 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:opacity-95"
            >
              Email studioelatindance@gmail.com
            </a>
            <p className="mt-4 text-sm text-white/55">
              Subject line: Corporate Latin Dance Event - [Company Name]
            </p>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
