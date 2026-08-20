import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PricingCard } from "@/components/pricing/PricingCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Free candidate profiles and a founding-employer pilot with manual onboarding while the employer product is in early access.",
};

const candidatePlans = pricingPlans.filter((plan) => plan.audience === "candidate");
const employerPlans = pricingPlans.filter((plan) => plan.audience === "employer");

const faqs = [
  {
    question: "Why is it free for candidates?",
    answer:
      "Candidates are the supply side of the marketplace, and the current product does not charge them to create, publish, or manage a profile.",
  },
  {
    question: "What is the Founding Employer Pilot?",
    answer:
      "It is the paid early-access option for teams that want to use the live talent marketplace and structured pitch flow with direct onboarding and support while employer accounts are still being completed.",
  },
  {
    question: "Is employer billing automated yet?",
    answer:
      "Not yet. Pilot access is arranged directly. The site does not claim that automated subscriptions, quotas, team seats, or an employer response dashboard are live today.",
  },
  {
    question: "What can employers use right now?",
    answer:
      "Employers can browse real opt-in profiles and send structured role pitches to candidates who are currently open to offers. Pitches appear in the candidate's private dashboard.",
  },
];

export default function PricingPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Pricing</p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Free for candidates. Early access for employers.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          The pricing below reflects what is actually available now. Features that are still being built are not presented as live.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">For candidates</h2>
        <div className="mt-5 max-w-sm">
          {candidatePlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">For employers</h2>
        <div className="mt-5 max-w-xl">
          {employerPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      <div className="mt-20 border-t border-line pt-14">
        <SectionHeading eyebrow="Pricing FAQ" title="What is live versus early access." />
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
