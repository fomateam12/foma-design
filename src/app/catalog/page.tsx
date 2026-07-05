import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, PackageCheck, Scale, Truck } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
} from "@/data/catalog";
import { catalogImageUrl } from "@/lib/catalog-image";
import { ENGRAVING_FEES } from "@/lib/partner-prices";
import { site } from "@/lib/site";

/**
 * Partner catalog index — first page of the unlisted, page-per-category
 * wholesale catalog built for partner/platform applications (Printify).
 * Structure: /catalog (categories) → /catalog/[slug] (subcategories) →
 * /catalog/[slug]/[subSlug] (products with prices).
 *
 * Deliberately UNLISTED: not in the nav, not in the sitemap, noindex, and
 * disallowed in robots.txt — the storefront keeps B2B pricing gated behind
 * quotes, so these pages exist only as a shareable link for vetted partners.
 */

export const metadata: Metadata = {
  title: "Full Product Catalog & Wholesale Price List",
  description: `Complete ${site.name} catalog — every SKU with wholesale pricing, sizes, item and carton weights, and product visuals.`,
  robots: { index: false, follow: false },
};

export default function CatalogIndexPage() {
  const categories = getCategories();
  const products = getAllProducts();
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
              {categories.length} categories. Pick a category below; each
              subcategory has its own page with photos, sizes, weights, carton
              dimensions and wholesale prices for every product. Colors,
              materials and brand lines (e.g. Polar Camel drinkware) are stated
              in each product&apos;s name and detail page.
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
              <strong className="font-medium text-foreground">Pricing:</strong>{" "}
              &quot;Blank&quot; is the undecorated unit price;
              &quot;Engraved&quot; is the all-in price per personalized unit
              (blank + ${ENGRAVING_FEES.front.toFixed(2)} front engraving + $
              {ENGRAVING_FEES.handling.toFixed(2)} handling). Back-side
              engraving adds ${ENGRAVING_FEES.back.toFixed(2)}. Products marked
              &quot;Quote&quot; are priced per order.{" "}
              <a
                href="https://pub-7dbfe9f161d34085b011aea74e8f75ac.r2.dev/catalog/FomaPrint-Catalog.pdf"
                className="font-medium text-brand-strong underline underline-offset-2"
              >
                Download the full catalog (PDF)
              </a>{" "}
              or{" "}
              <a
                href="/FomaPrint-Price-List.xlsx"
                className="font-medium text-brand-strong underline underline-offset-2"
                download
              >
                the price list (Excel)
              </a>
              .
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Shipping is weight-based using the per-SKU weights listed with
              each product — turnaround, packaging and tracking policy is on
              the{" "}
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

      <section>
        <div className="container-px py-12">
          <h2 className="text-h4 text-foreground">Browse by category</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const preview = getProductsByCategory(c.slug).slice(0, 3);
              return (
                <Link
                  key={c.slug}
                  href={`/catalog/${c.slug}`}
                  className="group rounded-2xl border border-border bg-background/60 p-5 transition-colors hover:border-brand-strong/50"
                >
                  <div className="flex items-center gap-2">
                    {preview.map((p) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={p.id}
                        src={catalogImageUrl(p.image, 96)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={56}
                        height={56}
                        className="size-14 rounded-lg border border-border bg-background object-contain"
                      />
                    ))}
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-foreground group-hover:text-brand-strong">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.productCount.toLocaleString()} products ·{" "}
                    {c.subcategories.length} collections
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-strong">
                    View price list
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Questions, volume tiers or a CSV export: contact{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-strong underline underline-offset-2"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
