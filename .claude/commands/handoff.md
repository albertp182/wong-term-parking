# Session Handoff

Save where you left off so you (or Gustavo) can pick up later. Think of it like bookmarking your page in a book.

## Steps

### 1. Look at what happened this session

Figure out from the conversation:
- **What were we building?** (the main task)
- **What got done?** (completed work)
- **What's left?** (remaining work)
- **Any problems?** (things that didn't work)

### 2. Check git status

```bash
git status --short
git log --oneline -3
```

### 3. Save session notes

Create the directory if needed:
```bash
mkdir -p .claude/sessions
```

Write to `.claude/sessions/YYYY-MM-DD_HH-MM.md`:

```markdown
# Session Notes: {date}

## What We Were Working On
{Brief description in plain English}

## What Got Done
- {Thing 1}
- {Thing 2}

## Files Changed
- `path/to/file.swift` - {what changed}

## What's Left To Do
1. [ ] {Next thing 1}
2. [ ] {Next thing 2}
3. [ ] {Next thing 3}

## Problems We Hit
- {Any issues encountered, or "None!"}

## Notes for Next Time
{Anything important to know when picking up again}

## Git Info
- Branch: {branch name}
- Last save: {commit hash} - {message}
- Unsaved changes: {yes/no}
```

### 4. Remind them to push

If there are uncommitted changes:
"You have unsaved changes. Want me to run /push first to save everything to GitHub?"

### 5. Confirm

```
Session saved to .claude/sessions/{filename}

Summary:
- Working on: {task}
- Done: {X} things
- Left: {Y} things

Next time, just say /resume and I'll pick up right where we left off.
```

## Tone
- "Great work today!" - always end on a positive note
- Summarize in plain English, no jargon
