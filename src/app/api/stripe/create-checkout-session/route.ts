import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRODUCTS, ProductKey } from '@/lib/stripe/config'
import { supabase } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  // Check if Stripe is configured
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Please add your Stripe API keys to environment variables.' },
      { status: 500 }
    )
  }

  try {
    const { productKey, userId, userEmail } = await request.json()

    if (!productKey || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!(productKey in PRODUCTS)) {
      return NextResponse.json(
        { error: 'Invalid product' },
        { status: 400 }
      )
    }

    const product = PRODUCTS[productKey as ProductKey]

    // Create or retrieve Stripe customer
    let customer
    try {
      const customers = await stripe.customers.list({
        email: userEmail,
        limit: 1
      })
      
      if (customers.data.length > 0) {
        customer = customers.data[0]
      } else {
        customer = await stripe.customers.create({
          email: userEmail,
          metadata: {
            supabase_user_id: userId
          }
        })
      }
    } catch (error) {
      console.error('Error creating/retrieving customer:', error)
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      )
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/dashboard/payments?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${request.nextUrl.origin}/dashboard/payments?canceled=true`,
      metadata: {
        product_key: productKey,
        user_id: userId,
      },
    })

    // Store the session in our database for tracking
    try {
      await supabase
        .from('payment_sessions')
        .insert({
          session_id: session.id,
          user_id: userId,
          product_key: productKey,
          amount: product.price,
          status: 'pending',
          created_at: new Date().toISOString()
        })
    } catch (dbError) {
      console.error('Error storing session in database:', dbError)
      // Continue anyway - the payment can still work
    }

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
} 