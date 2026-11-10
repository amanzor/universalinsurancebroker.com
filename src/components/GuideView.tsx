"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Phone } from "lucide-react";
import { COMPANY, QUOTE_URL } from "@/lib/constants";
import { GUIDES, REVIEWED_ON, guideBySlug } from "@/lib/content/guides";
import { useLang, useLocalizePath, useT } from "@/lib/useLang";

const copy = {
  en: {
    eyebrow: "Florida Insurance Guide",
    reviewed: "Last reviewed",
    takeaways: "Key takeaways",
    faq: "Frequently asked questions",
    ctaTitle: "Want us to check your coverage?",
    ctaText: "Our licensed, bilingual agents compare 100+ carriers and explain your options in plain language.",
    quote: "Get a Free Quote",
    call: "Call",
    more: "More Florida insurance guides",
    all: "All guides",
    disclaimer:
      "This guide is general information, not legal or tax advice. Coverage depends on your policy and insurance company, and Florida rules can change. Talk to a licensed agent about your situation.",
  },
  es: {
    eyebrow: "Guía de Seguros en Florida",
    reviewed: "Última revisión",
    takeaways: "Lo más importante",
    faq: "Preguntas frecuentes",
    ctaTitle: "¿Quiere que revisemos su cobertura?",
    ctaText: "Nuestros agentes bilingües con licencia comparan más de 100 aseguradoras y le explican sus opciones con claridad.",
    quote: "Cotización Gratis",
    call: "Llamar",
    more: "Más guías de seguros en Florida",
    all: "Todas las guías",
    disclaimer:
      "Esta guía es información general, no asesoría legal ni tributaria. La cobertura depende de su póliza y de la aseguradora, y las reglas de Florida pueden cambiar. Hable con un agente con licencia sobre su caso.",
  },
};

export default function GuideView({ slug }: { slug: string }) {
  const t = useT(copy);
  const lang = useLang();
  const lp = useLocalizePath();
  const guide = guideBySlug(slug)!;
  const c = guide.copy[lang];
  const others = GUIDES.filter((g) => g.slug !== slug);
  const tel = `tel:${COMPANY.phone.replace(/\D/g, "")}`;

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 pt-32 pb-16 text-white">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href={lp("/guides")}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-electric-300 hover:text-electric-200"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            {t.eyebrow}
          </Link>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{c.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-primary-100">{c.intro}</p>
          <p className="mt-6 text-sm text-primary-200">
            {t.reviewed}: {REVIEWED_ON[lang]}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-12 text-gray-700">
        <aside className="rounded-2xl border border-electric-200 bg-electric-100/40 p-6">
          <h2 className="text-lg font-bold text-primary-900">{t.takeaways}</h2>
          <ul className="mt-3 space-y-2">
            {c.takeaways.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-electric-700" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>

        {c.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-2xl font-bold text-primary-900">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para.slice(0, 48)} className="mt-3 leading-relaxed">
                {para}
              </p>
            ))}
            {s.list && (
              <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed marker:text-primary-400">
                {s.list.map((li) => (
                  <li key={li.slice(0, 48)}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-primary-900">{t.faq}</h2>
          <div className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200">
            {c.faq.map((item) => (
              <details key={item.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-primary-900">
                  {item.q}
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary-600 transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <p className="mt-3 leading-relaxed text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-primary-900 p-8 text-white">
          <h2 className="text-2xl font-bold">{t.ctaTitle}</h2>
          <p className="mt-2 text-primary-100">{t.ctaText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-electric inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
            >
              {t.quote} <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={tel}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {t.call} {COMPANY.phone}
            </a>
          </div>
          <Link
            href={lp(guide.related)}
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-electric-300 hover:text-electric-200"
          >
            {c.relatedLabel} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        <p className="mt-8 text-sm italic text-gray-500">{t.disclaimer}</p>

        <section className="mt-12 border-t border-gray-200 pt-10">
          <h2 className="text-xl font-bold text-primary-900">{t.more}</h2>
          <ul className="mt-4 space-y-3">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  href={lp(`/guides/${g.slug}`)}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-primary-200 hover:shadow-sm"
                >
                  <span className="font-semibold text-primary-900">{g.copy[lang].title}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary-600 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={lp("/guides")} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">
            {t.all} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </article>
    </main>
  );
}
