import { NextRequest, NextResponse } from 'next/server';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebase';

export async function GET(request: NextRequest) {
  try {
    // Try to look in the main subfolder first
    const mainFolderRef = ref(storage, "Logos/main");
    
    try {
      // Try to list files in the main subfolder
      const mainResult = await listAll(mainFolderRef);
      console.log("Files in Logos/main folder for favicon:", mainResult.items.map(item => item.fullPath));
      
      if (mainResult.items.length > 0) {
        // Use the first logo from the main folder
        const logoRef = mainResult.items[0];
        const logoUrl = await getDownloadURL(logoRef);
        console.log("Using logo from main folder for favicon:", logoRef.fullPath);
        return NextResponse.json({ url: logoUrl }, { status: 200 });
      }
    } catch (mainFolderError) {
      console.warn("Error accessing Logos/main folder for favicon:", mainFolderError);
      // Continue to try the root Logos folder
    }
    
    // Fallback: Look in the Logos folder
    const logosRef = ref(storage, "Logos");
    const result = await listAll(logosRef);
    console.log("Files in Logos folder for favicon:", result.items.map(item => item.fullPath));
    
    // Find the logo with "main" in the filename (case insensitive)
    const mainLogo = result.items.find(item => 
      item.name.toLowerCase().includes("main")
    );
    
    if (mainLogo) {
      // If we found a logo with "main" in the name, use it
      const logoUrl = await getDownloadURL(mainLogo);
      console.log("Using main logo for favicon:", mainLogo.fullPath);
      return NextResponse.json({ url: logoUrl }, { status: 200 });
    } else if (result.items.length > 0) {
      // If no main logo but we have some other logo, use the first one
      const logoRef = result.items[0];
      const logoUrl = await getDownloadURL(logoRef);
      console.log("No main logo found, using first logo for favicon:", logoRef.fullPath);
      return NextResponse.json({ url: logoUrl }, { status: 200 });
    } else {
      // Fall back to default logo
      console.warn("No logo files found in Logos folder for favicon");
      return NextResponse.json({ url: '/logo.svg' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching favicon:', error);
    // Return default logo on error
    return NextResponse.json({ url: '/logo.svg' }, { status: 200 });
  }
} 