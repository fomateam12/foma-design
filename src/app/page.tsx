import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Truck,
  MapPin,
  Boxes,
  Zap,
  TrendingUp,
  Store,
  ShoppingBag,
  PenTool,
  PackageCheck,
  LayoutDashboard,
  Gauge,
  Palette,
  ShieldCheck,
  Clock,
  Layers,
} from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { CategoryIcon } from "@/components/category-icon";
import { SectionHeader } from "@/components/section-header";
import { BentoGrid, BentoCard } from "@/components/bento";
import { ProductBanner } from "@/components/product-banner";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getCategories,
  getFeaturedProducts,
  getProductCount,
} from "@/data/catalog";
import { site } from "@/lib/site";
import { ORDER_CUTOFF, TURNAROUND_SHORT } from "@/lib/site-copy";

const STEPS = [
  {
    n: "01",
    icon: Store,
    title: "List our products",
    body: "Add any item from our catalog to your store under your own brand and pricing.",
  },
  {
    n: "02",
    icon: ShoppingBag,
    title: "Your customer orders",
    body: "A sale lands in your shop. You send us the order and the personalization details.",
  },
  {
    n: "03",
    icon: PenTool,
    title: "We engrave & make it",
    body: "We laser-engrave and produce it to order in our U.S. studio — same-day printing on orders placed before 2pm ET.",
  },
  {
    n: "04",
    icon: PackageCheck,
    title: "We blind drop-ship",
    body: "It ships straight to your customer in unbranded packaging — never our name.",
  },
];

