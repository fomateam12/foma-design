import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  Clock,
  MessageCircle,
  Package,
  Palette,
  ShieldCheck,
  Tag,
  TrendingUp,
  Truck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProductCount } from "@/data/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wholesale Pricing",
  description: `How ${site.name} wholesale pricing works for resellers — quote-based per-unit rates with personalization, blind drop-shipping, same-day reply on quotes and same-day printing + shipping on orders placed before 2pm ET. Request pricing from ${site.legalName}.`,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `Wholesale pricing · ${site.name}`,
    description:
      "Quote-based wholesale pricing for resellers — personalization, blind drop-ship, same-day reply and same-day printing & shipping included.",
  },
};

const INCLUDED = [
  {
    icon: Palette,
    title: "Personalization included",
    body: "Laser engraving and customization are built into your per-unit price — no surprise art or setup fees.",
  },
  {
    icon: Truck,
    title: "Blind drop-shipping",
    body: "We ship straight to your buyer, branded as you. Your cost never appears on the packing slip.",
  },
  {
    icon: Clock,
    title: "Same-day printing & shipping",
    body: "Orders placed before 2pm ET are engraved, packed and handed to the carrier the same day.",
  },
  {
    icon: Boxes,
    title: "Low minimums",
    body: "Start small and scale. Most products carry no large minimum to unlock wholesale pricing.",
  },
  {
    icon: ShieldCheck,
    title: "Made in the USA",
    body: "Produced to order in our U.S. studio, so quality and turnaround stay in our control.",
  },
  {
    icon: TrendingUp,
    title: "Volume discounts",
    body: "Per-unit pricing improves as your volume grows — the more you sell, the better your margin.",
  },
];

const STEPS = [
  {
    n: "01",
    icon: MessageCircle,
    title: "Tell us what you sell",
    body: "Send the products and rough monthly volume you're planning. Apply to sell or request a quote — it takes a couple of minutes.",
  },
  {
    n: "02",
    icon: Tag,
    title: "Get your wholesale rates",
    body: "Same-day reply with per-unit pricing, personalization options and turnaround for your list.",
  },
  {
    n: "03",
    icon: Package,
    title: "List & start selling",
    body: "Add the products to your store at your own retail price. We engrave, make and blind-ship every order under your brand.",
  },
];

const TIERS = [
  {
    name: "Starter",
    tagline: "Test products & get going",
    points: [
      "Wholesale per-unit pricing",
      "Low order minimums",
      "Same-day printing & shipping (before 2pm ET)",
      "Blind drop-ship from the USA",
    ],
    cta: { label: "Request a quote", href: "/quote" },
    featured: false,
  },
  {
    name: "Growth",
    tagline: "Scaling resellers",
    points: [
      "Better per-unit volume pricing",
      "Priority production slots",
      "Bulk personalization & logos",
      "Dedicated reseller support",
    ],
    cta: { label: "Apply to sell", href: "/sell" },
    featured: true,
  },
  {
    name: "Volume",
    tagline: "High-volume & corporate",
    points: [
      "Best per-unit pricing",
      "Custom catalog & SKUs",
      "Named account manager",
      "Store integrations (soon)",
    ],
    cta: { label: "Talk to us", href: "/contact" },
    featured: false,
  },
];

const FAQ = [
  {
    q: "Why don't you show prices on the products?",
    a: "Our pricing is wholesale and tiered to your volume, so a single public price would be misleading. Instead we quote per product — you always get rates that match how much you sell.",
  },
  {
    q: "Is there a minimum order to get wholesale pricing?",
    a: "Most products have low or no minimums to start. Higher volumes simply unlock better per-unit pricing.",
  },
  {
    q: "Does the price include engraving and shipping?",
    a: "Per-unit pricing includes personalization. Shipping is quoted with your order and ships blind — branded as your store, never as FomaPrint.",
  },
  {
    q: "How fast will I get a quote?",
    a: `We reply to quote and reseller requests the same business day. Need it sooner? Email ${site.email} or message us on WhatsApp.`,
  },
];

