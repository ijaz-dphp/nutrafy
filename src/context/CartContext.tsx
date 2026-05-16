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
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "nutrafy-cart";
const COUPON_STORAGE_KEY = "nutrafy-coupon";

const SUPPORTED_COUPONS: Record<
  string,
  { type: "percent" | "fixed"; value: number; freeShipping?: boolean }
> = {
  NUTRAFY10: { type: "percent", value: 10 },
  SAVE500: { type: "fixed", value: 500 },
  FREESHIP: { type: "fixed", value: 250, freeShipping: true },
};

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
  const [couponCode, setCouponCode] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(COUPON_STORAGE_KEY);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    if (couponCode) {
      localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
      return;
    }
    localStorage.removeItem(COUPON_STORAGE_KEY);
  }, [couponCode]);

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

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!normalized || !SUPPORTED_COUPONS[normalized]) return false;
    setCouponCode(normalized);
    return true;
  };

  const removeCoupon = () => setCouponCode(null);

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const coupon = couponCode ? SUPPORTED_COUPONS[couponCode] : undefined;
    const shipping = subtotal > 0 && !coupon?.freeShipping ? 250 : 0;
    const discount =
      coupon?.type === "percent"
        ? Math.round((subtotal * coupon.value) / 100)
        : coupon?.type === "fixed"
          ? coupon.value
          : 0;
    const appliedDiscount = Math.min(discount, subtotal);

    return {
      subtotal,
      shipping,
      discount: appliedDiscount,
      couponCode,
      total: Math.max(subtotal - appliedDiscount + shipping, 0),
    };
  }, [couponCode, items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
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
