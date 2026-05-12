import { Metadata } from "next";

import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getProductCategories, getProducts } from "@/lib/wordpress";
import { Product, ProductCategory } from "@/types";

export const metadata: Metadata = {
  title: "Shop Products | Nutrafy",
  description: "Browse wellness products with categories, filters, and sorting.",
};

export const revalidate = 60;

async function loadData() {
  try {
    const [products, categories] = await Promise.all([
      getProducts({ per_page: 24, orderby: "date" }),
      getProductCategories(),
    ]);
    return { products, categories };
  } catch {
    return { products: [] as Product[], categories: [] as ProductCategory[] };
  }
}

export default async function ProductsPage() {
  const { products, categories } = await loadData();

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Products" }]} />
      <h1 className="text-3xl font-semibold">Shop Products</h1>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <ProductFilters categories={categories} />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
