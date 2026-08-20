import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "Is PitchMe actually free for candidates?",
    answer:
      "Yes, entirely. You'll never be charged to create a profile, receive pitches, or use the platform. We make money from companies, not from people looking for work.",
  },
  {
    question: "How is this different from a job board?",
    answer:
      "Job boards show you listings you have to apply to. PitchMe reverses the direction: companies search for candidates and send a structured pitch directly to you, with compensation and role details included from the start.",
  },
  {
    question: "Can I stay invisible while still employed?",
    answer:
      "Yes. You control your visibility and availability status independently. You can be discoverable to companies without appearing to actively be job hunting, and you can go fully private at any time.",
  },
  {
    question: "What happens after I mark a pitch as Interested?",
    answer:
      "The company is notified and can start a conversation directly with you. Nothing happens automatically — no calendar invites, no forwarded resume, no third parties added without your knowledge.",
  },
  {
    question: "Do companies use AI to screen candidates on PitchMe?",
    answer:
      "Some do, for later interview stages — and every pitch is required to disclose upfront whether AI interviews are part of their process, before you respond.",
  },
  {
    question: "What does it cost companies to send a pitch?",
    answer:
      "Employers pay a monthly subscription based on pitch volume, not per candidate contacted. See the Pricing page for current plans.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 border-b border-line">
      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow="FAQ" title="Questions people actually ask." />

        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="text-base font-medium text-ink">
                  {faq.question}
                </span>
                <Plus
                  size={18}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
