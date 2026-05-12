"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { items } = useCart();

  return (
    <div className="rounded-lg border bg-white p-3 text-sm">
      <p>{items.length} item(s) in cart</p>
      <Link href="/cart" className="text-emerald-700">
        View Cart
      </Link>
    </div>
  );
}
