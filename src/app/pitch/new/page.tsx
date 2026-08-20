import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PitchForm } from "@/components/pitch/PitchForm";

export const metadata: Metadata = {
  title: "Pitch Me Your Role",
  description:
    "Send a structured opportunity directly to a real candidate who has opted into the PitchMe marketplace.",
};

export default function PitchNewPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Pitch me your role
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Make your case clearly.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Choose a real public candidate and send the role, compensation, process, and the reason you selected them. The pitch goes directly into that candidate&apos;s private dashboard.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <Suspense fallback={<p className="text-sm text-ink-soft">Loading available candidates…</p>}>
          <PitchForm />
        </Suspense>
      </div>
    </Container>
  );
}
