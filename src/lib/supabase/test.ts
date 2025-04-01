import { supabase } from './supabase';

export async function testEventTable() {
  const { data, error } = await supabase
    .from('EVENT')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Error fetching events:', error);
    return null;
  }

  return data;
} 