import { NextRequest, NextResponse } from 'next/server';
import { createLesson, getLessonById, updateLesson, deleteLesson, getLessonsByStudentId, getLessonsByInstructorName } from '@/lib/supabase/lessonsUtils';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase/supabase';
import { createServerClient, getSupabaseServerClient } from '@/lib/supabase/server';

// GET handler - fetch lessons with optional filters
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const instructorId = searchParams.get('instructor_id');
    // Add more filters as needed

    // Start building query
    let query = supabase.from('lessons').select('*');

    if (instructorId) {
      query = query.eq('instructor_id', instructorId);
    }

    // Order results by lesson date, newest first
    query = query.order('lesson_start', { ascending: false });

    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error('Error fetching lessons:', error);
      return NextResponse.json(
        { error: 'Failed to fetch lessons' },
        { status: 500 }
      );
    }

    return NextResponse.json({ lessons: data }, { status: 200 });
  } catch (error) {
    console.error('Unhandled error in lessons API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// POST handler - create a new lesson
export async function POST(request: NextRequest) {
  try {
    // Remove server-side auth check
    // Parse the request body
    const {
      instructor_id, // now required from client
      student_id, // optional
      student_name,
      instructor_name,
      first_time_match,
      lesson_start,
      invoiced_date,
      instructor_pay_rate,
      num_hours,
      instructor_pay,
      invoice_notes,
      homework_notes
    } = await request.json();
    
    // Basic validation
    if (!student_name || !instructor_name || !lesson_start || !invoiced_date || !instructor_id) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }
    
    // Create lesson invoice in database
    const { data, error } = await supabase
      .from('lessons')
      .insert([
        {
          student_id: student_id || null,
          instructor_id,
          instructor_name,
          student_name,
          first_time_match,
          lesson_start,
          invoiced_date,
          instructor_pay_rate,
          num_hours,
          instructor_pay,
          invoice_notes,
          homework_notes,
          status: 'pending' // Default status
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating lesson invoice:', error);
      return NextResponse.json(
        { error: 'Failed to create lesson invoice' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data }, { status: 201 });
    
  } catch (error) {
    console.error('Unhandled error in lessons API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
}

// PUT handler - update an existing lesson
export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user has admin privileges
    const { data: userData } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();
      
    if (!userData?.is_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id, ...updates } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
    }
    
    // Recalculate instructor_pay if pay rate or hours changed
    if ((updates.instructor_pay_rate || updates.num_hours) && !updates.instructor_pay) {
      const currentLesson = await getLessonById(id);
      const payRate = updates.instructor_pay_rate || currentLesson.instructor_pay_rate;
      const hours = updates.num_hours || currentLesson.num_hours;
      updates.instructor_pay = payRate * hours;
    }
    
    const updatedLesson = await updateLesson(id, updates);
    return NextResponse.json(updatedLesson);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE handler - delete a lesson
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user has admin privileges
    const { data: userData } = await supabase
      .from('user_profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();
      
    if (!userData?.is_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
    }
    
    await deleteLesson(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}