import { supabase } from './supabase';
import { 
  User, 
  Session, 
  AuthError, 
  AuthResponse, 
  Provider,
  OAuthResponse 
} from '@supabase/supabase-js';

/**
 * Authentication utilities
 */

// Sign up with email and password
export const signUpWithEmail = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  return await supabase.auth.signUp({
    email,
    password
  });
};

// Sign in with email and password
export const signInWithEmail = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

// Sign in with OAuth provider (Google, etc.)
export const signInWithOAuth = async (provider: Provider): Promise<OAuthResponse> => {
  // Always use the production URL for redirects
  const PRODUCTION_URL = 'https://www.joinstudioe.com';
  
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${PRODUCTION_URL}/auth/callback`
    }
  });
};

// Sign in with Google specifically (for easier migration from Firebase)
export const signInWithGoogle = async (): Promise<OAuthResponse> => {
  try {
    return await signInWithOAuth('google');
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Magic link sign in (alternative when OAuth is not available)
export const signInWithMagicLink = async (email: string): Promise<AuthResponse> => {
  try {
    // Always redirect to the production URL for magic links
    const redirectUrl = `https://www.joinstudioe.com/auth/callback`;
      
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
        shouldCreateUser: true
      }
    });
  } catch (error) {
    console.error("Error signing in with magic link:", error);
    throw error;
  }
};

// Sign out
export const signOut = async (): Promise<{ error: AuthError | null }> => {
  return await supabase.auth.signOut();
};

// Get current session
export const getCurrentSession = async (): Promise<Session | null> => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

/**
 * Database operations utilities
 */

// Generic fetch function
export const fetchData = async (
  table: string, 
  options: {
    columns?: string,
    filters?: { column: string; value: any; operator?: string }[],
    limit?: number,
    orderBy?: { column: string; ascending?: boolean }
  } = {}
) => {
  // Start the query
  let query = supabase.from(table).select(options.columns || '*');

  // Apply filters if any
  if (options.filters && options.filters.length > 0) {
    options.filters.forEach(filter => {
      const { column, value, operator = 'eq' } = filter;
      if (operator === 'eq') {
        query = query.eq(column, value);
      } else if (operator === 'gt') {
        query = query.gt(column, value);
      } else if (operator === 'lt') {
        query = query.lt(column, value);
      } else if (operator === 'gte') {
        query = query.gte(column, value);
      } else if (operator === 'lte') {
        query = query.lte(column, value);
      } else if (operator === 'like') {
        query = query.like(column, `%${value}%`);
      }
    });
  }

  // Apply ordering if needed
  if (options.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true });
  }

  // Apply limit if needed
  if (options.limit) {
    query = query.limit(options.limit);
  }

  // Execute the query
  const { data, error } = await query;

  if (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

  return data;
};

// Insert data
export const insertData = async (
  table: string, 
  data: any | any[]
) => {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();

  if (error) {
    console.error('Error inserting data:', error);
    throw error;
  }

  return result;
};

// Update data
export const updateData = async (
  table: string, 
  data: any, 
  conditions: { column: string; value: any }[]
) => {
  let query = supabase.from(table).update(data);

  // Apply conditions
  conditions.forEach(condition => {
    query = query.eq(condition.column, condition.value);
  });

  const { data: result, error } = await query.select();

  if (error) {
    console.error('Error updating data:', error);
    throw error;
  }

  return result;
};

// Delete data
export const deleteData = async (
  table: string, 
  conditions: { column: string; value: any }[]
) => {
  let query = supabase.from(table).delete();

  // Apply conditions
  conditions.forEach(condition => {
    query = query.eq(condition.column, condition.value);
  });

  const { error } = await query;

  if (error) {
    console.error('Error deleting data:', error);
    throw error;
  }

  return true;
};

/**
 * Storage operations utilities
 */

// Upload file to storage
export const uploadFile = async (
  bucket: string,
  path: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  return data;
};

// Download file from storage
export const getFileUrl = (
  bucket: string,
  path: string
) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
};

// Delete file from storage
export const deleteFile = async (
  bucket: string,
  path: string
) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Error deleting file:', error);
    throw error;
  }

  return true;
}; 