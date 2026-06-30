/**
 * Structured JSON logger for API routes + delivery dispatchers.
 *
 * One-line JSON per event so Vercel's log aggregator can index by field, and
 * a trace ID propagates from the request entry (middleware or route handler)
 * down through dispatch helpers — making 3am debug actually possible.
 *
 * Privacy: customer-identifying fields are masked at the boundary. Email
 * addresses, names and phone numbers go through `maskPii` before they reach
 * any log line, so a leak of the Vercel logs doesn't leak the lead list.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  /** Request-scoped correlation ID. Generated at the API entry point. */
  traceId?: string;
  /** Coarse event tag, e.g. "lead_received" / "dispatch_failed". */
  event: string;
  /** Free-form key/value payload — masked before serialization. */
  [key: string]: unknown;
}

const REDACTED = "[redacted]";

/** Mask an email like "alice.bob@example.com" → "a***@example.com". */
export function maskEmail(value: unknown): string {
  if (typeof value !== "string") return "";
  const at = value.indexOf("@");
  if (at < 1) return REDACTED;
  const local = value.slice(0, at);
  const domain = value.slice(at);
  return `${local[0]}***${domain}`;
}

/** Reduce a name to first-initial + last-initial. */
export function maskName(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "";
  const parts = value.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return last ? `${first}.${last}.` : `${first}.`;
}

/** Mask a phone — keep country/area hint, drop the rest. */
export function maskPhone(value: unknown): string {
  if (typeof value !== "string") return "";
  const digits = value.replace(/\D/g, "");
  if (digits.length < 4) return REDACTED;
  return `${digits.slice(0, Math.min(3, digits.length - 4))}***${digits.slice(-2)}`;
}

const SENSITIVE_KEYS = new Set([
  "email",
  "fullName",
  "name",
  "phone",
  "applicantEmail",
  "customerEmail",
  "to",
  "from",
  "replyTo",
]);

/**
 * Walk a plain object and apply the right mask per key. Non-string values
 * pass through, unknown keys pass through. Returns a new object — caller's
 * input is never mutated. Depth-1 only; nested objects are stringified
 * `[object]` for safety (catalog data is flat in our case).
 */
export function maskPii(payload: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (value === null || value === undefined) {
      out[key] = value;
      continue;
    }
    if (key === "email" || /email/i.test(key)) {
      out[key] = maskEmail(value);
    } else if (key === "phone" || /phone/i.test(key)) {
      out[key] = maskPhone(value);
    } else if (key === "fullName" || key === "name") {
      out[key] = maskName(value);
    } else if (SENSITIVE_KEYS.has(key) && typeof value === "string") {
      out[key] = REDACTED;
    } else if (typeof value === "object") {
      out[key] = "[object]";
    } else {
      out[key] = value;
    }
  }
  return out;
}

function emit(level: LogLevel, ctx: LogContext): void {
  const line = {
    level,
    ts: new Date().toISOString(),
    traceId: ctx.traceId,
    event: ctx.event,
    ...Object.fromEntries(
      Object.entries(ctx).filter(
        ([key]) => key !== "traceId" && key !== "event",
      ),
    ),
  };
  let serialized: string;
  try {
    serialized = JSON.stringify(line);
  } catch {
    serialized = JSON.stringify({
      level,
      ts: line.ts,
      traceId: ctx.traceId,
      event: ctx.event,
      note: "unserializable_payload",
    });
  }
  // Route through the matching console method so log levels survive Vercel's
  // log UI (info goes to "info", error goes to "error" filter etc.).
  switch (level) {
    case "error":
      console.error(serialized);
      break;
    case "warn":
      console.warn(serialized);
      break;
    case "debug":
      // Suppressed in production by default; Vercel still captures stdout.
      console.debug(serialized);
      break;
    default:
      console.log(serialized);
  }
}

export const log = {
  info: (ctx: LogContext) => emit("info", ctx),
  warn: (ctx: LogContext) => emit("warn", ctx),
  error: (ctx: LogContext) => emit("error", ctx),
  debug: (ctx: LogContext) => emit("debug", ctx),
};
