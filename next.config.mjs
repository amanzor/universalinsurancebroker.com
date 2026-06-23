/** @type {import('next').NextConfig} */

// Only serve from the repo subpath in production (GitHub Pages project site).
// In dev, basePath stays empty so `npm run dev` works at http://localhost:3000.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/universalinsurancebroker.com" : "";

const nextConfig = {
  // Produce a fully static site in ./out for GitHub Pages
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  // Emit /route/index.html so GitHub Pages resolves clean URLs reliably
  trailingSlash: true,
  // Expose the base path to client code (for prefixing public/ assets)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  eslint: {
    // Don't fail the production build on lint-only issues (e.g. unused vars).
    // Type errors still fail the build; run `npm run lint` to see warnings.
    ignoreDuringBuilds: true,
  },
  images: {
    // GitHub Pages can't run the Next.js image optimizer
    unoptimized: true,
  },
};
export default nextConfig;
