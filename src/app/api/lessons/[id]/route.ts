import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/supabase';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// PATCH /api/lessons/[id] - Update a lesson
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const id = params.id;
    
    // Parse the request body
    const updates = await request.json();
    
    // Basic validation
    if (!id) {
      return NextResponse.json(
        { error: 'Missing lesson ID' }, 
        { status: 400 }
      );
    }
    
    // Check user permissions
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('account_type')
      .eq('id', user.id)
      .single();
    
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' }, 
        { status: 404 }
      );
    }
    
    // Check if the user is authorized to update this lesson
    const { data: lesson } = await supabase
      .from('lessons')
      .select('instructor_id')
      .eq('id', id)
      .single();
    
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' }, 
        { status: 404 }
      );
    }
    
    // Only the instructor who created the lesson or an admin can update it
    const isInstructor = lesson.instructor_id === user.id;
    const isAdmin = userProfile.account_type === 'admin';
    
    if (!isInstructor && !isAdmin) {
      return NextResponse.json(
        { error: 'You do not have permission to update this lesson' }, 
        { status: 403 }
      );
    }
    
    // Update the lesson
    const { data, error } = await supabase
      .from('lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating lesson:', error);
      return NextResponse.json(
        { error: 'Failed to update lesson' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    console.error('Unhandled error in lessons API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

// GET /api/lessons/[id] - Fetch a specific lesson
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const id = params.id;
    
    // Basic validation
    if (!id) {
      return NextResponse.json(
        { error: 'Missing lesson ID' }, 
        { status: 400 }
      );
    }
    
    // Check user permissions
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('account_type')
      .eq('id', user.id)
      .single();
    
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' }, 
        { status: 404 }
      );
    }
    
    // Build query to fetch the lesson
    let query = supabase
      .from('lessons')
      .select('*')
      .eq('id', id);
    
    // Apply role-based filters
    if (userProfile.account_type === 'instructor') {
      query = query.eq('instructor_id', user.id);
    } else if (userProfile.account_type === 'student') {
      query = query.eq('student_id', user.id);
    }
    // If admin, no additional filters needed
    
    // Execute query
    const { data, error } = await query.single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Lesson not found or you do not have access' }, 
          { status: 404 }
        );
      }
      
      console.error('Error fetching lesson:', error);
      return NextResponse.json(
        { error: 'Failed to fetch lesson' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, { status: 200 });
    
  } catch (error) {
    console.error('Unhandled error in lessons API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

// DELETE /api/lessons/[id] - Delete a lesson
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const id = params.id;
    
    // Basic validation
    if (!id) {
      return NextResponse.json(
        { error: 'Missing lesson ID' }, 
        { status: 400 }
      );
    }
    
    // Check user permissions
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('account_type')
      .eq('id', user.id)
      .single();
    
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' }, 
        { status: 404 }
      );
    }
    
    // Only admins can delete lessons
    if (userProfile.account_type !== 'admin') {
      return NextResponse.json(
        { error: 'Only administrators can delete lessons' }, 
        { status: 403 }
      );
    }
    
    // Delete the lesson
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting lesson:', error);
      return NextResponse.json(
        { error: 'Failed to delete lesson' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'Lesson deleted successfully' }, 
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Unhandled error in lessons API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 