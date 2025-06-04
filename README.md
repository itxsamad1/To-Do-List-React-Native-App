# Todo List App

A feature-rich React Native todo list application with modern UI, dark mode support, and comprehensive task management capabilities.

## Features

### Core Functionality
- ✅ Task Management
  - Add, delete, and complete tasks
  - Priority levels (high, medium, low) with color coding
  - Task completion status tracking
  - Date-based task grouping

### Screens
1. **Today's Tasks (Home Screen)**
   - View and manage today's tasks
   - Quick add/delete functionality
   - Task completion toggles
   - Priority level indicators

2. **Task History (Profile Screen)**
   - Historical view of completed tasks
   - Tasks grouped by date
   - Completion status tracking
   - Detailed task information

3. **Upcoming Tasks (Settings Screen)**
   - Future task management
   - Priority level settings
   - Task scheduling
   - Reminder configuration

### Navigation & UI
- 📱 Modern Navigation System
  - Bottom tab navigation
  - Drawer navigation with multiple options
  - Smooth screen transitions

- 🎨 User Interface
  - Material Design icons
  - Dark mode support
  - Responsive layout
  - Color-coded priority levels

### Additional Features
- 🌙 Dark Mode Toggle
- 🔔 Task Reminders
- 📊 Task Categories
- 📈 Statistics View (Coming Soon)
- 💾 Backup & Restore (Coming Soon)
- ❓ Help & Support Section (Coming Soon)

## Technical Details

### Built With
- React Native
- React Navigation (Drawer & Bottom Tabs)
- React Native Vector Icons
- React Native Reanimated
- React Native Gesture Handler
- React Native Safe Area Context

### Project Structure
```
Project/
├── android/          # Android native files
├── ios/             # iOS native files
├── screens/         # Screen components
│   ├── HomeScreen.jsx
│   ├── ProfileScreen.jsx
│   └── SettingsScreen.jsx
├── App.jsx          # Main application file
└── package.json     # Project dependencies
```

## Getting Started

### Prerequisites
- Node.js (>= 18)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/itxsamad1/To-Do-List-React-Native-App.git
cd Project
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

4. Start the application:
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Development Notes

### Recent Updates
- Added proper vector icons support
- Implemented dark mode functionality
- Fixed navigation issues
- Enhanced drawer menu content
- Added comprehensive task management features
- Improved UI/UX with proper styling

### Known Issues
- Some Gradle deprecation warnings (will be addressed in future updates)
- Minor UI adjustments needed for different screen sizes

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- React Native Community
- React Navigation Team
- Material Design Icons
