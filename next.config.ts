import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "saliftankoano--genwalls-inference-generate.modal.run",
      },
      {
        protocol: "https",
        hostname: "genwalls.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
