import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root so nothing under archive/ can be inferred as it.
  turbopack: { root: __dirname },
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      {
        // /contact was deprecated once the footer started carrying contact
        // on every page. Compiled into routes-manifest.json, not
        // middleware-manifest.json — verified this does not create a
        // serverless function: check-static.mjs only inspects the latter
        // and the build already contained a trailing-slash redirect there
        // before this one existed. Only holds for a standard Vercel Next
        // build; output: "export" would silently ignore this.
        source: "/contact",
        destination: "/services#book",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
