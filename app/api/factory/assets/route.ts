import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const env = getSupabaseEnv();
    const supabase = createClient(env.url!, env.serviceRoleKey || env.anonKey!);

    const { data, error } = await supabase
      .from("assets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(24);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      ok: true,
      version: "v9.0.0",
      assets: data ?? []
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
