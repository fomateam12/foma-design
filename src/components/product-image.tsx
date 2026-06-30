"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { cloudinary } from "@/lib/format";
import { CategoryIcon } from "@/components/category-icon";
import type { IconKey } from "@/data/types";

/**
 * Product imagery wrapper. Renders the real (licensed) supplier/FOMA photo via
 * next/image and, if it ever fails to load, degrades gracefully to a branded,
 * deterministic placeholder — so a broken-image icon never appears.
 */

// Warm, neutral sand/cream tints only — single-accent system, no gold/green/blue.
const PRESETS: [string, string][] = [
  ["oklch(0.97 0.012 80)", "oklch(0.93 0.018 68)"],
  ["oklch(0.975 0.008 60)", "oklch(0.93 0.014 50)"],
  ["oklch(0.97 0.01 90)", "oklch(0.92 0.016 78)"],
  ["oklch(0.965 0.014 45)", "oklch(0.915 0.02 42)"],
];

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function ProductImage({
  src,
  alt,
  seed,
  icon = "gift",
  width = 600,
  // The product grid goes 2 → 3 → 4 → 5 columns across breakpoints
  // (mobile / sm / lg / 2xl). Each step gets the matching viewport
  // fraction so the optimizer doesn't fetch oversized variants.
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1536px) 25vw, 20vw",
  priority = false,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  /** Stable seed (usually SKU) for the fallback tint. */
  seed?: string;
  icon?: IconKey;
  width?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showFallback = failed || !src;
  const [from, to] = PRESETS[hash(seed || alt || src) % PRESETS.length];

  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
      {showFallback ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage: `radial-gradient(120% 120% at 15% 10%, ${from} 0%, ${to} 100%)`,
          }}
        >
          <CategoryIcon
            icon={icon}
            className="size-1/3 max-h-24 max-w-24 text-foreground/25"
          />
          <span className="absolute bottom-2.5 right-3 font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/35">
            FomaPrint
          </span>
        </div>
      ) : (
        <Image
          src={cloudinary(src, { width })}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={cn(
            "object-contain transition-transform duration-500 ease-out",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
