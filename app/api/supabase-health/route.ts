import { NextResponse } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function GET() {
  const env = getSupabaseEnv();
  return NextResponse.json({
    ok: true,
    service: "AndyAI Visual Factory Supabase Runtime",
    configured: env.isConfigured,
    hasUrl: Boolean(env.url),
    hasAnonKey: Boolean(env.anonKey),
    hasServiceRoleKey: Boolean(env.serviceRoleKey),
    note: env.isConfigured ? "Supabase public runtime variables are present." : "Supabase variables are not configured yet."
  });
}
