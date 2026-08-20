import {
  ShieldCheck,
  Wallet,
  UserCheck,
  Clock3,
  Search,
  Eye,
  MessageSquareText,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const candidateBenefits = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    description: "Your profile does not enter Browse Talent until you explicitly publish it.",
  },
  {
    icon: Wallet,
    title: "Compensation in the pitch",
    description: "Employers must enter compensation or rate information before sending an opportunity.",
  },
  {
    icon: UserCheck,
    title: "You control availability",
    description: "Keep a public profile while turning off new pitches, or make the profile private entirely.",
  },
  {
    icon: Clock3,
    title: "Simple responses",
    description: "Review opportunities in your private dashboard and mark Interested, Maybe, or Pass.",
  },
];

const employerBenefits = [
  {
    icon: Search,
    title: "Browse real opt-in profiles",
    description: "Live search results come from real PitchMe users who chose to publish their profiles.",
  },
  {
    icon: Eye,
    title: "Only genuine profile fields",
    description: "The marketplace displays only information candidates actually entered — no invented résumé details.",
  },
  {
    icon: MessageSquareText,
    title: "Lead with a structured pitch",
    description: "Send the role, pay, work style, process, timeline, and a specific reason for reaching out.",
  },
  {
    icon: Target,
    title: "Reach people open to hearing from you",
    description: "The pitch form only lists public candidates who currently have Open to offers enabled.",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          <div>
            <SectionHeading eyebrow="For candidates" title="Control what employers can see and when they can reach you." />
            <ul className="mt-8 space-y-6">
              {candidateBenefits.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-ink">
                    <Icon size={17} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button href="/dashboard/candidate" variant="secondary" className="mt-8">Create My Profile</Button>
          </div>

          <div className="border-t border-line pt-16 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <SectionHeading eyebrow="For employers" title="Start with people who chose to be discoverable." />
            <ul className="mt-8 space-y-6">
              {employerBenefits.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-ink">
                    <Icon size={17} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button href="/talent" variant="secondary" className="mt-8">Find Talent</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
