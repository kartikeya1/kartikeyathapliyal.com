import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root so nothing under archive/ can be inferred as it.
  turbopack: { root: __dirname },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
