import { Heart } from "lucide-react"

const SOCIAL_DONATION_URL = "https://square.link/u/UjtiuJKC"

export default function SocialHeroOfferCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2 text-white/80">
        <Heart className="h-4 w-4" />
        <span className="text-sm font-semibold">The offer</span>
      </div>
      <div className="space-y-3 text-sm leading-snug text-white/90">
        <p className="font-semibold text-white">Free with RSVP. Donations highly encouraged.</p>
        <p className="text-white/85">
          Most attendees donate $15–$25 and can choose to support instructor pay, our current mural buildout, or
          installation of our sign.
        </p>
        <a
          href={SOCIAL_DONATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full border-2 border-white bg-white px-4 py-3 text-center text-sm font-bold text-gray-900 shadow-sm transition-opacity hover:opacity-95 sm:w-auto"
        >
          Donate
        </a>
      </div>
    </div>
  )
}
