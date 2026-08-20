const SUPABASE_URL = "https://ihxgfakgwsermsidybia.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_iLMtJBxDSb3QYveLNYoJDw_cmb0uhcJ";

type SupabaseGlobal = {
  createClient: (
    url: string,
    key: string,
    options?: Record<string, unknown>,
  ) => any;
};

declare global {
  interface Window {
    supabase?: SupabaseGlobal;
    __pitchmeSupabaseClient?: any;
  }
}

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("Supabase is only available in the browser.");
  }

  if (!window.supabase) {
    throw new Error("Supabase client failed to load. Refresh the page and try again.");
  }

  if (!window.__pitchmeSupabaseClient) {
    window.__pitchmeSupabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    );
  }

  return window.__pitchmeSupabaseClient;
}
