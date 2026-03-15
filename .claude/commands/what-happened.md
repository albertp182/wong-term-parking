# What Just Happened

The user wants to understand what Claude Code just did. They are a beginner and may be confused or curious.

## Steps

1. Look at the recent conversation and tool calls.
2. Summarize in 2-3 sentences what was done and WHY, in plain English.
3. If files were changed, list them with a one-line description of each change.
4. If something was installed or configured, explain what it is and why they need it.

## Format

"Here's what I just did:
- [Plain English description]
- [Why it matters for your app]

Files I changed:
- `filename.swift` - [what changed and why]"

## Rules
- No technical jargon
- Never say "I refactored" - say "I reorganized" or "I cleaned up"
- Never say "I implemented" - say "I built" or "I added"
- If you deleted something, explain why it was safe to delete
