# Branch Management Guide

## Current Branch Status

This repository has accumulated multiple branches from various development efforts. This guide will help you understand and manage them effectively.

## Branch Categories

### Active Development Branches
These branches have **open PRs** and should NOT be deleted:
- `copilot/manage-git-branches` - PR #39 (WIP: Branch management)
- `copilot/revert-catch-all-route-change` - PR #38 (Restore NotFound component)
- `copilot/replace-placeholder-divs` - PR #36 (Replace placeholder divs)
- `copilot/refactor-username-route` - PR #34 (Fix username route)
- `copilot/fix-unprotected-management-routes` - PR #32 (Protect studio routes)
- `tmfurr97-prog-patch-1` - PR #30 (Refactor routes and lazy loading)

### Merged Branches (Safe to Delete)
These branches were merged and can be safely deleted:
- `agent/how-can-improve-97-s9-blackbox`
- `agent/how-can-improve-97-s9-codex`
- `agent/what-can-you-do-for-my-site-51-dy`
- `codex/conduct-codebase-audit-for-refurrm-creator-store`
- `codex/enable-admin-access-to-premium-features`
- `codex/merge-repo-as-main-branch`
- `codex/merge-repo-as-main-branch-w0b3yz`
- `vercel/setup-vercel-speed-insights-fo-jc325v`

### Protected Branches
- `main` - Production branch, **DO NOT DELETE**

## Branch Naming Conventions

To keep branches organized, use these naming conventions:

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Urgent production fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates
- `copilot/description` - GitHub Copilot generated branches
- `agent/description` - AI agent generated branches

## How to Clean Up Branches

### Manual Cleanup

#### Delete local branches:
```bash
# Delete a single local branch
git branch -d branch-name

# Force delete if not merged
git branch -D branch-name
```

#### Delete remote branches:
```bash
# Delete a single remote branch
git push origin --delete branch-name

# Delete multiple remote branches
git push origin --delete branch1 branch2 branch3
```

### Automated Cleanup

We've provided a cleanup script that can delete merged branches automatically.

#### Using the cleanup script:
```bash
# Dry run (preview what will be deleted)
./scripts/cleanup-branches.sh --dry-run

# Delete merged branches (interactive)
./scripts/cleanup-branches.sh

# Delete merged branches (automatic, non-interactive)
./scripts/cleanup-branches.sh --force
```

### GitHub Web Interface

1. Go to https://github.com/ReFurrm/store.refurrm.app/branches
2. Find branches with "Merged" status
3. Click the trash icon to delete them

## Automated Branch Protection

A GitHub Action workflow runs weekly to:
1. Identify merged branches older than 7 days
2. Create an issue with a list of branches that can be deleted
3. Optionally auto-delete them (if enabled)

## Best Practices

1. **Delete branches after merging PRs** - Use GitHub's "Delete branch" button after merging
2. **Regular cleanup** - Review branches monthly
3. **Clear naming** - Use descriptive branch names
4. **Short-lived branches** - Keep branches focused and merge quickly
5. **Don't hoard branches** - If a branch is abandoned, delete it

## FAQ

### Q: How do I know if a branch is safe to delete?
A: A branch is safe to delete if:
- Its PR was merged into main
- It has no open PR
- It's not the main branch
- You don't have uncommitted work on it

### Q: What if I delete a branch by mistake?
A: You can restore it using the commit SHA:
```bash
git checkout -b branch-name <commit-sha>
git push origin branch-name
```

### Q: Should I delete branches with closed but unmerged PRs?
A: Review the PR first. If the work is no longer needed, yes. If you might revisit it, keep it but add a comment.

### Q: How do I find my branch's last commit SHA?
A: 
```bash
# View all branches with their last commit
git branch -a -v

# Or check GitHub at:
# https://github.com/ReFurrm/store.refurrm.app/branches/all
```

## Quick Commands Reference

```bash
# List all local branches
git branch

# List all remote branches
git branch -r

# List all branches (local and remote)
git branch -a

# Show merged branches
git branch --merged main

# Show unmerged branches
git branch --no-merged main

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Prune deleted remote branches from local
git fetch --prune

# See when branches were last updated
git for-each-ref --sort=-committerdate refs/heads/ --format='%(committerdate:short) %(refname:short)'
```

## Summary

**Current Status:**
- 🟢 **6 active branches** with open PRs
- 🟡 **7-8 merged branches** that can be deleted
- 🔵 **1 protected branch** (main)

**Recommended Action:**
Run the cleanup script or manually delete the merged branches listed above to keep the repository clean and organized.
