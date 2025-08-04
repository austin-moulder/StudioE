# Studio E Mobile Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)
- Expo Go app on your physical device (optional)

### Getting Started

1. **Navigate to mobile app directory:**
   ```bash
   cd mobile-app/StudioE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Run on different platforms:**
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator  
   npm run web     # Web browser
   ```

## 📱 How to Monitor the Mobile App

### Development Server
- **Local URL:** `http://localhost:8081`
- **Metro bundler:** Automatically opens when you run `npm start`
- **QR Code:** Scan with Expo Go app on your phone for instant testing

### Real-time Monitoring

1. **Expo DevTools:**
   - Opens automatically at `http://localhost:19006/`
   - Shows logs, network requests, and device info
   - Hot reload and fast refresh enabled

2. **Console Logs:**
   - All `console.log`, `console.error` appear in terminal
   - React Native debugger integration available

3. **Physical Device Testing:**
   - Install "Expo Go" from App Store/Google Play
   - Scan QR code from terminal/browser
   - Instant updates via hot reload

### Debug Options

1. **Enable Remote Debugging:**
   - Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
   - Select "Debug Remote JS"
   - Opens Chrome DevTools

2. **React Native Inspector:**
   - Shake device → "Show Inspector"
   - Inspect element hierarchy and styles

## 🏗️ Architecture Overview

```
mobile-app/StudioE/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   │   ├── auth/           # Authentication screens
│   │   ├── classes/        # Classes screens ✅ FUNCTIONAL
│   │   ├── events/         # Events screens
│   │   └── profile/        # Profile screens
│   ├── navigation/         # Tab and stack navigation ✅
│   ├── services/           # API services
│   │   ├── api/            # API calls (Classes API working ✅)
│   │   └── supabase/       # Supabase client ✅
│   ├── types/              # TypeScript types ✅ SHARED
│   └── hooks/              # Custom React hooks
├── App.tsx                 # Main app entry point ✅
└── package.json           # Dependencies ✅
```

## 🔄 Shared Resources with Web App

### What's Shared:
- **Types:** All TypeScript interfaces
- **API Endpoints:** Same Supabase database
- **Authentication:** Shared Supabase auth
- **Business Logic:** Classes, Events, Users data

### Platform Differences:
- **Navigation:** React Navigation (mobile) vs Next.js routing (web)
- **Storage:** React Native AsyncStorage vs browser localStorage
- **Components:** React Native components vs HTML/CSS

## 🧪 Testing Status

### ✅ Working Features:
- [x] **Navigation:** Tab navigation with 5 screens
- [x] **Supabase Integration:** Database connection established
- [x] **Classes API:** Fetching and displaying classes from database
- [x] **Error Handling:** Loading states and error boundaries
- [x] **TypeScript:** Full type safety

### 🚧 In Progress:
- [ ] Authentication flow
- [ ] Events screen functionality
- [ ] Instructors screen functionality  
- [ ] User profile management
- [ ] Push notifications

### 📋 Next Development Steps:
1. Implement authentication screens
2. Add Events API service
3. Create Instructors listing
4. Build profile management
5. Add booking functionality

## 🔒 Web App Safety

### Protected Web App:
- **Isolated Development:** Mobile app runs on different port (8081 vs 3000)
- **Separate Package.json:** Independent dependencies
- **No Conflicts:** Different build systems (Expo vs Next.js)
- **Shared APIs Only:** Only database and types are shared

### Verification Web App Still Works:
```bash
# In main project root
cd /Users/austinmoulder1/20250329/StudioE
npm run dev  # Should still work on localhost:3000
```

## 📊 Monitoring Commands

### Mobile App Status:
```bash
# Check if mobile dev server is running
curl http://localhost:8081/_expo/status

# View mobile app logs
expo logs

# Clear Metro cache if issues
expo start --clear
```

### Build Commands:
```bash
# Development build
expo prebuild

# Production build (iOS)
expo build:ios

# Production build (Android)  
expo build:android
```

## 🚨 Troubleshooting

### Common Issues:

1. **Metro bundler won't start:**
   ```bash
   npx expo start --clear
   ```

2. **TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

3. **Node modules issues:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Expo Go app won't connect:**
   - Ensure both devices on same WiFi
   - Restart Expo development server
   - Try tunnel mode: `expo start --tunnel`

## 📱 Device Testing Checklist

- [ ] iOS Simulator (latest version)
- [ ] Android Emulator (API 30+)
- [ ] Physical iPhone (via Expo Go)
- [ ] Physical Android (via Expo Go)
- [ ] Web browser (Chrome/Safari)

---

**Status:** Mobile app foundation complete and running! Classes screen successfully loads data from shared Supabase database. Web app remains fully functional and isolated. 