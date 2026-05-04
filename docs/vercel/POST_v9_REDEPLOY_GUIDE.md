# Post-v9 Redeploy Guide

## 1. Run SQL

```bash
cd ~/Documents/Projects/andyai-visual-factory-v800-fresh
bash scripts/COPY_RENDER_ENGINE_SQL_TO_CLIPBOARD.sh
```

Then paste into Supabase SQL Editor and run.

## 2. Redeploy Vercel

Deploy latest main.

## 3. Test

```bash
curl -s https://visualfactory.andyai.ai/api/factory/render/debug
curl -s https://visualfactory.andyai.ai/api/factory/assets
```

Create a job, then generate it:

```bash
curl -s -X POST https://visualfactory.andyai.ai/api/factory/jobs/<JOB_ID>/generate
```
