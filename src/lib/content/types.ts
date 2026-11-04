import type { Lang } from "@/lib/i18n";

/** Page-specific Q&A shown on a service page and emitted as FAQPage JSON-LD. */
export type PageFaq = Record<Lang, { q: string; a: string }[]>;
