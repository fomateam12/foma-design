import { Resend } from "resend";
import { site } from "@/lib/site";
import { ORDER_CUTOFF } from "@/lib/site-copy";
import type { ResellerApplicationInput } from "@/lib/validation";
import { log } from "@/lib/log";

/**
 * Reseller-application email delivery via Resend.
 *
 * Two messages per valid application:
 *   1. Internal notification → RESELLER_NOTIFICATION_EMAIL (Reply-To = applicant)
 *   2. Confirmation          → the applicant
 *
 * Templates are bulletproof, table-based, inline-styled HTML (renders in Outlook
 * / Gmail / Apple Mail) with a hidden preheader and no external images.
 *
 * Required env (set in Vercel / .env.local by the operator — never read here as
 * files, only by name at runtime):
 *   - RESEND_API_KEY
 *   - RESELLER_FROM_EMAIL          e.g. "FomaPrint <noreply@fomaprint.com>"
 *   - RESELLER_NOTIFICATION_EMAIL  e.g. "info@fomaprint.com"
 */

/** Public contact shown to applicants (the fomaprint.com mailbox). */
const CONTACT_EMAIL = "info@fomaprint.com";

/* Brand palette (kept in sync with the site tokens). */
const C = {
  ink: "#1c2430",
  rust: "#a8481e",
  rustBright: "#c05a28",
  pageBg: "#f3ede3",
  card: "#ffffff",
  border: "#e7e1d8",
  hair: "#f0ece4",
  text: "#2a2620",
  body: "#544c40",
  muted: "#6b6257",
  faint: "#8a8175",
  footerBg: "#faf6ef",
};

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

/** One labelled row in the data table. Hidden entirely when the value is empty. */
function row(label: string, value?: string | number | null): string {
  if (value === undefined || value === null || value === "") return "";
  return `<tr>
      <td style="padding:9px 16px;color:${C.muted};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;vertical-align:top;white-space:nowrap;border-bottom:1px solid ${C.hair}">${esc(
        label,
      )}</td>
      <td style="padding:9px 16px;color:${C.text};font-size:14px;line-height:1.5;border-bottom:1px solid ${C.hair}">${esc(
        String(value),
      )}</td>
    </tr>`;
}

/**
 * Bulletproof email shell. Table-based, 600px, centered, responsive, with a
 * hidden preheader (inbox preview text), a dark branded header bar, and a footer.
 */
