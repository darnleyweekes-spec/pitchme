import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "PitchMe by Prime24 AI is an early-access experiment in reversing the direction of recruiting.",
};

const principles = [
  {
    title: "Candidate control comes first",
    description:
      "Profiles start private. Candidates choose whether to appear in Browse Talent and whether they are open to new pitches.",
  },
  {
    title: "Opportunity details should be clear",
    description:
      "The live pitch flow requires compensation, work style, interview process, hiring timeline, a contact email, and a reason for reaching out.",
  },
  {
    title: "Public profiles should be genuine",
    description:
      "Live marketplace results come only from real PitchMe users who opted in. Fictional product examples are labeled as samples and kept separate from live talent.",
  },
  {
    title: "Build the smallest useful loop first",
    description:
      "The current MVP focuses on candidate profiles, public opt-in, structured role pitches, and private candidate responses before adding broader employer workflow features.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">About PitchMe by Prime24 AI</p>
          <h1 className="font-display text-3xl font-medium leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
            What if employers made the first case for the opportunity?
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            PitchMe is an early-access reverse-recruiting product. Candidates create a concise profile, decide whether it should be public, and control whether employers can send them role pitches.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Employers browse only real, opted-in profiles. When a candidate is open to offers, an employer can send a structured role pitch that lands in the candidate&apos;s private dashboard.
          </p>
        </div>
      </Container>

      <div className="border-y border-line bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="What we believe" title="Principles the current product is designed around." />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="bg-surface p-6 sm:p-7">
                <h3 className="text-base font-semibold text-ink">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium">How the early-access model works</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Candidate access is free. Employers can request the Founding Employer Pilot for manual onboarding and direct support while automated employer accounts and billing are still being built. See the{" "}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-ink">pricing page</Link>{" "}
              for what is live today.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium">What candidates control</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              The{" "}
              <Link href="/#bill-of-rights" className="underline underline-offset-2 hover:text-ink">Candidate Bill of Rights</Link>{" "}
              summarizes the privacy and pitch controls the current product actually enforces.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-line bg-ink p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">Try the early-access loop.</h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/dashboard/candidate" size="lg">Create My Profile</Button>
            <Button href="/talent" variant="secondary" size="lg" className="border-paper/40 text-paper hover:border-accent hover:text-accent">Browse Talent</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
