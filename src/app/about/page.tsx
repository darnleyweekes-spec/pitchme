import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "PitchMe exists to reverse the direction of hiring — companies pitch candidates, not the other way around.",
};

const principles = [
  {
    title: "The application is the wrong unit",
    description:
      "An application optimizes for volume, not fit. We build for the opposite: one profile, evaluated once, taken seriously.",
  },
  {
    title: "Transparency isn't optional",
    description:
      "Pay range, interview process, and whether AI is involved — all disclosed before a candidate spends a minute engaging.",
  },
  {
    title: "Candidates aren't inventory",
    description:
      "No selling profiles in bulk, no résumé databases, no dark patterns that trade your data for a company's convenience.",
  },
  {
    title: "Good hiring is slower than a form",
    description:
      "A structured pitch takes longer to write than a job post. That effort is the point — it's a filter for companies who mean it.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            About PitchMe
          </p>
          <h1 className="font-display text-3xl font-medium leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
            We think hiring should start with a case, not a form.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            Most hiring software is built to process applications faster.
            We built PitchMe because the application itself is the problem —
            it asks the most qualified people to prove themselves through
            the least efficient possible channel: a form built for volume,
            evaluated by keyword.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            So we flipped it. Candidates build one real profile. Companies
            do the work of finding the right people and making a case for
            why they&apos;re worth a conversation. It&apos;s slower for
            employers and dramatically faster for everyone else — which is
            exactly the trade we think hiring has been missing.
          </p>
        </div>
      </Container>

      <div className="border-y border-line bg-surface">
        <Container className="py-16 sm:py-20">
          <SectionHeading eyebrow="What we believe" title="A few principles the product doesn't compromise on." />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="bg-surface p-6 sm:p-7">
                <h3 className="text-base font-semibold text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium">
              How we make money
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Employers pay a monthly subscription based on how many pitches
              they send. Candidates never pay for anything — not to build a
              profile, not to receive pitches, not to respond. See the{" "}
              <Link href="/pricing" className="underline underline-offset-2 hover:text-ink">
                pricing page
              </Link>{" "}
              for the current plans.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-medium">
              What we owe candidates
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              We wrote down the specific commitments we hold ourselves to as
              the{" "}
              <Link href="/#bill-of-rights" className="underline underline-offset-2 hover:text-ink">
                Candidate Bill of Rights
              </Link>
              . It governs product decisions, not just marketing copy.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-line bg-ink p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-medium text-paper sm:text-3xl">
            Ready to see it in action?
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/dashboard/candidate" size="lg">
              Create My Profile
            </Button>
            <Button
              href="/talent"
              variant="secondary"
              size="lg"
              className="border-paper/40 text-paper hover:border-accent hover:text-accent"
            >
              Find Talent
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
