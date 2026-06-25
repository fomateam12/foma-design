"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/** A product line held in the seller's running request-for-quote. */
export interface QuoteItem {
  id: string;
  sku: string;
  name: string;
  image: string;
  quantity: number;
  note?: string;
}

interface QuoteContextValue {
  items: QuoteItem[];
  /** Distinct lines. */
  count: number;
  /** Sum of every line's quantity. */
  totalQty: number;
  /** False during SSR / first paint, true once the client store has mounted. */
  hydrated: boolean;
  addItem: (item: Omit<QuoteItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNote: (id: string, note: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

const STORAGE_KEY = "fomaprint.quote.v1";
const MAX_QTY = 100000;
const MAX_LINES = 100;
const EMPTY: QuoteItem[] = [];

const QuoteContext = createContext<QuoteContextValue | null>(null);

/* ----------------------- localStorage-backed store ----------------------- */
/* A tiny external store read via useSyncExternalStore — SSR-safe (server      */
/* renders the empty snapshot, the client reconciles after hydration) and free */
/* of setState-in-effect.                                                      */

let store: QuoteItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitize(raw: unknown): QuoteItem[] {
  if (!Array.isArray(raw)) return EMPTY;
  const seen = new Set<string>();
  const out: QuoteItem[] = [];
  for (const v of raw) {
    if (!v || typeof v !== "object") continue;
    const o = v as Record<string, unknown>;
    if (typeof o.id !== "string" || typeof o.sku !== "string") continue;
    if (typeof o.name !== "string" || seen.has(o.id)) continue;
    const qty = Number(o.quantity);
    seen.add(o.id);
    out.push({
      id: o.id,
      sku: o.sku,
      name: o.name,
      image: typeof o.image === "string" ? o.image : "",
      quantity: Number.isFinite(qty)
        ? Math.min(Math.max(1, Math.round(qty)), MAX_QTY)
        : 1,
      note: typeof o.note === "string" ? o.note : undefined,
    });
  }
  return out.slice(0, MAX_LINES);
}

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    store = raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    store = EMPTY;
  }
  loaded = true;
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota or private mode — ignore */
  }
}

function emit() {
  for (const l of listeners) l();
}

function setStore(next: QuoteItem[]) {
  store = next;
  persist();
  emit();
}

function subscribe(cb: () => void): () => void {
  if (!loaded) load();
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      load();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): QuoteItem[] {
  if (!loaded) load();
  return store;
}

function getServerSnapshot(): QuoteItem[] {
  return EMPTY;
}

/* Stable, module-level mutators (immutable updates → new array reference). */
function addItemImpl(item: Omit<QuoteItem, "quantity">, quantity = 1) {
  const existing = store.find((i) => i.id === item.id);
  if (existing) {
    setStore(
      store.map((i) =>
        i.id === item.id
          ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QTY) }
          : i,
      ),
    );
    return;
  }
  if (store.length >= MAX_LINES) return;
  setStore([
    ...store,
    { ...item, quantity: Math.min(Math.max(1, quantity), MAX_QTY) },
  ]);
}

function removeItemImpl(id: string) {
  setStore(store.filter((i) => i.id !== id));
}

function updateQuantityImpl(id: string, quantity: number) {
  const q = Math.min(Math.max(1, Math.round(quantity || 1)), MAX_QTY);
  setStore(store.map((i) => (i.id === id ? { ...i, quantity: q } : i)));
}

function updateNoteImpl(id: string, note: string) {
  setStore(
    store.map((i) => (i.id === id ? { ...i, note: note.slice(0, 500) } : i)),
  );
}

function clearImpl() {
  if (store.length) setStore(EMPTY);
}

/* --------------------------- React integration --------------------------- */

/** True only after the component has mounted on the client. */
function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useHydrated();

  const has = useCallback((id: string) => store.some((i) => i.id === id), []);

  const value = useMemo<QuoteContextValue>(() => {
    const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    return {
      items,
      count: items.length,
      totalQty,
      hydrated,
      addItem: addItemImpl,
      removeItem: removeItemImpl,
      updateQuantity: updateQuantityImpl,
      updateNote: updateNoteImpl,
      clear: clearImpl,
      has,
    };
  }, [items, hydrated, has]);

  return <QuoteContext value={value}>{children}</QuoteContext>;
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within a QuoteProvider");
  return ctx;
}
