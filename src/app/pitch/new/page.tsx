import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PitchForm } from "@/components/pitch/PitchForm";
import { candidates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pitch Me Your Role",
  description:
    "Send a structured pitch directly to a candidate — role, pay, process, and why they should care.",
};

export default function PitchNewPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Pitch me your role
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Make your case in one structured pitch.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Every pitch uses the same format, so candidates always know what
          they&apos;re looking at: the role, the pay, why you chose them, and
          why they should choose you back.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <Suspense fallback={null}>
          <PitchForm candidates={candidates} />
        </Suspense>
      </div>
    </Container>
  );
}
