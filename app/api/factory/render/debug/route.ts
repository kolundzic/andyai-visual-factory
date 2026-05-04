import { NextResponse } from "next/server";
import { getRenderDebugState } from "@/lib/render/render-engine";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const debug = await getRenderDebugState();

    return NextResponse.json({
      ok: true,
      service: "AndyAI Visual Factory Render Debug",
      version: "v9.0.0",
      debug
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
