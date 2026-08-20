import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Globe, MapPin, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { candidates, getCandidateById } from "@/lib/data";
import { formatCompensation } from "@/lib/utils";

const workStyleLabel: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

export function generateStaticParams() {
  return candidates.map((candidate) => ({ id: candidate.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const candidate = getCandidateById(id);
  if (!candidate) return {};

  return {
    title: `${candidate.name} — ${candidate.title}`,
    description: candidate.headline,
  };
}

export default async function CandidateProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const candidate = getCandidateById(id);

  if (!candidate) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <Link
        href="/talent"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeft size={15} aria-hidden />
        Back to browse talent
      </Link>

      <div className="mt-6 flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-5">
          <Avatar name={candidate.name} accent={candidate.accent} size="lg" />
          <div>
            <h1 className="font-display text-2xl font-medium sm:text-3xl">
              {candidate.name}
            </h1>
            <p className="mt-1 text-base text-ink-soft">{candidate.title}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
              <MapPin size={14} aria-hidden />
              {candidate.location}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {candidate.workStyle.map((style) => (
                <Badge key={style} tone="neutral">
                  {workStyleLabel[style]}
                </Badge>
              ))}
              {candidate.openToOffers && (
                <Badge tone="positive">Open to offers</Badge>
              )}
            </div>
          </div>
        </div>

        <Button
          href={`/pitch/new?candidate=${candidate.id}`}
          size="lg"
          className="w-full sm:w-auto"
        >
          <Send size={17} />
          Pitch This Candidate
        </Button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
              About
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              {candidate.bio}
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
              Experience
            </h2>
            <ol className="mt-4 space-y-6 border-l border-line pl-6">
              {candidate.experience.map((entry) => (
                <li key={`${entry.company}-${entry.role}`} className="relative">
                  <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-paper bg-ink" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-semibold text-ink">
                      {entry.role} · {entry.company}
                    </h3>
                    <span className="text-xs font-medium text-muted">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {entry.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
              Portfolio &amp; work samples
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {candidate.portfolio.map((item) => (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-lg border border-line p-5 transition-colors hover:border-ink"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-ink">
                      {item.title}
                    </h3>
                    <ExternalLink
                      size={14}
                      className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-ink"
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8 lg:border-l lg:border-line lg:pl-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
              Desired compensation
            </h2>
            <p className="mt-2 font-display text-xl font-medium">
              {formatCompensation(
                candidate.compMin,
                candidate.compMax,
                candidate.compPeriod,
              )}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
              Availability
            </h2>
            <p className="mt-2 text-sm font-medium text-ink">
              {candidate.availability}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
              Preferred roles
            </h2>
            <ul className="mt-2 space-y-1.5">
              {candidate.preferredRoles.map((role) => (
                <li key={role} className="text-sm text-ink-soft">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
              Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink-soft"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {(candidate.links.linkedin ||
            candidate.links.github ||
            candidate.links.website) && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
                Links
              </h2>
              <ul className="mt-2 space-y-2">
                {candidate.links.linkedin && (
                  <li>
                    <a
                      href={candidate.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
                    >
                      <LinkedinIcon />
                      LinkedIn
                    </a>
                  </li>
                )}
                {candidate.links.github && (
                  <li>
                    <a
                      href={candidate.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
                    >
                      <GithubIcon />
                      GitHub
                    </a>
                  </li>
                )}
                {candidate.links.website && (
                  <li>
                    <a
                      href={candidate.links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
                    >
                      <Globe size={15} aria-hidden />
                      Website
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
