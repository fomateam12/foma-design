import { Resend } from "resend";
import { site } from "@/lib/site";
import { PRINTING_PROMISE, SHIPPING_PROMISE } from "@/lib/site-copy";
import type { ResellerApplicationInput } from "@/lib/validation";

/**
 * Reseller-application email delivery via Resend.
 *
 * Two messages per valid application:
 *   1. Internal notification → RESELLER_NOTIFICATION_EMAIL (Reply-To = applicant)
 *   2. Confirmation          → the applicant
 *
 * Required env (set in Vercel + .env.local by the operator — never read here as
 * files, only by name at runtime):
 *   - RESEND_API_KEY
 *   - RESELLER_FROM_EMAIL          e.g. "FomaPrint <noreply@fomaprint.com>"
 *   - RESELLER_NOTIFICATION_EMAIL  e.g. "info@fomaprint.com"
 *
 * If any are missing the send is skipped and reported as a config error so the
 * route can return a generic 500 — the build never depends on these values.
 */

/** Public contact shown to applicants (the fomaprint.com mailbox). */
const CONTACT_EMAIL = "info@fomaprint.com";

export interface ResellerEmailResult {
  /** Safe to tell the applicant their application went through. */
  ok: boolean;
  /** The internal team notification was accepted by Resend. */
  internalSent: boolean;
  /** The applicant confirmation was accepted by Resend. */
  applicantSent: boolean;
  /** Server-side-only reason; never returned to the client. */
  error?: string;
}

/* ------------------------------- HTML helpers ------------------------------ */

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value?: string | number | null): string {
  if (value === undefined || value === null || value === "") return "";
  return `<tr>
      <td style="padding:7px 14px;color:#6b6257;font-size:13px;vertical-align:top;white-space:nowrap;border-bottom:1px solid #f0ece4">${esc(
        label,
      )}</td>
      <td style="padding:7px 14px;color:#2a2620;font-size:14px;border-bottom:1px solid #f0ece4">${esc(
        String(value),
      )}</td>
    </tr>`;
}

/** Shared shell: white card, dark text, FomaPrint wordmark, no external images. */
function shell(heading: string, inner: string): string {
  return `<div style="background:#f6f3ee;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e7e1d8;border-radius:14px;overflow:hidden">
    <div style="background:#2a2620;padding:18px 24px">
      <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.01em">Foma<span style="color:#d2703c">Print</span></span>
    </div>
    <div style="padding:24px">
      <h1 style="margin:0 0 14px;font-size:18px;color:#2a2620;font-weight:700">${esc(
        heading,
      )}</h1>
      ${inner}
    </div>
    <div style="padding:16px 24px;border-top:1px solid #e7e1d8;color:#8a8175;font-size:12px;line-height:1.6">
      ${esc(site.legalName)} · <a href="mailto:${CONTACT_EMAIL}" style="color:#8a8175">${CONTACT_EMAIL}</a> · ${esc(
        site.phoneDisplay,
      )}
    </div>
  </div>
</div>`;
}

/* -------------------------------- templates ------------------------------- */

function internalHtml(data: ResellerApplicationInput, submittedAt: string): string {
  const inner = `
    <p style="margin:0 0 14px;font-size:14px;color:#544c40;line-height:1.6">
      New reseller application from <strong>${esc(data.name)}</strong> at
      <strong>${esc(data.businessName)}</strong>. Reply directly to this email to
      reach the applicant.
    </p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e7e1d8;border-radius:8px;overflow:hidden">
      ${row("Name", data.name)}
      ${row("Business", data.businessName)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Website", data.website)}
      ${row("Business type", data.businessType)}
      ${row("Monthly volume", data.monthlyVolume)}
      ${row("Products", data.products)}
      ${row("About", data.about)}
      ${row("Heard via", data.hearAboutUs)}
      ${row("Heard via (other)", data.hearAboutUsOther)}
      ${row("Submitted", submittedAt)}
    </table>`;
  return shell("New reseller application", inner);
}

