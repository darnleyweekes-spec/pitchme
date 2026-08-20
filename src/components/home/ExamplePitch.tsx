import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PitchCard } from "@/components/pitch/PitchCard";
import { pitches } from "@/lib/data";

const example = pitches.find((p) => p.id === "pitch-1")!;

export function ExamplePitch() {
  return (
    <section className="border-b border-line">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="What a pitch looks like"
          title="Every pitch follows the same structure — no guesswork, no vague 'exciting opportunity' emails."
          description="Companies fill in the same eight fields every time. You always know the role, the pay, and why before you respond."
        />

        <div className="mt-10">
          <PitchCard
            pitch={example}
            accent="navy"
            actions={
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  This is exactly what Amara Osei saw in her dashboard.
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
      </Container>
    </section>
  );
}
