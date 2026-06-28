import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { getCategories } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const PLATFORM_LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "Pricing", href: "/pricing" },
  { label: "Apply to sell", href: "/sell" },
  { label: "Request a quote", href: "/quote" },
];

const COMPANY_LINKS = [
  { label: "About FomaPrint", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function SiteFooter() {
  const categories = getCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div aria-hidden="true" className="rule-metallic" />
      <div className="container-px py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {site.description}
            </p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-foreground"
                >
                  <Mail className="size-4 text-brand-strong" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-foreground"
                >
                  <Phone className="size-4 text-brand-strong" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-brand-strong" />
                {site.madeIn}
              </li>
            </ul>
            {site.social.length > 0 ? (
              <div className="flex items-center gap-2">
                {site.social.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-brand-strong"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Catalog */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-foreground">
              Catalog
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/categories"
                  className="font-medium text-brand-strong hover:underline"
                >
                  All categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-foreground">
              Platform
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + CTA */}
          <div>
            <h2 className="font-heading text-sm font-semibold text-foreground">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/sell"
              className={cn(buttonVariants({ variant: "brand", size: "sm" }), "mt-5")}
            >
              Apply to sell
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved. · {site.madeIn}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
