import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Avatar } from "@/components/ui/Avatar";

export function Hero() {
  return (
    <section className="border-b border-line">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium uppercase tracking-[0.1em] text-ink-soft">
            Built for people done applying
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
            Stop applying.
            <br />
            Start getting recruited.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            You shouldn&apos;t have to apply to 200 jobs to find one company that values your work.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
            Create your profile once. Choose whether it is public. Let companies tell you why they&apos;re worth your time.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/dashboard/candidate" size="lg">
              Create My Profile
              <ArrowRight size={18} />
            </Button>
            <Button href="/talent" variant="secondary" size="lg">
              Find Talent
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5"><CircleCheck size={16} className="text-positive" /> Candidate-controlled visibility</span>
            <span className="inline-flex items-center gap-1.5"><CircleCheck size={16} className="text-positive" /> Structured role pitches</span>
            <span className="inline-flex items-center gap-1.5"><CircleCheck size={16} className="text-positive" /> Interested / Maybe / Pass</span>
          </div>
        </div>

        <div className="relative">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">Illustrative sample — fictional company</p>
          <div className="rounded-lg border border-line bg-surface p-5 shadow-[0_1px_0_0_rgba(20,20,26,0.04)] sm:p-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Sample pitch</p>
                <p className="mt-1 font-display text-lg font-medium">Northlight Financial</p>
              </div>
              <Avatar name="Northlight Financial" accent="navy" size="md" />
            </div>

            <div className="mt-4 space-y-3">
              <Row label="Role" value="Design Lead, Core Product" />
              <Row label="Compensation" value="$160,000 – $185,000 / yr" />
              <Row label="Work style" value="Hybrid — 3 days/week" />
              <Row label="Interview process" value="4 stages" />
            </div>

            <div className="mt-5 rounded-md bg-accent-soft p-3.5 text-sm leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">Why you:</span> your design-systems work is exactly the kind of thinking we need right now.
            </div>

            <div className="mt-5 flex gap-2">
              <span className="flex-1 rounded-md bg-ink py-2.5 text-center text-sm font-medium text-paper">Interested</span>
              <span className="flex-1 rounded-md border border-line py-2.5 text-center text-sm font-medium text-ink-soft">Maybe</span>
              <span className="flex-1 rounded-md border border-line py-2.5 text-center text-sm font-medium text-ink-soft">Pass</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}
