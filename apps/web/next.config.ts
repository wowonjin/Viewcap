import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@viewcap/database", "@viewcap/edl", "@viewcap/remotion"],
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
