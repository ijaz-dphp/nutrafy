import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Nutrafy",
  description: "Login, registration, and account dashboard for WooCommerce users.",
};

export default function AccountPage() {
  const links = [
    ["/account/login", "Login"],
    ["/account/register", "Register"],
    ["/account/orders", "Orders History"],
    ["/account/details", "Account Details"],
    ["/account/addresses", "Addresses"],
  ] as const;

  return (
    <div className="space-y-4 rounded-xl border bg-white p-6">
      <h1 className="text-3xl font-semibold">My Account</h1>
      <p className="text-sm text-zinc-600">
        Connect this section with your WordPress authentication endpoints.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="rounded-md border p-3 text-sm hover:bg-zinc-50">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
