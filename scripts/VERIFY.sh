#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "README.md"
  "docs/brand-input/BRAND_BOOK_TEMPLATE.md"
  "docs/brand-input/BRAND_CONTEXT_TEMPLATE.yaml"
  "docs/brand-input/VISUAL_CANON_INPUT_MAP.md"
  "docs/brand-input/LOGO_USAGE_GUIDE.md"
  "docs/brand-input/BRAND_VALIDATION_CHECKLIST.md"
  "docs/prompt-library/PROMPT_LIBRARY_FOUNDATION.md"
  "docs/variation-grid/VARIATION_GRID_PROTOCOL.md"
  "docs/export-pack/EXPORT_PACK_STANDARD.md"
  "docs/visual-memory/VISUAL_MEMORY_STANDARD.md"
  "docs/provider-adapters/PROVIDER_ADAPTER_SPEC.md"
  "docs/ui-pipeline/UI_MOCKUP_TO_COMPONENT_WORKFLOW.md"
  "docs/public-showcase/PUBLIC_SHOWCASE_PACK.md"
  "docs/release/CANONICAL_RELEASE_CHECKLIST.md"
  "docs/VERSION_LADDER_v0_2_TO_v1_0.md"
  "schemas/palette.schema.json"
  "schemas/typography.schema.json"
  "schemas/visual-memory.schema.json"
  "schemas/selection-evidence.schema.json"
  "schemas/provider-capabilities.schema.json"
  "examples/brand-inputs/andyai-visual-factory-brand-context.yaml"
  "examples/output-specs/hero-output-spec.yaml"
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
  echo "🔵 Validating JSON schemas..."
  python3 - <<'PY'
import json
from pathlib import Path
for path in Path("schemas").glob("*.json"):
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
