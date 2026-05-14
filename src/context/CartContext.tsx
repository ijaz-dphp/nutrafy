"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartLineItem, CartTotals } from "@/types";

type CartContextValue = {
  items: CartLineItem[];
  totals: CartTotals;
  addToCart: (item: CartLineItem) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "nutrafy-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as CartLineItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartLineItem) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.productId === item.productId);
      if (!existing) return [...prev, item];

      return prev.map((line) =>
        line.productId === item.productId
          ? { ...line, quantity: line.quantity + item.quantity }
          : line,
      );
    });
  };

  const removeFromCart = (lineId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== lineId));
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => (item.id === lineId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 250 : 0;

    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, totals, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
