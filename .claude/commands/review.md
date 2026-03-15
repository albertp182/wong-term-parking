# Review Changes

See what you've changed since your last save, with a plain English summary.

## Steps

### 1. Get the changes

```bash
# What files changed
git diff --name-only HEAD 2>/dev/null
git diff --name-only --cached 2>/dev/null

# If nothing uncommitted, show last commit
git diff --name-only HEAD~1 HEAD 2>/dev/null
```

### 2. Summarize each changed file

For each changed file, read the diff and write a one-liner:

```
## Your Recent Changes

### Files Changed
- `WorkoutView.swift` — Added the "save workout" button and form validation
- `Workout.swift` — Added a "notes" field to store workout notes
- `ContentView.swift` — Added Workouts tab to the bottom nav bar

### What This Means
You added workout logging! Users can now create workouts with notes
and access them from the main navigation.
```

### 3. Flag potential issues

If you spot anything concerning in the diff:
```
### Heads Up
- `WorkoutView.swift:42` — This force-unwraps a value that could be nil (might crash)
  → Want me to fix this? It's a quick change.
```

### 4. Suggest next action

"Looking good! You can:
- `/push` to save this to GitHub
- `/build` to test in the simulator
- Keep building — tell me what's next"

## Rules
- Explain changes like you're talking to a friend, not writing a code review
- Keep it brief — one line per file
- Only flag real issues, not style preferences
- Always end with a suggested next action
