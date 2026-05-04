import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { recordRuntimeEvent } from "@/lib/supabase/pipeline";
import { buildFactorySvg } from "./local-svg-renderer";

function createRenderClient() {
  const env = getSupabaseEnv();

  if (!env.url) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured.");
  }

  if (env.serviceRoleKey) {
    return createClient(env.url, env.serviceRoleKey);
  }

  if (env.anonKey) {
    return createClient(env.url, env.anonKey);
  }

  throw new Error("No Supabase key configured.");
}

export async function getRenderDebugState() {
  const supabase = createRenderClient();

  const [jobs, assets] = await Promise.all([
    supabase.from("visual_jobs").select("id, job_key, title, output_type, status, stage").order("created_at", { ascending: false }).limit(5),
    supabase.from("assets").select("*").order("created_at", { ascending: false }).limit(5)
  ]);

  return {
    jobs: {
      data: jobs.data ?? [],
      error: jobs.error ? { code: jobs.error.code, message: jobs.error.message } : null
    },
    assets: {
      data: assets.data ?? [],
      error: assets.error ? { code: assets.error.code, message: assets.error.message } : null
    }
  };
}

export async function generateVisualJobAsset(jobId: string) {
  const supabase = createRenderClient();

  const { data: job, error: jobError } = await supabase
    .from("visual_jobs")
    .select("*")
    .eq("id", jobId)
    .maybeSingle();

  if (jobError) {
    throw new Error(`Visual job lookup failed: ${jobError.message}`);
  }

  if (!job?.id) {
    throw new Error(`Visual job not found: ${jobId}`);
  }

  const title = job.title ?? `Visual Factory Render ${job.job_key}`;
  const subtitle = job.brief_summary ?? "Rendered by AndyAI Visual Factory local render engine.";
  const outputType = job.output_type ?? "visual_asset";
  const stage = job.stage ?? job.status ?? "queued";
  const jobKey = job.job_key ?? `job_${Date.now()}`;

  const svg = buildFactorySvg({
    title,
    subtitle,
    jobKey,
    outputType,
    stage
  });

  const bucket = "visual-assets";
  const storagePath = `workspaces/${job.workspace_id}/jobs/${jobKey}/output_001.svg`;

  await recordRuntimeEvent({
    eventType: "render_started",
    sourceTable: "visual_jobs",
    sourceKey: jobKey,
    message: `Render started for ${jobKey}`
  });

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(storagePath, new Blob([svg], { type: "image/svg+xml" }), {
      contentType: "image/svg+xml",
      upsert: true
    });

  if (uploadError) {
    throw new Error(`Storage upload failed: ${uploadError.message}`);
  }

  const publicUrl = supabase.storage.from(bucket).getPublicUrl(storagePath).data.publicUrl;
  const assetKey = `asset_${Date.now()}`;

  const { data: asset, error: assetError } = await supabase
    .from("assets")
    .insert({
      asset_key: assetKey,
      workspace_id: job.workspace_id,
      visual_job_id: job.id,
      title,
      output_type: outputType,
      storage_bucket: bucket,
      storage_path: storagePath,
      public_url: publicUrl,
      mime_type: "image/svg+xml",
      width: 1600,
      height: 900,
      provider: "andyai_local_svg",
      model: "v9_local_svg_renderer",
      prompt_used: subtitle,
      status: "rendered"
    })
    .select("*")
    .single();

  if (assetError) {
    throw new Error(`Asset registry insert failed: ${assetError.message}`);
  }

  await supabase
    .from("visual_jobs")
    .update({
      status: "render_completed",
      stage: "asset_ready"
    })
    .eq("id", job.id);

  await recordRuntimeEvent({
    eventType: "asset_rendered",
    sourceTable: "assets",
    sourceKey: assetKey,
    message: `Asset rendered and stored for ${jobKey}`
  });

  return { job, asset, publicUrl };
}
