# Authentication Troubleshooting Guide

## Error: "Authentication error: invalid request: both auth code and code verifier should be non-empty"

This error occurs when the PKCE (Proof Key for Code Exchange) flow loses its verification code during the authentication process. Here are the steps to resolve this issue:

### 1. Update Supabase Project Settings

In your Supabase dashboard:

1. Go to your project → Authentication → URL Configuration
2. Ensure "Site URL" is set to `https://www.joinstudioe.com`
3. Add these Redirect URLs (both are needed):
   - `https://www.joinstudioe.com/auth/callback`
   - `https://www.joinstudioe.com`
4. Save changes

### 2. Update Google OAuth Settings in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Find your OAuth 2.0 Client ID used for Studio E
4. Under "Authorized JavaScript origins", add:
   - `https://www.joinstudioe.com`
5. Under "Authorized redirect URIs", ensure ALL these URLs are added:
   - `https://www.joinstudioe.com/auth/callback`
   - `https://[your-project-id].supabase.co/auth/v1/callback`
   - `https://[your-project-ref].supabase.co/auth/v1/callback`
6. Save changes

### 3. Modify the Auth Flow in the Code

Update `src/lib/auth/auth-utils.ts` to use a specific flowType:

```typescript
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `https://www.joinstudioe.com/auth/callback`,
      skipBrowserRedirect: false,
      flowType: 'implicit', // Try this if PKCE isn't working
      queryParams: {
        prompt: 'select_account',
        access_type: 'offline'
      }
    }
  });
}
```

### 4. Clear Browser Cache and Storage

Ask users to:

1. Clear browser cache and cookies
2. Clear localStorage and sessionStorage:
   - Open DevTools (F12 or Command+Option+I)
   - Go to Application → Storage → Clear Site Data
3. Try in an incognito/private window

### 5. Verify Your Auth Callback Processing

In `src/app/auth/callback/page.tsx`, ensure the code properly handles the OAuth response by:

1. Not redirecting mid-auth
2. Properly exchanging the code for a session
3. Only redirecting after a session is established

### 6. Test Without Customizations

If still having issues, try testing with the default Supabase auth logic:

```typescript
// In a test page
const handleSignIn = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `https://www.joinstudioe.com/auth/callback`
    }
  });
};
```

### 7. Additional Troubleshooting

- Check browser console for any additional errors
- Verify that no extensions are blocking cookies or redirects
- Ensure time zone is correctly set on user's device (for token validation)
- Verify your Supabase JWT secret is correctly configured

For more troubleshooting:
- [Supabase Authentication Documentation](https://supabase.com/docs/guides/auth)
- [OAuth 2.0 PKCE Flow Explanation](https://supabase.com/docs/guides/auth/pkce-flow)
- [Google OAuth Setup Guide](https://supabase.com/docs/guides/auth/social-login/auth-google)

## Contact Support

If you continue experiencing issues after trying these solutions, please contact the Studio E development team with:
1. Browser and version info
2. Steps to reproduce the issue
3. Any console errors (screenshots help)
4. Whether the issue occurs in incognito mode 