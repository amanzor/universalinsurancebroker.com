"use client";

import { usePathname } from "next/navigation";
import { langFromPath, localizePath, type Bilingual, type Lang } from "@/lib/i18n";

/** Current language, from the URL (/es/... = Spanish). */
export function useLang(): Lang {
  return langFromPath(usePathname());
}

/**
 * Pick this page's copy for the current language.
 *
 *   const copy = { en: { title: "Hi" }, es: { title: "Hola" } };
 *   const t = useT(copy);  // t.title
 */
export function useT<T>(copy: Bilingual<T>): T {
  return copy[useLang()];
}

/** Localize internal links: lp("/contact") -> "/es/contact" on Spanish pages. */
export function useLocalizePath(): (path: string) => string {
  const lang = useLang();
  return (path: string) => localizePath(path, lang);
}
