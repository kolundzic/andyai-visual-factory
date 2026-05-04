#!/usr/bin/env bash
set -euo pipefail

SQL_FILE="docs/supabase/migrations/004_visual_factory_image_render_engine.sql"

if [ ! -f "$SQL_FILE" ]; then
  echo "🔴 Missing SQL file: $SQL_FILE"
  exit 1
fi

if ! command -v pbcopy >/dev/null 2>&1; then
  echo "🔴 pbcopy not found."
  exit 1
fi

cat "$SQL_FILE" | pbcopy
echo "🟢 Render Engine SQL copied to clipboard."
