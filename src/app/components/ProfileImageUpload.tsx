'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { uploadProfileImage, deleteProfileImage } from '@/lib/supabase/profileUtils';
import { User } from '@supabase/supabase-js';
import { Camera, Upload, X } from 'lucide-react';

interface ProfileImageUploadProps {
  user: User;
  currentImageUrl: string | null;
  onImageUpdated: (imageUrl: string | null) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  useApi?: boolean;
}

export default function ProfileImageUpload({
  user,
  currentImageUrl,
  onImageUpdated,
  size = 'md',
  className = '',
  useApi = false,
}: ProfileImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Size mappings
  const sizeMap = {
    sm: {
      container: 'w-20 h-20',
      image: 'w-20 h-20',
    },
    md: {
      container: 'w-32 h-32',
      image: 'w-32 h-32',
    },
    lg: {
      container: 'w-40 h-40',
      image: 'w-40 h-40',
    },
  };

  const uploadViaApi = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/profile/image-upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  };

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setError(null);
        setIsUploading(true);

        // Create a local preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        // Upload to Supabase
        let imageUrl: string | null;
        
        if (useApi) {
          imageUrl = await uploadViaApi(file);
        } else {
          imageUrl = await uploadProfileImage(user.id, file);
        }
        
        if (imageUrl) {
          onImageUpdated(imageUrl);
        } else {
          setError('Failed to upload image');
          // Revert preview if upload failed
          setPreviewUrl(currentImageUrl);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while uploading');
        // Revert preview if upload failed
        setPreviewUrl(currentImageUrl);
      } finally {
        setIsUploading(false);
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [user.id, currentImageUrl, onImageUpdated, useApi]
  );

  const handleRemoveImage = useCallback(async () => {
    if (!currentImageUrl) return;
    
    try {
      setIsUploading(true);
      setError(null);
      
      await deleteProfileImage(user.id, currentImageUrl);
      setPreviewUrl(null);
      onImageUpdated(null);
    } catch (err: any) {
      setError(err.message || 'Failed to remove image');
    } finally {
      setIsUploading(false);
    }
  }, [user.id, currentImageUrl, onImageUpdated]);

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <div
          className={`${
            sizeMap[size].container
          } overflow-hidden rounded-full bg-gray-100 border border-gray-200 relative flex items-center justify-center`}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile"
              className={`${sizeMap[size].image} object-cover`}
              width={size === 'sm' ? 80 : size === 'md' ? 128 : 160}
              height={size === 'sm' ? 80 : size === 'md' ? 128 : 160}
            />
          ) : (
            <div className={`${sizeMap[size].container} flex items-center justify-center bg-gray-200`}>
              <Camera className="text-gray-400" size={size === 'sm' ? 24 : size === 'md' ? 32 : 40} />
            </div>
          )}

          {isUploading && (
            <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full`}>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 right-0 flex space-x-1">
          <button
            onClick={handleTriggerFileInput}
            className="bg-blue-500 hover:bg-blue-600 text-white p-1.5 rounded-full shadow-md transition-colors"
            disabled={isUploading}
            title="Upload image"
            aria-label="Upload profile image"
          >
            <Upload size={size === 'sm' ? 14 : 16} />
          </button>

          {previewUrl && (
            <button
              onClick={handleRemoveImage}
              className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-md transition-colors"
              disabled={isUploading}
              title="Remove image"
              aria-label="Remove profile image"
            >
              <X size={size === 'sm' ? 14 : 16} />
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        aria-label="Upload profile image"
      />
    </div>
  );
} 