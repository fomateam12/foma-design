import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Truck,
  MapPin,
  Boxes,
  Zap,
  Store,
  ShoppingBag,
  PenTool,
  PackageCheck,
  LayoutDashboard,
  Gauge,
  Palette,
  Quote,
  ShieldCheck,
  Clock,
  Layers,
} from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { ProductImage } from "@/components/product-image";
import { CategoryIcon } from "@/components/category-icon";
import { SectionHeader } from "@/components/section-header";
import { BentoGrid, BentoCard } from "@/components/bento";
import { Marquee } from "@/components/marquee";
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

const CHANNELS = [
  "Etsy",
  "Shopify",
  "Amazon Handmade",
  "eBay",
  "Walmart",
  "TikTok Shop",
  "WooCommerce",
];

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
    body: "We laser-engrave and produce it to order in our U.S. studio — with a free proof.",
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
    body: "Every order, proof and shipment in a single workspace.",
  },
  {
    icon: Gauge,
    title: "Live production status",
    body: "Track each item from queued to engraved to shipped.",
  },
  {
    icon: Palette,
    title: "Design proofs in-app",
    body: "Approve digital proofs before anything is engraved.",
  },
  {
    icon: PackageCheck,
    title: "Blind-ship tracking",
    body: "Hand tracking numbers to your buyers, branded as you.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I list the tumblers, they engrave and ship under my label. My Etsy shop scaled without me touching a laser.",
    name: "Etsy shop owner",
    role: "Personalized drinkware",
  },
  {
    quote:
      "The free proof on every order is the reason my reviews stay five stars. Customers see exactly what they get.",
    name: "Shopify store",
    role: "Wedding & event gifts",
  },
  {
    quote:
      "Blind drop-ship from the USA means fast delivery and no branding leaks. It just works.",
    name: "Amazon Handmade seller",
    role: "Corporate gifting",
  },
];

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts(8);
  const heroTiles = getFeaturedProducts(20).slice(8, 12);
  const productCount = getProductCount();

  return (
    <>
      {/* ----------------------------- Hero ----------------------------- */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-brand-muted/70 blur-3xl" />
          <div className="absolute left-[-15%] top-32 h-[30rem] w-[30rem] rounded-full bg-secondary blur-3xl" />
        </div>

        <div className="container-px grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Wholesale POD &amp; laser engraving
            </span>
            <h1 className="mt-5 text-display text-foreground">
              Sell it. We&apos;ll{" "}
              <span className="font-serif text-metallic">engrave, make</span>{" "}
              &amp; ship it.
            </h1>
            <p className="mt-5 max-w-xl text-lead text-muted-foreground">
              {site.name} is the U.S. print-on-demand partner for online
              resellers. You list the products and make the sale — we personalize,
              produce and blind-ship them to your customer under your brand.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/sell" className={cn(buttonVariants({ variant: "brand", size: "lg" }))}>
                Apply to sell
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/quote"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Request a quote
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
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

          {/* Collage */}
          <Reveal delay={0.12} className="relative">
            <div className="grid grid-cols-2 gap-4">
              {heroTiles.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-border bg-white shadow-card transition-shadow hover:shadow-lg",
                    i % 2 === 1 && "translate-y-6",
                  )}
                >
                  <ProductImage
                    src={p.image}
                    alt={p.name}
                    seed={p.sku}
                    width={500}
                    priority={i < 2}
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    className="aspect-square"
                    imgClassName="p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>

            <div className="glass absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full px-4 py-2.5 shadow-lg">
              <BadgeCheck className="size-4 text-brand-strong" />
              <span className="text-sm font-medium text-foreground">
                Free design proof on every order
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------- Integration marquee -------------------- */}
      <section className="border-b border-border bg-secondary/30 py-12">
        <p className="container-px text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Built to fulfill the channels you already sell on
        </p>
        <Marquee className="mt-8">
          {CHANNELS.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground/80"
            >
              {c}
              <span className="rounded-full bg-brand-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-strong">
                Soon
              </span>
            </span>
          ))}
        </Marquee>
      </section>

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
      </section>

      {/* --------------------------- Why FomaPrint ---------------------- */}
      <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
        <div className="container-px">
          <SectionHeader
            eyebrow="Why FomaPrint"
            title="A production partner built for resellers"
            description="Everything you need to sell personalized goods without owning a laser, holding stock or revealing a supplier."
            action={
              <Link
                href="/sell"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong hover:underline"
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
              eyebrow="Blind drop-shipping"
              title="We ship under your brand — never ours"
              description="Orders go straight to your customer in unbranded packaging, with no FomaPrint invoices, logos or marketing inserts. Your store stays the only name they see."
              className="sm:col-span-2 lg:col-span-2"
            />
            <BentoCard
              tone="brand"
              icon={<BadgeCheck className="size-5" />}
              title="Free design proof"
              description="A digital proof on every order, approved before we ever engrave."
            />
            <BentoCard
              icon={<MapPin className="size-5" />}
              title="Made in the USA"
              description="Produced to order in our American studio for fast, reliable turnaround."
            />
            <BentoCard
              icon={<Boxes className="size-5" />}
              title="Low minimums"
              description="Start with a single unit. Scale to bulk and unlock tiered wholesale pricing."
            />
            <BentoCard
              icon={<Zap className="size-5" />}
              title="Permanent engraving"
              description="Crisp laser marks that never fade, peel or wash off the product."
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
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong hover:underline"
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
              description="Route orders, approve proofs and track production from one dashboard. Connected to our FomaFlow fulfillment engine — rolling out to sellers soon."
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
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                <LayoutDashboard className="size-4" />
                Preview the dashboard
              </Link>
              <Link
                href="/sell"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Apply to sell
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
                <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-strong">
                  Soon
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
                  { id: "#FP-2040", s: "Proof sent", tone: "bg-secondary text-muted-foreground" },
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
            { counter: false, v: 0, suffix: "", display: "24h", label: "Proof turnaround" },
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

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                <Quote className="size-6 text-brand/40" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 border-t border-border pt-4">
                  <span className="block text-sm font-semibold text-foreground">
                    {t.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
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
              Add FomaPrint to your storefront
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lead text-ink-muted">
              Apply to become a reseller or send us a quote. We&apos;ll reply
              within one business day with wholesale pricing and a free design
              proof.
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
