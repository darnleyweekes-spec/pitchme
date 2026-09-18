import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PitchCard } from "@/components/pitch/PitchCard";
import { pitches } from "@/lib/data";
import { NextSection } from "@/components/home/NextSection";

const example = pitches.find((p) => p.id === "pitch-1")!;

export function ExamplePitch() {
  return (
    <section id="example-pitch" className="scroll-mt-20 border-b border-line">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Illustrative sample"
          title="What a clear role pitch can look like."
          description="This sample uses fictional names and company details to demonstrate the format. Live marketplace profiles are real, opt-in PitchMe users."
        />

        <div className="mt-10">
          <PitchCard
            pitch={example}
            accent="navy"
            actions={
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  Sample only — not a real candidate, company, or submitted opportunity.
                </p>
                <div className="flex gap-2">
                  <span className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper">
                    Interested
                  </span>
                  <span className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-soft">
                    Maybe
                  </span>
                  <span className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink-soft">
                    Pass
                  </span>
                </div>
              </div>
            }
          />
        </div>
        <NextSection href="#bill-of-rights" label="Review candidate protections" />
      </Container>
    </section>
  );
}
