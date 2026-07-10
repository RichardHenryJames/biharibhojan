"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  isVeg: boolean;
  qty: number;
};

type CartItemInput = Omit<CartLine, "qty">;

type Action =
  | { type: "ADD"; item: CartItemInput; qty: number }
  | { type: "REMOVE"; slug: string }
  | { type: "SET_QTY"; slug: string; qty: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; lines: CartLine[] };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "HYDRATE":
      return Array.isArray(action.lines) ? action.lines : state;
    case "ADD": {
      const existing = state.find((l) => l.slug === action.item.slug);
      if (existing) {
        return state.map((l) =>
          l.slug === action.item.slug ? { ...l, qty: l.qty + action.qty } : l,
        );
      }
      return [...state, { ...action.item, qty: action.qty }];
    }
    case "SET_QTY":
      return state
        .map((l) => (l.slug === action.slug ? { ...l, qty: action.qty } : l))
        .filter((l) => l.qty > 0);
    case "REMOVE":
      return state.filter((l) => l.slug !== action.slug);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  addItem: (item: CartItemInput, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  qtyOf: (slug: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "biharibhojan_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", lines: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1900);
  }, []);

  const addItem = useCallback(
    (item: CartItemInput, qty = 1) => {
      dispatch({ type: "ADD", item, qty });
      showToast(`${item.name} added to cart`);
    },
    [showToast],
  );

  const removeItem = useCallback((slug: string) => dispatch({ type: "REMOVE", slug }), []);
  const setQty = useCallback(
    (slug: string, qty: number) => dispatch({ type: "SET_QTY", slug, qty }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.price * l.qty, 0),
    [lines],
  );
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);
  const qtyOf = useCallback(
    (slug: string) => lines.find((l) => l.slug === slug)?.qty ?? 0,
    [lines],
  );

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    hydrated,
    isOpen,
    addItem,
    removeItem,
    setQty,
    clear,
    openCart,
    closeCart,
    qtyOf,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2"
          >
            <div className="cart-toast">
              <span className="cart-toast__check">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
