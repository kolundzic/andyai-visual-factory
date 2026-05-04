import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

function createPipelineClient() {
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

export async function createVisualJobFromRequest(input: {
  productionRequestId: string;
  workspaceId: string;
  requestKey: string;
  outputType: string;
  goal: string;
}) {
  const supabase = createPipelineClient();

  const { data: created, error } = await supabase
    .from("visual_jobs")
    .insert({
      job_key: `job_${Date.now()}`,
      workspace_id: input.workspaceId,
      production_request_id: input.productionRequestId,
      title: `Pipeline job for ${input.outputType}`,
      status: "queued",
      stage: "brief_ready",
      provider_target: "openai_image",
      model_target: "gpt-image",
      prompt_compiler_version: "v8_pipeline_mvp",
      brief_summary: input.goal
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Visual job creation failed: ${error.message}`);
  }

  await recordRuntimeEvent({
    eventType: "visual_job_created",
    sourceTable: "visual_jobs",
    sourceKey: created.job_key,
    message: `Visual job created from production request ${input.requestKey}`
  });

  return created;
}

export async function recordRuntimeEvent(input: {
  eventType: string;
  sourceTable?: string;
  sourceKey?: string;
  severity?: string;
  message: string;
}) {
  const supabase = createPipelineClient();

  const { error } = await supabase
    .from("runtime_events")
    .insert({
      event_key: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      event_type: input.eventType,
      source_table: input.sourceTable ?? null,
      source_key: input.sourceKey ?? null,
      severity: input.severity ?? "info",
      message: input.message
    });

  if (error) {
    throw new Error(`Runtime event insert failed: ${error.message}`);
  }
}

export async function getPipelineSnapshot() {
  const supabase = createPipelineClient();

  const [requests, jobs, assets, events] = await Promise.all([
    supabase.from("production_requests").select("*").order("created_at", { ascending: false }).limit(12),
    supabase.from("visual_jobs").select("*").order("created_at", { ascending: false }).limit(12),
    supabase.from("assets").select("*").order("created_at", { ascending: false }).limit(12),
    supabase.from("runtime_events").select("*").order("created_at", { ascending: false }).limit(12)
  ]);

  return {
    requests: requests.data ?? [],
    jobs: jobs.data ?? [],
    assets: assets.data ?? [],
    events: events.data ?? []
  };
}