function applicantHtml(data: ResellerApplicationInput): string {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name.trim();
  const inner = `
    <p style="margin:0 0 14px;font-size:14px;color:#2a2620;line-height:1.6">Hi ${esc(
      firstName,
    )},</p>
    <p style="margin:0 0 14px;font-size:14px;color:#544c40;line-height:1.6">
      Thanks for applying — we've received your reseller application for
      <strong>${esc(data.businessName)}</strong>. We'll review it and reply within
      <strong>two business days</strong> with pricing and next steps.
    </p>
    <p style="margin:0 0 14px;font-size:14px;color:#544c40;line-height:1.6">
      In the meantime: we print and ship most orders the same day, blind-shipped
      from the USA under your brand. (${esc(PRINTING_PROMISE)}; ${esc(
        SHIPPING_PROMISE.charAt(0).toLowerCase() + SHIPPING_PROMISE.slice(1),
      )}.)
    </p>
    <p style="margin:0 0 14px;font-size:14px;color:#544c40;line-height:1.6">
      Questions before then? Email
      <a href="mailto:${CONTACT_EMAIL}" style="color:#d2703c;font-weight:600">${CONTACT_EMAIL}</a>
      or call <strong>${esc(site.phoneDisplay)}</strong>.
    </p>
    <p style="margin:18px 0 0;font-size:14px;color:#544c40;line-height:1.6">
      The FomaPrint team<br/>
      <span style="color:#8a8175">${esc(site.legalName)}</span>
    </p>`;
  return shell("We've got your application", inner);
}

/* -------------------------------- dispatch -------------------------------- */

function nyTimestamp(): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Send both emails. Uses Promise.allSettled so a failed applicant confirmation
 * never discards a successfully-delivered internal notification (we still have
 * the lead). `ok` is true whenever the internal notification was delivered.
 */
export async function sendResellerApplicationEmails(
  data: ResellerApplicationInput,
): Promise<ResellerEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESELLER_FROM_EMAIL;
  const notify = process.env.RESELLER_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !notify) {
    const missing = [
      !apiKey && "RESEND_API_KEY",
      !from && "RESELLER_FROM_EMAIL",
      !notify && "RESELLER_NOTIFICATION_EMAIL",
    ]
      .filter(Boolean)
      .join(", ");
    return {
      ok: false,
      internalSent: false,
      applicantSent: false,
      error: `Email not configured: missing ${missing}.`,
    };
  }

  const resend = new Resend(apiKey);
  const submittedAt = nyTimestamp();

  const [internal, applicant] = await Promise.allSettled([
    resend.emails.send({
      from,
      to: notify,
      replyTo: data.email,
      subject: `New reseller application — ${data.businessName}`,
      html: internalHtml(data, submittedAt),
    }),
    resend.emails.send({
      from,
      to: data.email,
      subject: "We've got your FomaPrint reseller application",
      html: applicantHtml(data),
    }),
  ]);

  // Resend resolves with `{ data, error }` — treat a non-null `error` as failure.
  const internalSent =
    internal.status === "fulfilled" && !internal.value.error;
  const applicantSent =
    applicant.status === "fulfilled" && !applicant.value.error;

  if (!internalSent) {
    const reason =
      internal.status === "rejected"
        ? String(internal.reason)
        : JSON.stringify(internal.value.error);
    console.error("[reseller-application] internal notification failed:", reason);
  }
  if (!applicantSent) {
    const reason =
      applicant.status === "rejected"
        ? String(applicant.reason)
        : JSON.stringify(applicant.value.error);
    console.error("[reseller-application] applicant confirmation failed:", reason);
  }

  return {
    ok: internalSent,
    internalSent,
    applicantSent,
    error: internalSent ? undefined : "Internal notification failed to send.",
  };
}
