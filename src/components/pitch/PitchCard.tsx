import {
  Banknote,
  Building2,
  CalendarClock,
  ListChecks,
  MapPinned,
  Sparkles,
  Bot,
  Gift,
} from "lucide-react";
import type { Pitch } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatCompensation } from "@/lib/utils";

const workStyleLabel: Record<Pitch["workStyle"], string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

const statusTone: Record<
  Pitch["status"],
  "neutral" | "positive" | "caution" | "accent"
> = {
  pending: "accent",
  interested: "positive",
  maybe: "caution",
  passed: "neutral",
};

const statusLabel: Record<Pitch["status"], string> = {
  pending: "Awaiting your response",
  interested: "You're interested",
  maybe: "Marked maybe",
  passed: "Passed",
};

export function PitchCard({
  pitch,
  actions,
  accent = "navy",
}: {
  pitch: Pitch;
  actions?: React.ReactNode;
  accent?: string;
}) {
  return (
    <article className="rounded-lg border border-line bg-surface p-6 sm:p-7">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar name={pitch.companyName} accent={accent} size="lg" />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">
              {pitch.companyName}
            </p>
            <h3 className="mt-1 font-display text-xl font-medium leading-snug">
              {pitch.jobTitle}
            </h3>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-muted">
              {pitch.companyBlurb}
            </p>
          </div>
        </div>
        <Badge tone={statusTone[pitch.status]} className="shrink-0">
          {statusLabel[pitch.status]}
        </Badge>
      </header>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5 sm:grid-cols-4">
        <Fact
          icon={Banknote}
          label="Compensation"
          value={formatCompensation(pitch.compMin, pitch.compMax, pitch.compPeriod)}
        />
        <Fact icon={MapPinned} label="Work style" value={workStyleLabel[pitch.workStyle]} />
        <Fact icon={CalendarClock} label="Timeline" value={pitch.hiringTimeline} />
        <Fact
          icon={Bot}
          label="AI interviews"
          value={pitch.aiInterviews ? "Used in process" : "None used"}
        />
      </dl>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ListChecks size={16} className="text-accent" aria-hidden />
            Main responsibilities
          </h4>
          <ul className="mt-3 space-y-2">
            {pitch.responsibilities.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-ink-soft">
                — {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Sparkles size={16} className="text-accent" aria-hidden />
              Why they selected you
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {pitch.whySelected}
            </p>
          </div>
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Building2 size={16} className="text-accent" aria-hidden />
              Why work there
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {pitch.whyJoin}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-ink">Interview stages</h4>
          <ol className="mt-3 space-y-2">
            {pitch.interviewStages.map((stage, i) => (
              <li key={stage} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-[11px] font-medium text-ink-soft">
                  {i + 1}
                </span>
                {stage}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Gift size={16} className="text-accent" aria-hidden />
            Benefits{pitch.equity ? " & equity" : ""}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {pitch.benefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink-soft"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {actions && <div className="mt-7 border-t border-line pt-6">{actions}</div>}
    </article>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.04em] text-muted">
        <Icon size={13} aria-hidden />
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}
