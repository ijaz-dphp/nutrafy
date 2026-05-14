import { Metadata } from "next";

import { ReviewForm } from "@/components/products/ReviewForm";

export const metadata: Metadata = {
  title: "Submit Review | Nutrafy",
  description: "Submit your product review to Nutrafy WordPress backend.",
};

export default function SubmitReviewPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Submit Your Review</h1>
      <p className="text-sm text-zinc-600">Choose your product and submit rating/review.</p>
      <ReviewForm productId={1} />
    </div>
  );
}
