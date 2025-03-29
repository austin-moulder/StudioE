"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/ImageUploader";
import { getImagesFromFolder, deleteImage } from "@/lib/firebase/firebaseUtils";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

export default function PhotoManagementPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState("images");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const folders = [
    { name: "Header Images", value: "headers" },
    { name: "Instructor Photos", value: "instructors" },
    { name: "Event Photos", value: "events" },
    { name: "Gallery", value: "gallery" }
  ];

  useEffect(() => {
    const loadImages = async () => {
      if (!user) return;
      setLoading(true);
      
      try {
        const folderPath = `${selectedFolder}/${user.uid}`;
        const imageUrls = await getImagesFromFolder(folderPath);
        setImages(imageUrls);
      } catch (error) {
        console.error("Error loading images:", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [selectedFolder, user]);

  const handleUploadComplete = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const handleDelete = async (url: string) => {
    // Extract the path from the URL
    // This assumes your Firebase Storage URLs follow a pattern
    // You may need to adjust this based on your actual URL structure
    try {
      const pathRegex = /firebase.+\/o\/(.+?)\?/;
      const match = url.match(pathRegex);
      
      if (match && match[1]) {
        const path = decodeURIComponent(match[1]);
        await deleteImage(path);
        setImages((prev) => prev.filter((img) => img !== url));
      } else {
        console.error("Could not extract path from URL", url);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Image URL copied to clipboard!");
  };

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Photo Management</h1>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-yellow-700">
            Please <Link href="/" className="underline">sign in</Link> to manage photos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Photo Management</h1>
      
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Folder
        </label>
        <select
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          {folders.map((folder) => (
            <option key={folder.value} value={folder.value}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Upload New Photo</h2>
        <ImageUploader
          folder={selectedFolder}
          onUploadComplete={handleUploadComplete}
        />
      </div>

      <div>
        <h2 className="text-xl font-medium mb-4">Your Photos</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No images found in this folder.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((imageUrl, index) => (
              <div key={index} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="aspect-video relative">
                  <img 
                    src={imageUrl} 
                    alt={`Uploaded image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(imageUrl)}
                      className="flex-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(imageUrl)}
                      className="flex-1 text-xs bg-red-100 hover:bg-red-200 text-red-800 py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 