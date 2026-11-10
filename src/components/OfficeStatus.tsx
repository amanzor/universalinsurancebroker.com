"use client";

import { CalendarCheck, DoorOpen } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { useT } from "@/lib/useLang";

export const officeStatusCopy = {
  en: {
    walkIn: "Walk-ins welcome",
    walkInHours: `Monday – Friday, ${COMPANY.walkInHours}`,
    appointment: "By appointment only",
    appointmentHours: "Call to schedule a visit, or get your quote online",
    book: "Call to book an appointment",
  },
  es: {
    walkIn: "Sin cita previa",
    walkInHours: `Lunes – Viernes, ${COMPANY.walkInHours}`,
    appointment: "Solo con cita previa",
    appointmentHours: "Llame para programar una visita o cotice en línea",
    book: "Llame para hacer una cita",
  },
};

/** Small pill: "Walk-ins welcome" or "By appointment only". */
export function OfficeStatusBadge({
  appointmentOnly,
  tone = "light",
  className = "",
}: {
  appointmentOnly: boolean;
  /** "light" for white/gray backgrounds, "dark" for the navy hero. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = useT(officeStatusCopy);
  const Icon = appointmentOnly ? CalendarCheck : DoorOpen;
  const styles =
    tone === "dark"
      ? appointmentOnly
        ? "bg-white/10 text-white ring-white/25"
        : "bg-electric-400 text-primary-900 ring-electric-300"
      : appointmentOnly
        ? "bg-amber-50 text-amber-800 ring-amber-200"
        : "bg-emerald-50 text-emerald-800 ring-emerald-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {appointmentOnly ? t.appointment : t.walkIn}
    </span>
  );
}
