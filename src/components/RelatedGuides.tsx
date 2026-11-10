"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { guideBySlug } from "@/lib/content/guides";
import { useLang, useLocalizePath, useT } from "@/lib/useLang";

const copy = {
  en: { title: "Florida insurance guides", all: "All guides" },
  es: { title: "Guías de seguros en Florida", all: "Todas las guías" },
};

/** A short list of related guides for a service page. */
export default function RelatedGuides({ slugs, className = "bg-white" }: { slugs: string[]; className?: string }) {
  const t = useT(copy);
  const lang = useLang();
  const lp = useLocalizePath();
  const guides = slugs.map((s) => guideBySlug(s)).filter((g): g is NonNullable<typeof g> => !!g);

  return (
    <section className={`${className} py-16`}>
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-primary-900 sm:text-3xl">
          <BookOpen className="h-7 w-7 text-electric-700" aria-hidden />
          {t.title}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={lp(`/guides/${g.slug}`)}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-primary-300 hover:shadow-md"
              >
                <span className="font-semibold text-primary-900">{g.copy[lang].title}</span>
                <span className="mt-2 flex-1 text-sm text-gray-600">{g.copy[lang].description}</span>
                <ArrowRight className="mt-3 h-4 w-4 text-primary-600 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <Link href={lp("/guides")} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
          {t.all} <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
