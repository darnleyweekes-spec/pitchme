import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EmployerDashboard } from "@/components/dashboard/EmployerDashboard";
import { getPitchesForCompany } from "@/lib/data";

export const metadata: Metadata = {
  title: "Employer Dashboard Demo",
  description: "Illustrative employer dashboard using clearly labeled sample data.",
};

const companyName = "Northlight Financial — sample company";

export default function EmployerDashboardPage() {
  const pitches = getPitchesForCompany("Northlight Financial");

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Employer dashboard demo
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          {companyName}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          Illustrative sample data only. This page is a product example, not a real employer account or live hiring activity.
        </p>
      </div>

      <EmployerDashboard companyName="Northlight Financial" pitches={pitches} />
    </Container>
  );
}
