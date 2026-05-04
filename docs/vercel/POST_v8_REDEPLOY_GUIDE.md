# Post-v8 Redeploy Guide

After pushing v8.0.0:

1. Run SQL migration 003_visual_factory_pipeline_mvp.sql in Supabase.
2. Redeploy latest main in Vercel.
3. Test:
   - /factory
   - /outputs
   - /api/jobs
   - /api/factory/request
