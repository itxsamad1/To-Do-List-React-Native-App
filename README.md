# React Native Navigation Demo

A React Native application demonstrating the implementation of Navigation, Tabs, Drawer, and various React Hooks.

## Features

- **Navigation**: Using React Navigation v6
- **Bottom Tabs**: Home, Profile, and Settings screens
- **Drawer Navigation**: Accessible from any screen
- **React Hooks Implementation**:
  - useState (in Home and Settings screens)
  - useEffect (in Home screen for timer)
  - useCallback (in Profile screen)
  - useMemo (in Settings screen)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/itxsamad1/Testing-React-Native-Libs.git
cd Testing-React-Native-Libs
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (macOS only):
```bash
cd ios
pod install
cd ..
```

## Running the App

### For Android:

1. Start an Android emulator or connect a physical device

2. Run the following command:
```bash
npx react-native run-android
```

### For iOS (macOS only):

1. Run the following command:
```bash
npx react-native run-ios
```

## Project Structure

```
project/
├── App.jsx              # Main application file
├── screens/
│   ├── HomeScreen.jsx   # Home screen with counter and timer
│   ├── ProfileScreen.jsx # Profile screen with user info
│   └── SettingsScreen.jsx # Settings screen with toggles
└── ...
```

## Dependencies

- @react-navigation/native
- @react-navigation/bottom-tabs
- @react-navigation/drawer
- react-native-reanimated
- react-native-gesture-handler
- react-native-screens
- react-native-safe-area-context
- react-native-vector-icons

## Troubleshooting

If you encounter any issues:

1. Clear the Metro bundler cache:
```bash
npx react-native start --reset-cache
```

2. Clean and rebuild Android:
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

3. For iOS, clean the build folder:
```bash
cd ios
xcodebuild clean
cd ..
npx react-native run-ios
```

## License

This project is open source and available under the MIT License.
