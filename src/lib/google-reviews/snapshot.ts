import type { GoogleReview } from "./types"

/**
 * Live 5-star reviews pulled from Studio E's Google Maps listing
 * (Oct 27, 2026). Used when GOOGLE_PLACES_API_KEY is not configured.
 * Quotes are verbatim from public Google reviews.
 */
export const GOOGLE_FIVE_STAR_SNAPSHOT: readonly GoogleReview[] = [
  {
    authorName: "Karla",
    rating: 5,
    relativeTime: "3 months ago",
    text: "Hola! This is the happiest place on Earth—honestly, even better than Disneyland! And unlike Disneyland, the price is incredibly affordable for everything you get. The value you receive from the classes, the community, and the support is truly unmatched. Studio E is still growing, which makes it such a special time to be part of the community. The people I've met are absolutely amazing. They've become part of my chosen family. The classes are incredible, and I always leave having learned something new. The instructors create an environment where I feel comfortable asking questions, growing, and challenging myself. Best of all, it's a safe, supportive space for women where everyone is encouraged to be themselves.",
  },
  {
    authorName: "Janet Tan",
    rating: 5,
    relativeTime: "3 months ago",
    text: "I tried learning salsa at another studio about two years ago, but it just didn't click. That experience made me hesitant to try again—until I discovered Studio E. What's different here is Austin. As the owner and founder, he's built something truly special: a welcoming, supportive community centered around Latin dance. Over the past two weeks, I've taken about five different classes, and I've genuinely enjoyed every single one. The people, the instructors, the energy—it's all fantastic. Everyone is so friendly and encouraging, whether you're a total beginner or more advanced. If you've ever wanted to learn Salsa, Bachata, or Cumbia, I highly recommend Studio E.",
  },
  {
    authorName: "Aisolis Ramos",
    rating: 5,
    relativeTime: "7 months ago",
    text: "I had the best time at Studio E! I went to a free class yesterday and brought a friend with me, and we both left smiling the whole way home. We learned bachata, and the class was such a great experience from start to finish. The instructor Austin was incredibly nice and made everyone feel comfortable right away. He did an amazing job teaching—breaking the steps down clearly and also demonstrating exactly what he meant so it was easy to follow along, even for beginners. The atmosphere was welcoming, fun, and supportive. Whether you're brand new to dance or looking to improve your skills, I highly recommend checking out Studio E.",
  },
] as const
