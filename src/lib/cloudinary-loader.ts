import type { ImageLoaderProps } from "next/image";

/**
 * Custom next/image loader. Routes the curated /products/{SKU}/{file}
 * paths to their origin object storage so the browser can fetch them
 * (those files don't exist in public/ at deploy time — they live in
 * Cloudflare R2 after the Cloudinary → R2 migration; Cloudinary is
 * kept as a transitional fallback until cutover is verified).
 *
 * Vercel's image optimizer fetches the URL we return, then encodes
 * AVIF/WebP and resizes per device — that combination delivers the
 * same end-result as Cloudinary's `q_auto,f_auto` once the
 * remotePattern, formats and qualities config in next.config.ts are
 * lined up.
 *
 * Cutover order so the live site never breaks:
 *   1. Migration script copies every Cloudinary asset to R2.
 *   2. Verify_migration confirms parity.
 *   3. Operator enables R2 public access (r2.dev subdomain or custom
 *      CNAME) and sets NEXT_PUBLIC_R2_BASE_URL in Vercel project env
 *      for Production + Preview.
 *   4. The next deploy starts serving from R2; absence of the env var
 *      keeps the old Cloudinary path live as a safety net.
 *   5. After a few days of healthy R2 traffic, the Cloudinary branch
 *      of this loader and the cloudinary remotePattern are removed.
 *
 * The function name is kept (`cloudinaryLoader`) to avoid a churn-only
 * config rename; its behavior is R2-first now.
 */
const R2_BASE = process.env.NEXT_PUBLIC_R2_BASE_URL;
const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (src.startsWith("/products/")) {
    const path = src.replace(/^\//, "");

    if (R2_BASE) {
      // R2 is plain object storage — no transformation pipeline.
      // We return the canonical R2 URL and Vercel's optimizer handles
      // AVIF/WebP + width resizing via /_next/image, governed by the
      // `formats` and `qualities` config in next.config.ts. Vercel's
      // optimizer ignores `width` / `quality` here for the *output*
      // (those are set per its own URL params), so we just return the
      // origin URL untouched.
      return `${R2_BASE.replace(/\/$/, "")}/${path}`;
    }

    if (CLOUDINARY_CLOUD) {
      // Fallback during cutover. Same shape as the original
      // implementation.
      const q = quality ?? 75;
      return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/q_${q},f_auto,w_${width}/${path}`;
    }

    // Last-resort local dev path (developer ran place_images.py).
    return src;
  }
  return src;
}
