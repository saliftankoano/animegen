import type { NextConfig } from "next";
module.exports = {
  trailingSlash: false,
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "saliftankoano--animegen-inference-generate.modal.run",
      },
      {
        protocol: "https",
        hostname: "genwalls.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "www.paypal.com",
      },
    ],
  },
};

export default nextConfig;
