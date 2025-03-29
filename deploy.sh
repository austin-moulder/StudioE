#!/bin/bash

# Build the Next.js application
echo "Building the Next.js application..."
npm run build

# Commit changes to git if any
echo "Committing changes to git..."
git add .
git commit -m "Update before deployment" || true

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

# Instructions for deploying on Vercel
echo "==============================================="
echo "To deploy on Vercel:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository: austin-moulder/StudioE"
echo "3. Vercel will automatically detect it as a Next.js project"
echo "4. Click Deploy"
echo "===============================================" 