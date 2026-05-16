import Image from "next/image";
import Link from "next/link";

import { Rating } from "@/components/ui/Rating";
import { Product } from "@/types";
import { currency } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0]?.src || "/images/product-placeholder.svg";
  const rating = Number(product.average_rating ?? 0);
  const salePrice = Number(product.sale_price || 0);
  const regularPrice = Number(product.regular_price || 0);
  const displayPrice = Number(product.price || 0);
  const hasSale = salePrice > 0 && regularPrice > salePrice;

  return (
    <article className="rounded-lg border bg-white p-3">
      <Link href={`/products/${product.slug}`}>
        <div className="relative">
          <Image
            src={image}
            alt={product.name}
            width={500}
            height={500}
            className="h-52 w-full rounded-md object-cover"
          />
          {hasSale ? (
            <span className="absolute left-2 top-2 rounded bg-rose-600 px-2 py-1 text-xs font-semibold text-white">
              Sale
            </span>
          ) : null}
        </div>
      </Link>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.name}</h3>
        <Rating rating={rating} />
        <div className="flex items-center gap-2 text-sm">
          <p className="font-medium text-emerald-700">{currency(displayPrice)}</p>
          {hasSale ? <p className="text-zinc-400 line-through">{currency(regularPrice)}</p> : null}
        </div>
      </div>
    </article>
  );
}
