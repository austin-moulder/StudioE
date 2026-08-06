"use client"

import Image from "next/image"
import Link from "next/link"
import ChoreoGoogleAds from "@/components/analytics/ChoreoGoogleAds"
import ChoreoLeadForm from "@/components/forms/ChoreoLeadForm"

export default function WeddingDancePage() {
  return (
    <>
    <ChoreoGoogleAds />
    <div className="flex flex-col">
      <section className="relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#FF7A5A]/90 via-[#FF3366]/90 to-[#9933CC]/90" />
        <div className="relative h-[400px] w-full bg-gray-300">
          <Image
            src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/wedding.jpg"
            alt="Wedding dance"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="container absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Wedding Dance Choreography
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Create a first dance that&apos;s sexy, stylish, and totally you.
          </p>
          <a
            href="#inquire"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-3 text-base font-bold text-[#FF3366] shadow-lg transition-opacity hover:opacity-95"
          >
            Request a Consultation
          </a>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/wedding.jpg"
                alt="Wedding dance"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center rounded-md bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                  Premium Service
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your Perfect First Dance</h2>
              <p className="mt-4 text-lg text-gray-500">
                Want a wedding dance that&apos;s sexy, stylish, and totally you?
              </p>
              <p className="mt-4 text-gray-500">
                Our professional choreographers will help you create a memorable first dance. Plan
                for a minimum of 4-6 weeks—or start up to 6 months in advance depending on the
                complexity of your request. This is not your typical ballroom experience!
              </p>
              <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-500">
                <li>Tailored instructor hand-chosen by Studio E, based on your specific needs</li>
                <li>Personalized private lessons with one of Chicago&apos;s best instructors</li>
                <li>Custom choreography tailored to your song choice and style</li>
                <li>Latin-inspired movements that feel natural and showcase your connection</li>
                <li>Video recordings of your progress to practice at home</li>
                <li>Confidence-building techniques for your big day</li>
                <li>
                  Learn strong fundamentals of social dance that you&apos;ll share together for the
                  rest of your lives
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#FF7A5A]/10 via-[#FF3366]/10 to-[#9933CC]/10 py-10">
        <div className="container">
          <div className="flex flex-col items-center rounded-lg border border-[#FF3366]/20 bg-white p-6 shadow-sm md:flex-row">
            <div className="flex-1">
              <h3 className="mb-2 text-2xl font-bold text-[#FF3366]">
                Beyond Weddings: Special Occasion Choreography
              </h3>
              <p className="mb-4 text-gray-600">
                We also create stunning choreography for quinceañeras, sweet sixteens, anniversaries,
                and other milestone celebrations. Make your special moment unforgettable with a
                custom dance.
              </p>
              <Link
                href="/quince"
                className="inline-flex items-center justify-center rounded-md bg-[#FF3366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#FF3366]/90"
              >
                Explore Quinceañera Choreography
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold">Our Process</h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
              From your first consultation to your wedding day, we&apos;re with you every step of the
              way
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF3366]/10 text-xl font-bold text-[#FF3366]">
                1
              </div>
              <h3 className="mb-2 text-xl font-bold">Initial Consultation</h3>
              <p className="text-gray-600">
                We&apos;ll learn about your vision, song choice, experience level, and wedding
                timeline to match you with the perfect instructor.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF3366]/10 text-xl font-bold text-[#FF3366]">
                2
              </div>
              <h3 className="mb-2 text-xl font-bold">Custom Choreography</h3>
              <p className="text-gray-600">
                Your instructor will create a unique choreography that highlights your connection and
                feels natural to perform.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF3366]/10 text-xl font-bold text-[#FF3366]">
                3
              </div>
              <h3 className="mb-2 text-xl font-bold">Rehearsal &amp; Refinement</h3>
              <p className="text-gray-600">
                Through weekly sessions, you&apos;ll practice, refine, and master your routine,
                gaining confidence with each lesson.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Capture Every Perfect Moment
              </h2>
              <p className="mb-6 text-lg text-gray-500">
                Your first dance deserves to be documented flawlessly. Studio E has partnered with
                elite wedding photographers who specialize in dance photography.
              </p>
              <div className="mb-6 rounded-lg border border-gray-100 bg-gray-50 p-6">
                <h3 className="mb-2 text-xl font-semibold text-[#FF3366]">
                  Why Our Photographers Are Different
                </h3>
                <p className="mb-4 text-gray-600">
                  Capturing dance movement in low-light reception venues is one of the most
                  challenging skills in wedding photography—and it&apos;s what our photographers
                  excel at.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF3366]">✓</span>
                    <span>
                      Specialized in fast movement capture that typical wedding photographers
                      struggle with
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF3366]">✓</span>
                    <span>Expert at working in challenging reception lighting conditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF3366]">✓</span>
                    <span>
                      Understand dance movement and timing to capture peak moments
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-[#FF3366]">✓</span>
                    <span>
                      Create stunning dance highlight videos and photos that traditional
                      photographers miss
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-lg shadow-xl md:order-2">
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-[#FF3366]/20 to-transparent" />
              <Image
                src="https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/wedding_capture.jpg"
                alt="Wedding dance photography"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">How much time do we need?</h3>
              <p className="text-gray-600">
                Plan for a minimum of 4-6 weeks before your wedding. For more complex routines, we
                can start up to 6 months in advance so you have time to create, practice, and
                perfect your dance without feeling rushed.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">We have two left feet. Can you still help?</h3>
              <p className="text-gray-600">
                Absolutely! Our instructors specialize in working with beginners. We&apos;ll create a
                routine that matches your comfort level while still looking impressive.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Can we choose any song?</h3>
              <p className="text-gray-600">
                Yes! We&apos;ll work with your chosen song, whatever the style. Our instructors are
                skilled at adapting various dance styles to match different music genres.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-bold">Where do the lessons take place?</h3>
              <p className="text-gray-600">
                Lessons are typically held at Studio E HQ in Humboldt Park (2657 W Division St). We
                can also arrange for lessons at your location for an additional fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="inquire" className="scroll-mt-24 bg-gradient-to-r from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-16 text-white">
        <div className="container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Ready to Create Your Perfect First Dance?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
              Tell us about your wedding date and vision. Someone from Studio E will reach out to
              schedule your consultation.
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <ChoreoLeadForm
              iframeId="inline-wedding-choreo-form"
              title="Wedding Dance Inquiry"
            />
          </div>
        </div>
      </section>
    </div>
    </>
  )
}
