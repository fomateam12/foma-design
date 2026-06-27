import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SizeFacet, SubcategoryFacet } from "@/lib/product-taxonomy";

/**
 * Toggle a value into / out of a search-param array and produce the relative
 * URL string. Multi-value query params are encoded by repeating the key
 * (`?size=20+oz&size=40+oz`), which is what Next's URLSearchParams accepts.
 */
function buildToggleHref(
  basePath: string,
  currentSizes: readonly string[],
  currentSubs: readonly string[],
  key: "size" | "sub",
  value: string,
): string {
  const params = new URLSearchParams();
  let sizes = currentSizes;
  let subs = currentSubs;
  if (key === "size") {
    sizes = currentSizes.includes(value)
      ? currentSizes.filter((s) => s !== value)
      : [...currentSizes, value];
  } else {
    subs = currentSubs.includes(value)
      ? currentSubs.filter((s) => s !== value)
      : [...currentSubs, value];
  }
  for (const s of sizes) params.append("size", s);
  for (const s of subs) params.append("sub", s);
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function bucketLabel(bucket: SizeFacet["bucket"]): string {
  switch (bucket) {
    case "oz":
      return "Volume";
    case "rect":
      return "Dimensions";
    case "inch":
      return "Length";
    case "diam":
      return "Diameter";
    default:
      return "Other";
  }
}

export function CatalogFilters({
  basePath,
  sizeFacets,
  subFacets,
  activeSizes,
  activeSubs,
}: {
  basePath: string;
  sizeFacets: SizeFacet[];
  subFacets: SubcategoryFacet[];
  activeSizes: readonly string[];
  activeSubs: readonly string[];
}) {
  const anyActive = activeSizes.length > 0 || activeSubs.length > 0;

  // Group size facets by bucket so the UI can label them sensibly. Drop
  // small buckets (< 2 distinct values) — a "filter" with one option is just
  // noise.
  const groups: Record<string, SizeFacet[]> = {};
  for (const f of sizeFacets) {
    (groups[f.bucket] ??= []).push(f);
  }
  const groupedSizeEntries = Object.entries(groups).filter(
    ([, list]) => list.length >= 2,
  );

  // Subcategory facets: surface only the top N to avoid a 20+ chip wall.
  const TOP_SUBS = 12;
  const visibleSubs = subFacets.slice(0, TOP_SUBS);

  return (
    <aside
      aria-label="Filter products"
      className="rounded-2xl border border-border bg-card/60 p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
          Filter
        </h3>
        {anyActive ? (
          <Link
            href={basePath}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-brand-strong"
          >
            <X className="size-3" />
            Clear all
          </Link>
        ) : null}
      </div>

      {visibleSubs.length > 0 ? (
        <section className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Collection
          </h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {visibleSubs.map((sub) => {
              const active = activeSubs.includes(sub.slug);
              return (
                <li key={sub.slug}>
                  <Link
                    href={buildToggleHref(
                      basePath,
                      activeSizes,
                      activeSubs,
                      "sub",
                      sub.slug,
                    )}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition",
                      active
                        ? "border-brand-strong bg-brand-strong text-brand-foreground"
                        : "border-border bg-background text-foreground hover:border-brand-strong/60",
                    )}
                  >
                    {sub.name}
                    <span
                      className={cn(
                        "rounded-full px-1 text-[10px] font-semibold",
                        active
                          ? "bg-brand-foreground/15"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {sub.count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {subFacets.length > TOP_SUBS ? (
            <p className="mt-2 text-[11px] text-muted-foreground">
              +{subFacets.length - TOP_SUBS} more collections —{" "}
              <span className="font-medium">see tiles below</span>
            </p>
          ) : null}
        </section>
      ) : null}

      {groupedSizeEntries.map(([bucket, list]) => (
        <section key={bucket} className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {bucketLabel(bucket as SizeFacet["bucket"])}
          </h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {list.map((f) => {
              const active = activeSizes.includes(f.canonical);
              return (
                <li key={f.canonical}>
                  <Link
                    href={buildToggleHref(
                      basePath,
                      activeSizes,
                      activeSubs,
                      "size",
                      f.canonical,
                    )}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition",
                      active
                        ? "border-brand-strong bg-brand-strong text-brand-foreground"
                        : "border-border bg-background text-foreground hover:border-brand-strong/60",
                    )}
                  >
                    {f.canonical}
                    <span
                      className={cn(
                        "rounded-full px-1 text-[10px] font-semibold",
                        active
                          ? "bg-brand-foreground/15"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {f.count}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </aside>
  );
}
