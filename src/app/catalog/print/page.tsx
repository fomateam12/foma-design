import type { Metadata } from "next";
import {
  getCategories,
  getProductsBySubcategory,
  type Product,
} from "@/data/catalog";
import { catalogImageUrl } from "@/lib/catalog-image";
import { formatPrice, formatWeight } from "@/lib/format";
import { ENGRAVING_FEES, partnerPriceFor } from "@/lib/partner-prices";
import { site } from "@/lib/site";

/**
 * Print-optimized single-document version of the partner catalog — the
 * source for the downloadable PDF (rendered via headless Chrome
 * print-to-pdf). Images load eagerly so offscreen products still appear in
 * the printed document. Unlisted/noindex like the rest of /catalog.
 */

export const metadata: Metadata = {
  title: "FomaPrint Catalog (print version)",
  robots: { index: false, follow: false },
};

function PrintCard({ p }: { p: Product }) {
  const price = partnerPriceFor(p.sku);
  return (
    <div
      className="rounded-lg border border-border p-2 text-[10px] leading-tight"
      style={{ breakInside: "avoid" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={catalogImageUrl(p.image, 200)}
        alt={p.name}
        width={200}
        height={200}
        className="aspect-square w-full rounded-md border border-border/60 bg-white object-contain"
      />
      <p className="mt-1.5 font-medium text-foreground">{p.name}</p>
      <p className="text-muted-foreground">
        SKU {p.sku}
        {p.size ? ` · ${p.size}` : ""}
      </p>
      <p className="text-muted-foreground">
        {p.weightLb ? formatWeight(p.weightLb) : ""}
        {p.dimensions ? ` · box ${p.dimensions}` : ""}
      </p>
      <p className="mt-0.5 font-semibold text-foreground">
        {price
          ? `Blank ${formatPrice(price.blank)} · Engraved ${formatPrice(price.total)}`
          : "Priced per order (quote)"}
      </p>
    </div>
  );
}

export default function CatalogPrintPage() {
  const categories = getCategories();
  return (
    <div className="container-px py-8">
      {/* The site chrome (sticky nav, footer, floating quote button) would
          repeat or overlay pages in Chrome's print rendering — hide it. */}
      <style>{`@media print { body > header, body > footer, nav, [data-floating] { display: none !important } }`}</style>
      <header style={{ breakInside: "avoid" }}>
        <h1 className="text-h2 text-foreground">
          {site.name} — Full Product Catalog &amp; Wholesale Price List
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Personalized, laser-engraved products, blind drop-shipped from
          Alpharetta, Georgia (USA). Prices are wholesale per unit:
          &quot;Blank&quot; is the undecorated unit price; &quot;Engraved&quot;
          is all-in (blank + ${ENGRAVING_FEES.front.toFixed(2)} front engraving
          + ${ENGRAVING_FEES.handling.toFixed(2)} handling); back-side
          engraving adds ${ENGRAVING_FEES.back.toFixed(2)}. Weights are pounds.
          Live version with photos: {site.url.replace(/\/$/, "")}/catalog ·
          Contact: {site.email}
        </p>
      </header>
      {categories.map((c) => (
        <section key={c.slug} className="mt-8" style={{ breakBefore: "page" }}>
          <h2 className="border-b border-border pb-2 text-h3 text-foreground">
            {c.name}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              · {c.productCount.toLocaleString()} products
            </span>
          </h2>
          {c.subcategories.map((sc) => {
            const items = getProductsBySubcategory(c.slug, sc.slug);
            if (items.length === 0) return null;
            return (
              <div key={sc.slug} className="mt-5">
                <h3
                  className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
                  style={{ breakAfter: "avoid" }}
                >
                  {c.name} › {sc.name} ({items.length})
                </h3>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {items.map((p) => (
                    <PrintCard key={p.id} p={p} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}
