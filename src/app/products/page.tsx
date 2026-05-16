import { Metadata } from "next";
import Link from "next/link";

import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getProductCategories, getProductsPaginated } from "@/lib/wordpress";
import { Product, ProductCategory } from "@/types";

const PRODUCTS_PER_PAGE = 12;
const PAGINATION_WINDOW = 2;

export const metadata: Metadata = {
  title: "Shop Products | Nutrafy",
  description: "Browse wellness products with categories, filters, and sorting.",
};

export const revalidate = 60;

async function loadData() {
  try {
    const categories = await getProductCategories();
    return { categories };
  } catch {
    return { categories: [] as ProductCategory[] };
  }
}

async function loadProducts(searchParams: Record<string, string | string[] | undefined>, categories: ProductCategory[]) {
  try {
    const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
    const categorySlug =
      typeof searchParams.category === "string" ? searchParams.category : undefined;
    const categoryId = categorySlug
      ? categories.find((category) => category.slug === categorySlug)?.id
      : undefined;
    const sort = typeof searchParams.sort === "string" ? searchParams.sort : "latest";
    const stock = typeof searchParams.stock === "string" ? searchParams.stock : undefined;
    const page = typeof searchParams.page === "string" ? Number(searchParams.page) || 1 : 1;

    const sortMap: Record<string, { orderby: string; order: "asc" | "desc" }> = {
      latest: { orderby: "date", order: "desc" },
      "price-low-high": { orderby: "price", order: "asc" },
      "price-high-low": { orderby: "price", order: "desc" },
      popularity: { orderby: "popularity", order: "desc" },
    };

    const { orderby, order } = sortMap[sort] || sortMap.latest;
    const response = await getProductsPaginated({
      per_page: PRODUCTS_PER_PAGE,
      page,
      search,
      category: categoryId,
      stock_status: stock === "instock" ? "instock" : undefined,
      orderby,
      order,
    });

    return {
      products: response.data,
      totalPages: response.totalPages,
      currentPage: page,
    };
  } catch {
    return {
      products: [] as Product[],
      totalPages: 1,
      currentPage: 1,
    };
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { categories } = await loadData();
  const resolvedSearchParams = await searchParams;
  const { products, totalPages, currentPage } = await loadProducts(resolvedSearchParams, categories);

  const paramsForPage = (page: number) => {
    const next = new URLSearchParams();
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
      if (typeof value === "string" && value) next.set(key, value);
    });
    if (page <= 1) next.delete("page");
    else next.set("page", String(page));
    return next.toString();
  };
  const startPage = Math.max(1, currentPage - PAGINATION_WINDOW);
  const endPage = Math.min(totalPages, currentPage + PAGINATION_WINDOW);
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="space-y-5">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Products" }]} />
      <h1 className="text-3xl font-semibold">Shop Products</h1>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <ProductFilters categories={categories} />
        <div className="space-y-6">
          <ProductGrid products={products} />
          {totalPages > 1 ? (
            <nav className="flex flex-wrap items-center gap-2">
              {(() => {
                const firstPageQuery = paramsForPage(1);
                const lastPageQuery = paramsForPage(totalPages);
                return (
                  <>
              {startPage > 1 ? (
                <>
                  <Link
                    href={`/products${firstPageQuery ? `?${firstPageQuery}` : ""}`}
                    className="min-h-10 min-w-10 rounded-md border bg-white px-3 py-2 text-sm"
                  >
                    1
                  </Link>
                  {startPage > 2 ? <span className="px-1 text-sm text-zinc-500">…</span> : null}
                </>
              ) : null}
              {visiblePages.map((page) => {
                const isActive = page === currentPage;
                const pageQuery = paramsForPage(page);
                return (
                  <Link
                    key={page}
                    href={`/products${pageQuery ? `?${pageQuery}` : ""}`}
                    className={`min-h-10 min-w-10 rounded-md border px-3 py-2 text-sm ${
                      isActive ? "border-emerald-600 bg-emerald-600 text-white" : "bg-white"
                    }`}
                  >
                    {page}
                  </Link>
                );
              })}
              {endPage < totalPages ? (
                <>
                  {endPage < totalPages - 1 ? <span className="px-1 text-sm text-zinc-500">…</span> : null}
                  <Link
                    href={`/products${lastPageQuery ? `?${lastPageQuery}` : ""}`}
                    className="min-h-10 min-w-10 rounded-md border bg-white px-3 py-2 text-sm"
                  >
                    {totalPages}
                  </Link>
                </>
              ) : null}
                  </>
                );
              })()}
            </nav>
          ) : null}
        </div>
      </div>
    </div>
  );
}
