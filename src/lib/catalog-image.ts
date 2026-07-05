import { cloudinary } from "@/lib/format";

/**
 * Resolve a product image reference to a plain fetchable URL for contexts
 * that can't go through the next/image loader (the partner catalog's plain
 * <img> tags and the /catalog/print PDF render). Local `/products/...`
 * paths don't exist in public/ — they live in Cloudflare R2 (see
 * cloudinary-loader.ts); supplier images are Cloudinary URLs we can resize
 * in-URL. Public R2 base is stable (bucket `foma-design`), so it's pinned
 * here rather than routed through the paid Vercel optimizer.
 */
const R2_PUBLIC_BASE = "https://pub-7dbfe9f161d34085b011aea74e8f75ac.r2.dev";

export function catalogImageUrl(src: string, width = 400): string {
  if (src.startsWith("/products/")) {
    // R2 serves originals (multi-MB) — route through the Vercel optimizer
    // for a resized variant. `w` must be one of the configured image
    // widths; 96/256/640 are all in the default set.
    const w = width <= 96 ? 96 : width <= 256 ? 256 : 640;
    return `/_next/image?url=${encodeURIComponent(`${R2_PUBLIC_BASE}${src}`)}&w=${w}&q=75`;
  }
  return cloudinary(src, { width });
}
