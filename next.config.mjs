/** @type {import('next').NextConfig} */

// Set by the GitHub Pages workflow (the site is served from /<repo>/ there).
// Empty for Vercel and local builds, which serve from the domain root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Produce a fully static site in ./out
  output: "export",
  basePath,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
