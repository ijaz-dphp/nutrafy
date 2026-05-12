"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { CartLineItem } from "@/types";
import { currency } from "@/lib/utils";

export function CartItem({ item }: { item: CartLineItem }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <article className="grid grid-cols-[80px_1fr_auto] gap-4 rounded-lg border p-3">
      <Image
        src={item.image || "/images/product-placeholder.svg"}
        alt={item.name}
        width={80}
        height={80}
        className="h-20 w-20 rounded-md object-cover"
      />
      <div>
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-zinc-600">{currency(item.price)}</p>
        <div className="mt-2 flex items-center gap-2">
          <button className="min-h-11 min-w-11 border" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span>{item.quantity}</span>
          <button className="min-h-11 min-w-11 border" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
      </div>
      <div className="space-y-2 text-right">
        <p className="font-semibold">{currency(item.price * item.quantity)}</p>
        <Button variant="outline" onClick={() => removeFromCart(item.id)}>
          Remove
        </Button>
      </div>
    </article>
  );
}
