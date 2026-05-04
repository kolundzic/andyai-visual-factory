import { NextResponse } from "next/server";
import { recordRuntimeEvent } from "@/lib/supabase/pipeline";

export const dynamic = "force-dynamic";

export async function POST() {
  await recordRuntimeEvent({
    eventType: "export_pack_requested",
    sourceTable: "export_packs",
    message: "Export pack bridge action requested."
  });

  return NextResponse.json({ ok: true, action: "export_pack", status: "recorded" });
}
