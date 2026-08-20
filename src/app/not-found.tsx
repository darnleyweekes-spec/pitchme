import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-6xl font-medium text-line">404</p>
      <h1 className="mt-4 font-display text-2xl font-medium">
        This page didn&apos;t make the cut.
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back home</Button>
        <Button href="/talent" variant="secondary">
          Browse talent
        </Button>
      </div>
    </Container>
  );
}
