# Clean Project

Clean up build artifacts and reset the Xcode project when things get wonky.

## Usage
- `/clean` — Normal cleanup (usually enough)
- `/clean deep` — Nuclear option (when nothing else works)

## Normal Clean

```bash
# Remove Xcode build cache
rm -rf ~/Library/Developer/Xcode/DerivedData/Forge-*

# Regenerate Xcode project
cd <project-root> && xcodegen generate
```

Tell the user: "Cleaned up the build cache and regenerated the project. Try /build again."

## Deep Clean (`/clean deep`)

```bash
# Remove ALL Xcode build data for this project
rm -rf ~/Library/Developer/Xcode/DerivedData/Forge-*

# Remove the Xcode project (we'll regenerate it)
rm -rf Forge.xcodeproj

# Remove any Package.resolved (Swift Package Manager cache)
rm -f Forge.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved 2>/dev/null

# Regenerate everything
cd <project-root> && xcodegen generate
```

Tell the user: "Did a deep clean — removed all caches and regenerated the project from scratch. This fixes most weird build issues. Try /build again."

## When to Suggest This
- Build fails with confusing errors about old files
- Xcode shows errors that don't match the code
- After pulling changes from GitHub (git pull)
- "The simulator is showing old stuff"

## Tone
- "Sometimes Xcode gets confused and holds onto old stuff. A clean sweep fixes it."
- Like clearing your browser cache — nothing is lost, just rebuilt fresh
