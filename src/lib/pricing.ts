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
    description: "Create a real profile, keep it private by default, and choose when employers can find you.",
    features: [
      "Private-by-default candidate profile",
      "Opt-in listing in Browse Talent",
      "Open-to-offers control",
      "Role pitches delivered to your private dashboard",
      "Interested / Maybe / Pass responses",
    ],
    cta: "Create Your Free Profile",
    href: "/candidates",
  },
  {
    id: "employer-pilot",
    audience: "employer",
    name: "Founding Employer Pilot",
    price: "$299",
    cadence: "/month",
    description: "A hands-on founding plan for teams that want to source from the live marketplace and send structured role pitches now.",
    features: [
      "Founding-employer onboarding",
      "Browse real opt-in public candidate profiles",
      "Send structured role pitches to candidates accepting offers",
      "Compensation, interview process, timeline, and contact details required",
      "Direct delivery into each candidate's private dashboard",
      "Priority product support and founding-customer feedback channel",
    ],
    cta: "Request Founding Access",
    href: "/employers#apply",
    highlighted: true,
  },
];
