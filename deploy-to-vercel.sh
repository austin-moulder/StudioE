#!/bin/bash

echo "Starting Vercel deployment process for StudioE..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "You need to log in to Vercel first"
    vercel login
fi

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment complete!"
echo "If you encountered any issues during login, please visit https://vercel.com/new to import and deploy your GitHub repository."
echo "Repository URL: https://github.com/austin-moulder/StudioE.git" 