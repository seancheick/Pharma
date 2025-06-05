# PharmaGuide

A cross-platform mobile app MVP prototype for health management, built with React Native, Expo, and NativeBase.

## Features

- **Home Screen**
  - Health IQ score display
  - Recent scans with risk assessment
  - Alerts for potential interactions
  - Trending supplements/medications
  - Search functionality with suggestions
  - Scan modal for detailed information

- **Chat Screen**
  - AI-powered pharmacist chat
  - Real-time interaction analysis
  - Detailed recommendations
  - Safety badges and verdicts

- **Profile Screen**
  - User health information
  - Medication/supplement stack
  - Health goals and conditions
  - Edit profile functionality

## Tech Stack

- React Native with Expo
- NativeBase for UI components
- React Navigation for routing
- React Native Reanimated for animations
- Lucide React Native for icons

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on iOS:
```bash
npm run ios
```

4. Run on Android:
```bash
npm run android
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Main app screens
├── navigation/     # Navigation configuration
├── theme/         # UI theme and styling
└── data/          # Mock data and constants
```

## Dependencies

- @react-navigation/bottom-tabs: ^6.5.11
- @react-navigation/native: ^6.1.9
- expo: ~50.0.5
- native-base: ^3.4.28
- react-native-reanimated: ~3.6.2
- react-native-safe-area-context: 4.8.2
- react-native-screens: ~3.29.0
- react-native-svg: 14.1.0
- lucide-react-native: ^0.323.0

## Development Notes

- The app uses a medical-themed UI with specific color codes
- All components are built using NativeBase for consistent styling
- Mock data is provided for demonstration purposes
- The app is designed to work on both iOS and Android platforms # Pharma
Ai Pharmacist
