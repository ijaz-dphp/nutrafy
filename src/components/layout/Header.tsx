"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User } from "lucide-react";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";

type NavLink = readonly [string, string];

export function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const count = items.reduce((acc, item) => acc + item.quantity, 0);
  const navLinks = useMemo<readonly NavLink[]>(
    () => [
      ["/products", "Shop"],
      ["/blog", "Blog"],
      ["/about", "About"],
      ["/contact", "Contact"],
      ["/submit-review", "Submit Review"],
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="bg-emerald-700 px-4 py-2 text-center text-xs font-medium text-white">
        Free nationwide shipping on selected orders • Authentic wellness supplements
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-emerald-700">
            Nutrafy
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {navLinks.map(([href, label]) => (
              <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden w-full max-w-sm md:block">
          <form action="/products" className="relative">
            <Input
              aria-label="Search products"
              name="search"
              placeholder="Search products..."
              className="pr-10"
            />
            <button
              type="submit"
              aria-label="Search products"
              className="absolute right-1 top-1 min-h-9 min-w-9"
            >
              <span className="sr-only">Search products</span>
              <Search className="mx-auto h-4 w-4" />
            </button>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/account" className="flex min-h-11 min-w-11 items-center justify-center">
            <User className="h-5 w-5" />
          </Link>
          <div className="group relative hidden md:block">
            <Link href="/cart" className="relative flex min-h-11 min-w-11 items-center justify-center">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 rounded-full bg-emerald-600 px-1.5 text-xs text-white">
                {count}
              </span>
            </Link>
            <div className="invisible absolute right-0 top-full mt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <CartDrawer />
            </div>
          </div>
          <Link href="/cart" className="relative flex min-h-11 min-w-11 items-center justify-center md:hidden">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 rounded-full bg-emerald-600 px-1.5 text-xs text-white">
              {count}
            </span>
          </Link>
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
