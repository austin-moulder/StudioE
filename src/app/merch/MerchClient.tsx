"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import MerchCta from "@/components/merch/MerchCta"
import MerchFaq from "@/components/merch/MerchFaq"
import MerchProductCard from "@/components/merch/MerchProductCard"
import {
  FEATURED_PRODUCTS,
  MERCH_IMAGES,
  SHOPIFY_DISCOUNT_CODE,
} from "@/lib/merch/shopify"

const whyPoints = [
  {
    title: "Designed for movement",
    body: "Pieces chosen to move with you—from class to social to the city.",
  },
  {
    title: "Built around community",
    body: "Worn by the people showing up, dancing, and building Studio E from day one.",
  },
  {
    title: "Made to represent where you're from and where you're going",
    body: "A quiet signal that you belong to this chapter of Studio E.",
  },
]

const faqItems = [
  {
    question: "How does the FOUNDER offer work?",
    answer:
      "Buy two qualifying Studio E merch items, then add The Classic Baby Tee for $5 or The Classic T-Shirt for $10 and enter code FOUNDER at Shopify checkout. The discount link on this page applies the code when you enter the store—eligibility still depends on your cart and Shopify’s rules.",
  },
  {
    question: "Where do I complete my purchase?",
    answer:
      "All purchases are completed on the Studio E Shopify store. This page is a sales overview only—Shopify handles products, inventory, pricing, and checkout.",
  },
  {
    question: "What products qualify?",
    answer:
      "See the current policy and product details on Shopify before completing your order.",
  },
  {
    question: "How do I choose my size?",
    answer:
      "See the current policy and product details on Shopify before completing your order.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "See the current policy and product details on Shopify before completing your order.",
  },
  {
    question: "What is the return or exchange policy?",
    answer:
      "See the current policy and product details on Shopify before completing your order.",
  },
]

export default function MerchClient() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f6] text-stone-900">
      {/* 1. Announcement bar */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-stone-950 text-center">
        <p className="px-3 py-2.5 font-montserrat text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs sm:tracking-[0.18em]">
          Studio E Founders Drop | Grand Opening Merch
        </p>
      </div>

      {/* 2. Hero */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-stone-950 text-white">
        <Image
          src={MERCH_IMAGES.heroCoupleHoodie}
          alt="Two Studio E community members wearing Studio E hoodies together"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-[#9933CC]/15" />

        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-14 pt-24 sm:pb-20 md:justify-center md:pb-24">
          <div className="max-w-2xl animate-[fadeUp_0.7s_ease-out_both]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              Founders Drop
            </div>
            <p className="mb-3 flex items-center gap-2 text-sm text-white/75">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              Studio E · Humboldt Park, Chicago
            </p>
            <h1 className="font-montserrat text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Wear the energy. Move with{" "}
              <span className="whitespace-nowrap">Studio E.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl">
              The Studio E Founders Drop is made for the people helping build the culture from the
              beginning.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MerchCta variant="light" className="w-full sm:w-auto">
                Shop the Founders Drop
              </MerchCta>
            </div>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75">
              Buy two qualifying pieces and unlock The Classic Baby Tee for $5 or The Classic
              T-Shirt for $10 with code {SHOPIFY_DISCOUNT_CODE}.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Offer */}
      <section className="border-b border-stone-200 bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-[#FF3366]">
            The offer
          </p>
          <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
            Build your Studio E uniform.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg">
            Choose any two qualifying merch pieces. Then add The Classic Baby Tee for $5 or The
            Classic T-Shirt for $10 with code {SHOPIFY_DISCOUNT_CODE} at Shopify checkout.
          </p>
          <div className="mt-8">
            <MerchCta>Claim the Founder Offer</MerchCta>
          </div>
          <p className="mt-4 text-xs text-stone-500">
            Code applies when you use the link above; final eligibility is confirmed at Shopify
            checkout.
          </p>
        </div>
      </section>

      {/* 4. Product preview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-[#FF3366]">
              The drop
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
              Founders Drop favorites
            </h2>
            <p className="mt-4 text-stone-600">
              Preview a few pieces, then finish browsing and checkout on Shopify.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PRODUCTS.map((product, index) => (
              <MerchProductCard
                key={product.handle}
                handle={product.handle}
                name={product.name}
                price={product.price}
                image={product.image}
                alt={product.alt}
                priority={index < 2}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <MerchCta variant="secondary">Shop the full drop on Shopify</MerchCta>
          </div>
        </div>
      </section>

      {/* 5. Lifestyle / editorial */}
      <section className="border-y border-stone-200 bg-stone-950 py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
              Not just merch. A marker that you were here early.
            </h2>
          </div>
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-5">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl md:col-span-1">
              <Image
                src={MERCH_IMAGES.founderBackshot}
                alt="Close-up of Studio E apparel logo on the back of a shirt"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl md:col-span-1">
              <Image
                src={MERCH_IMAGES.mythriHoodie}
                alt="Studio E community member wearing a Studio E hoodie"
                fill
                loading="lazy"
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl md:col-span-1">
              <Image
                src={MERCH_IMAGES.karlaCoffee}
                alt="Studio E community member in studio wearing merch with a coffee"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 6. Why Studio E */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-[#FF3366]">
              Why Studio E
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
              Culture you can wear.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-6">
            {whyPoints.map((point, index) => (
              <div key={point.title} className="text-center md:text-left">
                <div className="mb-3 font-montserrat text-sm font-bold text-[#FF3366]">
                  0{index + 1}
                </div>
                <h3 className="font-montserrat text-lg font-bold text-stone-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Founder offer reminder */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />
        <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
            Start with two. Make it yours.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Pick your pieces, add a Classic item, and use code {SHOPIFY_DISCOUNT_CODE} at checkout.
          </p>
          <div className="mt-8">
            <MerchCta variant="light">Shop Now</MerchCta>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8 text-center">
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">FAQ</h2>
            <p className="mt-3 text-stone-600">
              Quick answers before you head to Shopify.
            </p>
          </div>
          <MerchFaq items={faqItems} />
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="border-t border-stone-200 bg-stone-950 py-16 text-white md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
            Be part of the first chapter.
          </h2>
          <div className="mt-8">
            <MerchCta variant="light">Shop the Founders Drop</MerchCta>
          </div>
          <p className="mt-8 text-sm text-white/60">
            <Link href="/" className="underline-offset-4 hover:text-white hover:underline">
              Back to Studio E
            </Link>
          </p>
        </div>
      </section>

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
