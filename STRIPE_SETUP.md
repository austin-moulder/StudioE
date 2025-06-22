# Stripe Integration Setup Guide

## 🚀 What We've Built

The Stripe integration is now fully implemented with:

- ✅ **Real Stripe Checkout** - Users can purchase packages with credit cards
- ✅ **Webhook Handling** - Automatic payment status updates
- ✅ **Database Storage** - Payment history and session tracking
- ✅ **Security** - Row Level Security (RLS) policies
- ✅ **UI Integration** - Beautiful payment interface in dashboard

## 🔧 Setup Instructions

### 1. **Get Your Stripe API Keys**

1. Go to [stripe.com](https://stripe.com) and sign up/log in
2. Navigate to **Developers** → **API keys**
3. Copy these keys (start with test keys):
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)

### 2. **Add Environment Variables**

Add these to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. **Set Up Database Tables**

Run the SQL in `src/lib/supabase/setupPaymentTables.sql` in your Supabase SQL editor:

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire SQL file
4. Click **Run**

This creates:
- `payment_sessions` table
- `payments` table  
- `stripe_customers` table
- Proper indexes and RLS policies

### 4. **Set Up Webhooks (After Deployment)**

After deploying to Vercel:

1. In Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Use URL: `https://your-domain.vercel.app/api/stripe/webhooks`
4. Select these events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook secret and add to your environment variables

### 5. **Test the Integration**

1. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Use any future expiry date and any CVC

2. Test the flow:
   - Go to `/dashboard/payments`
   - Click "Buy Classes" tab
   - Select a package
   - Complete checkout with test card
   - Verify payment appears in history

## 💳 Available Products

The integration includes three packages:

1. **Live Studio E-valuation** - $49
   - 30-minute consultation session
   
2. **Single Instructor Experience** - $99
   - 1-hour introductory session
   
3. **Multi-instructor Experience** - $449 (Best Value)
   - 5 one-hour sessions with different instructors

## 🔒 Security Features

- **No card storage** - All payment data handled by Stripe
- **Webhook verification** - Prevents fraudulent requests
- **RLS policies** - Users can only see their own payments
- **Environment protection** - Sensitive keys in environment variables

## 🚨 Important Notes

- **Start with test mode** - Use test keys until ready for production
- **Webhook endpoint** - Must be set up after deployment for full functionality
- **Database setup** - Required before payments will work
- **HTTPS required** - Stripe requires HTTPS for webhooks (Vercel provides this)

## 🎯 Next Steps

1. Add your Stripe keys to environment variables
2. Run the database setup SQL
3. Test with Stripe test cards
4. Deploy and set up webhooks
5. Switch to live keys when ready for production

The payment system is now production-ready! 🎉 