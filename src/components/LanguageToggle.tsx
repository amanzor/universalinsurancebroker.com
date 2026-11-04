"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";
import { alternatePath, langFromPath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * English / Spanish switch. Links to the same page in the other language
 * (/auto-insurance <-> /es/auto-insurance), so each language is a real page.
 */
export default function LanguageToggle({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || "/";
  const current = langFromPath(pathname);
  const { lang: target, href } = alternatePath(pathname);

  // Keep <html lang> in sync for screen readers and translation tools.
  useEffect(() => {
    document.documentElement.lang = current;
  }, [current]);

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      onClick={onNavigate}
      aria-label={target === "es" ? "Ver esta página en español" : "View this page in English"}
      title={target === "es" ? "Ver en español" : "View in English"}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-white px-1 py-1 text-xs font-semibold text-primary-800 shadow-sm transition-colors hover:border-primary-400",
        className,
      )}
    >
      <Globe2 className="ml-1 h-4 w-4 text-primary-600" aria-hidden />
      <span className="flex items-center rounded-full bg-primary-50 p-0.5">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 transition-colors",
            current === "en" ? "bg-primary-900 text-white" : "text-primary-700 group-hover:text-primary-900",
          )}
        >
          EN
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 transition-colors",
            current === "es" ? "bg-primary-900 text-white" : "text-primary-700 group-hover:text-primary-900",
          )}
        >
          ES
        </span>
      </span>
    </Link>
  );
}
