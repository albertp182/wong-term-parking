#!/bin/bash
# permission-help.sh — Beginner-friendly context for permission prompts
# Reads tool info from stdin JSON, returns "ask" with helpful context

INPUT=$(cat)

TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
DESCRIPTION=$(echo "$INPUT" | jq -r '.tool_input.description // empty')

case "$TOOL_NAME" in
  Bash)
    # Extract just the base command for context
    BASE_CMD=$(echo "$COMMAND" | awk '{print $1}' | sed 's|.*/||')
    case "$BASE_CMD" in
      xcodebuild)
        TIP="This builds your app — like baking the recipe into an actual meal. It checks for errors and creates the app file."
        ;;
      xcodegen)
        TIP="This regenerates your Xcode project file from the config. Think of it like refreshing a spreadsheet."
        ;;
      git)
        TIP="This is a version control command — it saves or shares your code. Like saving a Google Doc or sharing it with someone."
        ;;
      rm|rm\ -rf)
        TIP="This DELETES files. Make sure you're OK with what's being removed. Claude usually only deletes temporary/cache files."
        ;;
      open)
        TIP="This opens something on your Mac — could be Xcode, a file, or the simulator."
        ;;
      curl)
        TIP="This fetches something from the internet — usually checking if a service is running."
        ;;
      swift)
        TIP="This runs Swift code directly. Safe for testing small things."
        ;;
      fastlane)
        TIP="This handles app signing and uploading to TestFlight. It's the shipping step."
        ;;
      *)
        TIP="Claude wants to run a terminal command: $BASE_CMD. If you're not sure what it does, click Deny and ask 'what does $BASE_CMD do?'"
        ;;
    esac
    ;;
  Write)
    EXT="${FILE_PATH##*.}"
    case "$EXT" in
      swift)
        TIP="Claude is creating a new Swift file — this adds a new piece to your app (a screen, data model, or helper)."
        ;;
      md)
        TIP="Claude is creating a documentation file — notes about the project, not actual app code."
        ;;
      *)
        TIP="Claude is creating a new file at: $FILE_PATH"
        ;;
    esac
    ;;
  Edit)
    TIP="Claude is editing an existing file. Think of it like making changes to a Google Doc — git saves the old version so you can always go back."
    ;;
  *)
    # Read, Glob, Grep, WebFetch etc — these are safe, don't add noise
    # Return empty to let them through without extra context
    exit 0
    ;;
esac

# Return structured response with beginner context
jq -n \
  --arg tip "$TIP" \
  --arg desc "$DESCRIPTION" \
  '{
    "hookSpecificOutput": {
      "hookEventName": "PreToolUse",
      "permissionDecision": "ask",
      "additionalContext": ("BEGINNER TIP: " + $tip)
    }
  }'

exit 0
