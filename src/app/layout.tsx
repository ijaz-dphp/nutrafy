import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nutrafy.pk"),
  title: "Nutrafy.pk | Health & Wellness Store",
  description:
    "Nutrafy Pakistan wellness supplements store powered by WordPress and WooCommerce.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nutrafy.pk",
    description: "Health supplements, blog articles, reviews, and checkout.",
    siteName: "Nutrafy.pk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutrafy.pk",
    description: "Health supplements, blog articles, reviews, and checkout.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-zinc-50 text-zinc-900 antialiased">
        <CartProvider>
          <Header />
          <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-4 py-6">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
