#!/usr/bin/env bash
set -euo pipefail

REPO_OWNER="kolundzic"
REPO_NAME="andyai-visual-factory"
REPO="${REPO_OWNER}/${REPO_NAME}"
REPO_DIR="${HOME}/Documents/Projects/${REPO_NAME}"
FINAL_TAG="v6.0.0"
COMMIT_MSG="MASTER-UDARAC v5.1.0 to v6.0.0 - Visual Factory Operator Console MVP"
TAGS=("v5.1.0" "v5.2.0" "v5.3.0" "v5.4.0" "v5.5.0" "v5.6.0" "v5.7.0" "v5.8.0" "v5.9.0" "v6.0.0")

echo "🔵 AndyAI Visual Factory — TAP 02 bootstrap/push"
cd "${REPO_DIR}"

command -v gh >/dev/null 2>&1 || { echo "🔴 GitHub CLI 'gh' is not installed."; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "🔴 Run: gh auth login"; exit 1; }

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
    echo "🟡 Tag exists: ${tag}"
  else
    git tag -a "${tag}" -m "${tag} - AndyAI Visual Factory Operator Console Milestone"
  fi
done

if gh repo view "${REPO}" >/dev/null 2>&1; then
  echo "🟡 GitHub repo already exists: ${REPO}"
else
  gh repo create "${REPO}" --public --description "Agentic brand-to-assets visual production runtime." --homepage "https://visualfactory.andyai.ai"
fi

REMOTE_URL="https://github.com/${REPO}.git"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "${REMOTE_URL}"
else
  git remote add origin "${REMOTE_URL}"
fi

git push -u origin main
for tag in "${TAGS[@]}"; do
  git push origin "${tag}"
done

echo "🟢 TAP 02 complete."
echo "🟢 GitHub: https://github.com/${REPO}"
echo "🟢 Final tag: ${FINAL_TAG}"
