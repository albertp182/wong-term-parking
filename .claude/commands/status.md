# Status Check

Quick check on your project's current state.

## Steps

### 1. Git status
```bash
git status --short
git log --oneline -5
```

### 2. Check what branch you're on
Make sure you're on `dev`. If not, ask if they want to switch.

### 3. Check if the Xcode project exists
```bash
ls Forge.xcodeproj 2>/dev/null && echo "Xcode project: exists" || echo "Xcode project: MISSING (run xcodegen generate)"
```

### 4. Check for build issues (quick)
```bash
# Just check if project file is valid
xcodebuild -project Forge.xcodeproj -scheme Forge -showBuildSettings 2>&1 | head -5
```

### 5. Report summary

```
| Thing            | Status         |
|------------------|----------------|
| Branch           | dev / main     |
| Changes          | X files changed / clean |
| Last commit      | hash - message |
| Xcode project    | OK / MISSING   |
| Ready to push?   | Yes / No       |
```

If anything looks wrong, explain what it means and how to fix it in plain English.

## Tone
- Keep it simple: "You have 3 files with unsaved changes" not "3 modified files in working tree"
- If everything looks good: "All good! You're ready to keep building."
