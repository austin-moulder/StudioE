// This file provides MOCK implementations of Firebase objects
// We're fully migrated to Supabase, but keeping this file to avoid breaking imports

// Create empty provider
const GoogleAuthProvider = function() {
  return {};
};

// Mock Firebase Auth
const auth = {
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Return null user immediately without attempting to connect
    setTimeout(() => callback(null), 0);
    // Return unsubscribe function
    return () => {};
  },
  signInWithPopup: async () => {
    console.info("Firebase auth is disabled - using Supabase instead");
    return { user: null };
  },
  signOut: async () => {
    console.info("Firebase auth is disabled - using Supabase instead");
    return Promise.resolve();
  }
};

// Mock Firestore
const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => null }),
      set: async () => Promise.resolve(),
      update: async () => Promise.resolve(),
      delete: async () => Promise.resolve(),
    }),
    add: async () => Promise.resolve({ id: 'mock-id' }),
    where: () => ({
      get: async () => ({ empty: true, docs: [] }),
    }),
  }),
};

// Mock Storage
const storage = {
  ref: (path: string = '') => ({
    put: async () => Promise.resolve({
      ref: {
        getDownloadURL: async () => Promise.resolve('https://example.com/mock-image.jpg'),
      },
    }),
    delete: async () => Promise.resolve(),
    listAll: async () => Promise.resolve({ items: [], prefixes: [] }),
    child: (name: string) => storage.ref(`${path}/${name}`),
    getDownloadURL: async () => Promise.resolve('https://example.com/mock-image.jpg'),
  }),
};

// Mock app
const app = {};

// Export all the mocks
export { app, auth, db, storage, GoogleAuthProvider };

// Export Firebase functions as mocks
export const getDownloadURL = async () => 'https://example.com/mock-image.jpg';
export const ref = (storage: any, path: string) => storage.ref(path);
export const uploadBytes = async () => Promise.resolve({ ref: storage.ref('') });
export const listAll = async () => Promise.resolve({ items: [], prefixes: [] });
export const deleteObject = async () => Promise.resolve();
