import { ProductReview } from "@/types";

import { Rating } from "@/components/ui/Rating";

export function ProductReviews({ reviews }: { reviews: ProductReview[] }) {
  if (!reviews.length) return <p className="text-sm text-zinc-600">No reviews yet.</p>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.id} className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{review.reviewer}</p>
            <Rating rating={review.rating} />
          </div>
          <p className="mt-2 text-sm text-zinc-700">{review.review}</p>
        </article>
      ))}
    </div>
  );
}
