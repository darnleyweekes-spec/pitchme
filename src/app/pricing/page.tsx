import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PricingCard } from "@/components/pricing/PricingCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "PitchMe is free for candidates. Employers can request the $299/month Founding Employer Pilot for live marketplace access, structured role pitches, onboarding, and support.",
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
    question: "What does the Founding Employer Pilot include?",
    answer:
      "The $299/month pilot includes access to the live talent marketplace, structured role pitches, direct candidate delivery, founding-employer onboarding, and priority support while the employer product continues to expand.",
  },
  {
    question: "What can employers use right now?",
    answer:
      "Employers can browse real opt-in profiles and send structured role pitches to candidates who are currently open to offers. Pitches appear in the candidate's private dashboard.",
  },
  {
    question: "How does pilot onboarding work?",
    answer:
      "Submit the employer request form with your current hiring needs. PitchMe confirms fit and onboarding directly before any pilot billing begins.",
  },
  {
    question: "What is still being built?",
    answer:
      "Employer account automation and additional employer workflow tools are still being expanded. The pricing page only presents marketplace and pitch capabilities that are available today as live features.",
  },
];

export default function PricingPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Pricing</p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Free for candidates. $299/month for founding employers.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Start with the live marketplace today: candidate-controlled profiles, structured employer pitches, and direct candidate responses.
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
        <SectionHeading eyebrow="Pricing FAQ" title="What you can use today." />
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
