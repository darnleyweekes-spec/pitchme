import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/Button";
import { pricingPlans } from "@/lib/pricing";

export function PricingSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Pricing"
            title="Free for candidates. Founding-employer access for teams."
          />
          <Button href="/pricing" variant="secondary" size="md" className="shrink-0">
            See pricing details
          </Button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
