import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * FomaPrint wordmark. A single clean lockup: a small engraved brass tile
 * (abstract — deliberately not a letter, so it never reads as "FFomaPrint")
 * followed by the wordmark. Use `tone="inverted"` on dark ink sections.
 */
export function Logo({
  className,
  onClick,
  tone = "default",
}: {
  className?: string;
  onClick?: () => void;
  tone?: "default" | "inverted";
}) {
  const inverted = tone === "inverted";
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="FomaPrint — home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative grid size-8 place-items-center overflow-hidden rounded-[0.55rem] shadow-sm ring-1 ring-[oklch(0.4_0.04_60/0.25)] transition-transform duration-300 ease-premium group-hover:-rotate-3"
        style={{ background: "var(--metallic)" }}
      >
        {/* engraved diagonal hairline */}
        <span className="block h-px w-4 -rotate-45 bg-[oklch(0.25_0.02_56/0.7)]" />
        <span className="absolute inset-0 rounded-[0.55rem] shadow-[inset_0_1px_0_oklch(1_0_0/0.4)]" />
      </span>
      <span
        className={cn(
          "font-heading text-xl font-semibold tracking-tight",
          inverted ? "text-ink-foreground" : "text-foreground",
        )}
      >
        Foma
        <span className={inverted ? "text-brand" : "text-brand-strong"}>
          Print
        </span>
      </span>
    </Link>
  );
}
