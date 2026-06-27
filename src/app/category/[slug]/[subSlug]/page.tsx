import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Tags } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { CatalogFilters } from "@/components/catalog-filters";
import { cn } from "@/lib/utils";
import {
  getCategories,
  getSubcategory,
  getProductsBySubcategory,
} from "@/data/catalog";
import {
  buildColorFacets,
  buildMaterialFacets,
  buildSizeFacets,
  filterByColor,
  filterByMaterial,
  filterBySize,
  planFacets,
} from "@/lib/product-taxonomy";

function asArray(v: string | string[] | undefined): string[] {
  if (Array.isArray(v)) return v;
  if (typeof v === "string") return v ? [v] : [];
  return [];
}

export function generateStaticParams() {
  const params: { slug: string; subSlug: string }[] = [];
  for (const c of getCategories()) {
    for (const sc of c.subcategories) {
      params.push({ slug: c.slug, subSlug: sc.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
}): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const found = getSubcategory(slug, subSlug);
  if (!found) return { title: "Not found" };
  const { category, subcategory } = found;
  const description = `Shop ${subcategory.productCount} personalized ${subcategory.name.toLowerCase()} — laser-engraved to order and blind drop-shipped by FomaPrint. Wholesale pricing for resellers.`;
  return {
    title: `${subcategory.name} — ${category.name}`,
    description,
    alternates: { canonical: `/category/${category.slug}/${subcategory.slug}` },
    openGraph: { title: `${subcategory.name} · FomaPrint`, description },
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; subSlug: string }>;
  searchParams: Promise<{
    size?: string | string[];
    color?: string | string[];
    material?: string | string[];
  }>;
}) {
  const { slug, subSlug } = await params;
  const sp = await searchParams;
  const found = getSubcategory(slug, subSlug);
  if (!found) notFound();
  const { category, subcategory } = found;
  const all = getProductsBySubcategory(category.slug, subcategory.slug);

  const activeSizes = asArray(sp.size);
  const activeColors = asArray(sp.color);
  const activeMaterials = asArray(sp.material);
  const filtered = filterByMaterial(
    filterByColor(filterBySize(all, activeSizes), activeColors),
    activeMaterials,
  );

  const sizeFacets = buildSizeFacets(all);
  const colorFacets = buildColorFacets(all);
  const materialFacets = buildMaterialFacets(all);
  const plan = planFacets(all, sizeFacets, colorFacets, materialFacets);
  const hasAnyFacet =
    plan.showOz ||
    plan.showRect ||
    plan.showInch ||
    plan.showDiam ||
    plan.showColor ||
    plan.showMaterial;
  const basePath = `/category/${category.slug}/${subcategory.slug}`;

  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: category.name, href: `/category/${category.slug}` },
          { label: subcategory.name },
        ]}
      />

      <header className="mt-6 max-w-2xl">
        <Link
          href={`/category/${category.slug}`}
          className="eyebrow text-brand-strong hover:underline"
        >
          {category.name}
        </Link>
        <h1 className="mt-2 text-h2 text-foreground">{subcategory.name}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {subcategory.blurb}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Tags className="size-3.5 text-brand-strong" />
          {all.length.toLocaleString()} products · Wholesale pricing on request
        </p>
      </header>

      {/* Sibling subcategories */}
      <nav
        aria-label={`More in ${category.name}`}
        className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1"
      >
        {category.subcategories.map((sc) => {
          const active = sc.slug === subcategory.slug;
          return (
            <Link
              key={sc.slug}
              href={`/category/${category.slug}/${sc.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                active
                  ? "border-brand bg-brand-muted font-medium text-brand-strong"
                  : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {sc.name}
            </Link>
          );
        })}
      </nav>

      {hasAnyFacet ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <CatalogFilters
            basePath={basePath}
            plan={plan}
            sizeFacets={sizeFacets}
            colorFacets={colorFacets}
            materialFacets={materialFacets}
            subFacets={[]}
            activeSizes={activeSizes}
            activeSubs={[]}
            activeColors={activeColors}
            activeMaterials={activeMaterials}
          />
          <div className="min-w-0">
            {activeSizes.length + activeColors.length + activeMaterials.length > 0 ? (
              <p className="mb-4 text-sm text-muted-foreground">
                {filtered.length.toLocaleString()}{" "}
                {filtered.length === 1 ? "match" : "matches"} for{" "}
                <span className="font-medium text-foreground">
                  {[...activeColors, ...activeMaterials, ...activeSizes].join(", ")}
                </span>
              </p>
            ) : null}
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} priorityCount={4} />
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No <strong>{subcategory.name}</strong> match the selected
                  filters.
                </p>
                <Link
                  href={basePath}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong hover:underline"
                >
                  Clear filters
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : all.length > 0 ? (
        <ProductGrid products={all} className="mt-8" priorityCount={4} />
      ) : (
        <p className="mt-10 text-muted-foreground">
          No products in this collection yet.
        </p>
      )}
    </div>
  );
}
