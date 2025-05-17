#!/bin/bash

echo "===== Studio E Project Setup ====="
echo "This script will fix common dependency issues"

# Clean installation
echo "Cleaning up previous installation..."
rm -rf node_modules package-lock.json

# Check package.json for scripts section
if ! grep -q '"scripts"' package.json; then
  echo "ERROR: package.json does not contain a scripts section!"
  echo "Please ensure your package.json contains:"
  echo '"scripts": {'
  echo '  "dev": "next dev",'
  echo '  "build": "next build",'
  echo '  "start": "next start",'
  echo '  "lint": "next lint"'
  echo '}'
  exit 1
fi

# Install all dependencies
echo "Installing dependencies from package.json..."
npm install

echo "Installing additional dependencies that might be needed..."
npm install @radix-ui/react-avatar @radix-ui/react-switch @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-tabs embla-carousel-react date-fns tailwind-merge react-hook-form @headlessui/react zod cmdk

# Create .env.local template if it doesn't exist
if [ ! -f .env.local ]; then
  echo "Creating .env.local template..."
  echo "NEXT_PUBLIC_SUPABASE_URL=your-supabase-url" > .env.local
  echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key" >> .env.local
  echo "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key" >> .env.local
  echo "Created .env.local template. Please update with your actual credentials."
else
  echo ".env.local file already exists. Leaving it as is."
fi

# Make the script executable
chmod +x setup.sh

echo ""
echo "===== Setup Complete ====="
echo "You can now run 'npm run dev' to start the development server."
echo "If you encounter any issues, please refer to TROUBLESHOOTING.md" 