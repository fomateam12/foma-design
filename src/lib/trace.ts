/**
 * Request-scoped trace ID. We prefer Vercel's own request ID (`x-vercel-id`)
 * so logs line up with Vercel's request explorer; we fall back to a
 * crypto.randomUUID() on local dev / non-Vercel hosts.
 *
 * The trace ID is also surfaced back to the caller on every API response via
 * the `x-trace-id` header — support tickets can quote it and we grep for it.
 */

export const TRACE_HEADER = "x-trace-id";

export function getTraceId(request: Request): string {
  return (
    request.headers.get("x-vercel-id") ??
    request.headers.get(TRACE_HEADER) ??
    crypto.randomUUID()
  );
}
