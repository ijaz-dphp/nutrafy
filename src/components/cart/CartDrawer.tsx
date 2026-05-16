"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { currency } from "@/lib/utils";

// Keep preview compact in header popover while still showing recent cart context.
const CART_PREVIEW_ITEM_LIMIT = 3;

export function CartDrawer() {
  const { items, totals } = useCart();
  const count = items.reduce((acc, item) => acc + item.quantity, 0);
  const latestItems = items.slice(0, CART_PREVIEW_ITEM_LIMIT);

  return (
    <div className="w-72 space-y-3 rounded-lg border bg-white p-3 text-sm shadow-lg">
      <p className="font-medium">{count} item(s) in cart</p>
      {latestItems.length ? (
        <ul className="space-y-2">
          {latestItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 text-xs text-zinc-600">
              <span className="line-clamp-1">{item.name}</span>
              <span>x{item.quantity}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-zinc-500">Your cart is empty.</p>
      )}
      <div className="flex items-center justify-between border-t pt-2 font-medium">
        <span>Total</span>
        <span>{currency(totals.total)}</span>
      </div>
      <div className="flex gap-2">
        <Link
          href="/cart"
          className="flex min-h-10 flex-1 items-center justify-center rounded-md border text-center text-emerald-700"
        >
          View Cart
        </Link>
        <Link
          href="/checkout"
          className="flex min-h-10 flex-1 items-center justify-center rounded-md bg-emerald-600 text-center text-white"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
