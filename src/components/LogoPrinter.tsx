"use client";

import { useState, useEffect } from "react";
import { ref, listAll } from "firebase/storage";
import { storage } from "@/lib/firebase/firebase";

export default function LogoPrinter() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listFiles = async () => {
      try {
        console.log("Listing all files in Firebase Storage...");
        
        // List root files
        const rootRef = ref(storage);
        const rootResult = await listAll(rootRef);
        
        console.log("Root folders:", rootResult.prefixes.map(folder => folder.fullPath));
        console.log("Root files:", rootResult.items.map(item => item.fullPath));
        
        // List files in Logos folder
        if (rootResult.prefixes.some(folder => folder.fullPath === "Logos")) {
          const logosRef = ref(storage, "Logos");
          const logosResult = await listAll(logosRef);
          
          const fileList = logosResult.items.map(item => item.fullPath);
          console.log("Files in Logos folder:", fileList);
          setFiles(fileList);
        }
        
        // List files in Instructors folder
        if (rootResult.prefixes.some(folder => folder.fullPath === "Instructors")) {
          const instructorsRef = ref(storage, "Instructors");
          const instructorsResult = await listAll(instructorsRef);
          
          console.log("Files in Instructors folder:", instructorsResult.items.map(item => item.fullPath));
        }
      } catch (error) {
        console.error("Error listing files:", error);
      } finally {
        setLoading(false);
      }
    };

    listFiles();
  }, []);

  if (loading) {
    return <div>Loading file list...</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Files in Firebase Storage</h2>
      
      {files.length === 0 ? (
        <p>No files found in storage.</p>
      ) : (
        <ul className="list-disc pl-5">
          {files.map((file, index) => (
            <li key={index} className="mb-1">{file}</li>
          ))}
        </ul>
      )}
    </div>
  );
} 