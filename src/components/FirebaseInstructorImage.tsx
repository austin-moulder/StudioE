"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

interface FirebaseInstructorImageProps {
  instructorName: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}

export default function FirebaseInstructorImage({
  instructorName,
  width = 192,
  height = 192,
  className = "",
  alt = "Instructor Image",
  priority = false,
  objectFit = "cover"
}: FirebaseInstructorImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructorImage = async () => {
      try {
        // Normalize the instructor name for file matching
        const normalizedName = instructorName.toLowerCase().replace(/\s+/g, "_");
        
        // Look in the Instructors folder
        const instructorsRef = ref(storage, "Instructors");
        
        try {
          // List all files in the Instructors folder
          const result = await listAll(instructorsRef);
          console.log("Files in Instructors folder:", result.items.map(item => item.fullPath));
          
          // Find an image that matches the instructor name
          const instructorImage = result.items.find(item => 
            item.name.toLowerCase().includes(normalizedName)
          );
          
          if (instructorImage) {
            // If we found an image matching the instructor name, use it
            const url = await getDownloadURL(instructorImage);
            console.log("Using instructor image:", instructorImage.fullPath);
            setImageUrl(url);
          } else if (result.items.length > 0) {
            // If no specific instructor image found but we have other images, use a fallback
            console.warn(`No image found for instructor: ${instructorName}`);
            setImageUrl("/placeholder.svg?height=192&width=192&text=" + instructorName.substring(0, 2));
          } else {
            // No images at all
            console.warn("No instructor images found");
            setImageUrl("/placeholder.svg?height=192&width=192&text=" + instructorName.substring(0, 2));
          }
        } catch (folderError) {
          console.warn("Error accessing Instructors folder:", folderError);
          setImageUrl("/placeholder.svg?height=192&width=192&text=" + instructorName.substring(0, 2));
        }
      } catch (error) {
        console.error("Error fetching instructor image:", error);
        // Fallback to a placeholder
        setImageUrl("/placeholder.svg?height=192&width=192&text=" + instructorName.substring(0, 2));
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorImage();
  }, [instructorName]);

  if (loading) {
    return (
      <div 
        className={`bg-gray-100 animate-pulse rounded-full ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={`${Math.max(width, height)}px`}
        className={`rounded-full object-${objectFit}`}
        style={{ 
          objectFit: objectFit,
          objectPosition: 'center'
        }}
        priority={priority}
        unoptimized={true}
      />
    </div>
  );
} 