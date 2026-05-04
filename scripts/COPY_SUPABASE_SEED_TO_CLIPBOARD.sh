#!/usr/bin/env bash
set -euo pipefail
SEED_FILE="docs/supabase/seeds/001_visual_factory_demo_seed.sql"
[ -f "$SEED_FILE" ] || { echo "🔴 Missing seed SQL"; exit 1; }
command -v pbcopy >/dev/null 2>&1 || { echo "🔴 pbcopy not found"; exit 1; }
cat "$SEED_FILE" | pbcopy
echo "🟢 Seed SQL copied to clipboard."
