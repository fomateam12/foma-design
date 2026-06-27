import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Marquee } from "@/components/marquee";
import { ProductImage } from "@/components/product-image";
import { getProduct } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import type { IconKey, Product } from "@/data/types";

/**
 * Signature home banner: an auto-scrolling row of curated, high-margin catalog
 * products a reseller would dropship. SKUs are the catalog defaults (JDS +
 * FOMA); any id missing from the dataset is skipped so the row never breaks.
 * The Marquee is pure CSS, so it pauses under prefers-reduced-motion.
 */
const CURATED_SKUS = [
  "gft167",
  "apf4810gy",
  "gft905",
  "foma-tumbler-40oz",
  "ltm858",
  "llf2810",
  "gft1210",
  "ltm7262",
  "gft1023",
  "foma-lighter-groomsmen",
];

const SLUG_ICON: Record<string, IconKey> = {
  "best-seller": "award",
  "gifts-and-promotions": "gift",
  "polar-camel": "cup-soda",
  drinkware: "coffee",
  "frames-and-decor": "frame",
  "office-tech": "notebook",
};

export function ProductBanner() {
  const products = CURATED_SKUS.map((id) => getProduct(id)).filter(
    (p): p is Product => Boolean(p),
  );

  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="banner-heading"
      className="border-b border-border bg-secondary/30 py-10 lg:py-14"
    >
      <div className="container-px flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow text-brand-strong">Products to sell</span>
          <h2
            id="banner-heading"
            className="mt-1.5 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            High-margin inventory, ready to dropship
          </h2>
        </div>
        <Link
          href="/categories"
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-strong hover:underline sm:inline-flex"
        >
          All products
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <Marquee className="mt-7">
        {products.map((p, i) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="group/card block w-44 shrink-0 outline-none sm:w-48"
          >
            <ProductImage
              src={p.image}
              alt={p.name}
              seed={p.sku}
              icon={SLUG_ICON[p.categorySlug] ?? "gift"}
              width={400}
              priority={i < 4}
              sizes="200px"
              className="aspect-square rounded-2xl border border-border shadow-soft transition-all duration-300 ease-premium group-hover/card:-translate-y-1 group-hover/card:shadow-lg group-focus-visible/card:ring-2 group-focus-visible/card:ring-ring"
              imgClassName="p-4 transition-transform duration-500 group-hover/card:scale-[1.04]"
            />
            <p className="mt-3 line-clamp-2 text-sm font-medium leading-snug text-foreground">
              {p.name}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-brand-strong">
              from {formatPrice(p.basePrice)}
            </p>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}
