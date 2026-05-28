# Disciple Tools Mobile App

The React Native code base for the Disciple Tools mobile app.

## Download the App

[![AppStore][appstore-image]][appstore-url]
[![PlayStore][playstore-image]][playstore-url]

## Latest status

| Production                                                                                                                                                        | Development                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![](https://github.com/DiscipleTools/disciple-tools-mobile-app/workflows/CI%2FCD/badge.svg)](https://github.com/DiscipleTools/disciple-tools-mobile-app/actions) | [![](https://github.com/DiscipleTools/disciple-tools-mobile-app/workflows/CI%2FCD/badge.svg?branch=development)](https://github.com/DiscipleTools/disciple-tools-mobile-app/actions) |

## Team

- [Mobile App Team](https://github.com/orgs/DiscipleTools/teams/mobile-app-lead-team)

## Dependent Repo

- [Disciple Tools Mobile App Plugin](https://github.com/DiscipleTools/disciple-tools-mobile-app-plugin)
- OAuth2 plugin (coming soon)

## Offline Usage

[Offline Usage Guide](https://github.com/DiscipleTools/disciple-tools-mobile-app/blob/development/OFFLINE.md)

## Basic Design Idea

![Basic Design Idea](https://github.com/DiscipleTools/disciple-tools-mobile-app-plugin/raw/master/mobile-app-design.png)

## Development Setup

### Prerequisites

- Node.js `20.18.x` (matches the version used in `eas.json`)
- npm
- Xcode, CocoaPods, and the iOS Simulator for iOS development
- Android Studio plus an emulator or USB-connected Android device for Android development
- A Disciple Tools instance that is reachable over `https`

### Backend Requirements

To use the app locally, you will also need:

- A running Disciple Tools server
- The [Disciple Tools Mobile App Plugin](https://github.com/DiscipleTools/disciple-tools-mobile-app-plugin)

If your local Disciple Tools instance is only available over `http`, the mobile app will fail with `Network Error`. Use a tunnel such as `ngrok` or `cloudflared` so the app can connect over `https`, then update the `home` and `siteurl` values in the `dt_options` table to match that public URL.

### Install Dependencies

Clone the repository and install packages:

```bash
git clone https://github.com/DiscipleTools/disciple-tools-mobile-app.git
cd disciple-tools-mobile-app
npm install
```

This project uses `patch-package`, so the local patches in [`patches/`](./patches) are applied automatically during install.

### Native Project Notes

This app uses Expo with native iOS/Android projects for local development. The native folders are generated locally and are gitignored, so on a fresh clone they may not exist yet.

The platform run commands below will create or sync them for you automatically. If you want to generate them ahead of time, run:

```bash
npx expo prebuild
```

### Start the Development Server

```bash
npm start
```

This starts the Expo/Metro dev server. Because this project includes `expo-dev-client`, Expo may start in `Using development build` mode by default.

Once Metro is running, you can use:

- `s` to switch between `Development build` and `Expo Go`
- `a` to open Android
- `i` to open iOS

### Choose a Run Mode

#### Development Build

Use this when you want the closest match to the real app.

- Recommended default for this repository
- Uses a custom native app build generated from this project
- Best choice when testing native modules, notifications, or platform-specific behavior

You have two common ways to run it.

Local native build:

```bash
npm run android
```

or

```bash
npm run ios
```

Then start Metro if it is not already running:

```bash
npm start
```

When Metro shows `Using development build`, open the installed development client on your emulator, simulator, or device. You can also press `a` or `i` from the Metro terminal.

Cloud development build with EAS:

```bash
npx eas-cli build -p ios --profile development
```

or

```bash
npx eas-cli build -p android --profile development
```

Use the EAS `development` profile when you want Expo to create an installable development client build for a real device or shared tester workflow. This is a development build, not a store release build.

#### Expo Go

Use this for quick JavaScript or UI testing when the part of the app you are working on does not require custom native behavior.

- Faster to try on a physical device
- Useful for simple screen and styling work
- Some features may not work if they depend on native modules or project-specific native config

How to run it:

```bash
npm start
```

Then press `s` until the terminal shows Expo Go mode.

On a physical device, open Expo Go and scan the QR code. On a simulator or emulator, press `a` or `i`.

If something works in `Development build` but not in Expo Go, switch back with `s` and continue in the development build.

### Run the App Natively

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

On the first run, Expo may generate native files and install iOS pods, so it can take a few minutes.

### Running on a Physical Device

- Keep your phone and development machine on the same network if you are connecting to Metro over LAN
- For Android, connect the device with USB debugging enabled and run `npm run android`
- For iOS, use Xcode signing if you want to install to a physical device

### Useful Commands

Run tests:

```bash
npm test
```

Run lint autofix:

```bash
npm run lint
```

Type-check:

```bash
npm run build
```

### Release Builds and Store Publishing

This project uses EAS Build for release artifacts and store submission.

#### Prerequisites

Before creating release builds, make sure you have:

- Access to the Expo project owner `arrow-app`
- Access to App Store Connect for the iOS bundle ID `app.myarrow`
- Access to Google Play Console for the Android package `app.myarrow`
- EAS CLI available via `npx`

Log in to Expo:

```bash
npx eas-cli login
```

#### Build Profiles in This Repo

The configured profiles in [`eas.json`](./eas.json) are:

- `development`: development client build for local testing
- `preview_android`: internal Android release APK for sharing/testing
- `production`: store-ready production build

#### Before You Cut a Release

Update version values in [`app.json`](./app.json):

- `expo.version`: user-facing app version
- `expo.ios.buildNumber`: iOS build number
- `expo.android.versionCode`: Android build number

#### Create Internal Test Builds

Android preview APK:

```bash
npx eas-cli build -p android --profile preview_android
```

Use this when you want a shareable Android build for testers before sending something to the stores.

For iOS tester distribution through TestFlight, use the production profile instead:

```bash
npx eas-cli build -p ios --profile production --auto-submit
```

That creates the iOS build and uploads it to TestFlight in one step.

#### Create Production Builds

Android production build:

```bash
npx eas-cli build -p android --profile production
```

iOS production build:

```bash
npx eas-cli build -p ios --profile production
```

These production builds are the ones intended for Play Console and App Store Connect.
Do not use the `development` profile for store publishing.
For iOS, building alone does not submit the app to TestFlight or App Store review.

#### Submit to the Stores

Submit Android:

```bash
npx eas-cli submit -p android --profile production
```

Submit iOS:

```bash
npx eas-cli submit -p ios --profile production
```

If you want Expo to build and then automatically upload the iOS build to TestFlight in one step, use:

```bash
npx eas-cli build -p ios --profile production --auto-submit
```

By default, EAS Submit uploads iOS builds to TestFlight, not directly to App Store review.

If you prefer, you can also download the build artifacts from the Expo dashboard and upload them manually in Google Play Console or App Store Connect.

#### Recommended Release Flow

1. Update `version`, `buildNumber`, and `versionCode` in `app.json`.
2. Create preview builds if QA or stakeholder review is needed.
3. Create production builds with the `production` EAS profile.
4. Submit with `npx eas-cli submit` or upload manually in the store dashboards.
5. Complete release metadata, rollout, and review steps in App Store Connect and Google Play Console.

### Issues

#### HTTPS

You MUST connect to a D.T. instance URL with https protocol, otherwise it will fail to connect with

"Network Error"

If you are using a local D.T. instance without SSL, you can use a service like ngrok or cloudflared to create a tunnel to an https address.

With this solution, you would then also need to change the values of `home` and `siteurl` in the `dt_options` table in your WP database.

#### Firewall

If running on a device using Expo, you may need to open the necessary port on your computer to allow expo to access the app.

#### Native Project Sync Issues

If the generated `ios/` or `android/` projects get out of sync with `app.json` or dependencies, regenerate them with:

```bash
npx expo prebuild --clean
```

## DataStore

Information on the redux setup for managing data: [Data Store](https://github.com/DiscipleTools/disciple-tools-mobile-app/tree/development/store)

## Tests

Run all tests:

```
npm run test
```

[appstore-image]: https://github.com/DiscipleTools/disciple-tools-mobile-app/blob/development/assets/badges/appstore.png
[playstore-image]: https://github.com/DiscipleTools/disciple-tools-mobile-app/blob/development/assets/badges/playstore.png
[appstore-url]: https://apps.apple.com/us/app/d-t/id1483836867
[playstore-url]: https://play.google.com/store/apps/details?id=tools.disciple.app

## Design Decisions

General:

- Offline-First (via dispatch to Redux onAppBackground & persistent FIFO request queue for API writes)
- Aggressive data fetching, preferring to get all vs. pagination (so that data is available offline)
- CNonce: PIN (3 sec)
- (Coming soon) Accessibility (double as Test IDs?)

UI/Framework-specific:

- Functional Components vs. Class
- Modular component design to mirror D.T Post Types and Fields, and dynamically respond to API changes, and support plugins
- Custom Hooks - map well to REST endpoints
- SWR (stale-while-revalidate), also meets requirement for background fetching, onFocus fetching (prevent stale data on refocus of app)
- Redux AND Context - Redux handles any persisted state, and Context is in-memory, runtime app state
- Prefer Skeletons to Spinners, except for Button Actions
- Minimize 3rd party dependencies where possible (eg, implement own Login form validation vs. something like Formik). Purpose: long-term maintenance (since this is an OSS project with volunteers), fewer library preference debates, less app bloat
- SecureStore - use as much as practical
- Component Library: N/A (removed Native Base)
- Abstract service libraries (ie, Expo, SWR, Axios) via Hooks, in case we want to swap for something else later

## Contributing

[Contributing Guide](https://github.com/DiscipleTools/disciple-tools-mobile-app/blob/development/CONTRIBUTING.md)
