'use client';

import Image from 'next/image';
import { User } from 'lucide-react';

interface ProfileImageProps {
  src: string | null;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackInitials?: string;
}

export default function ProfileImage({
  src,
  alt = 'Profile',
  size = 'md',
  className = '',
  fallbackInitials,
}: ProfileImageProps) {
  // Size mappings in pixels and tailwind classes
  const sizeMap = {
    xs: { size: 24, class: 'w-6 h-6' },
    sm: { size: 32, class: 'w-8 h-8' },
    md: { size: 40, class: 'w-10 h-10' },
    lg: { size: 64, class: 'w-16 h-16' },
    xl: { size: 96, class: 'w-24 h-24' },
  };

  // Get initials from the alt text if fallbackInitials is not provided
  const initials = fallbackInitials || 
    alt.split(' ')
      .map(name => name[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

  // Handle image loading errors by showing the fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.querySelector('.fallback')?.classList.remove('hidden');
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-full bg-gray-100 flex items-center justify-center ${sizeMap[size].class} ${className}`}>
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            width={sizeMap[size].size}
            height={sizeMap[size].size}
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
          <div className={`fallback absolute inset-0 flex items-center justify-center bg-gray-200 hidden`}>
            {initials || <User className="text-gray-500" size={sizeMap[size].size * 0.5} />}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500 font-medium">
          {initials || <User size={sizeMap[size].size * 0.5} />}
        </div>
      )}
    </div>
  );
} 