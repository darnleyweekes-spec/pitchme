import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "Is PitchMe free for candidates?",
    answer:
      "Yes. Creating a candidate profile, controlling its visibility, receiving pitches, and responding Interested / Maybe / Pass are free in the current product.",
  },
  {
    question: "Are the people in Browse Talent real?",
    answer:
      "Yes. Browse Talent shows only real PitchMe users who explicitly made their profile public. Illustrative examples elsewhere on the site are labeled as samples and are not mixed into live marketplace results.",
  },
  {
    question: "Can I stay private while employed?",
    answer:
      "Yes. Profiles start private. You can publish later, turn off Open to offers while remaining visible, or make your profile private again from your dashboard.",
  },
  {
    question: "What happens after I mark a pitch as Interested?",
    answer:
      "Your response is saved in your private dashboard. The employer contact email is included in the pitch so you can continue the conversation directly.",
  },
  {
    question: "What information does a company have to provide?",
    answer:
      "The live pitch form requires the role, compensation or rate, work style, why they selected you, why the role is worth considering, interview process, hiring timeline, and a contact email.",
  },
  {
    question: "What does it cost companies?",
    answer:
      "The Founding Employer Pilot is $299/month and includes access to the live marketplace, structured role pitches, founding-employer onboarding, and priority support. Employers request access before billing begins.",
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
                <span className="text-base font-medium text-ink">{faq.question}</span>
                <Plus
                  size={18}
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
