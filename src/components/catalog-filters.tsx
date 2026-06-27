import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  FacetPlan,
  SimpleFacet,
  SubcategoryFacet,
} from "@/lib/product-taxonomy";

/** Combine the selected size/sub/color/material values into a relative URL. */
function buildHref(
  basePath: string,
  state: { sizes: string[]; subs: string[]; colors: string[]; materials: string[] },
  toggle: { key: "size" | "sub" | "color" | "material"; value: string },
): string {
  const next = {
    size: [...state.sizes],
    sub: [...state.subs],
    color: [...state.colors],
    material: [...state.materials],
  };
  const list = next[toggle.key];
  const idx = list.indexOf(toggle.value);
  if (idx >= 0) list.splice(idx, 1);
  else list.push(toggle.value);

  const params = new URLSearchParams();
  for (const s of next.size) params.append("size", s);
  for (const s of next.sub) params.append("sub", s);
  for (const c of next.color) params.append("color", c);
  for (const m of next.material) params.append("material", m);
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h4>
  );
}

interface ChipProps {
  active: boolean;
  href: string;
  count: number;
  children: React.ReactNode;
  /** Hex(es) for the leading color swatch. `null` / omit = no swatch. */
  swatch?: string | string[] | null;
}

function FilterChip({ active, href, count, children, swatch }: ChipProps) {
  return (
    <li>
      <Link
        href={href}
        aria-pressed={active}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition",
          active
            ? "border-brand-strong bg-brand-strong text-brand-foreground"
            : "border-border bg-background text-foreground hover:border-brand-strong/60",
        )}
      >
        {swatch ? <Swatch hex={swatch} /> : null}
        <span className="leading-none">{children}</span>
        <span
          className={cn(
            "ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-none",
            active ? "bg-brand-foreground/15" : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      </Link>
    </li>
  );
}

function Swatch({ hex }: { hex: string | string[] }) {
  if (Array.isArray(hex)) {
    return (
      <span
        aria-hidden="true"
        className="block size-3 shrink-0 rounded-full border border-border/60"
        style={{
          backgroundImage: `conic-gradient(${hex.join(", ")})`,
        }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="block size-3 shrink-0 rounded-full border border-border/60"
      style={{ backgroundColor: hex }}
    />
  );
}

export interface CatalogFiltersProps {
  basePath: string;
  /** What gets rendered — null/empty arrays = hide that section. */
  plan: FacetPlan;
  volumeFacets: SimpleFacet[];
  colorFacets: SimpleFacet[];
  materialFacets: SimpleFacet[];
  subFacets: SubcategoryFacet[];
  activeSizes: readonly string[];
  activeSubs: readonly string[];
  activeColors: readonly string[];
  activeMaterials: readonly string[];
  /** When the volume choice is promoted to a first-class
   *  "Browse by size" nav above the grid, the filter rail hides
   *  Volume to avoid duplicating the same control. */
  volumePromoted?: boolean;
}

export function CatalogFilters({
  basePath,
  plan,
  volumeFacets,
  colorFacets,
  materialFacets,
  subFacets,
  activeSizes,
  activeSubs,
  activeColors,
  activeMaterials,
  volumePromoted = false,
}: CatalogFiltersProps) {
  const state = {
    sizes: [...activeSizes],
    subs: [...activeSubs],
    colors: [...activeColors],
    materials: [...activeMaterials],
  };
  const anyActive =
    activeSizes.length + activeSubs.length + activeColors.length + activeMaterials.length > 0;

  // Subcategory facets: only the top N — beyond that the subcategory tiles
  // grid below handles discovery.
  const TOP_SUBS = 10;
  const subs = subFacets.slice(0, TOP_SUBS);

  const volumes = plan.showVolume && !volumePromoted ? volumeFacets : [];
  // Color and Material were tried as facet sections but the user wants
  // size to be the single categorization axis. Keep the imports + props
  // around so removal stays reversible, but render nothing.
  const colors: SimpleFacet[] = [];
  const materials: SimpleFacet[] = [];

  // Nothing to render at all? Don't show the rail.
  if (!volumes.length && !subs.length && !colors.length && !materials.length) {
    return null;
  }

  return (
    <aside
      aria-label="Filter products"
      className="rounded-2xl border border-border bg-card/60 p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-heading text-sm font-semibold text-foreground">
          Refine
        </h3>
        {anyActive ? (
          <Link
            href={basePath}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-brand-strong"
          >
            <X className="size-3" />
            Clear
          </Link>
        ) : null}
      </div>

      {subs.length > 0 ? (
        <section className="mt-5 space-y-2">
          <SectionHeading>Collection</SectionHeading>
          <ul className="flex flex-wrap gap-1.5">
            {subs.map((sub) => (
              <FilterChip
                key={sub.slug}
                active={activeSubs.includes(sub.slug)}
                href={buildHref(basePath, state, { key: "sub", value: sub.slug })}
                count={sub.count}
              >
                {sub.name}
              </FilterChip>
            ))}
          </ul>
          {subFacets.length > TOP_SUBS ? (
            <p className="text-[11px] text-muted-foreground">
              {subFacets.length - TOP_SUBS} more — see tiles below
            </p>
          ) : null}
        </section>
      ) : null}

      {colors.length > 0 ? (
        <section className="mt-5 space-y-2">
          <SectionHeading>Color</SectionHeading>
          <ul className="flex flex-wrap gap-1.5">
            {colors.map((f) => (
              <FilterChip
                key={f.canonical}
                active={activeColors.includes(f.canonical)}
                href={buildHref(basePath, state, { key: "color", value: f.canonical })}
                count={f.count}
                swatch={f.swatch}
              >
                {f.canonical}
              </FilterChip>
            ))}
          </ul>
        </section>
      ) : null}

      {materials.length > 0 ? (
        <section className="mt-5 space-y-2">
          <SectionHeading>Material</SectionHeading>
          <ul className="flex flex-wrap gap-1.5">
            {materials.map((f) => (
              <FilterChip
                key={f.canonical}
                active={activeMaterials.includes(f.canonical)}
                href={buildHref(basePath, state, { key: "material", value: f.canonical })}
                count={f.count}
              >
                {f.canonical}
              </FilterChip>
            ))}
          </ul>
        </section>
      ) : null}

      {volumes.length > 0 ? (
        <section className="mt-5 space-y-2">
          <SectionHeading>Volume</SectionHeading>
          <ul className="flex flex-wrap gap-1.5">
            {volumes.map((f) => (
              <FilterChip
                key={f.canonical}
                active={activeSizes.includes(f.canonical)}
                href={buildHref(basePath, state, { key: "size", value: f.canonical })}
                count={f.count}
              >
                {f.canonical}
              </FilterChip>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
}
