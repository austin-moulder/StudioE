"use client"

import { useEffect, useState } from "react"
import { isAprilMayFreeSocial } from "./socialAprilMayFree"

export default function SocialDancerPassFaq() {
  const [freeSeason, setFreeSeason] = useState(false)

  useEffect(() => {
    setFreeSeason(isAprilMayFreeSocial())
  }, [])

  if (freeSeason) {
    return (
      <>
        <p>
          <strong className="text-gray-800">April &amp; May:</strong> weekly Happy Hour &amp; Social entry is{" "}
          <strong>FREE</strong>. We&apos;re not selling or requiring a social-dancer pass during these months—just
          RSVP and show up.
        </p>
        <p className="mt-2">
          <strong className="text-gray-800">Starting June 1:</strong> the buy-one-drop-in, four-socials bundle, after
          7:30 pm pass rules, and the &ldquo;Buy pass ahead&rdquo; button on this page all take effect again.
        </p>
      </>
    )
  }

  return (
    <>
      <p>
        Buy one drop-in and you get access to four Friday socials free. Your window starts the day you purchase—it
        isn&apos;t based on a calendar month.
      </p>
      <p className="mt-2">
        If you arrive after 7:30 pm, you&apos;ll need a dancer pass to enter unless you&apos;re already a member.
      </p>
      <p className="mt-2 text-gray-600">
        Purchase ahead anytime with the <span className="font-semibold text-gray-800">Buy pass ahead</span> button in
        the hero section.
      </p>
    </>
  )
}
