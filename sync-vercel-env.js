// This script reads environment variables from .env.local
// and adds them to your Vercel project
require('dotenv').config({ path: '.env.local' });
const { execSync } = require('child_process');

const FIREBASE_ENV_VARS = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
];

console.log('Syncing environment variables to Vercel project...');

// Add each Firebase env var to Vercel
FIREBASE_ENV_VARS.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    try {
      // Create a temporary file with the value
      const tmpFileName = `.env-${varName}`;
      require('fs').writeFileSync(tmpFileName, value);
      
      // Add to Vercel using the file
      execSync(`vercel env add ${varName} production < ${tmpFileName}`);
      
      // Clean up
      require('fs').unlinkSync(tmpFileName);
      
      console.log(`✅ Added ${varName} to Vercel`);
    } catch (error) {
      console.error(`❌ Failed to add ${varName}: ${error.message}`);
    }
  } else {
    console.warn(`⚠️ ${varName} not found in .env.local`);
  }
});

console.log('\nAll environment variables have been synced. Now deploying...');
execSync('vercel --prod', { stdio: 'inherit' });

console.log('\nDeployment complete! Your local and deployed versions should now match.'); 