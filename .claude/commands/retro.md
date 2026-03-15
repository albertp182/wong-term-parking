# Retrospective — Learn From Pain Points

Analyze the current conversation for repeated failures, slow loops, and wasted time. Then fix the root causes by updating memory, skills, CLAUDE.md, or project config so they never happen again.

## Steps

1. **Identify pain points** — Scan the conversation for:
   - Commands that failed and had to be retried multiple times
   - Missing knowledge that caused wrong approaches
   - Configuration issues that should have been known upfront
   - Tool/dependency issues that blocked progress
   - Anything that took 3+ attempts to get right

2. **Categorize each pain point**:
   - **Config fix** — Something in project.yml, Fastfile, Info.plist, etc. that should be set correctly
   - **Memory** — Knowledge that should be saved for future conversations (e.g., "Xcode 26 requires X format")
   - **Skill update** — A slash command or skill that should include better instructions
   - **CLAUDE.md update** — Project-level instructions that would prevent the issue

3. **Apply fixes** — For each pain point:
   - Config fixes: Make the change directly
   - Memory: Write to the memory system
   - Skill updates: Edit the relevant skill file
   - CLAUDE.md: Add the relevant section

4. **Report** — Show the user:
   - What went wrong (plain English, 1 line each)
   - What was fixed and where
   - What will be different next time

## Rules
- Be honest about what went wrong — don't sugarcoat
- Focus on systemic fixes, not one-off patches
- Prefer fixing config/code over adding documentation
- Keep memory entries specific and actionable
- Don't create duplicate memories — check existing ones first
