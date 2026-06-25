import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Responsive bento grid wrapper. Cards span via className (e.g. lg:col-span-2). */
export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

const toneStyles = {
  default: "bg-card text-card-foreground border-border",
  muted: "bg-secondary/50 text-foreground border-border",
  brand: "bg-brand-muted text-foreground border-brand/25",
  ink: "grain bg-ink text-ink-foreground border-ink-border",
} as const;

/**
 * Tactile bento card. Hairline border, layered warm shadow, generous padding.
 * When `href` is set it becomes an interactive, hover-elevated link with an
 * affordance arrow. Compose freely via `children`, or use the icon/title/
 * description shorthands.
 */
export function BentoCard({
  children,
  icon,
  eyebrow,
  title,
  description,
  media,
  href,
  tone = "default",
  className,
}: {
  children?: ReactNode;
  icon?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  media?: ReactNode;
  href?: string;
  tone?: keyof typeof toneStyles;
  className?: string;
}) {
  const interactive = Boolean(href);
  const inkTone = tone === "ink";

  const body = (
    <>
      {media ? <div className="mb-5">{media}</div> : null}
      {icon ? (
        <div
          className={cn(
            "mb-4 grid size-11 place-items-center rounded-xl",
            inkTone
              ? "bg-white/10 text-brand"
              : "bg-brand-muted text-brand-strong",
          )}
        >
          {icon}
        </div>
      ) : null}
      {eyebrow ? (
        <div
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.16em]",
            inkTone ? "text-brand" : "text-brand-strong",
          )}
        >
          {eyebrow}
        </div>
      ) : null}
      {title ? (
        <h3
          className={cn(
            "text-h3",
            eyebrow && "mt-2",
            inkTone ? "text-ink-foreground" : "text-foreground",
          )}
        >
          {title}
        </h3>
      ) : null}
      {description ? (
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            inkTone ? "text-ink-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
      {interactive ? (
        <ArrowUpRight
          className={cn(
            "absolute right-5 top-5 size-5 transition-all duration-300 ease-premium",
            "opacity-0 -translate-y-0.5 translate-x-0.5 group-hover/bento:opacity-100 group-hover/bento:translate-x-0 group-hover/bento:translate-y-0",
            inkTone ? "text-brand" : "text-brand-strong",
          )}
        />
      ) : null}
    </>
  );

  const classes = cn(
    "group/bento relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-card transition-all duration-300 ease-premium sm:p-7",
    toneStyles[tone],
    interactive && "hover:-translate-y-1 hover:shadow-lg",
    className,
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
          {body}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return <div className={classes}>{body}</div>;
}
