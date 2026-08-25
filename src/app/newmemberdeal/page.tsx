import type { Metadata } from "next"
import NewMemberDealClient from "./NewMemberDealClient"

export const metadata: Metadata = {
  title: "Welcome to Studio E | New Member Offer",
  description:
    "Thank you for becoming a Studio E member. Claim your new-member-only BOGO private lesson offer before it expires.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewMemberDealPage() {
  return <NewMemberDealClient />
}
