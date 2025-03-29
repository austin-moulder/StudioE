const fs = require('fs');

// Read the .env.local file
const envFile = fs.readFileSync('.env.local', 'utf8');

// Parse the environment variables
const envVars = envFile.split('\n')
  .filter(line => line.trim() && !line.startsWith('#') && line.includes('='))
  .map(line => {
    const [key, ...valueParts] = line.split('=');
    const value = valueParts.join('=').trim();
    return { key: key.trim(), value };
  });

// Print instructions
console.log('\n=== VERCEL ENVIRONMENT VARIABLES ===\n');
console.log('Add these to your Vercel project settings:\n');

// Print each environment variable in a format easy to copy
envVars.forEach(({ key, value }) => {
  if (value) {
    console.log(`${key}=${value}`);
  }
});

console.log('\n=== END ENVIRONMENT VARIABLES ===\n'); 