import Link from "next/link"
import { Briefcase, GraduationCap, Globe2, Users } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | Join Team Studio E",
  description:
    "Build a global social dance brand with Studio E. Long-term roles in instruction, fitness, sales, marketing, operations, and more—plus serious training from leadership.",
}

const GOOGLE_FORM_EMBED =
  "https://docs.google.com/forms/d/e/1FAIpQLSdt1ZV05DULjcIHGZurhlEu42A8B4iEUNdxOqCkm5MOSdIm7w/viewform?embedded=true"

const GOOGLE_FORM_SHORT = "https://forms.gle/UxTT8KKKmwgsx7uQ7"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#2d1b3d] to-[#FF3366]/35 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FF3366]/20 via-transparent to-transparent" />
        <div className="container relative z-10 px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">Studio E careers</p>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
              Help us build a global brand that makes social dancing accessible for all
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/85 md:text-xl">
              We&apos;re hiring people who take a <strong className="text-white">long-term view</strong>—who want
              to leverage their skills and networks to grow something bigger than a single class block.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/75">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Globe2 className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                Global ambition, Chicago roots
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Users className="h-4 w-4 text-[#FF7A5A]" aria-hidden />
                Community-first culture
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Who thrives here (and who doesn&apos;t)</h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            <strong className="text-gray-900">This is not the studio for &ldquo;I just want to show up and
            teach.&rdquo;</strong> We expect instructors and leads to be active participants in{" "}
            <strong className="text-gray-900">sales, marketing, class fulfillment, and brand development</strong>.
            If you don&apos;t have those skills yet, we may still invest in you—when we believe you intend to stay
            and grow with us for the long haul.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            We invite you to apply if you want to join a team that treats Studio E as a mission and a business—not
            a side gig where you disappear after class.
          </p>
          <div className="mt-8 rounded-2xl border border-[#FF3366]/20 bg-[#FF3366]/5 p-6 md:p-8">
            <div className="flex items-start gap-3">
              <Briefcase className="mt-1 h-6 w-6 flex-shrink-0 text-[#FF3366]" aria-hidden />
              <div>
                <h3 className="font-bold text-gray-900">Browse roles</h3>
                <p className="mt-2 text-gray-700">
                  See short descriptions for each track—core instructor, pop-up instructor, fitness, sales, marketing,
                  content, business development &amp; operations, member success, and brand &amp; design.
                </p>
                <Link
                  href="/careerslist"
                  className="mt-4 inline-flex font-semibold text-[#FF3366] underline underline-offset-2 hover:text-[#9933CC]"
                >
                  View roles at Studio E →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-10 w-10 text-[#9933CC]" aria-hidden />
            <h2 className="text-2xl font-black text-gray-900 md:text-3xl">Training you won&apos;t get everywhere</h2>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            <strong className="text-gray-900">Austin Moulder</strong>, Studio E&apos;s founder, is a former{" "}
            <strong className="text-gray-900">management consultant with Boston Consulting Group</strong> and a
            former <strong className="text-gray-900">Operations Director</strong> for a{" "}
            <strong className="text-gray-900">$250M technology firm</strong>, where he oversaw{" "}
            <strong className="text-gray-900">200+ employees</strong> and managed{" "}
            <strong className="text-gray-900">multimillion-dollar P&amp;Ls</strong>. He trains Studio E team members
            with a clear path in mind: to eventually step into roles as{" "}
            <strong className="text-gray-900">Studio E location owners</strong> and{" "}
            <strong className="text-gray-900">heads of enterprise departments</strong> (sales, marketing, member
            success, and beyond).
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            The <strong className="text-gray-900">training is the most valuable part of the opportunity</strong>:
            you&apos;ll learn fundamentals of entrepreneurship and operating discipline you can use for the rest of
            your career. Because we invest that deeply,{" "}
            <strong className="text-gray-900">
              we only commit serious time to people we trust will stay for the long haul
            </strong>{" "}
            as we grow a multimillion-dollar franchise and brand.
          </p>
        </div>
      </section>

      <section id="apply" className="scroll-mt-20 border-t border-gray-200 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-black text-gray-900 md:text-3xl">Apply to join our team</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-600">
            Complete the application below. It matches our official{" "}
            <a
              href={GOOGLE_FORM_SHORT}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#FF3366] underline underline-offset-2 hover:text-[#9933CC]"
            >
              Studio E Careers
            </a>{" "}
            form (roles, availability, experience, and fit).
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            <iframe
              src={GOOGLE_FORM_EMBED}
              title="Studio E careers application"
              className="h-[min(2400px,95vh)] w-full min-h-[1600px] bg-white"
              loading="lazy"
            />
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            Form not loading?{" "}
            <a
              href={GOOGLE_FORM_SHORT}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#FF3366] underline underline-offset-2 hover:text-[#9933CC]"
            >
              Open the form in a new tab
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-gray-50 py-10">
        <div className="container px-4 text-center text-sm text-gray-500">
          <Link href="/careerslist" className="font-medium text-[#FF3366] hover:text-[#9933CC]">
            Role descriptions
          </Link>
          <span className="mx-2 text-gray-300">·</span>
          <Link href="/privacy" className="font-medium text-gray-600 hover:text-gray-900">
            Privacy Policy
          </Link>
          <span className="mx-2 text-gray-300">·</span>
          <Link href="/" className="font-medium text-gray-600 hover:text-gray-900">
            Studio E home
          </Link>
        </div>
      </footer>
    </div>
  )
}
