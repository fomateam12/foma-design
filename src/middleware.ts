import { NextRequest, NextResponse } from "next/server";
import { consume, ipFromRequest, type RateLimitOptions } from "@/lib/rate-limit";

/**
 * Edge / Node middleware. Two jobs:
 *
 *   1. Per-route, per-IP rate limiting for the public API surface. The caps
 *      are loose enough not to bother real users (a few quote requests an
 *      hour is fine) but tight enough to kill volumetric abuse.
 *   2. Surface the trace ID — either Vercel's `x-vercel-id` or one we mint —
 *      back to the client as `x-trace-id` so support tickets can quote it.
 *
 * The rate-limit storage is in-memory (see src/lib/rate-limit.ts for the
 * tradeoff vs Upstash Redis). When traffic justifies it, swap in
 * `@upstash/ratelimit` without changing this file's structure.
 */

const ROUTE_LIMITS: Record<string, RateLimitOptions> = {
  // Quote + reseller application: low cap, long window — these endpoints
  // trigger emails, so abuse is expensive. 5 per hour per IP keeps a busy
  // operator inside the cap and stops a bot dead.
  "POST /api/quote": { limit: 5, windowMs: 60 * 60 * 1000 },
  "POST /api/reseller-application": { limit: 5, windowMs: 60 * 60 * 1000 },
  // Search: read-only, but a scraper can enumerate the catalog. 60/minute
  // per IP is generous for humans and unfriendly to scrapers.
  "GET /api/search": { limit: 60, windowMs: 60 * 1000 },
};

function pickLimit(req: NextRequest): RateLimitOptions | null {
  const key = `${req.method} ${req.nextUrl.pathname}`;
  return ROUTE_LIMITS[key] ?? null;
}

export function middleware(request: NextRequest) {
  const limit = pickLimit(request);
  const traceId =
    request.headers.get("x-vercel-id") ??
    request.headers.get("x-trace-id") ??
    crypto.randomUUID();

  if (limit) {
    const ip = ipFromRequest(request);
    const route = `${request.method} ${request.nextUrl.pathname}`;
    const result = consume(`${route}:${ip}`, limit);
    if (!result.ok) {
      const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
      return new NextResponse(
        JSON.stringify({
          ok: false,
          error: "Too many requests. Please slow down and try again shortly.",
        }),
        {
          status: 429,
          headers: {
            "content-type": "application/json",
            "retry-after": String(retryAfter),
            "x-ratelimit-limit": String(limit.limit),
            "x-ratelimit-remaining": "0",
            "x-ratelimit-reset": String(Math.floor(result.resetAt / 1000)),
            "x-trace-id": traceId,
          },
        },
      );
    }
    // Pass the trace ID + remaining budget downstream via request headers
    // so route handlers can include them on the response without re-deriving.
    const headers = new Headers(request.headers);
    headers.set("x-trace-id", traceId);
    headers.set("x-ratelimit-limit", String(limit.limit));
    headers.set("x-ratelimit-remaining", String(result.remaining));
    headers.set("x-ratelimit-reset", String(Math.floor(result.resetAt / 1000)));

    const response = NextResponse.next({ request: { headers } });
    response.headers.set("x-trace-id", traceId);
    response.headers.set("x-ratelimit-limit", String(limit.limit));
    response.headers.set("x-ratelimit-remaining", String(result.remaining));
    response.headers.set("x-ratelimit-reset", String(Math.floor(result.resetAt / 1000)));
    return response;
  }

  // No rate limit on this path — still propagate the trace ID.
  const headers = new Headers(request.headers);
  headers.set("x-trace-id", traceId);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("x-trace-id", traceId);
  return response;
}

export const config = {
  // Match all API routes. Static assets and pages don't need the throttle.
  matcher: ["/api/:path*"],
};
