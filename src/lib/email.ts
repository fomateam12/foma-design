import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";
import type { QuoteInput } from "@/lib/validation";
import { log, maskPii } from "@/lib/log";

/**
 * Lead delivery — free, self-hosted. No paid third-party sender.
 *
 * Channels (best-effort fan-out, in order):
 *   1. SMTP email      — your own mailbox (e.g. info@fomaprint.com via any free
 *                        provider). Sends a branded HTML notice to the inbox
 *                        WITH the lead attached as a .csv, plus a confirmation
 *                        to the applicant. Set SMTP_HOST / SMTP_USER / SMTP_PASS.
 *   2. CSV webhook     — optional cumulative CSV/Sheet: POSTs the lead JSON to a
 *                        URL you control (e.g. a Google Apps Script that appends
 *                        a row you can export as CSV). Set LEAD_WEBHOOK_URL.
 *   3. Server log      — always on; every lead prints as a "[LEAD]" JSON line
 *                        (recover via `vercel logs`). Safety net so nothing is
 *                        ever silently dropped.
 */

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === "true"
  : SMTP_PORT === 465;

const FROM =
  process.env.EMAIL_FROM ??
  (SMTP_USER ? `FomaPrint <${SMTP_USER}>` : "FomaPrint <info@fomaprint.com>");
const TO = process.env.EMAIL_TO ?? site.email;
const WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL;

const smtpReady = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

type ChannelState = "ok" | "fail" | "off";

export interface DeliveryResult {
  /** Safe to tell the applicant their request went through. */
  ok: boolean;
  /** Lead was recorded server-side (structured log) — always true unless the handler threw. */
  captured: boolean;
  /** At least one external channel (email/webhook) accepted the lead. */
  delivered: boolean;
  channels: { email: ChannelState; webhook: ChannelState };
  csvFilename?: string;
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
  return `<tr><td style="padding:6px 12px;color:#6b6257;font-size:13px;vertical-align:top;white-space:nowrap">${esc(
    label,
  )}</td><td style="padding:6px 12px;color:#2a2620;font-size:14px">${esc(
    String(value),
  )}</td></tr>`;
}

function shell(title: string, inner: string): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"></head>
<body style="margin:0;padding:0;background:#f3ede3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ede3;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <tr><td align="center" style="padding:28px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e7e1d8;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#1c2430;padding:22px 28px;">
          <span style="color:#ffffff;font-size:19px;font-weight:700;letter-spacing:-0.01em;">Foma<span style="color:#c05a28;">Print</span></span>
        </td></tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#a8481e,#c05a28);font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:28px 28px 8px;">
          <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:#1c2430;font-weight:700;">${esc(title)}</h1>
          ${inner}
        </td></tr>
        <tr><td style="padding:20px 28px;border-top:1px solid #e7e1d8;background:#faf6ef;">
          <p style="margin:0;color:#8a8175;font-size:12px;line-height:1.7;">
            <strong style="color:#6b6257;">${esc(site.legalName)}</strong> · Made to order in the USA<br>
            <a href="mailto:${esc(site.email)}" style="color:#a8481e;text-decoration:none;">${esc(site.email)}</a> · ${esc(site.phoneDisplay)}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

/* --------------------------------- CSV ------------------------------------ */

