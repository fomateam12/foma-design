import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuoteRequest } from "@/components/quote-request";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Build a list of the products you want to resell and request tiered wholesale pricing from FomaPrint. No account required — same-day reply with rates and lead times, then same-day printing and shipping on orders placed before 2pm ET.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Request a wholesale quote · FomaPrint",
    description:
      "Build a product list and get tiered reseller pricing the same business day.",
  },
};

export default function QuotePage() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Request a quote" }]}
      />

      <div className="mt-6 max-w-2xl">
        <span className="eyebrow text-brand-strong">Request for quote</span>
        <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Your wholesale quote
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Tell us what you&apos;d like to resell and how you fulfill. We&apos;ll
          send tiered pricing and lead times the same business day — engraved,
          produced and blind-shipped from the USA under your brand, same-day on
          orders placed before 2pm ET.
        </p>
      </div>

      <QuoteRequest />
    </div>
  );
}
