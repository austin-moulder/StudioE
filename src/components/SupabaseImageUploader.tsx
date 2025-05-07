"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

interface SupabaseImageUploaderProps {
  bucket?: string;
  folder?: string;
  onUploadComplete: (url: string) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

export default function SupabaseImageUploader({
  bucket = "events",
  folder = "images",
  onUploadComplete,
  acceptedFileTypes = "image/jpeg, image/png, image/jpg, image/webp",
  maxFileSizeMB = 5,
}: SupabaseImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedFileTypes.split(", ").includes(file.type)) {
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
    setProgress(10); // Initial progress

    try {
      // Generate a unique filename with timestamp
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        throw error;
      }

      setProgress(90);

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      console.log('Image upload successful:', {
        bucket,
        filePath,
        publicUrl: urlData.publicUrl
      });

      setProgress(100);

      // Trigger the callback with the public URL
      onUploadComplete(urlData.publicUrl);
      
      toast.success("Image uploaded successfully!");
      setUploading(false);
      
    } catch (err: any) {
      setUploading(false);
      setError(err.message || "Upload failed. Please try again.");
      toast.error("Upload failed", {
        description: err.message || "Please try again."
      });
      console.error("Upload error:", err);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onUploadComplete(""); // Clear the URL
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
            {!uploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
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