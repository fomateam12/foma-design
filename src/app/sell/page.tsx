import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Tags,
  PackageCheck,
  Rocket,
  Truck,
  Headset,
  DollarSign,
  Send,
  Store,
  ShieldCheck,
  Clock,
  MapPin,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { SellerApplicationForm } from "@/components/seller-application-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCategories, getProductCount } from "@/data/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a Reseller",
  description:
    "Apply to become a FomaPrint reseller. Get wholesale pricing on thousands of personalized, laser-engraved products with fast U.S. production and blind drop-shipping under your brand.",
  alternates: { canonical: "/sell" },
  openGraph: {
    title: "Become a reseller · FomaPrint",
    description:
      "Wholesale pricing on thousands of personalized products with fast U.S. production and blind drop-shipping under your brand.",
  },
};

const BENEFITS = [
  {
    icon: Tags,
    title: "Wholesale pricing",
    body: "Tiered reseller discounts that scale with your volume — protect your margins on every order.",
  },
  {
    icon: PackageCheck,
    title: "Thousands of SKUs",
    body: "A full catalog of engravable drinkware, gifts, frames and office goods — ready to list today.",
  },
  {
    icon: Rocket,
    title: "Fast U.S. production",
    body: "Made to order in our American studio with quick turnaround, even on bulk runs.",
  },
  {
    icon: Truck,
    title: "Blind drop-shipping",
    body: "We ship straight to your customer in unbranded packaging — your store is the only name they see.",
  },
  {
    icon: Headset,
    title: "Dedicated support",
    body: "A real person to help with proofs, rush orders and large projects when you need it.",
  },
  {
    icon: DollarSign,
    title: "Low minimums to start",
    body: "Test the catalog with small orders, then unlock deeper pricing as you grow.",
  },
];

const APPLY_STEPS = [
  {
    n: "01",
    icon: Send,
    title: "Apply in minutes",
    body: "Tell us about your shop and the products you'd like to sell.",
  },
  {
    n: "02",
    icon: Tags,
    title: "Get wholesale pricing",
    body: "We review and reply within two business days with tiered reseller rates.",
  },
  {
    n: "03",
    icon: Store,
    title: "List & start selling",
    body: "Add products under your brand — we engrave and blind-ship every order.",
  },
];

export default function SellPage() {
  const productCount = getProductCount();
  const categoryCount = getCategories().length;

  return (
    <div>
      {/* ------------------------------ Hero ------------------------------ */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 right-[-10%] h-[40rem] w-[40rem] rounded-full bg-brand-muted/70 blur-3xl" />
          <div className="absolute left-[-15%] top-40 h-[28rem] w-[28rem] rounded-full bg-secondary blur-3xl" />
        </div>

        <div className="container-px py-12 lg:py-20">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Become a Reseller" }]}
          />

          <Reveal className="mt-8 max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Store className="size-3.5" />
              Wholesale &amp; resellers
            </span>
            <h1 className="mt-5 text-display text-foreground">
              Add personalized products to your store — we&apos;ll{" "}
              <span className="font-serif text-metallic">make &amp; ship</span>{" "}
              them.
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              Partner with {site.legalName} and sell over{" "}
              {productCount.toLocaleString()} laser-engravable products — from
              premium drinkware to custom frames — with wholesale pricing,
              made-to-order U.S. production and blind drop-shipping under your
              brand.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#apply"
                className={cn(buttonVariants({ variant: "brand", size: "lg" }))}
              >
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
                <p className="text-xs text-muted-foreground">products to sell</p>
              </div>
              <div className="border-l border-border pl-8">
                <dt className="sr-only">Categories</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">
                  <StatCounter value={categoryCount} />
                </dd>
                <p className="text-xs text-muted-foreground">product categories</p>
              </div>
              <div className="border-l border-border pl-8">
                <dt className="sr-only">Production</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">
                  USA
                </dd>
                <p className="text-xs text-muted-foreground">made to order</p>
              </div>
              <div className="border-l border-border pl-8">
                <dt className="sr-only">Pricing turnaround</dt>
                <dd className="font-heading text-2xl font-bold text-foreground">
                  2-day
                </dd>
                <p className="text-xs text-muted-foreground">pricing reply</p>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- Benefits --------------------------- */}
      <section className="container-px py-16 lg:py-24">
        <SectionHeader
          eyebrow="Why resellers choose us"
          title="A production partner built for your margins"
          description="Everything you need to sell personalized goods without owning a laser, holding stock or revealing a supplier."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:shadow-lg">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-muted text-brand-strong">
                  <b.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------- How to start ------------------------- */}
      <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
        <div className="container-px">
          <SectionHeader
            align="center"
            eyebrow="Getting started"
            title="From application to first order"
            description="No storefront fees and no inventory to buy. Apply, get your pricing and start listing."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {APPLY_STEPS.map((s, i) => (
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
        </div>
      </section>

      {/* ------------------------ Application form ------------------------ */}
      <section id="apply" className="scroll-mt-24 border-b border-border">
        <div className="container-px grid gap-12 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="eyebrow text-brand-strong">Apply now</span>
            <h2 className="mt-3 text-h2 text-foreground">
              Apply for a reseller account
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Tell us a little about your business and we&apos;ll review your
              application and follow up within two business days with pricing and
              next steps.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                { icon: ShieldCheck, label: "Free digital proof on every order" },
                { icon: Truck, label: "Blind drop-ship from the USA" },
                { icon: Clock, label: "Reply within two business days" },
                { icon: MapPin, label: "Made to order in the USA" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-muted text-brand-strong">
                    <item.icon className="size-4" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl border border-border bg-secondary/40 p-5 text-sm leading-relaxed text-muted-foreground">
              Questions before applying? Email{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-brand-strong hover:underline"
              >
                {site.email}
              </a>{" "}
              or call{" "}
              <a
                href={site.phoneHref}
                className="font-medium text-brand-strong hover:underline"
              >
                {site.phoneDisplay}
              </a>
              .
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <SellerApplicationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
