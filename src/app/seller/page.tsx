import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Palette,
  Boxes,
  Truck,
  Settings,
  PenTool,
  PackageCheck,
  ArrowRight,
  ArrowUpRight,
  Info,
  ChevronRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seller workspace preview",
  description:
    "A preview of the FomaFlow seller workspace — orders, design proofs and blind drop-ship production in one dashboard. Launching soon for FomaPrint resellers.",
  alternates: { canonical: "/seller" },
  robots: { index: false, follow: true },
};

const NAV = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: ShoppingBag, label: "Orders" },
  { icon: Palette, label: "Proofs" },
  { icon: Boxes, label: "Products" },
  { icon: Truck, label: "Shipping" },
  { icon: Settings, label: "Settings" },
];

const STATS = [
  { icon: ShoppingBag, label: "Orders today", value: "24", hint: "+6 vs. yesterday" },
  { icon: PenTool, label: "In production", value: "11", hint: "3 engraving now" },
  { icon: PackageCheck, label: "Shipped this month", value: "318", hint: "98% on time" },
  { icon: Palette, label: "Proofs to approve", value: "4", hint: "2 awaiting you" },
];

type Status = "Engraving" | "Proof sent" | "Queued" | "Shipped";

const STATUS_STYLES: Record<Status, string> = {
  Engraving: "bg-brand-muted text-brand-strong",
  "Proof sent": "bg-secondary text-foreground",
  Queued: "bg-muted text-muted-foreground",
  Shipped: "bg-evergreen/15 text-evergreen",
};

const ORDERS: {
  id: string;
  customer: string;
  product: string;
  qty: number;
  status: Status;
  date: string;
}[] = [
  { id: "#FP-2041", customer: "A. Rivera", product: "40oz Tumbler w/ Handle", qty: 2, status: "Engraving", date: "Jun 25" },
  { id: "#FP-2040", customer: "M. Chen", product: "Walnut Photo Frame", qty: 1, status: "Proof sent", date: "Jun 25" },
  { id: "#FP-2039", customer: "J. Patel", product: "Leatherette Bifold Wallet", qty: 5, status: "Queued", date: "Jun 24" },
  { id: "#FP-2038", customer: "S. Okafor", product: "Bamboo Cutting Board", qty: 3, status: "Shipped", date: "Jun 24" },
  { id: "#FP-2037", customer: "L. Muller", product: "Powder-Coated Flask", qty: 12, status: "Shipped", date: "Jun 23" },
];

const PROOFS = [
  { id: "#FP-2040", product: "Walnut Photo Frame", note: "Monogram · serif" },
  { id: "#FP-2036", product: "Slate Coaster Set", note: "Logo placement" },
];

export default function SellerPreviewPage() {
  return (
    <div className="container-px py-8 lg:py-12">
      {/* Preview banner */}
      <div className="flex flex-col gap-4 rounded-2xl border border-brand/25 bg-brand-muted/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-background text-brand-strong ring-1 ring-border">
            <Info className="size-4" />
          </span>
          <div>
            <p className="font-heading text-sm font-semibold text-foreground">
              You&apos;re viewing a preview of the FomaFlow workspace
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Sample data shown. Live seller accounts launch soon — apply now to
              be first in line.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href="/sell"
            className={cn(buttonVariants({ variant: "brand", size: "sm" }))}
          >
            Apply to sell
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Back to site
          </Link>
        </div>
      </div>

      {/* App shell */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[15rem_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-3 shadow-card">
            <div className="flex items-center justify-between px-2 py-2">
              <span className="font-heading text-sm font-semibold text-foreground">
                FomaFlow
              </span>
              <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-strong">
                Preview
              </span>
            </div>
            <nav className="mt-2 space-y-1" aria-label="Workspace (preview)">
              {NAV.map((item) => (
                <span
                  key={item.label}
                  aria-disabled="true"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                    item.active
                      ? "bg-brand-muted text-brand-strong"
                      : "text-muted-foreground",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </span>
              ))}
            </nav>
            <div className="mt-3 flex items-center gap-3 border-t border-border px-3 pt-3">
              <span className="grid size-8 place-items-center rounded-full bg-ink text-xs font-bold text-ink-foreground">
                FF
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-foreground">
                  Your store
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  Seller · Preview
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                A snapshot of your orders, proofs and shipments.
              </p>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-lg bg-brand-muted text-brand-strong">
                    <s.icon className="size-4" />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground/40" />
                </div>
                <div className="mt-4 font-heading text-2xl font-bold text-foreground">
                  {s.value}
                </div>
                <div className="mt-0.5 text-sm font-medium text-foreground">
                  {s.label}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.hint}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            {/* Recent orders */}
            <section className="rounded-2xl border border-border bg-card shadow-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <h2 className="font-heading text-sm font-semibold text-foreground">
                  Recent orders
                </h2>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  View all
                  <ChevronRight className="size-3.5" />
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Order</th>
                      <th className="px-5 py-3 font-medium">Product</th>
                      <th className="px-5 py-3 font-medium">Qty</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDERS.map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-border/60 last:border-0"
                      >
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <span className="font-mono text-xs font-semibold text-foreground">
                            {o.id}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {o.customer}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-foreground">{o.product}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {o.qty}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={cn(
                              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
                              STATUS_STYLES[o.status],
                            )}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-muted-foreground">
                          {o.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Proofs + helper */}
            <div className="space-y-6">
              <section className="rounded-2xl border border-border bg-card shadow-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h2 className="font-heading text-sm font-semibold text-foreground">
                    Proofs awaiting approval
                  </h2>
                  <span className="rounded-full bg-brand-muted px-2 py-0.5 text-[10px] font-bold text-brand-strong">
                    {PROOFS.length}
                  </span>
                </div>
                <ul className="divide-y divide-border/60">
                  {PROOFS.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 px-5 py-3.5"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-brand-strong">
                        <Palette className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {p.product}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {p.id} · {p.note}
                        </p>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />
                    </li>
                  ))}
                </ul>
              </section>

              <section className="grain relative overflow-hidden rounded-2xl border border-ink-border bg-ink p-6 text-ink-foreground">
                <h2 className="font-heading text-base font-semibold text-ink-foreground">
                  Ready to sell for real?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  This workspace launches with live seller accounts. Apply now and
                  we&apos;ll set you up with wholesale pricing.
                </p>
                <Link
                  href="/sell"
                  className={cn(
                    buttonVariants({ variant: "brand", size: "default" }),
                    "mt-5",
                  )}
                >
                  Apply to sell
                  <ArrowRight className="size-4" />
                </Link>
              </section>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            FomaFlow seller workspace · Operated by {site.legalName}. Questions?{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-strong hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
