import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const rights = [
  "You will always see compensation before you respond to a pitch.",
  "You will never be charged to create or maintain your profile.",
  "You decide who can see your profile and when you're open to offers.",
  "Every pitch discloses whether AI is used in the interview process.",
  "You can mark Interested, Maybe, or Pass — with no explanation required.",
  "Your data is never sold. You can delete your profile at any time.",
  "Companies must disclose their real hiring timeline, not a vague one.",
  "You will never be auto-enrolled in a company's application system.",
];

export function BillOfRights() {
  return (
    <section id="bill-of-rights" className="scroll-mt-16 border-b border-line bg-ink text-paper">
      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="The candidate bill of rights"
          title="What we owe you, in writing."
          description="These aren't marketing lines. They're how the product is built."
          className="[&_p]:text-paper/70 [&_h2]:text-paper"
        />

        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-paper/15 bg-paper/15 sm:grid-cols-2">
          {rights.map((right, i) => (
            <li key={right} className="flex gap-4 bg-ink p-5 sm:p-6">
              <span className="font-display text-lg text-paper/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-paper/85">{right}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