function csvCell(v: unknown): string {
  if (v === null || v === undefined) v = "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Build a single-lead CSV (header row + one data row), CRLF for Excel. */
function buildCsv(at: string, data: Record<string, unknown>): string {
  const headers = ["timestamp", ...Object.keys(data)];
  const values = [at, ...Object.values(data)];
  return (
    [headers.map(csvCell).join(","), values.map(csvCell).join(",")].join(
      "\r\n",
    ) + "\r\n"
  );
}

/* ------------------------------- channels --------------------------------- */

/** Always-on durable capture: structured JSON, PII masked at the boundary. */
function logLead(
  kind: string,
  payload: Record<string, unknown>,
  traceId?: string,
): void {
  log.info({
    traceId,
    event: `lead.${kind}`,
    payload: maskPii(payload),
  });
}

/** Optional cumulative CSV: POST the lead to a URL you control. */
async function postWebhook(
  payload: Record<string, unknown>,
  traceId?: string,
): Promise<ChannelState> {
  if (!WEBHOOK_URL) return "off";
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      log.error({
        traceId,
        event: "lead.webhook_failed",
        status: res.status,
        statusText: res.statusText,
      });
      return "fail";
    }
    return "ok";
  } catch (err) {
    log.error({
      traceId,
      event: "lead.webhook_error",
      message: err instanceof Error ? err.message : String(err),
    });
    return "fail";
  }
}

let cachedTransport: Transporter | null = null;
function transport(): Transporter {
  if (cachedTransport) return cachedTransport;
  cachedTransport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  return cachedTransport;
}

async function sendEmail(args: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: string; contentType?: string }[];
  traceId?: string;
  channel: "admin" | "customer";
}): Promise<ChannelState> {
  if (!smtpReady) return "off";
  try {
    await transport().sendMail({
      from: FROM,
      to: args.to,
      subject: args.subject,
      html: args.html,
      replyTo: args.replyTo,
      attachments: args.attachments,
    });
    return "ok";
  } catch (err) {
    log.error({
      traceId: args.traceId,
      event: "email.smtp_failed",
      channel: args.channel,
      message: err instanceof Error ? err.message : String(err),
    });
    return "fail";
  }
}

/* -------------------------------- dispatch -------------------------------- */

/**
 * Fan a lead out to every configured channel. `ok` is false only when at least
 * one channel was configured AND all configured ones failed, so the form shows
 * an error only on a genuine delivery outage (never just because nothing is set
 * up yet — the lead is still captured in the log).
 */
async function dispatch(opts: {
  kind: string;
  logData: Record<string, unknown>;
  admin: { subject: string; html: string; replyTo?: string };
  customer: { to: string; subject: string; html: string };
  traceId?: string;
}): Promise<DeliveryResult> {
  const at = new Date().toISOString();
  const payload = { kind: opts.kind, at, ...opts.logData };

  logLead(opts.kind, payload, opts.traceId);

  const csv = buildCsv(at, opts.logData);
  const csvFilename = `${opts.kind}-${at.slice(0, 19).replace(/[:T]/g, "-")}.csv`;

  const webhook = await postWebhook(payload, opts.traceId);

  const email = await sendEmail({
    to: TO,
    subject: opts.admin.subject,
    html: opts.admin.html,
    replyTo: opts.admin.replyTo,
    attachments: [{ filename: csvFilename, content: csv, contentType: "text/csv" }],
    traceId: opts.traceId,
    channel: "admin",
  });
  // Customer confirmation is best-effort; never gates the result, but a
  // failure to send IS surfaced as a warn so the operator can spot
  // systematic deliverability issues (e.g. reputational SMTP block).
  if (email === "ok") {
    const customerState = await sendEmail({
      to: opts.customer.to,
      subject: opts.customer.subject,
      html: opts.customer.html,
      traceId: opts.traceId,
      channel: "customer",
    });
    if (customerState === "fail") {
      log.warn({
        traceId: opts.traceId,
        event: "lead.customer_confirmation_failed",
        kind: opts.kind,
      });
    }
  }

  const configured = (WEBHOOK_URL ? 1 : 0) + (smtpReady ? 1 : 0);
  const delivered = webhook === "ok" || email === "ok";
  const allConfiguredFailed = configured > 0 && !delivered;

  return {
    ok: !allConfiguredFailed,
    captured: true,
    delivered,
    channels: { email, webhook },
    csvFilename,
    error: allConfiguredFailed
      ? "All configured delivery channels failed."
      : undefined,
  };
}

