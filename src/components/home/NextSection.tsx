import { ArrowDown } from "lucide-react";

export function NextSection({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-10 flex justify-end">
      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Next: {label}
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
