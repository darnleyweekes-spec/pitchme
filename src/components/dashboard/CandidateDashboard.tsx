"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Inbox, ThumbsUp, HelpCircle, X } from "lucide-react";
import type { Candidate, Pitch, PitchStatus } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { PitchCard } from "@/components/pitch/PitchCard";
import { cn, formatCompensation } from "@/lib/utils";

const tabs: { value: "all" | PitchStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "New" },
  { value: "interested", label: "Interested" },
  { value: "maybe", label: "Maybe" },
  { value: "passed", label: "Passed" },
];

export function CandidateDashboard({
  candidate,
  initialPitches,
}: {
  candidate: Candidate;
  initialPitches: Pitch[];
}) {
  const [pitches, setPitches] = useState(initialPitches);
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>("all");

  const stats = useMemo(() => {
    return {
      total: pitches.length,
      pending: pitches.filter((p) => p.status === "pending").length,
      interested: pitches.filter((p) => p.status === "interested").length,
      maybe: pitches.filter((p) => p.status === "maybe").length,
      passed: pitches.filter((p) => p.status === "passed").length,
    };
  }, [pitches]);

  const visible = tab === "all" ? pitches : pitches.filter((p) => p.status === tab);

  function setStatus(id: string, status: PitchStatus) {
    setPitches((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6">
        <div className="rounded-lg border border-line bg-surface p-5">
          <div className="flex items-center gap-3">
            <Avatar name={candidate.name} accent={candidate.accent} size="md" />
            <div>
              <p className="font-display text-base font-medium">{candidate.name}</p>
              <p className="text-xs text-muted">{candidate.title}</p>
            </div>
          </div>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Desired comp</dt>
              <dd className="font-medium text-ink">
                {formatCompensation(candidate.compMin, candidate.compMax, candidate.compPeriod)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Availability</dt>
              <dd className="text-right font-medium text-ink">{candidate.availability}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            <Button href={`/talent/${candidate.id}`} variant="secondary" size="md" className="w-full">
              View public profile
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-surface p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">
            Pitch activity
          </h2>
          <dl className="mt-3 space-y-2.5 text-sm">
            <StatRow icon={Inbox} label="New pitches" value={stats.pending} />
            <StatRow icon={ThumbsUp} label="Interested" value={stats.interested} tone="text-positive" />
            <StatRow icon={HelpCircle} label="Maybe" value={stats.maybe} tone="text-caution" />
            <StatRow icon={X} label="Passed" value={stats.passed} tone="text-muted" />
          </dl>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap gap-2 border-b border-line pb-4">
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              aria-pressed={tab === t.value}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                tab === t.value
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-line p-12 text-center">
            <p className="text-sm font-medium text-ink">Nothing here yet.</p>
            <p className="mt-1 text-sm text-muted">
              New pitches from companies will show up in this tab.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {visible.map((pitch) => (
              <PitchCard
                key={pitch.id}
                pitch={pitch}
                accent={candidate.accent}
                actions={
                  <div className="flex flex-wrap gap-2">
                    <ActionButton
                      active={pitch.status === "interested"}
                      onClick={() => setStatus(pitch.id, "interested")}
                    >
                      Interested
                    </ActionButton>
                    <ActionButton
                      active={pitch.status === "maybe"}
                      onClick={() => setStatus(pitch.id, "maybe")}
                    >
                      Maybe
                    </ActionButton>
                    <ActionButton
                      active={pitch.status === "passed"}
                      onClick={() => setStatus(pitch.id, "passed")}
                    >
                      Pass
                    </ActionButton>
                  </div>
                }
              />
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-xs text-muted">
          Demo mode — showing sample pitches for{" "}
          <Link href={`/talent/${candidate.id}`} className="underline underline-offset-2">
            {candidate.name}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function StatRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  tone?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="flex items-center gap-2 text-ink-soft">
        <Icon size={15} className={tone} />
        {label}
      </dt>
      <dd className={cn("font-semibold text-ink", tone)}>{value}</dd>
    </div>
  );
}

function ActionButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line text-ink-soft hover:border-ink hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