const TOOL_FEATURES = [
  {
    icon: LayoutDashboard,
    title: "One order dashboard",
    body: "Every order and shipment in a single workspace.",
  },
  {
    icon: Gauge,
    title: "Live production status",
    body: "Track each item from queued to engraved to shipped.",
  },
  {
    icon: Palette,
    title: "Same-day reply",
    body: "Quote requests and order questions get a reply the same business day.",
  },
  {
    icon: PackageCheck,
    title: "Blind-ship tracking",
    body: "Hand tracking numbers to your buyers, branded as you.",
  },
];

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts(8);
  const productCount = getProductCount();

  // Larger pool for the rotating home banner; the client samples a shuffled
  // subset per visit. Only the fields the banner renders are passed.
  const bannerProducts = getFeaturedProducts(30).map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    sku: p.sku,
    categorySlug: p.categorySlug,
  }));

  return (
    <>
      {/* ----------------------------- Hero ----------------------------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-brand-muted/70 blur-3xl" />
          <div className="absolute left-[-15%] top-32 h-[30rem] w-[30rem] rounded-full bg-secondary blur-3xl" />
        </div>

        <div className="container-px flex flex-col items-center py-16 text-center lg:py-24">
          <Reveal className="flex flex-col items-center">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <MapPin className="size-3.5" />
              Made in the USA · {TURNAROUND_SHORT}
            </span>
            <h1 className="mt-5 max-w-4xl text-display text-foreground">
              Print under your brand.{" "}
              <span className="block text-metallic">
                We make and ship it.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              You sell. We print, quality-check and blind-ship to your customer
              under your label — fast production from our US print center.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/sell" className={cn(buttonVariants({ variant: "brand", size: "lg" }))}>
                Apply to sell
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/categories"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                View Catalog
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
              {["White-label", TURNAROUND_SHORT, "No MOQ"].map((chip) => (
                <li key={chip} className="flex items-center gap-1.5">
                  <BadgeCheck className="size-4 text-brand-strong" />
                  {chip}
                </li>
              ))}
            </ul>

            <dl className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4">
              <div>
                <dt className="sr-only">Products</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">
                  <StatCounter value={productCount} suffix="+" />
                </dd>
                <p className="text-xs text-muted-foreground">products to personalize</p>
              </div>
              <div className="border-l border-border pl-8">
                <dt className="sr-only">Production</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">USA</dd>
                <p className="text-xs text-muted-foreground">made to order</p>
              </div>
              <div className="border-l border-border pl-8">
                <dt className="sr-only">Shipping</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">Blind</dd>
                <p className="text-xs text-muted-foreground">drop-ship under your brand</p>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------------- Live product banner --------------------- */}
      <ProductBanner products={bannerProducts} />

      {/* --------------------------- How it works ----------------------- */}
      <section id="how" className="container-px scroll-mt-24 py-20 lg:py-28">
        <SectionHeader
          align="center"
          eyebrow="How it works"
          title="From your storefront to their doorstep"
          description="A hands-off fulfillment loop. You own the customer and the brand; we own the engraving, production and shipping."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                    <s.icon className="size-5" />
                  </span>
                  <span className="font-heading text-3xl font-bold text-brand/25">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong transition-colors hover:text-rust-bright"
          >
            See how it works
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* --------------------------- Why FomaPrint ---------------------- */}
      <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
        <div className="container-px">
          <SectionHeader
            eyebrow="Why FomaPrint"
            title="Built for sellers who want margin and control."
            description="Sell personalized goods at your own price without owning a laser, holding stock or revealing a supplier."
            action={
              <Link
                href="/sell"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong transition-colors hover:text-rust-bright"
              >
                Apply to sell
                <ArrowRight className="size-4" />
              </Link>
            }
          />

          <BentoGrid className="mt-12">
            <BentoCard
              tone="ink"
              icon={<Truck className="size-5" />}
              eyebrow="Truly white-label"
              title="We ship under your brand — never ours"
              description="Orders go straight to your customer in unbranded packaging, with no FomaPrint invoices, logos or marketing inserts. Your store stays the only name they see."
              className="sm:col-span-2 lg:col-span-2"
            />
            <BentoCard
              tone="brand"
              icon={<TrendingUp className="size-5" />}
              title="High profit margin"
              description="Buy at wholesale and set your own retail price — a healthy margin on every personalized order."
            />
            <BentoCard
              icon={<MapPin className="size-5" />}
              title="Made in the USA"
              description="Produced to order in our American studio for fast, reliable turnaround."
            />
            <BentoCard
              icon={<Zap className="size-5" />}
              title={TURNAROUND_SHORT}
              description={`Place an order before ${ORDER_CUTOFF} and we print and ship it the same day from our US print center — your customers aren't left waiting.`}
            />
            <BentoCard
              icon={<Boxes className="size-5" />}
              title="No minimums"
              description="Start with a single unit and scale to bulk for tiered wholesale pricing."
            />
          </BentoGrid>
        </div>
      </section>

      {/* -------------------------- Catalog showcase -------------------- */}
      <section className="container-px py-20 lg:py-28">
        <SectionHeader
          eyebrow="The catalog"
          title={
            <>
              <StatCounter value={productCount} suffix="+" /> products ready to
              personalize
            </>
          }
          description="Drinkware, gifts, frames and office goods — every item engravable and blind-shipped under your brand."
          action={
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong transition-colors hover:text-rust-bright"
            >
              All categories
              <ArrowRight className="size-4" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.05}>
              <Link
                href={`/category/${c.slug}`}
                className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                  <CategoryIcon icon={c.icon} className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-base font-semibold text-foreground">
                    {c.name}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {c.productCount.toLocaleString()} products
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-brand-strong transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          ))}
        </div>

        <ProductGrid products={featured} className="mt-10" priorityCount={4} />

        <div className="mt-10 text-center">
          <Link
            href="/categories"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Layers className="size-4" />
            Browse the full catalog
          </Link>
        </div>
      </section>

      {/* ---------------------------- Tools teaser ---------------------- */}
      <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
        <div className="container-px grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow="Seller tools"
              title="A workspace for your whole operation"
              description="Route orders, reply same-day to your buyers and track production from one dashboard. Connected to our FomaFlow fulfillment engine — live for every seller account."
            />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {TOOL_FEATURES.map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-background text-brand-strong ring-1 ring-border">
                    <f.icon className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-heading text-sm font-semibold text-foreground">
                      {f.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sell" className={cn(buttonVariants({ size: "lg" }))}>
                Apply to sell
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>

          {/* Dashboard mock */}
          <Reveal delay={0.1}>
            <div
              aria-hidden="true"
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-destructive/40" />
                  <span className="size-2.5 rounded-full bg-brand/50" />
                  <span className="size-2.5 rounded-full bg-evergreen/50" />
                  <span className="ml-2 font-heading text-sm font-semibold text-foreground">
                    FomaFlow
                  </span>
                </div>
                <span className="rounded-full bg-evergreen/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-evergreen">
                  Live
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { k: "Orders today", v: "24" },
                  { k: "In production", v: "11" },
                  { k: "Shipped", v: "318" },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl bg-secondary/60 p-3">
                    <div className="font-heading text-xl font-bold text-foreground">
                      {s.v}
                    </div>
                    <div className="text-[11px] text-muted-foreground">{s.k}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2.5">
                {[
                  { id: "#FP-2041", s: "Engraving", tone: "bg-brand/15 text-brand-strong" },
                  { id: "#FP-2040", s: "Reply sent", tone: "bg-secondary text-muted-foreground" },
                  { id: "#FP-2039", s: "Shipped", tone: "bg-evergreen/15 text-evergreen" },
                ].map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-background px-3.5 py-3"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="size-7 rounded-lg bg-brand-muted" />
                      <span className="font-mono text-xs text-foreground">{r.id}</span>
                    </span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", r.tone)}>
                      {r.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- Social proof ---------------------- */}
      <section className="container-px py-20 lg:py-28">
        <SectionHeader
          align="center"
          eyebrow="Trusted by resellers"
          title="Built to make you look good"
          description="Sell with confidence on a partner that ships on time, on brand and on quality."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { counter: true, v: productCount, suffix: "+", display: "", label: "Products to sell" },
            { counter: true, v: categories.length, suffix: "", display: "", label: "Product categories" },
            { counter: false, v: 0, suffix: "", display: "USA", label: "Made to order" },
            { counter: false, v: 0, suffix: "", display: "Same day", label: "Printing & shipping" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
                <div className="font-heading text-3xl font-bold text-foreground">
                  {s.counter ? (
                    <StatCounter value={s.v} suffix={s.suffix} />
                  ) : (
                    s.display
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------- CTA band ------------------------- */}
      <section className="container-px pb-24">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 text-ink-foreground sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand/20 blur-3xl"
          />
          <div aria-hidden="true" className="rule-metallic absolute inset-x-0 top-0" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Start today
            </span>
            <h2 className="mt-3 text-h2 text-ink-foreground">
              Start dropshipping under your brand
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-ink-muted">
              Apply to become a reseller or send us a quote. We&apos;ll reply
              the same business day with wholesale pricing — then ship same-day
              on orders placed before 2pm ET.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/sell" className={cn(buttonVariants({ variant: "brand", size: "lg" }))}>
                Apply to sell
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/quote"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 text-sm font-medium text-ink-foreground transition-colors hover:bg-white/10"
              >
                Request a quote
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 text-brand" />
                No account required to quote
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5 text-brand" />
                One-business-day reply
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-brand" />
                {site.madeIn}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
