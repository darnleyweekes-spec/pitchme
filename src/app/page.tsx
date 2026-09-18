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
import { TutorialVideo } from "@/components/home/TutorialVideo";

export default function Home() {
  return (
    <>
      <Hero />
      <TutorialVideo />
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
