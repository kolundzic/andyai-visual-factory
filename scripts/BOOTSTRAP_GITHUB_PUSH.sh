#!/usr/bin/env bash
set -euo pipefail

REPO_OWNER="kolundzic"
REPO_NAME="andyai-visual-factory"
REPO="${REPO_OWNER}/${REPO_NAME}"
REPO_DIR="${HOME}/Documents/Projects/${REPO_NAME}"
RELEASE_TAG="v0.1.0"

echo "🔵 TAP 02 helper — GitHub bootstrap and push"
echo "🔵 Repo: ${REPO}"

cd "${REPO_DIR}"

if ! command -v gh >/dev/null 2>&1; then
  echo "🔴 GitHub CLI 'gh' is not installed."
  echo "🔴 Install gh first or create remote manually."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "🔴 GitHub CLI is not authenticated."
  echo "🔴 Run: gh auth login"
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "🔴 Not inside a git repo."
  exit 1
fi

git branch -M main

if gh repo view "${REPO}" >/dev/null 2>&1; then
  echo "🟡 GitHub repo already exists: ${REPO}"
else
  echo "🔵 Creating GitHub repo..."
  gh repo create "${REPO}" \
    --public \
    --description "Agentic brand-to-assets pipeline for generating marketing visuals, UI mockups, infographics, merch, and design variations with human-guided selection." \
    --homepage "https://visualfactory.andyai.ai"
fi

REMOTE_URL="https://github.com/${REPO}.git"

if git remote get-url origin >/dev/null 2>&1; then
  echo "🟡 origin already exists. Setting canonical URL..."
  git remote set-url origin "${REMOTE_URL}"
else
  echo "🔵 Adding origin..."
  git remote add origin "${REMOTE_URL}"
fi

echo "🔵 Adding GitHub topics..."
gh repo edit "${REPO}" \
  --add-topic andyai \
  --add-topic visual-factory \
  --add-topic design-automation \
  --add-topic brand-system \
  --add-topic image-generation \
  --add-topic marketing-assets \
  --add-topic ui-mockups \
  --add-topic infographics \
  --add-topic prompt-library \
  --add-topic agentic-workflows \
  --add-topic creative-automation \
  --add-topic content-design \
  --add-topic visual-canon \
  --add-topic human-in-the-loop || true

echo "🔵 Running verify before push..."
bash scripts/VERIFY.sh

echo "🔵 Checking for uncommitted changes..."
git add .

if git diff --cached --quiet; then
  echo "🟡 No new changes to commit."
else
  git commit -m "v0.1.0 — Visual Factory Foundation Scaffold"
fi

if git rev-parse "${RELEASE_TAG}" >/dev/null 2>&1; then
  echo "🟡 Tag already exists locally: ${RELEASE_TAG}"
else
  git tag -a "${RELEASE_TAG}" -m "v0.1.0 — Visual Factory Foundation Scaffold"
fi

echo "🔵 Pushing main..."
git push -u origin main

echo "🔵 Pushing tag ${RELEASE_TAG}..."
git push origin "${RELEASE_TAG}"

echo "🟢 TAP 02 complete."
echo "🟢 GitHub: https://github.com/${REPO}"
echo "🟢 Release tag: ${RELEASE_TAG}"
