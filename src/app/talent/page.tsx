import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TalentBrowser } from "@/components/candidates/TalentBrowser";
import { candidates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Talent",
  description:
    "Search candidates by skill, experience, work style, and availability — then send a structured pitch directly.",
};

export default function TalentPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Browse talent
        </p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">
          Find people, not resumes.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Every profile shows real work, real skills, and real availability.
          When you find someone worth hiring, send them a pitch — not an
          application form.
        </p>
      </div>

      <div className="mt-10">
        <TalentBrowser candidates={candidates} />
      </div>
    </Container>
  );
}
