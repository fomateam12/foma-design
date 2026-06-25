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

const PRESETS: [string, string][] = [
  ["oklch(0.95 0.032 80)", "oklch(0.89 0.055 68)"],
  ["oklch(0.95 0.022 165)", "oklch(0.9 0.04 168)"],
  ["oklch(0.95 0.016 250)", "oklch(0.9 0.03 255)"],
  ["oklch(0.96 0.024 42)", "oklch(0.91 0.045 45)"],
  ["oklch(0.96 0.018 110)", "oklch(0.9 0.03 120)"],
  ["oklch(0.975 0.006 80)", "oklch(0.915 0.018 60)"],
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
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
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
