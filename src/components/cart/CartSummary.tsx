import Link from "next/link";

import { CartTotals } from "@/types";
import { currency } from "@/lib/utils";

export function CartSummary({ totals }: { totals: CartTotals }) {
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
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{currency(totals.total)}</span>
        </div>
      </div>
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
