"use client"

interface VideoBackgroundProps {
  videoId: string;
  className?: string;
}

export function VideoBackground({ videoId, className = "" }: VideoBackgroundProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
        className="absolute inset-0 w-full h-full object-cover scale-[1.8] md:scale-[1.5]"
        style={{
          transformOrigin: 'center center'
        }}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title="Background video"
      />
      {/* Studio E brand gradient overlays with darker overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF3366]/60 via-transparent to-[#9933CC]/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF3366]/70 via-transparent to-[#9933CC]/70" />
      {/* Additional dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
} 