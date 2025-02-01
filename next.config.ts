import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "7016",
        pathname: "/Upload/**",
      },
      {
        protocol: "http",
        hostname: "ecommerce1234.runasp.net",
        pathname: "/Upload/**",
        port: "",
      },
    ],
  },
};

export default nextConfig;
