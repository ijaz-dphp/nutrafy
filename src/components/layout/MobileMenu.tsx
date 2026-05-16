"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavLink = readonly [string, string];

export function MobileMenu({ navLinks }: { navLinks: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button className="min-h-11 min-w-11" onClick={() => setOpen((v) => !v)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-16 z-40 border-y bg-white p-4">
          <nav className="flex flex-col gap-3">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            {navLinks.map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/account" onClick={() => setOpen(false)}>
              My Account
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
