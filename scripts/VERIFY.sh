#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "docs/status/POST_v5_0_0_STATUS_REPORT.md"
  "docs/runtime/ops/OPERATOR_CONSOLE_PLAN_v6.md"
  "docs/runtime/ops/LIVE_OPS_CHECKLIST.md"
  "docs/runtime/release/RELEASE_NOTES_v5_1_TO_v6_0.md"
  "docs/supabase/migrations/002_visual_factory_live_ops.sql"
  "docs/supabase/live-ops/LIVE_OPS_SQL_GUIDE.md"
  "docs/vercel/POST_v6_REDEPLOY_GUIDE.md"
  "docs/status/PUBLIC_PROOF_PACK_v6.md"
  "lib/supabase/live-ops.ts"
  "app/api/runtime/summary/route.ts"
  "app/api/production-requests/route.ts"
  "components/operator-link-grid.tsx"
  "app/operator/page.tsx"
  "app/requests/new/page.tsx"
  "app/assets/[assetKey]/page.tsx"
  "scripts/COPY_LIVE_OPS_SQL_TO_CLIPBOARD.sh"
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
