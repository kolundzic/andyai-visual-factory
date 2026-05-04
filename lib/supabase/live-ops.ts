import { createServerSupabaseClient } from "./server";

export async function createProductionRequest(input: {
  requestKey: string;
  outputType: string;
  goal: string;
  requester?: string;
}) {
  const supabase = createServerSupabaseClient();

  const { data: workspace } = await supabase
    .from("workspaces")
    .select("id")
    .eq("workspace_key", "ws_andyai_visual_factory_demo")
    .single();

  if (!workspace) {
    throw new Error("Default Visual Factory workspace was not found.");
  }

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
    throw new Error(error.message);
  }

  return data;
}
