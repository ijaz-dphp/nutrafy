import Image from "next/image";

import { ProductImage } from "@/types";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const gallery = images.length
    ? images
    : [{ id: 0, src: "/images/product-placeholder.svg", alt: "Product" }];

  return (
    <div className="space-y-3">
      <Image
        src={gallery[0].src}
        alt={gallery[0].alt || "Product image"}
        width={700}
        height={700}
        className="h-80 w-full rounded-lg object-cover"
      />
      <div className="grid grid-cols-4 gap-2">
        {gallery.slice(0, 4).map((image) => (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt || "Product thumbnail"}
            width={120}
            height={120}
            className="h-20 w-full rounded-md object-cover"
          />
        ))}
      </div>
    </div>
  );
}
