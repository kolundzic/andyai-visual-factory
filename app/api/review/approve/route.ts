import { NextResponse } from "next/server";
import { recordRuntimeEvent } from "@/lib/supabase/pipeline";

export const dynamic = "force-dynamic";

export async function POST() {
  await recordRuntimeEvent({
    eventType: "review_approve_requested",
    sourceTable: "visual_jobs",
    message: "Approve action requested from pipeline UI."
  });

  return NextResponse.json({ ok: true, action: "approve", status: "recorded" });
}
