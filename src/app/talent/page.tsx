import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TalentBrowser } from "@/components/candidates/TalentBrowser";

export const metadata: Metadata = {
  title: "Browse Talent",
  description:
    "Browse real candidate profiles that have explicitly opted into the PitchMe talent marketplace.",
};

export default function TalentPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Browse talent
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Find people, not fabricated resumes.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Every profile in this marketplace belongs to a real PitchMe user who chose to be listed publicly. No demo candidates are mixed into live search results.
        </p>
      </div>

      <div className="mt-10">
        <TalentBrowser />
      </div>
    </Container>
  );
}
