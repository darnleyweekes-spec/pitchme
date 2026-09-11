import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-paper">
      <Container className="py-20 text-center sm:py-28">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
          Put yourself where the right opportunity can find you.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-soft">
          Create a free profile, keep it private until you&apos;re ready, and choose when employers can make the first case for an opportunity.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/candidates" size="lg">
            Create Your Free Profile
            <ArrowRight size={18} />
          </Button>
          <Button href="/employers" variant="secondary" size="lg">I&apos;m Hiring</Button>
        </div>
      </Container>
    </section>
  );
}
