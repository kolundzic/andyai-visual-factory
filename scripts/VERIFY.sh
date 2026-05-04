#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "docs/ux/POST_v6_0_0_UX_DIAGNOSIS.md"
  "docs/ux/HUMAN_CONTROL_UI_SPEC_v7.md"
  "docs/ux/FACTORY_COCKPIT_WIREFRAME.md"
  "docs/runtime/release/RELEASE_NOTES_v6_1_TO_v7_0.md"
  "components/factory/factory-request-panel.tsx"
  "components/factory/active-job-timeline.tsx"
  "components/factory/output-gallery.tsx"
  "components/factory/export-panel.tsx"
  "components/factory/recent-work.tsx"
  "app/factory/page.tsx"
  "app/outputs/page.tsx"
  "app/history/page.tsx"
  "app/api/factory/request/route.ts"
  "docs/vercel/POST_v7_REDEPLOY_GUIDE.md"
)

missing=0
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then
    echo "🟢 OK: $file"
  else
    echo "🔴 MISSING: $file"
    missing=1
  fi
done

if command -v python3 >/dev/null 2>&1; then
  echo "🔵 Validating JSON files..."
  python3 - <<'PY'
import json
from pathlib import Path
for path in list(Path(".").glob("*.json")) + list(Path("schemas").rglob("*.json")):
    with path.open("r", encoding="utf-8") as f:
        json.load(f)
    print(f"🟢 JSON OK: {path}")
PY
fi

[ "$missing" -eq 0 ] || { echo "🔴 VERIFY failed."; exit 1; }
echo "🟢 VERIFY passed."
