#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "lib/supabase/runtime-queries.ts"
  "components/empty-state.tsx"
  "components/live-data-badge.tsx"
  "app/dashboard/page.tsx"
  "app/workspaces/page.tsx"
  "app/jobs/page.tsx"
  "app/assets/page.tsx"
  "app/showcase/page.tsx"
  "docs/supabase/live-data/LIVE_DATA_QUERY_LAYER.md"
  "docs/supabase/live-data/FRONTEND_LIVE_DATA_MAP.md"
  "docs/vercel/LIVE_DATA_REDEPLOY_GUIDE.md"
  "docs/runtime/release/RELEASE_NOTES_v4_1_TO_v5_0.md"
)

missing=0
for file in "${required_files[@]}"; do
  if [ -f "$file" ]; then echo "🟢 OK: $file"; else echo "🔴 MISSING: $file"; missing=1; fi
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
