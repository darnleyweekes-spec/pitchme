"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getSupabaseClient } from "@/lib/supabase-browser";

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function finishSignIn() {
      try {
        const supabase = getSupabaseClient();
        const code = new URL(window.location.href).searchParams.get("code");

        let { data, error: sessionError } = await supabase.auth.getSession();

        if (!data.session && code) {
          const exchanged = await supabase.auth.exchangeCodeForSession(code);
          if (exchanged.error) {
            throw exchanged.error;
          }
          data = exchanged.data;
          sessionError = null;
        }

        if (sessionError) {
          throw sessionError;
        }

        if (data.session) {
          window.location.replace("/dashboard/candidate");
          return;
        }

        const { data: listener } = supabase.auth.onAuthStateChange(
          (_event: string, session: any) => {
            if (session && !cancelled) {
              window.location.replace("/dashboard/candidate");
            }
          },
        );

        window.setTimeout(async () => {
          listener.subscription.unsubscribe();
          if (cancelled) return;
          const current = await supabase.auth.getSession();
          if (current.data.session) {
            window.location.replace("/dashboard/candidate");
          } else {
            setError("Google sign-in did not complete. Please try again.");
          }
        }, 2500);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to complete sign-in.");
        }
      }
    }

    finishSignIn();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md text-center">
        {!error ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Signing you in
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-ink">
              Finishing Google login…
            </h1>
            <p className="mt-3 text-sm text-ink-soft">You will be redirected to your dashboard.</p>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-700">
              Login failed
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-ink">
              We could not complete sign-in.
            </h1>
            <p className="mt-3 text-sm text-ink-soft">{error}</p>
            <Link href="/login" className="mt-6 inline-block text-sm font-semibold text-accent underline underline-offset-4">
              Try Google login again
            </Link>
          </>
        )}
      </div>
    </Container>
  );
}
