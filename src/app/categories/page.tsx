import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryIcon } from "@/components/category-icon";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { getCategories, getProductCount } from "@/data/catalog";

export const metadata: Metadata = {
  title: "All Categories",
  description:
    "Browse every category of personalized, laser-engraved products from FomaPrint — drinkware, cutting boards, frames, journals, awards and more. Wholesale pricing for resellers.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const categories = getCategories();
  const total = getProductCount();
  const collectionCount = categories.reduce(
    (n, c) => n + c.subcategories.length,
    0,
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-32 right-[-8%] h-[34rem] w-[34rem] rounded-full bg-brand-muted/60 blur-3xl" />
        </div>
        <div className="container-px py-12 lg:py-16">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Categories" }]}
          />
          <Reveal className="mt-8 max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              The full catalog
            </span>
            <h1 className="mt-5 text-h2 text-foreground">
              Everything you can sell under your brand
            </h1>
            <p className="mt-4 max-w-xl text-lead text-muted-foreground">
              Browse {total.toLocaleString()} personalized products across{" "}
              {categories.length} categories — every one ready for crisp,
              permanent laser engraving and blind drop-shipping.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <dt className="sr-only">Products</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">
                  <StatCounter value={total} suffix="+" />
                </dd>
                <p className="text-xs text-muted-foreground">products</p>
              </div>
              <div className="border-l border-border pl-8">
                <dt className="sr-only">Categories</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">
                  <StatCounter value={categories.length} />
                </dd>
                <p className="text-xs text-muted-foreground">categories</p>
              </div>
              <div className="border-l border-border pl-8">
                <dt className="sr-only">Collections</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">
                  <StatCounter value={collectionCount} />
                </dd>
                <p className="text-xs text-muted-foreground">collections</p>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Category directory */}
      <div className="container-px space-y-14 py-14 lg:py-16">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={Math.min(i * 0.04, 0.2)}>
            <section>
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                    <CategoryIcon icon={c.icon} className="size-6" />
                  </span>
                  <div>
                    <h2 className="font-heading text-xl font-semibold text-foreground">
                      <Link
                        href={`/category/${c.slug}`}
                        className="transition-colors hover:text-brand-strong"
                      >
                        {c.name}
                      </Link>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {c.productCount.toLocaleString()} products ·{" "}
                      {c.subcategories.length} collections
                    </p>
                  </div>
                </div>
                <Link
                  href={`/category/${c.slug}`}
                  className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-strong hover:underline sm:inline-flex"
                >
                  Shop all
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {c.subcategories.map((sc) => (
                  <li key={sc.slug}>
                    <Link
                      href={`/category/${c.slug}/${sc.slug}`}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-transparent px-3 py-2.5 text-sm transition-all hover:border-border hover:bg-card hover:shadow-card"
                    >
                      <span className="text-foreground group-hover:text-brand-strong">
                        {sc.name}
                      </span>
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                        {sc.productCount}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
