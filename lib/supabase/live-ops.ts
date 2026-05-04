import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

function createWriteClient() {
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

  throw new Error("No Supabase key is configured for factory write path.");
}

export async function getFactoryDebugState() {
  const env = getSupabaseEnv();
  const supabase = createWriteClient();

  const defaultWorkspace = await supabase
    .from("workspaces")
    .select("id, workspace_key, name, status")
    .eq("workspace_key", "ws_andyai_visual_factory_demo")
    .maybeSingle();

  const activeWorkspaces = await supabase
    .from("workspaces")
    .select("id, workspace_key, name, status")
    .order("created_at", { ascending: true })
    .limit(5);

  return {
    env: {
      hasUrl: Boolean(env.url),
      hasAnonKey: Boolean(env.anonKey),
      hasServiceRoleKey: Boolean(env.serviceRoleKey),
      serviceRoleLooksPublic:
        Boolean(env.serviceRoleKey) &&
        (env.serviceRoleKey.startsWith("sb_publishable") ||
          env.serviceRoleKey.startsWith("sb_anon"))
    },
    defaultWorkspace: {
      data: defaultWorkspace.data,
      error: defaultWorkspace.error
        ? {
            code: defaultWorkspace.error.code,
            message: defaultWorkspace.error.message
          }
        : null
    },
    activeWorkspaces: {
      data: activeWorkspaces.data ?? [],
      error: activeWorkspaces.error
        ? {
            code: activeWorkspaces.error.code,
            message: activeWorkspaces.error.message
          }
        : null
    }
  };
}

export async function resolveFactoryWorkspaceId() {
  const supabase = createWriteClient();

  const defaultLookup = await supabase
    .from("workspaces")
    .select("id, workspace_key, name, status")
    .eq("workspace_key", "ws_andyai_visual_factory_demo")
    .maybeSingle();

  if (defaultLookup.data?.id) {
    return {
      id: defaultLookup.data.id,
      workspaceKey: defaultLookup.data.workspace_key,
      resolution: "default_workspace_key"
    };
  }

  const fallbackLookup = await supabase
    .from("workspaces")
    .select("id, workspace_key, name, status")
    .eq("status", "active")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (fallbackLookup.data?.id) {
    return {
      id: fallbackLookup.data.id,
      workspaceKey: fallbackLookup.data.workspace_key,
      resolution: "first_active_workspace_fallback"
    };
  }

  const anyLookup = await supabase
    .from("workspaces")
    .select("id, workspace_key, name, status")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (anyLookup.data?.id) {
    return {
      id: anyLookup.data.id,
      workspaceKey: anyLookup.data.workspace_key,
      resolution: "first_any_workspace_fallback"
    };
  }

  const details = [
    defaultLookup.error ? `default error: ${defaultLookup.error.message}` : "default workspace not found",
    fallbackLookup.error ? `active fallback error: ${fallbackLookup.error.message}` : "active fallback empty",
    anyLookup.error ? `any fallback error: ${anyLookup.error.message}` : "any fallback empty"
  ].join(" | ");

  throw new Error(`No factory workspace could be resolved. ${details}`);
}

export async function createProductionRequest(input: {
  requestKey: string;
  outputType: string;
  goal: string;
  requester?: string;
}) {
  const supabase = createWriteClient();
  const workspace = await resolveFactoryWorkspaceId();

  const { data, error } = await supabase
    .from("production_requests")
    .insert({
      workspace_id: workspace.id,
      request_key: input.requestKey,
      requester: input.requester ?? "operator",
      output_type: input.outputType,
      goal: input.goal,
      target_platforms: ["operator_console"],
      quality_level: "high",
      human_review_required: true
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Production request insert failed: ${error.message}`);
  }

  return {
    ...data,
    workspace_resolution: workspace.resolution,
    resolved_workspace_key: workspace.workspaceKey
  };
}
