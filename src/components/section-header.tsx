import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Editorial section header: eyebrow with a short engraved metallic rule, a
 * fluid display title, an optional lead description and an optional action
 * (e.g. a "view all" link). Use `tone="inverted"` on dark ink sections.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  action,
  titleClassName,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverted";
  action?: ReactNode;
  titleClassName?: string;
  className?: string;
}) {
  const inverted = tone === "inverted";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        action && !centered ? "md:flex-row md:items-end md:justify-between" : "",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <div
            className={cn(
              "flex items-center gap-3",
              centered && "justify-center",
            )}
          >
            <span
              aria-hidden="true"
              className="h-px w-8 rounded-full"
              style={{ background: "var(--metallic)" }}
            />
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.18em]",
                inverted ? "text-brand" : "text-brand-strong",
              )}
            >
              {eyebrow}
            </span>
          </div>
        ) : null}

        <h2
          className={cn(
            "mt-3 text-h2",
            inverted ? "text-ink-foreground" : "text-foreground",
            titleClassName,
          )}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={cn(
              "mt-4 text-lead",
              inverted ? "text-ink-muted" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className={cn(centered && "text-center")}>{action}</div> : null}
    </div>
  );
}
