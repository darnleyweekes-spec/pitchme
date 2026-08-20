import Link from "next/link";
import { MapPin } from "lucide-react";
import type { PublicCandidateProfile } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

export function CandidateCard({ candidate }: { candidate: PublicCandidateProfile }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-ink">
      <div className="flex items-start gap-4">
        <Avatar name={candidate.name} accent="navy" size="md" />
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-medium leading-snug">
            <Link href={`/talent/profile?id=${encodeURIComponent(candidate.public_id)}`}>
              <span className="absolute inset-0" aria-hidden="true" />
              {candidate.name}
            </Link>
          </h3>
          <p className="truncate text-sm text-ink-soft">{candidate.title}</p>
          {candidate.location && (
            <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted">
              <MapPin size={12} aria-hidden />
              {candidate.location}
            </p>
          )}
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">
        {candidate.headline}
      </p>

      <div className="mt-auto pt-5">
        {candidate.open_to_offers ? (
          <Badge tone="positive">Open to offers</Badge>
        ) : (
          <Badge tone="neutral">Profile visible</Badge>
        )}
      </div>
    </article>
  );
}
