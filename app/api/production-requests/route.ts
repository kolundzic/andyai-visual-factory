import { NextResponse } from "next/server";
import { createProductionRequest } from "@/lib/supabase/live-ops";

export const dynamic = "force-dynamic";

function safeKey() {
  return `req_${Date.now()}`;
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
        : "Create a new Visual Factory production request.";

    const requester =
      typeof body.requester === "string" && body.requester.length > 0
        ? body.requester
        : "operator";

    const result = await createProductionRequest({
      requestKey: safeKey(),
      outputType,
      goal,
      requester
    });

    return NextResponse.json({ ok: true, request: result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
