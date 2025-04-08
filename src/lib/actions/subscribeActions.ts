'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase/client'; // Use the client instance for public inserts

// Define the schema for validation
const SubscribeSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }).trim(),
});

export type SubscribeState = {
  message?: string | null;
  errors?: {
    email?: string[];
  };
  success: boolean;
};

export async function addSubscriber(prevState: SubscribeState, formData: FormData): Promise<SubscribeState> {
  // Validate form fields
  const validatedFields = SubscribeSchema.safeParse({
    email: formData.get('email'),
  });

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Subscription failed. Please check your email address.',
      success: false,
    };
  }

  const { email } = validatedFields.data;

  try {
    const { error } = await supabase
      .from('blog_subscribers')
      .insert({ email: email });

    if (error) {
      console.error('Supabase error:', error);
      // Handle potential duplicate email error (unique constraint)
      if (error.code === '23505') { // PostgreSQL unique violation code
        return {
          message: 'This email is already subscribed.',
          success: false,
        };
      }
      return {
        message: 'Database Error: Failed to subscribe.',
        success: false,
      };
    }

    // Success
    return { message: 'Thank you for subscribing!', success: true };

  } catch (e) {
    console.error('Subscription error:', e);
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
    };
  }
} 