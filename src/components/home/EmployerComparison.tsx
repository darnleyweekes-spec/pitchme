import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const rows = [
  ["Generic recruiter message", "Structured role pitch"],
  ["Compensation may be hidden", "Compensation required"],
  ["Ask for a call first", "Show process and timeline first"],
  ["Candidate proves interest first", "Employer makes the first case"],
  ["Open-ended back-and-forth", "Interested / Maybe / Pass"],
];

export function EmployerComparison() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="For hiring teams"
            title="A better first message than “Are you open to a quick call?”"
            description="PitchMe asks employers to put the important information in front of the candidate before asking for attention."
          />
          <Button href="/employers" variant="secondary" className="shrink-0">
            See employer access
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-paper">
          <div className="grid grid-cols-2 border-b border-line bg-ink text-paper">
            <div className="p-4 text-sm font-semibold sm:p-5">Traditional sourcing</div>
            <div className="border-l border-paper/15 p-4 text-sm font-semibold sm:p-5">PitchMe</div>
          </div>
          {rows.map(([traditional, pitchme]) => (
            <div key={traditional} className="grid grid-cols-2 border-b border-line last:border-0">
              <div className="p-4 text-sm text-muted sm:p-5">{traditional}</div>
              <div className="border-l border-line p-4 text-sm font-medium text-ink sm:p-5">{pitchme}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
