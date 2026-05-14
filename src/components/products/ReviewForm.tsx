"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { submitReview } from "@/lib/wordpress";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type ReviewFormFields = {
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  product_id: number;
};

export function ReviewForm({ productId }: { productId: number }) {
  const [status, setStatus] = useState<string>("");
  const { register, handleSubmit, reset } = useForm<ReviewFormFields>({
    defaultValues: { product_id: productId, rating: 5 },
  });

  return (
    <form
      className="space-y-3 rounded-lg border p-4"
      onSubmit={handleSubmit(async (values) => {
        try {
          await submitReview(values);
          setStatus("Review submitted successfully.");
          reset({ ...values, review: "" });
        } catch {
          setStatus("Unable to submit review right now.");
        }
      })}
    >
      <h3 className="font-semibold">Write a Review</h3>
      <Input placeholder="Your name" {...register("reviewer", { required: true })} />
      <Input
        type="email"
        placeholder="Your email"
        {...register("reviewer_email", { required: true })}
      />
      <label className="block text-sm text-zinc-700">
        Rating (1-5)
        <Input
          type="number"
          min={1}
          max={5}
          {...register("rating", { valueAsNumber: true })}
        />
      </label>
      <textarea
        className="min-h-28 w-full rounded-md border border-zinc-300 p-3 text-sm"
        placeholder="Share your experience"
        {...register("review", { required: true })}
      />
      <Button type="submit">Submit Review</Button>
      {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
    </form>
  );
}
