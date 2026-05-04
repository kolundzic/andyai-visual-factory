#!/usr/bin/env bash
set -euo pipefail

REPO_OWNER="kolundzic"
REPO_NAME="andyai-visual-factory"
REPO="${REPO_OWNER}/${REPO_NAME}"
REPO_DIR="${HOME}/Documents/Projects/${REPO_NAME}"
FINAL_TAG="v3.0.0"
COMMIT_MSG="VERCEL MASTER-UDARAC v2.1.0 to v3.0.0 - Visual Factory Cloud MVP"

TAGS=(
  "v2.1.0"
  "v2.2.0"
  "v2.3.0"
  "v2.4.0"
  "v2.5.0"
  "v2.6.0"
  "v2.7.0"
  "v2.8.0"
  "v2.9.0"
  "v3.0.0"
)

echo "🔵 AndyAI Visual Factory — TAP 02 bootstrap/push"
cd "${REPO_DIR}"

if ! command -v gh >/dev/null 2>&1; then
  echo "🔴 GitHub CLI 'gh' is not installed."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "🔴 GitHub CLI is not authenticated."
  echo "🔴 Run: gh auth login"
  exit 1
fi

git branch -M main
bash scripts/VERIFY.sh

git add .

if git diff --cached --quiet; then
  echo "🟡 No staged changes."
else
  git commit -m "${COMMIT_MSG}"
fi

for tag in "${TAGS[@]}"; do
  if git rev-parse "${tag}" >/dev/null 2>&1; then
    echo "🟡 Tag already exists locally: ${tag}"
  else
    git tag -a "${tag}" -m "${tag} - AndyAI Visual Factory Vercel Milestone"
  fi
done

if gh repo view "${REPO}" >/dev/null 2>&1; then
  echo "🟡 GitHub repo already exists: ${REPO}"
else
  gh repo create "${REPO}" \
    --public \
    --description "Agentic brand-to-assets pipeline for generating marketing visuals, UI mockups, infographics, merch, and design variations with human-guided selection." \
    --homepage "https://visualfactory.andyai.ai"
fi

REMOTE_URL="https://github.com/${REPO}.git"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "${REMOTE_URL}"
else
  git remote add origin "${REMOTE_URL}"
fi

# Keep under GitHub's 20 topic limit.
gh repo edit "${REPO}" \
  --add-topic andyai \
  --add-topic visual-factory \
  --add-topic vercel \
  --add-topic nextjs \
  --add-topic supabase-ready \
  --add-topic visual-runtime \
  --add-topic design-automation \
  --add-topic asset-registry \
  --add-topic prompt-compiler \
  --add-topic human-in-the-loop || true

git push -u origin main

for tag in "${TAGS[@]}"; do
  git push origin "${tag}"
done

echo "🟢 TAP 02 complete."
echo "🟢 GitHub: https://github.com/${REPO}"
echo "🟢 Final tag: ${FINAL_TAG}"
