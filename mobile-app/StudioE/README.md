# Studio E Mobile App

React Native/Expo mobile application for Studio E dance platform.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (buttons, inputs, etc.)
│   ├── auth/           # Authentication components
│   └── dashboard/      # Dashboard-specific components
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── dashboard/      # Dashboard screens
│   ├── events/         # Event-related screens
│   ├── classes/        # Class-related screens
│   ├── instructors/    # Instructor-related screens
│   └── profile/        # Profile screens
├── navigation/         # Navigation configuration
├── services/           # API and external services
│   ├── api/            # API configuration and calls
│   ├── auth/           # Authentication services
│   └── supabase/       # Supabase client and utilities
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on specific platforms:
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator
   npm run web     # Web browser
   ```

## Shared Resources

This mobile app shares APIs and types with the main web application, enabling consistent data handling across platforms.

## Next Steps

- Install navigation dependencies
- Set up authentication flow
- Implement screen components
- Connect to shared APIs
- Add platform-specific features 