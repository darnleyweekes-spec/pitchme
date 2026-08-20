import Link from "next/link";
import { Container } from "@/components/ui/Container";

const columns = [
  {
    heading: "For Candidates",
    links: [
      { href: "/dashboard/candidate", label: "Create your profile" },
      { href: "/dashboard/candidate", label: "Candidate dashboard" },
      { href: "/#bill-of-rights", label: "Candidate Bill of Rights" },
    ],
  },
  {
    heading: "For Employers",
    links: [
      { href: "/talent", label: "Browse talent" },
      { href: "/pitch/new", label: "Send a pitch" },
      { href: "/dashboard/employer", label: "Employer dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-ink"
            >
              PitchMe
            </Link>
            <p className="mt-3 max-w-[22ch] text-sm leading-relaxed text-muted">
              Stop applying. Start getting recruited.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-ink">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} PitchMe, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/about" className="hover:text-ink">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
