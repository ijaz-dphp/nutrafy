import Link from "next/link";
import { Metadata } from "next";

import { BlogGrid } from "@/components/blog/BlogGrid";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getPosts, getProductCategories, getProducts } from "@/lib/wordpress";
import { BlogPost, Product, ProductCategory } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Nutrafy.pk | Home",
  description: "Explore featured wellness supplements and trusted health products.",
};

async function loadProducts() {
  try {
    const [featuredProducts, latestProducts, categories, posts] = await Promise.all([
      getProducts({ per_page: 6, featured: true }),
      getProducts({ per_page: 6, orderby: "date", order: "desc" }),
      getProductCategories(),
      getPosts({ per_page: 3 }),
    ]);
    return { featuredProducts, latestProducts, categories, posts };
  } catch {
    return {
      featuredProducts: [] as Product[],
      latestProducts: [] as Product[],
      categories: [] as ProductCategory[],
      posts: [] as BlogPost[],
    };
  }
}

export default async function HomePage() {
  const { featuredProducts, latestProducts, categories, posts } = await loadProducts();

  return (
    <div className="space-y-14">
      <section className="rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-12 text-white md:px-10">
        <p className="text-xs uppercase tracking-wide text-emerald-100">Nutrafy Pakistan</p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">Better Health Starts with Nutrafy</h1>
        <p className="mt-3 max-w-2xl text-sm text-emerald-50 md:text-base">
          Premium wellness supplements for women&apos;s health, beauty nutrition, immunity, and daily
          vitality.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-md bg-white px-5 py-2.5 font-medium text-emerald-700"
          >
            Shop All Products
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-white px-5 py-2.5 font-medium text-white"
          >
            Why Nutrafy
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

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Shop by Category</h2>
          <Link href="/products" className="text-sm text-emerald-700">
            Explore shop
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="rounded-xl border bg-white p-4 transition hover:border-emerald-300 hover:shadow-sm"
            >
              <h3 className="font-semibold">{category.name}</h3>
              <p className="mt-1 text-sm text-zinc-600">View products in {category.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Latest Products</h2>
          <Link href="/products?sort=latest" className="text-sm text-emerald-700">
            New arrivals
          </Link>
        </div>
        <ProductGrid products={latestProducts} />
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

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">From Our Blog</h2>
          <Link href="/blog" className="text-sm text-emerald-700">
            Read all posts
          </Link>
        </div>
        <BlogGrid posts={posts} />
      </section>

      <section className="rounded-2xl bg-zinc-900 px-6 py-10 text-white md:px-10">
        <h2 className="text-2xl font-semibold">Trusted Wellness for Your Daily Routine</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-200">
          Discover clinically inspired formulas and shop with confidence through a seamless
          WooCommerce-powered experience.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium">
            Start Shopping
          </Link>
          <Link href="/contact" className="rounded-md border border-white px-5 py-2.5 text-sm font-medium">
            Talk to Support
          </Link>
        </div>
      </section>
    </div>
  );
}
