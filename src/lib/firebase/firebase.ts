// This file only exists to avoid breaking imports while transitioning to Supabase
// All Firebase functionality has been replaced with Supabase

// Logging a message if something tries to use this file
console.warn("Firebase has been replaced with Supabase in this application");

// Export empty objects to prevent imports from breaking
export const auth = {};
export const db = {};  
export const storage = {};
export const GoogleAuthProvider = function() { return {}; };
export const app = {};

// Export empty functions for Firebase storage functions
export const getDownloadURL = async () => '';
export const ref = () => ({});
export const uploadBytes = async () => ({});
export const listAll = async () => ({ items: [], prefixes: [] });
export const deleteObject = async () => {};
