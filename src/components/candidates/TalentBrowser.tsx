"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { PublicCandidateProfile } from "@/lib/types";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { Button } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase-browser";

export function TalentBrowser() {
  const [query, setQuery] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [candidates, setCandidates] = useState<PublicCandidateProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCandidates() {
      try {
        const supabase = getSupabaseClient();
        const { data, error: loadError } = await supabase
          .from("public_candidate_profiles")
          .select("public_id,name,title,location,headline,open_to_offers")
          .order("name", { ascending: true });

        if (loadError) throw loadError;
        if (!cancelled) setCandidates((data ?? []) as PublicCandidateProfile[]);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load public candidate profiles.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCandidates();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const matchesQuery =
        q.length === 0 ||
        candidate.name.toLowerCase().includes(q) ||
        candidate.title.toLowerCase().includes(q) ||
        candidate.location.toLowerCase().includes(q) ||
        candidate.headline.toLowerCase().includes(q);
      const matchesOpen = !openOnly || candidate.open_to_offers;
      return matchesQuery && matchesOpen;
    });
  }, [candidates, query, openOnly]);

  if (loading) {
    return <p className="text-sm text-ink-soft">Loading public profiles…</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-4 sm:flex-row sm:items-center sm:p-5">
        <label className="relative flex-1">
          <span className="sr-only">Search candidates</span>
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, title, location, or headline…"
            className="w-full rounded-md border border-line bg-paper py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
          />
        </label>

        <button
          type="button"
          onClick={() => setOpenOnly((value) => !value)}
          aria-pressed={openOnly}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            openOnly
              ? "border-accent bg-accent-soft text-accent"
              : "border-line text-ink-soft hover:border-ink"
          }`}
        >
          Open to offers only
        </button>
      </div>

      <p className="mt-4 text-sm text-muted" role="status">
        {filtered.length} public candidate{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((candidate) => (
            <CandidateCard key={candidate.public_id} candidate={candidate} />
          ))}
        </div>
      ) : candidates.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-line p-10 text-center">
          <p className="text-sm font-medium text-ink">No candidates have opted into the public marketplace yet.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Candidate profiles only appear here after a real user signs in, completes a profile, and chooses to make it public.
          </p>
          <Button href="/login" className="mt-5">
            Create your candidate profile
          </Button>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-line p-10 text-center">
          <p className="text-sm font-medium text-ink">No candidates match those filters.</p>
          <p className="mt-1 text-sm text-muted">Try a different search or clear the open-to-offers filter.</p>
        </div>
      )}
    </div>
  );
}
