# Changelog

See everything you've built! Shows your recent changes grouped by what they do.

## Arguments
- No args — Show what's on `dev` that hasn't been merged to `main` yet
- A number (e.g., `/changelog 10`) — Show that many recent changes

## Steps

### 1. Get the commits

**Default (dev vs main):**
```bash
git log main..dev --oneline
```

If that returns nothing (branches are in sync):
"Your dev and main branches are in sync! Here's your last 5 changes instead:"
```bash
git log --oneline -5
```

**With a number:**
```bash
git log --oneline -<N>
```

### 2. Group by type

Sort commits into these categories:
- **New Features** — `feat:` commits
- **Bug Fixes** — `fix:` commits
- **Improvements** — `refactor:` or `perf:` commits
- **Other** — everything else

### 3. Show the changelog

```
## What You've Built

### New Features
- Added workout logging screen (abc1234)
- Added run tracking with pace calculation (def5678)

### Bug Fixes
- Fixed calorie counter showing wrong total (ghi9012)

### Improvements
- Made the dashboard load faster (jkl3456)

---
X changes total | March 10 to March 15
```

## Rules
- Use plain English - strip the `feat:`/`fix:` prefixes
- Keep it short - max 30 lines
- If a category has 0 items, skip it
- This is motivational! Show them how much they've accomplished
- End with something encouraging if there are lots of changes: "You've been busy!"
