"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase-browser";

function safeNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/dashboard/candidate";
  return value;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => safeNext(searchParams.get("next")), [searchParams]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const supabase = getSupabaseClient();
      supabase.auth.getSession().then(({ data }: any) => {
        if (data.session) {
          window.location.replace(nextPath);
        }
      });
    } catch {
      // The button below will surface a useful error if the client failed to load.
    }
  }, [nextPath]);

  async function signInWithGoogle() {
    setLoading(true);
    setError(null);

    try {
      sessionStorage.setItem("pitchme:auth-next", nextPath);
      const supabase = getSupabaseClient();
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (authError) throw authError;
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "Unable to start Google sign-in.");
    }
  }

  return (
    <Container className="py-16 sm:py-24">
      <div className="mx-auto max-w-md rounded-xl border border-line bg-surface p-7 shadow-sm sm:p-9">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Welcome</p>
        <h1 className="font-display text-3xl font-medium leading-tight text-ink">Log in to PitchMe</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Use Google to manage a candidate profile or send a role pitch. You will return to the page you were using after sign-in.
        </p>

        <Button
          type="button"
          size="lg"
          className="mt-7 w-full"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? "Opening Google…" : "Continue with Google"}
        </Button>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
        )}

        <p className="mt-5 text-xs leading-relaxed text-muted">
          Google verifies your identity. Candidate dashboard data remains protected by account-level database rules.
        </p>
      </div>
    </Container>
  );
}
