import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Tags } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { SiblingSubcategoryNav } from "@/components/sibling-subcategory-nav";
import { ChipScroller, FilterChip } from "@/components/filter-chip";
import {
  getCategories,
  getSubcategory,
  getProductsBySubcategory,
} from "@/data/catalog";
import {
  buildSizeTierFacets,
  buildTypeFacets,
  buildVolumeFacets,
  filterBySizeTier,
  filterByType,
  filterByVolume,
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
  searchParams: Promise<{ size?: string | string[]; type?: string | string[] }>;
}) {
  const { slug, subSlug } = await params;
  const sp = await searchParams;
  const found = getSubcategory(slug, subSlug);
  if (!found) notFound();
  const { category, subcategory } = found;
  const all = getProductsBySubcategory(category.slug, subcategory.slug);

  const activeSizes = asArray(sp.size);
  const activeTypes = asArray(sp.type);
  const typeFacets = buildTypeFacets(all);

  // Pick the secondary axis automatically:
  //   - Drinkware-style subcategories with ≥2 volumes → oz chips.
  //   - Dimensional goods (frames, portfolios, boards) without a
  //     volume → Small / Medium / Large tiers from the rect / linear
  //     / diameter normalization.
  //   - Single-size collections (one volume or no usable size data) →
  //     no secondary nav, just the grid.
  const volumeFacets = buildVolumeFacets(all);
  // A single detected volume (e.g. this collection is uniformly "20 oz")
  // still means the products carry usable size data — tier chips are only
  // for products with NO oz/volume info at all (frames, portfolios, boards).
  const sizeTierFacets = volumeFacets.length === 0 ? buildSizeTierFacets(all) : [];
  const sizeAxis: "volume" | "tier" | "none" =
    volumeFacets.length >= 2
      ? "volume"
      : sizeTierFacets.length >= 2
        ? "tier"
        : "none";
  const sizeFacets = sizeAxis === "volume" ? volumeFacets : sizeTierFacets;

  const sizeFiltered =
    sizeAxis === "tier"
      ? filterBySizeTier(all, activeSizes)
      : filterByVolume(all, activeSizes);
  const filtered = filterByType(sizeFiltered, activeTypes);

  const basePath = `/category/${category.slug}/${subcategory.slug}`;
  // Build a query string carrying over the OTHER axis's current selection
  // (sizes when constructing a type-chip link, types when constructing a
  // size-chip link) so the two filters compose instead of clobbering
  // each other.
  const carrySizes = () => {
    const params = new URLSearchParams();
    for (const s of activeSizes) params.append("size", s);
    return params;
  };
  const carryTypes = () => {
    const params = new URLSearchParams();
    for (const t of activeTypes) params.append("type", t);
    return params;
  };

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

      {/* Sibling subcategories — chip rail with scroll arrows */}
      <SiblingSubcategoryNav
        categoryName={category.name}
        categorySlug={category.slug}
        siblings={category.subcategories.map((sc) => ({
          slug: sc.slug,
          name: sc.name,
        }))}
        activeSlug={subcategory.slug}
      />

      {/* Size sub-navigation. For drinkware-style collections the chips
          are oz volumes (12 oz Water Bottles, 20 oz …). For dimensional
          goods (frames, portfolios, cutting boards) the data is bucketed
          into Small / Medium / Large via area / linear thresholds. The
          axis is picked automatically based on what the subcategory's
          products actually carry. */}
      {sizeAxis !== "none" ? (
        <nav
          aria-label={`${subcategory.name} by size`}
          className="mt-6 space-y-2"
        >
          <p className="overline">Browse by size</p>
          <ChipScroller aria-label={`${subcategory.name} by size`}>
            <FilterChip
              href={activeTypes.length ? `${basePath}?${carryTypes().toString()}` : basePath}
              label="All sizes"
              count={filterByType(all, activeTypes).length}
              selected={activeSizes.length === 0}
            />
            {sizeFacets.map((f) => {
              const isActive = activeSizes.includes(f.canonical);
              const params = carryTypes();
              params.append("size", f.canonical);
              const labelSuffix =
                sizeAxis === "volume"
                  ? ` ${subcategory.name.replace(/^\d+\s*oz\.?\s*/i, "")}`
                  : "";
              return (
                <FilterChip
                  key={f.canonical}
                  href={`${basePath}?${params.toString()}`}
                  label={`${f.canonical}${labelSuffix}`}
                  count={f.count}
                  selected={isActive}
                />
              );
            })}
          </ChipScroller>
        </nav>
      ) : null}

      {/* Type sub-navigation — only appears when a merged subcategory's
          products carry ≥2 distinct finer-grained subcategoryName values
          (e.g. a single "20 oz. Tumblers" page grouping Clear Lid / Slider
          Lid / ION-Plated / Gold ION / Golf variants under one URL). */}
      {typeFacets.length >= 2 ? (
        <nav
          aria-label={`${subcategory.name} by type`}
          className="mt-6 space-y-2"
        >
          <p className="overline">Browse by type</p>
          <ChipScroller aria-label={`${subcategory.name} by type`}>
            <FilterChip
              href={activeSizes.length ? `${basePath}?${carrySizes().toString()}` : basePath}
              label="All types"
              count={sizeFiltered.length}
              selected={activeTypes.length === 0}
            />
            {typeFacets.map((f) => {
              const isActive = activeTypes.includes(f.slug);
              const params = carrySizes();
              params.append("type", f.slug);
              return (
                <FilterChip
                  key={f.slug}
                  href={`${basePath}?${params.toString()}`}
                  label={f.name}
                  count={f.count}
                  selected={isActive}
                />
              );
            })}
          </ChipScroller>
        </nav>
      ) : null}

      {filtered.length > 0 ? (
        <>
          {activeSizes.length > 0 || activeTypes.length > 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              {filtered.length.toLocaleString()}{" "}
              {filtered.length === 1 ? "match" : "matches"} for{" "}
              <span className="font-medium text-foreground">
                {[...activeSizes, ...activeTypes].join(", ")}
              </span>
            </p>
          ) : null}
          <ProductGrid products={filtered} className="mt-8" priorityCount={4} />
        </>
      ) : all.length > 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No <strong>{subcategory.name}</strong> match{" "}
            <span className="font-medium text-foreground">
              {[...activeSizes, ...activeTypes].join(", ")}
            </span>
            .
          </p>
          <Link
            href={basePath}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong transition-colors hover:text-rust-bright"
          >
            See all
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">
          No products in this collection yet.
        </p>
      )}
    </div>
  );
}
