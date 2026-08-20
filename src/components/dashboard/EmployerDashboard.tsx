"use client";

import { useMemo, useState } from "react";
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

export function EmployerDashboard({ companyName, pitches }: { companyName: string; pitches: Pitch[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>("all");

  const stats = useMemo(() => {
    const total = pitches.length;
    const responded = pitches.filter((pitch) => pitch.status !== "pending").length;
    const interested = pitches.filter((pitch) => pitch.status === "interested").length;
    const responseRate = total === 0 ? 0 : Math.round((responded / total) * 100);
    return { total, interested, pending: total - responded, responseRate };
  }, [pitches]);

  const visible = tab === "all" ? pitches : pitches.filter((pitch) => pitch.status === tab);

  return (
    <div>
      <div className="rounded-lg border border-accent/30 bg-accent-soft p-4 text-sm leading-relaxed text-ink-soft">
        This entire dashboard is an illustrative product demo. Candidate names, company details, response rates, compensation, and pitch activity below are fictional sample data.
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-4">
        <StatCard label="Sample pitches" value={stats.total} />
        <StatCard label="Sample interested" value={stats.interested} tone="text-positive" />
        <StatCard label="Sample pending" value={stats.pending} tone="text-accent" />
        <StatCard label="Sample response rate" value={`${stats.responseRate}%`} icon={TrendingUp} />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setTab(item.value)}
              aria-pressed={tab === item.value}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                tab === item.value ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Button href="/pitch/new" size="md">
          <Send size={16} />
          Open Live Pitch Flow
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-[0.04em] text-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Sample candidate</th>
              <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">Sample role</th>
              <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Sample compensation</th>
              <th scope="col" className="hidden px-5 py-3 font-medium lg:table-cell">Sample date</th>
              <th scope="col" className="px-5 py-3 font-medium">Sample status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visible.map((pitch) => {
              const candidate = getCandidateById(pitch.candidateId);
              if (!candidate) return null;
              return (
                <tr key={pitch.id} className="bg-paper">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={candidate.name} accent={candidate.accent} size="sm" />
                      <div>
                        <span className="font-medium text-ink">{candidate.name}</span>
                        <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">fictional</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-ink-soft sm:table-cell">{pitch.jobTitle}</td>
                  <td className="hidden px-5 py-4 text-ink-soft md:table-cell">{formatCompensation(pitch.compMin, pitch.compMax, pitch.compPeriod)}</td>
                  <td className="hidden px-5 py-4 text-muted lg:table-cell">{pitch.sentAt}</td>
                  <td className="px-5 py-4"><Badge tone={statusTone[pitch.status]}>{statusLabel[pitch.status]}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="bg-paper px-5 py-10 text-center text-sm text-muted">No sample pitches in this category.</p>
        )}
      </div>

      <p className="mt-6 text-xs text-muted">Demo only — no data on this page represents a real candidate, employer, or hiring outcome.</p>
    </div>
  );
}

function StatCard({ label, value, tone, icon: Icon }: { label: string; value: string | number; tone?: string; icon?: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.04em] text-muted">
        {Icon && <Icon size={13} />}
        {label}
      </div>
      <p className={cn("mt-2 font-display text-2xl font-medium text-ink", tone)}>{value}</p>
    </div>
  );
}
