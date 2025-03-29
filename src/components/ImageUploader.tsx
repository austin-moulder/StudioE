"use client";

import { useState, useRef } from "react";
import { uploadImage } from "@/lib/firebase/firebaseUtils";
import { useAuth } from "@/lib/hooks/useAuth";

interface ImageUploaderProps {
  folder?: string;
  onUploadComplete?: (url: string) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

export default function ImageUploader({
  folder = "images",
  onUploadComplete,
  acceptedFileTypes = "image/jpeg, image/png, image/webp",
  maxFileSizeMB = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`File type not supported. Please upload ${acceptedFileTypes.replace(/,/g, " or ")}`);
      return;
    }

    // Validate file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum file size is ${maxFileSizeMB}MB`);
      return;
    }

    // Reset error state
    setError(null);

    // Create a preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload
    setUploading(true);
    setProgress(0);

    try {
      // Generate a unique filename with timestamp
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${file.name}`;
      const path = user ? `${folder}/${user.uid}/${fileName}` : `${folder}/public/${fileName}`;

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(prev + 10, 90);
          return next;
        });
      }, 200);

      // Upload the file
      const downloadURL = await uploadImage(file, path);
      
      // Upload complete
      clearInterval(progressInterval);
      setProgress(100);
      setUploading(false);

      // Trigger the callback
      if (onUploadComplete) {
        onUploadComplete(downloadURL);
      }
    } catch (err) {
      setUploading(false);
      setError("Upload failed. Please try again.");
      console.error("Upload error:", err);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
          uploading ? "opacity-50 pointer-events-none" : ""
        } ${error ? "border-red-500" : "border-gray-300"}`}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
        
        {previewUrl ? (
          <div className="relative w-full aspect-video flex justify-center">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-64 object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="py-4">
            <svg 
              className="w-10 h-10 mx-auto text-gray-400" 
              fill="none" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">
              {acceptedFileTypes.split(",").map(type => type.split("/")[1]).join(", ")} up to {maxFileSizeMB}MB
            </p>
          </div>
        )}

        {uploading && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Uploading... {progress}%</p>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
} 