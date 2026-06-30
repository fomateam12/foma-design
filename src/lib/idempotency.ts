/**
 * In-memory idempotency cache for write endpoints.
 *
 * Why: a browser timeout-then-retry, a proxy retry, or a double-clicked
 * submit shouldn't send two leads / two emails. We deduplicate within a short
 * window using a stable fingerprint of the request body, scoped per endpoint.
 *
 * Scope: per-Lambda-instance, like the rate limiter. Most retries hit the
 * same warm instance within seconds, so this catches the realistic abuse.
 * For provably global dedup, the storage layer would move to Vercel KV /
 * Upstash — but the public function shape (`shouldProcess`) stays the same.
 */

import { createHash } from "node:crypto";

const STORE = new Map<string, number>();
const EVICT_AT = 2000;
const EVICT_KEEP = Math.floor(EVICT_AT * 0.75);

function evictIfNeeded(now: number, ttlMs: number): void {
  // Drop everything whose TTL is already past — keeps the working set bounded
  // and means we never serve a stale duplicate that's already eligible to
  // re-send.
  for (const [key, expiresAt] of STORE) {
    if (expiresAt < now) STORE.delete(key);
  }
  if (STORE.size < EVICT_AT) return;
  const sorted = [...STORE.entries()].sort(([, a], [, b]) => a - b);
  for (let i = 0; i < sorted.length - EVICT_KEEP; i++) {
    STORE.delete(sorted[i][0]);
  }
  // `ttlMs` is unused after the first pass but kept in the signature so a
  // future Redis migration doesn't need to revisit callers.
  void ttlMs;
}

/** Hash a JSON-serializable payload to a 32-char fingerprint. */
export function fingerprint(payload: unknown): string {
  let serialized: string;
  try {
    // Sort keys so logically-identical bodies (e.g. `{a, b}` vs `{b, a}`)
    // produce the same hash. We don't sort *nested* values (we don't have
    // those in our schemas) — keep this lean.
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      const sortedEntries = Object.entries(payload as Record<string, unknown>).sort(
        ([a], [b]) => a.localeCompare(b),
      );
      serialized = JSON.stringify(sortedEntries);
    } else {
      serialized = JSON.stringify(payload);
    }
  } catch {
    serialized = String(payload);
  }
  return createHash("sha256").update(serialized).digest("hex").slice(0, 32);
}

/**
 * Returns `true` when the caller should process the request, `false` when an
 * identical one was seen recently and the new one should be a no-op.
 *
 * `scope` is the route name (or any namespace) so two endpoints with the same
 * payload shape don't accidentally share dedup state.
 */
export function shouldProcess(
  scope: string,
  fp: string,
  ttlMs: number = 60_000,
  now: number = Date.now(),
): boolean {
  evictIfNeeded(now, ttlMs);
  const key = `${scope}:${fp}`;
  const existing = STORE.get(key);
  if (existing !== undefined && existing > now) {
    return false;
  }
  STORE.set(key, now + ttlMs);
  return true;
}
