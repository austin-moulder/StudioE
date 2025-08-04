import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json()

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : firstName || 'Unknown'

    // Get Supabase client
    const supabase = getSupabaseServerClient()

    // Save to newsletter_signups table
    const { data, error } = await supabase
      .from('newsletter_signups')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phone
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save signup information' },
        { status: 500 }
      )
    }

    console.log('Chicago Guide Form Submission saved:', data)

    // Here you would typically also:
    // 1. Send email with the guide
    // 2. Add to email marketing list
    // 3. Send confirmation email
    
    return NextResponse.json({
      success: true,
      message: 'Guide and free classes info sent successfully!',
      data: data
    })

  } catch (error) {
    console.error('Error processing Chicago guide submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 