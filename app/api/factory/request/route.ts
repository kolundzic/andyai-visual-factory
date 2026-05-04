import { NextResponse } from "next/server";
import { createProductionRequest } from "@/lib/supabase/live-ops";
import { createVisualJobFromRequest, recordRuntimeEvent } from "@/lib/supabase/pipeline";

export const dynamic = "force-dynamic";

function safeKey() {
  return `req_factory_${Date.now()}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const outputType =
      typeof body.outputType === "string" && body.outputType.length > 0
        ? body.outputType
        : "visual_asset";

    const goal =
      typeof body.goal === "string" && body.goal.length > 0
        ? body.goal
        : "Create a visual asset in the Visual Factory.";

    const requester =
      typeof body.requester === "string" && body.requester.length > 0
        ? body.requester
        : "factory_operator";

    const created = await createProductionRequest({
      requestKey: safeKey(),
      outputType,
      goal,
      requester
    });

    await recordRuntimeEvent({
      eventType: "production_request_created",
      sourceTable: "production_requests",
      sourceKey: created.request_key,
      message: `Production request created for ${outputType}`
    });

    const visualJob = await createVisualJobFromRequest({
      productionRequestId: created.id,
      workspaceId: created.workspace_id,
      requestKey: created.request_key,
      outputType,
      goal
    });

    return NextResponse.json({
      ok: true,
      request: created,
      visualJob
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
