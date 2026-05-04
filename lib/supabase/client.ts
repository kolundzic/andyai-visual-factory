import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

export function createBrowserSupabaseClient() {
  const env = getSupabaseEnv();
  if (!env.url || !env.anonKey) {
    throw new Error("Supabase public environment variables are not configured.");
  }
  return createClient(env.url, env.anonKey);
}
