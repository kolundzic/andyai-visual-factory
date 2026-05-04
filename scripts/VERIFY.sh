#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "package.json"
  "next.config.mjs"
  "tsconfig.json"
  "app/layout.tsx"
  "app/page.tsx"
  "app/globals.css"
  "app/dashboard/page.tsx"
  "app/workspaces/page.tsx"
  "app/jobs/page.tsx"
  "app/assets/page.tsx"
  "app/showcase/page.tsx"
  "app/api/health/route.ts"
  "components/visual-factory-hero.tsx"
  "components/runtime-flow.tsx"
  "components/workspace-card.tsx"
  "components/job-card.tsx"
  "components/asset-card.tsx"
  "components/status-badge.tsx"
  "lib/sample-data.ts"
  "lib/types.ts"
  "lib/runtime-map.ts"
  "docs/vercel/VERCEL_DEPLOYMENT.md"
  "docs/cloud/CLOUD_MVP_PLAN_v2_1_TO_v3_0.md"
  "docs/supabase/SUPABASE_SCHEMA_PREP.md"
  "docs/runtime/roadmap/VERCEL_ROADMAP_v2_1_TO_v3_0.md"
  "docs/runtime/release/RELEASE_NOTES_v2_1_TO_v3_0.md"
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

if [ "$missing" -ne 0 ]; then
  echo "🔴 VERIFY failed."
  exit 1
fi

echo "🟢 VERIFY passed."
