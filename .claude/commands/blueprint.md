# Blueprint — Plan Before Building

Think through a feature before writing code. Like sketching a building before constructing it.

## Arguments
- Feature description (e.g., `/blueprint add a meal logging screen`)

## When to Use
- Before building anything with more than one screen
- When the feature touches existing code
- When you're not sure how something should work

## Steps

### 1. Understand the Feature

Read the user's description and clarify if needed:
- "So you want [restate]. Is that right?"
- Ask at most 2 clarifying questions

### 2. Explore What Exists

Look at the current codebase to understand:
- What screens/views already exist
- What models (data structures) are relevant
- What can be reused vs needs to be created

### 3. Write the Plan

Save to `docs/plans/YYYY-MM-DD-feature-name.md`:

```markdown
# [Feature Name] Plan

**What**: [One sentence — what we're building]
**Why**: [One sentence — why it matters]
**Screens**: [How many new screens/views]
**Effort**: Simple (< 1 hour) / Medium (1-3 hours) / Large (3+ hours)

---

## How It'll Look

[Describe the user experience — what they'll see and tap]

## What We Need to Build

### New Files
- `Forge/Views/[Feature]/[Screen].swift` — [what this screen shows]
- `Forge/Models/[Model].swift` — [what data this stores]

### Files to Change
- `Forge/App/ContentView.swift` — [add navigation to new screen]

## Build Order

Build these in this order (each step builds on the last):

1. **Data Model** — Create the model that stores [feature] data
2. **Main Screen** — Build the primary view
3. **Input Form** — Build the form to add new entries
4. **Navigation** — Wire it into the app's tab bar / navigation
5. **Polish** — Make it look good, add empty states

## What Could Go Wrong

| Problem | Solution |
|---------|----------|
| [potential issue] | [how we'd handle it] |
```

### 4. Present and Ask

Show the plan in a simplified format:

```
Here's my plan for [feature]:

1. Create [Model] to store the data
2. Build [Screen] to show the list
3. Build [Form] to add new entries
4. Add it to the tab bar
5. Polish the look and feel

This is a [simple/medium/large] feature. Ready for me to start building?
```

Wait for approval before writing any code.

## Rules
- Keep plans SHORT — this is for a beginner, not a software architect
- Use plain English — "the screen that shows your workouts" not "the WorkoutListView component"
- Always show what the user will SEE, not just what code will exist
- Break into small steps so they can see progress
- If it's simple enough (one screen, one model), skip the plan file and just describe it verbally
