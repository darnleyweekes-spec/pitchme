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
    description: "Create a real profile and control exactly when it becomes public.",
    features: [
      "Private-by-default candidate profile",
      "Opt-in listing in Browse Talent",
      "Open-to-offers control",
      "Role pitches delivered to your private dashboard",
      "Interested / Maybe / Pass responses",
    ],
    cta: "Create My Profile",
    href: "/dashboard/candidate",
  },
  {
    id: "employer-pilot",
    audience: "employer",
    name: "Founding Employer Pilot",
    price: "$299",
    cadence: "/month",
    description: "Manual onboarding and direct support while employer accounts and billing automation are completed.",
    features: [
      "Browse real opt-in public candidate profiles",
      "Send structured role pitches to candidates accepting offers",
      "Required compensation, process, timeline, and contact details",
      "Direct delivery into the candidate's private dashboard",
      "Founding-customer onboarding and product feedback channel",
    ],
    cta: "Request pilot access",
    href: "mailto:darnleyweekes@prime24ai.com?subject=PitchMe%20Founding%20Employer%20Pilot",
    highlighted: true,
  },
];
