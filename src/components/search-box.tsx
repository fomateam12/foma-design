"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { SearchResult } from "@/data/types";

export function SearchBox({
  className,
  onNavigate,
  autoFocus = false,
}: {
  className?: string;
  onNavigate?: () => void;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const listboxId = useId();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      const t = setTimeout(() => {
        setResults([]);
        setLoading(false);
      }, 0);
      return () => clearTimeout(t);
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(term)}&limit=6`,
          { signal: ctrl.signal },
        );
        if (!res.ok) throw new Error("search failed");
        const data = (await res.json()) as { results: SearchResult[] };
        setResults(data.results);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setResults([]);
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => {
      ctrl.abort();
      clearTimeout(t);
    };
  }, [query]);

  function goToSearch() {
    const term = query.trim();
    if (!term) return;
    setOpen(false);
    onNavigate?.();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  function handleNavigate() {
    setOpen(false);
    onNavigate?.();
  }

  const showList = open && query.trim().length > 1;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          goToSearch();
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Search products
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          id={inputId}
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          role="combobox"
          aria-expanded={showList && results.length > 0}
          aria-controls={listboxId}
          aria-autocomplete="list"
          placeholder="Search engraved gifts…"
          className="h-11 w-full rounded-full border border-input bg-background pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 [&::-webkit-search-cancel-button]:appearance-none"
        />
        {loading ? (
          <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        ) : query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        ) : null}
      </form>

      {showList ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-[var(--shadow-card)]"
        >
          {results.length > 0 ? (
            <>
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={`/product/${r.id}`}
                  role="option"
                  aria-selected="false"
                  onClick={handleNavigate}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:bg-muted"
                >
                  <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    {r.image ? (
                      <Image
                        src={r.image}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="36px"
                        className="object-contain"
                      />
                    ) : null}
                  </div>
                  <span className="line-clamp-1 flex-1 font-medium text-foreground">
                    {r.name}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatPrice(r.basePrice)}
                  </span>
                </Link>
              ))}
              <button
                type="button"
                onClick={goToSearch}
                className="mt-0.5 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-brand-strong outline-none transition-colors hover:bg-muted focus-visible:bg-muted"
              >
                See all results for “{query.trim()}”
              </button>
            </>
          ) : loading ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">Searching…</p>
          ) : (
            <p className="px-3 py-3 text-sm text-muted-foreground">
              No matches for “{query.trim()}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
