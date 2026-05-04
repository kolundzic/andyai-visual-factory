#!/usr/bin/env bash
set -euo pipefail

REPO_OWNER="kolundzic"
REPO_NAME="andyai-visual-factory"
REPO="${REPO_OWNER}/${REPO_NAME}"
REPO_DIR="${HOME}/Documents/Projects/${REPO_NAME}"
RELEASE_TAG="v1.1.0"
COMMIT_MSG="v1.1.0 - Visual Job Model + Production Request Schema (MASTER-UDARAC)"

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

if git rev-parse "${RELEASE_TAG}" >/dev/null 2>&1; then
  echo "🟡 Tag already exists locally: ${RELEASE_TAG}"
else
  git tag -a "${RELEASE_TAG}" -m "${COMMIT_MSG}"
fi

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

gh repo edit "${REPO}" \
  --add-topic andyai \
  --add-topic visual-factory \
  --add-topic design-automation \
  --add-topic visual-runtime \
  --add-topic job-model \
  --add-topic production-request \
  --add-topic brand-system \
  --add-topic image-generation \
  --add-topic marketing-assets \
  --add-topic ui-mockups \
  --add-topic infographics \
  --add-topic prompt-library \
  --add-topic agentic-workflows \
  --add-topic creative-automation \
  --add-topic visual-canon \
  --add-topic human-in-the-loop || true

git push -u origin main
git push origin "${RELEASE_TAG}"

echo "🟢 TAP 02 complete."
echo "🟢 GitHub: https://github.com/${REPO}"
echo "🟢 Tag: ${RELEASE_TAG}"
