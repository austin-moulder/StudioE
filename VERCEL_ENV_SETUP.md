# Setting Up Environment Variables in Vercel

To properly configure your StudioE project on Vercel, you need to add the following environment variables to your Vercel project.

## Steps to Add Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your StudioE project
3. Click on "Settings" in the top navigation bar
4. Go to the "Environment Variables" section
5. Add each of the following variables one by one:

## Firebase Configuration Variables

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD6IOJoBOFtKkk0-h18UMn9QvNSox9bM4E
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=studioe-d9e5d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=studioe-d9e5d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=studioe-d9e5d.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=732415616963
NEXT_PUBLIC_FIREBASE_APP_ID=1:732415616963:web:ed23f3c24e4f31a5777f76
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-1TZP4S8DEZ
```

6. Make sure to set the appropriate "Environment" for each variable (Production, Preview, Development)
7. Click "Save" after adding all variables

## Optional API Keys

If you want to enable the AI features, you'll also need to add these API keys (when you have them):

```
# For OpenAI features (Chat, Transcription)
OPENAI_API_KEY=your_openai_api_key_here

# For Anthropic features (Claude AI)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# For Replicate features (Image Generation)
REPLICATE_API_TOKEN=your_replicate_api_token_here

# For Deepgram features (Audio Transcription)
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

## After Adding Environment Variables

After adding the environment variables, you should:

1. Redeploy your project by clicking on "Deployments" and then "Redeploy" on your latest deployment
2. This will ensure your project uses the newly added environment variables

Now your Firebase authentication and other services should work properly on your deployed site! 