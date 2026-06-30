import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about white-label print-on-demand with ${site.name} — blind drop-shipping, sending orders, payment, file specs and supported channels.`,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ · ${site.name}`,
    description: `How white-label POD and blind drop-shipping work with ${site.name}.`,
  },
};

const FAQS = [
  {
    q: "What is white-label POD?",
    a: "You take the order and send it to us; we print and ship to your customer under your brand.",
  },
  {
    q: "Will your branding appear?",
    a: "No — blind/white-label; the sender is your brand, no FomaPrint branding or pricing in the package.",
  },
  {
    q: "How do I send orders?",
    a: "Enter orders and upload print files in FomaFlow per our file specs (ShipStation automation coming).",
  },
  {
    q: "How do I pay?",
    a: "You load a prepaid balance (wallet) and orders draw from it — no subscription or monthly fee. Per-unit pricing is quote-based; we send rates when you apply.",
  },
  {
    q: "What about file requirements?",
    a: "Upload print files per our file specs (reference the spec).",
  },
  {
    q: "Where do you ship from?",
    a: "Our US print center; made & shipped in the USA.",
  },
  {
    q: "Do you work with Amazon/Etsy/Shopify?",
    a: "Yes — fulfill your channel orders through us.",
  },
];

export default function FaqPage() {
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
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          <Reveal className="mt-8 max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-brand-strong backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              Questions
            </span>
            <h1 className="mt-5 text-display text-foreground">
              <span className="font-serif italic text-metallic">FAQ</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lead text-muted-foreground">
              The essentials on selling under your brand while we handle
              production and blind shipping.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Accordion */}
      <section className="container-px py-12 lg:py-16">
        <Reveal className="mx-auto max-w-3xl">
          <Accordion className="gap-3">
            {FAQS.map((item) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                className="rounded-2xl border border-border bg-card px-5 shadow-soft"
              >
                <AccordionTrigger className="py-4 text-base font-semibold text-foreground hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex justify-center">
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
