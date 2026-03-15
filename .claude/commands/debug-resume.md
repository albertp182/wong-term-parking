# Debug Resume

Pick up a debugging session from where we left off.

## Steps

### 1. Find the debug session

```bash
ls -t .claude/debug-sessions/*.md 2>/dev/null | head -5
```

If none exist:
"No saved debug sessions found. If something's broken, just describe the problem and I'll help fix it. Or type /stuck if you're confused."

### 2. Load and display

Read the most recent debug session file and show:

```
Picking up debug session: {name}
Saved: {date}

## The Problem
{what's broken}

## What We Already Tried
{list of attempts with results}

## What We Ruled Out
{things that aren't the issue}

## Ideas Still To Try
1. {idea 1}
2. {idea 2}

---

Want to start with idea #1, or do you have a new theory?
```

### 3. Continue debugging

- Start with the first untried hypothesis
- Mark attempts as tried in the session file as we go
- If we solve it, celebrate and note the solution

## Tone
- "Let's crack this" — keep it positive
- Reference what was already tried so we don't repeat ourselves
