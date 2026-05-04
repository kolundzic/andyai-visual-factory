#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "README.md"
  "docs/runtime/prompt-compiler/PROMPT_COMPILER_SPEC.md"
  "docs/runtime/visual-brief/VISUAL_BRIEF_GENERATOR.md"
  "docs/runtime/visual-brief/VISUAL_BRIEF_TEMPLATE.md"
  "docs/runtime/variation-grid-runtime/VARIATION_GRID_RUNTIME.md"
  "docs/runtime/selection-ledger/HUMAN_SELECTION_LEDGER.md"
  "docs/runtime/selection-ledger/VARIANT_SCORECARD.md"
  "docs/runtime/asset-registry/ASSET_REGISTRY.md"
  "docs/runtime/export-builder/EXPORT_PACK_BUILDER.md"
  "docs/runtime/export-builder/ASSET_NAMING_STANDARD.md"
  "docs/runtime/visual-memory-runtime/VISUAL_MEMORY_RUNTIME.md"
  "docs/runtime/winning-style-database/WINNING_STYLE_DATABASE.md"
  "docs/runtime/winning-style-database/MEMORY_PROMOTION_RULES.md"
  "docs/runtime/provider-runtime/PROVIDER_RUNTIME.md"
  "docs/runtime/cost-risk-controls/COST_CONTROL.md"
  "docs/runtime/cost-risk-controls/RISK_CONTROL.md"
  "docs/runtime/cost-risk-controls/FALLBACK_POLICY.md"
  "docs/runtime/showcase-gallery/SHOWCASE_GALLERY.md"
  "docs/runtime/case-study-builder/CASE_STUDY_BUILDER.md"
  "docs/runtime/case-study-builder/BEFORE_AFTER_TEMPLATE.md"
  "docs/runtime/saas-product-layer/SAAS_PRODUCT_MODEL.md"
  "docs/runtime/saas-product-layer/PRICING_MODEL.md"
  "docs/runtime/user-team-workflow/USER_WORKFLOW.md"
  "docs/runtime/user-team-workflow/TEAM_WORKFLOW.md"
  "docs/runtime/v2-engine/VISUAL_FACTORY_RUNTIME_ENGINE.md"
  "docs/runtime/v2-engine/V2_ARCHITECTURE.md"
  "docs/runtime/v2-engine/V2_RELEASE_CHECKLIST.md"
  "docs/runtime/roadmap/RUNTIME_ROADMAP_v1_3_TO_v2_0.md"
  "schemas/runtime/prompt-compiler.schema.json"
  "schemas/runtime/visual-brief.schema.json"
  "schemas/runtime/selection-ledger.schema.json"
  "schemas/runtime/asset-registry.schema.json"
  "schemas/runtime/provider-runtime.schema.json"
  "schemas/runtime/saas-workflow.schema.json"
  "schemas/runtime/case-study.schema.json"
  "examples/runtime/compiled-prompts/hero_compiled_prompt.md"
  "examples/runtime/visual-briefs/hero_visual_brief.yaml"
  "examples/runtime/selection-ledgers/hero_selection_ledger.yaml"
  "examples/runtime/asset-registry/hero_asset.yaml"
  "examples/runtime/export-packs/hero_export_pack.yaml"
  "examples/runtime/visual-memory/winning_style_note.yaml"
  "examples/runtime/case-studies/hero_case_study.md"
  "examples/runtime/saas-workflows/creator_workflow.yaml"
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
for path in Path("schemas").rglob("*.json"):
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
