import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rnlubphxootnmsurnuvr.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubHVicGh4b290bm1zdXJudXZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzM3ODY1MiwiZXhwIjoyMDU4OTU0NjUyfQ.yT3RLcPLgJGzdphL85EpTBGsi-Sw668z5i8Df1g2uDo'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function showAllData() {
  // Check EVENT table
  console.log('\nEVENT table data:')
  const { data: eventData, error: eventError } = await supabase
    .from('EVENT')
    .select('*')
  
  if (eventError) {
    console.error('Error fetching EVENT data:', eventError.message)
  } else {
    console.log('EVENT rows:', eventData)
    console.log('Total EVENT rows:', eventData.length)
  }

  // Check INSTRUCTOR table
  console.log('\nINSTRUCTOR table data:')
  const { data: instructorData, error: instructorError } = await supabase
    .from('INSTRUCTOR')
    .select('*')
  
  if (instructorError) {
    console.error('Error fetching INSTRUCTOR data:', instructorError.message)
  } else {
    console.log('INSTRUCTOR rows:', instructorData)
    console.log('Total INSTRUCTOR rows:', instructorData.length)
  }

  // Check INSTRUCTOR_PROFILE table
  console.log('\nINSTRUCTOR_PROFILE table data:')
  const { data: profileData, error: profileError } = await supabase
    .from('INSTRUCTOR_PROFILE')
    .select('*')
  
  if (profileError) {
    console.error('Error fetching INSTRUCTOR_PROFILE data:', profileError.message)
  } else {
    console.log('INSTRUCTOR_PROFILE rows:', profileData)
    console.log('Total INSTRUCTOR_PROFILE rows:', profileData.length)
  }
}

// Run the test
showAllData() 