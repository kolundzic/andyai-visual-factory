import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

export function createServerSupabaseClient() {
  const env = getSupabaseEnv();
  if (!env.url || !env.serviceRoleKey) {
    throw new Error("Supabase server environment variables are not configured.");
  }
  return createClient(env.url, env.serviceRoleKey);
}
