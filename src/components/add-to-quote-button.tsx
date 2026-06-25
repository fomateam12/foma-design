"use client";

import Link from "next/link";
import { toast } from "sonner";
import { Check, Plus, FileText } from "lucide-react";
import { useQuote, type QuoteItem } from "@/components/quote-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AddItem = Omit<QuoteItem, "quantity">;

/**
 * Adds a product to the running request-for-quote.
 * - `icon`  — compact circular toggle for the product-card hover overlay.
 * - `full`  — primary CTA for the product detail page.
 */
export function AddToQuoteButton({
  item,
  variant = "full",
  className,
}: {
  item: AddItem;
  variant?: "icon" | "full";
  className?: string;
}) {
  const { has, addItem, removeItem, hydrated } = useQuote();
  const inQuote = has(item.id);

  if (variant === "icon") {
    return (
      <button
        type="button"
        aria-pressed={inQuote}
        aria-label={inQuote ? `Remove ${item.name} from quote` : `Add ${item.name} to quote`}
        title={inQuote ? "In your quote — click to remove" : "Add to quote"}
        onClick={() => {
          if (inQuote) {
            removeItem(item.id);
            toast("Removed from your quote");
          } else {
            addItem(item);
            toast.success("Added to your quote", {
              action: { label: "View", onClick: () => location.assign("/quote") },
            });
          }
        }}
        className={cn(
          "grid size-9 place-items-center rounded-full border shadow-sm backdrop-blur-sm transition-all duration-200 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          inQuote
            ? "border-transparent bg-brand text-brand-foreground"
            : "border-border bg-background/90 text-foreground hover:bg-brand hover:text-brand-foreground hover:border-transparent",
          className,
        )}
      >
        {inQuote ? <Check className="size-4" /> : <Plus className="size-4" />}
      </button>
    );
  }

  if (inQuote) {
    return (
      <div className={cn("flex flex-col gap-2 sm:flex-row", className)}>
        <Link
          href="/quote"
          className={cn(buttonVariants({ variant: "brand", size: "lg" }), "flex-1")}
        >
          <FileText className="size-4" />
          View quote
        </Link>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => {
            removeItem(item.id);
            toast("Removed from your quote");
          }}
        >
          Remove
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="brand"
      size="lg"
      disabled={!hydrated}
      className={cn("flex-1", className)}
      onClick={() => {
        addItem(item);
        toast.success("Added to your quote", {
          action: { label: "View quote", onClick: () => location.assign("/quote") },
        });
      }}
    >
      <Plus className="size-4" />
      Add to quote
    </Button>
  );
}
