import { NextRequest, NextResponse } from "next/server"
import { stripe, PRODUCTS } from "@/lib/stripe/config"

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Please add your Stripe API keys to environment variables." },
      { status: 500 }
    )
  }

  try {
    const product = PRODUCTS.PR_FEST_PASS
    const origin = request.nextUrl.origin

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: product.price,
            product_data: {
              name: product.name,
              description: product.description,
              metadata: {
                product_key: "PR_FEST_PASS",
              },
            },
          },
          quantity: 1,
        },
      ],
      customer_creation: "always",
      success_url: `${origin}/puertoricanfest?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/puertoricanfest?checkout=canceled`,
      metadata: {
        product_key: "PR_FEST_PASS",
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Fest pass checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
