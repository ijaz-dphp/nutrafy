"use client";

import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totals } = useCart();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Cart</h1>
      {items.length ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="rounded-lg border bg-white p-4">
              <label className="mb-2 block text-sm font-medium">Coupon Code</label>
              <div className="flex gap-2">
                <Input placeholder="Enter coupon" />
                <button className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white">Apply</button>
              </div>
            </div>
          </div>
          <CartSummary totals={totals} />
        </div>
      ) : (
        <div className="rounded-lg border bg-white p-6 text-sm text-zinc-600">
          Your cart is empty.
        </div>
      )}
    </div>
  );
}
