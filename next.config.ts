import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // allow all https external images (catch-all)
      { protocol: "http", hostname: "**" }, // allow all http external images
      { protocol: "https", hostname: "www.hyperlinkinfosystem.com" }, // specific domain
      { protocol: "https", hostname: "slelguoygbfzlpylpxfs.supabase.co" },
      {
        protocol: "https",
        hostname: "logo.clearbit.com", // ⭐ ADD THIS
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
      {
        protocol: "https",
        hostname: "fonts.gstatic.com",
      },
    ],
    unoptimized: process.env.VERCEL ? false : true,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
