# Optimize Setup

Analyze your Claude Code usage and suggest ways to make your experience smoother. Like a personal trainer for your coding setup.

## Arguments
- No args — Show report with suggestions
- `fix` — Auto-apply safe fixes (like adding permissions)
- `deep` — Extended analysis (90 days instead of 30)

## Steps

### 1. Run the analyzer

```bash
cd <project-root>
```

**Default mode:**
```bash
python3 scripts/optimize_setup.py
```

**Fix mode** (`/optimize fix`):
```bash
python3 scripts/optimize_setup.py --fix
```

**Deep mode** (`/optimize deep`):
```bash
python3 scripts/optimize_setup.py --days 90
```

### 2. Read the report

The script outputs:
- **Tool Usage** — what tools Claude uses most for you
- **Bash Commands** — which terminal commands come up often
- **Slash Commands** — which of your shortcuts you actually use
- **Confusion Signals** — moments you seemed stuck or confused
- **Repeated Questions** — things you keep asking about
- **Session Stats** — how long your sessions run

### 3. Present recommendations in plain English

Take the script's recommendations and explain each one simply:

**For permission suggestions:**
"You keep getting asked to approve [command]. I can make Claude remember to always allow that — it's safe. Want me to do that?"

**For unused commands:**
"You have some helpful shortcuts you haven't tried yet:
- `/review` — see what you changed before pushing
- `/changelog` — see everything you've built (it's motivating!)
Want me to show you how any of these work?"

**For confusion patterns:**
"I noticed you get stuck on [topic] sometimes. I can:
- Add a better explanation to the help docs
- Create a new shortcut to handle [topic] automatically
Which would help more?"

**For repeated questions:**
"You've asked about [question] a few times. Let me add that to the project docs so Claude always knows the answer right away."

**For long sessions:**
"Your sessions sometimes get really long (30+ messages). Try using /handoff before you stop working — it saves your place so you can /resume next time without losing context."

### 4. If `fix` mode — show what was auto-applied

```
I made these improvements automatically:
- Allowed [command] to run without asking (you approve it every time anyway)
- [other fixes]

These need your input:
- [manual recommendations]
```

### 5. Offer to go deeper

"Want me to:
1. Fix any of the suggestions above?
2. Create a new shortcut for something you do often?
3. Explain any of these findings?

Just pick a number or tell me what you'd like."

## When to Suggest Running This
- After the user's first week (enough data to analyze)
- If the user seems frustrated with permissions
- Monthly checkup: "Want me to run /optimize to tune your setup?"

## Tone
- Frame everything as making things EASIER, not fixing mistakes
- "Your setup is working, but we can make it smoother"
- Never criticize their usage patterns
- Celebrate what's working: "You use /push like a pro!"
