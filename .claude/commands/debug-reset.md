# Debug Reset

Save everything we've tried while debugging a problem, so we can start fresh without losing progress.

Think of it like writing down everything you've checked when looking for a lost item — so you don't re-check the same places.

## Steps

### 1. Ask for a name

"What should I call this debugging session? Something short, like 'build-crash' or 'data-not-saving'."

If they don't give one, make one up from the error.

### 2. Gather what we know

From the conversation, collect:
- **The problem**: What's broken?
- **What we see**: Error messages, wrong behavior
- **What we tried**: Each fix attempt and whether it worked
- **What we ruled out**: Things that definitely aren't the issue
- **What's left to try**: Ideas we haven't tested yet
- **Important files**: Files related to the bug

### 3. Check git

```bash
git status --short
git diff --stat 2>/dev/null | head -10
```

### 4. Save the debug session

```bash
mkdir -p .claude/debug-sessions
```

Write to `.claude/debug-sessions/YYYY-MM-DD_{name}.md`:

```markdown
# Debug: {name}
**Date**: {date}
**Problem**: {one-line summary}

## What's Wrong
{Plain English description of the bug}

## What We Tried
| # | What We Did | Did It Work? | Notes |
|---|------------|--------------|-------|
| 1 | {attempt} | No | {why not} |
| 2 | {attempt} | Partially | {what happened} |

## Ruled Out
- **{theory}**: Not the issue because {reason}

## Still Need to Try
1. [ ] {idea 1} — How: {what to do}
2. [ ] {idea 2} — How: {what to do}

## Key Files
- `path/to/file.swift:line` — {why it matters}

## How to Reproduce
1. {step 1}
2. {step 2}
3. {step 3}

## Notes for Next Time
{Important context to remember}
```

### 5. Confirm

```
Debug session saved!

Summary:
- Problem: {one-line}
- Tried: {X} things
- Ruled out: {Y} theories
- Still to try: {Z} ideas

To pick up later, start a new session and say /debug-resume.
A fresh start often helps you spot things you missed!
```

## Tone
- "We're making progress even when things don't work — every failed attempt narrows it down"
- Debugging is normal, not a sign of failure
