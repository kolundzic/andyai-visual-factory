#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "README.md"
  "docs/runtime/workspace/PROJECT_WORKSPACE_MODEL.md"
  "docs/runtime/workspace/WORKSPACE_FOLDER_CONTRACT.md"
  "docs/runtime/workspace/WORKSPACE_MANIFEST_SPEC.md"
  "docs/runtime/brand-pack-runtime/BRAND_PACK_RUNTIME.md"
  "docs/runtime/brand-pack-runtime/BRAND_PACK_FIELDS.md"
  "docs/runtime/project-context/PROJECT_CONTEXT_MODEL.md"
  "docs/runtime/workspace-lifecycle/WORKSPACE_LIFECYCLE.md"
  "docs/runtime/workspace-lifecycle/WORKSPACE_QUALITY_CHECKLIST.md"
  "docs/runtime/roadmap/RUNTIME_ROADMAP_v1_2_TO_v2_0.md"
  "docs/runtime/release/RELEASE_NOTES_v1_2_0.md"
  "docs/RUNTIME_VERSION_LADDER_v1_2_TO_v2_0.md"
  "schemas/runtime/workspace.schema.json"
  "schemas/runtime/brand-pack.schema.json"
  "schemas/runtime/project-context.schema.json"
  "schemas/runtime/workspace-manifest.schema.json"
  "examples/runtime/sample-workspaces/andyai-demo-workspace/workspace-manifest.yaml"
  "examples/runtime/sample-workspaces/andyai-demo-workspace/brand-pack/brand-pack.yaml"
  "examples/runtime/sample-workspaces/andyai-demo-workspace/jobs/job_hero_001.yaml"
  "examples/runtime/sample-workspaces/andyai-demo-workspace/prompts/hero_prompt_001.md"
  "examples/runtime/sample-brand-packs/andyai-visual-factory-brand-pack.yaml"
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
