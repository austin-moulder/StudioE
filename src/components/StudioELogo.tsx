"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getMainLogoUrl } from '@/lib/supabase/logoUtils';

interface StudioELogoProps {
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
  className?: string;
}

export default function StudioELogo({
  width = 40,
  height = 40,
  alt = 'Studio E Logo',
  priority = false,
  className = '',
}: StudioELogoProps) {
  const [logoUrl, setLogoUrl] = useState<string>('/placeholder-logo.svg');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const url = await getMainLogoUrl();
        setLogoUrl(url);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading logo:', err);
        setError(true);
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, []);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
        <div className="w-full h-full animate-pulse bg-gray-200 rounded-md"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
        <span className="font-bold text-xs">LOGO</span>
      </div>
    );
  }

  // Check if the URL is from Supabase
  const isSupabaseUrl = logoUrl.includes('supabase.co');
  
  if (isSupabaseUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
        <Image 
          src={logoUrl} 
          alt={alt} 
          width={width} 
          height={height} 
          priority={priority}
          className="object-contain"
          unoptimized // This bypasses Next.js image optimization for external URLs
        />
      </div>
    );
  }

  // For local images
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <Image 
        src={logoUrl} 
        alt={alt} 
        width={width} 
        height={height} 
        priority={priority}
        className="object-contain"
      />
    </div>
  );
} 