import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const traditionalSteps = [
  "Find job listing",
  "Create an account",
  "Upload résumé",
  "Re-enter résumé into form fields",
  "Write a cover letter",
  "Answer screening questions",
  "Complete an AI interview",
  "Receive an automated rejection",
];

const pitchmeSteps = [
  "Create your profile once",
  "Prove what you can actually do",
  "Companies find you",
  "They pitch you the opportunity",
  "You decide",
];

export function ProblemSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="The problem"
          title="Traditional hiring was built for a world before everyone applied to everything."
          description="The application funnel was designed to filter a handful of candidates. Now it filters thousands — and it treats everyone, including strong candidates, like noise to be sorted."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-line p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                Traditional hiring
              </h3>
              <X size={18} className="text-muted" />
            </div>
            <ol className="mt-6 space-y-4">
              {traditionalSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-[11px] font-medium text-muted">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-soft">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-line pt-5 text-sm font-medium text-ink-soft">
              Average outcome: silence, or a rejection with no feedback.
            </p>
          </div>

          <div className="rounded-lg border border-ink bg-paper p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                PitchMe
              </h3>
              <Check size={18} className="text-accent" />
            </div>
            <ol className="mt-6 space-y-4">
              {pitchmeSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-paper">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-ink">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-line pt-5 text-sm font-medium text-ink">
              Average outcome: a real conversation with someone who wants you.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
