# Quick Fix

Something broke? Tell me the error or describe what's wrong, and I'll fix it.

## Arguments
- An error message, description, or "the build" / "the app" / "the screen"
- If no arguments, look at recent context for errors

## Steps

### 1. Figure out what's broken

**If they pasted an error:**
- Read the error message
- Find the file and line number mentioned
- Read that code

**If they said "the build is broken":**
```bash
cd /tmp/forge-app && xcodebuild -project Forge.xcodeproj -scheme Forge -destination 'platform=iOS Simulator,name=iPhone 16' build 2>&1 | tail -30
```

**If they said something vague ("it's not working"):**
- Ask one clarifying question: "What were you trying to do when it stopped working?"
- Check recent git changes: `git diff --stat HEAD~3 HEAD`
- Look for obvious issues in recently changed files

### 2. Investigate

- Read the file(s) where the error is
- Understand what the code is trying to do
- Find the root cause (not just the symptom)

### 3. Explain the problem simply

```
I found the issue:

**What's wrong**: [plain English explanation]
**Where**: [filename] line [number]
**Why it happened**: [simple reason]
```

### 4. Fix it

- Make the fix
- Try building again to confirm it works
- If the fix creates new errors, keep going until it's clean

### 5. Confirm

"Fixed! Here's what I changed:
- [file]: [what was changed and why]

The app should work now. Want me to run /build to test it?"

## Rules
- Never blame the user for the error
- Fix the actual problem, don't just hide the error
- If the fix is complicated, explain what you're doing as you go
- If you can't fix it after 3 attempts: "This is a tricky one. Let's /push your code and ask Gustavo to take a look."
- Always verify the fix works before saying you're done
