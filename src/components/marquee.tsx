import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Renders its children twice and translates the
 * track by -50% for a seamless loop. Each copy carries a trailing gap (pe-12)
 * equal to the inter-item gap (gap-12) so the seam spacing is even. Pure CSS
 * (animate-marquee), so it auto-pauses under prefers-reduced-motion via the
 * global motion reset.
 *
 * Pass children as a fragment of sibling items (e.g. several logos).
 */
export function Marquee({
  children,
  className,
  reverse = false,
  slow = false,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  slow?: boolean;
  pauseOnHover?: boolean;
}) {
  const copy = "flex shrink-0 items-center gap-12 pe-12";
  const track = cn(
    "flex w-max",
    slow ? "animate-marquee-slow" : "animate-marquee",
    reverse && "[animation-direction:reverse]",
    pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
  );

  return (
    <div className={cn("group/marquee marquee-mask overflow-hidden", className)}>
      <div className={track}>
        <div className={copy}>{children}</div>
        <div className={copy} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
