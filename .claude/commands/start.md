# First-Time Setup

You are helping a COMPLETE BEGINNER set up their iOS development environment. They have never coded before. Explain EVERYTHING in plain English. No jargon.

## Steps

### 1. Check Prerequisites
Run these checks and report what's missing:
- Is Xcode installed? (`xcode-select -p`)
- Is Homebrew installed? (`which brew`)
- Is XcodeGen installed? (`which xcodegen`)
- Is git configured? (`git config user.name && git config user.email`)

For anything missing, walk them through installing it step by step.

### 2. Install XcodeGen (if missing)
```bash
brew install xcodegen
```
Explain: "XcodeGen creates the project file that Xcode needs to build your app. You only need to do this once."

### 3. Generate Xcode Project
```bash
cd /path/to/forge-app && xcodegen generate
```
Explain: "This creates the Forge.xcodeproj file that lets Xcode build your app."

### 4. Set Up User Profile
Ask the user these questions one at a time:
1. "What's your name?" (for the app's welcome screen)
2. "What's your main fitness goal?" (Lose fat / Build muscle / Maintain / General fitness)
3. "How would you describe your experience level?" (Beginner / Intermediate / Advanced)
4. "Do you currently run?" (Yes - how often? / No but I want to start / Not interested)
5. "Any dietary restrictions?" (None / Vegetarian / Vegan / Keto / Other)
6. "What's your height and weight?" (for calorie calculations)

Save their answers to `Forge/App/UserProfile.swift` as default values.

### 5. Open in Xcode
```bash
open Forge.xcodeproj
```
Explain: "This opens your app in Xcode. You'll see the code on the left and a preview on the right. You don't need to touch Xcode much - Claude Code will make the changes for you."

### 6. First Build
Tell them: "Let's make sure everything works. In Xcode, click the Play button (▶) at the top left, or I can run it for you with `/build`."

### 7. Explain What's Next
"You're all set! Here's what you can do now:
- Tell me what you want to build first (workouts? running? meals?)
- Type /help anytime you're confused
- Type /push when you want to save your work so Gustavo can see it
- Just talk to me in plain English - I'll handle the code"
