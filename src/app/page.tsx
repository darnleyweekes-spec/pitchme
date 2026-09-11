import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { EmployerComparison } from "@/components/home/EmployerComparison";
import { ExamplePitch } from "@/components/home/ExamplePitch";
import { BillOfRights } from "@/components/home/BillOfRights";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <BenefitsSection />
      <EmployerComparison />
      <ExamplePitch />
      <BillOfRights />
      <PricingSection />
      <FAQ />
      <FinalCTA />
    </>
  );
}
