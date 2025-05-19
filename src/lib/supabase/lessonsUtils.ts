import { supabase } from './supabase';

export type Lesson = {
  id: string;
  student_id: string;
  student_name: string;
  instructor_name: string;
  first_time_match: boolean;
  lesson_start: string;
  invoiced_date: string | null;
  instructor_pay_rate: number;
  num_hours: number;
  instructor_pay: number;
  invoice_notes: string | null;
  homework_notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function createLesson(lesson: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('lessons')
    .insert(lesson)
    .select()
    .single();

  if (error) {
    console.error('Error creating lesson:', error);
    throw error;
  }

  return data as Lesson;
}

export async function getLessonById(id: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error getting lesson:', error);
    throw error;
  }

  return data as Lesson;
}

export async function updateLesson(id: string, updates: Partial<Omit<Lesson, 'id' | 'created_at' | 'updated_at'>>) {
  const { data, error } = await supabase
    .from('lessons')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating lesson:', error);
    throw error;
  }

  return data as Lesson;
}

export async function deleteLesson(id: string) {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting lesson:', error);
    throw error;
  }

  return true;
}

export async function getLessonsByStudentId(studentId: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('student_id', studentId)
    .order('lesson_start', { ascending: false });

  if (error) {
    console.error('Error getting lessons by student:', error);
    throw error;
  }

  return data as Lesson[];
}

export async function getLessonsByInstructorName(instructorName: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('instructor_name', instructorName)
    .order('lesson_start', { ascending: false });

  if (error) {
    console.error('Error getting lessons by instructor:', error);
    throw error;
  }

  return data as Lesson[];
}

export async function getFirstTimeLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('first_time_match', true)
    .order('lesson_start', { ascending: false });

  if (error) {
    console.error('Error getting first time lessons:', error);
    throw error;
  }

  return data as Lesson[];
}

export async function getUninvoicedLessons() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .is('invoiced_date', null)
    .order('lesson_start', { ascending: false });

  if (error) {
    console.error('Error getting uninvoiced lessons:', error);
    throw error;
  }

  return data as Lesson[];
} 