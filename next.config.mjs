/** @type {import('next').NextConfig} */

const nextConfig = {
  // Produce a fully static site in ./out
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
