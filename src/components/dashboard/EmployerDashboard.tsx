"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Send, TrendingUp } from "lucide-react";
import type { Pitch, PitchStatus } from "@/lib/types";
import { getCandidateById } from "@/lib/data";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn, formatCompensation } from "@/lib/utils";

const statusTone: Record<PitchStatus, "neutral" | "positive" | "caution" | "accent"> = {
  pending: "accent",
  interested: "positive",
  maybe: "caution",
  passed: "neutral",
};

const statusLabel: Record<PitchStatus, string> = {
  pending: "Awaiting response",
  interested: "Interested",
  maybe: "Maybe",
  passed: "Passed",
};

const tabs: { value: "all" | PitchStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Awaiting response" },
  { value: "interested", label: "Interested" },
  { value: "maybe", label: "Maybe" },
  { value: "passed", label: "Passed" },
];

export function EmployerDashboard({
  companyName,
  pitches,
}: {
  companyName: string;
  pitches: Pitch[];
}) {
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>("all");

  const stats = useMemo(() => {
    const total = pitches.length;
    const responded = pitches.filter((p) => p.status !== "pending").length;
    const interested = pitches.filter((p) => p.status === "interested").length;
    const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100);
    return { total, interested, pending: total - responded, responseRate };
  }, [pitches]);

  const visible = tab === "all" ? pitches : pitches.filter((p) => p.status === tab);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Pitches sent" value={stats.total} />
        <StatCard label="Interested" value={stats.interested} tone="text-positive" />
        <StatCard label="Awaiting response" value={stats.pending} tone="text-accent" />
        <StatCard
          label="Response rate"
          value={`${stats.responseRate}%`}
          icon={TrendingUp}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
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
        <Button href="/pitch/new" size="md">
          <Send size={16} />
          Send New Pitch
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.04em] text-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Candidate</th>
              <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">Role pitched</th>
              <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Compensation</th>
              <th scope="col" className="hidden px-5 py-3 font-medium lg:table-cell">Sent</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visible.map((pitch) => {
              const candidate = getCandidateById(pitch.candidateId);
              if (!candidate) return null;
              return (
                <tr key={pitch.id} className="bg-paper">
                  <td className="px-5 py-4">
                    <Link
                      href={`/talent/${candidate.id}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <Avatar name={candidate.name} accent={candidate.accent} size="sm" />
                      <span className="font-medium text-ink">{candidate.name}</span>
                    </Link>
                  </td>
                  <td className="hidden px-5 py-4 text-ink-soft sm:table-cell">
                    {pitch.jobTitle}
                  </td>
                  <td className="hidden px-5 py-4 text-ink-soft md:table-cell">
                    {formatCompensation(pitch.compMin, pitch.compMax, pitch.compPeriod)}
                  </td>
                  <td className="hidden px-5 py-4 text-muted lg:table-cell">
                    {pitch.sentAt}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={statusTone[pitch.status]}>{statusLabel[pitch.status]}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="bg-paper px-5 py-10 text-center text-sm text-muted">
            No pitches in this category yet.
          </p>
        )}
      </div>

      <p className="mt-6 text-xs text-muted">
        Demo mode — showing sample pitches sent by {companyName}.
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  tone?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.04em] text-muted">
        {Icon && <Icon size={13} />}
        {label}
      </div>
      <p className={cn("mt-2 font-display text-2xl font-medium text-ink", tone)}>
        {value}
      </p>
    </div>
  );
}
