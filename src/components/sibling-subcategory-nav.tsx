"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Sibling {
  slug: string;
  name: string;
}

/**
 * Horizontally-scrolling chip nav for sibling subcategories. The
 * chip rail itself is unchanged from the previous static markup;
 * we just wrap it in client-side handlers so left/right chevron
 * buttons appear when there's content to scroll to. The buttons
 * fade out at each end so the user can't scroll past the edge.
 */
export function SiblingSubcategoryNav({
  categoryName,
  categorySlug,
  siblings,
  activeSlug,
}: {
  categoryName: string;
  categorySlug: string;
  siblings: Sibling[];
  activeSlug: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Recompute the can-scroll flags whenever the user scrolls or the
  // viewport resizes. On mount we also call it once so the initial
  // chevron visibility is correct.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < max - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [siblings]);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    // Roughly 75% of viewport — keeps a few chips visible across pages.
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <nav aria-label={`More in ${categoryName}`} className="relative mt-7">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-1)}
        tabIndex={canScrollLeft ? 0 : -1}
        className={cn(
          "absolute left-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/95 text-muted-foreground shadow-sm transition-opacity hover:text-foreground",
          canScrollLeft
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <ChevronLeft className="size-4" />
      </button>

      <ul
        ref={railRef}
        className="no-scrollbar flex gap-2 overflow-x-auto px-10 pb-1"
      >
        {siblings.map((sc) => {
          const active = sc.slug === activeSlug;
          return (
            <li key={sc.slug}>
              <Link
                href={`/category/${categorySlug}/${sc.slug}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  active
                    ? "border-brand bg-brand-muted font-medium text-brand-strong"
                    : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
                )}
              >
                {sc.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(1)}
        tabIndex={canScrollRight ? 0 : -1}
        className={cn(
          "absolute right-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/95 text-muted-foreground shadow-sm transition-opacity hover:text-foreground",
          canScrollRight
            ? "opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
