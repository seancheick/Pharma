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

### Prerequisites

- Node.js
- npm (Node Package Manager) or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation and Running

1. Navigate to the project directory in your terminal.
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
# or npx expo start
```

4. To run the app on your device or simulator/emulator:
   - For iOS:
```bash
npm run ios
```
   - For Android:
```bash
npm run android
```

Alternatively, you can scan the QR code displayed in the terminal or Expo Dev Tools web page using the Expo Go app on your phone.

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
- The app is designed to work on both iOS and Android platforms

# Pharma
Ai Pharmacist
