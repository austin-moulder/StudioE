"use client"

import { useRef, useState } from "react"
import { Play } from "lucide-react"

type OfferVideoProps = {
  src: string
  poster: string
  title: string
  className?: string
  onPlayStart?: () => void
  onTimeUpdate?: (percent: number) => void
  onComplete?: () => void
}

/**
 * Tap-to-play video with poster. No autoplay with sound.
 * Shared across founder-deal, newmemberdeal, and consolation pass pages.
 */
export default function OfferVideo({
  src,
  poster,
  title,
  className = "",
  onPlayStart,
  onTimeUpdate,
  onComplete,
}: OfferVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [showOverlay, setShowOverlay] = useState(true)
  const started = useRef(false)

  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    setShowOverlay(false)
    video
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setShowOverlay(true)
        setPlaying(false)
      })
  }

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-md ${className}`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        preload="metadata"
        poster={poster}
        controls={playing}
        onPlay={() => {
          setPlaying(true)
          setShowOverlay(false)
          if (!started.current) {
            started.current = true
            onPlayStart?.()
          }
        }}
        onTimeUpdate={() => {
          const video = videoRef.current
          if (!video?.duration || !onTimeUpdate) return
          onTimeUpdate((video.currentTime / video.duration) * 100)
        }}
        onEnded={() => {
          setPlaying(false)
          setShowOverlay(true)
          onComplete?.()
        }}
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {showOverlay ? (
        <button
          type="button"
          onClick={handlePlayClick}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 transition hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3366]"
          aria-label={`Play ${title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF3366] text-white shadow-lg">
            <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
          </span>
          <span className="font-montserrat text-sm font-bold uppercase tracking-wide text-white">
            Tap to play
          </span>
        </button>
      ) : null}
    </div>
  )
}
