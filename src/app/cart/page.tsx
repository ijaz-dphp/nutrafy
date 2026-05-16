"use client";

import { useState } from "react";

import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, totals, applyCoupon, removeCoupon } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponStatus, setCouponStatus] = useState("");

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
                <Input
                  placeholder="Enter coupon"
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                />
                <button
                  type="button"
                  className="rounded-md bg-zinc-900 px-4 py-2 text-sm text-white"
                  onClick={() => {
                    if (!coupon.trim()) {
                      setCouponStatus("Please enter a coupon code.");
                      return;
                    }
                    const applied = applyCoupon(coupon);
                    setCouponStatus(
                      applied
                        ? `Coupon ${coupon.trim().toUpperCase()} applied.`
                        : "Invalid coupon code.",
                    );
                  }}
                >
                  Apply
                </button>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Try: NUTRAFY10, SAVE500, or FREESHIP
              </p>
              {couponStatus ? <p className="mt-2 text-sm text-zinc-700">{couponStatus}</p> : null}
            </div>
          </div>
          <CartSummary totals={totals} onRemoveCoupon={removeCoupon} />
        </div>
      ) : (
        <div className="rounded-lg border bg-white p-6 text-sm text-zinc-600">
          Your cart is empty.
        </div>
      )}
    </div>
  );
}
