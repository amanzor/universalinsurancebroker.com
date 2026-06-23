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
