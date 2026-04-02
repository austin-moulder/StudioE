import type { Metadata } from "next"
import Link from "next/link"
import {
  CheckCircle2,
  Dumbbell,
  HeartHandshake,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react"
import FitnessFoundersForm from "@/components/fitness/FitnessFoundersForm"

export const metadata: Metadata = {
  title: "Studio E Fitness | Small-Group Training Next to Studio E Dance",
  description:
    "Small-group strength training at 2659 W Division St, next to Studio E Dance in Humboldt Park. Coached 50-minute sessions, Founders Club for the first 20 members.",
}

const testimonials = [
  {
    name: "Jose M.",
    quote:
      "Had a great experience at Studio E. Austin was very helpful and patient, this is a great opportunity for beginners and seasoned dancers to learn and improve their skills. Highly recommended!",
    link: "https://maps.app.goo.gl/9GS6sBGT2XaBC58LA",
  },
  {
    name: "Sylvia K.",
    quote:
      "Studio E is an amazing place to learn to dance!! I was a complete beginner and Austin was able to get me to dancing salsa and bachata confidently in no time.",
    link: "https://maps.app.goo.gl/HPLEJRjhfzVNs5jp9",
  },
  {
    name: "Emily G.",
    quote:
      "I love coming to Studio E! There’s so many fun classes and events to meet people at. The 28 day salsa challenge has helped me so much become a more confident social dancer. I can’t wait for summer and more salsa with Studio E.",
    link: "https://maps.app.goo.gl/SxfKnQnBZmfk67ua6",
  },
]

export default function FitnessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#FF3366]/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF3366]/20 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Studio E Fitness · 2659 W Division St
            </p>
            <h1 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
              Small-Group Strength Training Next Door To Studio E Dance
            </h1>
            <p className="mt-6 text-lg text-white/90 md:text-xl">
              Get stronger, move better, and feel confident in your body with coached, music-filled workouts built for Chicago’s Puerto Rican community.
            </p>
            <div className="mx-auto mt-8 max-w-3xl space-y-4 text-left text-base text-white/85 md:text-lg">
              <p>
                Studio E Fitness is the small-group personal training studio. Every 50-minute session is coached, capped at a small group, and designed so you never feel lost in a crowded gym.
              </p>
              <p>
                This gym is not exclusive for dancers, and our training is not dance-focused. However, if you love the vibe of Studio E dance, this is the same familia energy, now focused on your strength, health, and confidence.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3">
              <a
                href="#founders-form"
                className="inline-flex w-full max-w-md items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-gray-900 shadow-lg transition-opacity hover:opacity-95 sm:w-auto"
              >
                Claim My Founders Rate
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-white/90 underline underline-offset-4 hover:text-white"
              >
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Club */}
      <section id="founders-form" className="scroll-mt-24 py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
              Founders Club: First 20 Members Get Our Best Deal Ever
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              We’re opening Studio E Fitness with a limited Founders Club for the first 20 members only. As a Founder, you lock in our lowest rate for life, get priority time slots, and help shape the culture of the gym from day one. This is for people who want the same community and sabor as Studio E dance, plus the strength, energy, and confidence to enjoy it for years.
            </p>
          </div>

          <ul className="mx-auto mt-10 max-w-2xl space-y-3 text-gray-700">
            {[
              "50-minute small-group strength & conditioning sessions",
              "Coaching on proper form so you stay safe and progress fast",
              "Flexible schedule with morning and evening sessions",
              'Access to special “Train to Dance Better” classes only for Studio E Dance members',
              "Founders-only rate locked in for as long as you stay",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#FF3366]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-semibold text-[#FF3366]">
            Once the 50 Founders spots are gone, the bonuses and lifetime rate are gone.
          </p>

          <div className="mx-auto mt-6 text-center">
            <a
              href="#founders-apply"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-95"
            >
              Apply For A Founders Spot
            </a>
          </div>

          <div id="founders-apply" className="scroll-mt-24 mx-auto mt-12 max-w-xl">
            <FitnessFoundersForm />
          </div>
        </div>
      </section>

      {/* Why Studio E Fitness */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mx-auto max-w-3xl text-center text-3xl font-black text-gray-900 md:text-4xl">
            The Coaching & Community Big Gyms Can’t Touch
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <UserRound className="h-10 w-10 text-[#FF3366]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Always Coached</h3>
              <p className="mt-3 text-gray-600">
                You’re never on your own. Every session is led by a coach who knows your name, your goals, and how to adjust movements for your body.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <Users className="h-10 w-10 text-[#9933CC]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Small Groups, Big Energy</h3>
              <p className="mt-3 text-gray-600">
                We cap our sessions so you still get personal attention, but with the energy of training alongside people from your community pushing with you.
              </p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <HeartHandshake className="h-10 w-10 text-[#FF7A5A]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Built For Dancers & Non-Dancers</h3>
              <p className="mt-3 text-gray-600">
                Whether you dance at Studio E or just want to move and feel better, we focus on strength, mobility, and conditioning so everyday life (and every song) feels easier.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-3xl text-center text-gray-600">
            We’re not a warehouse full of machines. We are a tight, 1,750 sq ft training space designed for real coaching, real relationships, and real results. If you want a big gym with 47,000 sqft and $30 million of distraction at your disposal, walk down the street.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">How To Get Started</h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {[
              {
                step: "1",
                title: "Apply For The Founders Club",
                body: "Fill out the quick form so we can learn about your goals, schedule, and experience.",
                icon: Sparkles,
              },
              {
                step: "2",
                title: "1-on-1 “No Sweat” Intro",
                body: "Come in, see the space, meet a coach, and walk through your goals. No workout required.",
                icon: Dumbbell,
              },
              {
                step: "3",
                title: "Join Your Small Group",
                body: "We plug you into the best time slot and training track for your level so you’re never guessing what to do.",
                icon: Users,
              },
              {
                step: "4",
                title: "Get Stronger Every Week",
                body: "Show up 2–4 times per week, follow the plan, and lean on your coach and community for accountability.",
                icon: CheckCircle2,
              },
            ].map(({ step, title, body, icon: Icon }) => (
              <div key={step} className="flex gap-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF3366] to-[#9933CC] text-lg font-black text-white">
                  {step}
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-[#FF3366]" />
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  </div>
                  <p className="text-gray-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="mailto:studioelatindance@gmail.com?subject=Studio%20E%20Fitness%20%E2%80%93%20No-Sweat%20Intro&body=Hi%2C%0A%0AI%27d%20like%20to%20schedule%20my%20No-Sweat%20intro%20at%20Studio%20E%20Fitness.%0A%0AMy%20phone%20number%20is%3A%20"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#FF3366] bg-white px-8 py-4 text-lg font-bold text-[#FF3366] shadow-sm transition-colors hover:bg-[#FF3366]/5"
            >
              Start My No-Sweat Intro
            </a>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">What Our Community Says</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Studio E has already helped hundreds of people feel more confident on the dance floor. Studio E Fitness is the next step: confidence in your body, every day.
          </p>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="text-yellow-500">★★★★★</div>
                <p className="mt-4 text-gray-700">&ldquo;{review.quote}&rdquo;</p>
                <p className="mt-4 font-semibold text-gray-900">{review.name}</p>
                <a
                  href={review.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-[#FF3366] underline"
                >
                  View on Google
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-center text-3xl font-black text-gray-900 md:text-4xl">FAQ</h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {[
              {
                q: "I’m out of shape. Will I fit in?",
                a: "Yes. Most of our members are beginners. We scale every workout so you can start where you are and progress safely.",
              },
              {
                q: "Do I have to be a dancer to join?",
                a: "No. Many members don’t dance at all. We simply share the same welcoming culture Studio E is known for.",
              },
              {
                q: "How much does it cost?",
                a: "Founders Club members get our best lifetime rate. Fill out the quick form and we’ll walk you through options based on how many days per week you want to train.",
              },
              {
                q: "Where are you located?",
                a: "We’re at 2659 W Division St, next to Studio E Dance at 2657 W Division St, in the Studio E building in Chicago.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900">{item.q}</h3>
                <p className="mt-2 text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[#FF3366] to-[#9933CC] py-16 text-white md:py-20">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-black md:text-4xl">Ready To Train Next Door To Studio E?</h2>
          <a
            href="#founders-form"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-gray-900 shadow-lg transition-opacity hover:opacity-95"
          >
            Claim My Founders Rate
          </a>
          <p className="mt-6 text-sm text-white/80">
            <Link href="/" className="underline underline-offset-2 hover:text-white">
              Back to Studio E home
            </Link>
            {" · "}
            <Link href="/classes" className="underline underline-offset-2 hover:text-white">
              Dance classes
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
