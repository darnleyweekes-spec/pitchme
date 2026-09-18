import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NextSection } from "@/components/home/NextSection";

const rights = [
  "Your profile starts private and only becomes public when you opt in.",
  "Your public profile does not expose your email address or account ID.",
  "You can turn off new pitches while keeping your public profile visible.",
  "Every live pitch requires a role, compensation, contact email, interview process, and hiring timeline.",
  "You can mark Interested, Maybe, or Pass — with no explanation required.",
  "You can make your profile private again at any time from your dashboard.",
  "Employers can only pitch candidates who are public and currently open to offers.",
  "PitchMe does not auto-enroll you in an employer's application system.",
];

export function BillOfRights() {
  return (
    <section id="bill-of-rights" className="scroll-mt-16 border-b border-line bg-ink text-paper">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="The candidate bill of rights"
          title="What the current product enforces."
          description="These points reflect the live privacy and pitch controls in PitchMe today."
          className="[&_p]:text-paper/70 [&_h2]:text-paper"
        />

        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-paper/15 bg-paper/15 sm:grid-cols-2">
          {rights.map((right, i) => (
            <li key={right} className="flex gap-4 bg-ink p-5 sm:p-6">
              <span className="font-display text-lg text-paper/40">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-paper/85">{right}</p>
            </li>
          ))}
        </ol>
        <NextSection href="#pricing" label="View pricing" />
      </Container>
    </section>
  );
}
