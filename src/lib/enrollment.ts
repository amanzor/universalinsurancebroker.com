"use client";

import { useEffect, useState } from "react";

/*
 * ACA Open Enrollment windows for Florida (HealthCare.gov), confirmed on
 * https://www.healthcare.gov/quick-guide/dates-and-deadlines/ in Nov 2026.
 * Add next season's window here once HealthCare.gov publishes it; outside
 * every window the notice simply doesn't show.
 */
const WINDOWS = [
  // Plan year 2027: Nov 1, 2026 - Jan 15, 2027. Enroll by Dec 15 for Jan 1.
  { start: "2026-11-01", jan1Deadline: "2026-12-15", end: "2027-01-15" },
];

export type EnrollmentPhase =
  /** Before the Jan 1 deadline (enroll by Dec 15). */
  | { kind: "jan1"; deadline: string; daysLeft: number }
  /** After Dec 15: last chance, coverage starts Feb 1. */
  | { kind: "final"; deadline: string; daysLeft: number };

/** Today's date in Florida (Eastern time) as YYYY-MM-DD. */
function todayInFlorida(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

const dayDiff = (from: string, to: string) =>
  Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);

export function enrollmentPhase(now: Date = new Date()): EnrollmentPhase | null {
  const today = todayInFlorida(now);
  for (const w of WINDOWS) {
    if (today < w.start || today > w.end) continue;
    if (today <= w.jan1Deadline)
      return { kind: "jan1", deadline: w.jan1Deadline, daysLeft: dayDiff(today, w.jan1Deadline) };
    return { kind: "final", deadline: w.end, daysLeft: dayDiff(today, w.end) };
  }
  return null;
}

/**
 * The phase for the visitor's current date. The static build renders the
 * phase as of build time; after mount it's recomputed, so the notice
 * changes or disappears on time even without a new deploy. `daysLeft` is
 * only shown after mount to keep the server and client markup identical.
 */
export function useEnrollmentPhase(): { phase: EnrollmentPhase | null; mounted: boolean } {
  const [state, setState] = useState(() => ({ phase: enrollmentPhase(), mounted: false }));
  useEffect(() => {
    setState({ phase: enrollmentPhase(), mounted: true });
  }, []);
  return state;
}
