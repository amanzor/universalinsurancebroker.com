import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e3a5f', 900: '#0f2440', 950: '#0a1628' },
        accent: { 50: '#fafbfc', 100: '#f0f2f5', 200: '#dce1e8', 300: '#c4cbd6', 400: '#aab4c2', 500: '#8892a2', 600: '#6a7585', 700: '#525d6b', 800: '#3a4250', 900: '#252b35' },
        silver: { 50: '#fafbfc', 100: '#f0f2f5', 200: '#dce1e8', 300: '#c4cbd6', 400: '#aab4c2', 500: '#8892a2', 600: '#6a7585', 700: '#525d6b', 800: '#3a4250', 900: '#252b35' },
        gold: { 400: '#facc15', 500: '#eab308', 600: '#ca8a04' },
        // Cosmic accents used by the hero: a blue-leaning violet that sits
        // naturally next to the navy primaries, and a warm ember orange.
        nebula: { 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 900: '#2e1065' },
        ember: { 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
      },
      keyframes: {
        twinkle: { '0%, 100%': { opacity: '0.15', transform: 'scale(0.8)' }, '50%': { opacity: '0.9', transform: 'scale(1.2)' } },
        drift: { '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' }, '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite reverse',
        shimmer: 'shimmer 6s linear infinite',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
