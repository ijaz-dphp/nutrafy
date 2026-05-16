"use client";

import { FormEvent, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProductCategory } from "@/types";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function ProductFilters({
  categories,
}: {
  categories: ProductCategory[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const updateFilters = (next: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
        return;
      }
      params.set(key, value);
    });
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateFilters({ search: search.trim() || null });
  };

  return (
    <aside className="space-y-4 rounded-lg border bg-white p-4">
      <h3 className="font-semibold">Filters</h3>
      <form onSubmit={onSearchSubmit} className="space-y-2">
        <Input
          placeholder="Search products"
          name="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button
          type="submit"
          aria-label="Apply product search"
          className="min-h-10 rounded-md bg-zinc-900 px-3 text-sm text-white"
        >
          Search
        </button>
      </form>
      <label htmlFor="category-filter" className="block text-sm text-zinc-700">
        Category
        <Select
          id="category-filter"
          value={searchParams.get("category") ?? ""}
          onChange={(event) => updateFilters({ category: event.target.value || null })}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </Select>
      </label>
      <label htmlFor="sort-filter" className="block text-sm text-zinc-700">
        Sort by
        <Select
          id="sort-filter"
          value={searchParams.get("sort") ?? "latest"}
          onChange={(event) => updateFilters({ sort: event.target.value || "latest" })}
        >
          <option value="latest">Latest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </Select>
      </label>
      <label htmlFor="in-stock-only" className="flex items-center gap-2 text-sm">
        <input
          id="in-stock-only"
          type="checkbox"
          checked={searchParams.get("stock") === "instock"}
          onChange={(event) => updateFilters({ stock: event.target.checked ? "instock" : null })}
        />
        In stock only
      </label>
      <button
        type="button"
        aria-label="Clear all product filters and search"
        className="text-sm text-zinc-600 underline"
        onClick={() => {
          setSearch("");
          router.push(pathname);
        }}
      >
        Reset all filters
      </button>
    </aside>
  );
}
