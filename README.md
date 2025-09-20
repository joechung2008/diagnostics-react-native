# diagnostics-react-native

Azure Portal Extensions Dashboard implemented in React Native.

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Prerequisites

- Node.js >= 22
- For iOS development: Xcode and CocoaPods
- For Android development: Android Studio and Android SDK
- For web development: A modern web browser

## Development Workflows

### Step 1: Install Dependencies

```sh
npm install
```

For iOS development, also install CocoaPods dependencies:

```sh
bundle install
bundle exec pod install
```

### Step 2: Start Metro (for Native Development)

First, you will need to run **Metro**, the JavaScript build tool for React Native.

```sh
npm start
```

### Step 3: Build and Run Your App

With Metro running (for native platforms), open a new terminal window/pane from the root of your project, and use one of the following commands to build and run your app:

#### Android

```sh
npm run android
```

#### iOS

```sh
npm run ios
```

#### Web

For web development, you can run the development server:

```sh
npm run web
```

This will start a Vite development server at `http://localhost:5173` (or the next available port).

### Step 4: Build for Production

#### Web Production Build

```sh
npm run build:web
```

This will create optimized production files in the `dist/` directory.

## Project Structure

```
├── src/                    # Main application code
│   ├── App.tsx            # Main app component
│   ├── BuildInfo.tsx      # Build information component
│   ├── Configuration.tsx  # Configuration management
│   ├── Extension.tsx      # Extension component
│   ├── Extensions.tsx     # Extensions list component
│   ├── ServerInfo.tsx     # Server information component
│   ├── StageDefinition.tsx # Stage definition component
│   ├── ThemeContext.tsx   # Theme context provider
│   ├── types.d.ts         # TypeScript type definitions
│   └── utils.ts           # Utility functions
├── web/                   # Web-specific files
│   ├── index.html         # HTML template for web
│   ├── main.tsx           # Web entry point
│   └── vite.config.ts     # Vite configuration
├── android/               # Android native code
├── ios/                   # iOS native code
├── public/                # Static assets for web
└── dist/                  # Web production build output
```

## Web-Specific Features

### React Native Web Integration

This project uses [React Native Web](https://necolas.github.io/react-native-web/) to run React Native components in the browser. Key features:

- **Shared Codebase**: Write once, run on iOS, Android, and Web
- **Native Components**: Use React Native components like `<View>`, `<Text>`, and `<ScrollView>` in the browser
- **Platform-Specific Code**: Use `Platform.OS` to detect the platform and render appropriate components

### Development Server

The web development server provides:

- Hot module replacement (HMR) for fast development
- Automatic browser refresh on code changes
- Source maps for debugging
- Optimized build for development

### Build Configuration

- **Vite**: Fast build tool with native ES modules support
- **TypeScript**: Full TypeScript support for web builds
- **Webpack**: Alternative build configuration available
- **Babel**: JavaScript transpilation for compatibility

## Available Scripts

- `npm start` - Start Metro bundler for native development
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Start web development server
- `npm run build:web` - Build for web production
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with Prettier
- `npm run typecheck:web` - Type check web-specific code

## Modifying Your App

### Code Changes

Open files in the `src/` directory in your text editor. Changes will automatically reload:

- **Native (Android/iOS)**: Changes are reflected via Metro's Fast Refresh
- **Web**: Changes are reflected via Vite's Hot Module Replacement (HMR)

### Platform-Specific Code

To add platform-specific behavior:

```typescript
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // Web-specific code
} else if (Platform.OS === 'ios') {
  // iOS-specific code
} else if (Platform.OS === 'android') {
  // Android-specific code
}
```

### Force Reload

- **Android**: Press <kbd>R</kbd> twice or select **"Reload"** from the **Dev Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> on Windows/Linux, <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> on macOS)
- **iOS**: Press <kbd>R</kbd> in iOS Simulator
- **Web**: The browser will automatically reload on code changes

## Testing

Run the test suite:

```sh
npm test
```

## Code Quality

### Linting

```sh
npm run lint
```

### Formatting

```sh
npm run format
```

## Troubleshooting

### Common Issues

1. **Metro Issues**: Clear Metro cache with `npx react-native start --reset-cache`
2. **iOS Build Issues**: Ensure CocoaPods are installed with `bundle exec pod install`
3. **Web Build Issues**: Check that Node.js version is >= 22
4. **TypeScript Issues**: Run `npm run typecheck:web` to check web-specific types

### Platform-Specific Troubleshooting

- **Android**: See [React Native Android Troubleshooting](https://reactnative.dev/docs/troubleshooting#android-specific)
- **iOS**: See [React Native iOS Troubleshooting](https://reactnative.dev/docs/troubleshooting#ios-specific)
- **Web**: Check browser console for errors and ensure all dependencies are installed

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Native Web Documentation](https://necolas.github.io/react-native-web/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
