"use client";

import { useEffect, useState } from "react";
import { FileText, Phone } from "lucide-react";
import { COMPANY, QUOTE_URL } from "@/lib/constants";
import { useT } from "@/lib/useLang";
import { cn } from "@/lib/utils";

const copy = {
  en: { call: "Call Now", quote: "Get a Quote", label: "Quick contact" },
  es: { call: "Llamar", quote: "Cotizar", label: "Contacto rápido" },
};

/**
 * Phone-only bottom bar with "Call" and "Get a Quote". Appears once the
 * visitor scrolls past the first screen so it never covers the hero.
 */
export default function MobileCtaBar() {
  const t = useT(copy);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label={t.label}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-3 pt-2 shadow-[0_-8px_24px_-12px_rgba(10,22,40,0.35)] backdrop-blur-md transition-transform duration-300 lg:hidden",
        "pb-[calc(0.5rem+env(safe-area-inset-bottom))]",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-primary-900 py-3 text-sm font-semibold text-primary-900 active:bg-primary-50"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {t.call}
        </a>
        <a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-900 py-3 text-sm font-semibold text-white active:bg-primary-800"
        >
          <FileText className="h-4 w-4" aria-hidden />
          {t.quote}
        </a>
      </div>
    </nav>
  );
}
