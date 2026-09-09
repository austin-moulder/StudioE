import Image from "next/image"
import { getProductUrl } from "@/lib/merch/shopify"

type MerchProductCardProps = {
  handle: string
  name: string
  price?: string
  image: string
  alt: string
  priority?: boolean
}

export default function MerchProductCard({
  handle,
  name,
  price,
  image,
  alt,
  priority = false,
}: MerchProductCardProps) {
  const href = getProductUrl(handle)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:border-stone-300 hover:shadow-md">
      <a
        href={href}
        className="relative block aspect-[4/5] overflow-hidden bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-inset"
        aria-label={`View ${name} on Shopify`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </a>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex-1">
          <h3 className="font-montserrat text-base font-bold leading-snug text-stone-900">
            {name}
          </h3>
          {price ? (
            <p className="mt-1 text-sm font-semibold text-stone-600">{price}</p>
          ) : null}
        </div>
        <a
          href={href}
          className="inline-flex w-full items-center justify-center rounded-xl border border-stone-900 bg-stone-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3366] focus-visible:ring-offset-2"
        >
          View on Shopify
        </a>
      </div>
    </article>
  )
}
