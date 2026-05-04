import { NextResponse } from "next/server";
import { getRuntimeCounts } from "@/lib/supabase/runtime-queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const counts = await getRuntimeCounts();

  return NextResponse.json({
    ok: true,
    service: "AndyAI Visual Factory Runtime Summary",
    version: "v6.0.0",
    counts
  });
}
