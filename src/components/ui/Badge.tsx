import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "positive" | "caution";

const tones: Record<Tone, string> = {
  neutral: "bg-ink/[0.06] text-ink-soft",
  accent: "bg-accent-soft text-accent",
  positive: "bg-positive-soft text-positive",
  caution: "bg-caution-soft text-caution",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
