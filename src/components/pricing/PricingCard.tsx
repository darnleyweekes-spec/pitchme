import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "@/lib/pricing";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border p-6 sm:p-7",
        plan.highlighted
          ? "border-ink bg-ink text-paper"
          : "border-line bg-surface",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium">{plan.name}</h3>
        {plan.highlighted && <Badge tone="accent">Most popular</Badge>}
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-3xl font-medium">{plan.price}</span>
        {plan.cadence && (
          <span
            className={cn(
              "text-sm",
              plan.highlighted ? "text-paper/60" : "text-muted",
            )}
          >
            {plan.cadence}
          </span>
        )}
      </div>

      <p
        className={cn(
          "mt-3 text-sm leading-relaxed",
          plan.highlighted ? "text-paper/75" : "text-muted",
        )}
      >
        {plan.description}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check
              size={16}
              className={cn(
                "mt-0.5 shrink-0",
                plan.highlighted ? "text-paper" : "text-accent",
              )}
              aria-hidden
            />
            <span className={plan.highlighted ? "text-paper/90" : "text-ink-soft"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        href={plan.href}
        variant={plan.highlighted ? "primary" : "secondary"}
        className={cn(
          "mt-7 w-full",
          plan.highlighted &&
            "bg-paper text-ink hover:bg-accent hover:text-accent-ink",
        )}
      >
        {plan.cta}
      </Button>
    </div>
  );
}
