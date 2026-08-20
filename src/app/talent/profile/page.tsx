import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { TalentProfile } from "@/components/candidates/TalentProfile";

export const metadata: Metadata = {
  title: "Candidate Profile",
  description: "View a real candidate profile that has opted into the PitchMe marketplace.",
};

export default function TalentProfilePage() {
  return (
    <Container className="py-10 sm:py-14">
      <Suspense fallback={<p className="text-sm text-ink-soft">Loading candidate profile…</p>}>
        <TalentProfile />
      </Suspense>
    </Container>
  );
}
