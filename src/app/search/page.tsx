import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductGrid } from "@/components/product-grid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCategories, searchProducts } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search thousands of personalized, laser-engraved gifts, drinkware, frames and more at FomaPrint.",
  alternates: { canonical: "/search" },
  robots: { index: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? searchProducts(query, 60) : [];
  const categories = getCategories();

  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Search the catalog
        </h1>
        <form action="/search" method="get" className="mt-5">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              autoFocus
              placeholder="Try “tumbler”, “cutting board”, or a SKU…"
              aria-label="Search products"
              className="h-13 w-full rounded-xl border border-input bg-background pl-12 pr-28 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <button
              type="submit"
              className={cn(
                buttonVariants({ size: "sm" }),
                "absolute right-2 top-1/2 -translate-y-1/2",
              )}
            >
              Search
            </button>
          </div>
        </form>
      </header>

      {query ? (
        results.length > 0 ? (
          <section className="mt-10">
            <p className="text-sm text-muted-foreground">
              {results.length === 60 ? "60+" : results.length} result
              {results.length === 1 ? "" : "s"} for{" "}
              <span className="font-medium text-foreground">
                &ldquo;{query}&rdquo;
              </span>
            </p>
            <ProductGrid products={results} className="mt-6" priorityCount={4} />
          </section>
        ) : (
          <section className="mt-12 rounded-3xl border border-border bg-secondary/30 px-6 py-16 text-center">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              No matches for &ldquo;{query}&rdquo;
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Try a different keyword, or browse our categories. You can also
              request a quote and we&apos;ll help you source the right products
              to resell.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/categories" className={cn(buttonVariants())}>
                Browse categories
              </Link>
              <Link
                href="/quote"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Request a quote
              </Link>
            </div>
          </section>
        )
      ) : (
        <section className="mt-12">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Browse by category
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand-strong"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
