# Build & Run

Build the Forge app and run it in the iPhone Simulator.

## Steps

1. First, make sure the Xcode project is up to date:
   ```bash
   cd <project-root> && xcodegen generate
   ```

2. Build and run in the simulator:
   ```bash
   xcodebuild -project Forge.xcodeproj -scheme Forge -destination 'platform=iOS Simulator,name=iPhone 16' build
   ```

3. If the build succeeds, open the simulator:
   ```bash
   open -a Simulator
   ```

4. If the build FAILS:
   - Read the error message carefully
   - Explain what went wrong in plain English
   - Fix the issue
   - Try building again
   - If it fails 3 times, suggest the user ask Gustavo for help

## Notes
- Always explain what "building" means if the user seems confused: "Building means turning your code into an app that can run on a phone. Think of it like converting a recipe into an actual meal."
- The simulator is a fake iPhone on your computer - it looks and works like a real iPhone but runs on your Mac.
