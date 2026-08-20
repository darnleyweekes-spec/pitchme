import {
  ShieldCheck,
  Wallet,
  UserCheck,
  Clock3,
  Search,
  Filter,
  MessageSquareText,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const candidateBenefits = [
  {
    icon: ShieldCheck,
    title: "Skip the application queue",
    description: "One profile replaces every résumé upload and cover letter you'll ever write again.",
  },
  {
    icon: Wallet,
    title: "Compensation up front",
    description: "Every pitch includes real numbers before you spend a minute on a call.",
  },
  {
    icon: UserCheck,
    title: "Companies explain themselves",
    description: "Each pitch tells you why they picked you and why you should care — not the reverse.",
  },
  {
    icon: Clock3,
    title: "You set the pace",
    description: "Mark availability, respond when you want, and never chase a recruiter for status.",
  },
];

const employerBenefits = [
  {
    icon: Search,
    title: "Search, don't post and pray",
    description: "Filter by skill, experience, comp range, and availability to find who you actually need.",
  },
  {
    icon: Filter,
    title: "See real work, not keywords",
    description: "Portfolios and experience are visible up front — no résumé-parsing guesswork.",
  },
  {
    icon: MessageSquareText,
    title: "Lead with your pitch",
    description: "A structured format keeps you honest about role, pay, and process before you reach out.",
  },
  {
    icon: Target,
    title: "Reach candidates who aren't job-hunting",
    description: "The best people are rarely applying anywhere. This is how you find them anyway.",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-line bg-surface">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
          <div>
            <SectionHeading eyebrow="For candidates" title="Built around your time, not a recruiter's pipeline." />
            <ul className="mt-8 space-y-6">
              {candidateBenefits.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-ink">
                    <Icon size={17} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button href="/dashboard/candidate" variant="secondary" className="mt-8">
              Create My Profile
            </Button>
          </div>

          <div className="border-t border-line pt-16 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <SectionHeading eyebrow="For employers" title="Find people who aren't in anyone's applicant pool." />
            <ul className="mt-8 space-y-6">
              {employerBenefits.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-ink">
                    <Icon size={17} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Button href="/talent" variant="secondary" className="mt-8">
              Find Talent
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
