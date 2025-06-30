import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:
      [
        {
          protocol: "https",
          hostname: "img.jamesedition.com"
        },
        {
          protocol: "https",
          hostname: "static-x.jamesedition.com"
        },
        {
          protocol: "https",
          hostname: "www.carlogos.org"
        }
      ]
  }
};

export default nextConfig;
