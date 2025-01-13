#!/bin/bash

# Check if there are any changes to commit
if git diff-index --quiet HEAD --; then
  echo "No changes to commit. Exiting."
  exit 0
fi

# Stage all changes
echo "Staging all changes..."
git add .

# Generate a generic commit message with the current date and time
COMMIT_MESSAGE="Auto-commit on $(date +"%Y-%m-%d %H:%M:%S")"

# Commit the changes
echo "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Push to the current branch
echo "Pushing changes to remote repository..."
git push

echo "Done!"
