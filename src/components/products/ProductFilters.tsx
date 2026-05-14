"use client";

import { ProductCategory } from "@/types";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function ProductFilters({
  categories,
}: {
  categories: ProductCategory[];
}) {
  return (
    <aside className="space-y-4 rounded-lg border bg-white p-4">
      <h3 className="font-semibold">Filters</h3>
      <Input placeholder="Search products" name="search" />
      <label htmlFor="category-filter" className="block text-sm text-zinc-700">
        Category
        <Select id="category-filter" defaultValue="">
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
        <Select id="sort-filter" defaultValue="latest">
          <option value="latest">Latest</option>
          <option value="price">Price</option>
          <option value="popularity">Popularity</option>
        </Select>
      </label>
      <label htmlFor="in-stock-only" className="flex items-center gap-2 text-sm">
        <input id="in-stock-only" type="checkbox" /> In stock only
      </label>
    </aside>
  );
}
