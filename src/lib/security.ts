/**
 * Lightweight request-origin (CSRF) check for POST route handlers.
 *
 * A browser always sends an `Origin` header on cross-site POSTs, so rejecting
 * requests whose Origin host doesn't match the request host blocks CSRF without
 * breaking same-origin form submissions. Requests with no Origin (non-browser
 * clients, some navigations) are allowed through — bot abuse is handled
 * separately by the honeypot + minimum-fill-time gates on the forms.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
