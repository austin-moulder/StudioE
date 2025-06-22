import Stripe from 'stripe'
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js'

// Server-side Stripe instance
export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
      typescript: true,
    })
  : null

// Client-side Stripe instance
let stripePromise: Promise<StripeJS | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      : Promise.resolve(null)
  }
  return stripePromise
}

// Product configurations
export const PRODUCTS = {
  STUDIO_EVALUATION: {
    name: 'Live Studio E-valuation',
    description: '30-minute consultation session with a Studio E specialist',
    price: 4900, // $49.00 in cents
    features: [
      'Work with a Studio E specialist',
      'Diagnose your dance goals',
      'Build a personalized plan'
    ]
  },
  SINGLE_INSTRUCTOR: {
    name: 'Single Instructor Experience',
    description: '1-hour introductory session with a professional instructor',
    price: 9900, // $99.00 in cents
    features: [
      'One private lesson with an instructor',
      'Focused teaching on your specific needs',
      'Personalized feedback and next steps'
    ]
  },
  MULTI_INSTRUCTOR: {
    name: 'Multi-instructor Experience',
    description: '5 one-hour sessions with different instructors',
    price: 44900, // $449.00 in cents
    features: [
      '5 private lessons with up to 5 instructors',
      'Experience diverse teaching styles',
      'Comprehensive progress tracking'
    ]
  }
} as const

export type ProductKey = keyof typeof PRODUCTS 