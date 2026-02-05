import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce dev cache flakiness and stale chunk references
  webpack: (config, { dev }) => {
    if (dev) {
      // Use in-memory cache in dev to avoid filesystem ENOENT on pack files
      (config as any).cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
