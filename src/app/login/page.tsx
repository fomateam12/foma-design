import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Gauge,
  Palette,
  PackageCheck,
  ArrowRight,
  Lock,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Seller sign-in",
  description:
    "Sign in to the FomaFlow seller workspace — manage orders, approve proofs and track blind drop-ship production. Launching soon for FomaPrint resellers.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

const PANEL_FEATURES = [
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

export default function LoginPage() {
  return (
    <div className="container-px py-10 lg:py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-border shadow-xl lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="grain relative hidden flex-col justify-between bg-ink p-10 text-ink-foreground lg:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-0"
          >
            <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-px w-full rule-metallic" />
          </div>

          <div className="relative">
            <Logo tone="inverted" />
            <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-border bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              <Sparkles className="size-3.5" />
              FomaFlow · Soon
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-ink-foreground">
              Your seller workspace
            </h2>
            <p className="mt-3 max-w-sm leading-relaxed text-ink-muted">
              Route orders, approve proofs and track production from one place —
              connected to the FomaFlow fulfillment engine.
            </p>
          </div>

          <ul className="relative mt-10 space-y-5">
            {PANEL_FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-brand">
                  <f.icon className="size-4" />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-ink-foreground">
                    {f.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="relative mt-10 text-xs text-ink-muted">
            Operated by {site.legalName} · {site.madeIn}
          </p>
        </aside>

        {/* Sign-in card */}
        <div className="bg-card p-8 sm:p-10 lg:p-12">
          <div className="lg:hidden">
            <Logo />
          </div>

          <div className="mt-6 lg:mt-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-muted px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-strong">
              Coming soon
            </span>
            <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sign in to FomaFlow
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Seller accounts are launching with the FomaFlow workspace. Preview
              the dashboard now, or apply for access to be first in line.
            </p>
          </div>

          {/* Placeholder form — intentionally inert until accounts launch */}
          <div className="mt-8 space-y-4" aria-hidden="true">
            <div>
              <Label htmlFor="login-email" className="text-muted-foreground">
                Email
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="you@yourstore.com"
                disabled
                className="mt-1.5 h-11"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-muted-foreground">
                  Password
                </Label>
                <span className="text-xs text-muted-foreground/70">
                  Reset coming soon
                </span>
              </div>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                disabled
                className="mt-1.5 h-11"
              />
            </div>
            <button
              type="button"
              disabled
              className={cn(
                buttonVariants({ variant: "brand", size: "lg" }),
                "w-full",
              )}
            >
              <Lock className="size-4" />
              Sign in
            </button>
          </div>

          <div className="my-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            Want to look around?
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            <Link
              href="/seller"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full",
              )}
            >
              <LayoutDashboard className="size-4" />
              Preview the dashboard
            </Link>
            <Link
              href="/sell"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "w-full",
              )}
            >
              Apply for a seller account
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Need help today? Email{" "}
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
