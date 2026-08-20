import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Build one real profile",
    description:
      "Skills, experience, portfolio, preferred roles, compensation expectations, and how you like to work. Once, not two hundred times.",
  },
  {
    number: "02",
    title: "Companies search and discover you",
    description:
      "Employers browse candidates by skill, experience, and availability — the same way you'd browse anything else worth finding.",
  },
  {
    number: "03",
    title: "They pitch you the role",
    description:
      "A structured pitch: the job, the pay, why they picked you, and why you should care. Not a job posting — an offer to talk.",
  },
  {
    number: "04",
    title: "You decide what happens next",
    description:
      "Mark it Interested, Maybe, or Pass. No ghosting, no forms, no fifteen-question screener before anyone will talk to you.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-b border-line">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps. You're in control of every one."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="bg-surface p-6 sm:p-7">
              <span className="font-display text-3xl font-medium text-line">
                {step.number}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
