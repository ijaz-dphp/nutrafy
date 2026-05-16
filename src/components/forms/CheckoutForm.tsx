"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";
import { currency } from "@/lib/utils";
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
  const { items, totals, clearCart } = useCart();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { country: "PK" },
  });

  return (
    <form
      className="space-y-3 rounded-lg border bg-white p-4"
      onSubmit={handleSubmit(async (values) => {
        if (!items.length) {
          setStatus("Your cart is empty.");
          return;
        }
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
          clearCart();
          setStatus("Order placed successfully.");
        } catch {
          setStatus("Unable to place order right now.");
        }
      })}
    >
      <div className="rounded-md bg-zinc-50 p-3 text-sm">
        <p className="font-medium">Order Summary</p>
        <div className="mt-2 space-y-1 text-zinc-700">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{items.reduce((count, item) => count + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{currency(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{currency(totals.shipping)}</span>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between text-emerald-700">
              <span>Discount{totals.couponCode ? ` (${totals.couponCode})` : ""}</span>
              <span>-{currency(totals.discount)}</span>
            </div>
          ) : null}
          <div className="flex justify-between font-semibold text-zinc-900">
            <span>Total</span>
            <span>{currency(totals.total)}</span>
          </div>
        </div>
      </div>
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
      <label htmlFor="terms-checkbox" className="flex items-center gap-2 text-sm">
        <input id="terms-checkbox" type="checkbox" {...register("terms")} /> I agree to terms
        and conditions
      </label>
      <Button type="submit" disabled={!items.length}>
        Place Order
      </Button>
      {status ? <p className="text-sm text-zinc-600">{status}</p> : null}
    </form>
  );
}
