#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "README.md"
  "LICENSE"
  ".gitignore"
  "docs/ARCHITECTURE.md"
  "docs/PROJECT_POSITIONING.md"
  "docs/VISUAL_FACTORY_WORKFLOW.md"
  "docs/RELATIONSHIP_TO_VISUAL_CANON.md"
  "docs/ROADMAP.md"
  "docs/RELEASE_NOTES_v0_1_0.md"
  "brand/BRAND_INPUT_SPEC.md"
  "prompts/social-posts.md"
  "prompts/hero-sections.md"
  "prompts/infographics.md"
  "prompts/ui-mockups.md"
  "prompts/pricing-cards.md"
  "prompts/pitch-decks.md"
  "prompts/merch.md"
  "schemas/brand-input.schema.json"
  "schemas/generation-job.schema.json"
  "schemas/variation-selection.schema.json"
  "schemas/export-pack.schema.json"
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
else
  echo "🟡 python3 not found, skipping JSON validation."
fi

if [ "$missing" -ne 0 ]; then
  echo "🔴 VERIFY failed."
  exit 1
fi

echo "🟢 VERIFY passed."
