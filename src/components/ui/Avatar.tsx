import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

const palette: Record<string, string> = {
  amber: "bg-[#f0703b] text-[#fff7ed]",
  navy: "bg-[#1e3a5f] text-[#eef3fa]",
  forest: "bg-[#2f5233] text-[#eef6ef]",
  clay: "bg-[#a3462a] text-[#fdf1ea]",
  slate: "bg-[#43454d] text-[#f2f2f3]",
  plum: "bg-[#5c3a52] text-[#f7eef3]",
};

export function Avatar({
  name,
  accent,
  size = "md",
  className,
}: {
  name: string;
  accent: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-base",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-display font-medium",
        sizes[size],
        palette[accent] ?? palette.slate,
        className,
      )}
    >
      {initials(name)}
    </div>
  );
}
