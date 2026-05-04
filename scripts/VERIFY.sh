#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "docs/render-engine/IMAGE_RENDER_ENGINE_SPEC_v9.md"
  "docs/render-engine/SUPABASE_STORAGE_PLAN.md"
  "docs/runtime/release/RELEASE_NOTES_v8_1_TO_v9_0.md"
  "docs/supabase/migrations/004_visual_factory_image_render_engine.sql"
  "lib/render/local-svg-renderer.ts"
  "lib/render/render-engine.ts"
  "app/api/factory/jobs/[jobId]/generate/route.ts"
  "app/api/factory/render/debug/route.ts"
  "app/api/factory/assets/route.ts"
  "components/render/rendered-assets-gallery.tsx"
  "scripts/COPY_RENDER_ENGINE_SQL_TO_CLIPBOARD.sh"
  "docs/vercel/POST_v9_REDEPLOY_GUIDE.md"
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

grep -n "buildFactorySvg" lib/render/local-svg-renderer.ts >/dev/null
grep -n "generateVisualJobAsset" lib/render/render-engine.ts >/dev/null

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
