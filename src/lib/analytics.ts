/*
 * Google Analytics 4. Loaded only on the production domain so Vercel
 * previews, GitHub Pages and local builds never pollute the data.
 */

export const GA_ID = "G-N3LJVN3RX9";

const PROD_HOSTS = ["www.universalinsurancebroker.com", "universalinsurancebroker.com"];

export const isProdHost = () =>
  typeof window !== "undefined" && PROD_HOSTS.includes(window.location.hostname);

type Gtag = (...args: unknown[]) => void;

/** Send a GA4 event (no-op outside production or before gtag loads). */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (!gtag || !isProdHost()) return;
  gtag("event", event, params);
}
