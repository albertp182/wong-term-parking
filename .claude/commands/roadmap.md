# Roadmap Manager

Manage the Forge project roadmap. The roadmap lives in `ROADMAP.md` at the project root.

## Usage

The user can say:
- `/roadmap` — show current sprint status
- `/roadmap add [feature description]` — add a new item
- `/roadmap done [item]` — mark something as complete
- `/roadmap next` — show what to work on next
- `/roadmap sprint` — show full current sprint details
- `/roadmap backlog` — show the backlog
- `/roadmap move [item] to [sprint/backlog]` — move an item between sprints

## Behaviors

### `/roadmap` (no arguments) — Sprint Status
1. Read `ROADMAP.md`
2. Find the current sprint (first sprint that has unchecked `- [ ]` items)
3. Show a summary:
   - Sprint name and goal
   - Progress: "5 of 8 items done (62%)"
   - What's done (checked items)
   - What's left (unchecked items)
   - A simple progress bar: `[█████░░░] 62%`
4. If all items in the current sprint are done, celebrate and suggest moving to the next sprint

### `/roadmap add [description]`
1. Ask: "Which sprint should this go in, or should I put it in the Backlog?"
   - Show the sprint names as options
   - Default to Backlog if they're not sure
2. Add the item as `- [ ] [description]` in the right section
3. Save the file
4. Confirm: "Added '[description]' to [sprint/backlog]."

### `/roadmap done [item]`
1. Find the item in ROADMAP.md (fuzzy match is fine - "workout" matches "Workout logger: create a workout...")
2. Change `- [ ]` to `- [x]`
3. Move it to the "Completed" section at the bottom with today's date
4. Save the file
5. Show updated sprint progress
6. If this was the last item in the sprint, celebrate: "Sprint complete! You crushed it. Ready for the next one?"

### `/roadmap next`
1. Find the current sprint
2. Look at the unchecked items
3. Recommend the best next item to work on:
   - Prefer "Must Have" over "Nice To Have"
   - Prefer items that build on what's already done
   - Prefer simpler items if the user is early in their journey
4. Say: "I'd suggest working on [item] next. It [brief reason]. Want me to start building it?"

### `/roadmap sprint`
1. Show full details of the current sprint including the goal, all items, and progress

### `/roadmap backlog`
1. Show all backlog items
2. Ask: "Want to move any of these into an upcoming sprint?"

### `/roadmap move [item] to [destination]`
1. Find the item (fuzzy match)
2. Remove it from its current location
3. Add it to the destination sprint or backlog
4. Confirm the move

## Rules
- Always read `ROADMAP.md` fresh before making changes (don't rely on memory)
- Keep the formatting consistent (headers, checkboxes, sections)
- When items are completed, move them to the Completed section with the date: `- [x] Item name (completed 2026-03-15)`
- Be encouraging about progress - building an app is hard, every checkbox matters
- If the user wants to add something that's similar to an existing item, point that out
- Never delete items without asking - move to backlog instead if they want to deprioritize
