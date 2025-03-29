"use client";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState("Podcast");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();

  const folders = [
    { name: "Podcast", value: "Podcast" },
    { name: "Logos", value: "Logos" },
    { name: "Instructors", value: "Instructors" },
    { name: "Gallery", value: "Gallery" },
    { name: "Events", value: "Events" }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    if (!user) {
      setError("You must be logged in to upload files");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create a storage reference 
      const filename = file.name.toLowerCase().replace(/\s+/g, "_");
      const storageRef = ref(storage, `${folder}/${filename}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      setSuccess(`File uploaded successfully! URL: ${downloadURL}`);
      setFile(null);
      
      // Reset the file input
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(`Error uploading file: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Upload Files</h1>
        <p>You must be logged in to access this page.</p>
        <Link href="/" className="text-primary hover:underline mt-4 block">
          Go back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Files to Firebase Storage</h1>
      
      <div className="mb-8">
        <Link href="/debug" className="text-primary hover:underline">
          View all files in storage
        </Link>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="folder" className="block text-sm font-medium mb-1">
            Select Folder
          </label>
          <select
            id="folder"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {folders.map((f) => (
              <option key={f.value} value={f.value}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="fileInput" className="block text-sm font-medium mb-1">
            Select File
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-500">
              Selected file: {file.name} ({Math.round(file.size / 1024)} KB)
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading || !file}
          className="bg-[#EC407A] text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
        
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
      </form>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Special File Names</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Podcast Cover:</strong> Upload a file named 
            <code className="mx-1 px-1 py-0.5 bg-gray-100 rounded">podcast_cover_main.jpg</code> 
            to the Podcast folder to set it as the main podcast cover.
          </li>
          <li>
            <strong>Logo:</strong> Upload a file to the Logos/main folder or with "main" in the filename 
            to set it as the main logo.
          </li>
        </ul>
      </div>
    </div>
  );
} 