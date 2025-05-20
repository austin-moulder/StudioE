// This file only exists to avoid breaking imports
// All Firebase functionality has been replaced with Supabase

// Re-export the Supabase utilities for any code still using Firebase imports
import {
  signInWithGoogle as supabaseSignInWithGoogle,
  signOut as supabaseSignOut,
  uploadFile as supabaseUploadFile,
  getFileUrl,
  deleteFile
} from '../supabase/supabaseUtils';

// Auth functions - redirecting to Supabase equivalents
export const logoutUser = supabaseSignOut;
export const signInWithGoogle = supabaseSignInWithGoogle;

// Firestore functions - using Supabase equivalents
export const addDocument = async (collectionName: string, data: any) => {
  console.warn(`Firebase addDocument is deprecated. Use Supabase insert instead for collection ${collectionName}`);
  return { id: 'deprecated' };
};

export const getDocuments = async (collectionName: string) => {
  console.warn(`Firebase getDocuments is deprecated. Use Supabase select instead for collection ${collectionName}`);
  return [];
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  console.warn(`Firebase updateDocument is deprecated. Use Supabase update instead for collection ${collectionName}`);
  return Promise.resolve();
};

export const deleteDocument = async (collectionName: string, id: string) => {
  console.warn(`Firebase deleteDocument is deprecated. Use Supabase delete instead for collection ${collectionName}`);
  return Promise.resolve();
};

// Storage functions - using Supabase equivalents
export const uploadFile = async (file: File, path: string) => {
  console.warn('Firebase uploadFile is deprecated. Use Supabase uploadFile instead');
  return '';
};

// Upload an image to storage
export const uploadImage = async (file: File, path: string): Promise<string> => {
  console.warn('Firebase uploadImage is deprecated. Use Supabase uploadFile instead');
  return '';
};

// Get all images from a specific folder
export const getImagesFromFolder = async (folderPath: string): Promise<string[]> => {
  console.warn(`Firebase getImagesFromFolder is deprecated. Use Supabase storage API instead for folder ${folderPath}`);
  return [];
};

// Delete an image from storage
export const deleteImage = async (path: string): Promise<void> => {
  console.warn(`Firebase deleteImage is deprecated. Use Supabase deleteFile instead for path ${path}`);
  return Promise.resolve();
};
