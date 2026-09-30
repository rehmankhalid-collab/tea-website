"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";

import { TEAS, type CollectionTea } from "@/components/collection/collection-data";

const STORAGE_KEY = "veyla:cart";

export type CartLine = {
  tea: CollectionTea;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (teaId: CollectionTea["id"], quantity?: number) => void;
  removeItem: (teaId: CollectionTea["id"]) => void;
  setQuantity: (teaId: CollectionTea["id"], quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

type StoredLine = { teaId: CollectionTea["id"]; quantity: number };
type Quantities = Record<string, number>;

/**
 * The cart's quantities live outside React entirely — a tiny external store
 * that localStorage-backs itself — rather than a `useState` a mount effect
 * writes into. That sidesteps a hydration mismatch (the server always sees
 * an empty cart) the same way `useSyncExternalStore`'s `getServerSnapshot`
 * is meant to: it's the store, not a rendered state value, until a
 * component actually asks for a snapshot.
 */
let cache: Quantities | null = null;
const listeners = new Set<() => void>();
const EMPTY_QUANTITIES: Quantities = {};

function loadFromStorage(): Quantities {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: StoredLine[] = JSON.parse(raw);
    return Object.fromEntries(parsed.map((line) => [line.teaId, line.quantity]));
  } catch {
    return {};
  }
}

function getSnapshot(): Quantities {
  cache ??= loadFromStorage();
  return cache;
}

function getServerSnapshot(): Quantities {
  return EMPTY_QUANTITIES;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeQuantities(updater: (prev: Quantities) => Quantities) {
  cache = updater(cache ?? loadFromStorage());
  try {
    const stored: StoredLine[] = Object.entries(cache).map(([teaId, quantity]) => ({
      teaId: teaId as CollectionTea["id"],
      quantity,
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage can be unavailable (private browsing, quota) — the cart still
    // works for this session, it just won't persist.
  }
  listeners.forEach((listener) => listener());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const quantities = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((teaId: CollectionTea["id"], quantity = 1) => {
    writeQuantities((prev) => ({ ...prev, [teaId]: (prev[teaId] ?? 0) + quantity }));
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((teaId: CollectionTea["id"]) => {
    writeQuantities((prev) => {
      const next = { ...prev };
      delete next[teaId];
      return next;
    });
  }, []);

  const setQuantity = useCallback((teaId: CollectionTea["id"], quantity: number) => {
    writeQuantities((prev) => {
      if (quantity <= 0) {
        const next = { ...prev };
        delete next[teaId];
        return next;
      }
      return { ...prev, [teaId]: quantity };
    });
  }, []);

  const lines = useMemo<CartLine[]>(
    () =>
      Object.entries(quantities)
        .map(([teaId, quantity]) => {
          const tea = TEAS.find((t) => t.id === teaId);
          return tea ? { tea, quantity } : null;
        })
        .filter((line): line is CartLine => line !== null),
    [quantities],
  );

  const count = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity * line.tea.price, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      addItem,
      removeItem,
      setQuantity,
    }),
    [lines, count, subtotal, isOpen, addItem, removeItem, setQuantity],
  );

  return <CartContext value={value}>{children}</CartContext>;
}
