import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, PackageCheck, Scale, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  formatPrice,
  getAllProducts,
  getCategories,
  type Product,
} from "@/data/catalog";
import { cloudinary, formatWeight } from "@/lib/format";
import { site } from "@/lib/site";

/**
 * Full wholesale catalog on a single page — built for partner/platform
 * applications (print-on-demand marketplaces, fulfillment networks) that ask
 * for one link covering every product with pricing, weights and visuals.
 *
 * Deliberately UNLISTED: not in the nav, not in the sitemap, noindex, and
 * disallowed in robots.txt — the storefront keeps B2B pricing gated behind
 * quotes, so this page exists only as a shareable link for vetted partners.
 */

export const metadata: Metadata = {
  title: "Full Product Catalog & Wholesale Price List",
  description: `Complete ${site.name} catalog — every SKU with wholesale pricing, sizes, item and carton weights, and product visuals.`,
  robots: { index: false, follow: false },
};

function thumb(p: Product): string {
  return cloudinary(p.image, { width: 96 });
}

function ProductRow({ p }: { p: Product }) {
  return (
    <tr className="border-b border-border/60 last:border-0">
      <td className="py-2 pr-3">
        <Link
          href={`/product/${p.id}`}
          className="flex items-center gap-3 hover:text-brand-strong"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb(p)}
            alt={p.name}
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-md border border-border bg-background object-contain"
          />
          <span>
            <span className="block font-medium text-foreground">{p.name}</span>
            <span className="block text-xs text-muted-foreground">
              SKU {p.sku}
            </span>
          </span>
        </Link>
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-muted-foreground">
        {p.size ?? "—"}
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-muted-foreground">
        {p.weightLb ? formatWeight(p.weightLb) : "—"}
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-muted-foreground">
        {p.shippingWeightLb ? formatWeight(p.shippingWeightLb) : "—"}
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-muted-foreground">
        {p.dimensions ?? "—"}
      </td>
      <td className="whitespace-nowrap py-2 text-right font-medium text-foreground">
        {p.basePrice > 0 ? formatPrice(p.basePrice) : "Quote"}
      </td>
    </tr>
  );
}

export default function CatalogPage() {
  const categories = getCategories();
  const products = getAllProducts();
  const bySub = new Map<string, Product[]>();
  for (const p of products) {
    const key = `${p.categorySlug}/${p.subcategorySlug}`;
    (bySub.get(key) ?? bySub.set(key, []).get(key)!).push(p);
  }
  const withWeight = products.filter(
    (p) => p.weightLb || p.shippingWeightLb,
  ).length;

  return (
    <div>
      <section className="border-b border-border">
        <div className="container-px py-12 lg:py-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Full catalog" }]}
          />
          <div className="mt-8 max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <ClipboardList className="size-3.5" />
              Partner price list
            </span>
            <h1 className="mt-5 text-h2 text-foreground">
              Full product catalog &amp; wholesale price list
            </h1>
            <p className="mt-4 text-lead text-muted-foreground">
              Every product we personalize and blind drop-ship from Alpharetta,
              Georgia (USA) — {products.length.toLocaleString()} SKUs across{" "}
              {categories.length} categories, with wholesale pricing, sizes,
              item and carton weights, and shipping dimensions. Click any
              product for full specs, engraving area, additional photos, and
              color options; colors, materials and brand lines (e.g. Polar
              Camel drinkware) are stated in each product&apos;s name and
              detail page.
            </p>
            <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4">
                <PackageCheck className="size-5 shrink-0 text-brand-strong" />
                <div>
                  <dt className="text-muted-foreground">Products</dt>
                  <dd className="font-heading text-lg font-bold text-foreground">
                    {products.length.toLocaleString()}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4">
                <Scale className="size-5 shrink-0 text-brand-strong" />
                <div>
                  <dt className="text-muted-foreground">SKUs with weights</dt>
                  <dd className="font-heading text-lg font-bold text-foreground">
                    {withWeight.toLocaleString()}
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-4">
                <Truck className="size-5 shrink-0 text-brand-strong" />
                <div>
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-heading text-lg font-bold text-foreground">
                    Tracked, white-label
                  </dd>
                </div>
              </div>
            </dl>
            <p className="mt-6 text-sm text-muted-foreground">
              Shipping is weight-based using the per-SKU weights below —
              turnaround, packaging and tracking policy is on the{" "}
              <Link
                href="/shipping"
                className="font-medium text-brand-strong underline underline-offset-2"
              >
                shipping page
              </Link>
              ; for a rate card or volume pricing,{" "}
              <Link
                href="/quote"
                className="font-medium text-brand-strong underline underline-offset-2"
              >
                request a quote
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {categories.map((c) => (
        <section key={c.slug} className="border-b border-border">
          <div className="container-px py-10">
            <h2 className="text-h4 text-foreground">
              <Link href={`/category/${c.slug}`} className="hover:text-brand-strong">
                {c.name}
              </Link>{" "}
              <span className="text-sm font-normal text-muted-foreground">
                · {c.productCount.toLocaleString()} products
              </span>
            </h2>
            {c.subcategories.map((sc) => {
              const items = bySub.get(`${c.slug}/${sc.slug}`) ?? [];
              if (items.length === 0) return null;
              return (
                <div key={sc.slug} className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {sc.name}
                  </h3>
                  <div className="mt-3 overflow-x-auto rounded-xl border border-border">
                    <table className="w-full min-w-[760px] border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-border bg-background/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                          <th className="px-3 py-2 font-medium">Product</th>
                          <th className="px-3 py-2 font-medium">Size</th>
                          <th className="px-3 py-2 font-medium">Item weight</th>
                          <th className="px-3 py-2 font-medium">Ship weight</th>
                          <th className="px-3 py-2 font-medium">Carton dims</th>
                          <th className="px-3 py-2 text-right font-medium">
                            Wholesale
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&>tr>td:first-child]:pl-3 [&>tr>td:last-child]:pr-3">
                        {items.map((p) => (
                          <ProductRow key={p.id} p={p} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section>
        <div className="container-px py-10 text-sm text-muted-foreground">
          <p>
            Prices are wholesale, per unit, personalization included. Weights
            are pounds; &quot;Ship weight&quot; and &quot;Carton dims&quot; are
            per product type from our supplier&apos;s shipping master. Contact{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-strong underline underline-offset-2"
            >
              {site.email}
            </a>{" "}
            for the full rate card, volume tiers, or a CSV export of this
            catalog.
          </p>
        </div>
      </section>
    </div>
  );
}
