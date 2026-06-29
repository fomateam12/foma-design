"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useQuote } from "@/components/quote-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Header link to the request-for-quote, with a live line-count badge. */
export function QuoteIndicator({ className }: { className?: string }) {
  const { count, hydrated } = useQuote();
  const show = hydrated && count > 0;

  return (
    <Link
      href="/quote"
      aria-label={
        show ? `Request a quote — ${count} item${count === 1 ? "" : "s"}` : "Request a quote"
      }
      title={
        show ? `Request a quote — ${count} item${count === 1 ? "" : "s"}` : "Request a quote"
      }
      className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "relative", className)}
    >
      <FileText className="size-4" />
      {show ? (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-brand-foreground shadow-sm tabular-nums">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}
