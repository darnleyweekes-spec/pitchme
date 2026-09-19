import { Container } from "@/components/ui/Container";

export function TutorialVideo() {
  return (
    <section id="tutorial" className="scroll-mt-20 border-b border-line bg-surface">
      <Container className="grid gap-8 py-14 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">
            See the 38-second walkthrough
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-balance sm:text-4xl">
            Watch the recruiting process flip
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            See how candidates control their visibility while employers lead with the role, compensation, process, timeline, and reason for reaching out.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-ink-soft">
            <span className="rounded-full border border-line bg-paper px-3 py-2">Candidate-controlled</span>
            <span className="rounded-full border border-line bg-paper px-3 py-2">Compensation first</span>
            <span className="rounded-full border border-line bg-paper px-3 py-2">Clear next step</span>
          </div>
        </div>

        <div className="min-w-0">
          <video
            className="aspect-video w-full rounded-lg border border-line bg-ink object-cover shadow-[0_18px_45px_rgba(20,20,26,0.14)]"
            controls
            playsInline
            preload="metadata"
            poster="/tutorials/pitchme-employers-pitch-first-poster.jpg"
            aria-label="PitchMe employer-first recruiting tutorial"
          >
            <source src="/tutorials/pitchme-employers-pitch-first.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </Container>
    </section>
  );
}
