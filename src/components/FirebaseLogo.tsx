"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface FirebaseLogoProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export default function FirebaseLogo({
  width = 40,
  height = 40, 
  className = "",
  alt = "Logo",
  priority = false
}: FirebaseLogoProps) {
  // Always use the local logo
  const logoUrl = "/logo.svg";

  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src={logoUrl}
        alt={alt}
        fill
        sizes={`${Math.max(width, height)}px`}
        className="object-contain"
        style={{ 
          objectFit: 'contain',
          objectPosition: 'center'
        }}
        priority={priority}
        unoptimized={true}
      />
    </div>
  );
} 