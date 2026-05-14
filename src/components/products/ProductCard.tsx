import Image from "next/image";
import Link from "next/link";

import { Rating } from "@/components/ui/Rating";
import { Product } from "@/types";
import { currency } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0]?.src || "/images/product-placeholder.svg";
  const rating = Number(product.average_rating ?? 0);

  return (
    <article className="rounded-lg border bg-white p-3">
      <Link href={`/products/${product.slug}`}>
        <Image
          src={image}
          alt={product.name}
          width={500}
          height={500}
          className="h-52 w-full rounded-md object-cover"
        />
      </Link>
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.name}</h3>
        <Rating rating={rating} />
        <p className="text-sm font-medium text-emerald-700">
          {currency(Number(product.price || 0))}
        </p>
      </div>
    </article>
  );
}
