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
      <Select defaultValue="">
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>
            {category.name}
          </option>
        ))}
      </Select>
      <Select defaultValue="latest">
        <option value="latest">Latest</option>
        <option value="price">Price</option>
        <option value="popularity">Popularity</option>
      </Select>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" /> In stock only
      </label>
    </aside>
  );
}
