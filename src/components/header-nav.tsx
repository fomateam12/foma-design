"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronRight,
  ArrowRight,
  FileText,
  Sparkles,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { SearchBox } from "@/components/search-box";
import { QuoteIndicator } from "@/components/quote-indicator";
import { Logo } from "@/components/logo";
import { ProductImage } from "@/components/product-image";
import { CategoryIcon } from "@/components/category-icon";
import { cn } from "@/lib/utils";
import type { IconKey } from "@/data/types";

export interface NavCategory {
  name: string;
  slug: string;
  blurb: string;
  icon: IconKey;
  productCount: number;
  image?: string;
  subcategories: { name: string; slug: string }[];
}

// Header nav: How It Works · Catalog · Shipping · FAQ (+ Apply to sell CTA).
// Catalog is the mega-menu trigger rendered between item 0 and items 1..n.
const NAV_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Shipping", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
];

export function HeaderNav({
  nav,
  totalProducts,
}: {
  nav: NavCategory[];
  totalProducts: number;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar (scrolls away) */}
      <div className="bg-ink text-ink-foreground">
        <div className="container-px flex h-9 items-center justify-center gap-2 text-center text-[0.78rem] font-medium">
          <Sparkles className="size-3.5 text-brand" aria-hidden="true" />
          <span>
            Wholesale POD &amp; laser engraving · Blind drop-ship from the USA ·
            Same-day printing · Same-day shipping · Same-day reply
          </span>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-premium",
          scrolled
            ? "border-b border-border bg-background/95 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-background/85"
            : "border-b border-transparent bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
        )}
      >
        <div className="container-px flex h-16 items-center gap-3 lg:h-[4.5rem] lg:gap-5">
          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="lg:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm gap-0 p-0">
              <SheetHeader className="border-b border-border p-4">
                <SheetTitle className="sr-only">Site navigation</SheetTitle>
                <Logo onClick={() => setMobileOpen(false)} />
              </SheetHeader>

              <div className="p-4">
                <SearchBox onNavigate={() => setMobileOpen(false)} />
              </div>

              <nav className="flex-1 overflow-y-auto px-2 pb-4">
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Catalog
                </p>
                {nav.map((cat) => (
                  <details key={cat.slug} className="group border-b border-border/60">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-md px-3 py-3 outline-none hover:bg-muted focus-visible:bg-muted">
                      <span className="flex items-center gap-2.5 font-medium text-foreground">
                        <CategoryIcon
                          icon={cat.icon}
                          className="size-4 text-brand-strong"
                        />
                        {cat.name}
                      </span>
                      <ChevronRight className="size-4 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="pb-2">
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md py-2 pl-10 pr-3 text-sm font-medium text-brand-strong hover:bg-muted"
                      >
                        Shop all {cat.name}
                      </Link>
                      {cat.subcategories.map((sc) => (
                        <Link
                          key={sc.slug}
                          href={`/category/${cat.slug}/${sc.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md py-2 pl-10 pr-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {sc.name}
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}

                <div className="mt-3 flex flex-col gap-1 px-1">
                  {NAV_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                    >
                      {l.label}
                    </Link>
                  ))}
                  <Link
                    href="/quote"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    <FileText className="size-4 text-brand-strong" />
                    Request a quote
                  </Link>
                </div>

                <div className="mt-4 flex flex-col gap-2 px-1">
                  <Link
                    href="/sell"
                    onClick={() => setMobileOpen(false)}
                    className={cn(buttonVariants({ variant: "brand", size: "lg" }))}
                  >
                    Apply to sell
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Logo />

          {/* Desktop nav */}
          <NavigationMenu className="hidden lg:flex" align="start">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="/how-it-works" />}
                  className="h-9 px-2.5 font-medium"
                >
                  How it works
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[760px] max-w-[92vw] grid-cols-[1fr_1.7fr] gap-4 p-4">
                    <Link
                      href="/categories"
                      className="group/promo relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl bg-gradient-to-br from-brand-muted to-secondary p-5 outline-none ring-1 ring-border focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-strong">
                          Full catalog
                        </span>
                        <h3 className="font-heading text-lg font-semibold text-foreground">
                          {totalProducts.toLocaleString()}+ products ready to
                          personalize
                        </h3>
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          Drinkware, gifts, frames and office goods — engraved
                          and blind-shipped under your brand.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-strong">
                        Browse everything
                        <ArrowRight className="size-4 transition-transform group-hover/promo:translate-x-0.5" />
                      </span>
                    </Link>

                    <ul className="grid grid-cols-2 content-start gap-x-3 gap-y-4">
                      {nav.map((cat) => (
                        <li key={cat.slug} className="min-w-0">
                          <NavigationMenuLink
                            render={<Link href={`/category/${cat.slug}`} />}
                            className="flex items-center gap-3 rounded-lg p-2"
                          >
                            <ProductImage
                              src={cat.image ?? ""}
                              alt=""
                              seed={cat.slug}
                              icon={cat.icon}
                              width={120}
                              sizes="48px"
                              className="size-11 shrink-0 rounded-md border border-border"
                              imgClassName="p-1"
                            />
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-foreground">
                                {cat.name}
                              </span>
                              <span className="block text-xs text-muted-foreground">
                                {cat.productCount.toLocaleString()} items
                              </span>
                            </span>
                          </NavigationMenuLink>
                          {cat.subcategories.length > 0 ? (
                            <ul className="mt-1 ml-[3.5rem] space-y-0.5">
                              {cat.subcategories.slice(0, 4).map((sc) => (
                                <li key={sc.slug}>
                                  <NavigationMenuLink
                                    render={
                                      <Link
                                        href={`/category/${cat.slug}/${sc.slug}`}
                                      />
                                    }
                                    className="block truncate rounded px-2 py-1 text-xs text-muted-foreground hover:text-brand-strong"
                                  >
                                    {sc.name}
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {NAV_LINKS.slice(1).map((l) => (
                <NavigationMenuItem key={l.href}>
                  <NavigationMenuLink
                    render={<Link href={l.href} />}
                    className="h-9 px-2.5 font-medium"
                  >
                    {l.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right utilities */}
          <div className="ml-auto flex items-center gap-2">
            <SearchBox className="hidden w-44 md:block lg:w-56 xl:w-64" />

            <QuoteIndicator />

            <Link
              href="/sell"
              className={cn(
                buttonVariants({ variant: "brand", size: "default" }),
                "hidden sm:inline-flex",
              )}
            >
              Apply to sell
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
