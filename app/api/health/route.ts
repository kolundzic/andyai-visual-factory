import { NextResponse } from "next/server";
import { runtimeMap } from "@/lib/runtime-map";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "AndyAI Visual Factory",
    runtime: runtimeMap
  });
}
