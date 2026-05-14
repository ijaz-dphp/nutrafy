import Link from "next/link";
import { Metadata } from "next";

import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/wordpress";
import { Product } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Nutrafy.pk | Home",
  description: "Explore featured wellness supplements and trusted health products.",
};

async function loadProducts() {
  try {
    return await getProducts({ per_page: 6, featured: true });
  } catch {
    return [] as Product[];
  }
}

export default async function HomePage() {
  const featuredProducts = await loadProducts();

  return (
    <div className="space-y-12">
      <section className="rounded-xl bg-emerald-700 px-6 py-12 text-white">
        <h1 className="text-3xl font-bold md:text-4xl">Better Health Starts with Nutrafy</h1>
        <p className="mt-3 max-w-2xl text-emerald-50">
          Premium supplements for women&apos;s health, hair & skin, and overall wellness.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-md bg-white px-4 py-2 font-medium text-emerald-700">
            Shop Now
          </Link>
          <Link href="/blog" className="rounded-md border border-white px-4 py-2 font-medium text-white">
            Read Articles
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/products" className="text-sm text-emerald-700">
            View all
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="grid gap-4 rounded-xl border bg-white p-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold">Fast Delivery</h3>
          <p className="text-sm text-zinc-600">Quick nationwide shipping across Pakistan.</p>
        </div>
        <div>
          <h3 className="font-semibold">Authentic Products</h3>
          <p className="text-sm text-zinc-600">Directly sourced, quality-tested supplements.</p>
        </div>
        <div>
          <h3 className="font-semibold">Expert Support</h3>
          <p className="text-sm text-zinc-600">Get guidance for better supplement choices.</p>
        </div>
      </section>
    </div>
  );
}
