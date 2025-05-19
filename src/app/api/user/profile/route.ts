import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@/lib/supabase/supabase';

// GET /api/user/profile - Get the current user's profile
export async function GET(request: NextRequest) {
  try {
    // Initialize Supabase client with auth context
    const supabaseServerClient = createRouteHandlerClient({ cookies });
    
    // Get the current logged in user
    const { data: { user } } = await supabaseServerClient.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' }, 
        { status: 401 }
      );
    }
    
    // Fetch the user's profile
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return NextResponse.json(
        { error: 'Failed to fetch user profile' }, 
        { status: 500 }
      );
    }
    
    if (!profile) {
      return NextResponse.json(
        { error: 'User profile not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(profile, { status: 200 });
    
  } catch (error) {
    console.error('Unhandled error in user profile API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 