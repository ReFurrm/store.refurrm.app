#!/bin/bash

# Branch Cleanup Script
# This script helps identify and delete merged branches

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DEFAULT_BRANCH="main"
DRY_RUN=false
FORCE=false
INTERACTIVE=true

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --force)
      FORCE=true
      INTERACTIVE=false
      shift
      ;;
    --help)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --dry-run    Preview what would be deleted without deleting"
      echo "  --force      Delete branches without prompting (use with caution)"
      echo "  --help       Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Print header
echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Branch Cleanup Script${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Ensure we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo -e "${RED}Error: Not in a git repository${NC}"
  exit 1
fi

# Fetch latest changes
echo -e "${YELLOW}Fetching latest changes...${NC}"
git fetch --prune

# Get the current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "Current branch: ${GREEN}${CURRENT_BRANCH}${NC}"
echo ""

# Find merged local branches
echo -e "${YELLOW}Finding merged local branches...${NC}"
MERGED_LOCAL_BRANCHES=$(git branch --merged "$DEFAULT_BRANCH" | grep -v "^\*" | grep -v "$DEFAULT_BRANCH" | sed 's/^[[:space:]]*//' || true)

# Find merged remote branches
echo -e "${YELLOW}Finding merged remote branches...${NC}"
MERGED_REMOTE_BRANCHES=$(git branch -r --merged "$DEFAULT_BRANCH" | grep -v "$DEFAULT_BRANCH" | grep -v "HEAD" | sed 's|^[[:space:]]*origin/||' || true)

# Count branches
LOCAL_COUNT=$(echo "$MERGED_LOCAL_BRANCHES" | grep -v "^$" | wc -l || echo "0")
REMOTE_COUNT=$(echo "$MERGED_REMOTE_BRANCHES" | grep -v "^$" | wc -l || echo "0")

echo ""
echo -e "${BLUE}Summary:${NC}"
echo -e "  Local branches merged into $DEFAULT_BRANCH: ${GREEN}${LOCAL_COUNT}${NC}"
echo -e "  Remote branches merged into $DEFAULT_BRANCH: ${GREEN}${REMOTE_COUNT}${NC}"
echo ""

# Display local branches to be deleted
if [ "$LOCAL_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}Local branches that can be deleted:${NC}"
  echo "$MERGED_LOCAL_BRANCHES" | while read -r branch; do
    if [ -n "$branch" ]; then
      echo -e "  ${RED}✗${NC} $branch"
    fi
  done
  echo ""
else
  echo -e "${GREEN}No local merged branches to delete${NC}"
  echo ""
fi

# Display remote branches to be deleted
if [ "$REMOTE_COUNT" -gt 0 ]; then
  echo -e "${YELLOW}Remote branches that can be deleted:${NC}"
  echo "$MERGED_REMOTE_BRANCHES" | while read -r branch; do
    if [ -n "$branch" ]; then
      echo -e "  ${RED}✗${NC} $branch"
    fi
  done
  echo ""
else
  echo -e "${GREEN}No remote merged branches to delete${NC}"
  echo ""
fi

# Exit if dry run
if [ "$DRY_RUN" = true ]; then
  echo -e "${BLUE}Dry run complete. No branches were deleted.${NC}"
  echo -e "${BLUE}Run without --dry-run to delete these branches.${NC}"
  exit 0
fi

# Exit if no branches to delete
if [ "$LOCAL_COUNT" -eq 0 ] && [ "$REMOTE_COUNT" -eq 0 ]; then
  echo -e "${GREEN}Nothing to delete!${NC}"
  exit 0
fi

# Confirm deletion
if [ "$INTERACTIVE" = true ]; then
  echo -e "${YELLOW}Do you want to delete these branches? (y/n)${NC}"
  read -r response
  if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}Aborted. No branches were deleted.${NC}"
    exit 0
  fi
fi

# Delete local branches
if [ "$LOCAL_COUNT" -gt 0 ]; then
  echo ""
  echo -e "${YELLOW}Deleting local branches...${NC}"
  echo "$MERGED_LOCAL_BRANCHES" | while read -r branch; do
    if [ -n "$branch" ]; then
      if git branch -d "$branch" 2>/dev/null; then
        echo -e "  ${GREEN}✓${NC} Deleted local branch: $branch"
      else
        echo -e "  ${RED}✗${NC} Failed to delete local branch: $branch"
      fi
    fi
  done
fi

# Delete remote branches
if [ "$REMOTE_COUNT" -gt 0 ]; then
  echo ""
  echo -e "${YELLOW}Deleting remote branches...${NC}"
  echo "$MERGED_REMOTE_BRANCHES" | while read -r branch; do
    if [ -n "$branch" ]; then
      if git push origin --delete "$branch" 2>/dev/null; then
        echo -e "  ${GREEN}✓${NC} Deleted remote branch: $branch"
      else
        echo -e "  ${YELLOW}⚠${NC}  Could not delete remote branch: $branch (may not exist or no permissions)"
      fi
    fi
  done
fi

echo ""
echo -e "${GREEN}Cleanup complete!${NC}"
echo ""
echo -e "${BLUE}Tip: Run 'git fetch --prune' to update your local repository.${NC}"

