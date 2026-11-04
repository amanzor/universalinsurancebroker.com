/*
 * Bilingual site (English / Spanish).
 *
 * English lives at the root (/auto-insurance), Spanish under /es
 * (/es/auto-insurance). Both use the same page components; the language is
 * derived from the URL, so each language is a real, crawlable page with its
 * own hreflang alternates. Pure helpers only — safe for server and client.
 */

export type Lang = "en" | "es";
export const LANGS: Lang[] = ["en", "es"];

/** A string (or any value) in both languages. */
export type Bilingual<T> = { en: T; es: T };

export function langFromPath(pathname: string | null | undefined): Lang {
  return pathname === "/es" || pathname?.startsWith("/es/") ? "es" : "en";
}

/** Strip the /es prefix: "/es/about" -> "/about", "/es" -> "/". */
export function basePathOf(pathname: string): string {
  if (pathname === "/es") return "/";
  if (pathname.startsWith("/es/")) return pathname.slice(3);
  return pathname || "/";
}

/** Path of a page in a given language: ("/about","es") -> "/es/about". */
export function localizePath(path: string, lang: Lang): string {
  // Leave external links, anchors, mailto/tel and already-localized paths alone.
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const base = basePathOf(path);
  if (lang === "en") return base;
  return base === "/" ? "/es" : `/es${base}`;
}

/** The same page in the other language. */
export function alternatePath(pathname: string): { lang: Lang; href: string } {
  const target: Lang = langFromPath(pathname) === "es" ? "en" : "es";
  return { lang: target, href: localizePath(pathname, target) };
}
