import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "For Candidates",
  description:
    "Create a free PitchMe profile, choose when employers can find you, and receive structured role pitches with compensation and hiring details up front.",
};

const steps = [
  {
    number: "01",
    title: "Create one profile",
    body: "Summarize the work you do, what you are good at, and the kinds of opportunities you would consider.",
  },
  {
    number: "02",
    title: "Choose when you are visible",
    body: "Your profile starts private. Publish it only when you want to appear in Browse Talent, and turn new pitches off whenever you want.",
  },
  {
    number: "03",
    title: "Make employers pitch first",
    body: "A pitch has to include the role, compensation, interview process, hiring timeline, contact details, and why the employer chose you.",
  },
  {
    number: "04",
    title: "Respond on your terms",
    body: "Mark a pitch Interested, Maybe, or Pass. A Pass does not require an explanation.",
  },
];

const protections = [
  "Profile is private by default",
  "Email and account ID stay off the public profile",
  "Compensation is required in every live pitch",
  "You control whether new pitches are allowed",
  "No automatic enrollment in an employer application system",
  "Candidate access is free",
];

export default function CandidatesPage() {
  return (
    <>
      <section className="border-b border-line">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">For candidates</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] text-balance sm:text-5xl">
              You should know what the opportunity is before giving it your time.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              PitchMe reverses the usual recruiting flow. Create one free profile, decide when employers can find you, and make interested companies show the important details first.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/login?next=/dashboard/candidate" size="lg">
                Create Your Free Profile
                <ArrowRight size={18} />
              </Button>
              <Button href="/talent" variant="secondary" size="lg">See the marketplace</Button>
            </div>
          </div>

          <div className="rounded-xl border border-line bg-surface p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">Before you reply to a pitch</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Role", "Required"],
                ["Compensation", "Required"],
                ["Interview process", "Required"],
                ["Hiring timeline", "Required"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-line bg-paper p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-muted">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              Employers also have to provide contact details and explain why they selected you.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-surface">
        <Container className="py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">How it works</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl">One profile. Four simple decisions.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
            {steps.map((step) => (
              <div key={step.number} className="bg-paper p-6 sm:p-7">
                <p className="font-display text-lg text-muted">{step.number}</p>
                <h3 className="mt-5 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-ink text-paper">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-paper/60">Candidate control</p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">Your profile. Your visibility. Your response.</h2>
              <p className="mt-4 text-sm leading-relaxed text-paper/70">
                PitchMe is designed so candidates can explore opportunities without publishing more personal information than the marketplace needs.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {protections.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-lg border border-paper/15 p-4 text-sm text-paper/85">
                  <Check size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <Button href="/login?next=/dashboard/candidate" size="lg" className="bg-paper text-ink hover:bg-accent hover:text-accent-ink">
              Create Your Free Profile
              <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
