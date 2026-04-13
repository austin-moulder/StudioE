import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Open Roles | Careers at Studio E",
  description:
    "Explore team roles at Studio E: instructors, fitness, sales, marketing, content, operations, member success, and brand & design.",
}

const roles = [
  {
    title: "Core Instructor",
    description:
      "Weekly class slot with a clear, repeatable, Studio E–approved curriculum. You’re strong at teaching, promoting your classes, and helping students choose the right memberships and programs. Core instructors are W2 team members who treat the studio as a business they help grow—not a place to only clock in and teach.",
  },
  {
    title: "Pop-Up Instructor",
    description:
      "You own your curriculum and teach on a monthly cadence with creative freedom. Pop-up instructors are 1099 partners who bring their own flavor while aligning with Studio E’s community standards. Ideal if you want focused teaching blocks without the full core track.",
  },
  {
    title: "Small Group Fitness Instructor",
    description:
      "Lead small-group personal training and related formats (e.g. strength, conditioning, yoga, Pilates-style work) in line with Studio E Fitness. You care about coaching, safety, and community—not just running workouts—and you’re open to how fitness and dance audiences overlap at Studio E.",
  },
  {
    title: "Sales",
    description:
      "Help people choose the right intro path, memberships, and programs with clarity and care. You follow up on leads, support in-studio and digital conversations, and track outcomes. Success is measured by ethical enrollment and long-term member fit, not pressure tactics.",
  },
  {
    title: "Marketing",
    description:
      "Grow awareness across organic social, paid campaigns, search, email, and partnerships. You test messaging, coordinate launches, and tie campaigns to real visits and revenue. You work closely with content and ops so the brand story matches what happens on the dance floor.",
  },
  {
    title: "Content",
    description:
      "Capture and shape how Studio E shows up on camera: filming, editing, short- and long-form video, and supporting storytelling across channels. You’re in the room for classes and socials, building a library of real moments that make social dance feel accessible and exciting.",
  },
  {
    title: "Business Development & Operations",
    description:
      "Build partnerships, streamline how the studio runs day to day, and connect outreach to real foot traffic. Think local orgs, campuses, events, front-of-house flow, check-in, and light systems so classes and socials feel professional and welcoming. You make growth repeatable, not chaotic.",
  },
  {
    title: "Member Success",
    description:
      "Own the journey from first DM or form submission to booked class, show-up, and early retention. Fast, friendly responses, reminders, onboarding touches, and light reactivation so no lead or new dancer slips through the cracks. You’re the human glue between marketing and the in-studio experience.",
  },
  {
    title: "Brand & Design",
    description:
      "Translate Studio E’s culture into visuals: merch, templates, social assets, and brand consistency across touchpoints. You think in systems (colors, type, layouts) and in culture (streetwear, Latin social dance, Humboldt Park). Design work supports launches, events, and the long-term brand—not one-off pretty pictures only.",
  },
] as const

export default function CareersListPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gradient-to-r from-[#FF3366]/10 via-white to-[#9933CC]/10">
        <div className="container px-4 py-10 md:py-14">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF3366] hover:text-[#9933CC]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to careers &amp; apply
          </Link>
          <h1 className="mt-6 text-3xl font-black text-gray-900 md:text-5xl">Roles at Studio E</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Summaries below reflect how we think about each track. Details and expectations are discussed in
            interviews. When you&apos;re ready, apply on the{" "}
            <Link href="/careers#apply" className="font-semibold text-[#FF3366] underline underline-offset-2">
              main careers page
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="container px-4 py-12 md:py-16">
        <ul className="mx-auto max-w-3xl space-y-8">
          {roles.map((role) => (
            <li
              key={role.title}
              className="rounded-2xl border border-gray-100 bg-gray-50/80 p-6 shadow-sm md:p-8"
            >
              <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{role.title}</h2>
              <p className="mt-3 leading-relaxed text-gray-700">{role.description}</p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-14 max-w-xl text-center">
          <Link
            href="/careers#apply"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF3366] to-[#9933CC] px-8 py-4 text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-95"
          >
            Apply now
          </Link>
        </div>
      </div>
    </div>
  )
}
