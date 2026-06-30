import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Internal design-system reference (Phase 2 / Gate 2).
 *
 * Lives at /styleguide — App Router treats a `_`-prefixed folder as private
 * (non-routable), so the brief's "/_styleguide" path can't be literal. noindex.
 *
 * Shows the formalized tokens and the *proposed* elevation direction so David
 * can approve visually. The "proposed" columns use the new Phase-2 tokens
 * (shadow-e1/2/3, radius-control/card, .shell/.measure); the rest of the site
 * keeps its current look until Phase 3 rolls these in.
 */
export const metadata: Metadata = {
  title: "Style guide (internal)",
  robots: { index: false, follow: false },
};

/* --------------------------------- data ---------------------------------- */

const COLORS: { name: string; varName: string; util: string; hex: string }[] = [
  { name: "Background (cream)", varName: "--background", util: "bg-background", hex: "#fbf5ea" },
  { name: "Surface / card", varName: "--card", util: "bg-card", hex: "#ffffff" },
  { name: "Tile", varName: "--tile", util: "bg-tile", hex: "#f8f3eb" },
  { name: "Secondary (cream-soft)", varName: "--secondary", util: "bg-secondary", hex: "#f7f1e6" },
  { name: "Border (hairline)", varName: "--border", util: "border-border", hex: "#ebe3d5" },
  { name: "Brand / rust", varName: "--brand", util: "bg-brand", hex: "#a8481e" },
  { name: "Rust bright", varName: "--rust-bright", util: "text-rust-bright", hex: "#c05a28" },
  { name: "Brand muted", varName: "--brand-muted", util: "bg-brand-muted", hex: "#f3e4da" },
  { name: "Ink (navy)", varName: "--ink", util: "bg-ink", hex: "#1c2430" },
  { name: "Ink card", varName: "--ink-card", util: "bg-ink-card", hex: "#28323f" },
  { name: "Foreground", varName: "--foreground", util: "text-foreground", hex: "#1c2430" },
  { name: "Muted foreground", varName: "--muted-foreground", util: "text-muted-foreground", hex: "#6e6a63" },
  { name: "Ring (focus)", varName: "--ring", util: "ring-ring", hex: "#c05a28" },
  { name: "Destructive", varName: "--destructive", util: "text-destructive", hex: "oklch(.577 .245 27)" },
];

const RADII: { label: string; cls: string; note: string }[] = [
  { label: "control", cls: "rounded-control", note: "0.5rem · inputs, buttons" },
  { label: "md", cls: "rounded-md", note: "0.56rem" },
  { label: "card", cls: "rounded-card", note: "1rem · cards" },
  { label: "xl", cls: "rounded-xl", note: "0.98rem" },
  { label: "2xl", cls: "rounded-2xl", note: "1.26rem" },
];

const BUTTON_VARIANTS = ["brand", "default", "secondary", "outline", "ghost", "destructive", "link"] as const;

const TYPE_SAMPLES: { cls: string; label: string; sample: string }[] = [
  { cls: "text-display", label: "Display · Hanken Grotesk", sample: "Print under your brand" },
  { cls: "text-h1", label: "H1", sample: "Add personalized products" },
  { cls: "text-h2", label: "H2", sample: "A production partner built for margins" },
  { cls: "text-h3", label: "H3", sample: "Same-day printing & shipping" },
  { cls: "text-lead", label: "Lead / intro", sample: "You sell — we engrave, make and ship under your brand." },
  { cls: "text-base text-foreground", label: "Body", sample: "Wholesale pricing on thousands of laser-engravable products, made to order in the USA and blind-shipped to your customer." },
  { cls: "text-caption", label: "Caption", sample: "Same-day printing, shipping & reply." },
];

/* ------------------------------- primitives ------------------------------ */

