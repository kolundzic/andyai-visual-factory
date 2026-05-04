#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "docs/pipeline/POST_v7_0_1_STATUS_REPORT.md"
  "docs/pipeline/PRODUCTION_PIPELINE_SPEC_v8.md"
  "docs/runtime/release/RELEASE_NOTES_v7_1_TO_v8_0.md"
  "docs/supabase/migrations/003_visual_factory_pipeline_mvp.sql"
  "lib/supabase/pipeline.ts"
  "app/api/factory/request/route.ts"
  "app/api/jobs/route.ts"
  "app/api/review/approve/route.ts"
  "app/api/review/reject/route.ts"
  "app/api/review/regenerate/route.ts"
  "app/api/selection/route.ts"
  "app/api/export-packs/route.ts"
  "components/pipeline/production-board.tsx"
  "components/pipeline/output-candidates.tsx"
  "components/pipeline/recent-events.tsx"
  "app/outputs/page.tsx"
  "scripts/COPY_PIPELINE_SQL_TO_CLIPBOARD.sh"
  "docs/vercel/POST_v8_REDEPLOY_GUIDE.md"
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
