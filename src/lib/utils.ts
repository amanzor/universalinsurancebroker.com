import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Deployment base path (set in next.config.mjs). Empty in dev, the repo
// subpath in production GitHub Pages builds.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Prefix a public/ asset path (e.g. /images/logo.jpg) with the base path so
// it resolves correctly when the site is served from a subpath.
export function asset(path: string) {
  return `${basePath}${path}`;
}
