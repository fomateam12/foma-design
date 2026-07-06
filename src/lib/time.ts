/** "Jul 6, 2026, 3:45 PM" style timestamp in the business's operating timezone. */
export function nyTimestamp(): string {
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
