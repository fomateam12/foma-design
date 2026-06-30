import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  FileText,
  Mail,
  Truck,
  ShieldCheck,
  Tags,
  Ruler,
  Package,
  Box,
  Scan,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { ProductGallery } from "@/components/product-gallery";
import { AddToQuoteButton } from "@/components/add-to-quote-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cloudinary, formatWeight } from "@/lib/format";
import {
  getAllProducts,
  getProduct,
  getRelatedProducts,
} from "@/data/catalog";
import { site } from "@/lib/site";
import { DISPATCH_NOTE } from "@/lib/site-copy";

/**
 * ISR window. Catalog data is updated occasionally (supplier scrape, manual
 * curation), so a static page can serve from the edge cache for a day before
 * the optimizer regenerates it. New product pages skipped by
 * `generateStaticParams` fall through to on-demand SSG on first visit and
 * land in the edge cache there.
 */
export const revalidate = 86400;

/**
 * Pre-render only the first slice of product pages at build time — the rest
 * are generated on demand via ISR. This shaves a couple of minutes off CI
 * (805 pages × prerender ≈ 3 minutes cold-build cost) and lets new SKUs go
 * live without a full rebuild. The slice is deterministic (catalog order),
 * so consecutive deploys hit the same prebuilt set + edge cache.
 */
const PREBUILT_PRODUCT_COUNT = 120;

export function generateStaticParams() {
  return getAllProducts()
    .slice(0, PREBUILT_PRODUCT_COUNT)
    .map((p) => ({ id: p.id }));
}

/** Allow on-demand rendering of product IDs that weren't pre-built. */
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Product not found" };
  const ogImage = cloudinary(product.image, { width: 1200 });
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title: `${product.name} · FomaPrint`,
      description: product.description,
      images: [{ url: ogImage, width: 1200, height: 1200, alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const related = getRelatedProducts(product, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: cloudinary(product.imageFull, { width: 1200 }),
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.basePrice.toFixed(2),
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: site.legalName },
    },
  };

  return (
    <div className="container-px py-10 lg:py-14">
      <script
        type="application/ld+json"
        // Escape `<` so catalog text can never break out of the script tag.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: product.categoryName, href: `/category/${product.categorySlug}` },
          {
            label: product.subcategoryName,
            href: `/category/${product.categorySlug}/${product.subcategorySlug}`,
          },
          { label: product.name },
        ]}
        className="mb-6"
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery — when the SKU has a curated multi-view binding the gallery
            shows up to 6 thumbnails; otherwise it falls back to the single
            supplier image, sized + transformed through Cloudinary. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductGallery
            images={
              product.images && product.images.length > 0
                ? product.images
                : [cloudinary(product.imageFull, { width: 900 })]
            }
            alt={product.name}
          />
        </div>

        {/* Details */}
        <div>
          <Link
            href={`/category/${product.categorySlug}/${product.subcategorySlug}`}
            className="text-sm font-medium text-brand-strong hover:underline"
          >
            {product.subcategoryName}
          </Link>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="font-mono text-xs uppercase tracking-wide">
              SKU: {product.sku}
            </span>
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
            <p className="font-heading text-lg font-semibold text-foreground">
              Wholesale pricing on request
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tiered reseller pricing with personalization included — add this
              item to a quote and we&apos;ll send rates the same business day.
            </p>
          </div>

          <p className="mt-5 leading-relaxed text-muted-foreground">
            {product.longDescription}
          </p>

          {/* Specifications — surfaced as a compact chip grid so wholesale
              buyers can scan the size, weight, carton dimensions and
              engraving area without scrolling. Dimensions and engraving
              area come from the supplier's shipping master keyed by
              product type; `Weight` is the per-SKU item weight from the
              FOMA master list. */}
          {product.size ||
          product.weightLb ||
          product.dimensions ||
          product.engravingArea ? (
            <dl className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.size ? (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm">
                  <Ruler className="size-4 shrink-0 text-brand-strong" />
                  <dt className="font-medium text-foreground">Size</dt>
                  <dd className="text-muted-foreground">{product.size}</dd>
                </div>
              ) : null}
              {product.weightLb ? (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm">
                  <Package className="size-4 shrink-0 text-brand-strong" />
                  <dt className="font-medium text-foreground">Weight</dt>
                  <dd className="text-muted-foreground">
                    {formatWeight(product.weightLb)}
                  </dd>
                </div>
              ) : null}
              {product.dimensions ? (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm">
                  <Box className="size-4 shrink-0 text-brand-strong" />
                  <dt className="font-medium text-foreground">Dimensions</dt>
                  <dd className="text-muted-foreground">{product.dimensions}</dd>
                </div>
              ) : null}
              {product.engravingArea ? (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm">
                  <Scan className="size-4 shrink-0 text-brand-strong" />
                  <dt className="font-medium text-foreground">
                    Engraving area
                  </dt>
                  <dd className="text-muted-foreground">
                    {product.engravingArea}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          {/* Personalization */}
          <div className="mt-7 rounded-2xl border border-border bg-secondary/40 p-5">
            <h2 className="font-heading text-sm font-semibold text-foreground">
              What you can personalize
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {product.personalization.map((opt) => (
                <li key={opt.id} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-evergreen" />
                  <span>
                    <span className="font-medium text-foreground">
                      {opt.label}
                    </span>
                    {opt.options ? ` — ${opt.options.join(", ")}` : ""}
                    {opt.helpText ? (
                      <span className="block text-xs text-muted-foreground/80">
                        {opt.helpText}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-6 space-y-3">
            <AddToQuoteButton
              item={{
                id: product.id,
                sku: product.sku,
                name: product.name,
                image: product.image,
              }}
              variant="full"
              className="w-full"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex-1",
                )}
              >
                <FileText className="size-4" />
                Request a quote
              </Link>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  `Question about ${product.name} (${product.sku})`,
                )}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "flex-1",
                )}
              >
                <Mail className="size-4" />
                Ask a question
              </a>
            </div>
          </div>

          {/* Trust */}
          <div className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 size-5 text-brand-strong" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Same-day reply on every quote request
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <Truck className="mt-0.5 size-5 text-brand-strong" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Made to order · {DISPATCH_NOTE}
              </p>
            </div>
            <div className="flex items-start gap-2.5">
              <Tags className="mt-0.5 size-5 text-brand-strong" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Bulk & corporate pricing available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 ? (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              You may also like
            </h2>
            <Link
              href={`/category/${product.categorySlug}/${product.subcategorySlug}`}
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-strong transition-colors hover:text-rust-bright sm:inline-flex"
            >
              More {product.subcategoryName}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ProductGrid products={related} className="mt-6" />
        </section>
      ) : null}
    </div>
  );
}
