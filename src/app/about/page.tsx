import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Factory,
  Gauge,
  PackageCheck,
  Palette,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProductCount } from "@/data/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.legalName} — the U.S. print-on-demand and laser-engraving partner behind ${site.name}. You sell it; we personalize, produce and blind-ship it under your brand.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About · ${site.name}`,
    description: `The production partner behind your store — made to order in the USA by ${site.legalName}.`,
  },
};

const VALUES = [
  {
    icon: Palette,
    title: "Craftsmanship first",
    body: "Every piece is laser-engraved with precision for a crisp, permanent finish — the quality your customers expect from your brand.",
  },
  {
    icon: PackageCheck,
    title: "Your brand, front and center",
    body: "We blind drop-ship from the USA. No FomaPrint logos, no pricing on the slip — only your store reaches your buyer.",
  },
  {
    icon: Factory,
    title: "Made in the USA",
    body: "Produced to order in our American studio, so quality, turnaround and capacity stay in our control — and yours.",
  },
  {
    icon: Gauge,
    title: "Built to scale",
    body: "From your first order to thousands a month, our production and the FomaFlow workspace grow with your store.",
  },
];

export default function AboutPage() {
  const productCount = getProductCount();

  const STATS = [
    { value: productCount, suffix: "+", label: "products to private-label" },
    { value: 100, suffix: "%", label: "blind drop-shipped" },
    { value: 2, suffix: "-day", label: "pricing reply" },
  ];

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
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
          <Reveal className="mt-8 max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Our story
            </span>
            <h1 className="mt-5 text-display text-foreground">
              The production partner{" "}
              <span className="font-serif italic text-metallic">behind your store</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              {site.name} is the print-on-demand and laser-engraving arm of{" "}
              {site.legalName}. Resellers list our products under their own brand;
              we personalize, produce and blind-ship every order from the USA — so
              you can sell without holding inventory or running a workshop.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="container-px py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={Math.min(i * 0.06, 0.18)}>
              <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
                <div className="font-heading text-3xl font-bold text-foreground">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container-px pb-4">
        <div className="grid gap-10 rounded-3xl border border-border bg-secondary/30 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <SectionHeader
              eyebrow="Why we built it"
              title={`Why we started ${site.name}`}
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We kept meeting small online sellers — Etsy shops, boutique brands,
              corporate-gift resellers — with great products to sell and nowhere
              dependable to make them. Sourcing, engraving, packing and shipping
              were eating the hours that should have gone into growing their store.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              So we became the part nobody sees. Today {site.legalName} runs a
              U.S. studio and a catalog of over {productCount.toLocaleString()}{" "}
              personalizable products — drinkware, gifts, frames and office goods —
              all ready to engrave to order and blind-ship under your brand,
              backed by a free design proof on every order.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="h-full rounded-2xl border border-border bg-background p-5 shadow-card">
                  <span className="grid size-10 place-items-center rounded-lg bg-brand-muted text-brand-strong">
                    <v.icon className="size-5" />
                  </span>
                  <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FomaFlow note */}
      <section className="container-px py-12">
        <Reveal className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-card p-8 shadow-card sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <div className="max-w-xl">
            <span className="eyebrow text-brand-strong">FomaFlow · Soon</span>
            <h2 className="mt-2 text-h3 text-foreground">
              One workspace for orders, proofs &amp; shipping
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Behind the catalog sits FomaFlow — our fulfillment engine that
              routes your orders, tracks production and hands you blind tracking
              numbers. Seller accounts launch soon; apply now to be first in line.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/sell"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Apply to sell
            </Link>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="container-px py-14 lg:py-20">
        <div className="grain relative overflow-hidden rounded-3xl border border-ink-border bg-ink px-8 py-12 text-ink-foreground sm:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-0"
          >
            <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-h2 text-ink-foreground">
              Ready to sell under your brand?
            </h2>
            <p className="mt-4 text-lead text-ink-muted">
              Browse the catalog or apply to sell — we&apos;ll send wholesale
              pricing and a free proof before anything is engraved.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/sell"
                className={cn(buttonVariants({ variant: "brand", size: "lg" }))}
              >
                Apply to sell
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/categories"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-ink-border bg-white/5 text-ink-foreground hover:bg-white/10",
                )}
              >
                <Truck className="size-4" />
                Browse the catalog
              </Link>
            </div>
          </div>
          <ShieldCheck
            className="absolute -right-6 -top-6 size-48 text-white/5"
            aria-hidden="true"
          />
        </div>
      </section>
    </div>
  );
}
