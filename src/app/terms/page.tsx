import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms",
  description: "Early-access terms for PitchMe by Prime24 AI.",
};

export default function TermsPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Terms</p>
        <h1 className="mt-3 font-display text-3xl font-medium sm:text-4xl">Early-access terms</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">Last updated August 20, 2026. PitchMe is an early-access product by Prime24 AI.</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-soft">
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Use the product accurately</h2>
            <p className="mt-2">Candidates should publish information they are comfortable making public. Employers should send genuine opportunities and must not submit misleading compensation, company, role, process, or contact details.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">No employment guarantee</h2>
            <p className="mt-2">PitchMe provides profile visibility and a structured introduction workflow. It does not guarantee interviews, offers, employment, candidate responses, hiring outcomes, or the accuracy of information supplied by other users.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Candidate control</h2>
            <p className="mt-2">A candidate may make a profile private or stop accepting new pitches at any time through the candidate dashboard. Employers should respect a candidate's current availability status.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Founding Employer Pilot</h2>
            <p className="mt-2">The employer pilot includes manual onboarding and direct support while employer accounts and automated billing are still being developed. Pilot scope and payment terms are confirmed directly before onboarding.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Changes and availability</h2>
            <p className="mt-2">Because the product is in early access, features may change, be removed, or experience interruptions. Material changes to pricing or pilot terms will be communicated before they apply to an existing paid pilot arrangement.</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-medium text-ink">Contact</h2>
            <p className="mt-2">Questions about these terms can be sent to darnleyweekes@prime24ai.com.</p>
          </section>
        </div>
      </div>
    </Container>
  );
}