export default function PricingPage() {
  const productCount = getProductCount();

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
            items={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
          />
          <Reveal className="mt-8 max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Tag className="size-3.5" />
              Wholesale pricing
            </span>
            <h1 className="mt-5 text-display text-foreground">
              Pricing built for{" "}
              <span className="text-metallic">reseller margins</span>
            </h1>
            <p className="mt-4 max-w-xl text-lead text-muted-foreground">
              No public price list. We quote wholesale, per-unit rates across all{" "}
              {productCount.toLocaleString()} products — with personalization,
              blind drop-shipping, same-day reply on every quote and same-day
              printing & shipping on orders placed before 2pm ET.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className={cn(buttonVariants({ variant: "brand", size: "lg" }))}
              >
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/sell"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Apply to sell
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's included */}
      <section className="container-px py-16 lg:py-20">
        <SectionHeader
          eyebrow="What's included"
          title="Every quote comes with the essentials"
          description="The same fundamentals are baked into every order, whatever your volume — so your margin is predictable from the first unit."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-lg">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                  <item.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How pricing works */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container-px py-16 lg:py-20">
          <SectionHeader
            align="center"
            eyebrow="How it works"
            title="From request to wholesale rates"
            className="mx-auto"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={Math.min(i * 0.08, 0.24)}>
                <div className="relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card">
                  <span className="font-heading text-3xl font-bold text-brand/25">
                    {step.n}
                  </span>
                  <span className="mt-3 grid size-11 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                    <step.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="container-px py-16 lg:py-20">
        <SectionHeader
          eyebrow="Pricing tiers"
          title="Rates that scale with you"
          description="Three ways resellers work with us. Every tier is quoted to your products and volume — pick where you're starting and we'll tailor the numbers."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={Math.min(i * 0.06, 0.18)}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-7 shadow-card",
                  tier.featured
                    ? "grain relative overflow-hidden border-ink-border bg-ink text-ink-foreground"
                    : "border-border bg-card",
                )}
              >
                {tier.featured ? (
                  <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-foreground">
                    Most popular
                  </span>
                ) : null}
                <h3
                  className={cn(
                    "font-heading text-xl font-bold",
                    tier.featured ? "text-ink-foreground" : "text-foreground",
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    tier.featured ? "text-ink-muted" : "text-muted-foreground",
                  )}
                >
                  {tier.tagline}
                </p>
                <div
                  className={cn(
                    "mt-5 border-t pt-5",
                    tier.featured ? "border-ink-border" : "border-border",
                  )}
                >
                  <p
                    className={cn(
                      "font-heading text-2xl font-bold",
                      tier.featured ? "text-ink-foreground" : "text-foreground",
                    )}
                  >
                    Custom quote
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 text-xs",
                      tier.featured ? "text-ink-muted" : "text-muted-foreground",
                    )}
                  >
                    Priced to your volume
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          tier.featured ? "text-brand" : "text-brand-strong",
                        )}
                      />
                      <span
                        className={cn(
                          tier.featured
                            ? "text-ink-foreground/90"
                            : "text-muted-foreground",
                        )}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.cta.href}
                  className={cn(
                    buttonVariants({
                      variant: tier.featured ? "brand" : "outline",
                      size: "lg",
                    }),
                    "mt-7 w-full",
                  )}
                >
                  {tier.cta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container-px py-16 lg:py-20">
          <SectionHeader eyebrow="Pricing FAQ" title="Common questions" />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {FAQ.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i * 0.05, 0.2)}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px py-16 lg:py-20">
        <div className="grain relative overflow-hidden rounded-3xl border border-ink-border bg-ink px-8 py-12 text-ink-foreground sm:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-0"
          >
            <div className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-h2 text-ink-foreground">
              Get your wholesale rates
            </h2>
            <p className="mt-4 text-lead text-ink-muted">
              Tell us what you want to sell and we&apos;ll send pricing,
              personalization options and turnaround the same business day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quote"
                className={cn(buttonVariants({ variant: "brand", size: "lg" }))}
              >
                Request a quote
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-ink-border bg-white/5 text-ink-foreground hover:bg-white/10",
                )}
              >
                Contact the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
