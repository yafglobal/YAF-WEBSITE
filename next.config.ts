import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/gci-static-assets/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "globalreels.winnerschapelsudbury.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "winnerschapelcanada.ca",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
