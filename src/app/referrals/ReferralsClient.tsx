"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, MapPin, MessageCircle } from "lucide-react"
import ReferralFaq from "@/components/referrals/ReferralFaq"
import ShareButton from "@/components/referrals/ShareButton"
import {
  HOW_IT_WORKS,
  MEMBERSHIP_PLANS,
  MEMBERSHIP_URL,
  QUALIFICATION_RULES,
  REFERRAL_COPY,
  REFERRAL_FAQS,
  REFERRAL_IMAGES,
  REFERRAL_TIERS,
} from "@/lib/referrals/config"

export default function ReferralsClient() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f6] text-stone-900 pb-24 md:pb-0">
      {/* Hero — photo: Wide_group.jpg */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-stone-950 text-white">
        <Image
          src={REFERRAL_IMAGES.heroCommunity}
          alt="Studio E community gathered together at the studio"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/65 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/20 via-transparent to-[#9933CC]/15" />

        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-16 pt-28 sm:pb-20 md:justify-center md:pb-24">
          <div className="max-w-2xl animate-[fadeUp_0.7s_ease-out_both]">
            <p className="mb-4 font-montserrat text-xs font-bold uppercase tracking-[0.28em] text-[#FF7A5A] sm:text-sm">
              {REFERRAL_COPY.pageTitle}
            </p>
            <p className="mb-3 flex items-center gap-2 text-sm text-white/75">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              For Studio E students &amp; members
            </p>
            <h1 className="font-montserrat text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {REFERRAL_COPY.heroHeadline}
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl">
              {REFERRAL_COPY.heroBody}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ShareButton variant="light" className="w-full sm:w-auto">
                {REFERRAL_COPY.primaryCta}
              </ShareButton>
              <a
                href={MEMBERSHIP_URL}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 sm:w-auto sm:text-base"
              >
                {REFERRAL_COPY.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="border-b border-stone-200 bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
              {REFERRAL_COPY.rewardsHeadline}
            </h2>
          </div>

          {/* Progress milestones — visual only, not live tracking */}
          <div className="mx-auto mt-10 max-w-3xl" aria-hidden="true">
            <div className="relative flex items-center justify-between px-2">
              <div className="absolute left-6 right-6 top-1/2 h-1 -translate-y-1/2 rounded-full bg-stone-200" />
              <div className="absolute left-6 top-1/2 h-1 w-[20%] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF7A5A]" />
              {REFERRAL_TIERS.map((tier, index) => (
                <div key={tier.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-montserrat text-sm font-black text-white shadow-md ${
                      index === 0
                        ? "bg-[#FF3366]"
                        : index === 1
                          ? "bg-[#FF7A5A]"
                          : "bg-[#9933CC]"
                    }`}
                  >
                    {tier.referrals}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">
                    {tier.referrals === 1 ? "referral" : "referrals"}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-stone-500">
              {REFERRAL_COPY.progressDisclaimer}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {REFERRAL_TIERS.map((tier, index) => (
              <article
                key={tier.id}
                className={`rounded-2xl border p-6 ${
                  index === 2
                    ? "border-[#9933CC]/40 bg-gradient-to-br from-[#9933CC]/8 to-[#FF3366]/5"
                    : "border-stone-200 bg-stone-50"
                }`}
              >
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#FF3366]">
                  {tier.referrals} referral{tier.referrals > 1 ? "s" : ""}
                </p>
                <h3 className="mt-2 font-montserrat text-xl font-black text-stone-900">
                  {tier.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{tier.reward}</p>
                {tier.totalLabel ? (
                  <p className="mt-4 font-montserrat text-sm font-bold text-stone-900">
                    {tier.totalLabel}
                  </p>
                ) : null}
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-stone-600 md:text-base">
            {REFERRAL_COPY.rewardsNote}
          </p>
        </div>
      </section>

      {/* How it works — photo: DSC05366.jpg */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={REFERRAL_IMAGES.classEnergy}
                alt="Dancers on the Studio E floor during class"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-[#FF3366]">
                How it works
              </p>
              <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
                Five simple steps.
              </h2>
              <ol className="mt-8 space-y-5">
                {HOW_IT_WORKS.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF3366] font-montserrat text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <p className="pt-1.5 text-sm leading-relaxed text-stone-700 sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Community collage — Brandon_Smile, DSC05448, IMG_1101 */}
      <section className="border-y border-stone-200 bg-stone-950 py-12 text-white md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3 sm:gap-4">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={REFERRAL_IMAGES.smilingMember}
                alt="Studio E member smiling at the studio"
                fill
                loading="lazy"
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={REFERRAL_IMAGES.socialDancing}
                alt="Studio E members dancing together at a social"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={REFERRAL_IMAGES.communityMoment}
                alt="Studio E community moment inside the studio"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Qualification rules */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-center font-montserrat text-3xl font-black tracking-tight md:text-4xl">
            Qualification rules
          </h2>
          <ul className="mt-8 space-y-3">
            {QUALIFICATION_RULES.map((rule) => (
              <li key={rule} className="flex gap-3 rounded-xl bg-stone-50 px-4 py-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3366]"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-stone-700">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Memberships — accent photo: DSC05837.jpg */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-[#FF3366]">
                Memberships that qualify
              </p>
              <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
                Point them to a plan that fits.
              </h2>
              <div className="mt-8 space-y-4">
                {MEMBERSHIP_PLANS.map((plan) => (
                  <a
                    key={plan.name}
                    href={MEMBERSHIP_URL}
                    className="block rounded-2xl border border-stone-200 bg-white p-5 transition hover:border-[#FF3366]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366]"
                  >
                    <h3 className="font-montserrat text-lg font-bold text-stone-900">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-stone-600">{plan.detail}</p>
                    <span className="mt-3 inline-block text-xs font-bold uppercase tracking-wide text-[#FF3366]">
                      View on memberships →
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href={MEMBERSHIP_URL}
                  className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2"
                >
                  {REFERRAL_COPY.secondaryCta}
                </a>
              </div>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl lg:min-h-full">
              <Image
                src={REFERRAL_IMAGES.classAtmosphere}
                alt="Studio E class atmosphere with dancers practicing together"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Script */}
      <section className="border-y border-stone-200 bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF3366]/10 text-[#FF3366]">
            <MessageCircle className="h-6 w-6" aria-hidden />
          </div>
          <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
            {REFERRAL_COPY.scriptHeadline}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-stone-700 md:text-xl">
            {REFERRAL_COPY.scriptBody}
          </p>
          <div className="mt-8">
            <ShareButton>{REFERRAL_COPY.primaryCta}</ShareButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center font-montserrat text-3xl font-black tracking-tight md:text-4xl">
            FAQ
          </h2>
          <ReferralFaq items={[...REFERRAL_FAQS]} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-16 text-white md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
            {REFERRAL_COPY.finalHeadline}
          </h2>
          <div className="mt-8">
            <ShareButton variant="light">{REFERRAL_COPY.finalCta}</ShareButton>
          </div>
          <p className="mt-8 text-sm text-white/70">
            <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
              Back to Studio E
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 p-3 backdrop-blur md:hidden">
        <ShareButton variant="sticky" className="w-full">
          {REFERRAL_COPY.stickyCta}
        </ShareButton>
      </div>

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
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
