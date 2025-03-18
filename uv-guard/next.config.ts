import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "standalone",
  experimental: {
    disableOptimizedLoading: true,
  },
  compiler: {
    removeConsole: {
      exclude: ["error", "warn"], // ✅ 仅保留 error 和 warn
    },
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
