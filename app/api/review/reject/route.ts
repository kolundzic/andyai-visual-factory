import { NextResponse } from "next/server";
import { recordRuntimeEvent } from "@/lib/supabase/pipeline";

export const dynamic = "force-dynamic";

export async function POST() {
  await recordRuntimeEvent({
    eventType: "review_reject_requested",
    sourceTable: "visual_jobs",
    message: "Reject action requested from pipeline UI."
  });

  return NextResponse.json({ ok: true, action: "reject", status: "recorded" });
}
