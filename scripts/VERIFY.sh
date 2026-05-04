#!/usr/bin/env bash
set -euo pipefail

echo "🔵 AndyAI Visual Factory — VERIFY"

required_files=(
  "README.md"
  "docs/runtime/RUNTIME_OVERVIEW.md"
  "docs/runtime/job-model/VISUAL_JOB_MODEL.md"
  "docs/runtime/production-request/PRODUCTION_REQUEST_SPEC.md"
  "docs/runtime/job-lifecycle/JOB_LIFECYCLE.md"
  "docs/runtime/job-lifecycle/JOB_STATUS_TABLE.md"
  "docs/runtime/queue/JOB_QUEUE_NOTES.md"
  "docs/runtime/roadmap/RUNTIME_ROADMAP_v1_1_TO_v2_0.md"
  "docs/runtime/release/RELEASE_NOTES_v1_1_0.md"
  "docs/RUNTIME_VERSION_LADDER_v1_1_TO_v2_0.md"
  "schemas/runtime/visual-job.schema.json"
  "schemas/runtime/production-request.schema.json"
  "schemas/runtime/job-status.schema.json"
  "schemas/runtime/job-event.schema.json"
  "examples/runtime/sample-requests/hero-production-request.yaml"
  "examples/runtime/sample-jobs/hero-visual-job.yaml"
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
