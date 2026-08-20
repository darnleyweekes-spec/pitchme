import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PricingCard } from "@/components/pricing/PricingCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free for candidates, always. Straightforward monthly plans for employers based on pitch volume.",
};

const candidatePlans = pricingPlans.filter((p) => p.audience === "candidate");
const employerPlans = pricingPlans.filter((p) => p.audience === "employer");

const faqs = [
  {
    question: "Why is it free for candidates?",
    answer:
      "Because charging people to look for work is backwards. PitchMe is funded entirely by the companies who pitch candidates, not by candidates themselves.",
  },
  {
    question: "What counts as an 'active pitch'?",
    answer:
      "Any structured pitch you send to a candidate that hasn't been withdrawn. Once a candidate responds — Interested, Maybe, or Pass — it stays on your dashboard but no longer counts against your monthly limit.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, at any time. Upgrades apply immediately; downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a contract?",
    answer:
      "Starter and Growth are month-to-month with no lock-in. Enterprise plans include a custom agreement tailored to your hiring volume.",
  },
];

export default function PricingPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Pricing
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Free for candidates. Fair for employers.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          No résumé databases sold, no per-candidate fees, no surprise
          charges. You pay for pitch volume — nothing else.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          For candidates
        </h2>
        <div className="mt-5 max-w-sm">
          {candidatePlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          For employers
        </h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {employerPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      <div className="mt-20 border-t border-line pt-14">
        <SectionHeading eyebrow="Pricing FAQ" title="A few things people ask before signing up." />
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-sm font-semibold text-ink">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
