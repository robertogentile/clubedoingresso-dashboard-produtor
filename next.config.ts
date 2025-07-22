import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagens-clubedoingresso.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d4wlxs7f09dde.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // outras configs...
};

export default nextConfig;
