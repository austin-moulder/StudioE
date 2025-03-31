"use client";

// Import from mock implementation
import { auth, db, storage } from "./firebase";
import { User } from "firebase/auth";

// Auth functions - using mock implementations
export const logoutUser = async () => {
  console.info("Firebase auth is disabled - using Supabase instead");
  return Promise.resolve();
};

export const signInWithGoogle = async () => {
  console.info("Firebase auth is disabled - using Supabase instead");
  return null;
};

// Firestore functions - using mock implementations 
export const addDocument = async (collectionName: string, data: any) => {
  console.info(`Mock: Adding document to ${collectionName}`, data);
  return { id: 'mock-doc-id' };
};

export const getDocuments = async (collectionName: string) => {
  console.info(`Mock: Getting documents from ${collectionName}`);
  return [];
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  console.info(`Mock: Updating document ${id} in ${collectionName}`, data);
  return Promise.resolve();
};

export const deleteDocument = async (collectionName: string, id: string) => {
  console.info(`Mock: Deleting document ${id} from ${collectionName}`);
  return Promise.resolve();
};

// Storage functions - using mock implementations
export const uploadFile = async (file: File, path: string) => {
  console.info(`Mock: Uploading file to ${path}`);
  return 'https://example.com/mock-file.jpg';
};

// Upload an image to Firebase Storage
export const uploadImage = async (
  file: File,
  path: string
): Promise<string> => {
  console.info(`Mock: Uploading image to ${path}`);
  return 'https://example.com/mock-image.jpg';
};

// Get all images from a specific folder
export const getImagesFromFolder = async (folderPath: string): Promise<string[]> => {
  console.info(`Mock: Getting images from folder ${folderPath}`);
  // Return empty array
  return [];
};

// Delete an image from Firebase Storage
export const deleteImage = async (path: string): Promise<void> => {
  console.info(`Mock: Deleting image from ${path}`);
  return Promise.resolve();
};
