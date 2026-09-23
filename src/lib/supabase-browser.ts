import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ihxgfakgwsermsidybia.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iLMtJBxDSb3QYveLNYoJDw_cmb0uhcJ";

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("Supabase is only available in the browser.");
  }

  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return client;
}
