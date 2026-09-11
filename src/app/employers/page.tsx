import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmployerInterestForm } from "@/components/employers/EmployerInterestForm";

export const metadata: Metadata = {
  title: "For Employers",
  description:
    "Browse real opt-in candidate profiles and send structured role pitches with compensation, process, timeline, and fit details through the PitchMe Founding Employer Pilot.",
};

const comparison = [
  ["Generic recruiter message", "Structured role pitch"],
  ["Compensation may be hidden", "Compensation required"],
  ["Ask for a call first", "Show process and timeline first"],
  ["Candidate proves interest first", "Employer makes the first case"],
  ["Long back-and-forth", "Interested / Maybe / Pass"],
];

const liveNow = [
  "Browse real, opted-in public candidate profiles",
  "Pitch only candidates who are currently open to offers",
  "Require role, compensation, interview process, timeline, and contact details",
  "Explain why the candidate was selected",
  "Deliver pitches into the candidate's private dashboard",
  "Get hands-on founding-employer onboarding and priority support",
];

export default function EmployersPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">For employers</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] text-balance sm:text-5xl">
              If the role is good, make the case before asking a candidate for their time.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              PitchMe gives hiring teams a marketplace of real candidates who chose to be visible. Instead of sending another vague recruiter message, send a structured pitch with the information a candidate actually needs to decide whether to engage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#apply" size="lg">
                Request Founding Access
                <ArrowRight size={18} />
              </Button>
              <Button href="/talent" variant="secondary" size="lg">Browse Talent</Button>
            </div>
            <p className="mt-4 text-sm text-muted">Founding Employer Pilot: $299/month. Application does not start billing.</p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">A better first message</p>
            <div className="mt-5 space-y-4">
              {[
                ["Role", "Senior Product Designer"],
                ["Compensation", "$150K–$175K"],
                ["Interview process", "3 stages"],
                ["Hiring timeline", "Decision within 3 weeks"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-6 border-b border-line pb-4 text-sm last:border-0 last:pb-0">
                  <span className="text-muted">{label}</span>
                  <span className="text-right font-semibold text-ink">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-accent-soft p-4 text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Why you:</span> your recent design-systems work lines up with the product foundation we need to build this quarter.
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface">
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">PitchMe vs. traditional sourcing</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">Stop opening with “Are you open to a quick call?”</h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-line bg-paper">
            <div className="grid grid-cols-2 border-b border-line bg-ink text-paper">
              <div className="p-4 text-sm font-semibold sm:p-5">Traditional sourcing</div>
              <div className="border-l border-paper/15 p-4 text-sm font-semibold sm:p-5">PitchMe</div>
            </div>
            {comparison.map(([traditional, pitchme]) => (
              <div key={traditional} className="grid grid-cols-2 border-b border-line last:border-0">
                <div className="p-4 text-sm text-muted sm:p-5">{traditional}</div>
                <div className="border-l border-line p-4 text-sm font-medium text-ink sm:p-5">{pitchme}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Founding Employer Pilot</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-medium">$299</span>
              <span className="text-sm text-muted">/month</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              A hands-on early plan for employers that want to use the live marketplace and structured pitch flow now, with direct onboarding and support.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {liveNow.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4 text-sm text-ink-soft">
                <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="apply" className="scroll-mt-24 bg-paper">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Request access</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">Tell us what you are hiring for.</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              The founding pilot is intentionally hands-on. Submit your hiring needs and contact information so PitchMe can confirm fit before onboarding.
            </p>
          </div>
          <EmployerInterestForm />
        </Container>
      </section>
    </>
  );
}
