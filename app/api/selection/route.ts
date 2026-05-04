import { NextResponse } from "next/server";
import { recordRuntimeEvent } from "@/lib/supabase/pipeline";

export const dynamic = "force-dynamic";

export async function POST() {
  await recordRuntimeEvent({
    eventType: "selection_record_requested",
    sourceTable: "selection_ledgers",
    message: "Selection ledger bridge action requested."
  });

  return NextResponse.json({ ok: true, action: "selection", status: "recorded" });
}
