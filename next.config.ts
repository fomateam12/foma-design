import type { NextConfig } from "next";

const BLOB_HOST = process.env.NEXT_PUBLIC_BLOB_HOST;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/business-products/**",
      },
      {
        protocol: "https",
        hostname: "fomafamilyllc.com",
        pathname: "/image/**",
      },
      // Vercel Blob — the curated multi-view product gallery lives here.
      // Wildcard covers any store under the public Blob domain so we don't
      // hardcode a specific store id.
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/products/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/custom-order", destination: "/quote", permanent: true },
    ];
  },
  async rewrites() {
    // Curated gallery URLs in src/data/product-images.json use the stable
    // shape /products/{SKU}/{file}. When NEXT_PUBLIC_BLOB_HOST is set (in
    // prod / preview) we proxy those paths to Vercel Blob without touching
    // the sidecar; when unset (local dev) requests fall through to
    // ./public/products/ so the same code runs without the upload.
    if (!BLOB_HOST) return [];
    return [
      {
        source: "/products/:path*",
        destination: `https://${BLOB_HOST}/products/:path*`,
      },
    ];
  },
};

export default nextConfig;
