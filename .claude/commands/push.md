# Push Changes

Save all current work and push to GitHub so Gustavo can see it.

If the user says just `/push` → push to `dev` (default, safe).
If the user says `/push main` → push to `main` AND upload to TestFlight.

## Default: Push to Dev

### Step 1: Pre-Push Quality Check
1. Run a build to make sure the app compiles:
   ```bash
   xcodegen generate && xcodebuild -project Forge.xcodeproj -scheme Forge -destination 'generic/platform=iOS Simulator' -quiet build 2>&1 | grep -E "error:|warning:" | head -30
   ```
2. If there are **build errors**: stop and fix them before pushing. Tell the user: "Found some issues that would break the app. Let me fix them first."
3. If there are **only warnings**: note them but continue (warnings don't break anything).
4. Quick scan changed Swift files for critical issues:
   - Force unwraps (`!`) that could crash the app
   - Empty catch blocks that hide errors
   - Hardcoded secrets or API keys
   - Leftover `print()` debug statements in views
5. If critical issues found: fix them automatically, tell the user what you fixed.
6. Tell the user: "Quality check passed — your code builds clean."

### Step 2: Commit and Push
7. Check we're on the `dev` branch. If not, switch to it.
8. Run `git status` to see what changed.
9. If there are no changes, tell the user "Nothing new to save - you're up to date!" and stop.
10. Stage all changes: `git add -A`
11. Look at what changed and write a SHORT commit message describing what was done (e.g., "Add workout logging screen" or "Fix calorie calculation bug")
12. Commit with that message.
13. Push to origin: `git push origin dev`
14. Tell the user: "Done! Your changes are saved and Gustavo can see them on GitHub."

## Push to Main (`/push main`)

This puts your latest code on the main branch, then automatically uploads to TestFlight.

### Step 1: Quality Check (same as above)
Run the same quality check as dev push. For main, be stricter:
- All build errors AND warnings should be fixed
- No force unwraps allowed
- No debug print statements
- No TODO/FIXME left behind
If issues found, fix them and tell the user what you cleaned up.

### Step 2: Push Dev First
1. Make sure dev is clean and pushed (run the dev commit steps above if needed).

### Step 3: Merge to Main
2. Switch to main: `git checkout main`
3. Pull latest: `git pull origin main`
4. Merge dev into main: `git merge dev`
5. If there are merge conflicts:
   - Explain what happened simply: "Two changes touched the same code. Let me fix it."
   - Resolve the conflicts automatically
   - If you can't resolve them, tell the user to text Gustavo
6. Push to main: `git push origin main`

### Step 4: Upload to TestFlight
7. Tell the user: "Now uploading to TestFlight. This takes a few minutes — I'll let you know when it's done."
8. Run the Fastlane upload using the API key:
   ```bash
   cd /Users/albertpark/forge-app && fastlane beta_api
   ```
   This automatically:
   - Regenerates the Xcode project
   - Bumps the build number
   - Builds the app for release
   - Uploads to TestFlight using your API key (stored in fastlane/.env)
9. If the upload succeeds:
   - Tell the user: "Done! Your app is uploading to TestFlight. You'll get a notification on your iPhone in about 15-30 minutes when it's ready to install."
10. If the upload fails:
    - Read the error and explain it in plain English
    - Common fixes:
      - **Signing error**: "Your app signing needs to be set up in Xcode. Open Forge.xcodeproj → Forge target → Signing & Capabilities → select your team."
      - **Provisioning error**: Run `fastlane beta_api` again — sometimes it fixes itself
      - **Version/build conflict**: The build number already auto-increments, but if it still fails, manually set a higher number in project.yml
      - **API key error**: Check that fastlane/.env has the right ASC_KEY_ID, ASC_ISSUER_ID, and ASC_KEY_FILEPATH

### Step 5: Return to Dev
11. Switch back to dev: `git checkout dev`
12. Tell the user everything is done with a summary.

## Important
- Default is always `dev` - safe to run anytime
- `/push main` includes quality check + TestFlight upload automatically
- Write commit messages in plain English (not developer jargon)
- If push fails due to conflicts, explain what happened simply and help resolve it
- Always return to the `dev` branch after pushing to main
- The TestFlight upload uses your API key from fastlane/.env — no Apple ID login needed
- Quality checks run automatically — the user doesn't need to run `/quality` separately before pushing
