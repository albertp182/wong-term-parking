# Diagram

Draw a picture of how something works using text art. Helpful for understanding how parts of the app connect.

## Arguments
- What to diagram (e.g., `/diagram how the app is organized`, `/diagram the workout data flow`)
- If no argument: diagram the overall app architecture

## How to Draw

Use simple ASCII art:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Screen A  │────▶│  Service    │────▶│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Common Patterns

**App Structure:**
```
┌──────────────────────────────────────────┐
│                  Forge App               │
├──────────┬──────────┬──────────┬─────────┤
│Dashboard │Workouts  │Running   │Nutrition│
│  (home)  │  (log)   │ (track)  │ (meals) │
└──────────┴──────────┴──────────┴─────────┘
                    │
              ┌─────┴─────┐
              │  SwiftData │
              │ (database) │
              └───────────┘
```

**Data Flow:**
```
User taps "Save"
      │
      ▼
┌─────────────┐
│  Form View  │ ── validates input
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │ ── processes data
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SwiftData  │ ── saves to phone
└─────────────┘
```

## Rules
- Keep diagrams simple — max 15 lines
- Label everything in plain English
- Use arrows (→, ←, ↑, ↓, ▶, ◀) to show direction
- Add a one-line explanation below: "This shows how [X] flows from [A] to [B]"
- If the user asks about something specific, read the actual code first, then diagram it accurately
