import Link from "next/link";

import { CartTotals } from "@/types";
import { currency } from "@/lib/utils";

export function CartSummary({
  totals,
  onRemoveCoupon,
}: {
  totals: CartTotals;
  onRemoveCoupon?: () => void;
}) {
  return (
    <div className="space-y-4 rounded-lg border bg-white p-4">
      <h3 className="font-semibold">Cart Totals</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{currency(totals.shipping)}</span>
        </div>
        {totals.discount > 0 ? (
          <div className="flex justify-between text-emerald-700">
            <span>Discount{totals.couponCode ? ` (${totals.couponCode})` : ""}</span>
            <span>-{currency(totals.discount)}</span>
          </div>
        ) : null}
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{currency(totals.total)}</span>
        </div>
      </div>
      {totals.couponCode && onRemoveCoupon ? (
        <button type="button" onClick={onRemoveCoupon} className="text-sm text-zinc-600 underline">
          Remove coupon
        </button>
      ) : null}
      <Link
        href="/checkout"
        className="flex min-h-11 items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Proceed to Checkout
      </Link>
      <Link href="/products" className="block text-center text-sm text-emerald-700">
        Continue Shopping
      </Link>
    </div>
  );
}
