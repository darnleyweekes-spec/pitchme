import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Candidate } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { formatCompensation } from "@/lib/utils";

const workStyleLabel: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

export function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-ink">
      <div className="flex items-start gap-4">
        <Avatar name={candidate.name} accent={candidate.accent} size="md" />
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-medium leading-snug">
            <Link href={`/talent/${candidate.id}`}>
              <span className="absolute inset-0" aria-hidden="true" />
              {candidate.name}
            </Link>
          </h3>
          <p className="truncate text-sm text-ink-soft">{candidate.title}</p>
          <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted">
            <MapPin size={12} aria-hidden />
            {candidate.location}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {candidate.headline}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {candidate.skills.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink-soft"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">
            +{candidate.skills.length - 4}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-1.5">
        {candidate.workStyle.map((style) => (
          <Badge key={style} tone="neutral">
            {workStyleLabel[style]}
          </Badge>
        ))}
        {candidate.openToOffers && <Badge tone="positive">Open to offers</Badge>}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm font-semibold text-ink">
          {formatCompensation(candidate.compMin, candidate.compMax, candidate.compPeriod)}
        </span>
        <span className="text-xs text-muted">{candidate.availability}</span>
      </div>
    </article>
  );
}
