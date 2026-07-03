import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description: `How ${site.name} works for resellers — apply, get your store account, load a balance, submit orders, and we produce and blind-ship under your brand from the USA.`,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: `How it works · ${site.name}`,
    description: `Six steps from application to a blind-shipped order under your brand.`,
  },
};

const STEPS = [
  {
    title: "Apply.",
    body: "Tell us your store and sales channels. We review and approve.",
  },
  {
    title: "Get your store account.",
    body: "We create your FomaFlow account; you only see your own orders.",
  },
  {
    title: "Load a prepaid balance.",
    body: "Top up your wallet once; every order draws from the balance. No subscription, no monthly fee.",
  },
  {
    title: "Submit orders + files.",
    body: "Enter the order in FomaFlow and upload the print file per our file specs.",
  },
  {
    title: "We produce + QC.",
    body: "We print, quality-check, and package.",
  },
  {
    title: "We ship under your brand.",
    body: "Sender name is your brand; the return address is our print center. Tracking flows back to you.",
  },
];

export default function HowItWorksPage() {
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
            items={[{ label: "Home", href: "/" }, { label: "How it works" }]}
          />
          <Reveal className="mt-8 max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              How it works
            </span>
            <h1 className="mt-5 text-display text-foreground">
              How <span className="text-metallic">FomaPrint</span>{" "}
              works
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              You sell under your own brand; we personalize, produce and
              blind-ship every order from the USA. Here&apos;s the path from
              application to a package on your customer&apos;s doorstep.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="container-px py-12 lg:py-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={Math.min(i * 0.05, 0.2)}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-card">
                <span className="font-heading text-3xl font-bold tabular-nums text-brand-strong">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  aria-hidden="true"
                  className="mt-3 h-px w-10 rounded-full"
                  style={{ background: "var(--metallic)" }}
                />
                <h2 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {step.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Every order routes through FomaFlow, our fulfillment workspace —
            from submission to blind-ship tracking, all in one place.
          </p>
          <div className="mt-6">
            <Link
              href="/sell"
              className={cn(buttonVariants({ variant: "brand", size: "lg" }))}
            >
              Apply to sell
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
