# Quality Check

Review your code for common issues before pushing. Think of it like spell-check for code.

## Arguments
- No args — Check files changed since last push
- `all` — Check the whole project

## Steps

### 1. Find what to check

**Default (changed files):**
```bash
git diff --name-only HEAD~3 HEAD -- '*.swift'
git diff --name-only -- '*.swift'
```

**All mode:**
Check all `.swift` files in `Forge/`

### 2. Run checks (in parallel where possible)

**Swift Build Check:**
```bash
xcodebuild -project Forge.xcodeproj -scheme Forge -destination 'platform=iOS Simulator,name=iPhone 16' build 2>&1 | grep -E "error:|warning:" | head -20
```

**Code Quality Scan** — Read the changed Swift files and look for:

| Check | What It Means | Example |
|-------|--------------|---------|
| Force unwraps (`!`) | App could crash if value is missing | `user.name!` → use `user.name ?? "Unknown"` |
| Empty catch blocks | Errors get swallowed silently | `catch { }` → at least `print(error)` |
| Huge functions | Hard to understand and fix | Functions over 50 lines → break into smaller ones |
| Magic numbers | Numbers without explanation | `if count > 42` → `let maxItems = 42` |
| Missing access control | Everything is public by default | Add `private` to things that should be internal |
| TODO/FIXME left behind | Unfinished work | List them so you can decide what to do |

### 3. Report

```
## Quality Report

### Build
- Errors: 0 / X found
- Warnings: 0 / X found

### Code Review
| Issue | File | Line | Suggestion |
|-------|------|------|------------|
| Force unwrap | WorkoutView.swift | 42 | Use optional binding instead |
| Long function | DashboardView.swift | 15-90 | Break into smaller views |

### Summary
- {X} things to fix (important)
- {Y} suggestions (nice to have)

Overall: Looking good! / A few things to clean up first.
```

### 4. Offer to fix

"Want me to fix these? I can handle the important ones automatically."

If they say yes, fix the issues and show what changed.

## Tone
- Frame issues as suggestions, not criticisms
- "This could crash if..." not "You made an error"
- Celebrate clean code: "No issues found! Your code looks great."
