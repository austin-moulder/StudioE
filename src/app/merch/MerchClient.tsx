"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import MerchCta from "@/components/merch/MerchCta"
import MerchFaq from "@/components/merch/MerchFaq"
import MerchGallery from "@/components/merch/MerchGallery"
import MerchProductCard from "@/components/merch/MerchProductCard"
import { FEATURED_PRODUCTS, MERCH_CAROUSEL, MERCH_IMAGES } from "@/lib/merch/shopify"

const whyPoints = [
  {
    title: "Designed for movement",
    body: "Pieces chosen to move with you—from class to social to the city.",
  },
  {
    title: "Built around community",
    body: "Worn by the people showing up and dancing at Studio E.",
  },
  {
    title: "Made to represent where you're from and where you're going",
    body: "A quiet signal that you belong to Studio E.",
  },
]

const faqItems = [
  {
    question: "Is there a discount for first-time buyers?",
    answer:
      "Yes. Through October, first-time buyers get 20% off their entire order. The discount applies at Shopify checkout.",
  },
  {
    question: "Do members get special pricing?",
    answer:
      "Yes. Studio E members get early access to new drops and special pricing. What’s available now is on the Shopify store, and new pieces show up there first for members.",
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
        <p className="px-3 py-2.5 font-montserrat text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs sm:tracking-[0.16em]">
          First-time buyers: 20% off your entire order through October
        </p>
      </div>

      {/* 2. Hero */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-stone-950 text-white">
        <Image
          src={MERCH_IMAGES.hero}
          alt="Studio E community wearing merch together"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-[#9933CC]/15" />

        <div className="container relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-14 pt-24 sm:pb-20 md:justify-center md:pb-24">
          <div className="max-w-2xl animate-[fadeUp_0.7s_ease-out_both]">
            <p className="mb-3 flex items-center gap-2 text-sm text-white/75">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              Studio E · Humboldt Park, Chicago
            </p>
            <h1 className="font-montserrat text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Wear the energy. Move with{" "}
              <span className="whitespace-nowrap">Studio E.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl">
              Rooted in culture and made for movement. Members get early access to new drops and
              special pricing.
            </p>
            <div className="mt-6 max-w-md rounded-2xl border border-white/25 bg-black/40 px-4 py-3 backdrop-blur-sm">
              <p className="font-montserrat text-sm font-black uppercase tracking-wide text-[#FF7A5A]">
                20% off in October
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/90">
                First-time buyers get 20% off their entire order for the month of October.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <MerchCta variant="light" className="w-full sm:w-auto">
                Shop the collection
              </MerchCta>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Offer */}
      <section className="border-b border-stone-200 bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-5xl">
            Rooted in Culture. Made for Movement.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-600 md:text-lg">
            Studio E members get early access to new drops and special pricing—before the rest of
            the shop.
          </p>
          <div className="mt-8">
            <MerchCta>Shop merch</MerchCta>
          </div>
        </div>
      </section>

      {/* 4. Product preview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <p className="mb-3 font-montserrat text-xs font-bold uppercase tracking-[0.25em] text-[#FF3366]">
              The collection
            </p>
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
              Studio E favorites
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
            <MerchCta variant="secondary">Shop the full collection</MerchCta>
          </div>
        </div>
      </section>

      {/* 5. Photo carousel */}
      <section className="border-t border-stone-200 bg-white py-16 md:py-20" aria-labelledby="gallery-heading">
        <div className="mx-auto max-w-6xl px-4">
          <h2
            id="gallery-heading"
            className="mb-8 text-center font-montserrat text-3xl font-black tracking-tight md:mb-10 md:text-4xl"
          >
            On the floor
          </h2>
          <MerchGallery images={MERCH_CAROUSEL} imageAlt="Studio E merch worn in the studio" />
        </div>
      </section>

      {/* 6. Lifestyle / editorial */}
      <section className="border-y border-stone-200 bg-stone-950 py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
              Worn together. On the floor and off it.
            </h2>
          </div>
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-5">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={MERCH_IMAGES.group}
                alt="Studio E group wearing merch together"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={MERCH_IMAGES.coupleOne}
                alt="A couple wearing Studio E merch"
                fill
                loading="lazy"
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </figure>
            <figure className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                src={MERCH_IMAGES.coupleTwo}
                alt="A couple in Studio E apparel"
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

      {/* 7. Member access */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF7A5A] via-[#FF3366] to-[#9933CC] py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />
        <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-montserrat text-3xl font-black tracking-tight md:text-4xl">
            Members move first.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Early access to new drops and special pricing, for Studio E members.
          </p>
          <div className="mt-8">
            <MerchCta variant="light">Shop now</MerchCta>
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
            Rooted in Culture. Made for Movement.
          </h2>
          <div className="mt-8">
            <MerchCta variant="light">Shop the collection</MerchCta>
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
