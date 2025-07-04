# Studio E - Project Troubleshooting Guide

This document outlines common dependency issues and their resolutions for the Studio E project.

## Missing Dependencies

If you encounter a "Module not found" error or server startup issues, you may need to install one or more of these dependencies:

```bash
# Carousel components
npm install embla-carousel-react

# Date formatting
npm install date-fns

# Tailwind class utilities
npm install tailwind-merge

# Form handling
npm install react-hook-form

# UI Components
npm install @headlessui/react
npm install @radix-ui/react-tabs
npm install @radix-ui/react-scroll-area
npm install @radix-ui/react-avatar
npm install @radix-ui/react-switch
npm install @radix-ui/react-popover
npm install cmdk

# Supabase integration
npm install @supabase/supabase-js

# Data validation
npm install zod
```

## "Missing script: dev" Error

If you encounter an error like `npm error Missing script: "dev"`, the package.json file might be corrupted, or npm might not be recognizing it properly.

Solution:

```bash
# 1. Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# 2. Make sure package.json contains the dev script in the "scripts" section:
# "scripts": {
#   "dev": "next dev",
#   "build": "next build",
#   "start": "next start",
#   "lint": "next lint"
# }

# 3. Reinstall dependencies
npm install

# 4. Try running the dev server again
npm run dev
```

## Environment Variables

The application requires Supabase credentials to function properly. Create a `.env.local` file in the project root with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Fixed Dependencies

Below is a list of all dependencies in the working package.json:

```json
{
  "dependencies": {
    "@headlessui/react": "^2.2.3",
    "@radix-ui/react-checkbox": "^1.3.1",
    "@radix-ui/react-dialog": "^1.1.13",
    "@radix-ui/react-dropdown-menu": "^2.1.14",
    "@radix-ui/react-label": "^2.1.6",
    "@radix-ui/react-scroll-area": "^1.2.8",
    "@radix-ui/react-select": "^2.2.4",
    "@radix-ui/react-slider": "^1.3.4",
    "@radix-ui/react-slot": "^1.2.2",
    "@radix-ui/react-tabs": "^1.1.11",
    "@radix-ui/react-toast": "^1.2.13",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-popover": "^1.0.7",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.49.4",
    "@tailwindcss/typography": "^0.5.16",
    "@vercel/analytics": "^1.2.2",
    "@vercel/speed-insights": "^1.0.10",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^0.2.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "lucide-react": "^0.511.0",
    "next": "14.2.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.56.4",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.3.0",
    "tailwindcss": "^3.4.1",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.3.3",
    "zod": "^3.24.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.28",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "autoprefixer": "^10.4.18",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.2.7",
    "postcss": "^8.4.35"
  }
}
```

## One-Shot Setup Script

You can create a `setup.sh` script to install all required dependencies at once:

```bash
#!/bin/bash

# Clean installation
rm -rf node_modules package-lock.json

# Install dependencies
npm install 

# Install optional extra dependencies that might be needed
npm install @radix-ui/react-avatar @radix-ui/react-switch @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-tabs embla-carousel-react date-fns tailwind-merge react-hook-form @headlessui/react zod cmdk

# Create .env.local template if it doesn't exist
if [ ! -f .env.local ]; then
  echo "NEXT_PUBLIC_SUPABASE_URL=your-supabase-url" > .env.local
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key" >> .env.local
  echo "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key" >> .env.local
  echo "Created .env.local template. Please update with your actual credentials."
fi

echo "Setup complete. Run 'npm run dev' to start the development server."
```

## Common Issues

1. **Can't find module '@radix-ui/react-*'**: Missing Radix UI component - install the specific component.