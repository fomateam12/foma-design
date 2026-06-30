import type { Metadata } from "next";
import Link from "next/link";
import { Gauge, MapPin, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { ORDER_CUTOFF } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Shipping & turnaround",
  description: `Production turnaround, white-label packaging, tracking and damage policy for ${site.name} — blind drop-shipped from the USA under your brand.`,
  alternates: { canonical: "/shipping" },
  openGraph: {
    title: `Shipping & turnaround · ${site.name}`,
    description: `How ${site.name} produces, packs and blind-ships your orders.`,
  },
};

const CARDS = [
  {
    icon: Gauge,
    title: "Turnaround",
    body: (
      <>
        We print and ship most orders the same day — place an order before{" "}
        {ORDER_CUTOFF} and it goes out that day from our US print center.
        Transit time is additional.
      </>
    ),
  },
  {
    icon: PackageCheck,
    title: "White-label packaging",
    body: (
      <>
        The package sender name is your brand. The full return address is our US
        print center. We never include FomaPrint branding or pricing.
      </>
    ),
  },
  {
    icon: MapPin,
    title: "Tracking",
    body: (
      <>
        Carrier labels and tracking numbers are generated via ShipStation and
        returned to you with the order.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Lost or damaged",
    body: (
      <>
        Lost or damaged in transit: see our <Link href="/terms">Terms</Link> for
        the reprint/replacement policy.
      </>
    ),
  },
];

export default function ShippingPage() {
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
            items={[{ label: "Home", href: "/" }, { label: "Shipping" }]}
          />
          <Reveal className="mt-8 max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Shipping
            </span>
            <h1 className="mt-5 text-display text-foreground">
              Shipping &amp;{" "}
              <span className="font-serif italic text-metallic">turnaround</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              Every order is produced to order and blind-shipped from our U.S.
              print center — your brand on the label, never ours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cards */}
      <section className="container-px py-12 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={Math.min(i * 0.06, 0.18)}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-lg bg-brand-muted text-brand-strong">
                  <card.icon className="size-5" />
                </span>
                <h2 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {card.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-brand-strong [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-rust-bright">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