function layout(opts: {
  preheader: string;
  eyebrow: string;
  heading: string;
  body: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${C.pageBg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">${esc(
    opts.preheader,
  )}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.pageBg};font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center" style="padding:28px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:${C.card};border:1px solid ${C.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:${C.ink};padding:22px 28px;">
              <span style="color:#ffffff;font-size:19px;font-weight:700;letter-spacing:-0.01em;">Foma<span style="color:${C.rustBright};">Print</span></span>
              <span style="float:right;color:#b7b1a6;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.14em;padding-top:5px;">${esc(
                opts.eyebrow,
              )}</span>
            </td>
          </tr>
          <tr><td style="height:3px;background:linear-gradient(90deg,${C.rust},${C.rustBright});font-size:0;line-height:0;">&nbsp;</td></tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:${C.ink};font-weight:700;">${esc(
                opts.heading,
              )}</h1>
              ${opts.body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px;border-top:1px solid ${C.border};background:${C.footerBg};">
              <p style="margin:0;color:${C.faint};font-size:12px;line-height:1.7;">
                <strong style="color:${C.muted};">${esc(site.legalName)}</strong> · Made to order in the USA<br>
                <a href="mailto:${CONTACT_EMAIL}" style="color:${C.rust};text-decoration:none;">${CONTACT_EMAIL}</a> · ${esc(
                  site.phoneDisplay,
                )}
              </p>
            </td>
          </tr>
        </table>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">
          <tr><td style="padding:14px 12px;text-align:center;color:${C.faint};font-size:11px;line-height:1.6;">
            FomaPrint is a white-label print-on-demand &amp; laser-engraving partner. This message was sent because an application or quote was submitted at ${esc(
              site.url.replace(/^https?:\/\//, ""),
            )}.
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:${C.rust};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 22px;border-radius:8px;line-height:1;">${esc(
    label,
  )}</a>`;
}

/* -------------------------------- templates ------------------------------- */

function internalHtml(data: ResellerApplicationInput, submittedAt: string): string {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name.trim();
  const body = `
    <p style="margin:0 0 18px;font-size:14px;color:${C.body};line-height:1.6;">
      A new reseller application just came in. The fastest way to respond is to
      reply directly to this email — it goes straight to ${esc(firstName)}.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.border};border-radius:10px;overflow:hidden;margin-bottom:22px;">
      ${row("Name", data.name)}
      ${row("Business", data.businessName)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Website", data.website)}
      ${row("Business type", data.businessType)}
      ${row("Monthly volume", data.monthlyVolume)}
      ${row("Products", data.products)}
      ${row("Heard via", data.hearAboutUs)}
      ${row("Heard via (other)", data.hearAboutUsOther)}
      ${row("About", data.about)}
      ${row("Submitted", submittedAt)}
    </table>
    <div style="margin:0 0 6px;">
      ${button(`mailto:${data.email}?subject=${encodeURIComponent(
        `Your FomaPrint reseller application — ${data.businessName}`,
      )}`, `Reply to ${firstName}`)}
    </div>`;
  return layout({
    preheader: `${data.businessName} — ${data.monthlyVolume} · ${data.email}`,
    eyebrow: "Reseller application",
    heading: `New application — ${data.businessName}`,
    body,
  });
}

function applicantHtml(data: ResellerApplicationInput): string {
  const firstName = data.name.trim().split(/\s+/)[0] || data.name.trim();
  const steps = [
    "We review your application and prepare wholesale pricing for the products you listed.",
    "We reply the same business day with rates, personalization options and next steps.",
    "You list our products under your brand — we engrave, produce and blind-ship every order from the USA.",
  ];
  const stepsHtml = steps
    .map(
      (s, i) =>
        `<tr>
          <td width="34" valign="top" style="padding:6px 12px 6px 0;">
            <span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${C.rust};color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:24px;">${i + 1}</span>
          </td>
          <td valign="top" style="padding:6px 0;font-size:14px;color:${C.body};line-height:1.55;">${esc(s)}</td>
        </tr>`,
    )
    .join("");

  const body = `
    <p style="margin:0 0 16px;font-size:15px;color:${C.text};line-height:1.6;">Hi ${esc(
      firstName,
    )},</p>
    <p style="margin:0 0 18px;font-size:14px;color:${C.body};line-height:1.6;">
      Thanks for applying to become a FomaPrint reseller. We've received your
      application for <strong style="color:${C.text};">${esc(
        data.businessName,
      )}</strong> and a real person on our team will review it shortly.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 20px;">
      ${stepsHtml}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf3ec;border:1px solid ${C.border};border-radius:10px;margin-bottom:20px;">
      <tr><td style="padding:14px 16px;font-size:13px;color:${C.body};line-height:1.6;">
        <strong style="color:${C.rust};">While you wait —</strong> we print and ship most orders the
        <strong>same day</strong> (on orders placed before ${esc(
          ORDER_CUTOFF,
        )}), blind-shipped from the USA under your brand.
      </td></tr>
    </table>
    <p style="margin:0 0 18px;font-size:14px;color:${C.body};line-height:1.6;">
      Questions before then? Email
      <a href="mailto:${CONTACT_EMAIL}" style="color:${C.rust};font-weight:600;text-decoration:none;">${CONTACT_EMAIL}</a>
      or call <strong>${esc(site.phoneDisplay)}</strong>.
    </p>
    <p style="margin:18px 0 0;font-size:14px;color:${C.body};line-height:1.6;">
      Talk soon,<br>
      <strong style="color:${C.text};">The FomaPrint team</strong><br>
      <span style="color:${C.faint};">${esc(site.legalName)}</span>
    </p>`;
  return layout({
    preheader: `We received your application for ${data.businessName} — we'll reply the same business day.`,
    eyebrow: "Application received",
    heading: "We've got your application",
    body,
  });
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
  ctx?: { traceId?: string },
): Promise<ResellerEmailResult> {
  const traceId = ctx?.traceId;
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
    log.error({
      traceId,
      event: "reseller.email_not_configured",
      missing,
    });
    return {
      ok: false,
      internalSent: false,
      applicantSent: false,
      error: `Email not configured: missing ${missing}.`,
    };
  }

  const resend = new Resend(apiKey);
  const submittedAt = nyTimestamp();

  // RESELLER_NOTIFICATION_EMAIL may be a comma-separated list so the lead lands
  // in more than one inbox (e.g. info@fomaprint.com + a reliable Gmail). This
  // makes lead delivery robust even if one recipient's mail server is delayed.
  const notifyList = notify
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const [internal, applicant] = await Promise.allSettled([
    resend.emails.send({
      from,
      to: notifyList,
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
    log.error({
      traceId,
      event: "reseller.internal_email_failed",
      reason,
    });
  }
  if (!applicantSent) {
    const reason =
      applicant.status === "rejected"
        ? String(applicant.reason)
        : JSON.stringify(applicant.value.error);
    log.warn({
      traceId,
      event: "reseller.applicant_confirmation_failed",
      reason,
    });
  }

  return {
    ok: internalSent,
    internalSent,
    applicantSent,
    error: internalSent ? undefined : "Internal notification failed to send.",
  };
}
