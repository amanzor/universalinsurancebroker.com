"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { GA_ID, isProdHost, track } from "@/lib/analytics";
import { langFromPath } from "@/lib/i18n";

/** Outbound quote tools, by hostname, for the quote_click event. */
const QUOTE_HOSTS: Record<string, string> = {
  "quotes.iwantinsurance.com": "online_quote",
  "app.coterieinsurance.com": "coterie_general_liability",
  "universalbrokers.propeller.insure": "propeller_bonds",
};

const quoteTool = (url: URL) =>
  Object.entries(QUOTE_HOSTS).find(([h]) => url.hostname === h || url.hostname.endsWith(`.${h}`))?.[1];

/**
 * Loads GA4 (production domain only) and records:
 * - page views (GA4 enhanced measurement handles client-side navigation)
 * - content_group = "English" / "Spanish" for every page
 * - phone_click, quote_click, email_click and language_switch from any link
 * Lead form submissions are tracked in the forms via track("generate_lead").
 */
export default function Analytics() {
  const pathname = usePathname() || "/";
  const [enabled, setEnabled] = useState(false);

  useEffect(() => setEnabled(isProdHost()), []);

  // Tag every page with its language so English vs Spanish can be compared.
  useEffect(() => {
    if (!enabled) return;
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.("set", { content_group: langFromPath(pathname) === "es" ? "Spanish" : "English" });
  }, [enabled, pathname]);

  // One delegated listener for every link on the site.
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const base = {
        link_text: (a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 80),
        page_path: window.location.pathname,
        site_language: langFromPath(window.location.pathname),
      };
      if (href.startsWith("tel:")) {
        track("phone_click", { ...base, phone_number: href.slice(4) });
      } else if (href.startsWith("mailto:")) {
        track("email_click", base);
      } else if (a.hasAttribute("hreflang")) {
        track("language_switch", { ...base, to_language: a.getAttribute("hreflang") });
      } else if (/^https?:/.test(href)) {
        try {
          const tool = quoteTool(new URL(href));
          if (tool) track("quote_click", { ...base, quote_tool: tool });
        } catch {
          /* ignore malformed URLs */
        }
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { content_group: location.pathname === '/es' || location.pathname.indexOf('/es/') === 0 ? 'Spanish' : 'English' });`}
      </Script>
    </>
  );
}
