export interface PricingPlan {
  id: string;
  audience: "candidate" | "employer";
  name: string;
  price: string;
  cadence?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "candidate-free",
    audience: "candidate",
    name: "Candidate",
    price: "Free",
    description: "Always. We don't charge people looking for work.",
    features: [
      "One complete profile, always up to date",
      "Unlimited pitches from verified companies",
      "Full control over visibility and availability",
      "Interested / Maybe / Pass on every pitch",
      "No résumé re-entry, ever",
    ],
    cta: "Create My Profile",
    href: "/dashboard/candidate",
  },
  {
    id: "employer-starter",
    audience: "employer",
    name: "Starter",
    price: "$299",
    cadence: "/month",
    description: "For teams making a handful of hires at a time.",
    features: [
      "Full candidate search & filters",
      "10 active pitches per month",
      "Structured pitch builder",
      "Response tracking dashboard",
      "Email support",
    ],
    cta: "Start hiring",
    href: "/pitch/new",
  },
  {
    id: "employer-growth",
    audience: "employer",
    name: "Growth",
    price: "$899",
    cadence: "/month",
    description: "For teams hiring consistently across multiple roles.",
    features: [
      "Everything in Starter",
      "40 active pitches per month",
      "Team seats & shared pipelines",
      "Saved searches & candidate alerts",
      "Priority support",
    ],
    cta: "Start hiring",
    href: "/pitch/new",
    highlighted: true,
  },
  {
    id: "employer-enterprise",
    audience: "employer",
    name: "Enterprise",
    price: "Custom",
    description: "For talent teams hiring at scale, with real integrations.",
    features: [
      "Everything in Growth",
      "Unlimited pitches",
      "ATS & HRIS integrations",
      "Dedicated success manager",
      "Custom contracts & invoicing",
    ],
    cta: "Talk to sales",
    href: "/about",
  },
];
