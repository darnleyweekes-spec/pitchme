import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const traditionalSteps = [
  "Find a job listing",
  "Create another account",
  "Upload a résumé",
  "Re-enter résumé details",
  "Answer screening questions",
  "Wait for a response",
];

const pitchmeSteps = [
  "Create your profile once",
  "Choose whether it is public",
  "Companies browse opted-in profiles",
  "They send a structured opportunity",
  "You decide how to respond",
];

export function ProblemSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="The problem"
          title="Job applications put almost all of the work on the candidate."
          description="PitchMe tests a different direction: candidates publish only what they choose, and interested employers make the first case for the opportunity."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-line p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">A common application flow</h3>
              <X size={18} className="text-muted" />
            </div>
            <ol className="mt-6 space-y-4">
              {traditionalSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-[11px] font-medium text-muted">{i + 1}</span>
                  <span className="text-sm leading-relaxed text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-line pt-5 text-sm text-ink-soft">The candidate starts the process and carries most of the upfront effort.</p>
          </div>

          <div className="rounded-lg border border-ink bg-paper p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">PitchMe</h3>
              <Check size={18} className="text-accent" />
            </div>
            <ol className="mt-6 space-y-4">
              {pitchmeSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-paper">{i + 1}</span>
                  <span className="text-sm font-medium leading-relaxed text-ink">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-line pt-5 text-sm font-medium text-ink">The goal: make the opportunity clear before a candidate spends time pursuing it.</p>
          </div>
        </div>

        <div className="mt-10 rounded-lg border border-accent/30 bg-accent-soft p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-accent">What buyers and candidates keep asking for</p>
          <h3 className="mt-3 font-display text-2xl font-medium text-ink">Less ambiguity before the next step.</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <div><p className="font-medium text-ink">Clear expectations</p><p className="mt-1 text-sm leading-relaxed text-ink-soft">Show compensation, process, timeline, and why the person was selected.</p></div>
            <div><p className="font-medium text-ink">Real choice</p><p className="mt-1 text-sm leading-relaxed text-ink-soft">Keep profiles private by default and make Interested, Maybe, and Pass meaningful.</p></div>
            <div><p className="font-medium text-ink">No wasted motion</p><p className="mt-1 text-sm leading-relaxed text-ink-soft">Let both sides decide whether the opportunity is worth a conversation before investing more time.</p></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
