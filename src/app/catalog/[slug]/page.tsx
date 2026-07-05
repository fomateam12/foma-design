import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  getCategories,
  getCategory,
  getProductsBySubcategory,
} from "@/data/catalog";
import { cloudinary } from "@/lib/format";
import { site } from "@/lib/site";

/** Partner catalog — category page: one card per subcategory, each with its
 *  own price-list page. Unlisted/noindex like the rest of /catalog. */

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} — Wholesale Price List`,
    description: `${category.name} wholesale catalog from ${site.name} — prices, weights and photos for every product.`,
    robots: { index: false, follow: false },
  };
}

export default async function CatalogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <div>
      <section className="border-b border-border">
        <div className="container-px py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Full catalog", href: "/catalog" },
              { label: category.name },
            ]}
          />
          <h1 className="mt-8 text-h2 text-foreground">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-lead text-muted-foreground">
            {category.productCount.toLocaleString()} products across{" "}
            {category.subcategories.length} collections — pick a collection to
            see its full price list with photos, sizes and weights.
          </p>
        </div>
      </section>

      <section>
        <div className="container-px py-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.subcategories.map((sc) => {
              const items = getProductsBySubcategory(category.slug, sc.slug);
              const preview = items.slice(0, 3);
              return (
                <Link
                  key={sc.slug}
                  href={`/catalog/${category.slug}/${sc.slug}`}
                  className="group rounded-2xl border border-border bg-background/60 p-5 transition-colors hover:border-brand-strong/50"
                >
                  <div className="flex items-center gap-2">
                    {preview.map((p) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={p.id}
                        src={cloudinary(p.image, { width: 96 })}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={56}
                        height={56}
                        className="size-14 rounded-lg border border-border bg-background object-contain"
                      />
                    ))}
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-semibold text-foreground group-hover:text-brand-strong">
                    {sc.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {sc.productCount.toLocaleString()} products
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-strong">
                    View price list
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
