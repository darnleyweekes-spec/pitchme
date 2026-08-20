import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EmployerDashboard } from "@/components/dashboard/EmployerDashboard";
import { getPitchesForCompany } from "@/lib/data";

export const metadata: Metadata = {
  title: "Employer Dashboard",
  description: "Track every pitch you've sent and how candidates responded.",
};

const companyName = "Northlight Financial";

export default function EmployerDashboardPage() {
  const pitches = getPitchesForCompany(companyName);

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Employer dashboard
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          {companyName}
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
          Every pitch you&apos;ve sent, and exactly where it stands.
        </p>
      </div>

      <EmployerDashboard companyName={companyName} pitches={pitches} />
    </Container>
  );
}
