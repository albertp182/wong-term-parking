# Upload to TestFlight

Walk the user through archiving and uploading their app to TestFlight so they can test it on their real iPhone.

## CRITICAL: Pre-flight Checklist (verify ALL before first archive attempt)

Run through every item BEFORE attempting to archive. Do NOT discover issues one at a time through failed builds.

### 1. Signing & Accounts
- [ ] Apple Developer account signed into Xcode (Xcode → Settings → Accounts)
- [ ] At least one iOS device registered with the team (check developer.apple.com/account/resources/devices or build to a connected device first)
- [ ] If physical device connected: Developer Mode must be ON (Settings → Privacy & Security → Developer Mode)
- [ ] `project.yml` has `CODE_SIGN_STYLE: Automatic` and valid `DEVELOPMENT_TEAM`

### 2. App Icon (required for upload)
- [ ] Asset catalog exists at `Forge/App/Assets.xcassets/AppIcon.appiconset/`
- [ ] Contains all required icon sizes with CORRECT pixel dimensions (use `sips -g pixelWidth` to verify)
- [ ] Contents.json uses traditional `iphone`/`ipad`/`ios-marketing` idioms (NOT universal-only)
- [ ] Info.plist has `CFBundleIconName` set to `AppIcon`
- [ ] IMPORTANT: When generating icons programmatically on Retina Macs, use `NSBitmapImageRep` directly — NOT `NSImage(size:)` which creates images at 2x pixel size

### 3. Info.plist
- [ ] `UISupportedInterfaceOrientations~ipad` includes all 4 orientations (portrait, upside down, landscape left, landscape right)
- [ ] `CFBundleIconName` = `AppIcon`

### 4. Dependencies
- [ ] `xcodegen` installed (`brew install xcodegen`)
- [ ] Ruby gems installed (`bundle install --path vendor/bundle` — NOT bare `bundle install`)
- [ ] Fastlane `build_app` has `xcargs: "-allowProvisioningUpdates -allowProvisioningDeviceRegistration"`

### 5. App Store Connect
- [ ] App created in App Store Connect with matching bundle ID

## Steps

### First Time Only
1. Verify ALL pre-flight checklist items above
2. Help set up Apple Developer signing in Xcode if needed
3. Create the app in App Store Connect if needed

### Every Upload
1. `xcodegen generate`
2. Build to connected device first (registers device + validates signing):
   `xcodebuild -project Forge.xcodeproj -scheme Forge -destination 'id=DEVICE_UDID' -allowProvisioningUpdates -allowProvisioningDeviceRegistration build`
3. Archive:
   `xcodebuild -project Forge.xcodeproj -scheme Forge -destination 'generic/platform=iOS' -allowProvisioningUpdates archive -archivePath ./build/Forge.xcarchive`
4. Export & upload:
   `xcodebuild -exportArchive -archivePath ./build/Forge.xcarchive -exportOptionsPlist ./build/ExportOptions.plist -exportPath ./build/export -allowProvisioningUpdates`
5. After upload, takes ~15-30 minutes for TestFlight to process

## Explain
"TestFlight is Apple's way of letting you test your app on your real phone before it goes to the App Store. It's like a private beta - only people you invite can download it."

## If It Fails
Archive/upload errors are common. Read the error, explain simply, fix it. Common issues:
- "No Accounts" → Sign into Xcode → Settings → Accounts
- "No devices" → Build to connected device first, or register at developer.apple.com
- "Developer Mode disabled" → iPhone Settings → Privacy & Security → Developer Mode → ON
- "No profiles" → Add `-allowProvisioningUpdates -allowProvisioningDeviceRegistration` flags
- "Missing icon" → Check asset catalog has all sizes at correct pixel dimensions
- "Missing orientations" → Add `UISupportedInterfaceOrientations~ipad` to Info.plist
- Version conflicts → bump build number in project.yml
