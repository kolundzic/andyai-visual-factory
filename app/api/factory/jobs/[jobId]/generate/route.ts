import { NextResponse } from "next/server";
import { generateVisualJobAsset } from "@/lib/render/render-engine";

export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
  context: { params: Promise<{ jobId: string }> }
) {
  try {
    const params = await context.params;
    const result = await generateVisualJobAsset(params.jobId);

    return NextResponse.json({
      ok: true,
      service: "AndyAI Visual Factory Render Engine",
      version: "v9.0.0",
      result
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
