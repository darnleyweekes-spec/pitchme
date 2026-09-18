import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NextSection } from "@/components/home/NextSection";

const steps = [
  {
    number: "01",
    title: "Build a concise profile",
    description:
      "Add your name, current title, location, and a headline that explains the work you do best.",
  },
  {
    number: "02",
    title: "Choose your visibility",
    description:
      "Keep the profile private, or opt into Browse Talent. You can separately decide whether you're open to pitches.",
  },
  {
    number: "03",
    title: "Employers pitch the role",
    description:
      "A pitch includes the role, compensation, work style, why you were selected, interview process, timeline, and contact email.",
  },
  {
    number: "04",
    title: "You decide",
    description:
      "The opportunity lands in your private dashboard, where you can mark Interested, Maybe, or Pass.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-b border-line">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps. Candidate-controlled from the start."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="bg-surface p-6 sm:p-7">
              <span className="font-display text-3xl font-medium text-line">{step.number}</span>
              <h3 className="mt-4 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
        <NextSection href="#example-pitch" label="See an example pitch" />
      </Container>
    </section>
  );
}
