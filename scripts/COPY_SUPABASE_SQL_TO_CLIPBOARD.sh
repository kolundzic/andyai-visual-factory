#!/usr/bin/env bash
set -euo pipefail
SQL_FILE="docs/supabase/migrations/001_visual_factory_runtime.sql"
[ -f "$SQL_FILE" ] || { echo "🔴 Missing migration SQL"; exit 1; }
command -v pbcopy >/dev/null 2>&1 || { echo "🔴 pbcopy not found"; exit 1; }
cat "$SQL_FILE" | pbcopy
echo "🟢 Migration SQL copied to clipboard."
