
/*
 * Lead delivery for the static site.
 *
 * The site is a static export (no server), so form submissions are relayed
 * by FormSubmit (https://formsubmit.co), which emails each submission to the
 * universalinsurancebroker@gmail.com inbox. The very first submission triggers a one-time activation email
 * to that inbox; until the link in it is clicked, submissions are not
 * delivered. After activating, FormSubmit's email includes a random alias
 * that replaces the address so it isn't exposed in page source.
 *
 * FormSubmit activates each site origin separately. Browsers send only the
 * origin (https://www.universalinsurancebroker.com/) as the referrer, so
 * that is the form that must be activated; it was activated on 2026-11-10.
 */
/**
 * FormSubmit alias for the lead inbox (from its activation email), used
 * instead of the address so it isn't exposed in the page source.
 */
const FORM_ENDPOINT_ID = "3ea7d91b3d49291649f4b8e7afaed142";
const ENDPOINT = `https://formsubmit.co/ajax/${FORM_ENDPOINT_ID}`;

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
