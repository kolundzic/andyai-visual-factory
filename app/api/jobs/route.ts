import { NextResponse } from "next/server";
import { getPipelineSnapshot } from "@/lib/supabase/pipeline";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = await getPipelineSnapshot();

    return NextResponse.json({
      ok: true,
      service: "AndyAI Visual Factory Jobs API",
      version: "v8.0.0",
      jobs: snapshot.jobs,
      requests: snapshot.requests
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
