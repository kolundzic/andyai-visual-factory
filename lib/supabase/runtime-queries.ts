import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

function createPublicRuntimeClient() {
  const env = getSupabaseEnv();

  if (!env.url || !env.anonKey) {
    return null;
  }

  return createClient(env.url, env.anonKey);
}

export type RuntimeWorkspace = {
  id: string;
  workspace_key: string;
  name: string;
  owner_label: string | null;
  status: string;
};

export type RuntimeJob = {
  id: string;
  job_key: string;
  title: string;
  output_type: string;
  status: string;
  selected_variant: number | null;
};

export type RuntimeAsset = {
  id: string;
  asset_key: string;
  title: string;
  format: string;
  target_platform: string | null;
  source_prompt_key: string | null;
};

export type RuntimeCaseStudy = {
  id: string;
  case_study_key: string;
  title: string;
  problem: string | null;
  selected_direction: string | null;
  business_value: string | null;
};

export async function getRuntimeCounts() {
  const supabase = createPublicRuntimeClient();

  if (!supabase) {
    return { configured: false, workspaces: 0, jobs: 0, assets: 0, memory: 0, caseStudies: 0 };
  }

  const [workspaces, jobs, assets, memory, caseStudies] = await Promise.all([
    supabase.from("workspaces").select("id", { count: "exact", head: true }),
    supabase.from("visual_jobs").select("id", { count: "exact", head: true }),
    supabase.from("assets").select("id", { count: "exact", head: true }),
    supabase.from("visual_memory").select("id", { count: "exact", head: true }),
    supabase.from("case_studies").select("id", { count: "exact", head: true })
  ]);

  return {
    configured: true,
    workspaces: workspaces.count ?? 0,
    jobs: jobs.count ?? 0,
    assets: assets.count ?? 0,
    memory: memory.count ?? 0,
    caseStudies: caseStudies.count ?? 0
  };
}

export async function getWorkspaces(): Promise<RuntimeWorkspace[]> {
  const supabase = createPublicRuntimeClient();
  if (!supabase) return [];
  const { data } = await supabase.from("workspaces").select("*").order("created_at", { ascending: true });
  return data ?? [];
}

export async function getJobs(): Promise<RuntimeJob[]> {
  const supabase = createPublicRuntimeClient();
  if (!supabase) return [];
  const { data } = await supabase.from("visual_jobs").select("*").order("created_at", { ascending: true });
  return data ?? [];
}

export async function getAssets(): Promise<RuntimeAsset[]> {
  const supabase = createPublicRuntimeClient();
  if (!supabase) return [];
  const { data } = await supabase.from("assets").select("*").order("created_at", { ascending: true });
  return data ?? [];
}

export async function getCaseStudies(): Promise<RuntimeCaseStudy[]> {
  const supabase = createPublicRuntimeClient();
  if (!supabase) return [];
  const { data } = await supabase.from("case_studies").select("*").order("created_at", { ascending: true });
  return data ?? [];
}
