import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Custom loader — see src/lib/cloudinary-loader.ts. Required because
    // the default Vercel optimizer doesn't traverse next.config rewrites
    // when it fetches source images, which broke the curated
    // /products/{SKU}/{file} gallery URLs (they exist only on R2 /
    // Cloudinary, not in public/ at deploy time). The loader emits the
    // absolute origin URL directly; the Vercel optimizer at /_next/image
    // then re-encodes to AVIF / WebP and resizes per device — the
    // combination of `formats`, `qualities`, and the loader together
    // reproduce Cloudinary's `q_auto, f_auto` behavior.
    loader: "custom",
    loaderFile: "./src/lib/cloudinary-loader.ts",

    // AVIF preferred (smaller for the same visual quality), WebP as the
    // fallback for browsers without AVIF support. Anything older falls
    // back to the original format the loader returned.
    formats: ["image/avif", "image/webp"],

    // Required in Next.js 16 — the allowlist of `quality` values the
    // optimizer will honor. 75 is the default for thumbnails / grids,
    // 85 is what we pass on hero / gallery / detail-page imagery so
    // those land closer to Cloudinary's `q_auto:good`.
    qualities: [75, 85],

    remotePatterns: [
      // R2 default subdomain (post-migration target). `pub-<hash>.r2.dev`
      // is the URL Cloudflare hands out when you enable public access
      // on an R2 bucket. If we later attach a custom domain
      // (e.g. cdn.foma-design.com) add it as a second entry.
      {
        protocol: "https",
        hostname: "*.r2.dev",
        pathname: "/**",
      },
      // Cloudinary — kept during cutover as a safety net while the loader
      // gracefully falls back to it whenever NEXT_PUBLIC_R2_BASE_URL is
      // unset. Drop this entry once R2 traffic has been clean for a few
      // days.
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fomafamilyllc.com",
        pathname: "/image/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/custom-order", destination: "/quote", permanent: true },
    ];
  },
};

export default nextConfig;
