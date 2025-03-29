"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

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
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        // Look in the main subfolder
        const mainFolderRef = ref(storage, "Logos/main");
        
        try {
          // Try to list files in the main subfolder
          const mainResult = await listAll(mainFolderRef);
          console.log("Files in Logos/main folder:", mainResult.items.map(item => item.fullPath));
          
          if (mainResult.items.length > 0) {
            // Use the first logo from the main folder
            const logoRef = mainResult.items[0];
            const url = await getDownloadURL(logoRef);
            console.log("Using logo from main folder:", logoRef.fullPath);
            setLogoUrl(url);
            return;
          }
        } catch (mainFolderError) {
          console.warn("Error accessing Logos/main folder:", mainFolderError);
          // Continue to try the root Logos folder
        }
        
        // Fallback: Look in the Logos folder if main subfolder didn't work
        const logosRef = ref(storage, "Logos");
        const result = await listAll(logosRef);
        console.log("Files in Logos folder:", result.items.map(item => item.fullPath));
        
        // Find any logo with "main" in the filename
        const mainLogo = result.items.find(item => 
          item.name.toLowerCase().includes("main")
        );
        
        if (mainLogo) {
          const url = await getDownloadURL(mainLogo);
          console.log("Using main logo from Logos folder:", mainLogo.fullPath);
          setLogoUrl(url);
        } else if (result.items.length > 0) {
          const logoRef = result.items[0];
          const url = await getDownloadURL(logoRef);
          console.log("Using first available logo:", logoRef.fullPath);
          setLogoUrl(url);
        } else {
          console.warn("No logo files found in any folder");
          setLogoUrl("/logo.svg");
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
        // Fallback to the default logo
        setLogoUrl("/logo.svg");
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  if (loading) {
    return (
      <div 
        className={`bg-gray-100 animate-pulse rounded-full ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      ></div>
    );
  }

  if (!logoUrl) {
    return null;
  }

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