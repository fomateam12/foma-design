import { ProductCard } from "@/components/product-card";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/types";

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
  withQuoteAction = true,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
  /** Render the hover "Add to quote" affordance on each card. */
  withQuoteAction?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard
          key={p.id}
          product={p}
          priority={i < priorityCount}
          action={
            withQuoteAction ? (
              <AddToQuoteButton
                variant="icon"
                item={{ id: p.id, sku: p.sku, name: p.name, image: p.image }}
              />
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
