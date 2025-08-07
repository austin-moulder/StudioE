import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { plan, email, name, phone } = await request.json()

    if (!plan || !email) {
      return NextResponse.json(
        { error: 'Plan and email are required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseServerClient()

    // Create or update membership inquiry record
    const { data, error } = await supabase
      .from('membership_inquiries')
      .insert([
        {
          plan_type: plan,
          email: email,
          name: name || null,
          phone: phone || null,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save membership inquiry' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Membership inquiry submitted successfully', data },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}