function Section({ id, title, kicker, children }: { id: string; title: string; kicker?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-12">
      <div className="mb-6">
        {kicker ? <span className="overline">{kicker}</span> : null}
        <h2 className="mt-1 text-h2 text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ChipDemo({
  label,
  count,
  selected = false,
}: {
  label: string;
  count?: number;
  selected?: boolean;
}) {
  return (
    <span
      aria-current={selected ? "page" : undefined}
      className={cn(
        "inline-flex h-9 max-w-[14rem] shrink-0 items-center gap-1.5 truncate rounded-control border px-3.5 text-sm font-medium transition-colors",
        selected
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border bg-surface text-muted-foreground hover:border-brand/40 hover:bg-brand-muted/40 hover:text-foreground",
      )}
    >
      <span className="truncate">{label}</span>
      {typeof count === "number" ? (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
            selected ? "bg-white/20 text-brand-foreground" : "bg-brand-muted text-brand-strong",
          )}
        >
          {count}
        </span>
      ) : null}
    </span>
  );
}

/* --------------------------------- page ---------------------------------- */

export default function StyleguidePage() {
  return (
    <div className="shell py-12">
      <header className="border-b border-border pb-8">
        <span className="overline">FomaPrint · internal</span>
        <h1 className="mt-2 text-display text-foreground">Style guide</h1>
        <p className="measure mt-4 text-lead text-muted-foreground">
          Formalized design tokens and the proposed elevation direction (Phase 2 /
          Gate 2). Fonts stay as-is. &ldquo;Proposed&rdquo; samples use the new
          tokens; the live site keeps its current look until Phase 3.
        </p>
      </header>

      {/* SIGNATURE */}
      <Section id="signature" kicker="Identity" title="Engraved-craft signature">
        <p className="measure mb-6 text-caption">
          The one memorable thing, true to the product (laser engraving) — kept
          in the logo mark and the scribe rules, not in running text. Accent
          words stay a calm rust on the regular sans, so the page reads easy.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-card border border-border bg-card p-6">
            <span className="overline">Rust accent</span>
            <p className="mt-3 text-h2 text-foreground">
              We{" "}
              <span className="text-metallic">make &amp; ship</span>{" "}
              it.
            </p>
            <p className="mt-3 text-caption">
              <code className="font-mono">text-metallic</code> — a calm rust
              emphasis on the heading sans. No serif or italic on running text.
            </p>
          </div>
          <div className="rounded-card border border-border bg-card p-6">
            <span className="overline">Scribe mark</span>
            <div className="mt-5 flex items-center gap-3">
              <span aria-hidden="true" className="scribe-rule" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-strong">
                Section eyebrow
              </span>
            </div>
            <p className="mt-4 text-caption">
              <code className="font-mono">.scribe-rule</code> — a dimension line
              off the engraving-area diagrams; structure carries the craft, not
              just type.
            </p>
          </div>
          <div className="rounded-card border border-border bg-card p-6">
            <span className="overline">View-all hover</span>
            <a className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-strong transition-colors hover:text-rust-bright">
              All categories →
            </a>
            <p className="mt-4 text-caption">
              Standalone nav links shift to brighter rust on hover (calm, not an
              underline snap). In-text links keep their underline.
            </p>
          </div>
        </div>
      </Section>

      {/* COLORS */}
      <Section id="color" kicker="Tokens" title="Color roles">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((c) => (
            <div key={c.varName} className="overflow-hidden rounded-card border border-border bg-card">
              <div className="h-16 w-full" style={{ background: `var(${c.varName})` }} />
              <div className="space-y-0.5 p-3">
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{c.util}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TYPOGRAPHY */}
      <Section id="type" kicker="Tokens" title="Typography ramp">
        <div className="space-y-6">
          {TYPE_SAMPLES.map((t) => (
            <div key={t.label} className="grid gap-1 border-b border-border/60 pb-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span className="overline pt-1">{t.label}</span>
              <p className={cn(t.cls, "measure")}>{t.sample}</p>
            </div>
          ))}
          <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <span className="overline pt-1">Rust accent</span>
            <p className="text-2xl font-semibold text-metallic">make &amp; ship it</p>
          </div>
          <div className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <span className="overline pt-1">Mono · SKU / specs</span>
            <p className="font-mono text-sm text-foreground">GFT1211 · 63 × 55 mm · 0.84 lb</p>
          </div>
        </div>
      </Section>

      {/* RADIUS */}
      <Section id="radius" kicker="Tokens" title="Radius — dual scale">
        <p className="measure mb-6 text-caption">
          Proposed: tighter radius on controls, softer on cards — instead of one
          large radius everywhere.
        </p>
        <div className="flex flex-wrap gap-6">
          {RADII.map((r) => (
            <div key={r.label} className="text-center">
              <div className={cn("size-20 border border-border bg-brand-muted", r.cls)} />
              <p className="mt-2 font-mono text-xs text-foreground">{r.label}</p>
              <p className="text-[11px] text-muted-foreground">{r.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ELEVATION */}
      <Section id="elevation" kicker="Tokens · proposed" title="Elevation — current vs proposed">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="overline mb-4">Current (uniform soft shadow)</p>
            <div className="flex flex-wrap gap-5">
              {["shadow-soft", "shadow-card", "shadow-lg", "shadow-xl"].map((s) => (
                <div key={s} className={cn("grid size-24 place-items-center rounded-card bg-card", s)}>
                  <span className="font-mono text-[11px] text-muted-foreground">{s.replace("shadow-", "")}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="overline mb-4">Proposed (hairline + 3 deliberate steps)</p>
            <div className="flex flex-wrap gap-5">
              {["shadow-e1", "shadow-e2", "shadow-e3"].map((s) => (
                <div key={s} className={cn("grid size-24 place-items-center rounded-card border border-border bg-card", s)}>
                  <span className="font-mono text-[11px] text-muted-foreground">{s.replace("shadow-", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* BUTTONS */}
      <Section id="buttons" kicker="Components" title="Buttons">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            {BUTTON_VARIANTS.map((v) => (
              <button key={v} className={cn(buttonVariants({ variant: v }))}>
                {v}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className={cn(buttonVariants({ variant: "brand", size: "lg" }))}>Large</button>
            <button className={cn(buttonVariants({ variant: "brand" }))}>Default</button>
            <button className={cn(buttonVariants({ variant: "brand", size: "sm" }))}>Small</button>
            <button className={cn(buttonVariants({ variant: "brand", size: "xs" }))}>XS</button>
            <button disabled className={cn(buttonVariants({ variant: "brand" }))}>Disabled</button>
          </div>
        </div>
      </Section>

      {/* INPUTS */}
      <Section id="inputs" kicker="Components" title="Inputs">
        <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="sg-default">Default</Label>
            <Input id="sg-default" placeholder="you@yourstore.com" className="mt-1.5 h-11" />
            <p className="mt-1 text-caption">Helper text sits here.</p>
          </div>
          <div>
            <Label htmlFor="sg-error">Error state</Label>
            <Input id="sg-error" aria-invalid defaultValue="not-an-email" className="mt-1.5 h-11" />
            <p className="mt-1 text-xs text-destructive">Enter a valid email address.</p>
          </div>
        </div>
      </Section>

      {/* CARDS */}
      <Section id="cards" kicker="Components · proposed" title="Cards — current vs proposed">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="overline mb-4">Current</p>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                <span className="font-mono text-xs">ICO</span>
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">Wholesale pricing</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Tiered reseller discounts that scale with your volume.
              </p>
            </div>
          </div>
          <div>
            <p className="overline mb-4">Proposed (hairline + layered surface + e2, hover lift)</p>
            <div className="group rounded-card border border-border bg-card p-6 shadow-e1 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-e2">
              <span className="grid size-11 place-items-center rounded-control bg-brand-muted text-brand-strong ring-1 ring-inset ring-brand/10">
                <span className="font-mono text-xs">ICO</span>
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-foreground">Wholesale pricing</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Tiered reseller discounts that scale with your volume.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* BADGES */}
      <Section id="badges" kicker="Components" title="Badges & pills">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-muted px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-strong">Coming soon</span>
          <span className="rounded-full bg-evergreen/15 px-2.5 py-1 text-xs font-semibold text-evergreen">Shipped</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-brand-strong">Made in the USA</span>
          <span className="rounded-full bg-brand px-1.5 py-0.5 text-[10px] font-bold text-brand-foreground tabular-nums">12</span>
        </div>
      </Section>

      {/* FILTER CHIPS */}
      <Section id="chips" kicker="Components · proposed" title="Filter chips — unified system">
        <p className="measure mb-6 text-caption">
          One chip component for both rows: fixed height, single-line with
          ellipsis, one selected style (rust fill + <code className="font-mono">aria-current</code>),
          consistent count badges, and an overflow scroller with edge-fades.
        </p>
        <div className="space-y-6">
          <div>
            <span className="overline">Browse by type</span>
            <div className="marquee-mask mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              <ChipDemo label="All collections" selected count={434} />
              <ChipDemo label="Tumblers" count={120} />
              <ChipDemo label="Water Bottles" count={44} />
              <ChipDemo label="Square and Round Laserable Ceramic Mugs" count={18} />
              <ChipDemo label="Pilsners" count={9} />
              <ChipDemo label="Coasters" count={26} />
            </div>
          </div>
          <div>
            <span className="overline">Browse by size</span>
            <div className="marquee-mask mt-2 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              <ChipDemo label="All sizes" selected />
              <ChipDemo label="12 oz" count={14} />
              <ChipDemo label="20 oz" count={31} />
              <ChipDemo label="30 oz" count={22} />
              <ChipDemo label="40 oz" count={12} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="overline pt-1">States</span>
            <ChipDemo label="Default" />
            <ChipDemo label="Selected" selected />
            <ChipDemo label="With count" count={7} />
          </div>
        </div>
      </Section>

      {/* LAYOUT WIDTH */}
      <Section id="layout" kicker="System · proposed" title="Layout shell & measure">
        <p className="measure mb-6 text-caption">
          Wide shell for structure, narrow column for words. Current shell caps at
          80rem (1280px); proposed <code className="font-mono">.shell</code> caps
          at 90rem (1440px) with gutters that scale 16 → 24 → 40px. Prose stays at
          ~68ch via <code className="font-mono">.measure</code>.
        </p>
        <div className="space-y-3">
          <div className="rounded-card border border-dashed border-brand/40 bg-brand-muted/20 p-4">
            <span className="overline">.shell — 1440px max</span>
            <div className="mt-3 rounded-control border border-border bg-card p-4">
              <p className="measure text-sm text-muted-foreground">
                This paragraph is constrained to ~68ch for readability even though
                its container is wide. Grids and imagery use the full shell width;
                words never run edge-to-edge.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* HERO BEFORE/AFTER */}
      <Section id="hero" kicker="Direction · proposed" title="Hero — current vs proposed">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-card border border-border bg-card">
            <p className="overline border-b border-border px-5 py-2">Current — centered, faint image bleed</p>
            <div className="px-5 py-10 text-center">
              <span className="overline">Made in the USA · Same-day printing &amp; shipping</span>
              <h3 className="mt-3 text-h2 text-foreground">Print under your brand. We make and ship it.</h3>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">You sell. We print, quality-check and blind-ship under your label.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-card border border-border bg-card shadow-e1">
            <p className="overline border-b border-border px-5 py-2">Proposed — type-forward, structured frame</p>
            <div className="grid gap-5 px-5 py-10 sm:grid-cols-[1.3fr_1fr] sm:items-center">
              <div className="text-left">
                <span className="overline text-brand-strong">Wholesale POD · blind-ship</span>
                <h3 className="mt-2 text-h2 text-foreground">
                  Print under your brand.{" "}
                  <span className="text-metallic">We make &amp; ship it.</span>
                </h3>
                <p className="measure mt-3 text-sm text-muted-foreground">
                  You sell — we engrave, produce and blind-ship to your customer
                  under your label, same day from the USA.
                </p>
                <div className="mt-5 flex gap-2">
                  <span className={cn(buttonVariants({ variant: "brand", size: "sm" }))}>Apply to sell</span>
                  <span className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>View catalog</span>
                </div>
              </div>
              <div className="grid aspect-square place-items-center rounded-control border border-border bg-tile shadow-e2">
                <span className="font-mono text-xs text-muted-foreground">hero product shot</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
