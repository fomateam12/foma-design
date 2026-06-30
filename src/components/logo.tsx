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
        className="shrink-0 transition-transform duration-300 ease-premium group-hover:-rotate-3"
      >
        {/* Engraved F monogram — the brand mark: an "F" laser-incised into a
            rust tile (matches app/icon.svg). */}
        <svg viewBox="0 0 64 64" className="size-8 drop-shadow-sm" fill="none">
          <defs>
            <linearGradient
              id="foma-logo-tile"
              x1="32"
              y1="3"
              x2="32"
              y2="61"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#c2592a" />
              <stop offset="1" stopColor="#8d3a17" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="58" height="58" rx="16" fill="url(#foma-logo-tile)" />
          <rect
            x="3.75"
            y="3.75"
            width="56.5"
            height="56.5"
            rx="15.25"
            stroke="#ffffff"
            strokeOpacity="0.16"
            strokeWidth="1.5"
          />
          <path
            d="M24 18 H41.5 V24.6 H30.7 V29.9 H39.5 V36.3 H30.7 V44 H24 Z"
            fill="#000000"
            fillOpacity="0.15"
            transform="translate(0 0.9)"
          />
          <path
            d="M24 18 H41.5 V24.6 H30.7 V29.9 H39.5 V36.3 H30.7 V44 H24 Z"
            fill="#f8f2e7"
          />
        </svg>
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
