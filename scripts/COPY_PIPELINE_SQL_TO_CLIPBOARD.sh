#!/usr/bin/env bash
set -euo pipefail

SQL_FILE="docs/supabase/migrations/003_visual_factory_pipeline_mvp.sql"

if [ ! -f "$SQL_FILE" ]; then
  echo "🔴 Missing SQL file: $SQL_FILE"
  exit 1
fi

if ! command -v pbcopy >/dev/null 2>&1; then
  echo "🔴 pbcopy not found."
  exit 1
fi

cat "$SQL_FILE" | pbcopy
echo "🟢 Pipeline SQL copied to clipboard."
