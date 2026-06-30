/**
 * Per-IP, per-route in-memory token bucket. Best-effort throttle for the
 * single-region Vercel deployment we run today — every warm Lambda holds its
 * own bucket, so the *effective* per-IP cap is `limit × <instance count>`. For
 * the abuse cases we actually care about (form-bomb from one source) this
 * still kills the volume that matters, because spammers hit the same warm
 * instance back-to-back; the cap is loose enough not to fight bursts from
 * shared NATs (corporate proxies, university wifi).
 *
 * When traffic justifies it, swap the storage layer for Upstash Redis +
 * `@upstash/ratelimit`. The function signature stays the same; only the body
 * of `consume` changes.
 */

interface Bucket {
  /** Tokens available — decimal because the refill is rate-based. */
  tokens: number;
  /** Last refill timestamp, ms. */
  lastRefillAt: number;
}

export interface RateLimitOptions {
  /** Max tokens the bucket holds. Also the burst allowance. */
  limit: number;
  /** Rolling window length in milliseconds — `limit` tokens regenerate over it. */
  windowMs: number;
}

export interface RateLimitResult {
  /** True when the caller may proceed. */
  ok: boolean;
  /** Tokens left after this attempt (0 when the request was rejected). */
  remaining: number;
  /** Epoch ms when the bucket will next have a whole token (for Retry-After). */
  resetAt: number;
}

/**
 * Shared store keyed by `<route>:<ip>`. We do gentle eviction so a long-lived
 * Lambda doesn't grow without bound — once the map crosses a soft cap the
 * oldest 25% by lastRefillAt is dropped. The numbers below are tuned for the
 * traffic shape of a B2B catalog (low QPS, mostly cold buckets).
 */
const BUCKETS = new Map<string, Bucket>();
const EVICT_AT = 5000;
const EVICT_KEEP = Math.floor(EVICT_AT * 0.75);

function evictIfNeeded(): void {
  if (BUCKETS.size < EVICT_AT) return;
  const sorted = [...BUCKETS.entries()].sort(
    ([, a], [, b]) => a.lastRefillAt - b.lastRefillAt,
  );
  for (let i = 0; i < sorted.length - EVICT_KEEP; i++) {
    BUCKETS.delete(sorted[i][0]);
  }
}

/**
 * Consume one token from `key`'s bucket; return whether the request may
 * proceed plus the headers the caller should surface to the client.
 *
 * Determinism: `now` is a parameter to make this testable and to allow the
 * caller to use a single timestamp across consume + header construction.
 */
export function consume(
  key: string,
  options: RateLimitOptions,
  now: number = Date.now(),
): RateLimitResult {
  evictIfNeeded();
  const { limit, windowMs } = options;
  const refillPerMs = limit / windowMs;

  let bucket = BUCKETS.get(key);
  if (!bucket) {
    bucket = { tokens: limit, lastRefillAt: now };
    BUCKETS.set(key, bucket);
  } else {
    const elapsed = now - bucket.lastRefillAt;
    if (elapsed > 0) {
      bucket.tokens = Math.min(limit, bucket.tokens + elapsed * refillPerMs);
      bucket.lastRefillAt = now;
    }
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return {
      ok: true,
      remaining: Math.floor(bucket.tokens),
      resetAt: now + Math.ceil((1 - (bucket.tokens % 1)) / refillPerMs),
    };
  }
  return {
    ok: false,
    remaining: 0,
    resetAt: now + Math.ceil((1 - bucket.tokens) / refillPerMs),
  };
}

/** Best-effort client IP. Vercel sets `x-forwarded-for`; we take the first hop. */
export function ipFromRequest(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
