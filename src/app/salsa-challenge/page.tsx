import type { Metadata } from "next"
import SalsaChallengeContent from "./SalsaChallengeContent"

export const metadata: Metadata = {
  title: "Master Salsa Basics in 20 Minutes | Free Salsa Class Chicago",
  description:
    "Free salsa basics video for Chicago beginners. Learn the basic step, right turn, and left turn, then claim a free first salsa class to practice in person.",
}

export default function SalsaChallengePage() {
  return <SalsaChallengeContent />
}
