import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  getCategories,
  getProductsBySubcategory,
  getSubcategory,
  type Product,
} from "@/data/catalog";
import { catalogImageUrl } from "@/lib/catalog-image";
import { formatPrice, formatWeight } from "@/lib/format";
import {
  ENGRAVING_FEES,
  inPartnerCatalog,
  partnerPriceFor,
} from "@/lib/partner-prices";
import { site } from "@/lib/site";

/** Partner catalog — subcategory page: every product as a card with photo,
 *  specs and wholesale prices. Unlisted/noindex like the rest of /catalog. */

export function generateStaticParams() {
  return getCategories().flatMap((c) =>
    c.subcategories.map((sc) => ({ slug: c.slug, subSlug: sc.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const match = getSubcategory(slug, subSlug);
  if (!match) return {};
  return {
    title: `${match.subcategory.name} — Wholesale Price List`,
    description: `${match.subcategory.name} wholesale price list from ${site.name} — photos, sizes, weights and per-unit prices.`,
    robots: { index: false, follow: false },
  };
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const price = partnerPriceFor(p.sku);
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background/60 p-4">
      <Link
        href={`/product/${p.id}`}
        className="block overflow-hidden rounded-xl border border-border bg-background"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={catalogImageUrl(p.image, 400)}
          alt={p.name}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
          className="aspect-square w-full object-contain"
        />
      </Link>
      <h3 className="mt-4 font-medium text-foreground">
        <Link href={`/product/${p.id}`} className="hover:text-brand-strong">
          {p.name}
        </Link>
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        SKU {p.sku}
        {p.size ? ` · ${p.size}` : ""}
      </p>
      <dl className="mt-3 space-y-1.5 border-t border-border/60 pt-3 text-xs">
        <Spec
          label="Item weight"
          value={p.weightLb ? formatWeight(p.weightLb) : "—"}
        />
        <Spec
          label="Ship weight"
          value={p.shippingWeightLb ? formatWeight(p.shippingWeightLb) : "—"}
        />
        <Spec label="Carton" value={p.dimensions ?? "—"} />
      </dl>
      <div className="mt-auto flex items-end justify-between gap-2 border-t border-border/60 pt-3">
        {price ? (
          <>
            <div className="text-xs text-muted-foreground">
              Blank{" "}
              <span className="font-medium text-foreground">
                {formatPrice(price.blank)}
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Engraved</div>
              <div className="font-heading text-lg font-bold text-foreground">
                {formatPrice(price.total)}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-right font-heading text-lg font-bold text-foreground">
            Quote
          </div>
        )}
      </div>
    </div>
  );
}

export default async function CatalogSubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}) {
  const { slug, subSlug } = await params;
  const match = getSubcategory(slug, subSlug);
  if (!match) notFound();
  const { category, subcategory } = match;
  const items = getProductsBySubcategory(slug, subSlug).filter(inPartnerCatalog);

  return (
    <div>
      <section className="border-b border-border">
        <div className="container-px py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Full catalog", href: "/catalog" },
              { label: category.name, href: `/catalog/${category.slug}` },
              { label: subcategory.name },
            ]}
          />
          <h1 className="mt-8 text-h2 text-foreground">{subcategory.name}</h1>
          <p className="mt-3 max-w-2xl text-lead text-muted-foreground">
            {items.length.toLocaleString()} products in {category.name} —
            wholesale prices per unit. &quot;Engraved&quot; includes the blank,
            ${ENGRAVING_FEES.front.toFixed(2)} front engraving and $
            {ENGRAVING_FEES.handling.toFixed(2)} handling; back-side engraving
            adds ${ENGRAVING_FEES.back.toFixed(2)}.
          </p>
        </div>
      </section>

      <section>
        <div className="container-px py-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
