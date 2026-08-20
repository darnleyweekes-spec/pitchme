"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Candidate, WorkStyle } from "@/lib/types";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { cn } from "@/lib/utils";

const workStyles: { value: WorkStyle; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

export function TalentBrowser({ candidates }: { candidates: Candidate[] }) {
  const [query, setQuery] = useState("");
  const [styles, setStyles] = useState<WorkStyle[]>([]);
  const [openOnly, setOpenOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const matchesQuery =
        q.length === 0 ||
        candidate.name.toLowerCase().includes(q) ||
        candidate.title.toLowerCase().includes(q) ||
        candidate.skills.some((skill) => skill.toLowerCase().includes(q)) ||
        candidate.preferredRoles.some((role) => role.toLowerCase().includes(q));

      const matchesStyle =
        styles.length === 0 ||
        candidate.workStyle.some((style) => styles.includes(style));

      const matchesOpen = !openOnly || candidate.openToOffers;

      return matchesQuery && matchesStyle && matchesOpen;
    });
  }, [candidates, query, styles, openOnly]);

  function toggleStyle(value: WorkStyle) {
    setStyles((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, title, or skill…"
            className="w-full rounded-md border border-line bg-paper py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.06em] text-muted">
            <SlidersHorizontal size={13} aria-hidden />
            Filter
          </span>
          {workStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => toggleStyle(style.value)}
              aria-pressed={styles.includes(style.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                styles.includes(style.value)
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink",
              )}
            >
              {style.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setOpenOnly((v) => !v)}
            aria-pressed={openOnly}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              openOnly
                ? "border-accent bg-accent-soft text-accent"
                : "border-line text-ink-soft hover:border-ink",
            )}
          >
            Open to offers
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted" role="status">
        {filtered.length} candidate{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-line p-12 text-center">
          <p className="text-sm font-medium text-ink">No candidates match those filters.</p>
          <p className="mt-1 text-sm text-muted">Try clearing a filter or searching a different term.</p>
        </div>
      )}
    </div>
  );
}
