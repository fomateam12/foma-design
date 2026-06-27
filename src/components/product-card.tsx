import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import type { IconKey, Product } from "@/data/types";

/** Client-safe category-slug → fallback icon map (mirrors catalog.ts). */
const SLUG_ICON: Record<string, IconKey> = {
  "best-seller": "award",
  "gifts-and-promotions": "gift",
  "polar-camel": "cup-soda",
  drinkware: "coffee",
  "frames-and-decor": "frame",
  "office-tech": "notebook",
};

export function ProductCard({
  product,
  className,
  priority = false,
  action,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  /** Optional overlay action (e.g. an Add-to-quote button). */
  action?: ReactNode;
}) {
  const icon = SLUG_ICON[product.categorySlug] ?? "gift";

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <Link
        href={`/product/${product.id}`}
        className="flex flex-1 flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          seed={product.sku}
          icon={icon}
          priority={priority}
          className="aspect-square rounded-2xl border border-border"
          imgClassName="p-3 group-hover:scale-[1.04]"
        />

        <div className="mt-3.5 flex flex-1 flex-col gap-1 px-0.5">
          <p className="text-xs font-medium text-muted-foreground">
            {product.subcategoryName}
          </p>
          <h3 className="line-clamp-2 text-[0.95rem] font-medium text-foreground transition-colors group-hover:text-brand-strong">
            {product.name}
          </h3>
          <div className="mt-auto flex items-center justify-between pt-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground/80">
              {product.sku}
            </span>
            <span className="text-xs font-medium text-brand-strong">
              Request pricing
            </span>
          </div>
        </div>
      </Link>

      {action ? (
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100 focus-within:opacity-100">
          {action}
        </div>
      ) : null}
    </div>
  );
}
