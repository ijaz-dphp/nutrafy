import type { NextConfig } from "next";

const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const hostname = wordpressUrl ? new URL(wordpressUrl).hostname : "nutrafy.pk";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname,
      },
    ],
    formats: ["image/webp"],
  },
  env: {
    WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
  },
};

export default nextConfig;
