# Setting Up Google OAuth in Supabase

For the authentication redirects to work properly, you need to ensure that Google OAuth is correctly configured in Supabase. Here's a complete guide:

## 1. Verify Redirect URLs in Supabase

1. Log in to your [Supabase Dashboard](https://app.supabase.io/)
2. Select your Studio E project
3. Go to Authentication → Providers → Google
4. Ensure the following settings are correct:
   - Google client ID and secret are correctly entered
   - **Redirect URL**: Make sure it is set to `https://www.joinstudioe.com/auth/callback`
   - The provider is enabled (toggle switch is ON)

## 2. Verify Redirect URLs in Google Cloud Console

1. Log in to [Google Cloud Console](https://console.cloud.google.com/)
2. Go to APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID used for Studio E
4. Verify that the following URLs are in the Authorized Redirect URIs:
   - `https://www.joinstudioe.com/auth/callback`
   - `https://<your-supabase-project-ref>.supabase.co/auth/v1/callback`

## 3. Check Site URL in Supabase Settings

1. In Supabase Dashboard, go to Authentication → URL Configuration
2. Ensure Site URL is set to `https://www.joinstudioe.com`
3. Ensure Redirect URLs whitelist includes `https://www.joinstudioe.com/auth/callback*` 
   (note the wildcard `*` at the end to allow for query parameters)

## 4. Clearing Browser Data

If authentication still fails after updating configurations:

1. Clear browser cache and cookies for both `localhost` and `joinstudioe.com`
2. Try using an incognito/private browser window

## 5. Testing Authentication

1. Visit the authentication diagnostic page we created: https://www.joinstudioe.com/test-auth
2. Use the "Test Google Sign In" button to test the authentication flow directly
3. Check the logs displayed on this page for any errors or issues

---

With these settings properly configured, the authentication should work correctly without redirecting through localhost. 