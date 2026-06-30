"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductImage } from "@/components/product-image";
import { ProductQuickView } from "@/components/product-quick-view";
import type { IconKey, Product } from "@/data/types";

/** Client-safe category-slug → fallback icon map (mirrors catalog.ts). */
const SLUG_ICON: Record<string, IconKey> = {
  "best-seller": "award",
  "gifts-and-promotions": "gift",
  "kitchen-and-bar": "gift",
  "travel-accessories": "gift",
  "personal-accessories": "gift",
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
  const [quickOpen, setQuickOpen] = useState(false);

  // For the hover swap: pick the first image whose basename differs from the
  // primary, because the curated list often pairs a PNG + JPG of the same
  // hero (e.g. images[0]=BPN101.png, images[1]=BPN101.jpg — identical photo,
  // hover swap would be invisible). We want the alternate-angle view —
  // typically the _OPEN / _COMPLETE / _BACK variant. Falls back to null when
  // every image in the array is the same view in different file formats.
  const primaryStem = product.images?.[0]
    ?.split("/")
    .pop()
    ?.replace(/\.[^.]+$/, "");
  const secondary =
    product.images?.find((url, i) => {
      if (i === 0) return false;
      const stem = url.split("/").pop()?.replace(/\.[^.]+$/, "");
      return stem !== primaryStem;
    }) ?? null;

  return (
    <div className={cn("group relative flex flex-col", className)}>
      <Link
        href={`/product/${product.id}`}
        className="flex flex-1 flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-white">
          <ProductImage
            src={product.image}
            alt={product.name}
            seed={product.sku}
            icon={icon}
            priority={priority}
            className="absolute inset-0"
            imgClassName={cn(
              "p-3 transition-all duration-300",
              secondary
                ? "group-hover:scale-[1.02] group-hover:opacity-0"
                : "group-hover:scale-[1.04]",
            )}
          />
          {secondary ? (
            <Image
              src={secondary}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw"
              className="absolute inset-0 object-contain p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          ) : null}
        </div>

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

      {/* Quick view pill — fades in on hover (desktop) and is always visible
          on mobile, where there is no hover state. Sits outside the Link so
          its click doesn't navigate. */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setQuickOpen(true);
        }}
        aria-label={`Quick view: ${product.name}`}
        className={cn(
          "absolute left-3 top-3 z-10 inline-flex items-center gap-1.5",
          "rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-foreground",
          "shadow-sm backdrop-blur transition-opacity duration-300",
          "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          // Desktop: hidden until hover. Mobile (<sm): always visible.
          "opacity-0 group-hover:opacity-100 max-sm:opacity-100",
        )}
      >
        <Eye className="size-3.5" />
        Quick view
      </button>

      {action ? (
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100 focus-within:opacity-100">
          {action}
        </div>
      ) : null}

      <ProductQuickView
        product={product}
        open={quickOpen}
        onOpenChange={setQuickOpen}
      />
    </div>
  );
}
