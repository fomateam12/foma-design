import type { NextConfig } from "next";

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
    ],
  },
};

export default nextConfig;
