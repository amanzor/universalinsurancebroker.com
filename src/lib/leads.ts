import { COMPANY } from "@/lib/constants";

/*
 * Lead delivery for the static site.
 *
 * The site is a static export (no server), so form submissions are relayed
 * by FormSubmit (https://formsubmit.co), which emails each submission to
 * LEAD_INBOX. The very first submission triggers a one-time activation email
 * to that inbox; until the link in it is clicked, submissions are not
 * delivered. After activating, FormSubmit's email includes a random alias
 * that can replace the address below so it isn't exposed in page source.
 */
export const LEAD_INBOX = COMPANY.email;
const ENDPOINT = `https://formsubmit.co/ajax/${LEAD_INBOX}`;

export type LeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(
  subject: string,
  fields: Record<string, string>,
): Promise<LeadResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...fields,
        _subject: subject,
        _template: "table",
        _captcha: "false",
        ...(fields.email ? { _replyto: fields.email } : {}),
      }),
    });
    const data = (await res.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;
    if (res.ok && (data?.success === true || data?.success === "true")) {
      return { ok: true };
    }
    return { ok: false, error: data?.message ?? `Request failed (${res.status})` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
