"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { submitCheckout } from "@/lib/wordpress";

type FormValues = {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  order_notes?: string;
  terms: boolean;
};

export function CheckoutForm() {
  const [status, setStatus] = useState("");
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { country: "PK" },
  });

  return (
    <form
      className="space-y-3 rounded-lg border bg-white p-4"
      onSubmit={handleSubmit(async (values) => {
        if (!values.terms) {
          setStatus("Please accept terms and conditions.");
          return;
        }

        try {
          await submitCheckout({
            billing_address: {
              first_name: values.first_name,
              last_name: values.last_name,
              address_1: values.address_1,
              city: values.city,
              country: values.country,
              email: values.email,
              phone: values.phone,
            },
            order_notes: values.order_notes,
          });
          setStatus("Order placed successfully.");
        } catch {
          setStatus("Unable to place order right now.");
        }
      })}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="First name" {...register("first_name", { required: true })} />
        <Input placeholder="Last name" {...register("last_name", { required: true })} />
      </div>
      <Input placeholder="Address" {...register("address_1", { required: true })} />
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="City" {...register("city", { required: true })} />
        <Input placeholder="Country" {...register("country", { required: true })} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input type="email" placeholder="Email" {...register("email", { required: true })} />
        <Input placeholder="Phone" {...register("phone", { required: true })} />
      </div>
      <textarea
        className="min-h-24 w-full rounded-md border border-zinc-300 p-3 text-sm"
        placeholder="Order notes"
        {...register("order_notes")}
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("terms")} /> I agree to terms and conditions
      </label>
      <Button type="submit">Place Order</Button>
      {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
    </form>
  );
}
