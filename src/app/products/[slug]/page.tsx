import { Metadata } from "next";
import { notFound } from "next/navigation";

import { AddToCart } from "@/components/products/AddToCart";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ReviewForm } from "@/components/products/ReviewForm";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getProduct, getProducts, getReviews } from "@/lib/wordpress";
import { Product, ProductReview } from "@/types";
import { currency, stripHtml } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Product | Nutrafy" };

  return {
    title: `${product.name} | Nutrafy`,
    description: stripHtml(product.short_description || product.description),
    openGraph: {
      title: product.name,
      description: stripHtml(product.short_description || product.description),
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

async function loadData(slug: string) {
  try {
    const product = await getProduct(slug);
    if (!product) return null;

    const [reviews, relatedPool] = await Promise.all([
      getReviews(product.id),
      getProducts({ category: product.categories?.[0]?.id, per_page: 4 }),
    ]);

    const related = relatedPool.filter((item: Product) => item.id !== product.id).slice(0, 3);
    return { product, reviews, related };
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadData(slug);

  if (!data) notFound();

  const { product, reviews, related } = data as {
    product: Product;
    reviews: ProductReview[];
    related: Product[];
  };

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Products" },
          { label: product.name },
        ]}
      />

      <section className="grid gap-6 rounded-xl border bg-white p-5 md:grid-cols-2">
        <ProductGallery images={product.images || []} />
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-xl font-bold text-emerald-700">{currency(Number(product.price || 0))}</p>
          <p className="text-sm text-zinc-600">{product.stock_status === "instock" ? "In stock" : "Out of stock"}</p>
          <p className="text-sm text-zinc-700">{stripHtml(product.short_description)}</p>
          <AddToCart product={product} />
          <div className="text-sm text-zinc-600">
            <p>SKU: {product.sku || "N/A"}</p>
            <p>Category: {product.categories?.map((category) => category.name).join(", ") || "General"}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-lg border bg-white p-5">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-sm text-zinc-700">{stripHtml(product.description)}</p>
          <h3 className="text-lg font-semibold">Ingredients</h3>
          <p className="text-sm text-zinc-700">See product label for complete ingredient details.</p>
          <h3 className="text-lg font-semibold">Benefits</h3>
          <p className="text-sm text-zinc-700">Supports daily wellness goals with science-backed nutrients.</p>
          <h3 className="text-lg font-semibold">Usage Instructions</h3>
          <p className="text-sm text-zinc-700">Use as directed by healthcare professional or pack instructions.</p>
        </div>
        <div className="space-y-4">
          <ProductReviews reviews={reviews} />
          <ReviewForm productId={product.id} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Related Products</h2>
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
