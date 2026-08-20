import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CandidateDashboard } from "@/components/dashboard/CandidateDashboard";
import { getCandidateById, getPitchesForCandidate } from "@/lib/data";

export const metadata: Metadata = {
  title: "Candidate Dashboard",
  description: "Review pitches from companies and respond on your terms.",
};

export default function CandidateDashboardPage() {
  const candidate = getCandidateById("amara-osei")!;
  const pitches = getPitchesForCandidate(candidate.id);

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Candidate dashboard
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Your pitches
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          Every company that pitches you shows up here, in full — no digging
          through email threads.
        </p>
      </div>

      <CandidateDashboard candidate={candidate} initialPitches={pitches} />
    </Container>
  );
}