/* ------------------------------- public API ------------------------------- */

// Note: reseller-application delivery moved to `@/lib/reseller-email` (Resend).
// This module now serves the quote (RFQ) flow only.

export async function sendQuoteRequestEmails(
  data: QuoteInput,
  ctx?: { traceId?: string },
): Promise<DeliveryResult> {
  const totalQty = data.items.reduce((sum, it) => sum + it.quantity, 0);
  const itemsSummary = data.items
    .map((it) => `${it.sku} ×${it.quantity}${it.note ? ` (${it.note})` : ""}`)
    .join(" | ");

  const itemRows = data.items
    .map(
      (it) =>
        `<tr style="border-top:1px solid #eee7dd">
          <td style="padding:8px 12px;font-size:13px;color:#2a2620;line-height:1.4">${esc(
            it.name,
          )}<div style="font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8a8175;margin-top:2px">${esc(
            it.sku,
          )}</div>${
            it.note
              ? `<div style="font-size:12px;color:#6b6257;margin-top:4px">↳ ${esc(
                  it.note,
                )}</div>`
              : ""
          }</td>
          <td style="padding:8px 12px;font-size:14px;color:#2a2620;text-align:right;vertical-align:top;white-space:nowrap">×${
            it.quantity
          }</td>
        </tr>`,
    )
    .join("");

  const adminInner = `
    <table style="width:100%;border-collapse:collapse;border:1px solid #e7e1d8;border-radius:8px">
      ${row("Name", data.fullName)}
      ${row("Business", data.businessName)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Website", data.website)}
      ${row("Sells on", data.channels?.join(", "))}
      ${row("Monthly volume", data.monthlyVolume)}
      ${row("Fulfillment", data.shipModel)}
      ${row("Deadline", data.deadline)}
      ${row("Artwork", data.artworkUrl)}
      ${row("Notes", data.notes)}
    </table>
    <p style="font-size:13px;color:#6b6257;margin:16px 0 6px;font-weight:600">Requested items (${
      data.items.length
    } lines · ${totalQty} units)</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e7e1d8;border-radius:8px">
      ${itemRows}
    </table>
    <p style="font-size:12px;color:#8a8175;margin-top:12px">A CSV copy of this lead is attached.</p>`;

  const customerItems = data.items
    .map(
      (it) =>
        `${row(it.name, `${it.sku} · ×${it.quantity}`)}`,
    )
    .join("");

  const customerInner = `
    <p style="font-size:14px;color:#2a2620;line-height:1.6">Hi ${esc(
      data.fullName,
    )},</p>
    <p style="font-size:14px;color:#544c40;line-height:1.6">Thanks for your quote request! Our team will reply the same business day with wholesale pricing and lead times. Production then runs same-day on orders placed before 2pm ET. Here's what we received:</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e7e1d8;border-radius:8px;margin-top:8px">
      ${customerItems}
    </table>
    <p style="font-size:14px;color:#544c40;line-height:1.6;margin-top:16px">Talk soon,<br/>The ${esc(
      site.name,
    )} team</p>`;

  return dispatch({
    kind: "quote-request",
    traceId: ctx?.traceId,
    logData: {
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      phone: data.phone,
      website: data.website,
      channels: data.channels?.join(", "),
      monthlyVolume: data.monthlyVolume,
      shipModel: data.shipModel,
      deadline: data.deadline,
      artworkUrl: data.artworkUrl,
      notes: data.notes,
      lineCount: data.items.length,
      totalQty,
      items: itemsSummary,
    },
    admin: {
      subject: `New quote request — ${data.fullName} (${data.items.length} items, ${totalQty} units)`,
      html: shell("New quote request", adminInner),
      replyTo: data.email,
    },
    customer: {
      to: data.email,
      subject: `We received your quote request — ${site.name}`,
      html: shell("Thanks for your request!", customerInner),
    },
  });
}
