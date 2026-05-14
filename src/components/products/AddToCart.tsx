"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";

export function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-md border">
        <button
          type="button"
          aria-label="Decrease quantity"
          className="min-h-11 min-w-11"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          -
        </button>
        <span className="w-10 text-center">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          className="min-h-11 min-w-11"
          onClick={() => setQuantity((q) => q + 1)}
        >
          +
        </button>
      </div>
      <Button
        onClick={() =>
          addToCart({
            id: `${product.id}-${crypto.randomUUID()}`,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            quantity,
            price: Number(product.price || 0),
            image: product.images?.[0]?.src,
          })
        }
      >
        Add to Cart
      </Button>
    </div>
  );
}
