/**
 * Single source of truth for Studio E Shopify destinations.
 * Update `SHOPIFY_STORE` / paths here — CTAs pull from these helpers.
 *
 * Image placement map (lifestyle / Supabase Merch assets):
 * - Hero: Colombian_hoodie.JPG — couple in hoodies (community + apparel worn)
 * - Editorial detail: DSC04136.jpg — founder backshot / logo mark
 * - Editorial full-body: Mythri_Hoodie.jpg — posed friendly sweater
 * - Editorial candid: Karla_Coffee.JPG — candid community moment
 * - Unused but available: Ilean_expands.jpg, Samm_shirt.jpg
 */

export const SHOPIFY_STORE = "https://studio-e-3328.myshopify.com" as const

export const SHOPIFY_DISCOUNT_CODE = "FOUNDER" as const

/** Only published collection on the store (Home page). */
export const SHOPIFY_COLLECTION_PATH = "/collections/frontpage" as const

export const MERCH_UTM = {
  utm_source: "studioe",
  utm_medium: "website",
  utm_campaign: "founders_drop",
} as const

const UTM_QUERY = new URLSearchParams(MERCH_UTM).toString()

function withUtm(path: string) {
  const separator = path.includes("?") ? "&" : "?"
  return `${path}${separator}${UTM_QUERY}`
}

/** Primary CTA: applies FOUNDER discount, then redirects into the storefront collection. */
export function getFounderOfferUrl() {
  const redirect = withUtm(SHOPIFY_COLLECTION_PATH)
  return `${SHOPIFY_STORE}/discount/${SHOPIFY_DISCOUNT_CODE}?redirect=${encodeURIComponent(redirect)}`
}

export function getProductUrl(handle: string) {
  return `${SHOPIFY_STORE}/products/${handle}?${UTM_QUERY}`
}

export function getCollectionUrl() {
  return `${SHOPIFY_STORE}${withUtm(SHOPIFY_COLLECTION_PATH)}`
}

export const MERCH_IMAGES = {
  heroCoupleHoodie:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Merch/Colombian_hoodie.JPG",
  founderBackshot:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Merch/DSC04136.jpg",
  mythriHoodie:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Merch/Mythri_Hoodie.jpg",
  karlaCoffee:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Merch/Karla_Coffee.JPG",
  ileanExpands:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Merch/Ilean_expands.jpg",
  sammShirt:
    "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Merch/Samm_shirt.jpg",
} as const

/** Featured products — prices confirmed from Shopify products.json (2026-09-08). */
export const FEATURED_PRODUCTS = [
  {
    handle: "the-classic-baby-t-shirt",
    name: "The Classic | Baby T-shirt",
    price: "$30",
    image:
      "https://cdn.shopify.com/s/files/1/0743/4813/4478/files/b3846c8f13654a7c85f0b89d608ece57.png?v=1781205904",
    alt: "Studio E The Classic Baby T-shirt product photo",
  },
  {
    handle: "the-classic-oversized-cotton-t-shirt",
    name: "The Classic | Oversized Cotton T-Shirt",
    price: "$35",
    image:
      "https://cdn.shopify.com/s/files/1/0743/4813/4478/files/45a2c873484b4f23a586f7223d031213.png?v=1787596046",
    alt: "Studio E The Classic Oversized Cotton T-Shirt product photo",
  },
  {
    handle: "essentials-cropped-hoodie",
    name: "Essentials Cropped Hoodie",
    price: "$55",
    image:
      "https://cdn.shopify.com/s/files/1/0743/4813/4478/files/33d0fd6a07714fc2a5a29f096c9c9ad1.png?v=1781202908",
    alt: "Studio E Essentials Cropped Hoodie product photo",
  },
  {
    handle: "founder-s-club-varsity-jacket",
    name: "Studio E Founder's Club Varsity Jacket",
    price: "$80",
    image:
      "https://cdn.shopify.com/s/files/1/0743/4813/4478/files/b71f4f4c0c914296907ba0111c1907d5.png?v=1781202784",
    alt: "Studio E Founder's Club Varsity Jacket product photo",
  },
  {
    handle: "the-studio-e-track-jacket",
    name: "Studio E Track Jacket",
    price: "$60",
    image:
      "https://cdn.shopify.com/s/files/1/0743/4813/4478/files/0cd53bc7529e43ff82c2884fa4ebe0af.png?v=1781206098",
    alt: "Studio E Track Jacket product photo",
  },
  {
    handle: "vintage-washed-hoodie",
    name: "Vintage Washed Hoodie",
    price: "$55",
    image:
      "https://cdn.shopify.com/s/files/1/0743/4813/4478/files/98d4a479ecf0455fa9cb9495553c3a2b.png?v=1781205859",
    alt: "Studio E Vintage Washed Hoodie product photo",
  },
] as const
