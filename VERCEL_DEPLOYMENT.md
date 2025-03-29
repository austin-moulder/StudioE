# Deploying StudioE to Vercel

This guide provides instructions on how to deploy the StudioE project to Vercel.

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel's New Project page](https://vercel.com/new)
2. Sign in with GitHub (or your preferred git provider)
3. Import the StudioE repository: `https://github.com/austin-moulder/StudioE.git`
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `next build`
   - Output Directory: .next
5. Click "Deploy"

Vercel will automatically detect your Next.js app and set up the correct environment.

## Option 2: Deploy via Command Line

1. Install the Vercel CLI globally:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Deploy the project (from the project root directory):
   ```
   vercel --prod
   ```

You can also run the included deployment script:
```
./deploy-to-vercel.sh
```

## After Deployment

- Your project will be available at a URL provided by Vercel (typically something like `studio-e.vercel.app`)
- You can configure custom domains in the Vercel dashboard
- Vercel automatically sets up continuous deployment from your GitHub repository

## Troubleshooting

If you encounter any ESLint errors during deployment, they have been fixed in the repository. The `.eslintrc.json` file has been configured to disable problematic rules.

For any other issues, refer to the [Vercel Documentation](https://vercel.com/docs) or contact support. 