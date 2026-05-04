import { NextResponse } from "next/server";
import { getFactoryDebugState } from "@/lib/supabase/live-ops";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const debug = await getFactoryDebugState();

    return NextResponse.json({
      ok: true,
      service: "AndyAI Visual Factory Debug",
      version: "v7.0.1",
      debug
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        service: "AndyAI Visual Factory Debug",
        version: "v7.0.1",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
