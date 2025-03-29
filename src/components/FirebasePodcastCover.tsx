"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

interface FirebasePodcastCoverProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}

export default function FirebasePodcastCover({
  width = 400,
  height = 400, 
  className = "",
  alt = "Podcast Cover",
  priority = false,
  objectFit = "contain"
}: FirebasePodcastCoverProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcastCover = async () => {
      try {
        // Look for podcast_cover_main in the Podcast folder
        const podcastFolderRef = ref(storage, "Podcast");
        
        try {
          // List all files in the Podcast folder
          const result = await listAll(podcastFolderRef);
          console.log("Files in Podcast folder:", result.items.map(item => item.fullPath));
          
          // Find the podcast_cover_main file
          const mainCover = result.items.find(item => 
            item.name.toLowerCase().includes("podcast_cover_main")
          );
          
          if (mainCover) {
            // If we found the main podcast cover, use it
            const url = await getDownloadURL(mainCover);
            console.log("Using podcast cover:", mainCover.fullPath);
            setCoverUrl(url);
          } else if (result.items.length > 0) {
            // If no main cover but we have some other cover, use the first one
            const coverRef = result.items[0];
            const url = await getDownloadURL(coverRef);
            console.log("No main podcast cover found, using first cover:", coverRef.fullPath);
            setCoverUrl(url);
          } else {
            // Fall back to default cover
            console.warn("No podcast cover files found in Podcast folder");
            setCoverUrl("/placeholder.svg?height=400&width=400&text=PodcastCover");
          }
        } catch (folderError) {
          console.warn("Error accessing Podcast folder:", folderError);
          setCoverUrl("/placeholder.svg?height=400&width=400&text=PodcastCover");
        }
      } catch (error) {
        console.error("Error fetching podcast cover:", error);
        // Fallback to the default image
        setCoverUrl("/placeholder.svg?height=400&width=400&text=PodcastCover");
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastCover();
  }, []);

  if (loading) {
    return (
      <div 
        className={`bg-gray-100 animate-pulse rounded-md ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
    );
  }

  if (!coverUrl) {
    return null;
  }

  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <Image
        src={coverUrl}
        alt={alt}
        fill
        sizes={`${Math.max(width, height)}px`}
        className={`object-${objectFit}`}
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