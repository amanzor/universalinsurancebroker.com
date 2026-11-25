"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { track } from "@/lib/analytics";
import type { EnrollmentPhase } from "@/lib/enrollment";
import { useLocalizePath, useT } from "@/lib/useLang";

const copy = {
  en: {
    jan1: "Health insurance Open Enrollment: enroll by Dec 15 for coverage starting Jan 1.",
    jan1Short: "Health plans: enroll by Dec 15",
    final: "Last chance: Open Enrollment ends Jan 15. Enroll now for coverage starting Feb 1.",
    finalShort: "Enrollment ends Jan 15",
    days: (n: number) => (n === 0 ? "Last day" : n === 1 ? "1 day left" : `${n} days left`),
    help: "Get free help",
    heroTitle: (p: EnrollmentPhase): string =>
      p.kind === "jan1" ? "Enroll by December 15 for coverage starting January 1" : "Open Enrollment ends January 15",
    heroText: (p: EnrollmentPhase): string =>
      p.kind === "jan1"
        ? "Open Enrollment runs through January 15, but you need to sign up by December 15 to be covered on January 1. Our bilingual agents help you compare plans and apply at no cost."
        : "If you enroll by January 15, your coverage starts February 1. After that, you'll need a qualifying life event to sign up this year. Our bilingual agents help you apply at no cost.",
    call: "Call for free help",
  },
  es: {
    jan1: "Inscripción Abierta de seguro médico: inscríbase antes del 15 de dic. para tener cobertura desde el 1 de enero.",
    jan1Short: "Seguro médico: plazo 15 de dic.",
    final: "Última oportunidad: la Inscripción Abierta termina el 15 de enero. Inscríbase ahora para tener cobertura desde el 1 de febrero.",
    finalShort: "Seguro médico: hasta el 15/1",
    days: (n: number) => (n === 0 ? "Último día" : n === 1 ? "Queda 1 día" : `Quedan ${n} días`),
    help: "Ayuda gratis",
    heroTitle: (p: EnrollmentPhase): string =>
      p.kind === "jan1" ? "Inscríbase antes del 15 de diciembre para tener cobertura desde el 1 de enero" : "La Inscripción Abierta termina el 15 de enero",
    heroText: (p: EnrollmentPhase): string =>
      p.kind === "jan1"
        ? "La Inscripción Abierta dura hasta el 15 de enero, pero debe inscribirse antes del 15 de diciembre para estar cubierto desde el 1 de enero. Nuestros agentes bilingües le ayudan a comparar planes y presentar su solicitud sin costo."
        : "Si se inscribe antes del 15 de enero, su cobertura empieza el 1 de febrero. Después, necesitará un evento de vida que califique para inscribirse este año. Nuestros agentes bilingües le ayudan sin costo.",
    call: "Llame para ayuda gratis",
  },
};

/** One line in the header's top bar. */
export function EnrollmentBar({ phase, mounted }: { phase: EnrollmentPhase; mounted: boolean }) {
  const t = useT(copy);
  const lp = useLocalizePath();
  return (
    <Link
      href={lp("/health-insurance")}
      onClick={() => track("enrollment_notice_click", { placement: "top_bar", phase: phase.kind })}
      className="group flex min-w-0 items-center gap-1.5 hover:text-primary-200"
    >
      <CalendarClock className="h-3.5 w-3.5 flex-shrink-0 text-electric-300" aria-hidden />
      <span className="truncate sm:hidden">{phase.kind === "jan1" ? t.jan1Short : t.finalShort}</span>
      <span className="hidden truncate sm:inline">{phase.kind === "jan1" ? t.jan1 : t.final}</span>
      {mounted && phase.daysLeft <= 30 && (
        <span className="hidden flex-shrink-0 rounded-full bg-electric-400/20 px-2 py-0.5 text-xs font-semibold text-electric-200 md:inline">
          {t.days(phase.daysLeft)}
        </span>
      )}
      <span className="hidden flex-shrink-0 items-center gap-1 font-semibold text-electric-300 underline-offset-2 group-hover:underline lg:inline-flex">
        {t.help} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </Link>
  );
}

/** Deadline callout under the health insurance page heading. */
export function EnrollmentHero({ phase, mounted }: { phase: EnrollmentPhase; mounted: boolean }) {
  const t = useT(copy);
  const tel = `tel:${COMPANY.phone.replace(/[^\d+]/g, "")}`;
  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-electric-300/40 bg-white/10 p-5 text-left backdrop-blur">
      <p className="flex items-center gap-2 text-lg font-semibold text-white">
        <CalendarClock className="h-5 w-5 flex-shrink-0 text-electric-300" aria-hidden />
        {t.heroTitle(phase)}
        {mounted && phase.daysLeft <= 30 && (
          <span className="ml-auto flex-shrink-0 rounded-full bg-electric-400/25 px-2.5 py-0.5 text-xs font-semibold text-electric-100">
            {t.days(phase.daysLeft)}
          </span>
        )}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/85">{t.heroText(phase)}</p>
      <a
        href={tel}
        onClick={() => track("enrollment_notice_click", { placement: "health_hero", phase: phase.kind })}
        className="btn-electric mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
      >
        <Phone className="h-4 w-4" aria-hidden />
        {t.call}: {COMPANY.phone}
      </a>
    </div>
  );
}
