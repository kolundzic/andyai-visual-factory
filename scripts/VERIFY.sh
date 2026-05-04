#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "package.json"
  ".env.example"
  "app/api/supabase-health/route.ts"
  "lib/supabase/env.ts"
  "lib/supabase/client.ts"
  "lib/supabase/server.ts"
  "docs/supabase/migrations/001_visual_factory_runtime.sql"
  "docs/supabase/seeds/001_visual_factory_demo_seed.sql"
  "docs/supabase/setup/SUPABASE_SETUP_GUIDE.md"
  "docs/supabase/runtime/RUNTIME_TABLE_MAP.md"
  "docs/supabase/runtime/FRONTEND_TO_SUPABASE_MAP.md"
  "docs/supabase/runtime/RLS_POLICY_NOTES.md"
  "docs/vercel/VERCEL_SUPABASE_ENV_WIRING.md"
  "docs/runtime/release/RELEASE_NOTES_v3_1_TO_v4_0.md"
  "scripts/COPY_SUPABASE_SQL_TO_CLIPBOARD.sh"
  "scripts/COPY_SUPABASE_SEED_TO_CLIPBOARD.sh"
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
