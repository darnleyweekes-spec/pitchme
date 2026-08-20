import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/Button";
import { pricingPlans } from "@/lib/pricing";

const homepagePlans = pricingPlans.filter((p) =>
  ["candidate-free", "employer-growth", "employer-enterprise"].includes(p.id),
);

export function PricingSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Pricing"
            title="Free for candidates. Straightforward for everyone else."
          />
          <Button href="/pricing" variant="secondary" size="md" className="shrink-0">
            See full pricing
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {homepagePlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
