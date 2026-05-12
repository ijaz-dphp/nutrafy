"use client";

import Link from "next/link";
import { ShoppingCart, Search } from "lucide-react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { useCart } from "@/context/CartContext";

export function Header() {
  const { items } = useCart();
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-bold text-emerald-700">
          Nutrafy
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/products">Products</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/submit-review">Submit Review</Link>
          <Link href="/account">My Account</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="min-h-11 min-w-11" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/cart" className="relative flex min-h-11 min-w-11 items-center justify-center">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 rounded-full bg-emerald-600 px-1.5 text-xs text-white">
              {count}
            </span>
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
