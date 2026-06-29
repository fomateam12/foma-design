import type { NextConfig } from "next";

/**
 * Content-Security-Policy. Shipped as REPORT-ONLY first (see headers() below) so
 * it can never blank the live site — violations surface in the browser console
 * on Preview/prod; once that window is clean, switch the header name to the
 * enforcing `Content-Security-Policy`. Sources mirror next.config images
 * (R2 / Cloudinary) + next/font (self-hosted) + same-origin API/fetch.
 * `'unsafe-inline'` on script/style is the report-only baseline; tighten to
 * nonce/hash before enforcing.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.r2.dev https://res.cloudinary.com https://fomafamilyllc.com",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

/** Static security headers applied to every response. */
const SECURITY_HEADERS = [
  // Report-only for now — never enforce a blind CSP on a live site.
  { key: "Content-Security-Policy-Report-Only", value: CSP },
  // HSTS: short max-age to start (1 day), no preload (preload is irreversible),
  // no includeSubDomains until every subdomain is confirmed HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=86400" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), usb=(), payment=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework.
  poweredByHeader: false,
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
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      { source: "/custom-order", destination: "/quote", permanent: true },
      // FomaFlow seller auth is not launching yet. The login page and the
      // dashboard preview were removed; their entry point is now the reseller
      // application. 308 = permanent, method-preserving.
      { source: "/login", destination: "/sell", permanent: true },
      { source: "/seller", destination: "/sell", permanent: true },
    ];
  },
};

export default nextConfig;
