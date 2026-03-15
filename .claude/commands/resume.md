# Resume Session

Pick up where you left off from a previous session.

## Usage
- `/resume` — Load the most recent session (default)
- `/resume list` — Show all saved sessions and pick one

## Steps

### Default: `/resume`

1. Find the most recent session:
```bash
ls -t .claude/sessions/*.md 2>/dev/null | head -1
```

2. If no sessions exist:
"No saved sessions found. That's okay! Just tell me what you'd like to work on, or type /roadmap to see your feature list."

3. Read the session file and show:
```
Welcome back! Here's where we left off:

## What We Were Working On
{task summary}

## What's Already Done
{completed items}

## What's Left
1. {next thing 1}
2. {next thing 2}
3. {next thing 3}

---

Which one would you like to tackle? (Pick a number, or tell me something else you'd like to do)
```

### List Mode: `/resume list`

1. List all sessions:
```bash
ls -t .claude/sessions/*.md 2>/dev/null
```

2. Show each with its task summary:
```
Your saved sessions:

1. March 15 - Building the workout logger
2. March 14 - Fixing the dashboard layout
3. March 13 - Adding run tracking

Pick a number to load that session:
```

3. Load whichever they pick

## If the session seems outdated
If the session file references things that no longer exist (files deleted, code changed), mention it:
"Heads up - some things may have changed since this session was saved. Let me check... [verify key files still exist]"

## Tone
- "Welcome back!" - make it feel like picking up with a friend
- Keep it brief - they want to get back to building, not reading
