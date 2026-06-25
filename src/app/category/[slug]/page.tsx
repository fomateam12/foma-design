import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Tags } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { ProductImage } from "@/components/product-image";
import { CategoryIcon } from "@/components/category-icon";
import { Reveal } from "@/components/reveal";
import {
  getCategories,
  getCategory,
  getProductsBySubcategory,
  getProductsByCategory,
} from "@/data/catalog";

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
  if (!category) return { title: "Category not found" };
  return {
    title: category.name,
    description: category.blurb,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: { title: `${category.name} · FomaPrint`, description: category.blurb },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const popular = getProductsByCategory(category.slug).slice(0, 8);

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-28 right-[-8%] h-[30rem] w-[30rem] rounded-full bg-brand-muted/60 blur-3xl" />
        </div>
        <div className="container-px py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Categories", href: "/categories" },
              { label: category.name },
            ]}
          />
          <div className="mt-6 flex items-start gap-4">
            <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-brand-muted text-brand-strong sm:grid">
              <CategoryIcon icon={category.icon} className="size-7" />
            </span>
            <div className="max-w-2xl">
              <span className="eyebrow text-brand-strong">Category</span>
              <h1 className="mt-2 text-h2 text-foreground">{category.name}</h1>
              <p className="mt-3 text-lead text-muted-foreground">
                {category.blurb}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Tags className="size-3.5 text-brand-strong" />
                {category.productCount.toLocaleString()} products ·{" "}
                {category.subcategories.length} collections · Wholesale pricing on
                request
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-px py-12 lg:py-16">
        {/* Subcategory tiles */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-foreground">
            Browse {category.name}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {category.subcategories.map((sc, i) => {
              const thumb = getProductsBySubcategory(category.slug, sc.slug)[0];
              return (
                <Reveal key={sc.slug} delay={Math.min(i * 0.04, 0.24)}>
                  <Link
                    href={`/category/${category.slug}/${sc.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <ProductImage
                      src={thumb?.image ?? ""}
                      alt={sc.name}
                      seed={sc.slug}
                      icon={category.icon}
                      width={400}
                      priority={i < 4}
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="aspect-square border-b border-border"
                      imgClassName="p-3 group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-col gap-0.5 p-3.5">
                      <h3 className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-brand-strong">
                        {sc.name}
                      </h3>
                      <span className="mt-auto pt-1 text-xs text-muted-foreground">
                        {sc.productCount} products
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Popular products */}
        {popular.length > 0 ? (
          <section className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Popular in {category.name}
              </h2>
              <Link
                href={`/category/${category.slug}/${category.subcategories[0]?.slug ?? ""}`}
                className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-strong hover:underline sm:inline-flex"
              >
                Shop the collection
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <ProductGrid products={popular} className="mt-6" />
          </section>
        ) : null}
      </div>
    </div>
  );
}
